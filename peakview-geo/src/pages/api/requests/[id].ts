import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { readAuthCookie, verifyJwt } from '@/lib/auth';
import { applySecurityHeaders, allowCors } from '../_utils/security';
import { consumeRateLimit } from '../_utils/rateLimit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  applySecurityHeaders(res);
  if (allowCors(req, res)) return;
  try {
    await consumeRateLimit(req);
  } catch {
    return res.status(429).json({ error: 'Too many requests' });
  }
  const token = readAuthCookie(req.headers.cookie);
  const payload = token ? verifyJwt(token) : null;
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query as { id: string };
  const item = await prisma.request.findFirst({ where: { id, userId: payload.userId } });
  if (!item) return res.status(404).json({ error: 'Not found' });
  return res.status(200).json(item);
}
