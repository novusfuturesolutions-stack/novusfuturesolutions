'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  FileText,
  Inbox,
  LayoutDashboard,
  LoaderCircle,
  Mail,
  MessageCircle,
  Plus,
  RefreshCw,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/context/AuthContext';

type Section = 'overview' | 'jobs' | 'applications' | 'inquiries' | 'users';
type AdminRecord = DocumentData & { id: string };

const collections = ['users', 'jobs', 'applications', 'contact_inquiries'] as const;

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const [section, setSection] = useState<Section>('overview');
  const [records, setRecords] = useState<Record<string, AdminRecord[]>>({});
  const [fetching, setFetching] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [notice, setNotice] = useState('');

  const loadData = useCallback(async () => {
    if (!isAdmin) return;
    setFetching(true);
    try {
      const result = await Promise.all(collections.map(async name => {
        const snapshot = await getDocs(collection(db, name));
        return [name, snapshot.docs.map(item => ({ ...item.data(), id: item.id }))] as const;
      }));
      setRecords(Object.fromEntries(result));
    } finally {
      setFetching(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    // Initial remote Firestore synchronization for the authenticated administrator.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, [loadData]);

  if (loading) return <div className="grid min-h-[70vh] place-items-center text-sm font-bold text-slate-500">Checking secure access…</div>;
  if (!user) return <Access title="Sign in required" body="You must sign in with an administrator account to continue." href="/auth" action="Go to sign in" />;
  if (!isAdmin) return <Access title="Administrator only" body="Your account does not have administrator permission." href="/" action="Return home" />;

  const cards = [
    { key: 'users', label: 'Registered users', icon: Users, color: 'bg-blue-600', section: 'users' as Section },
    { key: 'jobs', label: 'Job listings', icon: Briefcase, color: 'bg-orange-500', section: 'jobs' as Section },
    { key: 'applications', label: 'Applications', icon: FileText, color: 'bg-emerald-600', section: 'applications' as Section },
    { key: 'contact_inquiries', label: 'Contact inquiries', icon: Inbox, color: 'bg-slate-800', section: 'inquiries' as Section },
  ];

  const nav = [
    { id: 'overview' as Section, label: 'Overview', icon: LayoutDashboard },
    { id: 'jobs' as Section, label: 'Jobs', icon: Briefcase },
    { id: 'applications' as Section, label: 'Applications', icon: FileText },
    { id: 'inquiries' as Section, label: 'Inquiries', icon: Inbox },
    { id: 'users' as Section, label: 'Users', icon: Users },
  ];

  async function createJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await addDoc(collection(db, 'jobs'), {
      title: data.get('title'),
      companyName: data.get('companyName'),
      companyId: 'nfs-admin',
      companyLogo: '/images/nfs-logo.png',
      category: data.get('category'),
      location: data.get('location'),
      city: data.get('location'),
      country: data.get('country'),
      salaryMin: Number(data.get('salaryMin')),
      salaryMax: Number(data.get('salaryMax')),
      currency: data.get('currency'),
      salaryPeriod: 'month',
      jobType: data.get('jobType'),
      workMode: 'On-site',
      experienceLevel: data.get('experienceLevel'),
      vacancies: Number(data.get('vacancies')),
      deadline: data.get('deadline'),
      description: data.get('description'),
      responsibilities: [],
      requirements: [],
      requiredSkills: [],
      requiredLicenses: [],
      benefits: [],
      visaSponsorship: false,
      accommodationProvided: false,
      foodAllowance: false,
      urgentHiring: data.get('urgentHiring') === 'on',
      verifiedCompany: true,
      postedAt: new Date().toISOString(),
      applicantsCount: 0,
      status: 'active',
      createdAt: serverTimestamp(),
    });
    setShowJobForm(false);
    setNotice('New vacancy published successfully.');
    await loadData();
  }

  async function changeStatus(collectionName: string, id: string, status: string) {
    await updateDoc(doc(db, collectionName, id), { status });
    setNotice(`Status changed to ${status.replaceAll('_', ' ')}.`);
    await loadData();
  }

  return (
    <div className="min-h-screen bg-[#eef2f6] pb-24 text-slate-950 md:-mt-20">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600"><ShieldCheck className="h-5 w-5" /></span>
            <div><strong className="block text-sm">NFS Command</strong><span className="text-[10px] text-slate-400">Administrator workspace</span></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => void loadData()} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-700 text-slate-300" aria-label="Refresh data"><RefreshCw className={`h-4 w-4 ${fetching ? 'animate-spin' : ''}`} /></button>
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-black text-slate-950"><ArrowLeft className="h-4 w-4" /> Website</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <p className="px-3 pb-2 pt-3 text-[9px] font-black uppercase tracking-[.18em] text-slate-400">Management</p>
          <nav className="grid grid-cols-3 gap-1 sm:grid-cols-5 lg:grid-cols-1">
            {nav.map(item => {
              const Icon = item.icon;
              return <button key={item.id} onClick={() => setSection(item.id)} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${section === item.id ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100'}`}><Icon className="h-4 w-4" /> <span className="truncate">{item.label}</span></button>;
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          {notice && <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-700"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> {notice}</span><button onClick={() => setNotice('')}><X className="h-4 w-4" /></button></div>}

          {section === 'overview' && (
            <>
              <div className="rounded-3xl bg-[linear-gradient(125deg,#0f172a,#102b66)] p-7 text-white">
                <span className="text-[10px] font-black uppercase tracking-[.18em] text-blue-300">Live operations</span>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Good to see you, Admin.</h1>
                <p className="mt-3 text-xs text-slate-300">{user.email} · All controls are protected by Firestore rules.</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {cards.map(({ key, label, icon: Icon, color, section: target }) => (
                  <button onClick={() => setSection(target)} key={key} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className={`grid h-9 w-9 place-items-center rounded-lg text-white ${color}`}><Icon className="h-4 w-4" /></span>
                    <p className="mt-5 text-3xl font-black">{records[key]?.length ?? '—'}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {section === 'jobs' && <Jobs records={records.jobs || []} onAdd={() => setShowJobForm(true)} onStatus={changeStatus} />}
          {section === 'applications' && <Applications records={records.applications || []} users={records.users || []} onStatus={changeStatus} />}
          {section === 'inquiries' && <Inquiries records={records.contact_inquiries || []} onStatus={changeStatus} />}
          {section === 'users' && <UsersList records={records.users || []} />}
        </main>
      </div>

      {showJobForm && <JobForm onClose={() => setShowJobForm(false)} onSubmit={createJob} />}
    </div>
  );
}

function SectionTitle({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-4 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-black">{title}</h2><p className="mt-1 text-xs text-slate-500">{description}</p></div>{action}</div>;
}

function Jobs({ records, onAdd, onStatus }: { records: AdminRecord[]; onAdd: () => void; onStatus: (collection: string, id: string, status: string) => void }) {
  return <><SectionTitle title="Job listings" description="Publish vacancies and control listing visibility." action={<button onClick={onAdd} className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-black text-white"><Plus className="h-4 w-4" /> Add job</button>} /><RecordList empty="No job listings yet.">{records.map(item => <Record key={item.id} title={item.title || 'Untitled job'} subtitle={`${item.companyName || 'NFS'} · ${item.location || 'Location pending'}`} badge={item.status || 'active'} action={<select value={item.status || 'active'} onChange={event => void onStatus('jobs', item.id, event.target.value)} className="rounded-lg border border-slate-200 bg-white p-2 text-[10px] font-bold"><option value="active">Active</option><option value="paused">Paused</option><option value="closed">Closed</option></select>} />)}</RecordList></>;
}

function Applications({ records, users, onStatus }: { records: AdminRecord[]; users: AdminRecord[]; onStatus: (collection: string, id: string, status: string) => void }) {
  const [selected, setSelected] = useState<AdminRecord | null>(null);
  const liveRecords = records.map(application => {
    const userProfile = users.find(account => account.id === application.applicantId);
    if (!userProfile) return application;
    return {
      ...application,
      applicantName: userProfile.name || application.applicantName,
      applicantEmail: userProfile.email || application.applicantEmail,
      applicantPhone: userProfile.phone || application.applicantPhone,
      applicantCountry: userProfile.country || application.applicantCountry,
      applicantLocation: userProfile.location || application.applicantLocation,
      applicantHeadline: userProfile.headline || application.applicantHeadline,
    };
  });
  return <><SectionTitle title="Applications" description="Applicant contact details stay synchronized with their latest profile." /><RecordList empty="No applications received yet.">{liveRecords.map(item => <Record key={item.id} title={item.applicantName || item.applicantEmail || 'Candidate'} onTitleClick={() => setSelected(item)} subtitle={`${item.jobTitle || 'Job application'} · ${item.applicantEmail || ''}${item.applicantPhone ? ` · ${item.applicantPhone}` : ''}${item.applicantCountry ? ` · ${item.applicantCountry}` : ''}`} detail={item.coverLetter || 'No cover note provided.'} badge={item.status || 'submitted'} action={<select value={item.status || 'submitted'} onChange={event => void onStatus('applications', item.id, event.target.value)} className="rounded-lg border border-slate-200 bg-white p-2 text-[10px] font-bold"><option value="submitted">Submitted</option><option value="under_review">Under review</option><option value="shortlisted">Shortlisted</option><option value="interview_scheduled">Interview</option><option value="selected">Selected</option><option value="rejected">Rejected</option></select>} />)}</RecordList>{selected && <ApplicantModal applicant={selected} onClose={() => setSelected(null)} />}</>;
}

function Inquiries({ records, onStatus }: { records: AdminRecord[]; onStatus: (collection: string, id: string, status: string) => void }) {
  return <><SectionTitle title="Contact inquiries" description="Track incoming customer and recruitment requests." /><RecordList empty="No inquiries received yet.">{records.map(item => <Record key={item.id} title={item.fullName || 'Website visitor'} subtitle={`${item.email || ''} · ${item.division || 'General inquiry'}`} detail={item.details} badge={item.status || 'new'} action={<select value={item.status || 'new'} onChange={event => void onStatus('contact_inquiries', item.id, event.target.value)} className="rounded-lg border border-slate-200 bg-white p-2 text-[10px] font-bold"><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option></select>} />)}</RecordList></>;
}

function UsersList({ records }: { records: AdminRecord[] }) {
  return <><SectionTitle title="Registered users" description="View account identities and assigned platform roles." /><RecordList empty="No registered users yet.">{records.map(item => <Record key={item.id} title={item.name || item.email || 'Unnamed user'} subtitle={item.email || item.id} badge={item.role || 'professional'} />)}</RecordList></>;
}

function RecordList({ children, empty }: { children: React.ReactNode; empty: string }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{hasItems ? children : <p className="p-10 text-center text-xs font-bold text-slate-400">{empty}</p>}</div>;
}

function Record({ title, subtitle, detail, badge, action, onTitleClick }: { title: string; subtitle: string; detail?: string; badge: string; action?: React.ReactNode; onTitleClick?: () => void }) {
  return <article className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 last:border-0"><div className="min-w-0"><div className="flex items-center gap-2">{onTitleClick ? <button onClick={onTitleClick} className="truncate text-left text-sm font-black text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-500">{title}</button> : <h3 className="truncate text-sm font-black">{title}</h3>}<span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[8px] font-black uppercase text-slate-600">{badge.replaceAll('_', ' ')}</span></div><p className="mt-1 truncate text-[10px] text-slate-500">{subtitle}</p>{detail && <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-slate-600">{detail}</p>}</div>{action}</article>;
}

function ApplicantModal({ applicant, onClose }: { applicant: AdminRecord; onClose: () => void }) {
  const answers = applicant.screeningAnswers && typeof applicant.screeningAnswers === 'object'
    ? Object.entries(applicant.screeningAnswers as Record<string, string>)
    : [];
  const details = [
    ['Email', applicant.applicantEmail || 'Not provided'],
    ['Mobile', applicant.applicantPhone || 'Not provided'],
    ['Country', applicant.applicantCountry || 'Not provided'],
    ['City / Location', applicant.applicantLocation || 'Not provided'],
    ['Applied for', applicant.jobTitle || 'Unknown vacancy'],
    ['Company', applicant.companyName || 'Not provided'],
    ['Current status', String(applicant.status || 'submitted').replaceAll('_', ' ')],
    ['Applied on', applicant.appliedAt ? new Date(applicant.appliedAt).toLocaleString() : 'Not available'],
  ];
  const phone = String(applicant.applicantPhone || '').replace(/\D/g, '');
  const email = String(applicant.applicantEmail || '');
  const contactMessage = `Hello ${applicant.applicantName || 'Candidate'}, we are contacting you from NFS regarding your application for ${applicant.jobTitle || 'our vacancy'}.`;
  const emailSubject = `Your application for ${applicant.jobTitle || 'NFS vacancy'}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(contactMessage)}`;
  return <div className="fixed inset-0 z-[130] grid place-items-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}><div className="my-6 w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"><div className="flex items-start justify-between bg-[linear-gradient(120deg,#0f172a,#123b82)] p-6 text-white"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500 text-lg font-black">{String(applicant.applicantName || applicant.applicantEmail || 'U').charAt(0).toUpperCase()}</span><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-blue-200">Candidate profile</p><h2 className="mt-1 text-2xl font-black">{applicant.applicantName || 'Applicant'}</h2><p className="mt-1 text-[10px] text-slate-300">{applicant.applicantHeadline || 'Logistics professional'}</p></div></div><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X className="h-4 w-4" /></button></div><div className="p-6"><div className="grid gap-3 sm:grid-cols-2">{details.map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[8px] font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 break-words text-xs font-bold capitalize text-slate-800">{value}</p></div>)}</div><div className="mt-4 grid grid-cols-2 gap-3">{phone ? <a href={`https://wa.me/${phone}?text=${encodeURIComponent(contactMessage)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"><MessageCircle className="h-4 w-4" /> WhatsApp</a> : <span className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold text-slate-400">No mobile number</span>}{email ? <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"><Mail className="h-4 w-4" /> Send email</a> : <span className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold text-slate-400">No email address</span>}</div><div className="mt-4 rounded-xl border border-slate-200 p-4"><p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Cover note</p><p className="mt-2 whitespace-pre-wrap text-xs leading-6 text-slate-700">{applicant.coverLetter || 'No cover note provided.'}</p></div>{answers.length > 0 && <div className="mt-4 space-y-2"><p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Screening answers</p>{answers.map(([question, answer]) => <div key={question} className="rounded-xl bg-blue-50 p-3"><p className="text-[10px] font-black text-blue-900">{question}</p><p className="mt-1 text-xs text-slate-700">{answer}</p></div>)}</div>}</div></div></div>;
}

function JobForm({ onClose, onSubmit }: { onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  return <div className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"><form onSubmit={async event => { setSaving(true); await onSubmit(event); setSaving(false); }} className="my-6 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-black">Publish a vacancy</h2><p className="mt-1 text-xs text-slate-500">Create a new verified NFS job listing.</p></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100"><X className="h-4 w-4" /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field name="title" label="Job title" required /><Field name="companyName" label="Company name" required /><Field name="category" label="Category" required /><Field name="location" label="City / Location" required /><Field name="country" label="Country" required /><Field name="experienceLevel" label="Experience level" required /><Field name="salaryMin" label="Minimum salary" type="number" required /><Field name="salaryMax" label="Maximum salary" type="number" required /><Field name="currency" label="Currency" defaultValue="USD" required /><Field name="vacancies" label="Vacancies" type="number" defaultValue="1" required /><Field name="deadline" label="Deadline" type="date" required /><label className="text-xs font-bold">Job type<select name="jobType" className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Temporary</option></select></label><label className="sm:col-span-2 text-xs font-bold">Description<textarea name="description" required rows={4} className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500" /></label><label className="sm:col-span-2 flex items-center gap-2 text-xs font-bold"><input type="checkbox" name="urgentHiring" className="h-4 w-4 accent-orange-500" /> Mark as urgent hiring</label></div><button disabled={saving} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-black text-white disabled:opacity-60">{saving && <LoaderCircle className="h-4 w-4 animate-spin" />} Publish vacancy</button></form></div>;
}

function Field({ name, label, type = 'text', required, defaultValue }: { name: string; label: string; type?: string; required?: boolean; defaultValue?: string }) {
  return <label className="text-xs font-bold">{label}<input name={name} type={type} required={required} defaultValue={defaultValue} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-blue-500" /></label>;
}

function Access({ title, body, href, action }: { title: string; body: string; href: string; action: string }) {
  return <div className="grid min-h-[75vh] place-items-center px-4"><div className="max-w-md rounded-3xl border border-slate-200 bg-white p-9 text-center shadow-xl"><ShieldCheck className="mx-auto h-12 w-12 text-blue-600" /><h1 className="mt-5 text-2xl font-black">{title}</h1><p className="mt-3 text-sm leading-6 text-slate-500">{body}</p><Link href={href} className="mt-7 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white">{action}</Link></div></div>;
}
