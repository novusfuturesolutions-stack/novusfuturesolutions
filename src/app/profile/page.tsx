'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, doc, DocumentData, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { Briefcase, CheckCircle2, CircleUserRound, Mail, MapPin, Pencil, Phone, Save, ShieldCheck, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/context/AuthContext';

export default function ProfilePage() {
  const { user, role, loading } = useAuth();
  const [profile, setProfile] = useState<DocumentData | null>(null);
  const [applications, setApplications] = useState<DocumentData[]>([]);
  const [fetching, setFetching] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getDoc(doc(db, 'users', user.uid)),
      getDocs(query(collection(db, 'applications'), where('applicantId', '==', user.uid))),
    ]).then(([userSnapshot, applicationSnapshot]) => {
      setProfile(userSnapshot.data() || {});
      setApplications(applicationSnapshot.docs.map(item => ({ ...item.data(), id: item.id })));
    }).finally(() => setFetching(false));
  }, [user]);

  if (loading) return <div className="grid min-h-[70vh] place-items-center text-xs font-bold text-slate-500">Loading your profile…</div>;
  if (!user) return <div className="grid min-h-[70vh] place-items-center px-4 text-center"><div><CircleUserRound className="mx-auto h-12 w-12 text-blue-600" /><h1 className="mt-4 text-2xl font-black text-slate-900">Sign in to view your profile</h1><Link href="/auth?redirect=%2Fprofile" className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-xs font-black text-white hover:bg-blue-700">Sign in / Sign up</Link></div></div>;
  if (fetching) return <div className="grid min-h-[70vh] place-items-center text-xs font-bold text-slate-500">Loading your profile…</div>;

  const name = profile?.name || user.displayName || 'NFS Member';

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    const data = new FormData(event.currentTarget);
    const countryCode = String(data.get('countryCode')).trim();
    const mobileNumber = String(data.get('phone')).replace(/\D/g, '');
    const updates = {
      name: String(data.get('name')).trim(),
      phone: `${countryCode}${mobileNumber}`,
      country: String(data.get('country')).trim(),
      countryCode,
      location: String(data.get('location')).trim(),
      headline: String(data.get('headline')).trim(),
    };
    await Promise.all([
      updateDoc(doc(db, 'users', user.uid), updates),
      updateProfile(user, { displayName: updates.name }),
    ]);
    setProfile((current: DocumentData | null) => ({ ...(current || {}), ...updates }));
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-6 pt-6 md:pt-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-7 text-white sm:p-10 border border-blue-500/40 shadow-xl">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[42px] border-white/10" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white text-blue-700 text-3xl font-black shadow-xl">{String(name).charAt(0).toUpperCase()}</span>
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white border border-white/30"><ShieldCheck className="h-3 w-3" /> Authenticated account</span>
              <h1 className="mt-3 text-3xl font-black sm:text-5xl text-white">{name}</h1>
              <p className="mt-2 text-xs capitalize text-blue-100">{role || profile?.role || 'professional'} account</p>
            </div>
            <button onClick={() => setEditing(true)} className="relative inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-black text-white hover:bg-white/20 backdrop-blur-xl transition"><Pencil className="h-4 w-4 text-blue-200" /> Edit profile</button>
          </div>
        </section>

        {saved && <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs font-bold text-blue-700"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Profile updated successfully.</div>}

        <div className="mt-5 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-md text-slate-900">
            <h2 className="text-lg font-black text-slate-900">Contact information</h2>
            <div className="mt-5 space-y-4 text-xs">
              <Info icon={Mail} label="Email" value={user.email || 'Not provided'} />
              <Info icon={Phone} label="Mobile" value={profile?.phone || 'Not provided'} />
              <Info icon={MapPin} label="Country" value={profile?.country || 'Not provided'} />
            </div>
          </section>

          <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-md text-slate-900">
            <div className="flex items-center justify-between"><div><h2 className="text-lg font-black text-slate-900">My applications</h2><p className="mt-1 text-[10px] text-slate-500">Live status from NFS recruiters</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600 border border-blue-200">{applications.length}</span></div>
            <div className="mt-4 space-y-2">
              {applications.length === 0 ? <p className="rounded-xl bg-slate-50 border border-slate-200 p-6 text-center text-xs font-bold text-slate-500">No applications submitted yet.</p> : applications.map(item => (
                <Link key={item.id} href={`/jobs/${item.jobId}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-500">
                  <div className="flex min-w-0 items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200"><Briefcase className="h-4 w-4" /></span><div className="min-w-0"><p className="truncate text-xs font-black text-slate-900">{item.jobTitle || 'Job application'}</p><p className="mt-1 truncate text-[9px] text-slate-500">{item.companyName || 'NFS Employer'}</p></div></div>
                  <span className="shrink-0 rounded-full bg-blue-50 border border-blue-200 px-2 py-1 text-[8px] font-black uppercase text-blue-600">{String(item.status || 'submitted').replaceAll('_', ' ')}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      {editing && <EditProfileModal profile={{ ...profile, name }} saving={saving} onClose={() => setEditing(false)} onSubmit={saveProfile} />}
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200"><Icon className="h-4 w-4" /></span><div><p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-0.5 font-bold text-slate-900">{value}</p></div></div>;
}

function EditProfileModal({ profile, saving, onClose, onSubmit }: { profile: DocumentData; saving: boolean; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  const countries = [
    ['India', '+91'], ['United Arab Emirates', '+971'], ['Saudi Arabia', '+966'],
    ['Qatar', '+974'], ['Kuwait', '+965'], ['Oman', '+968'], ['Bahrain', '+973'],
    ['United Kingdom', '+44'], ['United States', '+1'], ['Germany', '+49'],
  ];
  const selectedCode = profile.countryCode || countries.find(([country]) => country === profile.country)?.[1] || '+91';
  const localPhone = String(profile.phone || '').replace(selectedCode, '').replace(/\D/g, '');
  return <div className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}><form onSubmit={onSubmit} className="my-6 w-full max-w-lg rounded-3xl bg-white border border-blue-200 p-6 shadow-2xl sm:p-8 text-slate-900"><div className="flex items-start justify-between"><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-blue-600">Account settings</p><h2 className="mt-2 text-2xl font-black text-slate-900">Edit your profile</h2><p className="mt-1 text-xs text-slate-500">Keep your recruiter contact information current.</p></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900"><X className="h-4 w-4" /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><ProfileField name="name" label="Full name" defaultValue={profile.name} required /><label className="text-xs font-bold text-slate-700">Country<select name="country" defaultValue={profile.country || ''} required className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none focus:border-blue-600"><option value="">Choose country</option>{countries.map(([country]) => <option key={country} value={country}>{country}</option>)}</select></label><label className="text-xs font-bold text-slate-700 sm:col-span-2">Mobile number<span className="mt-2 grid grid-cols-[100px_1fr] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-600"><select name="countryCode" defaultValue={selectedCode} required className="h-11 border-r border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none">{countries.map(([country, code]) => <option key={country} value={code}>{code}</option>)}</select><input name="phone" type="tel" inputMode="numeric" pattern="[0-9]{6,15}" defaultValue={localPhone} required placeholder="Mobile number" className="h-11 min-w-0 bg-transparent px-3 text-slate-900 outline-none" /></span></label><ProfileField name="location" label="City / Location" defaultValue={profile.location} /><label className="text-xs font-bold text-slate-700 sm:col-span-2">Professional headline<input name="headline" defaultValue={profile.headline || ''} placeholder="e.g. Heavy Vehicle Driver" className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none focus:border-blue-600" /></label></div><button disabled={saving} className="mt-6 btn-orange w-full py-3.5 text-sm font-black justify-center"><Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save changes'}</button></form></div>;
}

function ProfileField({ name, label, defaultValue, type = 'text', required }: { name: string; label: string; defaultValue?: string; type?: string; required?: boolean }) {
  return <label className="text-xs font-bold text-slate-700">{label}<input name={name} type={type} defaultValue={defaultValue || ''} required={required} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none focus:border-blue-600" /></label>;
}
