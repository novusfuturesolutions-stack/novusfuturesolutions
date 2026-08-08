'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Globe, Briefcase, Award, Users, TrendingUp } from 'lucide-react';

export const Footer = memo(function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-slate-200 bg-slate-100/90 px-4 pb-24 pt-0 text-slate-600 sm:px-6 lg:px-8 lg:pb-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top CTA Banner */}
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-blue-500/40 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white shadow-2xl sm:p-12 md:flex-row md:items-center">
          <div className="pointer-events-none absolute -right-16 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
          
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 font-mono text-[11px] text-white">
              <Globe className="w-3.5 h-3.5 text-blue-200" />
              <span>Novus Future Solutions (NFS) · Global Multi-Industry Recruitment</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready for Your Next Career or Hiring Opportunity?
            </h2>
            <p className="text-sm text-blue-100 max-w-xl">
              Discover verified vacancies in Technology, Healthcare, Finance, Construction, and Operations—or recruit pre-vetted professionals.
            </p>
          </div>

          <Link
            href="/jobs"
            className="group z-10 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-blue-700 shadow-[0_10px_28px_rgba(255,255,255,.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-50"
          >
            <span>Explore Vacancies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Pillars Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Vacancies</div>
              <div className="text-[10px] text-slate-500">Verified Global Jobs</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Verification</div>
              <div className="text-[10px] text-slate-500">Credential Checks</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Recruitment</div>
              <div className="text-[10px] text-slate-500">Executive & Corporate</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Growth</div>
              <div className="text-[10px] text-slate-500">Workforce Solutions</div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-600 pt-8 border-t border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/nfs-logo.png" alt="NFS Logo" className="mobile-logo-blue w-8 h-8 rounded-lg bg-white border border-blue-200 p-0.5 object-contain" />
              <span className="font-extrabold text-sm text-slate-900">Novus Future Solutions</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              NFS connects professionals with trusted employers across all sectors and supports corporate businesses through multi-industry recruitment, candidate screening, and practical growth advisory.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Global Offices & Hotlines</h4>
            <p className="font-medium text-slate-700">Novus Future Solutions (NFS)</p>
            <div className="mt-2.5 space-y-2 font-mono text-[11px]">
              <div>
                <span className="font-sans font-bold text-slate-900 block text-[11px]">🇩🇪 Germany Office</span>
                <a href="tel:+4915216405341" className="text-blue-600 hover:underline font-bold">+49 152 16405341</a>
              </div>
              <div>
                <span className="font-sans font-bold text-slate-900 block text-[11px]">🇱🇹 Lithuania Office</span>
                <a href="tel:+35679379950" className="text-blue-600 hover:underline font-bold">+356 79379950</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/jobs" className="hover:text-blue-600 font-medium">Browse Vacancies</Link></li>
              <li><Link href="/professionals" className="hover:text-blue-600 font-medium">Candidate Directory</Link></li>
              <li><Link href="/companies" className="hover:text-blue-600 font-medium">Employer Partners</Link></li>
              <li><Link href="/success-stories" className="hover:text-blue-600 font-medium">Success Stories</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600 font-medium">Blog &amp; Insights</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 font-medium">About NFS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Support & Legal</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/contact" className="hover:text-blue-600 font-medium">Contact Support</Link></li>
              <li><Link href="/auth" className="hover:text-blue-600 font-medium">Candidate & Recruiter Login</Link></li>
              <li><span className="text-slate-400">Privacy Policy</span></li>
              <li><span className="text-slate-400">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        {/* Copyright Banner */}
        <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Novus Future Solutions (NFS). All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
});
