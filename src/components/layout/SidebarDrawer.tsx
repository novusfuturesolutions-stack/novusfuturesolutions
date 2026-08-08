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
  Award,
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
        { href: '/success-stories', label: 'Success Stories', icon: Award, badge: 'New' },
        { href: '/blog', label: 'Blog & Insights', icon: Sparkles, badge: 'Hot' },
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
      <div className="relative w-80 max-w-[85vw] bg-white border-r border-blue-200 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-300">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-700 flex items-center justify-between bg-blue-600 text-white">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <img src="/images/nfs-logo.png" alt="NFS Logo" className="h-9 w-auto object-contain brightness-0 invert" />
            <span className="text-[10px] text-blue-100 font-semibold">
              Logistics Careers Network
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
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
                          : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
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
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-600" /> NFS Hiring Network
              </span>
              <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                Live
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
              <div className="p-2 rounded-xl bg-white border border-blue-100 shadow-2xs">
                <div className="text-lg font-black text-blue-600">500+</div>
                <div className="text-[10px] text-slate-500">Live Vacancies</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-blue-100 shadow-2xs">
                <div className="text-lg font-black text-slate-900">50,000+</div>
                <div className="text-[10px] text-slate-500">Professionals</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="grid gap-2">
            {isAdmin && <Link href="/admin" onClick={onClose} className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 py-2.5 text-xs font-extrabold text-white hover:bg-blue-700">Open admin panel</Link>}
            {authUser ? (
              <button onClick={async () => { await signOut(); onClose(); }} className="inline-flex w-full items-center justify-center rounded-xl bg-white border border-slate-300 py-2.5 text-xs font-extrabold text-slate-800 hover:border-blue-500 hover:text-blue-600">Sign out</button>
            ) : (
              <Link href="/auth" onClick={onClose} className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 border border-blue-500 py-2.5 text-xs font-extrabold text-white hover:bg-blue-700">Sign in / Sign up</Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
