'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import { SidebarDrawer } from './SidebarDrawer';
import { Home, Plus, Briefcase, LayoutDashboard, SlidersHorizontal, Users, Building2, Bell } from 'lucide-react';

export const MobileBottomNav = memo(function MobileBottomNav() {
  const pathname = usePathname();
  const { currentUser, sidebarOpen, setSidebarOpen, notifications } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(item => !item.read).length;

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
    { href: '/professionals', label: 'Candidates', icon: Users },
    { href: '/companies', label: 'Employers', icon: Building2 }
  ];

  return (
    <>
      <header className="fixed left-3 right-3 top-[max(0.65rem,env(safe-area-inset-top))] z-50 flex h-12 items-center justify-between rounded-2xl border border-blue-200/80 bg-white/95 px-3 shadow-[0_8px_25px_rgba(37,99,235,.15)] backdrop-blur-2xl lg:hidden">
        <Link href="/" className="flex items-center px-1" aria-label="Novus Future home">
          <img src="/images/nfs-logo.png" alt="NFS Logo" className="mobile-logo-blue h-7 w-auto object-contain" />
        </Link>

        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNotifications(value => !value)}
            className="relative grid h-8 w-8 place-items-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-xs transition-colors hover:bg-blue-50"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={showNotifications}
          >
            <Bell className={`h-4 w-4 ${unreadCount > 0 ? 'animate-wiggle' : ''}`} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 z-10 grid h-4 min-w-4 animate-bounce place-items-center rounded-full bg-blue-600 px-1 text-[8px] font-black text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
            {unreadCount > 0 && <span className="absolute inset-0 rounded-full bg-blue-400/35 animate-ping" />}
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-8 items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 text-[9px] font-extrabold uppercase tracking-[.12em] text-blue-600 shadow-xs transition-transform active:scale-95 hover:bg-blue-100"
            aria-label="Open Sidebar Menu"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
            Menu
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 z-[90] w-[min(21rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-blue-200 bg-white text-slate-900 shadow-2xl">
              <div className="border-b border-slate-100 bg-blue-50 px-4 py-3">
                <p className="text-xs font-black">Notifications</p>
                <p className="mt-0.5 text-[9px] text-slate-500">Recent recruitment updates</p>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-6 text-center text-[10px] font-bold text-slate-400">No notifications yet</p>
                ) : notifications.slice(0, 6).map(item => (
                  <Link
                    key={item.id}
                    href={item.link || '/jobs'}
                    onClick={() => setShowNotifications(false)}
                    className="flex gap-3 border-b border-slate-100 p-4 last:border-0 hover:bg-blue-50/60"
                  >
                    <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.read ? 'bg-slate-300' : 'bg-blue-600'}`} />
                    <span>
                      <strong className="block text-[11px] font-black">{item.title}</strong>
                      <span className="mt-1 block text-[9px] leading-4 text-slate-600">{item.message}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <nav
        className="lg:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3 z-40 rounded-[1.65rem] border border-blue-200/80 bg-white/95 px-2 py-2 shadow-[0_12px_35px_rgba(37,99,235,.2)] backdrop-blur-2xl"
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
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-slate-100 bg-blue-600 text-white shadow-[0_10px_28px_rgba(37,99,235,.4)] transition-transform duration-300 group-active:scale-90">
                    <Icon className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[.13em] text-blue-600">
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
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Icon className={`h-[1.15rem] w-[1.15rem] ${isActive ? 'stroke-[2.4] text-blue-600' : 'stroke-[1.8]'}`} />
                <span className={`mt-1 max-w-full truncate px-1 text-[8px] leading-none ${isActive ? 'font-bold text-blue-600' : 'font-medium'}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className="absolute right-1.5 top-0.5 rounded-full bg-blue-600 px-1 py-px text-[6px] font-black tracking-wide text-white">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-0.5 h-1 w-4 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,.8)]" />
                )}
              </Link>
            );
          })}

        </div>
      </nav>

      <SidebarDrawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
});
