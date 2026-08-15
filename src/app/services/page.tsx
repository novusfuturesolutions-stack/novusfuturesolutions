'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Briefcase,
  Building2,
  Users,
  Search,
  CheckCircle2,
  ArrowRight,
  Send,
  Loader2,
  Headphones,
  Award,
  Sparkles,
  Zap,
  Globe2,
  UserCheck
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ServicesPage() {
  const { services } = useApp();
  const [selectedTab, setSelectedTab] = useState<'all' | 'recruitment' | 'screening' | 'staffing'>('all');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [serviceName, setServiceName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'service_inquiries'), {
        serviceRequested: serviceName || 'General Corporate Service Request',
        contactPerson: contactName,
        email: contactEmail,
        phone: contactPhone,
        notes: notes,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setRequestSubmitted(true);
    } catch (err) {
      console.error('Error submitting service request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const serviceCategories = [
    {
      id: 'srv-headhunting',
      title: 'Executive Headhunting & Global Talent Sourcing',
      subtitle: 'For C-Suite, Tech Leads, Healthcare & Financial Directors',
      icon: Search,
      price: '$1,500 / candidate',
      time: '7 - 14 Days Placement',
      features: [
        'Custom C-Level & Leadership Sourcing',
        'In-depth Technical & Behavioral Interviews',
        'Visa, Relocation & Onboarding Escort',
        '90-Day Unconditional Replacement Guarantee'
      ]
    },
    {
      id: 'srv-screening',
      title: 'Candidate Background & Credential Verification',
      subtitle: 'Multi-layer identity, degree, license & reference screening',
      icon: ShieldCheck,
      price: '$350 / candidate',
      time: '2 - 4 Business Days',
      features: [
        'Government ID & Identity Fraud Shield',
        'University Degree & Professional License Authentication',
        'Past Employer Performance & Reference Screening',
        'Comprehensive Audit-Ready Compliance PDF Report'
      ]
    },
    {
      id: 'srv-staffing',
      title: '24/7 Operational & Heavy Transport Staffing',
      subtitle: 'CDL heavy drivers, warehouse operators, logistics & healthcare teams',
      icon: Zap,
      price: 'Custom Corporate SLA',
      time: 'Immediate / 24 Hours',
      features: [
        'Verified CDL Class A / Heavy Trailer Drivers',
        'Forklift Operators & Warehouse Management Teams',
        'Clinical Nursing & Medical Facility Support Staff',
        'Turnkey Payroll & Cross-Border Visa Management'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="space-y-4 pt-6 md:pt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold w-fit">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Novus Future Solutions Enterprise Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Corporate Headhunting, Staffing &amp; Background Screening.
          </h1>
          <p className="text-slate-600 text-base max-w-3xl leading-relaxed font-medium">
            Empowering global enterprises across Europe, UK, GCC, and North America with verified candidate placement, executive headhunting, and 24/7 operational staffing.
          </p>
        </div>

        {/* 3 Main Options Quick Navigator Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/jobs"
            className="group p-6 rounded-3xl bg-white border border-blue-100 shadow-md hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Option 1</span>
                <h3 className="text-base font-extrabold text-slate-900">For Job Seekers</h3>
                <p className="text-xs text-slate-500">Search 5,000+ Verified Jobs</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
          </Link>

          <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-xl ring-2 ring-blue-400 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold text-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest block">Option 2</span>
                <h3 className="text-base font-extrabold text-white">Services</h3>
                <p className="text-xs text-blue-100">Verification &amp; Headhunting</p>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>

          <Link
            href="/companies"
            className="group p-6 rounded-3xl bg-white border border-blue-100 shadow-md hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Option 3</span>
                <h3 className="text-base font-extrabold text-slate-900">For Employer</h3>
                <p className="text-xs text-slate-500">Request Staff in 60 Seconds</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
          </Link>
        </div>

        {/* Featured Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCategories.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div key={item.id} className="bg-white rounded-3xl p-8 border border-blue-100 shadow-xl flex flex-col justify-between hover:border-blue-500 hover:shadow-2xl transition-all duration-300 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      {item.price}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{item.subtitle}</p>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-700">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setServiceName(item.title);
                    const formEl = document.getElementById('service-inquiry-form');
                    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* SERVICE INQUIRY FORM */}
        <div id="service-inquiry-form" className="bg-white rounded-3xl border border-blue-100 shadow-2xl p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Request Corporate Service Consultation</h2>
              <p className="text-xs text-slate-500">Fill out your business requirements below and our senior solutions lead will respond within 30 minutes.</p>
            </div>
          </div>

          {requestSubmitted ? (
            <div className="p-8 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Service Request Confirmed!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for contacting Novus Future Solutions. Our enterprise team will connect with your email and contact phone shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleServiceRequest} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Selected Service</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Headhunting, Background Screening, CDL Driver Staffing..."
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Name / Company</label>
                <input
                  type="text"
                  required
                  placeholder="Marcus Vance (Apex Global)"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="marcus@company.com"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+44 20 7946 0912"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Requirement Overview / Notes</label>
                <input
                  type="text"
                  placeholder="Number of candidates needed, timeline, key credentials..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all hover:scale-[1.01]"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Corporate Consultation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
