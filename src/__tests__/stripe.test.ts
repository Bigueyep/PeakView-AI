import Stripe from 'stripe';

describe('Stripe config', () => {
  it('initializes with api version', () => {
    const s = new Stripe('sk_test_dummy', { apiVersion: '2024-06-20' });
    expect(s).toBeTruthy();
  });
});
