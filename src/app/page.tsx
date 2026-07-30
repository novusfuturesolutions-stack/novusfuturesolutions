'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  MapPin,
  Clock,
  Briefcase,
  Navigation,
  LogOut,
  ShieldCheck,
  UserRound,
  Bell,
  CircleUserRound
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { useAuth } from '@/lib/context/AuthContext';

// Smooth Animated Count-Up Counter Component
function AnimatedCounter({ end, duration = 2200, prefix = '', suffix = '', decimals = 0 }: { end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [end, duration]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-US');

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function HomePage() {
  const { jobs, notifications } = useApp();
  const { user, isAdmin, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const [activeDivision, setActiveDivision] = useState<'logistics' | 'recruitment' | 'growth'>('logistics');

  const brandLogos = [
    { name: 'DHL', domain: 'dhl.com' },
    { name: 'PANALPINA', domain: 'panalpina.com' },
    { name: 'FedEx Express', domain: 'fedex.com' },
    { name: 'MAERSK', domain: 'maersk.com' },
    { name: 'MSC', domain: 'msc.com' },
    { name: 'Cargill', domain: 'cargill.com' },
    { name: 'CMA CGM', domain: 'cma-cgm.com' }
  ];

  // Double the array for seamless infinite auto-slide marquee
  const tickerLogos = [...brandLogos, ...brandLogos];

  // Auto-suggestion dropdown states
  const [keywordQuery, setKeywordQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const keywordSuggestions = [
    { title: 'CDL Class A Heavy Truck Driver', category: 'Heavy Vehicle / Driver', count: '142 vacancies' },
    { title: 'Fleet Dispatcher & Transport Coordinator', category: 'Fleet Operations', count: '89 vacancies' },
    { title: 'Warehouse Manager & Forklift Operator', category: 'Warehouse Staff', count: '64 vacancies' },
    { title: 'Customs Clearance & FASAH Specialist', category: 'Customs Brokerage', count: '51 vacancies' },
    { title: 'Air & Sea Freight Forwarding Manager', category: 'Freight Forwarding', count: '38 vacancies' },
    { title: 'Hazmat & Cold Chain Transport Specialist', category: 'Specialized Freight', count: '27 vacancies' },
    { title: 'Long-Haul Inter-State Trailer Driver', category: 'Cross-Border Driver', count: '95 vacancies' },
  ];

  const locationSuggestions = [
    { pinCode: '83293', name: 'PIN 83293 - Central Logistics Terminal', detail: 'Frankfurt / European Freight Hub' },
    { pinCode: '00971', name: 'PIN 00971 - Dubai Jebel Ali Port Zone', detail: 'Dubai, United Arab Emirates' },
    { pinCode: '11543', name: 'PIN 11543 - Riyadh Dry Port & Logistics Zone', detail: 'Riyadh, Saudi Arabia' },
    { pinCode: '400001', name: 'PIN 400001 - Mumbai Port Trust & Container Hub', detail: 'Mumbai, Maharashtra, India' },
    { pinCode: '110001', name: 'PIN 110001 - Delhi Cargo Terminal', detail: 'New Delhi, India' },
    { pinCode: '90001', name: 'PIN 90001 - Los Angeles Port Freight Hub', detail: 'California, United States' },
    { pinCode: 'EC1A', name: 'PIN EC1A - London Heathrow Air Freight Center', detail: 'London, United Kingdom' },
    { pinCode: '20457', name: 'PIN 20457 - Port of Hamburg Terminal', detail: 'Hamburg, Germany' },
  ];

  const filteredKeywords = keywordSuggestions.filter(item =>
    keywordQuery === '' ||
    item.title.toLowerCase().includes(keywordQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(keywordQuery.toLowerCase())
  );

  const filteredLocations = locationSuggestions.filter(item =>
    locationQuery === '' ||
    item.pinCode.toLowerCase().includes(locationQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(locationQuery.toLowerCase()) ||
    item.detail.toLowerCase().includes(locationQuery.toLowerCase())
  );

  return (
    <div className="page-intro min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white pb-16 md:-mt-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION MATCHING SCREENSHOT EXACTLY */}
      {/* ========================================================================= */}
      <section className="page-intro__hero mx-auto max-w-7xl p-2.5 sm:p-5 lg:p-6">
        <div className="page-intro__hero-card relative isolate flex min-h-[680px] flex-col justify-between overflow-visible rounded-[2rem] p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,.28)] sm:min-h-[620px] sm:rounded-[2.8rem] sm:p-10 lg:p-12">
          
          {/* Dedicated overflow-hidden layer for background photography & vignettes */}
          <div className="absolute inset-0 -z-30 overflow-hidden rounded-[2rem] sm:rounded-[2.8rem]">
            <img
              src="/images/nfs-hero-bg.png"
              alt="Novus Future Solutions Hero"
              className="h-full w-full object-cover object-[58%_center] sm:object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,15,28,.78)_0%,rgba(9,19,34,.2)_32%,rgba(7,16,29,.72)_68%,rgba(5,12,23,.98)_100%)] sm:bg-gradient-to-t sm:from-slate-950/90 sm:via-slate-900/30 sm:to-slate-950/60" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(249,115,22,.2),transparent_32%)] sm:hidden" />
          </div>

          {/* Homepage navigation lives inside the hero card. */}
          <div className="relative z-20 hidden items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
            <Link href="/" className="flex items-center">
              <span className="text-base font-extrabold tracking-tight text-white lg:text-xl">
                NOVUS <span className="text-blue-300">FUTURE</span> SOLUTIONS
              </span>
            </Link>

            <nav className="flex items-center rounded-full border border-white/20 bg-white/15 p-1 text-[10px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_12px_30px_rgba(15,23,42,.12)] backdrop-blur-xl">
              {[
                { href: '/', label: 'Home' },
                { href: '/jobs', label: 'Vacancies' },
                { href: '/professionals', label: 'For Candidates' },
                { href: '/companies', label: 'For Employers' },
                { href: '/about', label: 'About' },
              ].map(link => (
                <Link key={link.href} href={link.href} className={`whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-white/15 lg:px-4 ${link.href === '/' ? 'bg-white/20 shadow-sm' : 'text-white/80'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="relative flex items-center justify-end gap-2">
              <Link href="/contact" className="whitespace-nowrap rounded-full bg-orange-500 px-3.5 py-2.5 text-[10px] font-black text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-400">
                Contact
              </Link>
              {user && (
                <>
                  <Link href="/profile" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-xl transition hover:bg-white/25" aria-label="My profile">
                    <CircleUserRound className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(value => !value)}
                    className="relative grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-xl"
                    aria-label="Application notifications"
                  >
                    <Bell className="h-4 w-4" />
                    {notifications.filter(item => !item.read).length > 0 && (
                      <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[8px] font-black text-white">
                        {notifications.filter(item => !item.read).length}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 top-12 z-[100] w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-2xl">
                      <div className="border-b border-slate-100 px-4 py-3">
                        <p className="text-xs font-black">Application updates</p>
                        <p className="mt-0.5 text-[9px] text-slate-500">Notifications from NFS recruiters</p>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="p-6 text-center text-[10px] font-bold text-slate-400">No notifications yet</p>
                        ) : notifications.slice(0, 8).map(item => (
                          <Link key={item.id} href={item.link || '/jobs'} onClick={() => setShowNotifications(false)} className="block border-b border-slate-100 p-4 last:border-0 hover:bg-slate-50">
                            <div className="flex items-start gap-3">
                              <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.read ? 'bg-slate-300' : 'bg-blue-600'}`} />
                              <div>
                                <p className="text-[11px] font-black">{item.title}</p>
                                <p className="mt-1 text-[9px] leading-4 text-slate-500">{item.message}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              {isAdmin && (
                <Link href="/admin" className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-white" aria-label="Admin panel">
                  <ShieldCheck className="h-4 w-4" />
                </Link>
              )}
              {user ? (
                <button onClick={() => signOut()} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-950/65 px-3.5 py-2.5 text-[10px] font-black text-white backdrop-blur-xl">
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              ) : (
                <Link href="/auth" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-blue-600 px-3.5 py-2.5 text-[10px] font-black text-white shadow-lg shadow-blue-600/25">
                  <UserRound className="h-3.5 w-3.5" /> Sign in
                </Link>
              )}
            </div>
          </div>

          {/* Recruitment-first hero message */}
          <div className="relative z-20 my-auto space-y-2 pt-16 sm:pt-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/25 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.16em] text-orange-200 backdrop-blur-xl sm:hidden">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,.9)]" />
              Verified logistics careers
            </span>
            <h1 className="max-w-3xl text-[2.65rem] font-light leading-[.98] tracking-[-.045em] text-white sm:text-6xl sm:leading-[1.05] lg:text-7xl">
              Your logistics career. <br />
              <span className="font-bold">Moving forward.</span>
            </h1>
            <p className="max-w-[20rem] pt-3 text-xs leading-relaxed text-slate-200 sm:max-w-xl sm:text-base">
              Find trusted driver, transport, warehouse, and logistics opportunities with employers who value your experience.
            </p>
          </div>

          {/* High-priority vacancy search with un-clipped auto-suggestions */}
          <form action="/jobs" className="relative z-50 grid gap-2 rounded-[1.5rem] border border-white/15 bg-slate-950/45 p-2.5 shadow-[0_18px_45px_rgba(2,6,23,.35)] backdrop-blur-xl sm:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_auto] sm:gap-2.5 sm:rounded-2xl sm:p-2 sm:mt-8">
            
            {/* Keyword Input with Suggestions Dropdown */}
            <div className="relative z-50">
              <label className="flex h-14 items-center rounded-xl border border-white/25 bg-white/15 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-2xl transition-all focus-within:border-orange-300/80 focus-within:bg-white/20 focus-within:ring-2 focus-within:ring-orange-300/20">
                <span className="sr-only">Search jobs by keyword</span>
                <Search className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
                <input
                  name="q"
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={keywordQuery}
                  onChange={(e) => {
                    setKeywordQuery(e.target.value);
                    setShowKeywordSuggestions(true);
                  }}
                  onFocus={() => setShowKeywordSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowKeywordSuggestions(false), 250)}
                  placeholder="Job title, licence or keyword"
                  className="h-full min-w-0 w-full bg-transparent px-3 text-sm font-medium text-white outline-none placeholder:text-white/65"
                />
              </label>

              {/* Classic Keyword Auto-Suggestions Menu */}
              {showKeywordSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-[999] w-full rounded-2xl border border-slate-200 bg-white py-2 px-1 text-slate-900 shadow-xl overflow-hidden">
                  <div className="max-h-52 overflow-y-auto overflow-x-hidden space-y-0.5 custom-scrollbar">
                    {filteredKeywords.length === 0 ? (
                      <div className="px-4 py-3 text-xs text-slate-500 text-center font-medium">No matching suggestions</div>
                    ) : (
                      filteredKeywords.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onMouseDown={() => {
                            setKeywordQuery(item.title);
                            setShowKeywordSuggestions(false);
                          }}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors truncate">{item.title}</div>
                              <div className="text-[11px] text-slate-500 font-medium truncate">{item.category}</div>
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 shrink-0">
                            {item.count}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Location Input with Suggestions Dropdown */}
            <div className="relative z-50">
              <label className="flex h-14 items-center rounded-xl border border-white/25 bg-white/15 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-2xl transition-all focus-within:border-orange-300/80 focus-within:bg-white/20 focus-within:ring-2 focus-within:ring-orange-300/20">
                <span className="sr-only">Search by location</span>
                <MapPin className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
                <input
                  name="location"
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setShowLocationSuggestions(true);
                  }}
                  onFocus={() => setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 250)}
                  placeholder="City or postal code"
                  className="h-full min-w-0 w-full bg-transparent px-3 text-sm font-medium text-white outline-none placeholder:text-white/65"
                />
              </label>

              {/* Classic Location Auto-Suggestions Menu */}
              {showLocationSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-[999] w-full rounded-2xl border border-slate-200 bg-white py-2 px-1 text-slate-900 shadow-xl overflow-hidden">
                  <div className="max-h-52 overflow-y-auto overflow-x-hidden space-y-0.5 custom-scrollbar">
                    {filteredLocations.length === 0 ? (
                      <div className="px-4 py-3 text-xs text-slate-500 text-center font-medium">No matching PIN codes or cities</div>
                    ) : (
                      filteredLocations.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onMouseDown={() => {
                            setLocationQuery(item.pinCode);
                            setShowLocationSuggestions(false);
                          }}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <MapPin className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors truncate">{item.name}</div>
                              <div className="text-[11px] text-slate-500 font-medium truncate">{item.detail}</div>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                            {item.pinCode}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative h-14 overflow-hidden rounded-xl border border-orange-300/60 bg-orange-500 px-7 text-sm font-extrabold text-white shadow-[0_10px_26px_rgba(249,115,22,.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-[0_14px_32px_rgba(249,115,22,.38)] active:translate-y-0 active:scale-[.98] sm:min-w-48"
            >
              <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-sm transition-all duration-700 group-hover:left-[120%]" />
              <span className="relative flex items-center justify-center gap-2">
                <Search className="h-4 w-4 stroke-[2.5]" />
                Search vacancies
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </form>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION BELOW HERO: WHY CHOOSE US & SINGLE HORIZONTAL SCROLLABLE BAR ON MOBILE */}
      {/* ========================================================================= */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Badge matching screenshot */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold w-fit">
              <span>Logistics-first solutions</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Freight is our core business.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              We move cargo across borders, then support growing operations with industry recruitment and practical business advisory.
            </p>
          </div>

          {/* Interactive Division Pills - SINGLE HORIZONTAL SCROLLABLE ROW ON MOBILE */}
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 py-1 -mx-4 px-4 md:mx-0 md:px-0">
            <button
              type="button"
              onClick={() => setActiveDivision('logistics')}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeDivision === 'logistics' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Logistics Cargo
            </button>
            <button
              type="button"
              onClick={() => setActiveDivision('recruitment')}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeDivision === 'recruitment' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Recruitment
            </button>
            <button
              type="button"
              onClick={() => setActiveDivision('growth')}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeDivision === 'growth' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Growth Advisory
            </button>
          </div>
        </div>

        {/* Thumbnail Cards Row matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="group relative col-span-2 sm:col-span-1 rounded-3xl overflow-hidden h-56 sm:h-60 bg-slate-900 border border-slate-200 shadow-md">
            <img src="/images/logistics-real-v2.png" alt="Container truck operating inside a real freight terminal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex items-end">
              <div>
                <div className="text-[10px] text-cyan-300 font-bold uppercase">Core service</div>
                <div className="text-base font-extrabold text-white">Logistics Cargo & Freight</div>
              </div>
            </div>
          </div>

          <div className="group relative rounded-3xl overflow-hidden h-44 sm:h-52 bg-slate-900 border border-slate-200 shadow-md">
            <img src="/images/recruitment-real-v2.png" alt="Logistics professionals attending a recruitment onboarding meeting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex items-end">
              <div>
                <div className="text-[10px] text-cyan-300 font-bold uppercase">Supporting service</div>
                <div className="text-sm font-extrabold text-white">Industry Recruitment</div>
              </div>
            </div>
          </div>

          <div className="group relative rounded-3xl overflow-hidden h-44 sm:h-52 bg-slate-900 border border-slate-200 shadow-md">
            <img src="/images/growth-advisory-real-v2.png" alt="Logistics leaders reviewing an operational growth plan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex items-end">
              <div>
                <div className="text-[10px] text-cyan-300 font-bold uppercase">Supporting service</div>
                <div className="text-sm font-extrabold text-white">Growth Advisory</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Featured vacancies for job seekers */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[.18em] text-orange-500">
                Verified logistics vacancies
              </span>
              <h2 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Find work that keeps the world moving.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                Explore trusted opportunities for drivers, dispatchers, fleet teams, warehouse professionals, and logistics specialists.
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-xs font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              View all vacancies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-2.5 sm:gap-6">
            {jobs.slice(0, 4).map(job => (
              <article
                key={job.id}
                className="group relative isolate flex min-h-[250px] flex-col overflow-hidden rounded-2xl border border-white/15 p-3 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:min-h-[310px] sm:rounded-[1.75rem] sm:p-6"
              >
                <Image
                  src={
                    job.category.toLowerCase().includes('growth')
                      ? '/images/growth-advisory-real-v2.png'
                      : job.category.toLowerCase().includes('fleet')
                        ? '/images/recruitment-real-v2.png'
                        : '/images/logistics-real-v2.png'
                  }
                  alt=""
                  fill
                  className="absolute inset-0 -z-30 object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1023px) 50vw, 50vw"
                />
                <div className="absolute inset-0 -z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/35" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_0%,rgba(249,115,22,.2),transparent_38%)]" />

                <div className="flex items-start justify-between gap-1.5 sm:gap-4">
                  <div className="rounded-lg border border-white/10 bg-slate-950/45 p-1.5 backdrop-blur-md sm:rounded-2xl sm:p-3">
                    <Briefcase className="h-3.5 w-3.5 text-orange-400 sm:h-5 sm:w-5" />
                  </div>
                  <span className={`rounded-full px-1.5 py-0.5 text-[7px] font-bold backdrop-blur-md sm:px-3 sm:py-1 sm:text-[10px] ${
                    job.urgentHiring
                      ? 'bg-orange-500 text-white'
                      : 'border border-white/15 bg-slate-950/45 text-slate-200'
                  }`}>
                    {job.urgentHiring ? 'Urgent' : 'Open'}
                  </span>
                </div>

                <div className="mt-3 sm:mt-6 flex-1">
                  <p className="truncate text-[7px] font-bold uppercase tracking-[.1em] text-orange-300 sm:text-[10px] sm:tracking-[.14em]">
                    {job.category}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-xs font-extrabold leading-snug sm:mt-2 sm:line-clamp-3 sm:text-xl">{job.title}</h3>
                  <p className="mt-3 hidden line-clamp-2 text-xs leading-relaxed text-slate-200 sm:block">
                    {job.description}
                  </p>
                </div>

                <div className="mt-2 grid gap-1 border-t border-white/15 pt-2 text-[7.5px] text-slate-200 sm:mt-5 sm:flex sm:flex-wrap sm:gap-2 sm:pt-4 sm:text-[10px]">
                  <span className="inline-flex items-center gap-0.5 truncate">
                    <MapPin className="h-3 w-3 text-orange-500 shrink-0" /> {job.city}
                  </span>
                  <span className="inline-flex items-center gap-0.5 truncate">
                    <Clock className="h-3 w-3 text-orange-500 shrink-0" /> {job.jobType}
                  </span>
                </div>

                <div className="mt-2 flex flex-col items-start gap-1 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <strong className="text-[9px] font-extrabold text-emerald-300 sm:text-sm">
                    {job.currency} {job.salaryMin.toLocaleString('en-US')}–{job.salaryMax.toLocaleString('en-US')}
                  </strong>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-0.5 text-[8px] font-extrabold text-white sm:text-xs"
                  >
                    View <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shipment-showcase">
        <div className="shipment-showcase__inner">
          <div className="shipment-intro">
            <span className="shipment-kicker">Live freight intelligence</span>
            <h2>All set for seamless<br /><span>transportation.</span></h2>
            <p>One connected view from collection to customs clearance, with every milestone visible as your cargo moves.</p>
          </div>

          <div className="route-arc" aria-label="Shipment route from Dubai to Rotterdam">
            <div className="route-arc__line" />
            <div className="route-arc__plane"><Navigation aria-hidden="true" /></div>
            <div className="route-city route-city--from"><span>From</span><strong>Dubai</strong></div>
            <div className="route-city route-city--to"><span>To</span><strong>Rotterdam</strong></div>
          </div>

          <div className="shipment-card">
            <div className="shipment-card__content">
              <div className="shipment-card__topline">
                <div>
                  <span className="shipment-label">Active shipment</span>
                  <h3>Shipment No 88-729534</h3>
                </div>
                <span className="shipment-status"><i /> On schedule</span>
              </div>

              <ol className="shipment-timeline">
                <li className="is-complete">
                  <span className="shipment-step">03</span>
                  <div><strong>Arrived at Port of Los Angeles</strong><p>Los Angeles, CA, USA · Shipment waiting for dispatch</p></div>
                </li>
                <li>
                  <span className="shipment-step">02</span>
                  <div><strong>Reached Port Jebel Ali</strong><p>Dubai, United Arab Emirates · Port clearance completed</p></div>
                </li>
                <li>
                  <span className="shipment-step">01</span>
                  <div><strong>Departed from Tsim Sha Tsui</strong><p>Harbour Building, Hong Kong</p></div>
                </li>
              </ol>
            </div>

            <div className="shipment-card__visual" aria-hidden="true">
              <div className="container-shadow" />
              <Image
                src="/images/shipment-container.png"
                alt=""
                width={1277}
                height={882}
                className="shipment-container shipment-container--desktop"
                sizes="58vw"
              />
              <Image
                src="/images/shipment-container-mobile.png"
                alt=""
                width={1510}
                height={1041}
                className="shipment-container shipment-container--mobile"
                sizes="96vw"
              />
            </div>
          </div>

          <div className="shipment-proof">
            <span><b>99.4%</b> on-time delivery</span>
            <span><b>24/7</b> shipment visibility</span>
            <Link href="/services">Track a shipment <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. KEY METRICS GRID SECTION MATCHING USER SCREENSHOT */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,.08)]">
            <div className="flex min-h-44 flex-col justify-between space-y-5 border-b border-r border-slate-800 bg-slate-950 p-5 text-white sm:min-h-[260px] sm:p-12">
              <div className="inline-flex w-fit items-center rounded-full border border-orange-300/20 bg-orange-500/15 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[.12em] text-orange-300 sm:px-3.5 sm:text-xs">
                Key Metrics
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
                  Define Our <span className="font-bold">Excellence</span>
                </h2>
                <p className="text-[9px] leading-relaxed text-slate-400 sm:max-w-sm sm:text-sm">
                  Proven reliability across every shipment and placement.
                </p>
              </div>
            </div>

            <div className="relative flex min-h-44 flex-col justify-end space-y-2 overflow-hidden border-b border-slate-200 bg-orange-50 p-5 sm:min-h-[260px] sm:p-12">
              <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_0_5px_rgba(249,115,22,.1)]" />
              <div className="text-4xl font-light leading-none tracking-tight text-orange-600 sm:text-7xl">99%</div>
              <div className="text-[9px] font-bold uppercase tracking-[.08em] text-slate-600 sm:text-sm">On-time delivery</div>
            </div>

            <div className="flex min-h-40 flex-col justify-center space-y-3 border-r border-slate-200 bg-white p-5 sm:min-h-[220px] sm:p-12">
              <div className="h-1 w-8 rounded-full bg-orange-500" />
              <div className="text-[1.7rem] font-light leading-none tracking-tight text-slate-950 sm:text-7xl">1.5 million</div>
              <div className="text-[9px] font-semibold uppercase leading-relaxed tracking-[.07em] text-slate-500 sm:max-w-xs sm:text-sm">
                Shipments every year
              </div>
            </div>

            <div className="flex min-h-40 flex-col justify-center space-y-3 bg-slate-50 p-5 sm:min-h-[220px] sm:p-12">
              <div className="h-1 w-8 rounded-full bg-slate-950" />
              <div className="text-4xl font-light leading-none tracking-tight text-slate-950 sm:text-7xl">100+</div>
              <div className="text-[9px] font-semibold uppercase leading-relaxed tracking-[.07em] text-slate-500 sm:max-w-xs sm:text-sm">
                Countries connected
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. STATS BANNER (COUNT-UP ONLY, NO HOVER ANIMATIONS) */}
      {/* ========================================================================= */}
      <section className="border-y border-slate-800 bg-slate-950 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="rounded-2xl border border-slate-800 bg-white/[0.02] p-5 sm:p-7">
            <div className="text-3xl font-black text-orange-400 sm:text-5xl">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <div className="mt-2 text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Active Vacancies
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-white/[0.02] p-5 sm:p-7">
            <div className="text-3xl font-black text-white sm:text-5xl">
              <AnimatedCounter end={50000} suffix="+" />
            </div>
            <div className="mt-2 text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Logistics Professionals
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-white/[0.02] p-5 sm:p-7">
            <div className="text-3xl font-black text-white sm:text-5xl">
              <AnimatedCounter end={15000} suffix="+" />
            </div>
            <div className="mt-2 text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Successful Placements
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-white/[0.02] p-5 sm:p-7">
            <div className="text-3xl font-black text-orange-400 sm:text-5xl">
              <AnimatedCounter end={99.4} suffix="%" decimals={1} />
            </div>
            <div className="mt-2 text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Match Satisfaction
            </div>
          </div>
        </div>
      </section>

      {/* Trusted logistics partner marquee */}
      <section className="partner-marquee" aria-label="Global logistics partners">
        <div className="partner-marquee__heading">
          <span>Trusted network</span>
          <p>Global carriers and supply-chain partners</p>
        </div>
        <div className="partner-marquee__viewport">
          <div className="animate-marquee partner-marquee__track">
            {tickerLogos.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="partner-mark"
                aria-hidden={index >= brandLogos.length}
                aria-label={index < brandLogos.length ? brand.name : undefined}
                role={index < brandLogos.length ? 'img' : undefined}
              >
                <span className="partner-mark__symbol">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
                    alt=""
                    loading="lazy"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
