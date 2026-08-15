'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Globe, Briefcase, Award, Users, TrendingUp, Mail, MapPin, MessageCircle } from 'lucide-react';

export const Footer = memo(function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-slate-200 bg-slate-100/90 px-4 pb-24 pt-0 text-slate-600 sm:px-6 lg:px-8 lg:pb-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
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

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-600 pt-6 border-t border-slate-200">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center p-2 shadow-md shadow-blue-600/30 shrink-0">
                <img src="/images/nfs-logo.png" alt="NFS Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
              <span className="font-black text-base text-slate-900 tracking-tight">Novus Future Solutions</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              NFS connects professionals with trusted employers across all sectors and supports corporate businesses through multi-industry recruitment, candidate screening, and practical growth advisory.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Global Contact Center</h4>
            <div className="space-y-2 text-[11px]">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 mb-1">
                <MessageCircle className="w-3 h-3 text-emerald-600" />
                <span>WhatsApp Only</span>
              </div>
              <div className="space-y-1.5 font-mono">
                <a href="https://wa.me/4915216405341" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-800 hover:text-emerald-600 font-bold transition-colors">
                  <span>🇩🇪 Germany:</span>
                  <span>+49 152 16405341</span>
                </a>
                <a href="https://wa.me/37060059290" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-800 hover:text-emerald-600 font-bold transition-colors">
                  <span>🇱🇹 Lithuania:</span>
                  <span>+370 600 59290</span>
                </a>
                <a href="https://wa.me/35677929643" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-800 hover:text-emerald-600 font-bold transition-colors">
                  <span>🇲🇹 Malta:</span>
                  <span>+356 7792 9643</span>
                </a>
                <a href="https://wa.me/918138092098" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-800 hover:text-emerald-600 font-bold transition-colors">
                  <span>🇮🇳 India:</span>
                  <span>+91 81380 92098</span>
                </a>
              </div>
              <div className="pt-2 border-t border-slate-200/80 space-y-1 font-sans">
                <p className="text-slate-500 font-medium">Official Email:</p>
                <a href="mailto:novusfuturesolutions@gmail.com" className="text-blue-600 hover:underline font-bold block truncate">novusfuturesolutions@gmail.com</a>
                <p className="text-slate-500 font-medium pt-1">HQ Address:</p>
                <p className="text-slate-700 font-semibold leading-tight">Vilnius, Girulių St. 5, LT-12124 Lithuania</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Main Portals</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/jobs" className="hover:text-blue-600 font-bold text-slate-900">1. For Job Seekers</Link></li>
              <li><Link href="/services" className="hover:text-blue-600 font-bold text-slate-900">2. Services</Link></li>
              <li><Link href="/companies" className="hover:text-blue-600 font-bold text-slate-900">3. For Employer</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 font-medium">About NFS</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 font-medium">Contact Us</Link></li>
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
