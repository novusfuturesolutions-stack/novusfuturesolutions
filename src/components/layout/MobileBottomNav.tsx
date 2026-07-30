'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import { SidebarDrawer } from './SidebarDrawer';
import { Home, Plus, Briefcase, LayoutDashboard, SlidersHorizontal, Truck, Building2 } from 'lucide-react';

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const { currentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getDashboardPath = () => {
    switch (currentUser.role) {
      case 'company': return '/dashboard/company';
      case 'provider': return '/dashboard/provider';
      case 'admin': return '/dashboard/admin';
      default: return '/dashboard/professional';
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/jobs', label: 'Vacancies', icon: Briefcase, badge: 'HOT' },
    {
      href: '/contact',
      label: 'Contact',
      icon: Plus,
      isCenter: true
    },
    { href: '/professionals', label: 'Candidates', icon: Truck },
    { href: '/companies', label: 'Employers', icon: Building2 }
  ];

  return (
    <>
      <header className="fixed left-3 right-3 top-[max(0.65rem,env(safe-area-inset-top))] z-50 flex h-12 items-center justify-between rounded-2xl border border-slate-200/80 bg-white/85 px-3 shadow-[0_12px_35px_rgba(15,23,42,.14)] backdrop-blur-2xl lg:hidden">
        <Link href="/" className="flex items-center gap-2" aria-label="Novus Future home">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-[10px] font-black text-white shadow-md">
            N
          </span>
          <span className="text-[11px] font-black tracking-[-.02em] text-slate-950">
            NOVUS <span className="text-blue-600">FUTURE</span> SOLUTIONS
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="inline-flex h-8 items-center gap-2 rounded-full bg-slate-950 px-3 text-[9px] font-extrabold uppercase tracking-[.12em] text-white shadow-md transition-transform active:scale-95"
          aria-label="Open Sidebar Menu"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Menu
        </button>
      </header>

      <nav
        className="lg:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3 z-40 rounded-[1.65rem] border border-white/10 bg-slate-950/95 px-2 py-2 shadow-[0_18px_50px_rgba(15,23,42,.38)] backdrop-blur-2xl"
        aria-label="Mobile navigation"
      >
        <div className="flex h-14 items-center justify-between gap-0.5">
          
          {/* Main Navigation Tabs */}
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.isCenter) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative -mt-7 flex min-w-[3.7rem] flex-col items-center justify-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-slate-950 bg-blue-600 text-white shadow-[0_10px_28px_rgba(37,99,235,.5)] transition-transform duration-300 group-active:scale-90">
                    <Icon className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[.13em] text-blue-300">
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex h-12 min-w-0 flex-1 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className={`h-[1.15rem] w-[1.15rem] ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                <span className={`mt-1 max-w-full truncate px-1 text-[8px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className="absolute right-1.5 top-0.5 rounded-full bg-orange-500 px-1 py-px text-[6px] font-black tracking-wide text-white">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-0.5 h-1 w-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,.9)]" />
                )}
              </Link>
            );
          })}

        </div>
      </nav>

      <SidebarDrawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};
