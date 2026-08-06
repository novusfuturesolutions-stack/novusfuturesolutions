'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
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
  Layers,
  Trash2,
  Pencil,
  Building2,
  ExternalLink,
  Globe
} from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/lib/context/AuthContext';
import { useApp } from '@/lib/context/AppContext';

type Section = 'overview' | 'jobs' | 'categories' | 'companies' | 'applications' | 'inquiries' | 'users';
type AdminRecord = DocumentData & { id: string };

const collections = ['users', 'jobs', 'categories', 'companies', 'applications', 'contact_inquiries'] as const;

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const { categories, addCategory, deleteCategory } = useApp();
  const [section, setSection] = useState<Section>('overview');
  const [records, setRecords] = useState<Record<string, AdminRecord[]>>({});
  const [fetching, setFetching] = useState(false);

  // Form & Edit Modal States
  const [showJobForm, setShowJobForm] = useState(false);
  const [defaultJobCategory, setDefaultJobCategory] = useState<string | undefined>(undefined);
  const [editingJob, setEditingJob] = useState<AdminRecord | null>(null);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<AdminRecord | null>(null);

  const [editingUser, setEditingUser] = useState<AdminRecord | null>(null);

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
    void loadData();
  }, [loadData]);

  if (loading) return <div className="grid min-h-[70vh] place-items-center text-sm font-bold text-slate-500">Checking secure access…</div>;
  if (!user) return <Access title="Sign in required" body="You must sign in with an administrator account to continue." href="/auth" action="Go to sign in" />;
  if (!isAdmin) notFound();

  const cards = [
    { key: 'users', label: 'Registered users', icon: Users, section: 'users' as Section },
    { key: 'jobs', label: 'Job listings', icon: Briefcase, section: 'jobs' as Section },
    { key: 'categories', label: 'Hiring Sectors', icon: Layers, count: categories.length, section: 'categories' as Section },
    { key: 'companies', label: 'Corporate Partners', icon: Building2, section: 'companies' as Section },
    { key: 'applications', label: 'Applications', icon: FileText, section: 'applications' as Section },
    { key: 'contact_inquiries', label: 'Contact inquiries', icon: Inbox, section: 'inquiries' as Section },
  ];

  const nav = [
    { id: 'overview' as Section, label: 'Overview', icon: LayoutDashboard },
    { id: 'jobs' as Section, label: 'Jobs / Vacancies', icon: Briefcase },
    { id: 'categories' as Section, label: 'Categories & Sectors', icon: Layers },
    { id: 'companies' as Section, label: 'Employer Partners', icon: Building2 },
    { id: 'applications' as Section, label: 'Applications', icon: FileText },
    { id: 'inquiries' as Section, label: 'Inquiries', icon: Inbox },
    { id: 'users' as Section, label: 'Users', icon: Users },
  ];

  // JOB CRUD Handlers
  async function saveJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let finalCategory = String(data.get('category'));
    const customCategory = String(data.get('customCategory') || '').trim();

    if (finalCategory === '__NEW_CATEGORY__' && customCategory) {
      finalCategory = customCategory;
      await addCategory(customCategory, `Vacancies and works in ${customCategory}`, 'Briefcase');
    }

    const imageFile = data.get('imageFile');
    let imageUrl = editingJob?.imageUrl || '';
    if (imageFile instanceof File && imageFile.size > 0) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(imageFile.type)) {
        throw new Error('Job card image must be a JPG, PNG, or WebP file.');
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error('Job card image must be 5 MB or smaller.');
      }
      const extension = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
      const imageRef = ref(storage, `job-images/${Date.now()}-${crypto.randomUUID()}.${extension}`);
      await uploadBytes(imageRef, imageFile, { contentType: imageFile.type });
      imageUrl = await getDownloadURL(imageRef);
    }

    const jobPayload = {
      title: data.get('title'),
      companyName: data.get('companyName'),
      companyWebsite: data.get('companyWebsite'),
      companyId: 'nfs-admin',
      companyLogo: data.get('companyLogo') || '/images/nfs-logo.png',
      imageUrl,
      category: finalCategory,
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
      urgentHiring: data.get('urgentHiring') === 'on',
      status: data.get('status') || 'active',
    };

    if (editingJob) {
      await updateDoc(doc(db, 'jobs', editingJob.id), {
        ...jobPayload,
        updatedAt: serverTimestamp(),
      });
      setNotice(`Job vacancy "${editingJob.title}" updated successfully.`);
      setEditingJob(null);
    } else {
      await addDoc(collection(db, 'jobs'), {
        ...jobPayload,
        responsibilities: [],
        requirements: [],
        requiredSkills: [],
        requiredLicenses: [],
        benefits: [],
        visaSponsorship: false,
        accommodationProvided: false,
        foodAllowance: false,
        verifiedCompany: true,
        postedAt: new Date().toISOString(),
        applicantsCount: 0,
        createdAt: serverTimestamp(),
      });
      setNotice('New vacancy published successfully.');
      setShowJobForm(false);
    }
    await loadData();
  }

  // CATEGORY CRUD Handlers
  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim();
    const description = String(data.get('description')).trim();
    const iconName = String(data.get('iconName') || 'Briefcase').trim();
    const imageUrl = String(data.get('imageUrl') || '').trim();

    if (!name) return;

    if (editingCategory) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await updateDoc(doc(db, 'categories', editingCategory.id), {
        name,
        slug,
        description,
        iconName,
        imageUrl,
        updatedAt: serverTimestamp(),
      });
      setNotice(`Category "${name}" updated successfully.`);
      setEditingCategory(null);
    } else {
      await addCategory(name, description, iconName, imageUrl);
      setNotice(`New sector "${name}" created successfully and published!`);
      setShowCategoryForm(false);
    }
  }

  // COMPANY CRUD Handlers
  async function saveCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const companyPayload = {
      name: data.get('name'),
      tagline: data.get('tagline'),
      industry: data.get('industry'),
      headquarters: data.get('headquarters'),
      companySize: data.get('companySize'),
      website: data.get('website'),
      logo: data.get('logo') || '/images/nfs-logo.png',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      description: data.get('description'),
      verified: true,
      activeJobsCount: 0
    };

    if (editingCompany) {
      await updateDoc(doc(db, 'companies', editingCompany.id), {
        ...companyPayload,
        updatedAt: serverTimestamp(),
      });
      setNotice(`Company profile "${editingCompany.name}" updated successfully.`);
      setEditingCompany(null);
    } else {
      await addDoc(collection(db, 'companies'), {
        ...companyPayload,
        createdAt: serverTimestamp(),
      });
      setNotice('New corporate partner added successfully.');
      setShowCompanyForm(false);
    }
    await loadData();
  }

  // USER CRUD Handlers
  async function saveUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingUser) return;
    const data = new FormData(event.currentTarget);
    await updateDoc(doc(db, 'users', editingUser.id), {
      name: data.get('name'),
      email: data.get('email'),
      role: data.get('role'),
      phone: data.get('phone'),
      country: data.get('country'),
      headline: data.get('headline'),
      updatedAt: serverTimestamp(),
    });
    setNotice(`User account "${editingUser.name || editingUser.email}" updated successfully.`);
    setEditingUser(null);
    await loadData();
  }

  // DELETE Handler for any collection
  async function deleteRecord(collectionName: string, id: string, title?: string) {
    if (!confirm(`Are you sure you want to delete this record (${title || id})?`)) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      setNotice(`Deleted successfully.`);
      await loadData();
    } catch (err: any) {
      console.error('Error deleting doc:', err);
      setNotice(`Error deleting doc: ${err.message}`);
    }
  }

  async function changeStatus(collectionName: string, id: string, status: string) {
    await updateDoc(doc(db, collectionName, id), { status });
    setNotice(`Status changed to ${status.replaceAll('_', ' ')}.`);
    await loadData();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 text-slate-900 md:-mt-20">
      <header className="border-b border-blue-200 bg-white text-slate-900 shadow-sm">
        <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><ShieldCheck className="h-5 w-5" /></span>
            <div><strong className="block text-sm text-slate-900">NFS Command</strong><span className="text-[10px] text-slate-500">Administrator workspace</span></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => void loadData()} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:border-blue-400" aria-label="Refresh data"><RefreshCw className={`h-4 w-4 ${fetching ? 'animate-spin' : ''}`} /></button>
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-2 text-xs font-black text-white shadow-sm"><ArrowLeft className="h-4 w-4" /> Website</Link>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1720px] mx-auto grid gap-6 px-4 py-6 sm:px-8 lg:px-12 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit rounded-2xl border border-blue-100 bg-white p-2 shadow-sm text-slate-900">
          <p className="px-3 pb-2 pt-3 text-[9px] font-black uppercase tracking-[.18em] text-blue-600">Management</p>
          <nav className="grid grid-cols-3 gap-1 sm:grid-cols-6 lg:grid-cols-1">
            {nav.map(item => {
              const Icon = item.icon;
              return <button key={item.id} onClick={() => setSection(item.id)} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${section === item.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'}`}><Icon className="h-4 w-4" /> <span className="truncate">{item.label}</span></button>;
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          {notice && <div className="mb-4 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs font-bold text-blue-700"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-600" /> {notice}</span><button onClick={() => setNotice('')}><X className="h-4 w-4" /></button></div>}

          {section === 'overview' && (
            <>
              <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 border border-blue-500/40 p-7 text-white shadow-xl">
                <span className="text-[10px] font-black uppercase tracking-[.18em] text-blue-200">Live operations</span>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl text-white">Good to see you, Admin.</h1>
                <p className="mt-3 text-xs text-blue-100">{user.email} · Add, edit, or delete categories, company providers, website URLs, and job vacancies per sector.</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-6">
                {cards.map(({ key, label, icon: Icon, section: target, count }) => (
                  <button onClick={() => setSection(target)} key={key} className="rounded-2xl border border-blue-100 bg-white p-5 text-left shadow-sm transition hover:border-blue-500 hover:shadow-md text-slate-900">
                    <span className="grid h-9 w-9 place-items-center rounded-lg text-blue-600 bg-blue-50 border border-blue-200"><Icon className="h-4 w-4 text-blue-600" /></span>
                    <p className="mt-5 text-3xl font-black text-slate-900">{count !== undefined ? count : (records[key]?.length ?? '—')}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {section === 'jobs' && (
            <Jobs
              records={records.jobs || []}
              onAdd={() => { setDefaultJobCategory(undefined); setShowJobForm(true); }}
              onEdit={(job) => setEditingJob(job)}
              onDelete={(id, title) => deleteRecord('jobs', id, title)}
              onStatus={changeStatus}
            />
          )}

          {section === 'categories' && (
            <CategoriesManager
              categories={categories}
              jobs={records.jobs || []}
              companies={records.companies || []}
              onAdd={() => setShowCategoryForm(true)}
              onEdit={(cat) => setEditingCategory(cat)}
              onDelete={(id) => deleteCategory(id)}
              onAddJobToCategory={(categoryName) => {
                setDefaultJobCategory(categoryName);
                setShowJobForm(true);
              }}
              onEditJob={(job) => setEditingJob(job)}
              onDeleteJob={(id, title) => deleteRecord('jobs', id, title)}
            />
          )}

          {section === 'companies' && (
            <CompaniesManager
              companies={records.companies || []}
              jobs={records.jobs || []}
              onAdd={() => setShowCompanyForm(true)}
              onEdit={(company) => setEditingCompany(company)}
              onDelete={(id, name) => deleteRecord('companies', id, name)}
            />
          )}

          {section === 'applications' && (
            <Applications
              records={records.applications || []}
              users={records.users || []}
              onDelete={(id, title) => deleteRecord('applications', id, title)}
              onStatus={changeStatus}
            />
          )}

          {section === 'inquiries' && (
            <Inquiries
              records={records.contact_inquiries || []}
              onDelete={(id, title) => deleteRecord('contact_inquiries', id, title)}
              onStatus={changeStatus}
            />
          )}

          {section === 'users' && (
            <UsersList
              records={records.users || []}
              onEdit={(usr) => setEditingUser(usr)}
              onDelete={(id, title) => deleteRecord('users', id, title)}
            />
          )}
        </main>
      </div>

      {/* MODALS */}
      {(showJobForm || editingJob) && (
        <JobForm
          job={editingJob}
          defaultCategory={defaultJobCategory}
          categories={categories}
          companies={records.companies || []}
          onClose={() => { setShowJobForm(false); setEditingJob(null); setDefaultJobCategory(undefined); }}
          onSubmit={saveJob}
        />
      )}

      {(showCategoryForm || editingCategory) && (
        <CategoryForm
          category={editingCategory}
          onClose={() => { setShowCategoryForm(false); setEditingCategory(null); }}
          onSubmit={saveCategory}
        />
      )}

      {(showCompanyForm || editingCompany) && (
        <CompanyForm
          company={editingCompany}
          categories={categories}
          onClose={() => { setShowCompanyForm(false); setEditingCompany(null); }}
          onSubmit={saveCompany}
        />
      )}

      {editingUser && (
        <UserEditForm
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={saveUser}
        />
      )}
    </div>
  );
}

function SectionTitle({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-4 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-black text-slate-900">{title}</h2><p className="mt-1 text-xs text-slate-500">{description}</p></div>{action}</div>;
}

// JOBS COMPONENT
function Jobs({ records, onAdd, onEdit, onDelete, onStatus }: { records: AdminRecord[]; onAdd: () => void; onEdit: (job: AdminRecord) => void; onDelete: (id: string, title?: string) => void; onStatus: (collection: string, id: string, status: string) => void }) {
  return (
    <>
      <SectionTitle
        title="Job Vacancies"
        description="Publish vacancies and control company providers, website URLs, and sector visibility."
        action={<button onClick={onAdd} className="btn-orange text-xs py-2.5 px-4"><Plus className="h-4 w-4" /> Add Vacancy</button>}
      />
      <RecordList empty="No job listings yet.">
        {records.map(item => {
          const websiteUrl = item.companyWebsite;
          return (
            <Record
              key={item.id}
              title={item.title || 'Untitled job'}
              subtitle={
                <>
                  Provided by:{' '}
                  {websiteUrl ? (
                    <a
                      href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-blue-600 hover:underline"
                    >
                      {item.companyName || 'NFS'} ↗
                    </a>
                  ) : (
                    <strong>{item.companyName || 'NFS'}</strong>
                  )}{' '}
                  · Sector: {item.category || 'General'} · Location: {item.location || 'Pending'} · {item.salaryMin ? `${item.currency || 'USD'} ${item.salaryMin.toLocaleString('en-US')}-${item.salaryMax.toLocaleString('en-US')}` : ''}
                </>
              }
              badge={item.status || 'active'}
              action={
                <div className="flex items-center gap-2">
                  <select value={item.status || 'active'} onChange={event => void onStatus('jobs', item.id, event.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 text-slate-900 p-2 text-[10px] font-bold">
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button onClick={() => onEdit(item)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-300" title="Edit Job">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onDelete(item.id, item.title)} className="p-2 rounded-lg text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-300" title="Delete Job">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              }
            />
          );
        })}
      </RecordList>
    </>
  );
}

// CATEGORIES & WORKS BREAKDOWN COMPONENT
function CategoriesManager({
  categories,
  jobs,
  companies,
  onAdd,
  onEdit,
  onDelete,
  onAddJobToCategory,
  onEditJob,
  onDeleteJob
}: {
  categories: any[];
  jobs: AdminRecord[];
  companies: AdminRecord[];
  onAdd: () => void;
  onEdit: (cat: any) => void;
  onDelete: (id: string) => void;
  onAddJobToCategory: (categoryName: string) => void;
  onEditJob: (job: AdminRecord) => void;
  onDeleteJob: (id: string, title?: string) => void;
}) {
  return (
    <>
      <SectionTitle
        title="Categories, Works & Company Providers"
        description="View vacancies inside each sector, see which corporate employer provides them, and add works directly."
        action={<button onClick={onAdd} className="btn-orange text-xs py-2.5 px-4"><Plus className="h-4 w-4" /> Add New Sector</button>}
      />
      <div className="space-y-6">
        {categories.map(cat => {
          const categoryJobs = jobs.filter(j => j.category === cat.name);
          return (
            <div key={cat.id} className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">Hiring Sector Category</span>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    {cat.name}
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                      {categoryJobs.length} {categoryJobs.length === 1 ? 'Vacancy Work' : 'Vacancy Works'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddJobToCategory(cat.name)}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Work to {cat.name}</span>
                  </button>
                  <button
                    onClick={() => onEdit(cat)}
                    className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors"
                    title="Edit Category"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(cat.id)}
                    className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* LIST OF WORKS INSIDE THIS CATEGORY */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Works &amp; Employers in {cat.name}:</p>
                {categoryJobs.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                    No active vacancy works created under <strong className="text-slate-800">{cat.name}</strong> yet.{' '}
                    <button onClick={() => onAddJobToCategory(cat.name)} className="text-blue-600 font-bold hover:underline">
                      Click here to add the first work!
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categoryJobs.map(job => {
                      const companyObj = companies.find(c => c.name === job.companyName);
                      const websiteUrl = job.companyWebsite || companyObj?.website;
                      return (
                        <div key={job.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                              <span>{job.title}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                job.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {job.status || 'active'}
                              </span>
                            </div>
                            <p className="text-blue-600 font-bold flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 inline shrink-0" />
                              <span>
                                Provided by:{' '}
                                {websiteUrl ? (
                                  <a
                                    href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline font-extrabold hover:text-blue-700"
                                    title={`Click to open ${job.companyName} website`}
                                  >
                                    {job.companyName || 'NFS Employer'} ↗
                                  </a>
                                ) : (
                                  <strong>{job.companyName || 'NFS Employer'}</strong>
                                )}
                              </span>
                            </p>
                            <p className="text-slate-500 flex items-center gap-2 text-[11px]">
                              <span>📍 {job.location || job.city}</span>
                              <span>•</span>
                              <span>💵 {job.currency || 'USD'} {job.salaryMin?.toLocaleString('en-US')} - {job.salaryMax?.toLocaleString('en-US')}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button onClick={() => onEditJob(job)} className="p-1.5 rounded-lg text-blue-600 hover:bg-white border border-slate-200" title="Edit Work">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => onDeleteJob(job.id, job.title)} className="p-1.5 rounded-lg text-red-600 hover:bg-white border border-slate-200" title="Delete Work">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </>
  );
}

// CORPORATE EMPLOYER PARTNERS COMPONENT
function CompaniesManager({ companies, jobs, onAdd, onEdit, onDelete }: { companies: AdminRecord[]; jobs: AdminRecord[]; onAdd: () => void; onEdit: (company: AdminRecord) => void; onDelete: (id: string, name?: string) => void }) {
  return (
    <>
      <SectionTitle
        title="Corporate Employers &amp; Hiring Partners"
        description="Manage company profiles providing job vacancies across all sectors."
        action={<button onClick={onAdd} className="btn-orange text-xs py-2.5 px-4"><Plus className="h-4 w-4" /> Add Employer Partner</button>}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map(comp => {
          const compJobs = jobs.filter(j => j.companyName === comp.name);
          const websiteUrl = comp.website;
          return (
            <div key={comp.id} className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={comp.logo || '/images/nfs-logo.png'} alt={comp.name} className="w-12 h-12 rounded-xl object-contain bg-slate-50 border border-slate-200 p-1 shrink-0" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1">
                      {websiteUrl ? (
                        <a
                          href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-extrabold hover:underline flex items-center gap-1"
                          title={`Click to open ${comp.name} website`}
                        >
                          {comp.name} ↗
                        </a>
                      ) : (
                        <span>{comp.name}</span>
                      )}
                      {comp.verified && <ShieldCheck className="w-4 h-4 text-blue-600 inline shrink-0" />}
                    </h3>
                    <p className="text-[11px] text-blue-600 font-bold">{comp.industry || 'Multi-Industry'}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{comp.description}</p>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>📍 {comp.headquarters || 'Global'}</span>
                  <span className="font-bold text-blue-600">{compJobs.length} Vacancies Provided</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                {websiteUrl ? (
                  <a
                    href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline"
                  >
                    <Globe className="w-3 h-3" /> Visit website
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-400">No website set</span>
                )}
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(comp)} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 border border-slate-200" title="Edit Company">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(comp.id, comp.name)} className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-slate-200" title="Delete Company">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// APPLICATIONS COMPONENT
function Applications({ records, users, onDelete, onStatus }: { records: AdminRecord[]; users: AdminRecord[]; onDelete: (id: string, title?: string) => void; onStatus: (collection: string, id: string, status: string) => void }) {
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
  return (
    <>
      <SectionTitle title="Candidate Applications" description="View candidate profiles, change selection status, or remove applications." />
      <RecordList empty="No applications received yet.">
        {liveRecords.map(item => (
          <Record
            key={item.id}
            title={item.applicantName || item.applicantEmail || 'Candidate'}
            onTitleClick={() => setSelected(item)}
            subtitle={`${item.jobTitle || 'Job application'} · ${item.applicantEmail || ''}${item.applicantPhone ? ` · ${item.applicantPhone}` : ''}${item.applicantCountry ? ` · ${item.applicantCountry}` : ''}`}
            detail={item.coverLetter || 'No cover note provided.'}
            badge={item.status || 'submitted'}
            action={
              <div className="flex items-center gap-2">
                <select value={item.status || 'submitted'} onChange={event => void onStatus('applications', item.id, event.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 text-slate-900 p-2 text-[10px] font-bold">
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview_scheduled">Interview</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button onClick={() => onDelete(item.id, item.applicantName || item.jobTitle)} className="p-2 rounded-lg text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-300" title="Delete Application">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            }
          />
        ))}
      </RecordList>
      {selected && <ApplicantModal applicant={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// INQUIRIES COMPONENT
function Inquiries({ records, onDelete, onStatus }: { records: AdminRecord[]; onDelete: (id: string, title?: string) => void; onStatus: (collection: string, id: string, status: string) => void }) {
  return (
    <>
      <SectionTitle title="Contact Inquiries" description="Track incoming employer requests and website support inquiries." />
      <RecordList empty="No inquiries received yet.">
        {records.map(item => (
          <Record
            key={item.id}
            title={item.fullName || 'Website visitor'}
            subtitle={`${item.email || ''} · ${item.division || 'General inquiry'}`}
            detail={item.details}
            badge={item.status || 'new'}
            action={
              <div className="flex items-center gap-2">
                <select value={item.status || 'new'} onChange={event => void onStatus('contact_inquiries', item.id, event.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 text-slate-900 p-2 text-[10px] font-bold">
                  <option value="new">New</option>
                  <option value="in_progress">In progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button onClick={() => onDelete(item.id, item.fullName)} className="p-2 rounded-lg text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-300" title="Delete Inquiry">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            }
          />
        ))}
      </RecordList>
    </>
  );
}

// USERS COMPONENT
function UsersList({ records, onEdit, onDelete }: { records: AdminRecord[]; onEdit: (user: AdminRecord) => void; onDelete: (id: string, name?: string) => void }) {
  return (
    <>
      <SectionTitle title="Registered User Accounts" description="Manage user identities, change system roles, or remove accounts." />
      <RecordList empty="No registered users yet.">
        {records.map(item => (
          <Record
            key={item.id}
            title={item.name || item.email || 'Unnamed user'}
            subtitle={`${item.email || item.id}${item.phone ? ` · ${item.phone}` : ''}${item.country ? ` · ${item.country}` : ''}`}
            badge={item.role || 'professional'}
            action={
              <div className="flex items-center gap-2">
                <button onClick={() => onEdit(item)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-300" title="Edit User">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => onDelete(item.id, item.name || item.email)} className="p-2 rounded-lg text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-300" title="Delete User">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            }
          />
        ))}
      </RecordList>
    </>
  );
}

function RecordList({ children, empty }: { children: React.ReactNode; empty: string }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm text-slate-900">{hasItems ? children : <p className="p-10 text-center text-xs font-bold text-slate-500">{empty}</p>}</div>;
}

function Record({ title, subtitle, detail, badge, action, onTitleClick }: { title: string; subtitle: React.ReactNode; detail?: string; badge: string; action?: React.ReactNode; onTitleClick?: () => void }) {
  return <article className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 last:border-0"><div className="min-w-0"><div className="flex items-center gap-2">{onTitleClick ? <button onClick={onTitleClick} className="truncate text-left text-sm font-black text-blue-600 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-700">{title}</button> : <h3 className="truncate text-sm font-black text-slate-900">{title}</h3>}<span className="shrink-0 rounded-full bg-blue-50 border border-blue-200 px-2 py-1 text-[8px] font-black uppercase text-blue-600">{badge.replaceAll('_', ' ')}</span></div><p className="mt-1 truncate text-[10px] text-slate-500">{subtitle}</p>{detail && <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-slate-600">{detail}</p>}</div>{action}</article>;
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
  return <div className="fixed inset-0 z-[130] grid place-items-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}><div className="my-6 w-full max-w-xl overflow-hidden rounded-3xl bg-white border border-blue-200 shadow-2xl text-slate-900"><div className="flex items-start justify-between bg-blue-600 p-6 text-white"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-lg font-black text-blue-700">{String(applicant.applicantName || applicant.applicantEmail || 'U').charAt(0).toUpperCase()}</span><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-blue-200">Candidate profile</p><h2 className="mt-1 text-2xl font-black text-white">{applicant.applicantName || 'Applicant'}</h2><p className="mt-1 text-[10px] text-blue-100">{applicant.applicantHeadline || 'Logistics professional'}</p></div></div><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"><X className="h-4 w-4" /></button></div><div className="p-6"><div className="grid gap-3 sm:grid-cols-2">{details.map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[8px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 break-words text-xs font-bold capitalize text-slate-900">{value}</p></div>)}</div><div className="mt-4 grid grid-cols-2 gap-3">{phone ? <a href={`https://wa.me/${phone}?text=${encodeURIComponent(contactMessage)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-black text-white shadow-md hover:bg-blue-700 transition"><MessageCircle className="h-4 w-4" /> WhatsApp</a> : <span className="inline-flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200 px-4 py-3 text-xs font-bold text-slate-400">No mobile number</span>}{email ? <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 border border-slate-300 px-4 py-3 text-xs font-black text-slate-800 transition hover:border-blue-500 hover:text-blue-600"><Mail className="h-4 w-4 text-blue-600" /> Send email</a> : <span className="inline-flex items-center justify-center rounded-xl bg-slate-100 border border-slate-200 px-4 py-3 text-xs font-bold text-slate-400">No email address</span>}</div><div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-[9px] font-black uppercase tracking-wider text-blue-600">Cover note</p><p className="mt-2 whitespace-pre-wrap text-xs leading-6 text-slate-700">{applicant.coverLetter || 'No cover note provided.'}</p></div>{answers.length > 0 && <div className="mt-4 space-y-2"><p className="text-[9px] font-black uppercase tracking-wider text-blue-600">Screening answers</p>{answers.map(([question, answer]) => <div key={question} className="rounded-xl bg-slate-50 border border-slate-200 p-3"><p className="text-[10px] font-black text-blue-600">{question}</p><p className="mt-1 text-xs text-slate-700">{answer}</p></div>)}</div>}</div></div></div>;
}

// CATEGORY ADD/EDIT FORM MODAL
function CategoryForm({ category, onClose, onSubmit }: { category?: any; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
      <form onSubmit={async event => { setSaving(true); await onSubmit(event); setSaving(false); }} className="my-6 w-full max-w-lg rounded-3xl bg-white border border-blue-200 p-6 shadow-2xl sm:p-8 text-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{category ? 'Edit Sector Category' : 'Add New Sector Category'}</h2>
            <p className="mt-1 text-xs text-slate-500">Publish or update sector filter pills and home page cards.</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900"><X className="h-4 w-4" /></button>
        </div>

        <Field name="name" label="Category / Sector Name" defaultValue={category?.name} required placeholder="e.g. Healthcare &amp; Medical..." />
        
        <label className="text-xs font-bold text-slate-700 block">
          Category Icon
          <select name="iconName" defaultValue={category?.iconName || 'Briefcase'} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none focus:border-blue-600">
            <option value="Briefcase">Briefcase (General)</option>
            <option value="Laptop">Laptop (Technology &amp; IT)</option>
            <option value="Stethoscope">Stethoscope (Healthcare &amp; Medical)</option>
            <option value="Coins">Coins (Finance &amp; Accounting)</option>
            <option value="Wrench">Wrench (Engineering &amp; Construction)</option>
            <option value="Truck">Truck (Logistics &amp; Transport)</option>
          </select>
        </label>

        <Field
          name="imageUrl"
          label="Category Background Image URL"
          type="url"
          defaultValue={category?.imageUrl}
          placeholder="https://example.com/sector-image.jpg"
        />

        <label className="text-xs font-bold text-slate-700 block">
          Description
          <textarea name="description" required defaultValue={category?.description} rows={3} placeholder="Brief subtext describing this sector..." className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none focus:border-blue-600" />
        </label>

        <button disabled={saving} className="mt-4 btn-orange w-full py-3.5 text-sm font-black justify-center disabled:opacity-60">
          {saving && <LoaderCircle className="h-4 w-4 animate-spin" />} {category ? 'Update Sector' : 'Save & Publish Sector'}
        </button>
      </form>
    </div>
  );
}

// COMPANY ADD/EDIT FORM MODAL
function CompanyForm({ company, categories, onClose, onSubmit }: { company?: AdminRecord | null; categories: any[]; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
      <form onSubmit={async event => { setSaving(true); await onSubmit(event); setSaving(false); }} className="my-6 w-full max-w-xl rounded-3xl bg-white border border-blue-200 p-6 shadow-2xl sm:p-8 text-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{company ? 'Edit Employer Partner' : 'Add Corporate Employer Partner'}</h2>
            <p className="mt-1 text-xs text-slate-500">Manage corporate profile, hiring partner branding, and company website URL.</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900"><X className="h-4 w-4" /></button>
        </div>

        <Field name="name" label="Company Name" defaultValue={company?.name} required placeholder="e.g. Siemens Tech, Apex Logistics, Trigads..." />
        <Field name="tagline" label="Company Tagline" defaultValue={company?.tagline} placeholder="e.g. Global Tech & Automation Leader" />
        <Field name="website" label="Company Website URL (Optional - Opens when clicked)" defaultValue={company?.website} placeholder="https://www.trigads.com (Optional)" />

        <label className="text-xs font-bold text-slate-700 block">
          Primary Industry / Sector
          <select name="industry" defaultValue={company?.industry || (categories[0]?.name || '')} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900">
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <Field name="headquarters" label="Headquarters Location" defaultValue={company?.headquarters} placeholder="Dubai, UAE" />
          <Field name="companySize" label="Company Size" defaultValue={company?.companySize} placeholder="500-1000 Employees" />
        </div>

        <Field name="logo" label="Logo Image URL" defaultValue={company?.logo} placeholder="https://..." />
        
        <label className="text-xs font-bold text-slate-700 block">
          Company Description
          <textarea name="description" required defaultValue={company?.description} rows={3} placeholder="Tell candidates about this company's hiring goals..." className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none focus:border-blue-600" />
        </label>

        <button disabled={saving} className="mt-4 btn-orange w-full py-3.5 text-sm font-black justify-center disabled:opacity-60">
          {saving && <LoaderCircle className="h-4 w-4 animate-spin" />} {company ? 'Update Employer Profile' : 'Add Corporate Partner'}
        </button>
      </form>
    </div>
  );
}

// JOB ADD/EDIT FORM MODAL
function JobForm({ job, defaultCategory, categories, companies, onClose, onSubmit }: { job?: AdminRecord | null; defaultCategory?: string; categories: any[]; companies: AdminRecord[]; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  const [companyQuery, setCompanyQuery] = useState(job?.companyName || (companies[0]?.name || 'trigads'));
  const [companyWebsite, setCompanyWebsite] = useState(job?.companyWebsite || '');
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>(job?.category || defaultCategory || (categories[0]?.name || ''));
  const [customCategoryInput, setCustomCategoryInput] = useState<string>('');

  const companyOptions = [
    ...companies.map(c => ({ name: c.name, website: c.website, logo: c.logo })),
    { name: 'trigads', website: 'https://www.trigads.com', logo: '/images/nfs-logo.png' },
    { name: 'Siemens Tech', website: 'https://www.siemens.com', logo: '/images/nfs-logo.png' },
    { name: 'Apex Logistics', website: 'https://www.apexlogistics.com', logo: '/images/nfs-logo.png' },
    { name: 'Novus Future Solutions (Direct)', website: 'https://novusfuturesolutions.com', logo: '/images/nfs-logo.png' }
  ];

  // Unique companies list by name
  const uniqueCompanies = Array.from(new Set(companyOptions.map(c => c.name)))
    .map(name => companyOptions.find(c => c.name === name)!);

  const filteredCompanySuggestions = uniqueCompanies.filter(c =>
    c.name.toLowerCase().includes(companyQuery.toLowerCase())
  );

  const handleSelectCompany = (comp: { name: string; website?: string }) => {
    setCompanyQuery(comp.name);
    if (comp.website && !companyWebsite) {
      setCompanyWebsite(comp.website);
    }
    setShowCompanySuggestions(false);
  };

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
      <form onSubmit={async event => { setSaving(true); try { await onSubmit(event); } finally { setSaving(false); } }} className="my-6 w-full max-w-2xl rounded-3xl bg-white border border-blue-200 p-6 shadow-2xl sm:p-8 text-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{job ? 'Edit Vacancy Work' : 'Publish Vacancy Work'}</h2>
            <p className="mt-1 text-xs text-slate-500">{job ? `Modifying job listing details for ${job.title}` : 'Create a new verified job vacancy work.'}</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field name="title" label="Job / Work Title" defaultValue={job?.title} placeholder="e.g. Senior Full-Stack Engineer, CDL Heavy Driver..." required />
          
          {/* Searchable Combobox for Company Provider */}
          <div className="relative">
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Company Provider (Type or Select Suggestion)
            </label>
            <div className="relative">
              <input
                name="companyName"
                type="text"
                required
                value={companyQuery}
                onChange={e => {
                  setCompanyQuery(e.target.value);
                  setShowCompanySuggestions(true);
                }}
                onFocus={() => setShowCompanySuggestions(true)}
                onBlur={() => setTimeout(() => setShowCompanySuggestions(false), 200)}
                placeholder="Type company name (e.g. trigads, Siemens)..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pr-8 text-xs font-bold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
              />
              <Building2 className="w-4 h-4 text-blue-600 absolute right-3 top-3.5 pointer-events-none" />
            </div>

            {showCompanySuggestions && (
              <div className="absolute left-0 right-0 top-full mt-1 z-[999] rounded-2xl border border-blue-200 bg-white p-1.5 shadow-2xl overflow-hidden max-h-52 overflow-y-auto">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Matching Partner Companies ({filteredCompanySuggestions.length})
                </div>
                {filteredCompanySuggestions.length === 0 ? (
                  <div className="p-3 text-xs text-slate-600 font-medium">
                    Use custom company name: &quot;<strong className="text-blue-600">{companyQuery}</strong>&quot;
                  </div>
                ) : (
                  filteredCompanySuggestions.map((comp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onMouseDown={() => handleSelectCompany(comp)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between text-xs group"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-extrabold text-slate-900 group-hover:text-blue-600">{comp.name}</span>
                      </div>
                      {comp.website && <span className="text-[10px] text-blue-600 font-bold">↗ Auto Website</span>}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <Field
            name="companyWebsite"
            label="Company Website URL (Optional)"
            defaultValue={companyWebsite || job?.companyWebsite}
            placeholder="https://www.trigads.com (Optional)"
          />

          <label className="sm:col-span-2 block text-xs font-bold text-slate-700">
            Job Card Background Image
            <input
              name="imageFile"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="mt-2 block w-full rounded-xl border border-dashed border-blue-300 bg-blue-50/50 p-3 text-xs text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-blue-700"
            />
            <span className="mt-1.5 block text-[10px] font-medium text-slate-500">
              JPG, PNG, or WebP up to 5 MB. Recommended landscape size: 1200 x 700.
            </span>
            {job?.imageUrl && (
              <span className="mt-3 block overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <img src={job.imageUrl} alt="Current job card background" className="h-28 w-full object-cover" />
              </span>
            )}
          </label>

          <div>
            <label className="text-xs font-bold text-slate-700 block">
              Category / Sector
              <select
                name="category"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                required
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 font-bold focus:border-blue-600 focus:bg-white transition-all"
              >
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                <option value="__NEW_CATEGORY__">+ Add New Category / Sector...</option>
              </select>
            </label>

            {selectedCategory === '__NEW_CATEGORY__' && (
              <div className="mt-2 space-y-1">
                <input
                  name="customCategory"
                  type="text"
                  required
                  value={customCategoryInput}
                  onChange={e => setCustomCategoryInput(e.target.value)}
                  placeholder="Type new category name (e.g. Education, Hospitality)..."
                  className="h-11 w-full rounded-xl border border-blue-400 bg-blue-50/40 px-3 text-xs font-extrabold text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
                <p className="text-[10px] text-blue-600 font-bold">✨ This new category will be created and published to the website automatically!</p>
              </div>
            )}
          </div>

          <Field name="location" label="City / Location" defaultValue={job?.location || job?.city} placeholder="Dubai, UAE" required />
          <Field name="country" label="Country" defaultValue={job?.country} placeholder="United Arab Emirates" required />
          <Field name="experienceLevel" label="Experience level" defaultValue={job?.experienceLevel || 'Mid Level'} required />
          <Field name="salaryMin" label="Minimum salary" type="number" defaultValue={job?.salaryMin} required />
          <Field name="salaryMax" label="Maximum salary" type="number" defaultValue={job?.salaryMax} required />
          <Field name="currency" label="Currency" defaultValue={job?.currency || 'USD'} required />
          <Field name="vacancies" label="Vacancies" type="number" defaultValue={job?.vacancies || 1} required />
          <Field name="deadline" label="Deadline" type="date" defaultValue={job?.deadline} required />
          <label className="text-xs font-bold text-slate-700">
            Employment type
            <select name="jobType" defaultValue={job?.jobType || 'Full-time'} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
          </label>
          <label className="text-xs font-bold text-slate-700">
            Status
            <select name="status" defaultValue={job?.status || 'active'} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900">
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
          </label>
          <label className="sm:col-span-2 text-xs font-bold text-slate-700">
            Work Description
            <textarea name="description" required defaultValue={job?.description} rows={4} placeholder="Describe responsibilities, credentials required..." className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none focus:border-blue-600" />
          </label>
          <label className="sm:col-span-2 flex items-center gap-2 text-xs font-bold text-slate-700">
            <input type="checkbox" name="urgentHiring" defaultChecked={job?.urgentHiring} className="h-4 w-4 accent-blue-600" /> Mark as urgent hiring
          </label>
        </div>
        <button disabled={saving} className="mt-6 btn-orange w-full py-3.5 text-sm font-black justify-center disabled:opacity-60">
          {saving && <LoaderCircle className="h-4 w-4 animate-spin" />} {job ? 'Save Work Changes' : 'Publish Vacancy Work'}
        </button>
      </form>
    </div>
  );
}

// USER EDIT FORM MODAL
function UserEditForm({ user, onClose, onSubmit }: { user: AdminRecord; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
      <form onSubmit={async event => { setSaving(true); await onSubmit(event); setSaving(false); }} className="my-6 w-full max-w-lg rounded-3xl bg-white border border-blue-200 p-6 shadow-2xl sm:p-8 text-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Edit User Account</h2>
            <p className="mt-1 text-xs text-slate-500">Update account role, contact details, or profile information.</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900"><X className="h-4 w-4" /></button>
        </div>

        <Field name="name" label="Full Name" defaultValue={user.name} required />
        <Field name="email" label="Email Address" defaultValue={user.email} required />
        <label className="text-xs font-bold text-slate-700 block">
          Platform Role
          <select name="role" defaultValue={user.role || 'professional'} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 font-bold">
            <option value="professional">Professional / Candidate</option>
            <option value="company">Company / Employer</option>
            <option value="admin">Administrator</option>
          </select>
        </label>
        <Field name="phone" label="Phone Number" defaultValue={user.phone} />
        <Field name="country" label="Country" defaultValue={user.country} />
        <Field name="headline" label="Headline / Title" defaultValue={user.headline} />

        <button disabled={saving} className="mt-4 btn-orange w-full py-3.5 text-sm font-black justify-center disabled:opacity-60">
          {saving && <LoaderCircle className="h-4 w-4 animate-spin" />} Save Account Updates
        </button>
      </form>
    </div>
  );
}

function Field({ name, label, type = 'text', required, defaultValue, placeholder }: { name: string; label: string; type?: string; required?: boolean; defaultValue?: string; placeholder?: string }) {
  return <label className="text-xs font-bold text-slate-700 block">{label}<input name={name} type={type} required={required} defaultValue={defaultValue} placeholder={placeholder} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none focus:border-blue-600" /></label>;
}

function Access({ title, body, href, action }: { title: string; body: string; href: string; action: string }) {
  return <div className="grid min-h-[75vh] place-items-center px-4"><div className="max-w-md rounded-3xl border border-blue-200 bg-white p-9 text-center shadow-2xl text-slate-900"><ShieldCheck className="mx-auto h-12 w-12 text-blue-600" /><h1 className="mt-5 text-2xl font-black text-slate-900">{title}</h1><p className="mt-3 text-sm leading-6 text-slate-600">{body}</p><Link href={href} className="mt-7 inline-flex rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-xs font-black text-white">{action}</Link></div></div>;
}
