'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/AppContext';
import {
  Users,
  Search,
  ShieldCheck,
  Award,
  UserPlus
} from 'lucide-react';

export default function ProfessionalsPage() {
  const { professionalProfiles, connectedUserIds, sendConnectionRequest } = useApp();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState('');

  const filtered = professionalProfiles.filter(p => {
    const matchesQuery = query === '' || p.name.toLowerCase().includes(query.toLowerCase()) || p.headline.toLowerCase().includes(query.toLowerCase()) || p.skills.some(s => s.toLowerCase().includes(query.toLowerCase()));
    const matchesCat = category === '' || p.category === category;
    const matchesAvail = availability === '' || p.availability === availability;
    return matchesQuery && matchesCat && matchesAvail;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header with Crisp Dark Slate Text */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">For Employers & Recruiters</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-8 h-8 text-blue-600 shrink-0" />
            <span>Logistics Talent & Drivers Directory</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
            Recruit verified CDL truck drivers, freight forwarders, dispatchers, and warehouse personnel with verified credentials.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-3">
            
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by name, CDL license, skills (e.g. Hazmat, FASAH)..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>

            <div className="lg:col-span-4">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              >
                <option value="">All Logistics Roles</option>
                <option value="Truck Driver">Truck Driver</option>
                <option value="Dispatcher">Dispatcher</option>
                <option value="Warehouse Staff">Warehouse Staff</option>
              </select>
            </div>

            <div className="lg:col-span-3">
              <select
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              >
                <option value="">All Availability Statuses</option>
                <option value="open_to_work">Open to Work</option>
                <option value="available">Immediately Available</option>
              </select>
            </div>

          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(prof => {
            const isConnected = connectedUserIds.includes(prof.userId);
            return (
              <div key={prof.userId} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between space-y-5">
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
                      alt={prof.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30 shrink-0"
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1">
                        {prof.name}
                        <ShieldCheck className="w-4 h-4 text-blue-600 inline" />
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 font-medium">{prof.headline}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          {prof.availability === 'open_to_work' ? 'Open to Work' : 'Available'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">{prof.experienceYears} Years Exp</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prof.bio}
                  </p>

                  {/* Verified Licenses */}
                  {prof.licenses.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Commercial Licenses</span>
                      <div className="space-y-1">
                        {prof.licenses.map(lic => (
                          <div key={lic.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-blue-700 flex items-center gap-1.5 font-bold">
                            <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span className="line-clamp-1">{lic.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {prof.skills.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => sendConnectionRequest(prof.userId)}
                    className={`px-3 py-2 rounded-xl border font-bold flex items-center gap-1.5 transition-colors ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{isConnected ? 'Connected ✓' : 'Connect'}</span>
                  </button>

                  <Link
                    href={`/professionals/${prof.userId}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-sm"
                  >
                    View Profile
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
