'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import {
  ShieldCheck,
  MapPin,
  Download,
  UserPlus,
  MessageSquare,
  Award,
  Briefcase,
  ArrowLeft,
} from 'lucide-react';

export default function ProfessionalDetailPage() {
  const params = useParams();
  const userId = params?.id as string;
  const { professionalProfiles, dataLoaded, connectedUserIds, sendConnectionRequest } = useApp();

  const profile = professionalProfiles.find(p => p.userId === userId);
  if (!dataLoaded.professionals) {
    return <div className="grid min-h-[70vh] place-items-center text-xs font-bold text-slate-500">Loading professional…</div>;
  }
  if (!profile) {
    notFound();
  }
  const isConnected = connectedUserIds.includes(profile.userId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-900">
      
      {/* Back Button */}
      <Link href="/professionals" className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 transition-colors pt-6 md:pt-10 font-bold">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Professionals Directory</span>
      </Link>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-md">
        
        {/* Cover Photo */}
        <div className="h-48 sm:h-60 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 relative">
          <img
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&auto=format&fit=crop&q=80"
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Profile Info Bar */}
        <div className="p-6 sm:p-8 relative pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
                alt={profile.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white shadow-2xl shrink-0 bg-slate-50 border border-slate-200"
              />
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                  {profile.name}
                  <ShieldCheck className="w-6 h-6 text-blue-600 inline" />
                </h1>
                <p className="text-xs sm:text-sm text-blue-600 font-semibold max-w-xl">{profile.headline}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    {profile.preferredLocations[0] || 'Dubai, UAE'}
                  </span>
                  <span>•</span>
                  <span className="text-blue-600 font-bold">{profile.connectionsCount} Connections</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => sendConnectionRequest(profile.userId)}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  isConnected
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{isConnected ? 'Connected ✓' : 'Connect'}</span>
              </button>

              <Link
                href="/dashboard/messages"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Send Message</span>
              </Link>
            </div>

          </div>

          {/* Profile Completion & Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Total Experience</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{profile.experienceYears} Years</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Expected Salary</span>
              <p className="text-sm font-bold text-blue-600 mt-0.5">{profile.expectedSalary}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Availability</span>
              <p className="text-sm font-bold text-blue-600 mt-0.5 capitalize">{profile.availability.replace('_', ' ')}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">CV Resume</span>
              <a
                href={profile.cvUrl}
                download
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Main Grid: Details + Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-4 border border-blue-100 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">About & Professional Summary</h2>
            <p>{profile.bio}</p>
          </div>

          {/* Licenses & Permits Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-4 border border-blue-100 shadow-sm text-slate-900">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>Commercial Driving Licenses & Safety Credentials</span>
            </h2>

            <div className="space-y-3">
              {profile.licenses.map(lic => (
                <div key={lic.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      {lic.type}
                      {lic.verified && <ShieldCheck className="w-4 h-4 text-blue-600 inline" />}
                    </h3>
                    <p className="text-slate-500 mt-0.5">License #: {lic.number} • Issued by {lic.issuingAuthority}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Expires: {lic.expiryDate}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-[10px]">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Work History */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl space-y-4 border border-blue-100 shadow-sm text-slate-900">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span>Work Experience Timeline</span>
            </h2>

            <div className="space-y-6">
              {profile.experiences.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200 space-y-1">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-blue-600"></div>
                  <h3 className="font-bold text-slate-900 text-sm">{exp.title}</h3>
                  <p className="text-xs font-semibold text-blue-600">{exp.company} • {exp.location}</p>
                  <p className="text-[11px] text-slate-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Skills & Contact */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4 text-xs text-slate-900">
            <h3 className="font-bold text-slate-900 text-sm">Logistics Skills & Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4 text-xs text-slate-900">
            <h3 className="font-bold text-slate-900 text-sm">Languages</h3>
            <div className="space-y-2 text-slate-700">
              {profile.languages.map((lang, i) => (
                <div key={i} className="flex justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-medium text-slate-900">{lang}</span>
                  <span className="text-slate-500">Fluent</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
