import Head from 'next/head';
import Layout from '@/components/Layout';

const plans = [
  { name: 'Starter', price: '49 €/mois', key: 'STARTER' as const },
  { name: 'Pro', price: '149 €/mois', key: 'PRO' as const },
  { name: 'Enterprise', price: 'Sur devis', key: 'ENTERPRISE' as const }
];

export default function PricingPage() {
  const subscribe = async (plan: 'STARTER' | 'PRO' | 'ENTERPRISE') => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan })
    });
    if (!res.ok) {
      alert('Erreur de paiement');
      return;
    }
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url as string;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Pricing | PeakView</title>
      </Head>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-semibold mb-10">Choisissez votre plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.key} className="card p-6 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-midnight/80 mb-6">{p.price}</p>
              {p.key === 'ENTERPRISE' ? (
                <a href="mailto:sales@peakview.ai" className="btn-primary mt-auto">Contactez‑nous</a>
              ) : (
                <button className="btn-primary mt-auto" onClick={() => subscribe(p.key)}>
                  Souscrire
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
