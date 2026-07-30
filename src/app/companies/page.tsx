'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Search, MapPin, ShieldCheck, Users, Briefcase, ChevronRight } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export default function CompaniesPage() {
  const { companies } = useApp();
  const [query, setQuery] = useState('');
  const [followedIds, setFollowedIds] = useState<string[]>(['c-1']);

  const toggleFollow = (id: string) => {
    setFollowedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.industry.toLowerCase().includes(query.toLowerCase()) ||
    c.headquarters.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header with Crisp Dark Slate Text */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Verified Employers</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Building2 className="w-8 h-8 text-blue-600 shrink-0" />
            <span>Logistics & Freight Employers</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
            Connect with top transport fleets, customs brokerages, air & ocean freight forwarders, and logistics enterprises.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search company name, industry sector, or headquarters (e.g. Apex, Road Freight, Dubai)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(company => {
            const isFollowing = followedIds.includes(company.id);
            return (
              <div key={company.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between">
                
                <div>
                  {/* Banner Header */}
                  <div className="h-28 bg-slate-900 relative">
                    <img
                      src={company.coverImage}
                      alt={company.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-blue-300 text-[10px] font-bold border border-slate-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      Verified Fleet
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="p-6 pt-0 relative">
                    <div className="flex items-end justify-between -mt-10 mb-4">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg bg-white"
                      />
                      
                      <button
                        type="button"
                        onClick={() => toggleFollow(company.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          isFollowing
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        }`}
                      >
                        {isFollowing ? 'Following ✓' : '+ Follow'}
                      </button>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base hover:text-blue-600 transition-colors">
                      <Link href={`/companies/${company.id}`}>{company.name}</Link>
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold">{company.industry}</p>
                    
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {company.tagline}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        {company.headquarters}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        {company.companySize}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <Briefcase className="w-3.5 h-3.5" />
                    {company.activeJobsCount} Active Jobs
                  </span>

                  <Link
                    href={`/companies/${company.id}`}
                    className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
