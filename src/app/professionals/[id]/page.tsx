'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/context/AppContext';
import {
  Users,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Download,
  UserPlus,
  MessageSquare,
  Award,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Share2
} from 'lucide-react';

export default function ProfessionalDetailPage() {
  const params = useParams();
  const userId = params?.id as string;
  const { professionalProfiles, connectedUserIds, sendConnectionRequest } = useApp();

  const profile = professionalProfiles.find(p => p.userId === userId);
  if (!profile) {
    return <div className="grid min-h-[70vh] place-items-center px-4 text-center"><div><Users className="mx-auto h-12 w-12 text-slate-400" /><h1 className="mt-4 text-2xl font-black">Professional not found</h1><Link href="/professionals" className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-xs font-black text-white">Back to directory</Link></div></div>;
  }
  const isConnected = connectedUserIds.includes(profile.userId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <Link href="/professionals" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Professionals Directory</span>
      </Link>

      {/* Main Profile Header Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
        
        {/* Cover Photo */}
        <div className="h-48 sm:h-60 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 relative">
          <img
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&auto=format&fit=crop&q=80"
            alt="Cover"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Profile Info Bar */}
        <div className="p-6 sm:p-8 relative pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
                alt={profile.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-slate-950 shadow-2xl shrink-0"
              />
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                  {profile.name}
                  <ShieldCheck className="w-6 h-6 text-cyan-400 inline" />
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl">{profile.headline}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {profile.preferredLocations[0] || 'Dubai, UAE'}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{profile.connectionsCount} Connections</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => sendConnectionRequest(profile.userId)}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  isConnected
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{isConnected ? 'Connected ✓' : 'Connect'}</span>
              </button>

              <Link
                href="/dashboard/messages"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Send Message</span>
              </Link>
            </div>

          </div>

          {/* Profile Completion & Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Total Experience</span>
              <p className="text-sm font-bold text-white mt-0.5">{profile.experienceYears} Years</p>
            </div>
            <div>
              <span className="text-slate-400">Expected Salary</span>
              <p className="text-sm font-bold text-emerald-400 mt-0.5">{profile.expectedSalary}</p>
            </div>
            <div>
              <span className="text-slate-400">Availability</span>
              <p className="text-sm font-bold text-cyan-400 mt-0.5 capitalize">{profile.availability.replace('_', ' ')}</p>
            </div>
            <div>
              <span className="text-slate-400">CV Resume</span>
              <a
                href={profile.cvUrl}
                download
                className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
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
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h2 className="text-lg font-bold text-white">About & Professional Summary</h2>
            <p>{profile.bio}</p>
          </div>

          {/* Licenses & Permits Section */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Commercial Driving Licenses & Safety Credentials</span>
            </h2>

            <div className="space-y-3">
              {profile.licenses.map(lic => (
                <div key={lic.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                      {lic.type}
                      {lic.verified && <ShieldCheck className="w-4 h-4 text-cyan-400 inline" />}
                    </h3>
                    <p className="text-slate-400 mt-0.5">License #: {lic.number} • Issued by {lic.issuingAuthority}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Expires: {lic.expiryDate}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Work History */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Work Experience Timeline</span>
            </h2>

            <div className="space-y-6">
              {profile.experiences.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-800 space-y-1">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-cyan-500"></div>
                  <h3 className="font-bold text-white text-sm">{exp.title}</h3>
                  <p className="text-xs font-semibold text-cyan-400">{exp.company} • {exp.location}</p>
                  <p className="text-[11px] text-slate-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Skills & Contact */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm">Logistics Skills & Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm">Languages</h3>
            <div className="space-y-2 text-slate-300">
              {profile.languages.map((lang, i) => (
                <div key={i} className="flex justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-medium text-white">{lang}</span>
                  <span className="text-slate-400">Fluent</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
