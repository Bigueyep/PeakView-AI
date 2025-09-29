import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { readAuthCookie, verifyJwt } from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

const priceMap: Record<string, string> = {
  STARTER: process.env.STRIPE_PRICE_STARTER || 'price_Starter_Placeholder',
  PRO: process.env.STRIPE_PRICE_PRO || 'price_Pro_Placeholder',
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE || 'price_Enterprise_Placeholder'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = readAuthCookie(req.headers.cookie);
  const payload = token ? verifyJwt(token) : null;
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });

  const { plan } = req.body as { plan?: 'STARTER' | 'PRO' | 'ENTERPRISE' };
  if (!plan || !priceMap[plan]) return res.status(400).json({ error: 'Invalid plan' });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceMap[plan],
        quantity: 1
      }
    ],
    success_url: `${req.headers.origin}/dashboard?success=true`,
    cancel_url: `${req.headers.origin}/pricing?canceled=true`,
    metadata: {
      userId: payload.userId,
      plan
    }
  });

  return res.status(200).json({ id: session.id, url: session.url });
}
