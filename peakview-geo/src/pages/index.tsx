import Head from 'next/head';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>PeakView GEO Analyzer</title>
      </Head>
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 fade-in-up">
            <h1 className="text-4xl md:text-5xl font-semibold text-midnight">
              Analysez votre visibilité GEO avec une précision de niveau Pro
            </h1>
            <p className="text-lg text-midnight/80">
              PeakView GEO Analyzer vous aide à mesurer votre présence locale, connecter vos
              analytics et accélérer votre croissance.
            </p>
            <div className="flex gap-4">
              <Link href="/analyse" className="btn-primary">Tester ma visibilité GEO gratuitement</Link>
              <Link href="/pricing" className="inline-flex items-center px-5 py-3 rounded-card border border-lightGray text-midnight/80 hover:text-midnight">Voir les offres</Link>
            </div>
          </div>
          <div className="fade-in-up">
            <div className="card p-8">
              <div className="h-48 bg-lightGray rounded-card" />
              <p className="mt-4 text-sm text-midnight/70">Aperçu du dashboard (placeholder)</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
