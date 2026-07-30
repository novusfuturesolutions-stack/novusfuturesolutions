'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import { UserRole } from '@/lib/types';
import {
  Truck,
  TrendingUp,
  Globe,
  DollarSign,
  Home,
  Building2,
  X,
  User,
  ShieldAlert,
  Sparkles,
  MessageSquare,
  LayoutDashboard,
  RefreshCw,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { currentUser, setCurrentUserRole, resetDemoData } = useApp();
  const { user: authUser, isAdmin, signOut } = useAuth();

  if (!isOpen) return null;

  const roles: { role: UserRole; label: string; icon: React.ReactNode }[] = [
    { role: 'professional', label: 'Job Seeker', icon: <User className="w-3.5 h-3.5" /> },
    { role: 'company', label: 'Employer', icon: <Building2 className="w-3.5 h-3.5" /> },
    { role: 'provider', label: 'Fleet Partner', icon: <Truck className="w-3.5 h-3.5" /> },
    { role: 'admin', label: 'NFS Admin', icon: <ShieldAlert className="w-3.5 h-3.5" /> }
  ];

  const getDashboardPath = () => {
    switch (currentUser.role) {
      case 'company': return '/dashboard/company';
      case 'provider': return '/dashboard/provider';
      case 'admin': return '/dashboard/admin';
      default: return '/dashboard/professional';
    }
  };

  const navSections = [
    {
      title: 'Navigation',
      items: [
        { href: '/', label: 'Home', icon: Home },
        { href: '/jobs', label: 'Vacancies', icon: Briefcase, badge: '500+' },
        { href: '/professionals', label: 'For Candidates', icon: User },
        { href: '/companies', label: 'For Employers', icon: Building2 },
        { href: '/about', label: 'About NFS', icon: Globe },
        { href: '/contact', label: 'Contact Us', icon: MessageSquare }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sliding Sidebar Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white border-r border-slate-200 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-300">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <img src="/images/nfs-logo.png" alt="NFS" className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-0.5" />
            <div>
              <div className="text-sm font-black leading-none tracking-tight text-slate-900">
                NOVUS <span className="text-blue-600">FUTURE</span> SOLUTIONS
              </div>
              <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                Logistics Careers Network
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Perspective Selector */}
        <div className="p-4 bg-slate-50/60 border-b border-slate-200 space-y-3">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/30"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{currentUser.name}</div>
                <div className="text-[10px] text-blue-600 font-semibold capitalize flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" /> {currentUser.role} Account
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetDemoData}
              title="Reset Demo Data"
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Choose your account:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {roles.map(r => {
                const isActive = currentUser.role === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setCurrentUserRole(r.role)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {r.icon}
                    <span className="truncate">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
          {navSections.map(section => (
            <div key={section.title} className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 px-2">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 border border-blue-200">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Platform Live Stats */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-500" /> NFS Hiring Network
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                Live
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
              <div className="p-2 rounded-xl bg-white border border-slate-200">
                <div className="text-lg font-black text-orange-500">500+</div>
                <div className="text-[10px] text-slate-500">Live Vacancies</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200">
                <div className="text-lg font-black text-slate-950">50,000+</div>
                <div className="text-[10px] text-slate-500">Professionals</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="grid gap-2">
            {isAdmin && <Link href="/admin" onClick={onClose} className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 py-2.5 text-xs font-extrabold text-white">Open admin panel</Link>}
            {authUser ? (
              <button onClick={async () => { await signOut(); onClose(); }} className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 py-2.5 text-xs font-extrabold text-white">Sign out</button>
            ) : (
              <Link href="/auth" onClick={onClose} className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 py-2.5 text-xs font-extrabold text-white">Sign in / Sign up</Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
