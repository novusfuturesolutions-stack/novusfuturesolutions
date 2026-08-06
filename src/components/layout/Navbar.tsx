'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleUserRound, LogOut, ShieldCheck, UserRound, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { useApp } from '@/lib/context/AppContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Vacancies' },
  { href: '/professionals', label: 'For Candidates' },
  { href: '/companies', label: 'For Employers' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, signOut } = useAuth();
  const { toggleSidebar } = useApp();

  if (pathname === '/' || pathname === '/auth' || pathname.startsWith('/admin')) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-[80] hidden px-4 md:block">
      <div className="pointer-events-auto mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 p-1.5 shadow-[0_10px_30px_rgba(37,99,235,.15)] ring-1 ring-blue-100 backdrop-blur-2xl">
        <Link href="/" className="flex items-center pl-2 pr-1 group" aria-label="Novus Future Solutions Home">
          <img src="/images/nfs-logo.png" alt="NFS Logo" className="h-6 w-auto object-contain transition-transform group-hover:scale-105" />
        </Link>

        <span className="h-5 w-px bg-slate-200" />

        <nav className="flex items-center" aria-label="Primary navigation">
          {links.map(link => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-bold transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-500'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <span className="h-6 w-px bg-slate-200" />

        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-100 border border-blue-200/60 px-3.5 py-2 text-[10px] font-black text-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors"
          aria-label="Open navigation menu"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
          Menu
        </button>

        <Link href="/contact" className="whitespace-nowrap rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black text-white transition hover:bg-blue-700 shadow-md shadow-blue-600/20">
          Contact
        </Link>

        {isAdmin && (
          <Link href="/admin" className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white shadow-md" aria-label="Admin panel">
            <ShieldCheck className="h-4 w-4" />
          </Link>
        )}

        {user ? (
          <>
            <Link href="/profile" className="grid h-8 w-8 place-items-center rounded-full border border-blue-200 bg-blue-50 text-blue-600" aria-label="My profile"><CircleUserRound className="h-4 w-4" /></Link>
            <button onClick={() => signOut()} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-100 px-3.5 py-2 text-[10px] font-black text-slate-800 border border-slate-200 hover:border-blue-400">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </>
        ) : (
          <Link href="/auth" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-blue-600 border border-blue-500 px-3.5 py-2 text-[10px] font-black text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all">
            <UserRound className="h-3.5 w-3.5" /> Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
