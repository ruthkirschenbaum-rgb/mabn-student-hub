// Run with: node tests/check.js. No network requests or real emails are sent.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..');

module.exports = async function run() {
  let assertions = 0;
  const check = (condition, message) => { assert.ok(condition, message); assertions++; };
  const element = () => ({ style: {}, value: '', innerHTML: '', textContent: '', addEventListener() {}, setAttribute() {}, querySelector: () => element() });
  const elements = new Map();
  const document = {
    getElementById: id => { if (!elements.has(id)) elements.set(id, element()); return elements.get(id); },
    querySelector: () => element(), querySelectorAll: () => [],
  };
  const FixedDate = class extends Date {
    constructor(...args) { super(...(args.length ? args : ['2026-11-01T12:00:00Z'])); }
    static now() { return new Date('2026-11-01T12:00:00Z').valueOf(); }
  };
  const page = vm.createContext({ document, Date: FixedDate, TextEncoder, setTimeout, Intl, URL, Blob,
    fetch: async () => ({ ok: false }), sessionStorage: { getItem() { return null; } } });
  vm.runInContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8') + '\nthis.testAPI={opportunities,buildICS,card,isPast};', page);
  const { opportunities, buildICS, card, isPast } = page.testAPI;
  const rendered = document.getElementById('list').innerHTML;
  check(rendered.indexOf('MABN Data Blitz') < rendered.indexOf('CNS 2027 Poster'), 'MABN events must lead the opportunity list');
  const featured = document.getElementById('featured-mabn').innerHTML;
  check(featured.includes('MABN Data Blitz') && featured.includes('methods or preliminary results'), 'Featured MABN event must include its research invitation');
  check(featured.includes('Whether or not you plan to present') && featured.includes('https://forms.gle/ZQaWogwJv2g7jP8G7'), 'Featured RSVP must welcome presenters and attendees');
  const cns = opportunities.find(o => o.id === 6);
  const meeting = opportunities.find(o => o.id === 8);
  check(card(cns, false).includes('Nov 3, 2026') && card(cns, false).includes('Mar 20, 2027'), 'Deadline and conference dates must both be explicit');
  check(card(cns, false).includes('Add deadline to calendar') && card(cns, false).includes('Add conference to calendar'), 'Calendar actions must distinguish their target');
  check(card(cns, false).includes('Visit official site'), 'Official link must have a visible label');
  check(isPast(opportunities.find(o => o.id === 14)) && !isPast(opportunities.find(o => o.id === 24)), 'A conference must remain current after its abstract deadline');
  for (const o of opportunities.filter(o => o.date)) {
    const ics = buildICS(o);
    const unfolded = ics.replace(/\r\n /g, '');
    check(unfolded.includes(o.startTime ? `DTSTART:${new Date(o.startTime).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}` : `DTSTART;VALUE=DATE:${o.date.replaceAll('-', '')}`), 'Calendar must use selected date and supplied start time');
    check(ics.split('\r\n').every(line => Buffer.byteLength(line) <= 75), 'Calendar lines must fit RFC 5545 byte limit');
    check(unfolded.includes('UID:') && unfolded.includes('DTSTAMP:'), 'Calendar must include stable UID and timestamp');
  }
  check(buildICS(meeting).includes('DTEND;VALUE=DATE:20270324'), 'Conference calendar must preserve exclusive multi-day end');
  check(buildICS(cns).replace(/\r\n /g, '').includes('SUMMARY:Poster & travel award deadline:'), 'Deadline reminder must be named as a deadline');
  check(!card({ ...cns, title: '<script>alert(1)</script>' }, false).includes('<script>'), 'Listing content must be escaped');

  const env = { UPSTASH_REDIS_REST_URL: 'https://redis.example', UPSTASH_REDIS_REST_TOKEN: 'test-secret', RESEND_API_KEY: 'test-key', FEEDBACK_FROM: 'Hub <feedback@example.org>' };
  let storage = new Map(), emailCalls = [], redisCalls = [], failEmail = false, failRedis = false;
  const mockFetch = async (url, options) => {
    if (url === 'https://api.resend.com/emails') {
      emailCalls.push(JSON.parse(options.body));
      return { ok: !failEmail, json: async () => ({ id: 'test-email' }) };
    }
    if (failRedis) throw new Error('Test unavailable');
    const [command, key, ...args] = JSON.parse(options.body); redisCalls.push([command, key, ...args]);
    let result;
    if (command === 'GET') result = storage.get(key) ?? null;
    if (command === 'INCR') { result = Number(storage.get(key) || 0) + 1; storage.set(key, result); }
    if (command === 'SET') { storage.set(key, args[0]); result = 'OK'; }
    if (command === 'EVAL') { const rateKey = args[1]; result = Number(storage.get(rateKey) || 0) + 1; storage.set(rateKey, result); }
    return { ok: true, json: async () => ({ result }) };
  };
  const helperContext = { module: { exports: {} }, process: { env }, Buffer, URL, AbortSignal, Date, fetch: mockFetch,
    require: name => { assert.equal(name, 'node:crypto'); return crypto; } };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'lib/server.js'), 'utf8'), helperContext);
  const helpers = helperContext.module.exports;
  let gmailCalls = [], smtpConfigs = [], failSMTP = false, rejectSMTP = false;
  const emailContext = { module: { exports: {} }, process: { env }, AbortSignal, fetch: mockFetch,
    require: name => {
      assert.equal(name, 'nodemailer');
      return { createTransport(options) {
        smtpConfigs.push(options);
        return { async sendMail(mail) {
          gmailCalls.push(mail);
          if (failSMTP) throw new Error('Test authentication failure');
          return { accepted: rejectSMTP ? [] : ['qcmabnstudentreps@gmail.com'] };
        } };
      } };
    } };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'lib/email.js'), 'utf8'), emailContext);
  const emailHelpers = emailContext.module.exports;
  function endpoint(file) {
    const context = { module: { exports: {} }, process: { env }, AbortSignal, Date, fetch: mockFetch,
      require: name => { if (name === '../lib/server') return helpers; assert.equal(name, '../lib/email'); return emailHelpers; } };
    vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
    return context.module.exports;
  }
  const feedback = endpoint('api/feedback.js'), visits = endpoint('api/visits.js');
  async function call(handler, overrides = {}) {
    const req = { method: 'POST', headers: { host: 'hub.example', origin: 'https://hub.example', 'content-type': 'application/json' }, body: { message: 'Please add more local events.' }, ...overrides };
    const res = { headers: {}, setHeader(key, value) { this.headers[key] = value; }, status(value) { this.code = value; return this; }, json(value) { this.data = value; return this; } };
    await handler(req, res); return res;
  }
  check((await call(feedback, { method: 'GET' })).data.available === true, 'Feedback availability must reflect configuration');
  check((await call(feedback, { method: 'DELETE' })).code === 405, 'Feedback must reject unsupported methods');
  check((await call(feedback, { body: { message: 'hi' } })).code === 400, 'Feedback must validate minimum length');
  check((await call(feedback, { body: { message: 'x'.repeat(3001) } })).code === 400, 'Feedback must validate maximum length');
  check((await call(feedback, { body: 'invalid json' })).code === 400, 'Feedback must reject malformed JSON');
  check((await call(feedback, { headers: { host: 'hub.example', origin: 'https://evil.example', 'content-type': 'application/json' } })).code === 403, 'Feedback must reject cross-site submissions');
  check((await call(feedback, { body: { message: 'Test feedback', website: 'spam' } })).code === 400, 'Feedback must reject filled honeypot');
  const secret = env.RESEND_API_KEY; delete env.RESEND_API_KEY;
  check((await call(feedback, { method: 'GET' })).data.available === false, 'Missing configuration must disable the form');
  check((await call(feedback)).code === 503, 'Unconfigured delivery must not claim success'); env.RESEND_API_KEY = secret;
  check((await call(feedback, { body: { message: 'Please add more local events.', email: 'private@example.org', ip: '1.2.3.4', visitorId: 'secret' } })).code === 200, 'Configured delivery must succeed');
  check(emailCalls[0].to.length === 1 && emailCalls[0].to[0] === 'qcmabnstudentreps@gmail.com', 'Delivery must use the listed shared inbox');
  check(!JSON.stringify(emailCalls[0]).includes('private@example.org') && !JSON.stringify(emailCalls[0]).includes('1.2.3.4') && !JSON.stringify(emailCalls[0]).includes('secret'), 'Delivery must not forward identifying metadata');
  check(!JSON.stringify(redisCalls).includes('Please add more local events.'), 'Storage must not contain message text');
  const sent = emailCalls.length; await call(feedback);
  check(emailCalls.length === sent, 'Repeated submission must not send duplicate emails');
  failEmail = true;
  check((await call(feedback, { body: { message: 'A different test message.' } })).code === 503, 'Provider failure must not claim success'); failEmail = false;
  failRedis = true;
  check((await call(feedback, { body: { message: 'Another test message.' } })).code === 503, 'Storage failure must not bypass abuse limits');
  check((await call(visits)).code === 503, 'Failed counter must not invent a count'); failRedis = false;
  check((await call(visits, { body: {} })).data.count === 1, 'First visit must increment shared count');
  check((await call(visits, { method: 'GET' })).data.count === 1, 'Reading count must not increment');
  check((await call(visits, { body: {} })).data.count === 2, 'Next visit must see shared persistent count');
  for (let i = 0; i < 30; i++) await call(feedback, { body: { message: `Different message ${i}` } });
  check((await call(feedback, { body: { message: 'One more message over the cap.' } })).code === 429, 'Aggregate rate limit must cap outgoing mail');
  // Gmail can be used without a sending domain or Resend credentials.
  storage = new Map();
  delete env.RESEND_API_KEY; delete env.FEEDBACK_FROM;
  env.GMAIL_APP_PASSWORD = 'abcd efgh ijkl mnop';
  check((await call(feedback, { method: 'GET' })).data.available === true, 'Gmail configuration must enable feedback without Resend');
  check((await call(feedback, { body: { message: 'Please bring this concern to the MABN administration.', email: 'visitor@example.org', ip: '9.8.7.6' } })).code === 200, 'Gmail delivery must succeed');
  check(gmailCalls.length === 1 && gmailCalls[0].to[0] === 'qcmabnstudentreps@gmail.com' && gmailCalls[0].from.address === 'qcmabnstudentreps@gmail.com', 'Gmail must send from and to the shared account');
  check(smtpConfigs[0].auth.user === 'qcmabnstudentreps@gmail.com' && smtpConfigs[0].auth.pass === 'abcdefghijklmnop', 'Gmail must normalize the App Password and use the shared login');
  check(smtpConfigs[0].host === 'smtp.gmail.com' && smtpConfigs[0].port === 465 && smtpConfigs[0].secure === true && smtpConfigs[0].logger === false && smtpConfigs[0].debug === false, 'Gmail must use TLS without message logging');
  check(!JSON.stringify(gmailCalls[0]).includes('visitor@example.org') && !JSON.stringify(gmailCalls[0]).includes('9.8.7.6') && !gmailCalls[0].replyTo, 'Gmail must not include sender identity or reply-to metadata');
  const gmailCount = gmailCalls.length;
  await call(feedback, { body: { message: 'Please bring this concern to the MABN administration.' } });
  check(gmailCalls.length === gmailCount, 'Gmail must suppress successfully delivered duplicates');
  failSMTP = true;
  check((await call(feedback, { body: { message: 'A message while Gmail is unavailable.' } })).code === 503, 'Gmail authentication failure must not report delivery');
  failSMTP = false; rejectSMTP = true;
  check((await call(feedback, { body: { message: 'A message rejected by the receiving server.' } })).code === 503, 'Gmail rejected recipient must not report delivery');
  rejectSMTP = false;
  const redisToken = env.UPSTASH_REDIS_REST_TOKEN; delete env.UPSTASH_REDIS_REST_TOKEN;
  check((await call(feedback, { method: 'GET' })).data.available === false, 'Gmail must still require spam-control storage');
  env.UPSTASH_REDIS_REST_TOKEN = redisToken;
  env.GMAIL_APP_PASSWORD = 'not-an-app-password';
  check((await call(feedback, { method: 'GET' })).data.available === false, 'Malformed Gmail configuration must leave feedback unavailable');
  return `${assertions} checks passed: dates, calendar exports, anonymous delivery, validation, failure handling, and shared visit totals.`;
};
if (require.main === module) module.exports().then(console.log).catch(error => { console.error(error); process.exitCode = 1; });
