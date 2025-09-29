import { RateLimiterMemory } from 'rate-limiter-flexible';
import type { NextApiRequest } from 'next';

const limiter = new RateLimiterMemory({ points: 10, duration: 60 });

export async function consumeRateLimit(req: NextApiRequest) {
  const key = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
  await limiter.consume(Array.isArray(key) ? key[0] : (key as string));
}
