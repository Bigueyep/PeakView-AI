import Head from 'next/head';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Identifiants invalides');
      router.push('/dashboard');
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Login | PeakView</title>
      </Head>
      <section className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-semibold mb-6">Se connecter</h1>
        <form onSubmit={submit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-card border border-lightGray px-3 py-2"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full rounded-card border border-lightGray px-3 py-2"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
          <div className="text-sm text-midnight/70">
            Pas de compte ? <Link href="/auth/signup" className="text-pastelViolet">Créer mon compte</Link>
          </div>
        </form>
      </section>
    </Layout>
  );
}
