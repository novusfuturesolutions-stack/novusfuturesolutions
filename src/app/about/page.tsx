'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Users, Briefcase, TrendingUp, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-6 md:pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-200">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Global Talent & Multi-Industry Recruitment Network</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About Novus Future Solutions
          </h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
            Novus Future Solutions (NFS) connects software engineers, healthcare specialists, financial directors, project managers, commercial drivers, and operations leaders with top employers worldwide.
          </p>
        </div>

        {/* Logo Banner Card */}
        <div className="p-8 rounded-3xl bg-white text-slate-900 border border-blue-100 shadow-md flex flex-col md:flex-row items-center gap-8">
          <img src="/images/nfs-logo.png" alt="NFS Logo" className="mobile-logo-blue w-36 h-auto bg-slate-50 border border-blue-200 rounded-2xl p-2 shrink-0 shadow-xs object-contain" />
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-slate-900">Our Mission & Core Purpose</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We streamline global recruitment and enterprise workforce advisory. By combining verified candidate profiles across all industries, credential screening, and enterprise hiring tools, NFS powers workforce expansion across international borders.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-extrabold text-slate-900">How NFS Powers Careers & Hiring</h3>
            <p className="text-xs text-slate-500">Four core capabilities supporting candidates and corporate employers worldwide.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-sm">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <span>1. Verified Multi-Industry Vacancies</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct access to openings in Technology, Healthcare, Finance, Engineering, Construction, Sales, Logistics, and Executive Management.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-sm">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <span>2. Credential & Background Verification</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thorough screening of degrees, technical certifications, medical licenses, commercial CDLs, and work experience history.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-sm">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span>3. Employer Staffing & Executive Search</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated corporate recruitment drives, candidate sourcing, applicant tracking, and direct recruiter communication tools.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2.5 text-blue-600 font-extrabold text-sm">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span>4. Enterprise Growth & Workforce Advisory</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Workforce strategy, organization scaling, talent acquisition optimization, and international market expansion guidance.
              </p>
            </div>

          </div>
        </div>

        {/* Global Network Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 border border-blue-500/40 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-extrabold text-white">Global Hubs & Direct Representation</h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Connecting candidates and corporate employers across Germany, Lithuania, Europe, and Middle East.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-mono">
            <a href="tel:+4915216405341" className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl border border-white/30 text-white font-bold transition-colors">
              🇩🇪 Germany: +49 152 16405341
            </a>
            <a href="tel:+35679379950" className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl border border-white/30 text-white font-bold transition-colors">
              🇱🇹 Lithuania: +356 79379950
            </a>
          </div>

          <div className="pt-2">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-xs rounded-xl shadow-md transition-colors">
              <span>Contact Regional Offices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
