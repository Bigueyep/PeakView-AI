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

  if (req.method === 'GET') {
    const list = await prisma.request.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(list);
  }

  if (req.method === 'POST') {
    const { companyName, websiteUrl, keywords } = req.body as {
      companyName?: string;
      websiteUrl?: string;
      keywords?: string;
    };
    if (!companyName || !websiteUrl || !keywords)
      return res.status(400).json({ error: 'Missing fields' });
    const created = await prisma.request.create({
      data: {
        userId: payload.userId,
        companyName,
        websiteUrl,
        keywords
      }
    });
    return res.status(201).json(created);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
