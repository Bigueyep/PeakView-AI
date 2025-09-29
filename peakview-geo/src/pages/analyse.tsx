import Head from 'next/head';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AnalysePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ companyName: '', websiteUrl: '', email: '', keywords: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: form.companyName,
          websiteUrl: form.websiteUrl,
          keywords: form.keywords
        })
      });
      if (res.status === 401) {
        router.push('/auth/login');
        return;
      }
      if (!res.ok) throw new Error('Erreur de création');
      router.push('/dashboard');
    } catch (err) {
      alert('Erreur: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Analyse | PeakView</title>
      </Head>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-semibold mb-6">Lancer mon analyse</h1>
        <form onSubmit={submit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Nom de l’entreprise</label>
            <input
              className="w-full rounded-card border border-lightGray px-3 py-2"
              required
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">URL du site</label>
            <input
              type="url"
              className="w-full rounded-card border border-lightGray px-3 py-2"
              required
              value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
            />
          </div>
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
            <label className="block text-sm mb-1">3 mots‑clés (séparés par des virgules)</label>
            <input
              className="w-full rounded-card border border-lightGray px-3 py-2"
              required
              placeholder="ex: agence seo, seo local, visibilité"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Envoi…' : 'Lancer mon analyse'}
          </button>
        </form>
      </section>
    </Layout>
  );
}
