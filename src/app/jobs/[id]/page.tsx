'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Briefcase,
  MapPin,
  Building2,
  ShieldCheck,
  Bookmark,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Zap
} from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;
  const { jobs, companies, dataLoaded, savedJobIds, toggleSaveJob, applyForJob } = useApp();
  const { user } = useAuth();

  const job = jobs.find(j => j.id === jobId);

  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!dataLoaded.jobs) {
    return <div className="grid min-h-[70vh] place-items-center text-xs font-bold text-slate-500">Loading vacancy…</div>;
  }

  if (!job) {
    notFound();
  }

  const companyObj = companies.find(c => c.name === job.companyName);
  const logoUrl = (job.companyLogo && job.companyLogo !== '/images/nfs-logo.png') ? job.companyLogo : (companyObj?.logo || '/images/nfs-logo.png');
  const isSaved = savedJobIds.includes(job.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push(`/auth?redirect=${encodeURIComponent(`/jobs/${job.id}#apply-section`)}`);
      return;
    }
    applyForJob(job.id, coverLetter, answers);
    setApplied(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link href="/jobs" className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 transition-colors font-bold pt-6 md:pt-10">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Logistics Vacancies</span>
        </Link>

        {/* Main Banner Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-md space-y-6 text-slate-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={logoUrl}
                alt={job.companyName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain ring-1 ring-blue-100 bg-white p-2 shadow-sm shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{job.title}</h1>
                  {job.urgentHiring && (
                    <span className="animate-urgent-pulse px-2.5 py-1 rounded-md border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Urgent
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                  <span className="font-bold text-blue-600 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    {job.companyWebsite ? (
                      <a
                        href={job.companyWebsite.startsWith('http') ? job.companyWebsite : `https://${job.companyWebsite}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1 font-extrabold text-blue-600"
                        title={`Visit ${job.companyName} website`}
                      >
                        {job.companyName} ↗
                      </a>
                    ) : (
                      <span>{job.companyName}</span>
                    )}
                    {job.verifiedCompany && <ShieldCheck className="w-3.5 h-3.5 text-blue-600 inline" />}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span className="text-slate-400">Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => toggleSaveJob(job.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-blue-500 hover:text-slate-700'
                }`}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              
              <Link
                href={user ? '#apply-section' : `/auth?redirect=${encodeURIComponent(`/jobs/${job.id}#apply-section`)}`}
                className="flex-1 sm:flex-none text-center btn-orange text-xs py-3 px-6"
              >
                {applied ? 'Application Submitted ✓' : 'Apply Now'}
              </Link>
            </div>
          </div>

          {/* Highlight Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Estimated Salary</span>
              <p className="text-sm font-extrabold text-blue-600 mt-0.5">
                {job.currency} {job.salaryMin.toLocaleString('en-US')} - {job.salaryMax.toLocaleString('en-US')} / {job.salaryPeriod}
              </p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Employment Type</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{job.jobType} ({job.workMode})</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Experience Needed</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{job.experienceLevel}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Vacancies</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{job.vacancies} open positions</p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-6 border border-blue-100 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed">
              
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">Job Overview</h2>
                <p>{job.description}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Key Responsibilities</h2>
                <ul className="space-y-2 list-disc list-inside text-slate-600">
                  {job.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Requirements & Qualifications</h2>
                <ul className="space-y-2 list-disc list-inside text-slate-600">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* License Tags */}
              {job.requiredLicenses.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <h3 className="font-bold text-blue-600 text-xs uppercase tracking-wider">Mandatory Certificates / CDL</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredLicenses.map((lic, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                        ✓ {lic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h2 className="text-lg font-bold text-slate-900">Benefits & Perks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((b, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-medium text-slate-800">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Application Submission Form */}
            <div id="apply-section" className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-md space-y-6 text-slate-900">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>Apply for {job.title}</span>
              </h2>

              {!user ? (
                <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 text-center">
                  <ShieldCheck className="mx-auto h-9 w-9 text-blue-600" />
                  <h3 className="mt-3 text-base font-black text-slate-900">Sign in before applying</h3>
                  <p className="mt-1 text-xs text-slate-600">Create an account or sign in so your verified details can be sent to the recruiter.</p>
                  <Link href={`/auth?redirect=${encodeURIComponent(`/jobs/${job.id}#apply-section`)}`} className="mt-4 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-xs font-black text-white hover:bg-blue-700">Sign in / Sign up</Link>
                </div>
              ) : applied ? (
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900">Application Received</h3>
                  <p className="text-xs text-slate-600">
                    {job.companyName} will review your candidate profile and contact you directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Cover Note / Remarks for Recruiter</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your relevant heavy driving, dispatching, or logistics experience..."
                      value={coverLetter}
                      onChange={e => setCoverLetter(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  {job.screeningQuestions?.map((q, i) => (
                    <div key={i} className="space-y-1.5">
                      <label className="font-bold text-slate-700">{q}</label>
                      <input
                        type="text"
                        required
                        placeholder="Your answer..."
                        value={answers[q] || ''}
                        onChange={e => setAnswers({ ...answers, [q]: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="btn-orange w-full justify-center text-xs py-3.5"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4 text-xs text-slate-900">
              <div className="flex items-center gap-3">
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-blue-100 bg-slate-50"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1">
                    {job.companyName}
                    {job.verifiedCompany && <ShieldCheck className="w-4 h-4 text-blue-600 inline" />}
                  </h3>
                  <p className="text-slate-500">{job.location}</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Visa Sponsorship:</span>
                  <span className="font-bold text-slate-900">{job.visaSponsorship ? 'Yes ✓' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Accommodation:</span>
                  <span className="font-bold text-slate-900">{job.accommodationProvided ? 'Included ✓' : 'Self'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Food Allowance:</span>
                  <span className="font-bold text-slate-900">{job.foodAllowance ? 'Included ✓' : 'N/A'}</span>
                </div>
              </div>

              <Link
                href={`/companies/${job.companyId}`}
                className="block w-full py-2.5 text-center bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-600 font-bold rounded-xl border border-slate-200 hover:border-blue-400 transition-colors"
              >
                View Company Details
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
