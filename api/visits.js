const { prepare, body, redis, redisConfigured, withinLimit } = require('../lib/server');

module.exports = async function handler(req, res) {
  if (!prepare(req, res, ['GET', 'POST'])) return;
  if (!redisConfigured()) return res.status(503).json({ error: 'Visit counter is not configured.' });
  try {
    if (req.method === 'POST') {
      try { body(req); } catch { return res.status(400).json({ error: 'Invalid request.' }); }
      if (!await withinLimit('visits', 1000)) return res.status(429).json({ error: 'Please try again later.' });
    }
    const value = await redis([req.method === 'POST' ? 'INCR' : 'GET', 'mabn:visits:total']);
    const count = Number(value || 0);
    if (!Number.isSafeInteger(count) || count < 0) throw new Error();
    return res.status(200).json({ count });
  } catch {
    return res.status(503).json({ error: 'Visit counter is temporarily unavailable.' });
  }
};
