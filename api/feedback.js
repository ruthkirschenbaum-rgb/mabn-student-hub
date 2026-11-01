const { prepare, body, redis, redisConfigured, withinLimit, digest } = require('../lib/server');
const RECIPIENT = 'qcmabnstudentreps@gmail.com';

module.exports = async function handler(req, res) {
  if (!prepare(req, res, ['GET', 'POST'])) return;
  if (req.method === 'GET') {
    return res.status(200).json({ available: !!(redisConfigured() && process.env.RESEND_API_KEY && process.env.FEEDBACK_FROM) });
  }
  let data;
  try { data = body(req); } catch { return res.status(400).json({ error: 'Please send a valid message.' }); }
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (message.length < 5 || message.length > 3000) {
    return res.status(400).json({ error: 'Please write between 5 and 3,000 characters.' });
  }
  if (data.website) return res.status(400).json({ error: 'Your message could not be sent.' });
  if (!redisConfigured() || !process.env.RESEND_API_KEY || !process.env.FEEDBACK_FROM) {
    return res.status(503).json({ error: 'Anonymous feedback is not available yet. Your message has not been sent. Please try again later.' });
  }
  try {
    // Duplicate protection is based on message content, never on the sender.
    const key = `mabn:feedback:${digest(message)}`;
    if (await redis(['GET', key])) return res.status(200).json({ ok: true });
    if (!await withinLimit('feedback', 30)) {
      return res.status(429).json({ error: 'The feedback inbox is busy. Please try again in an hour.' });
    }
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `mabn-${digest(message)}-${Math.floor(Date.now() / 86400000)}` },
      body: JSON.stringify({
        from: process.env.FEEDBACK_FROM, to: [RECIPIENT],
        subject: 'Anonymous feedback — MABN Student Hub',
        text: `An anonymous message from the MABN Student Hub:\n\n${message}\n\n---\nNo sender name, email address, IP address, browser details, or visitor identifier was attached by the form.`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error();
    const result = await response.json();
    if (!result.id) throw new Error();
    // Only a short-lived HMAC receipt is stored, never the message itself.
    // Email has been accepted, so a receipt storage failure must not report a send failure.
    try { await redis(['SET', key, 'sent', 'EX', 86400]); } catch {}
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(503).json({ error: 'Your message could not be sent right now. It is still in the box; please try again later.' });
  }
};
