'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Briefcase,
  Search,
  MapPin,
  Filter,
  ShieldCheck,
  Bookmark,
  Clock,
  CheckCircle2,
  X,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export default function JobsPage() {
  const { jobs, categories, companies, savedJobIds, toggleSaveJob, applyForJob } = useApp();
  const { user } = useAuth();
  const router = useRouter();

  // Filters
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [visaOnly, setVisaOnly] = useState(false);
  const [urgentOnly, setUrgentOnly] = useState(false);

  // Selected job for quick apply modal
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [screeningAnswers, setScreeningAnswers] = useState<Record<string, string>>({});
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const filteredJobs = jobs.filter(j => {
    const matchesQuery = query === '' || j.title.toLowerCase().includes(query.toLowerCase()) || j.description.toLowerCase().includes(query.toLowerCase());
    const matchesLoc = location === '' || j.location.toLowerCase().includes(location.toLowerCase()) || j.country.toLowerCase().includes(location.toLowerCase());
    const matchesCat = category === '' || j.category === category;
    const matchesType = jobType === '' || j.jobType === jobType;
    const matchesMode = workMode === '' || j.workMode === workMode;
    const matchesVisa = !visaOnly || j.visaSponsorship;
    const matchesUrgent = !urgentOnly || j.urgentHiring;
    return matchesQuery && matchesLoc && matchesCat && matchesType && matchesMode && matchesVisa && matchesUrgent;
  });

  const activeApplyingJob = jobs.find(j => j.id === applyingJobId);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJobId) return;
    applyForJob(applyingJobId, coverLetter, screeningAnswers);
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setApplyingJobId(null);
      setCoverLetter('');
      setScreeningAnswers({});
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2 pt-6 md:pt-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Verified Job Openings</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-8 h-8 text-blue-600 shrink-0" />
            <span>Global Job Marketplace & Career Opportunities</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
            Discover verified vacancies for Software Engineers, Healthcare Specialists, Financial Directors, Project Managers, CDL Drivers, and Sales Leaders worldwide.
          </p>
        </div>

        {/* Main Grid: Filters Sidebar + Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl space-y-5 border border-blue-100 shadow-md text-slate-900">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  Filter Vacancies
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setLocation('');
                    setCategory('');
                    setJobType('');
                    setWorkMode('');
                    setVisaOnly(false);
                    setUrgentOnly(false);
                  }}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Keyword Search */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Keyword Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Engineer, Nurse, Finance, Sales..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Location / City</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Dubai, London, Riyadh, Remote..."
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Industry / Sector</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                >
                  <option value="">All Sectors</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Job Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Employment Type</label>
                <select
                  value={jobType}
                  onChange={e => setJobType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                >
                  <option value="">Any Employment Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Shift">Shift</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="pt-3 border-t border-slate-100 space-y-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 font-medium">
                  <input
                    type="checkbox"
                    checked={visaOnly}
                    onChange={e => setVisaOnly(e.target.checked)}
                    className="rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-0 w-4 h-4"
                  />
                  <span>Visa Sponsorship Provided</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 font-medium">
                  <input
                    type="checkbox"
                    checked={urgentOnly}
                    onChange={e => setUrgentOnly(e.target.checked)}
                    className="rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-0 w-4 h-4"
                  />
                  <span className="text-blue-600 font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-blue-600" /> Urgent Hiring Only
                  </span>
                </label>
              </div>

            </div>
          </div>

          {/* Job Listings List */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Showing {filteredJobs.length} Vacancies</span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-blue-100 space-y-3 text-slate-900 shadow-sm">
                <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-900 text-base">No vacancies found matching your filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search keywords, location, or industry sector options.
                </p>
              </div>
            ) : (
              filteredJobs.map(j => {
                const isSaved = savedJobIds.includes(j.id);
                const compObj = companies.find(c => c.name === j.companyName);
                const logoUrl = (j.companyLogo && j.companyLogo !== '/images/nfs-logo.png') ? j.companyLogo : (compObj?.logo || '/images/nfs-logo.png');

                return (
                  <div
                    key={j.id}
                    className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm hover:border-blue-500 transition-all duration-300 space-y-4 text-slate-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={logoUrl}
                          alt={j.companyName}
                          className="w-12 h-12 rounded-2xl object-contain ring-1 ring-blue-100 bg-white p-1.5 shadow-xs shrink-0"
                        />
                        <div>
                          <h2 className="font-extrabold text-slate-900 text-lg hover:text-blue-600 transition-colors">
                            <Link href={`/jobs/${j.id}`}>{j.title}</Link>
                          </h2>
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <span className="font-semibold text-slate-700 flex items-center gap-1">
                              {j.companyWebsite ? (
                                <a
                                  href={j.companyWebsite.startsWith('http') ? j.companyWebsite : `https://${j.companyWebsite}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 font-extrabold hover:underline flex items-center gap-1"
                                  title={`Visit ${j.companyName} website`}
                                >
                                  {j.companyName} ↗
                                </a>
                              ) : (
                                <span>{j.companyName}</span>
                              )}
                              {j.verifiedCompany && <ShieldCheck className="w-3.5 h-3.5 text-blue-600 inline" />}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-blue-600" />
                              {j.city}, {j.country}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {j.urgentHiring && (
                          <span className="animate-urgent-pulse px-2.5 py-1 rounded-md border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Zap className="w-3 h-3" /> Urgent
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleSaveJob(j.id)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isSaved
                              ? 'bg-blue-50 border-blue-200 text-blue-600'
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-blue-600'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {j.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px]">
                        {j.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-[10px]">
                        {j.jobType}
                      </span>
                      {j.visaSponsorship && (
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px]">
                          Visa Sponsored
                        </span>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Salary Range</span>
                        <span className="text-sm font-extrabold text-blue-600">
                          {j.currency} {j.salaryMin.toLocaleString('en-US')} - {j.salaryMax.toLocaleString('en-US')} / {j.salaryPeriod}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!user) {
                              router.push('/auth?redirect=/jobs');
                            } else {
                              setApplyingJobId(j.id);
                            }
                          }}
                          className="btn-orange text-xs py-2 px-4 inline-flex items-center gap-1"
                        >
                          <span>Apply Now</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}

          </div>

        </div>

      </div>

      {/* Quick Apply Modal */}
      {applyingJobId && activeApplyingJob && (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 max-w-lg w-full text-slate-900 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Quick Application</span>
                <h2 className="text-xl font-bold text-slate-900">{activeApplyingJob.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setApplyingJobId(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-500">
                  Your candidate profile and cover note have been sent to {activeApplyingJob.companyName}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Cover Note / Message to Recruiter</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your relevant experience and why you are a great fit for this role..."
                    value={coverLetter}
                    onChange={e => setCoverLetter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-600"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyingJobId(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-orange text-xs py-2.5 px-6"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
