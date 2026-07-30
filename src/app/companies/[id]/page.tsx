'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import {
  Building2,
  ShieldCheck,
  MapPin,
  Globe,
  Mail,
  Phone,
  Users,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function CompanyDetailPage() {
  const params = useParams();
  const companyId = params?.id as string;
  const { companies, jobs } = useApp();

  const company = companies.find(c => c.id === companyId);
  if (!company) {
    return <div className="grid min-h-[70vh] place-items-center px-4 text-center"><div><Building2 className="mx-auto h-12 w-12 text-slate-400" /><h1 className="mt-4 text-2xl font-black">Company not found</h1><Link href="/companies" className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-xs font-black text-white">Back to employers</Link></div></div>;
  }
  const companyJobs = jobs.filter(j => j.companyId === company.id || j.companyName === company.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <Link href="/companies" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Companies Directory</span>
      </Link>

      {/* Main Profile Header */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
        <div className="h-48 sm:h-64 relative bg-slate-900">
          <img
            src={company.coverImage}
            alt={company.name}
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="p-6 sm:p-8 relative pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <img
                src={company.logo}
                alt={company.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-slate-950 shadow-2xl bg-slate-900 shrink-0"
              />
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                  {company.name}
                  {company.verified && <ShieldCheck className="w-6 h-6 text-cyan-400 inline" />}
                </h1>
                <p className="text-xs sm:text-sm text-cyan-400 font-semibold">{company.tagline}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {company.headquarters}
                  </span>
                  <span>•</span>
                  <span>{company.industry}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{company.followersCount.toLocaleString('en-US')} Followers</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-colors">
                + Follow Company
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Company Size</span>
              <p className="text-sm font-bold text-white mt-0.5">{company.companySize}</p>
            </div>
            <div>
              <span className="text-slate-400">Registration #</span>
              <p className="text-sm font-bold text-slate-200 mt-0.5">{company.registrationNumber}</p>
            </div>
            <div>
              <span className="text-slate-400">Active Job Vacancies</span>
              <p className="text-sm font-bold text-emerald-400 mt-0.5">{companyJobs.length} Positions</p>
            </div>
            <div>
              <span className="text-slate-400">Website</span>
              <a href={company.website} target="_blank" rel="noreferrer" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 mt-0.5">
                <Globe className="w-3.5 h-3.5" /> Visit Site
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Description + Open Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white">About {company.name}</h2>
            <p>{company.description}</p>
          </div>

          {/* Open Vacancies Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Current Vacancies at {company.name}</span>
            </h2>

            {companyJobs.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl text-center text-xs text-slate-400">
                No active job openings currently posted by this company.
              </div>
            ) : (
              <div className="space-y-4">
                {companyJobs.map(j => (
                  <div key={j.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-white text-base hover:text-cyan-400 transition-colors">
                        <Link href={`/jobs/${j.id}`}>{j.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{j.location} • {j.jobType}</p>
                      <p className="text-xs font-bold text-emerald-400 mt-1">{j.currency} {j.salaryMin} - {j.salaryMax} / {j.salaryPeriod}</p>
                    </div>

                    <Link
                      href={`/jobs/${j.id}`}
                      className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-600/20 transition-colors"
                    >
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-xs text-slate-300">
            <h3 className="font-bold text-white text-sm">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{company.headquarters}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
