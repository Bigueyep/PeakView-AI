import { signJwt, verifyJwt } from '@/lib/auth';

describe('JWT helpers', () => {
  it('signs and verifies a token', () => {
    const token = signJwt({ userId: 'u1', email: 'a@b.com' }, '1h');
    const payload = verifyJwt(token);
    expect(payload?.userId).toBe('u1');
    expect(payload?.email).toBe('a@b.com');
  });
});
