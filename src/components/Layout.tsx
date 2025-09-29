import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <header
        className={`sticky top-0 z-30 w-full border-b border-lightGray/70 bg-white/80 backdrop-blur ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-midnight font-semibold text-lg">
            PeakView <span className="text-pastelViolet">AI</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/pricing" className="text-midnight/80 hover:text-midnight">Pricing</Link>
            <Link href="/auth/login" className="text-midnight/80 hover:text-midnight">Login</Link>
            <Link href="/analyse" className="btn-primary">Tester ma visibilité GEO</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-lightGray/70">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-midnight/70 flex justify-between">
          <p>© {new Date().getFullYear()} PeakView GEO Analyzer</p>
          <div className="flex gap-4">
            <Link href="#">Mentions légales</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
