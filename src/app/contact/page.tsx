'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, ChevronDown, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [division, setDivision] = useState('recruitment');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await addDoc(collection(db, 'contact_inquiries'), {
        division,
        fullName,
        email,
        details,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Firestore error:", err);
      setErrorMsg(err.message || "Could not save inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 pt-6 md:pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-200">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>NFS Candidate & Employer Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Contact Novus Future Solutions</h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Ask about vacancies, candidate applications, corporate hiring support across any industry, or executive recruitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Contact Info Card */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white text-slate-900 border border-blue-100 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <img src="/images/nfs-logo.png" alt="NFS" className="w-12 h-12 bg-slate-50 rounded-xl p-1 shadow-xs border border-blue-200" />
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Novus Future Solutions</div>
                  <div className="text-[10px] text-blue-600 font-mono">Global Recruitment Network</div>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Global Headquarters</div>
                    <div>JLT Cluster X, Dubai, United Arab Emirates</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Direct Email</div>
                    <div>contact@novusfuturesolutions.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">24/7 Hotline</div>
                    <div>+971 4 800 6688 / +44 20 7946 0921</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-100 shadow-md text-slate-900">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Inquiry Submitted Successfully!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    An NFS Corporate Recruitment Manager will respond to your request within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-medium border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">How can we help?</label>
                    <div className="relative w-full max-w-full overflow-hidden">
                      <select
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="w-full max-w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl p-3 pr-10 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors truncate"
                      >
                        <option value="recruitment">Job Search & Candidate Applications</option>
                        <option value="employer">Employer Hiring Support (All Sectors)</option>
                        <option value="executive">Executive Search & Headhunting</option>
                        <option value="growth">Corporate Workforce & Growth Advisory</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-blue-600 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5">Corporate Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Inquiry Details</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your vacancy, hiring requirement, candidate application, or workforce goal..."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-orange justify-center py-3.5 rounded-xl font-extrabold text-xs disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
