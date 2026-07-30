'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Users, Briefcase, Truck, TrendingUp, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Global Logistics & Recruitment Network</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About Novus Future Solutions
          </h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
            Novus Future Solutions (NFS) connects commercial drivers, logistics managers, and freight specialists with top employers around the world.
          </p>
        </div>

        {/* Logo Banner Card */}
        <div className="p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <img src="/images/nfs-logo.png" alt="NFS Logo" className="w-36 h-auto bg-white rounded-2xl p-2 shrink-0 shadow-md" />
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-white">Our Mission & Core Purpose</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We streamline logistics recruitment and cargo advisory. By combining verified driver vacancies, candidate credential screening, and enterprise hiring tools, NFS powers supply-chain operations across borders.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-extrabold text-slate-900">How NFS Powers Freight & Careers</h3>
            <p className="text-xs text-slate-500">Four core capabilities supporting candidates and employers worldwide.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-sm">
                <div className="p-2 rounded-xl bg-blue-50">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <span>1. Verified Logistics Vacancies</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct access to CDL driver, fleet dispatcher, warehouse, and supply-chain openings with transparent requirements.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-sm">
                <div className="p-2 rounded-xl bg-blue-50">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <span>2. Freight Industry Expertise</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deep operational knowledge across road freight, heavy container transport, warehousing, cold chain, and customs clearance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-sm">
                <div className="p-2 rounded-xl bg-blue-50">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span>3. Employer Staffing Solutions</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Candidate sourcing, licence verification, applicant tracking, and direct recruiter communication tools.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-sm">
                <div className="p-2 rounded-xl bg-blue-50">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span>4. Practical Growth Advisory</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Workforce strategy, fleet performance optimization, and international market expansion guidance.
              </p>
            </div>

          </div>
        </div>

        {/* Global Network Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-extrabold text-white">Global Presence</h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Headquartered in Dubai, UAE, with operational hubs in London, Riyadh, Mumbai, and Berlin.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-extrabold text-xs rounded-xl shadow-md hover:bg-slate-100 transition-colors">
            <span>Contact Global Offices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
