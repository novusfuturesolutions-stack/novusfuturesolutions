'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleUserRound, LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

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

  if (pathname === '/' || pathname === '/auth' || pathname.startsWith('/admin')) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-[80] hidden px-4 md:block">
      <div className="pointer-events-auto mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-white/30 bg-slate-700/75 p-1.5 shadow-[0_14px_40px_rgba(15,23,42,.24)] ring-1 ring-slate-950/10 backdrop-blur-2xl">
        <nav className="flex items-center" aria-label="Primary navigation">
          {links.map(link => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-bold transition-all ${
                  active
                    ? 'bg-white/25 text-white shadow-sm ring-1 ring-white/20'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <span className="h-6 w-px bg-white/20" />

        <Link href="/contact" className="whitespace-nowrap rounded-full bg-orange-500 px-4 py-2 text-[10px] font-black text-white transition hover:bg-orange-400">
          Contact
        </Link>

        {isAdmin && (
          <Link href="/admin" className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white" aria-label="Admin panel">
            <ShieldCheck className="h-4 w-4" />
          </Link>
        )}

        {user ? (
          <>
            <Link href="/profile" className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/15 text-white" aria-label="My profile"><CircleUserRound className="h-4 w-4" /></Link>
            <button onClick={() => signOut()} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-950/70 px-3.5 py-2 text-[10px] font-black text-white">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </>
        ) : (
          <Link href="/auth" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-blue-600 px-3.5 py-2 text-[10px] font-black text-white shadow-lg shadow-blue-600/25">
            <UserRound className="h-3.5 w-3.5" /> Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
