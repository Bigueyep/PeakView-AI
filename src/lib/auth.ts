import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const TOKEN_NAME = 'peakview_token';

export type JwtPayload = {
  userId: string;
  email: string;
};

export function signJwt(payload: JwtPayload, expiresIn: string = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function createAuthCookie(token: string, prod: boolean) {
  return serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: prod,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAuthCookie(prod: boolean) {
  return serialize(TOKEN_NAME, '', {
    httpOnly: true,
    secure: prod,
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });
}

export function readAuthCookie(cookieHeader?: string): string | null {
  if (!cookieHeader) return null;
  const cookies = parse(cookieHeader);
  return cookies[TOKEN_NAME] || null;
}
