import type { NextApiRequest, NextApiResponse } from 'next';

export function applySecurityHeaders(res: NextApiResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=()');
}

export function allowCors(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin || '*';
  const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
  const isAllowed = allowedOrigins.length === 0 || allowedOrigins.includes(origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Origin', isAllowed ? origin : allowedOrigins[0] || '*');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}
