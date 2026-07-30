'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Briefcase, Truck, Users, TrendingUp } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 pb-24 pt-0 text-slate-900 sm:px-6 lg:px-8 lg:pb-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top CTA Banner */}
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-[#172033] p-8 text-white shadow-xl sm:p-12 md:flex-row md:items-center">
          <div className="pointer-events-none absolute -right-16 -top-32 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl"></div>
          
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 font-mono text-[11px] text-orange-200">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>Novus Future Solutions (NFS) · Global Logistics Careers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready for Your Next Logistics Opportunity?
            </h2>
            <p className="text-sm text-slate-200 max-w-xl">
              Discover verified driver, transport, warehouse, and logistics roles—or find skilled professionals for your operation.
            </p>
          </div>

          <Link
            href="/jobs"
            className="group z-10 inline-flex shrink-0 items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-xs font-extrabold text-white shadow-[0_10px_28px_rgba(249,115,22,.28)] transition-all hover:-translate-y-0.5 hover:bg-orange-400"
          >
            <span>Explore Vacancies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Pillars Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Vacancies</div>
              <div className="text-[10px] text-slate-500">Verified Logistics Jobs</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Logistics</div>
              <div className="text-[10px] text-slate-500">Freight & Cargo Transport</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Recruitment</div>
              <div className="text-[10px] text-slate-500">Staffing & Manpower</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Growth</div>
              <div className="text-[10px] text-slate-500">Business Solutions</div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-600 pt-8 border-t border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/nfs-logo.png" alt="NFS Logo" className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 p-0.5" />
              <span className="font-extrabold text-sm text-slate-900">Novus Future Solutions</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              NFS connects logistics professionals with trusted employers and supports transport businesses through recruitment, freight expertise, and practical growth advisory.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Global Headquarters</h4>
            <p className="font-medium text-slate-800">Novus Future Solutions FZ-LLC</p>
            <p>Jumeirah Lakes Towers, Cluster X</p>
            <p>Dubai, United Arab Emirates</p>
            <p className="mt-2 text-blue-600 font-bold">London • Riyadh • Mumbai • Berlin</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Direct Contact</h4>
            <p className="mt-1">Email: <span className="text-slate-900 font-medium">contact@novusfuturesolutions.com</span></p>
            <p className="mt-1">Hotline: <span className="text-slate-900 font-medium">+971 4 800 6688</span></p>
            <p className="mt-1">Corporate Care: <span className="text-slate-900 font-medium">+44 20 7946 0921</span></p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Explore NFS</h4>
            <div className="space-y-2">
              <Link href="/jobs" className="block hover:text-orange-600 transition-colors">Vacancies</Link>
              <Link href="/professionals" className="block hover:text-orange-600 transition-colors">For Candidates</Link>
              <Link href="/companies" className="block hover:text-orange-600 transition-colors">For Employers</Link>
              <Link href="/about" className="block hover:text-orange-600 transition-colors">About NFS</Link>
              <Link href="/contact" className="block hover:text-orange-600 transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-slate-200">
          <span className="text-2xl sm:text-4xl lg:text-6xl font-black text-slate-300 tracking-tight block select-none uppercase">
            © 2026 Novus Future Solutions (NFS)
          </span>
          <div className="flex items-center justify-center gap-6 mt-4 text-[11px] text-slate-500">
            <Link href="/about" className="hover:text-slate-900">About Us</Link>
            <span>•</span>
            <Link href="/jobs" className="hover:text-slate-900">Vacancies</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-900">Contact Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
