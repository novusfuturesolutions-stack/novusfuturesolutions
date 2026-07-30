'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { UserRole } from '@/lib/types';
import { User, Building2, Truck, ShieldAlert, ShoppingBag, RefreshCw, Eye } from 'lucide-react';

export const RoleSwitcherBanner = () => {
  const { currentUser, setCurrentUserRole, resetDemoData } = useApp();

  const roles: { role: UserRole; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { role: 'admin', label: 'NFS Admin', shortLabel: 'Admin', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { role: 'company', label: 'Corporate Client', shortLabel: 'Corporate', icon: <Building2 className="w-3.5 h-3.5" /> },
    { role: 'provider', label: 'Fleet Carrier', shortLabel: 'Fleet', icon: <Truck className="w-3.5 h-3.5" /> },
    { role: 'professional', label: 'Staff / Driver', shortLabel: 'Staff', icon: <User className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="bg-blue-50/80 border-b border-blue-100 text-xs py-1.5 px-4 text-slate-700">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <div className="flex items-center gap-1.5 text-slate-700 font-medium text-[11px] sm:text-xs">
            <Eye className="w-3.5 h-3.5 text-blue-600 hidden sm:inline" />
            <span className="text-slate-500 hidden sm:inline">NFS Perspective:</span>
            <span className="font-semibold text-blue-900 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] capitalize shadow-2xs">
              {currentUser.role}
            </span>
          </div>
        </div>

        {/* Right Role Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 custom-scrollbar">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-blue-200 shadow-2xs">
            {roles.map(r => {
              const isActive = currentUser.role === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => setCurrentUserRole(r.role)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {r.icon}
                  <span className="hidden md:inline">{r.label}</span>
                  <span className="md:hidden">{r.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={resetDemoData}
            title="Reset Demo Data"
            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg border border-blue-200 transition-all group ml-1"
          >
            <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
};
