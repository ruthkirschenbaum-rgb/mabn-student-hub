// Server-only helpers. No visitor identifiers, IP addresses, or messages are logged.
const crypto = require('node:crypto');

function prepare(req, res, methods) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (!methods.includes(req.method)) {
    res.setHeader('Allow', methods.join(', '));
    res.status(405).json({ error: 'Method not allowed.' });
    return false;
  }
  // Cross-site forms cannot write to the endpoints. No IP-based filtering.
  if (req.method === 'POST') {
    if (req.headers['sec-fetch-site'] === 'cross-site') {
      res.status(403).json({ error: 'Please submit from the student hub.' });
      return false;
    }
    const origin = req.headers.origin;
    const host = req.headers.host;
    if (origin) {
      try {
        if (new URL(origin).host !== host) throw new Error();
      } catch {
        res.status(403).json({ error: 'Please submit from the student hub.' });
        return false;
      }
    }
    if (!(req.headers['content-type'] || '').startsWith('application/json')) {
      res.status(415).json({ error: 'Please send a JSON message.' });
      return false;
    }
  }
  return true;
}

function body(req) {
  const value = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
  if (Buffer.byteLength(JSON.stringify(value)) > 16000) throw new Error();
  return value;
}

function redisConfigured() {
  return !!((process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
    (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN));
}

async function redis(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token || !url.startsWith('https://')) throw new Error('Storage unavailable');
  const response = await fetch(url, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command), signal: AbortSignal.timeout(7000),
  });
  if (!response.ok) throw new Error('Storage unavailable');
  const result = await response.json();
  if (result.error) throw new Error('Storage unavailable');
  return result.result;
}

// Aggregate hourly cap. No individual sender or visitor record is created.
async function withinLimit(scope, limit) {
  const count = await redis(['EVAL', "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],7200) end; return n", 1,
    `mabn:${scope}:${Math.floor(Date.now() / 3600000)}`]);
  return Number(count) <= limit;
}

function digest(message) {
  return crypto.createHmac('sha256', process.env.FEEDBACK_DEDUP_SECRET || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)
    .update(message).digest('hex');
}

module.exports = { prepare, body, redis, redisConfigured, withinLimit, digest };
