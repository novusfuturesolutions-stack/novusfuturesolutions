'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Quote,
  TrendingUp,
  Award,
  Building2,
  UserCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  X,
  Search,
  ChevronRight,
  Briefcase,
  Layers,
  Heart,
  ShieldCheck,
  Phone,
  Calendar,
  Zap,
  Users
} from 'lucide-react';

interface CompanyMilestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}

interface SuccessStory {
  id: string;
  type: 'candidate' | 'employer';
  industry: string;
  name: string;
  roleOrCompany: string;
  location: string;
  avatar: string;
  title: string;
  quote: string;
  fullStory: string;
  challenge: string;
  solution: string;
  results: string[];
  metricLabel: string;
  metricValue: string;
  featured?: boolean;
  date: string;
  likes: number;
}

const NFS_MILESTONES: CompanyMilestone[] = [
  {
    year: '2020',
    title: 'Establishment of Novus Future Solutions (NFS)',
    description: 'Founded with a core commitment to transparent recruitment, pre-verified credentials, and rapid international candidate placement.',
    tag: 'Foundation'
  },
  {
    year: '2022',
    title: 'Germany Regional Hub Launch',
    description: 'Established direct corporate representation in Germany (+49 152 16405341) specializing in European Tech, Engineering, and Healthcare placement.',
    tag: 'German Expansion'
  },
  {
    year: '2024',
    title: 'Lithuania & EU Operations Hub',
    description: 'Opened dedicated Baltic operational center (+356 79379950) managing CDL commercial transport drivers and logistics workforce across Europe.',
    tag: 'Lithuania Direct Hub'
  },
  {
    year: '2026',
    title: '15,000+ Placements & Live Platform',
    description: 'Achieved 15,000+ verified candidate placements with 450+ global employer partners and a 98.4% employer retention rate.',
    tag: 'Global Milestone'
  }
];

const INITIAL_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    type: 'candidate',
    industry: 'Technology & IT',
    name: 'Sophia Chen',
    roleOrCompany: 'Lead AI Infrastructure Engineer at ApexTech EMEA',
    location: 'Germany & UK / Remote',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    title: 'NFS Guided My Relocation & 70% Salary Upgrade to Europe',
    quote: 'Novus Future Solutions positioned my deep learning portfolio directly with enterprise tech directors in Germany and London. The speed of visa processing was incredible.',
    fullStory: 'Sophia connected with Novus Future Solutions for international career expansion. NFS verified her technical credentials and arranged 4 direct interviews with European AI firms within 12 days, securing full visa sponsorship and relocation assistance.',
    challenge: 'Reaching European hiring managers directly with full work visa sponsorship.',
    solution: 'NFS pre-verified her technical portfolio and introduced her directly to VP Engineering leadership.',
    results: [
      '+70% salary package increase',
      'EU Blue Card / Work Visa processed in 3 weeks',
      'Promoted to Lead AI Infrastructure Engineer'
    ],
    metricLabel: 'Salary Boost',
    metricValue: '+70%',
    featured: true,
    date: 'August 2026',
    likes: 184
  },
  {
    id: 'story-2',
    type: 'employer',
    industry: 'Healthcare & Medical',
    name: 'St. Jude Healthcare System',
    roleOrCompany: 'Dr. Marcus Vance, Chief Medical Officer',
    location: 'Germany, UAE & UK',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    title: 'NFS Deployed 45 Verified Medical Specialists in 30 Days',
    quote: 'When expanding our medical units, compliance was critical. NFS delivered background-checked, licensed doctors and ICU nurses faster than any conventional agency.',
    fullStory: 'St. Jude Healthcare needed 45 specialized ICU nurses and surgical directors on a tight launch deadline. Novus Future Solutions verified licensing, medical degrees, and background checks simultaneously to complete recruitment in 26 days.',
    challenge: 'Strict regulatory compliance, degree verification, and emergency staffing deadlines.',
    solution: 'NFS credential engine verified DHA/MOH and European medical licenses upfront.',
    results: [
      '45 high-caliber medical hires onboarded on schedule',
      'Time-to-hire reduced from 120 days down to 26 days',
      'Zero regulatory compliance rejections'
    ],
    metricLabel: 'Positions Filled',
    metricValue: '45 Specialists',
    featured: true,
    date: 'July 2026',
    likes: 129
  },
  {
    id: 'story-3',
    type: 'candidate',
    industry: 'Logistics & Transport',
    name: 'Vikram Malhotra',
    roleOrCompany: 'Global Transport & Fleet Manager',
    location: 'Lithuania & Netherlands',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    title: 'Placed Through NFS Lithuania Hub Managing $120M Logistics Operations',
    quote: 'The NFS Lithuania office (+356 79379950) handled my Code 95 transport licenses and placed me with a top-tier European logistics carrier.',
    fullStory: 'Vikram sought international commercial logistics leadership. NFS Lithuania team verified his fleet safety records and arranged executive placement with TransWorld Express.',
    challenge: 'Cross-border license verification and international transport compliance.',
    solution: 'NFS Lithuania hub arranged direct board interviews with logistics enterprise directors.',
    results: [
      'Appointed Global Transport Operations Lead',
      'Overseeing $120M annual operational logistics budget',
      'Full EU relocation package'
    ],
    metricLabel: 'Budget Managed',
    metricValue: '$120M Logistics',
    featured: false,
    date: 'June 2026',
    likes: 95
  }
];

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>(INITIAL_STORIES);
  const [activeStoryModal, setActiveStoryModal] = useState<SuccessStory | null>(null);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStories(prev =>
      prev.map(item => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 pt-6 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* 1. HERO BANNER — NFS COMPANY SUCCESS STORY */}
        <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-8 sm:p-12 text-white shadow-2xl">
          {/* Ambient Background Glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-xs font-bold text-blue-200 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Official Company Journey · Novus Future Solutions (NFS)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Novus Future Solutions <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-200 to-white bg-clip-text text-transparent">
                Company Success Story
              </span>
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl font-medium">
              From our origins to establishing direct operational hubs in <strong>Germany (+49 152 16405341)</strong> and <strong>Lithuania (+356 79379950)</strong>, discover how Novus Future Solutions built a legacy of 15,000+ verified placements worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Learn About NFS Mission</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3.5 text-xs font-extrabold text-white hover:bg-white/20 transition-all"
              >
                <span>Contact Direct Offices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats Bar Component */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-blue-700/50">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-white">15,000+</div>
              <div className="text-xs text-blue-200 font-medium">Placed Candidates</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">98.4%</div>
              <div className="text-xs text-blue-200 font-medium">Client Retention Rate</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-white">450+</div>
              <div className="text-xs text-blue-200 font-medium">Employer Partners</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-sky-300">4 Direct</div>
              <div className="text-xs text-blue-200 font-medium">Country Representation</div>
            </div>
          </div>
        </div>

        {/* 2. NFS CORPORATE ORIGIN & SUCCESS STORY DETAIL */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-blue-100 shadow-md space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Our Company Story</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Building a Trusted Global Recruitment Consultancy
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Novus Future Solutions (NFS) was established to solve a critical challenge in international recruitment: eliminating candidate ghosting, verifying credentials upfront, and ensuring zero delay for corporate employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 w-fit">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">🇩🇪 Germany Office</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct European hub providing specialized executive search, software engineering, and healthcare placement.
              </p>
              <a href="tel:+4915216405341" className="text-xs font-bold text-blue-600 hover:underline block pt-1">
                Direct Hotline: +49 152 16405341
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">🇱🇹 Lithuania Office</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regional Baltic operations center managing commercial CDL driver dispatch, fleet management, and logistics manpower.
              </p>
              <a href="tel:+35679379950" className="text-xs font-bold text-blue-600 hover:underline block pt-1">
                Direct Hotline: +356 79379950
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 w-fit">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Verified Talent Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every candidate profile undergoes degree checks, background screening, and license verification before employer interview.
              </p>
              <span className="text-xs font-bold text-blue-600 block pt-1">
                100% Credential Guaranteed
              </span>
            </div>
          </div>
        </div>

        {/* 3. NFS COMPANY MILESTONES TIMELINE */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>NFS Growth Milestones</span>
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Company Growth & Key Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NFS_MILESTONES.map((m, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-3 relative overflow-hidden group hover:border-blue-400 transition-colors">
                <span className="text-3xl font-black text-blue-600 block">{m.year}</span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold border border-blue-200">
                  {m.tag}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">{m.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PLACEMENT CASE STUDIES SPOTLIGHT */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>NFS Verified Placements</span>
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Candidate & Employer Success Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {stories.map(story => (
              <div
                key={story.id}
                onClick={() => setActiveStoryModal(story)}
                className="group cursor-pointer rounded-3xl bg-white border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                      {story.type === 'candidate' ? 'Candidate Placement' : 'Employer Partnership'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {story.industry}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">{story.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{story.roleOrCompany}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border-t border-slate-100 p-4 px-6 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block">{story.metricLabel}</span>
                    <span className="text-xs font-black text-blue-600">{story.metricValue}</span>
                  </div>

                  <button
                    onClick={(e) => handleLike(story.id, e)}
                    className="flex items-center gap-1 text-slate-500 hover:text-rose-500 transition-colors bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-semibold"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>{story.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. DIRECT REGIONAL CONTACT BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 border border-blue-500/40 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Connect Directly with NFS Global Hubs
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Our recruitment specialists in Germany and Lithuania are ready to assist with candidate placement or employer hiring requests.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <a href="tel:+4915216405341" className="bg-white/15 hover:bg-white/25 px-3.5 py-1.5 rounded-lg border border-white/30 text-white font-bold transition">
                🇩🇪 Germany: +49 152 16405341
              </a>
              <a href="tel:+35679379950" className="bg-white/15 hover:bg-white/25 px-3.5 py-1.5 rounded-lg border border-white/30 text-white font-bold transition">
                🇱🇹 Lithuania: +356 79379950
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/jobs"
              className="px-6 py-3.5 bg-white text-blue-700 rounded-xl text-xs font-black shadow-lg hover:bg-blue-50 transition-all hover:-translate-y-0.5"
            >
              Browse Vacancies
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-blue-800 text-white border border-blue-400/40 rounded-xl text-xs font-black hover:bg-blue-900 transition-all"
            >
              Contact Offices
            </Link>
          </div>
        </div>

      </div>

      {/* Story Details Modal */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-y-auto flex flex-col">
            
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-blue-50/50">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                  NFS Case Study · {activeStoryModal.industry}
                </span>
                <h3 className="text-xl font-black text-slate-900 pt-2 leading-tight">
                  {activeStoryModal.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveStoryModal(null)}
                className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <img
                  src={activeStoryModal.avatar}
                  alt={activeStoryModal.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                />
                <div>
                  <div className="text-base font-extrabold text-slate-900">{activeStoryModal.name}</div>
                  <div className="text-xs text-slate-600">{activeStoryModal.roleOrCompany}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{activeStoryModal.location}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-600 text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200">{activeStoryModal.metricLabel}</div>
                  <div className="text-2xl font-black">{activeStoryModal.metricValue}</div>
                </div>
                <Award className="w-8 h-8 text-blue-200" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1">Background &amp; Context</h4>
                  <p>{activeStoryModal.fullStory}</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <h4 className="font-extrabold text-amber-900 text-xs uppercase tracking-wider">The Challenge</h4>
                  <p className="text-xs text-amber-800">{activeStoryModal.challenge}</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                  <h4 className="font-extrabold text-blue-900 text-xs uppercase tracking-wider">The NFS Solution</h4>
                  <p className="text-xs text-blue-800">{activeStoryModal.solution}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-sm">Key Impact Achieved</h4>
                  <ul className="space-y-2">
                    {activeStoryModal.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
