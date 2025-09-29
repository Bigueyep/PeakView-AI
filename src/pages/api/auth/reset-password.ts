import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body as { email?: string };
    if (!email) return res.status(400).json({ error: 'Missing email' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(200).json({ ok: true });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    // In production, send email via nodemailer. Here we just return token for simplicity.
    return res.status(200).json({ resetToken: token });
  }
  if (req.method === 'PUT') {
    const { token, newPassword } = req.body as { token?: string; newPassword?: string };
    if (!token || !newPassword) return res.status(400).json({ error: 'Missing fields' });
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({ where: { id: payload.userId }, data: { passwordHash } });
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
