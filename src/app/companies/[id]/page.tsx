'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import {
  ShieldCheck,
  MapPin,
  Globe,
  Mail,
  Phone,
  Briefcase,
  ArrowLeft,
} from 'lucide-react';

export default function CompanyDetailPage() {
  const params = useParams();
  const companyId = params?.id as string;
  const { companies, jobs, dataLoaded } = useApp();

  const company = companies.find(c => c.id === companyId);
  if (!dataLoaded.companies) {
    return <div className="grid min-h-[70vh] place-items-center text-xs font-bold text-slate-500">Loading company…</div>;
  }
  if (!company) {
    notFound();
  }
  const companyJobs = jobs.filter(j => j.companyId === company.id || j.companyName === company.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-900">
      
      {/* Back Button */}
      <Link href="/companies" className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 transition-colors pt-6 md:pt-10 font-bold">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Companies Directory</span>
      </Link>

      {/* Main Profile Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-md">
        <div className="h-48 sm:h-64 relative bg-slate-100">
          <img
            src={company.coverImage}
            alt={company.name}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="p-6 sm:p-8 relative pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <img
                src={company.logo}
                alt={company.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white shadow-2xl bg-slate-50 shrink-0 border border-slate-200"
              />
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                  {company.name}
                  {company.verified && <ShieldCheck className="w-6 h-6 text-blue-600 inline" />}
                </h1>
                <p className="text-xs sm:text-sm text-blue-600 font-semibold">{company.tagline}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    {company.headquarters}
                  </span>
                  <span>•</span>
                  <span>{company.industry}</span>
                  <span>•</span>
                  <span className="text-blue-600 font-bold">{company.followersCount.toLocaleString('en-US')} Followers</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-colors">
                + Follow Company
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Company Size</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{company.companySize}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Registration #</span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{company.registrationNumber}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Active Job Vacancies</span>
              <p className="text-sm font-bold text-blue-600 mt-0.5">{companyJobs.length} Positions</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Website</span>
              <a href={company.website} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mt-0.5">
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
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-4 border border-blue-100 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">About {company.name}</h2>
            <p>{company.description}</p>
          </div>

          {/* Open Vacancies Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span>Current Vacancies at {company.name}</span>
            </h2>

            {companyJobs.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center text-xs text-slate-500 border border-blue-100">
                No active job openings currently posted by this company.
              </div>
            ) : (
              <div className="space-y-4">
                {companyJobs.map(j => (
                  <div key={j.id} className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base hover:text-blue-600 transition-colors">
                        <Link href={`/jobs/${j.id}`}>{j.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{j.location} • {j.jobType}</p>
                      <p className="text-xs font-bold text-blue-600 mt-1">{j.currency} {j.salaryMin} - {j.salaryMax} / {j.salaryPeriod}</p>
                    </div>

                    <Link
                      href={`/jobs/${j.id}`}
                      className="btn-orange px-4 py-2 text-xs"
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
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4 text-xs text-slate-700">
            <h3 className="font-bold text-slate-900 text-sm">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{company.headquarters}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
