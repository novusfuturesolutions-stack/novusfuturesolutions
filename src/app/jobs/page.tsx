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
  Zap
} from 'lucide-react';

export default function JobsPage() {
  const { jobs, savedJobIds, toggleSaveJob, applyForJob } = useApp();
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
        
        {/* Page Header with Crisp Dark Slate Text */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Verified Driver Vacancies</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-8 h-8 text-orange-500 shrink-0" />
            <span>Heavy Truck Driver & Freight Job Marketplace</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
            Discover verified vacancies for CDL heavy trailer drivers, freight forwarders, dispatchers, and cold chain managers worldwide.
          </p>
        </div>

        {/* Main Grid: Filters Sidebar + Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl space-y-5 border border-slate-200/80 shadow-md">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4 text-orange-500" />
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
                    placeholder="CDL Class A, Hazmat, FASAH..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Location / Port</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Dubai, Hamburg, Mumbai, KSA..."
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Logistics Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                >
                  <option value="">All Categories</option>
                  <option value="Truck Driver">Truck Driver</option>
                  <option value="Dispatcher">Dispatcher</option>
                  <option value="Warehouse Staff">Warehouse Staff</option>
                  <option value="Customs Clearance Agent">Customs Clearance Agent</option>
                  <option value="Freight Forwarder">Freight Forwarder</option>
                </select>
              </div>

              {/* Job Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Employment Type</label>
                <select
                  value={jobType}
                  onChange={e => setJobType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
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
                    className="rounded bg-slate-100 border-slate-300 text-orange-500 focus:ring-0 w-4 h-4"
                  />
                  <span className="text-orange-600 font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-orange-500" /> Urgent Hiring Only
                  </span>
                </label>
              </div>

            </div>
          </div>

          {/* Job Listings Column */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
              <span>Showing <strong className="text-slate-900 font-extrabold">{filteredJobs.length}</strong> active vacancies</span>
              <span>Sorted by Most Recent</span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center space-y-3 border border-slate-200/80 shadow-sm">
                <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No job openings found matching your criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try loosening your category or location filters to discover more logistics opportunities.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => {
                  const isSaved = savedJobIds.includes(job.id);
                  return (
                    <div
                      key={job.id}
                      className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={job.companyLogo}
                              alt={job.companyName}
                              className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200 bg-slate-50"
                            />
                            <div>
                              <Link href={`/jobs/${job.id}`} className="font-extrabold text-slate-900 text-base hover:text-blue-600 transition-colors">
                                {job.title}
                              </Link>
                              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <span className="font-semibold text-slate-700">{job.companyName}</span>
                                {job.verifiedCompany && <ShieldCheck className="w-3.5 h-3.5 text-blue-600 inline" />}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleSaveJob(job.id)}
                            className={`p-2 rounded-xl border transition-colors ${
                              isSaved
                                ? 'bg-orange-50 text-orange-500 border-orange-200'
                                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 text-[11px]">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-orange-500" />
                            {job.location}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/60">
                            {job.currency} {job.salaryMin.toLocaleString('en-US')} - {job.salaryMax.toLocaleString('en-US')} / {job.salaryPeriod}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                            {job.jobType}
                          </span>
                          {job.visaSponsorship && (
                            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                              Visa Provided
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Deadline: {job.deadline}
                        </span>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              if (!user) {
                                router.push(`/auth?redirect=${encodeURIComponent(`/jobs/${job.id}#apply-section`)}`);
                                return;
                              }
                              setApplyingJobId(job.id);
                            }}
                            className="btn-orange text-xs py-1.5 px-4"
                          >
                            Quick Apply
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

        {/* QUICK APPLY MODAL */}
        {applyingJobId && activeApplyingJob && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative text-slate-900">
              <button
                type="button"
                onClick={() => setApplyingJobId(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-xl bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>

              {applicationSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <h3 className="text-xl font-extrabold text-slate-900">Application Submitted Successfully!</h3>
                  <p className="text-xs text-slate-600">
                    Your profile credentials have been delivered directly to {activeApplyingJob.companyName}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">Quick Application</span>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">{activeApplyingJob.title}</h3>
                    <p className="text-xs text-slate-500">{activeApplyingJob.companyName} • {activeApplyingJob.location}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Cover Note / Remarks</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly state your CDL license class, total driving years, or availability date..."
                      value={coverLetter}
                      onChange={e => setCoverLetter(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {activeApplyingJob.screeningQuestions?.map((q, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{q}</label>
                      <input
                        type="text"
                        required
                        placeholder="Your answer..."
                        value={screeningAnswers[q] || ''}
                        onChange={e => setScreeningAnswers({ ...screeningAnswers, [q]: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="btn-orange w-full justify-center text-xs py-3"
                  >
                    Confirm & Submit Application
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
