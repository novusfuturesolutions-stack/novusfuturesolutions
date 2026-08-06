import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminNotFound() {
  return (
    <div className="fixed inset-0 z-[150] grid place-items-center bg-white px-5 text-slate-950">
      <main className="max-w-md text-center">
        <p className="text-sm font-black tracking-[.2em] text-blue-600">404</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          The page you requested does not exist or is unavailable.
        </p>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-bold text-white transition hover:bg-blue-600">
          <ArrowLeft className="h-4 w-4" /> Return home
        </Link>
      </main>
    </div>
  );
}
