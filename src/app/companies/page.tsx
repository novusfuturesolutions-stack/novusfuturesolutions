'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Search, MapPin, ShieldCheck, Users, Briefcase, ChevronRight } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export default function CompaniesPage() {
  const { companies } = useApp();
  const [query, setQuery] = useState('');
  const [followedIds, setFollowedIds] = useState<string[]>(['comp-1']);

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
        
        {/* Page Header */}
        <div className="space-y-2 pt-6 md:pt-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Verified Global Employers</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Building2 className="w-8 h-8 text-blue-600 shrink-0" />
            <span>Global Corporate Employers & Hiring Partners</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
            Connect with top verified employers hiring across Technology, Healthcare, Finance, Construction, Retail, and Global Operations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-blue-100 shadow-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search company name, industry sector, or headquarters (e.g. Apex, Technology, Healthcare, Dubai)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(company => {
            const isFollowing = followedIds.includes(company.id);
            return (
              <div key={company.id} className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between text-slate-900">
                
                <div>
                  <div className="h-28 relative bg-slate-100">
                    <img
                      src={company.coverImage}
                      alt={company.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute -bottom-6 left-6">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md bg-slate-50 border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="p-6 pt-8 space-y-3">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                        {company.website ? (
                          <a
                            href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1 text-blue-600 font-extrabold"
                            title={`Visit ${company.name} website`}
                          >
                            {company.name} ↗
                          </a>
                        ) : (
                          <Link href={`/companies/${company.id}`}>{company.name}</Link>
                        )}
                        {company.verified && <ShieldCheck className="w-4 h-4 text-blue-600 inline shrink-0" />}
                      </h3>
                      <p className="text-xs text-blue-600 font-medium line-clamp-1 mt-0.5">{company.tagline}</p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        {company.headquarters}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        {company.companySize}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <button
                    type="button"
                    onClick={() => toggleFollow(company.id)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                      isFollowing
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isFollowing ? 'Following ✓' : '+ Follow'}
                  </button>

                  <Link
                    href={`/companies/${company.id}`}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Profile ({company.activeJobsCount} Jobs)</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
