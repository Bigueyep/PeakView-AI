import Head from 'next/head';
import Layout from '@/components/Layout';
import type { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import { verifyJwt } from '@/lib/auth';
import Link from 'next/link';

type RequestItem = {
  id: string;
  geoScore: number | null;
  aiMention: boolean | null;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parse(ctx.req.headers.cookie || '').peakview_token || '';
  const payload = token ? verifyJwt(token) : null;
  if (!payload) {
    return {
      redirect: { destination: '/auth/login', permanent: false }
    };
  }
  return { props: {} };
};

export default function DashboardPage() {
  return (
    <Layout>
      <Head>
        <title>Dashboard | PeakView</title>
      </Head>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">Votre tableau de bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="font-medium mb-2">Score GEO global</h3>
            <div className="h-40 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-8 border-pastelViolet flex items-center justify-center text-2xl font-semibold">78</div>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-medium mb-2">Visibilité IA</h3>
            <p className="text-midnight/80">En cours d’analyse…</p>
          </div>
          <div className="card p-6">
            <h3 className="font-medium mb-2">Sentiment</h3>
            <span className="inline-flex px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">NEUTRAL</span>
          </div>
          <div className="card p-6">
            <h3 className="font-medium mb-2">Trafic</h3>
            <button className="btn-primary">Connecter mon compte GA</button>
          </div>
          <div className="card p-6">
            <h3 className="font-medium mb-2">Concurrence</h3>
            <ul className="list-disc pl-6 text-midnight/80">
              <li>Concurrent A</li>
              <li>Concurrent B</li>
            </ul>
          </div>
          <div className="card p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-medium mb-2">Passez au niveau supérieur</h3>
              <p className="text-midnight/80">Débloquez des fonctionnalités avancées avec le plan PRO.</p>
            </div>
            <Link href="/pricing" className="btn-primary mt-4">Voir les plans</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
