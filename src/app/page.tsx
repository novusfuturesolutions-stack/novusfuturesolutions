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
  Sparkles,
  Zap,
  Globe,
  Package,
  Boxes,
  Languages
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { useAuth } from '@/lib/context/AuthContext';
import { MOCK_JOBS } from '@/lib/data/mockData';
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
  const [reqRoleNeeded, setReqRoleNeeded] = useState('');
  const [reqStaffCount, setReqStaffCount] = useState('1 - 5 Staff');
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);

  const handleEmployerRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setReqSubmitting(true);
    try {
      await addDoc(collection(db, 'employer_requests'), {
        serviceType: 'Corporate Staffing Request',
        positionNeeded: reqRoleNeeded,
        staffCount: reqStaffCount,
        companyName: reqName,
        contactPerson: reqName,
        email: reqEmail,
        phone: reqPhone,
        status: 'new',
        createdAt: serverTimestamp()
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

  const allAvailableJobs = Array.from(
    new Map([...jobs, ...MOCK_JOBS].map(item => [item.id || item.title, item])).values()
  );

  const displayJobs = allAvailableJobs.filter(j => selectedCategory === 'all' || j.category === selectedCategory);

  return (
    <div className="page-intro min-h-screen bg-slate-50 pb-24 font-sans text-slate-900 selection:bg-blue-600 selection:text-white lg:pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="page-intro__hero relative z-20 mx-auto w-full max-w-[1536px] px-3 pb-4 pt-16 sm:px-4 lg:px-6 lg:pt-10">
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
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 nfs-logo-blue-white"
              />
            </Link>

            <nav className="flex items-center rounded-full border border-blue-200/80 bg-white/95 p-1 text-[11px] font-extrabold text-slate-800 shadow-md backdrop-blur-xl">
              {[
                { href: '/', label: 'Home' },
                { href: '/jobs', label: '1. For Job Seekers' },
                { href: '/services', label: '2. Services' },
                { href: '/companies', label: '3. For Employer' },
              ].map(link => (
                <Link key={link.href} href={link.href} className={`whitespace-nowrap rounded-full px-4 py-2 transition-all font-extrabold ${link.href === '/' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-800 hover:text-blue-600 hover:bg-blue-50'}`}>
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



          {/* 3 Main Gateway Options Bar: 1. For Job Seekers | 2. Services | 3. For Employer */}
          <div className="relative z-20 mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4">
            
            {/* 1. For Job Seekers */}
            <Link
              href="/jobs"
              onClick={(e) => {
                const el = document.getElementById('vacancies-section');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="group relative isolate flex items-center gap-3.5 overflow-hidden rounded-2xl border-2 border-blue-400/80 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-4 text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-[1.03] hover:border-white hover:shadow-2xl active:scale-95"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/40 shadow-inner">
                <Briefcase className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-black text-slate-950 shadow-xs">1</span>
                  <h4 className="text-sm font-black tracking-wide text-white">For Job Seekers</h4>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-blue-100 truncate">
                  5,000+ Vacancies &amp; Fast Apply
                </p>
              </div>
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-white border border-white/30 group-hover:bg-white group-hover:text-blue-700 transition-colors">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </div>
            </Link>

            {/* 2. Services */}
            <Link
              href="/services"
              className="group relative isolate flex items-center gap-3.5 overflow-hidden rounded-2xl border-2 border-blue-500 bg-white p-4 text-slate-900 shadow-xl shadow-blue-500/15 transition-all duration-300 hover:scale-[1.03] hover:border-blue-600 hover:shadow-2xl active:scale-95"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shadow-xs">
                <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-600 px-1.5 py-0.5 text-[10px] font-black text-white shadow-xs">2</span>
                  <h4 className="text-sm font-black tracking-wide text-slate-900">Services</h4>
                </div>
                <p className="mt-0.5 text-xs font-bold text-blue-600 truncate">
                  Verification &amp; Headhunting
                </p>
              </div>
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </div>
            </Link>

            {/* 3. For Employer */}
            <Link
              href="/companies"
              onClick={(e) => {
                const el = document.getElementById('employer-request-section');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="group relative isolate flex items-center gap-3.5 overflow-hidden rounded-2xl border-2 border-cyan-400/80 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 p-4 text-white shadow-xl shadow-slate-900/40 transition-all duration-300 hover:scale-[1.03] hover:border-cyan-300 hover:shadow-2xl active:scale-95"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-inner">
                <Building2 className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-cyan-400 px-1.5 py-0.5 text-[10px] font-black text-slate-950 shadow-xs">3</span>
                  <h4 className="text-sm font-black tracking-wide text-white">For Employer</h4>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-cyan-200 truncate">
                  Request Staff &amp; Hire Talent
                </p>
              </div>
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </div>
            </Link>

          </div>

        </div>
      </section>



      {/* 3. 60-SECOND EMPLOYER CANDIDATE REQUEST BAR (FIREBASE SYNC) */}
      <section id="employer-request-section" data-scroll-reveal className="mx-auto w-full max-w-[1536px] px-3 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6 rounded-3xl border-2 border-blue-200/80 bg-gradient-to-br from-white via-blue-50/40 to-white p-6 text-slate-900 shadow-2xl sm:p-10 relative overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black shadow-md shadow-blue-600/20">
                <Headphones className="w-3.5 h-3.5" />
                <span>60-Second Employer Request</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5 tracking-tight">Need Staff or Executives Urgently?</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Submit your staffing requirement below and our senior recruitment team will call you within 15 minutes.</p>
            </div>
            <div className="hidden lg:flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 border border-emerald-200 text-emerald-700 text-xs font-extrabold shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Recruiters Active Now (15 Min Response)</span>
            </div>
          </div>

          {reqSuccess ? (
            <div className="relative z-10 p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2.5 animate-in fade-in duration-300">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-black text-slate-900 text-lg">Staffing Request Received!</h4>
              <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                Thank you! Our enterprise hiring manager will call your phone number directly to verify your candidate requirements.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmployerRequest} className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 text-xs">
              <div>
                <label className="block font-black text-slate-800 mb-1.5">Position Needed</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CDL Driver, Software Director..."
                  value={reqRoleNeeded}
                  onChange={e => setReqRoleNeeded(e.target.value)}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block font-black text-slate-800 mb-1.5">How Many Staff Needed?</label>
                <select
                  value={reqStaffCount}
                  onChange={e => setReqStaffCount(e.target.value)}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                >
                  <option value="1 Candidate">1 Candidate</option>
                  <option value="2 - 5 Staff">2 - 5 Staff</option>
                  <option value="5 - 10 Staff">5 - 10 Staff</option>
                  <option value="10 - 25 Staff">10 - 25 Staff</option>
                  <option value="25 - 50 Staff">25 - 50 Staff</option>
                  <option value="50+ Bulk Staff">50+ Bulk Staff</option>
                </select>
              </div>

              <div>
                <label className="block font-black text-slate-800 mb-1.5">Company / Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Smith"
                  value={reqName}
                  onChange={e => setReqName(e.target.value)}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block font-black text-slate-800 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={reqEmail}
                  onChange={e => setReqEmail(e.target.value)}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                />
              </div>

              <div>
                <label className="block font-black text-slate-800 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 123 4567"
                  value={reqPhone}
                  onChange={e => setReqPhone(e.target.value)}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <button
                  type="submit"
                  disabled={reqSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50 transition-all cursor-pointer"
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



      {/* BLOG & INSIGHTS SECTION */}
      <section data-scroll-reveal className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto w-full max-w-[1536px] px-3 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Latest Recruitment Insights &amp; Industry News</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
                Blog &amp; <span className="text-blue-600">Career Insights</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-medium">
                Expert guides on European work visas, candidate credential screening, heavy driver licenses (Code 95), and multi-industry recruitment trends.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-blue-700 shadow-md shadow-blue-600/20 shrink-0"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blog Post 1 */}
            <article className="group rounded-3xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">European Careers</span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  How to Secure English Speaking Jobs in Europe with Visa Sponsorship
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  Discover how foreign job seekers and Indian nationals can navigate European work permit requirements, language barriers, and direct employer hiring.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">August 2026</span>
                <Link href="/blog" className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1">
                  <span>Read Article</span> →
                </Link>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="group rounded-3xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">Logistics &amp; Driver</span>
                  <span>4 min read</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  Class CE Heavy Driver Guide: Code 95 Qualification &amp; European Routes
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  Everything you need to know about Code 95 driver permits, tachograph regulations, and heavy driver salary packages across Germany and Poland.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">August 2026</span>
                <Link href="/blog" className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1">
                  <span>Read Article</span> →
                </Link>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="group rounded-3xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-xl transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">Employer Hiring</span>
                  <span>6 min read</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  Why Credential Verification Reduces Candidate Ghosting by 95%
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  Learn why top corporate employers are replacing traditional recruiter shortlists with pre-screened, audit-verified professional profiles.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">July 2026</span>
                <Link href="/blog" className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1">
                  <span>Read Article</span> →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 6. DEDICATED SEO CONTENT & FAQ SECTION FOR EUROPEAN JOBS */}
      <section data-scroll-reveal className="py-16 bg-white border-t border-slate-200 text-slate-900">
        <div className="mx-auto w-full max-w-[1536px] px-3 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-extrabold border border-blue-200">
              <span>Career Guidance &amp; European Hiring Portal</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Jobs in Europe: <span className="text-blue-600">Warehouse Jobs, Heavy Driver Jobs &amp; English Speaking Vacancies</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Novus Future Solutions (NFS) connects foreign job seekers, skilled professionals, and Indian applicants with top European corporate employers offering visa sponsorship, accommodation, and fast work permit processing.
            </p>
          </div>

          {/* 4 Feature Cards for Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Jobs in Europe */}
            <div className="relative rounded-3xl bg-white p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-md ring-4 ring-blue-50 border border-blue-400/40">
                    <Globe className="h-7 w-7 stroke-[2]" />
                    <span className="absolute -bottom-1 -right-1 rounded-full bg-amber-400 px-1 py-px text-[8px] font-black text-slate-950 shadow-xs">
                      🇪🇺 EU
                    </span>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase text-blue-600 border border-blue-200">
                    Visa Support
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Jobs in Europe</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                    Explore verified vacancies across Germany, Netherlands, Poland, and UK. Full visa support for international job seekers.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link href="/jobs?q=Europe" className="text-xs font-black text-blue-600 hover:underline inline-flex items-center gap-1.5">
                  <span>Browse European Jobs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Warehouse Jobs */}
            <div className="relative rounded-3xl bg-white p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 text-white shadow-md ring-4 ring-amber-50 border border-amber-300/40">
                    <Boxes className="h-7 w-7 stroke-[2]" />
                    <span className="absolute -bottom-1 -right-1 rounded-full bg-slate-900 px-1 py-px text-[8px] font-black text-amber-300 shadow-xs">
                      📦 Logistics
                    </span>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase text-amber-700 border border-amber-200">
                    Housing Incl.
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Warehouse Jobs</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                    Fulfillment supervisors, forklift operators, and inventory associates in top European logistics hubs with accommodation.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link href="/jobs?q=Warehouse" className="text-xs font-black text-amber-600 hover:underline inline-flex items-center gap-1.5">
                  <span>Explore Warehouse Roles</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Heavy Driver Jobs */}
            <div className="relative rounded-3xl bg-white p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-800 text-white shadow-md ring-4 ring-cyan-50 border border-cyan-300/40">
                    <Truck className="h-7 w-7 stroke-[2]" />
                    <span className="absolute -bottom-1 -right-1 rounded-full bg-cyan-400 px-1 py-px text-[8px] font-black text-slate-950 shadow-xs">
                      🚚 CDL CE
                    </span>
                  </div>
                  <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-black uppercase text-cyan-700 border border-cyan-200">
                    High Salary
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Heavy Driver Jobs</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                    Class CE long-haul trailer drivers needed across Germany, Poland, and EU corridors. High salary packages &amp; Code 95 support.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link href="/jobs?q=Heavy+Driver" className="text-xs font-black text-cyan-600 hover:underline inline-flex items-center gap-1.5">
                  <span>View Heavy Driver Jobs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: English Speaking & Foreigners */}
            <div className="relative rounded-3xl bg-white p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 text-white shadow-md ring-4 ring-emerald-50 border border-emerald-300/40">
                    <Languages className="h-7 w-7 stroke-[2]" />
                    <span className="absolute -bottom-1 -right-1 rounded-full bg-amber-400 px-1 py-px text-[8px] font-black text-slate-950 shadow-xs">
                      🗣️ Global
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-700 border border-emerald-200">
                    No German Req.
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">English Speaking &amp; Foreigners</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                    No local language barriers! Find English speaking jobs in Europe tailored for foreigners and Indian applicants with relocation support.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link href="/jobs?q=English+Speaking" className="text-xs font-black text-emerald-600 hover:underline inline-flex items-center gap-1.5">
                  <span>See English Speaking Jobs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Frequently Asked Questions (SEO Structured Content) */}
          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-blue-100 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-black text-slate-900">Frequently Asked Questions — Jobs in Europe</h3>
              <p className="text-xs text-slate-500 mt-1">Everything you need to know about working in Europe as a foreign candidate or Indian national.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-700">
              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-slate-900 text-sm">How can I find English speaking jobs in Europe?</h4>
                <p>
                  Many global companies in Germany, the Netherlands, and Poland operate entirely in English. NFS features verified listings for English speaking jobs in Europe across logistics, customer support, IT, and heavy driving.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-slate-900 text-sm">Are there Warehouse jobs and Heavy Driver jobs with visa sponsorship?</h4>
                <p>
                  Yes! European employers regularly sponsor work visas for qualified heavy drivers (Class CE) and warehouse logistics operators. Many packages include accommodation, flight tickets, and Code 95 driver qualification.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-slate-900 text-sm">Are there specific jobs for Indians and foreigners in Europe?</h4>
                <p>
                  Absolutely. European companies actively recruit candidates from India and international locations for technical, driving, healthcare, and warehouse management roles. Apply directly through NFS to get full work permit guidance.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200">
                <h4 className="font-extrabold text-slate-900 text-sm">What credentials do Heavy Drivers need in Europe?</h4>
                <p>
                  Heavy drivers need a valid heavy vehicle driving license (CDL Class CE) and Code 95 driver qualification. NFS partner companies assist qualified foreign and Indian drivers with European license conversions.
                </p>
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
