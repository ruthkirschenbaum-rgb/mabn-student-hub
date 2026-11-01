const { prepare, body, redis, redisConfigured, withinLimit, digest } = require('../lib/server');
const { emailConfigured, sendFeedback } = require('../lib/email');

module.exports = async function handler(req, res) {
  if (!prepare(req, res, ['GET', 'POST'])) return;
  if (req.method === 'GET') {
    return res.status(200).json({ available: !!(redisConfigured() && emailConfigured()) });
  }
  let data;
  try { data = body(req); } catch { return res.status(400).json({ error: 'Please send a valid message.' }); }
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (message.length < 5 || message.length > 3000) {
    return res.status(400).json({ error: 'Please write between 5 and 3,000 characters.' });
  }
  if (data.website) return res.status(400).json({ error: 'Your message could not be sent.' });
  if (!redisConfigured() || !emailConfigured()) {
    return res.status(503).json({ error: 'Anonymous feedback is not available yet. Your message has not been sent. Please try again later.' });
  }
  try {
    // Duplicate protection is based on message content, never on the sender.
    const key = `mabn:feedback:${digest(message)}`;
    if (await redis(['GET', key])) return res.status(200).json({ ok: true });
    if (!await withinLimit('feedback', 30)) {
      return res.status(429).json({ error: 'The feedback inbox is busy. Please try again in an hour.' });
    }
    await sendFeedback(message, `mabn-${digest(message)}-${Math.floor(Date.now() / 86400000)}`);
    // Only a short-lived HMAC receipt is stored, never the message itself.
    // Email has been accepted, so a receipt storage failure must not report a send failure.
    try { await redis(['SET', key, 'sent', 'EX', 86400]); } catch {}
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(503).json({ error: 'Your message could not be sent right now. It is still in the box; please try again later.' });
  }
};
