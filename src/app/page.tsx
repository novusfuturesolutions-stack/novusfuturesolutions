'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  MapPin,
  Clock,
  Briefcase,
  LogOut,
  ShieldCheck,
  UserRound,
  Bell,
  CircleUserRound,
  SlidersHorizontal,
  Building2,
  Stethoscope,
  Laptop,
  Coins,
  Wrench,
  Truck,
  Heart,
  Code,
  Award,
  CheckCircle2,
  Users,
  Send,
  Loader2,
  Headphones,
  Zap
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { useAuth } from '@/lib/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function getCategoryIcon(iconName?: string) {
  switch (iconName) {
    case 'Laptop': return Laptop;
    case 'Stethoscope': return Stethoscope;
    case 'Coins': return Coins;
    case 'Wrench': return Wrench;
    case 'Truck': return Truck;
    case 'Building2': return Building2;
    case 'Heart': return Heart;
    case 'Code': return Code;
    default: return Briefcase;
  }
}

const categoryImageFallbacks: Record<string, string> = {
  'technology-it': '/images/category-technology-it.png',
  'healthcare-medical': '/images/category-healthcare-medical.png',
  'finance-accounting': '/images/category-finance-accounting.png',
  'engineering-construction': '/images/category-engineering-construction.png',
  'sales-marketing': '/images/category-sales-marketing.png',
  'logistics-supply-chain': '/images/category-logistics-supply-chain.png',
};

// Smooth Animated Count-Up Counter Component
function AnimatedCounter({ end, duration = 2200, prefix = '', suffix = '', decimals = 0 }: { end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
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
  const { jobs, categories, companies, notifications, toggleSidebar } = useApp();
  const { user, isAdmin, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const pillarSliderRef = useRef<HTMLDivElement>(null);
  const pillarSlideIndexRef = useRef(0);

  useEffect(() => {
    const page = document.querySelector('.page-intro');
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'));
    if (!page || sections.length === 0) return;

    page.classList.add('scroll-reveal-ready');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach(section => observer.observe(section));
    return () => {
      observer.disconnect();
      page.classList.remove('scroll-reveal-ready');
    };
  }, []);

  useEffect(() => {
    const slider = pillarSliderRef.current;
    if (!slider) return;

    const autoSlide = window.setInterval(() => {
      if (document.hidden || slider.matches(':hover') || slider.scrollWidth <= slider.clientWidth + 8) return;
      const cards = Array.from(slider.children) as HTMLElement[];
      if (cards.length < 2) return;
      const sliderCenter = slider.getBoundingClientRect().left + slider.clientWidth / 2;
      const visibleIndex = cards.reduce((nearest, item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - sliderCenter);
        const nearestRect = cards[nearest].getBoundingClientRect();
        const nearestDistance = Math.abs(nearestRect.left + nearestRect.width / 2 - sliderCenter);
        return distance < nearestDistance ? index : nearest;
      }, 0);
      pillarSlideIndexRef.current = (visibleIndex + 1) % cards.length;
      const card = cards[pillarSlideIndexRef.current];
      const sliderRect = slider.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const centeredLeft = slider.scrollLeft + cardRect.left - sliderRect.left - (slider.clientWidth - card.clientWidth) / 2;
      slider.scrollTo({ left: centeredLeft, behavior: 'smooth' });
    }, 3500);

    return () => window.clearInterval(autoSlide);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setTimeout(() => {
      const vacanciesEl = document.getElementById('vacancies-section');
      if (vacanciesEl) {
        vacanciesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Employer Fast Request Bar State (Indigroup & 24/7 Drive Inspired)
  const [reqServiceType, setReqServiceType] = useState('executive');
  const [reqRoleNeeded, setReqRoleNeeded] = useState('');
  const [reqName, setReqName] = useState('');
  const [reqContact, setReqContact] = useState('');
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);

  const handleEmployerRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setReqSubmitting(true);
    try {
      await addDoc(collection(db, 'contact_inquiries'), {
        division: reqServiceType === 'executive' ? 'Executive Search & Headhunting' : '24/7 Operational Staffing',
        fullName: reqName,
        email: reqContact,
        details: `Employer Request: Position needed: ${reqRoleNeeded}`,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setReqSuccess(true);
    } catch (err) {
      console.error('Error submitting employer request:', err);
    } finally {
      setReqSubmitting(false);
    }
  };

  const brandLogos = [
    { name: 'Google', domain: 'google.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
    { name: 'Amazon', domain: 'amazon.com' },
    { name: 'DHL', domain: 'dhl.com' },
    { name: 'Pfizer', domain: 'pfizer.com' },
    { name: 'HSBC', domain: 'hsbc.com' },
    { name: 'Siemens', domain: 'siemens.com' }
  ];

  const tickerLogos = [...brandLogos, ...brandLogos];

  // Auto-suggestion dropdown states
  const [keywordQuery, setKeywordQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  // Filtered Auto-Suggestions derived from actual backend jobs list
  const filteredKeywords = Array.from(
    new Set(jobs.flatMap(item => [item.title, item.category]))
  )
    .filter(Boolean)
    .filter(item => item.toLowerCase().includes(keywordQuery.toLowerCase()))
    .slice(0, 6)
    .map(title => ({
      title,
      category: 'Verified Position',
      count: jobs.filter(j => j.title === title || j.category === title).length || 1,
    }));

  const filteredLocations = [
    { name: 'Dubai, UAE', pinCode: '00000', detail: 'DIFC & Dubai Internet City' },
    { name: 'London, UK', pinCode: 'EC1A', detail: 'City of London & Tech Hub' },
    { name: 'Riyadh, Saudi Arabia', pinCode: '11564', detail: 'King Abdullah Financial District' },
    { name: 'Mumbai, Maharashtra', pinCode: '400001', detail: 'BKC & Nariman Point Hub' },
    { name: 'Delhi NCR', pinCode: '110001', detail: 'Gurugram Tech Corridor' },
    { name: 'Bengaluru, Karnataka', pinCode: '560001', detail: 'Electronics City & Manyata Tech Park' },
    { name: 'Singapore', pinCode: '018989', detail: 'Marina Bay Financial Centre' },
    { name: 'Berlin, Germany', pinCode: '10115', detail: 'Mitte Innovation District' }
  ].filter(item =>
    item.name.toLowerCase().includes(locationQuery.toLowerCase()) ||
    item.detail.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const displayJobs = jobs.filter(j => selectedCategory === 'all' || j.category === selectedCategory);

  return (
    <div className="page-intro min-h-screen bg-slate-50 pb-24 font-sans text-slate-900 selection:bg-blue-600 selection:text-white lg:pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="page-intro__hero mx-auto w-full max-w-[1536px] px-3 pb-4 pt-16 sm:px-4 lg:px-6 lg:pt-10">
        <div className="page-intro__hero-card relative isolate flex min-h-[740px] flex-col justify-between overflow-visible rounded-[1.5rem] border border-slate-300/70 bg-slate-950 p-4 text-white shadow-[0_20px_60px_rgba(15,23,42,.18)] sm:min-h-[680px] sm:rounded-[2rem] sm:p-8 sm:pb-24 lg:min-h-[640px] lg:rounded-[2.8rem] lg:p-10">
          
          <div className="absolute inset-0 -z-30 overflow-hidden rounded-[2rem] sm:rounded-[2.8rem]">
            <picture className="block h-full w-full">
              <source media="(max-width: 767px)" srcSet="/images/recruitment-hero-mobile-v3.png" />
              <img
                src="/images/recruitment-hero-v2.png"
                alt="Recruiter interviewing a candidate in a modern international office"
                className="h-full w-full object-cover object-center"
              />
            </picture>
          </div>

          <div className="relative z-20 hidden items-center gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <Link href="/" className="flex items-center group" aria-label="Novus Future Solutions Home">
              <img
                src="/images/nfs-logo.png"
                alt="Novus Future Solutions Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <nav className="flex items-center rounded-full border border-blue-200/80 bg-white/95 p-1 text-[10px] font-semibold text-slate-800 shadow-md backdrop-blur-xl">
              {[
                { href: '/', label: 'Home' },
                { href: '/jobs', label: 'Vacancies' },
                { href: '/professionals', label: 'For Candidates' },
                { href: '/companies', label: 'For Employers' },
                { href: '/about', label: 'About' },
              ].map(link => (
                <Link key={link.href} href={link.href} className={`whitespace-nowrap rounded-full px-3 py-2 transition ${link.href === '/' ? 'bg-blue-600 text-white shadow-sm font-bold' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="relative flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/95 border border-blue-200 px-3.5 py-2.5 text-[10px] font-black text-slate-900 shadow-sm transition hover:bg-blue-50 hover:text-blue-600 active:scale-95"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
                Menu
              </button>
              <Link href="/contact" className="whitespace-nowrap rounded-full bg-blue-600 px-3.5 py-2.5 text-[10px] font-black text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-700">
                Contact
              </Link>
              {user && (
                <>
                  <Link href="/profile" className="grid h-9 w-9 place-items-center rounded-full border border-blue-200 bg-white/95 text-blue-600 backdrop-blur-xl transition hover:border-blue-500 shadow-xs" aria-label="My profile">
                    <CircleUserRound className="h-4 w-4 text-blue-600" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(value => !value)}
                    className="relative grid h-9 w-9 place-items-center rounded-full border border-blue-200 bg-white/95 text-blue-600 backdrop-blur-xl transition hover:border-blue-500 shadow-xs"
                  >
                    {notifications.filter(item => !item.read).length > 0 ? (
                      <Bell className="h-4 w-4 text-blue-600 animate-[wiggle_1.5s_ease-in-out_infinite]" />
                    ) : (
                      <Bell className="h-4 w-4 text-blue-600" />
                    )}
                    {notifications.filter(item => !item.read).length > 0 && (
                      <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[8px] font-black text-white animate-bounce shadow-sm shadow-blue-500/50">
                        {notifications.filter(item => !item.read).length}
                      </span>
                    )}
                    {notifications.filter(item => !item.read).length > 0 && (
                      <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-blue-500 opacity-60 animate-ping" />
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 top-12 z-[100] w-80 overflow-hidden rounded-2xl border border-blue-200 bg-white text-slate-900 shadow-2xl">
                      <div className="border-b border-slate-100 bg-blue-50 px-4 py-3">
                        <p className="text-xs font-black text-slate-900">Application updates</p>
                        <p className="mt-0.5 text-[9px] text-slate-500">Notifications from recruiters</p>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="p-6 text-center text-[10px] font-bold text-slate-400">No notifications yet</p>
                        ) : notifications.slice(0, 8).map(item => (
                          <Link key={item.id} href={item.link || '/jobs'} onClick={() => setShowNotifications(false)} className="block border-b border-slate-100 p-4 last:border-0 hover:bg-blue-50/60">
                            <div className="flex items-start gap-3">
                              <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.read ? 'bg-slate-400' : 'bg-blue-600'}`} />
                              <div>
                                <p className="text-[11px] font-black text-slate-900">{item.title}</p>
                                <p className="mt-1 text-[9px] leading-4 text-slate-600">{item.message}</p>
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
                <Link href="/admin" className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700" aria-label="Admin panel">
                  <ShieldCheck className="h-4 w-4" />
                </Link>
              )}
              {user ? (
                <button onClick={() => signOut()} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/95 border border-blue-200 px-3.5 py-2.5 text-[10px] font-black text-slate-800 hover:bg-blue-50 shadow-xs">
                  <LogOut className="h-3.5 w-3.5 text-blue-600" /> Sign out
                </button>
              ) : (
                <Link href="/auth" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-blue-600 border border-blue-500 px-3.5 py-2.5 text-[10px] font-black text-white shadow-lg hover:bg-blue-700">
                  <UserRound className="h-3.5 w-3.5" /> Sign in
                </Link>
              )}
            </div>
          </div>

          {/* Hero message */}
          <div className="relative z-20 mb-auto mt-20 space-y-3.5 pt-4 sm:my-auto sm:pt-14">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/35 px-3.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[.16em] text-blue-100 backdrop-blur-xl shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,.9)]" />
                Executive Search & 24/7 Transport Staffing
              </span>
            </div>

            <h1 className="max-w-[20rem] text-[2.15rem] font-light leading-[1.04] tracking-normal text-white sm:max-w-4xl sm:text-6xl sm:leading-[1.05] lg:text-7xl drop-shadow-md">
              <span>Executive Headhunting &amp;</span> <br />
              <span className="font-extrabold text-blue-400">24/7 Operational Staffing.</span>
            </h1>
            <p className="max-w-[20rem] pt-2 text-xs leading-relaxed text-slate-100 sm:max-w-xl sm:text-base font-medium drop-shadow-sm">
              Recruit C-Level leaders, IT specialists, healthcare directors, and 24/7 verified CDL transport drivers with guaranteed speed and background verification.
            </p>
          </div>

          {/* Search bar */}
          <form action="/jobs" className="absolute inset-x-4 bottom-4 z-50 grid gap-2 rounded-[1.5rem] border border-blue-200 bg-white p-2.5 shadow-[0_18px_45px_rgba(37,99,235,.15)] sm:relative sm:inset-auto sm:mt-8 sm:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_auto] sm:gap-2.5 sm:rounded-2xl sm:p-2">
            
            <div className="relative z-50">
              <label className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-blue-500 focus-within:bg-white">
                <Search className="h-4 w-4 shrink-0 text-blue-600" />
                <input
                  name="q"
                  type="text"
                  value={keywordQuery}
                  onChange={(e) => {
                    setKeywordQuery(e.target.value);
                    setShowKeywordSuggestions(true);
                  }}
                  onFocus={() => setShowKeywordSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowKeywordSuggestions(false), 250)}
                  placeholder="Job title, CDL Driver, Nurse, Executive (e.g. Software Engineer, CE Driver)..."
                  className="h-full min-w-0 w-full bg-transparent px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </label>

              {showKeywordSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-[999] w-full rounded-2xl border border-blue-200 bg-white py-2 px-1 text-slate-900 shadow-2xl overflow-hidden">
                  <div className="max-h-52 overflow-y-auto space-y-0.5">
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
                          className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Search className="w-4 h-4 text-blue-600 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-900 truncate">{item.title}</div>
                              <div className="text-[11px] text-slate-500 font-medium truncate">{item.category}</div>
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-blue-600 shrink-0">
                            {item.count}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-50">
              <label className="flex h-14 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-blue-500 focus-within:bg-white">
                <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                <input
                  name="location"
                  type="text"
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setShowLocationSuggestions(true);
                  }}
                  onFocus={() => setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 250)}
                  placeholder="City, country, or postal code"
                  className="h-full min-w-0 w-full bg-transparent px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </label>

              {showLocationSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-[999] w-full rounded-2xl border border-blue-200 bg-white py-2 px-1 text-slate-900 shadow-2xl overflow-hidden">
                  <div className="max-h-52 overflow-y-auto space-y-0.5">
                    {filteredLocations.length === 0 ? (
                      <div className="px-4 py-3 text-xs text-slate-500 text-center font-medium">No matching locations</div>
                    ) : (
                      filteredLocations.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onMouseDown={() => {
                            setLocationQuery(item.name);
                            setShowLocationSuggestions(false);
                          }}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                              <div className="text-[11px] text-slate-500 font-medium truncate">{item.detail}</div>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="group relative h-14 overflow-hidden rounded-xl bg-blue-600 px-7 text-sm font-extrabold text-white shadow-md transition-all duration-300 hover:bg-blue-700 sm:min-w-48"
            >
              <span className="relative flex items-center justify-center gap-2">
                <Search className="h-4 w-4 stroke-[2.5]" />
                Search vacancies
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </form>

        </div>
      </section>

      {/* 2. DUAL RECRUITMENT PILLARS (INDIGROUP + 24/7 DRIVE INSPIRED) */}
      <section data-scroll-reveal className="mx-auto w-full max-w-[1536px] space-y-8 px-3 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div ref={pillarSliderRef} className="no-scrollbar flex items-stretch snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 sm:gap-6">
          
          {/* Pillar 1: Executive Search & Headhunting (Indigroup-inspired) */}
          <div className="flex w-full flex-none snap-center flex-col justify-between space-y-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-md transition-all hover:border-blue-500 sm:rounded-3xl sm:p-8 md:w-[calc(50%-0.75rem)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  Indigroup Executive Standard
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">Executive Search &amp; Headhunting</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  C-Suite leadership, Senior IT Engineers, Healthcare Directors, Financial Controllers, and MEP Project Directors placed with certified competency evaluation.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>21 Days Average Shortlist Delivery</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Certified Psychological &amp; Competency Assessment</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>98% Client Retention &amp; Replacement Guarantee</span>
                </div>
              </div>
            </div>

            <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-md hover:bg-blue-700 transition">
              <span>Request Executive Headhunting</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 2: 24/7 Transport & Operational Staffing (24/7 Drive-inspired) */}
          <div className="flex w-full flex-none snap-center flex-col justify-between space-y-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-md transition-all hover:border-blue-500 sm:rounded-3xl sm:p-8 md:w-[calc(50%-0.75rem)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  24/7 Drive Guarantee
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">24/7 Transport &amp; Operational Staffing</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Commercial CDL Drivers (CE, C, Code 95), Fleet Managers, Warehouse &amp; Logistics Specialists, and Dispatchers available for 24/7 on-demand deployment.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                  <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>24/7 Emergency Driver &amp; Manpower Dispatch</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Full Commercial License &amp; Background Verification</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                  <Users className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Flexible Short-term, Long-term &amp; Permanent Contracts</span>
                </div>
              </div>
            </div>

            <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-md hover:bg-blue-700 transition">
              <span>Request 24/7 Drivers / Operational Staff</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. 60-SECOND EMPLOYER CANDIDATE REQUEST BAR (FIREBASE SYNC) */}
      <section data-scroll-reveal className="mx-auto w-full max-w-[1536px] px-3 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6 rounded-2xl border border-blue-100 bg-white p-5 text-slate-900 shadow-xl sm:rounded-3xl sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-200">
                <Headphones className="w-3.5 h-3.5" />
                <span>60-Second Employer Request</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-2">Need Staff or Executives Urgently?</h3>
              <p className="text-xs text-slate-500">Submit your requirement below and our team will call you within 15 minutes.</p>
            </div>
          </div>

          {reqSuccess ? (
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-base">Request Received!</h4>
              <p className="text-xs text-slate-600">Our senior staffing manager will call your contact number shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleEmployerRequest} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Type</label>
                <select
                  value={reqServiceType}
                  onChange={e => setReqServiceType(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="executive">Executive Search (C-Suite & IT)</option>
                  <option value="operational">24/7 Drivers & Operational Staff</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Position Needed</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CDL Driver, Software Director..."
                  value={reqRoleNeeded}
                  onChange={e => setReqRoleNeeded(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Smith"
                  value={reqName}
                  onChange={e => setReqName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone / Email</label>
                <input
                  type="text"
                  required
                  placeholder="+971 50... or john@company.com"
                  value={reqContact}
                  onChange={e => setReqContact(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <button
                  type="submit"
                  disabled={reqSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 transition"
                >
                  {reqSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Candidates</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 4. INDUSTRY SECTORS DYNAMIC FROM ADMIN / FIRESTORE */}
      <section data-scroll-reveal className="mx-auto w-full max-w-[1536px] space-y-8 px-3 py-10 sm:px-6 sm:py-12 lg:px-8">
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold w-fit">
              <span>Universal Multi-Industry Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Recruit &amp; apply across all hiring sectors.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 font-medium">
              Connecting qualified professionals with verified corporate employers around the globe.
            </p>
          </div>

          {/* Dynamic Sector Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-500 hover:text-blue-600'
              }`}
            >
              All Sectors ({jobs.length})
            </button>
            {categories.map(cat => {
              const count = jobs.filter(j => j.category === cat.name).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
                    selectedCategory === cat.name
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  {cat.name} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Sector Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => {
            const IconComponent = getCategoryIcon(cat.iconName);
            const isSelected = selectedCategory === cat.name;
            const count = jobs.filter(j => j.category === cat.name).length;
            const imageUrl = cat.imageUrl || categoryImageFallbacks[cat.slug];
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(isSelected ? 'all' : cat.name)}
                className={`group relative isolate rounded-2xl overflow-hidden min-h-[210px] bg-slate-900 border text-left p-5 flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? 'border-blue-400 ring-2 ring-blue-500 shadow-lg shadow-blue-600/20'
                    : 'border-slate-200 shadow-sm hover:border-blue-400 hover:-translate-y-1 hover:shadow-lg'
                }`}
              >
                {imageUrl && (
                  <img src={imageUrl} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                <span className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/25 via-slate-950/20 to-slate-950/95" />

                <div className="flex items-center justify-between gap-2">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-white/90 border border-white/60 text-blue-600 backdrop-blur-sm group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isSelected ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-950/55 text-white border-white/30 backdrop-blur-sm'
                  }`}>
                    {count} {count === 1 ? 'Job' : 'Jobs'}
                  </span>
                </div>

                <div className="space-y-1 mt-4">
                  <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-wider block">Sector</span>
                  <h3 className="text-sm font-extrabold text-white line-clamp-2 leading-snug">
                    {cat.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

      </section>

      {/* Featured vacancies */}
      <section id="vacancies-section" data-scroll-reveal className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[.18em] text-blue-600">
                Verified Vacancies
              </span>
              <h2 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {selectedCategory === 'all' ? 'Featured positions across top industries.' : `Vacancies in ${selectedCategory}`}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                Explore trusted opportunities for Software Engineers, Healthcare Specialists, Financial Directors, Project Managers, and Operations Leaders.
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-xs font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-700 shadow-md shadow-blue-600/20"
            >
              View all vacancies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayJobs.length === 0 ? (
              <div className="col-span-2 bg-white p-12 rounded-3xl text-center border border-blue-100 space-y-3">
                <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-900 text-base">No active vacancies currently in this sector</h3>
                <p className="text-xs text-slate-500">Publish a new vacancy from the Admin Panel to display it here!</p>
              </div>
            ) : (
              displayJobs.map(job => {
                const compObj = companies.find(c => c.name === job.companyName);
                const logoUrl = (job.companyLogo && job.companyLogo !== '/images/nfs-logo.png') ? job.companyLogo : (compObj?.logo || '/images/nfs-logo.png');

                return (
                  <article
                    key={job.id}
                    className={`group relative isolate flex min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-md ${job.imageUrl ? 'border-slate-700 bg-slate-900 text-white' : 'border-blue-100 bg-white text-slate-900'}`}
                  >
                    {job.imageUrl && (
                      <>
                        <img src={job.imageUrl} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/35 via-slate-950/60 to-slate-950/95" />
                      </>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <img
                        src={logoUrl}
                        alt={job.companyName}
                        className="w-12 h-12 rounded-2xl object-contain ring-1 ring-blue-100 bg-white p-1.5 shadow-xs shrink-0"
                      />
                      {job.urgentHiring ? (
                        <span className="animate-urgent-pulse rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide border border-blue-200">
                          ⚡ Urgent
                        </span>
                      ) : (
                        <span className="rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide border bg-slate-100 text-slate-600 border-slate-200">
                          Open
                        </span>
                      )}
                    </div>

                  <div className="mt-4 flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-[.14em] flex items-center justify-between gap-2 ${job.imageUrl ? 'text-blue-300' : 'text-blue-600'}`}>
                      <span>{job.category}</span>
                      {job.companyWebsite ? (
                        <a
                          href={job.companyWebsite.startsWith('http') ? job.companyWebsite : `https://${job.companyWebsite}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-extrabold hover:underline normal-case flex items-center gap-1 ${job.imageUrl ? 'text-white' : 'text-blue-600'}`}
                          title={`Visit ${job.companyName} website`}
                        >
                          {job.companyName} ↗
                        </a>
                      ) : (
                        <span className={`font-extrabold normal-case ${job.imageUrl ? 'text-white' : 'text-slate-700'}`}>{job.companyName}</span>
                      )}
                    </p>
                    <h3 className={`mt-1 text-lg font-extrabold ${job.imageUrl ? 'text-white' : 'text-slate-900'}`}>{job.title}</h3>
                    <p className={`mt-2 text-xs leading-relaxed line-clamp-2 ${job.imageUrl ? 'text-slate-200' : 'text-slate-600'}`}>
                      {job.description}
                    </p>
                  </div>

                  <div className={`mt-4 flex flex-col items-start gap-3 border-t pt-4 text-xs sm:flex-row sm:items-center sm:justify-between ${job.imageUrl ? 'border-white/20' : 'border-slate-100'}`}>
                    <div className={`flex flex-wrap items-center gap-3 ${job.imageUrl ? 'text-slate-200' : 'text-slate-500'}`}>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-blue-600" /> {job.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-blue-600" /> {job.jobType}
                      </span>
                    </div>
                    <strong className={`text-sm font-extrabold ${job.imageUrl ? 'text-blue-300' : 'text-blue-600'}`}>
                      {job.currency} {job.salaryMin.toLocaleString('en-US')}–{job.salaryMax.toLocaleString('en-US')}
                    </strong>
                  </div>

                  <div className={`mt-4 flex justify-stretch border-t pt-3 sm:justify-end ${job.imageUrl ? 'border-white/20' : 'border-slate-100'}`}>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="btn-orange inline-flex w-full items-center justify-center gap-1 px-4 py-2 text-xs sm:w-auto"
                    >
                      <span>Apply Now</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* KEY METRICS GRID SECTION */}
      <section data-scroll-reveal className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="w-full max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-blue-200 bg-white shadow-xl">
            <div className="flex min-h-44 flex-col justify-between space-y-5 border-b border-r border-slate-200 bg-slate-50 p-5 text-slate-900 sm:min-h-[260px] sm:p-12">
              <div className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[.12em] text-blue-600 sm:px-3.5 sm:text-xs">
                Key Metrics
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-light leading-[1.05] tracking-tight text-slate-900 sm:text-4xl">
                  Define Our <span className="font-bold text-blue-600">Excellence</span>
                </h2>
                <p className="text-[9px] leading-relaxed text-slate-600 sm:max-w-sm sm:text-sm">
                  Proven placement reliability across every hiring sector.
                </p>
              </div>
            </div>

            <div className="relative flex min-h-44 flex-col justify-end space-y-2 overflow-hidden border-b border-slate-200 bg-white p-5 sm:min-h-[260px] sm:p-12">
              <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_0_5px_rgba(37,99,235,.15)]" />
              <div className="text-4xl font-light leading-none tracking-tight text-blue-600 sm:text-7xl">99%</div>
              <div className="text-[9px] font-bold uppercase tracking-[.08em] text-slate-600 sm:text-sm">Client Satisfaction</div>
            </div>

            <div className="flex min-h-40 flex-col justify-center space-y-3 border-r border-slate-200 bg-white p-5 sm:min-h-[220px] sm:p-12">
              <div className="h-1 w-8 rounded-full bg-blue-600" />
              <div className="text-[1.7rem] font-light leading-none tracking-tight text-slate-900 sm:text-7xl">50,000+</div>
              <div className="text-[9px] font-semibold uppercase leading-relaxed tracking-[.07em] text-slate-500 sm:max-w-xs sm:text-sm">
                Candidates Placed
              </div>
            </div>

            <div className="flex min-h-40 flex-col justify-center space-y-3 bg-slate-50 p-5 sm:min-h-[220px] sm:p-12">
              <div className="h-1 w-8 rounded-full bg-blue-600" />
              <div className="text-4xl font-light leading-none tracking-tight text-slate-900 sm:text-7xl">100+</div>
              <div className="text-[9px] font-semibold uppercase leading-relaxed tracking-[.07em] text-slate-500 sm:max-w-xs sm:text-sm">
                Countries Connected
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trusted network marquee */}
      <section data-scroll-reveal className="partner-marquee" aria-label="Global corporate partners">
        <div className="partner-marquee__heading">
          <span>Trusted network</span>
          <p>Global corporate employers and industry partners</p>
        </div>
        <div className="partner-marquee__viewport">
          <div className="animate-marquee partner-marquee__track">
            {tickerLogos.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="partner-mark"
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
