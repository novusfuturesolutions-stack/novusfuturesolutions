'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '@/lib/context/AuthContext';

function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) return 'Authentication failed. Please try again.';

  const messages: Record<string, string> = {
    'auth/configuration-not-found': 'Email/password sign-up is not enabled in Firebase yet. Enable it in Firebase Console → Authentication → Sign-in method.',
    'auth/email-already-in-use': 'An account already exists with this email. Please sign in instead.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/weak-password': 'Use a stronger password with at least 6 characters.',
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network connection failed. Check your connection and try again.',
  };

  return messages[error.code] || 'We could not complete authentication. Please try again.';
}

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const data = new FormData(event.currentTarget);
    try {
      if (mode === 'signin') {
        await signIn(String(data.get('email')), String(data.get('password')));
      } else {
        await signUp(
          String(data.get('name')),
          String(data.get('email')),
          String(data.get('password')),
          data.get('role') as 'professional' | 'company' | 'provider',
          String(data.get('country')),
          String(data.get('countryCode')),
          String(data.get('phone'))
        );
      }
      const redirect = new URLSearchParams(window.location.search).get('redirect');
      router.push(redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[radial-gradient(circle_at_top,#173d8f_0%,#071126_42%,#020617_100%)] p-2 text-white sm:p-6 lg:py-8">
      <div className="mx-auto grid h-full max-h-[calc(100dvh-1rem)] max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-white shadow-[0_28px_90px_rgba(0,0,0,.45)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem] lg:max-h-[calc(100dvh-4rem)] lg:grid-cols-[.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-slate-950 p-12 lg:flex lg:flex-col lg:justify-between">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/nfs-hero-bg.png')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(5,20,54,.94)_0%,rgba(10,48,135,.84)_48%,rgba(5,15,35,.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(59,130,246,.35),transparent_34%)]" />
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[52px] border-white/10" />
          <Link href="/" className="relative inline-flex items-center gap-2 text-xs font-extrabold"><ArrowLeft className="h-4 w-4" /> Back to NFS</Link>
          <div className="relative">
            <BriefcaseBusiness className="mb-7 h-12 w-12 text-orange-300" />
            <h1 className="text-5xl font-black leading-[1.02] tracking-tight">Your next move starts here.</h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">Join a trusted network of logistics professionals, employers, and fleet partners.</p>
          </div>
          <p className="relative text-xs font-bold text-blue-200">Secure account access powered by Firebase</p>
        </aside>
        <main className="flex flex-col overflow-y-auto p-0 text-slate-950 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block lg:p-12">
          <div className="relative min-h-40 overflow-hidden bg-slate-950 p-5 text-white lg:hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/nfs-hero-bg.png')" }} />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,18,52,.95),rgba(20,82,210,.68))]" />
            <div className="relative flex h-full flex-col justify-between">
              <Link href="/" className="inline-flex w-fit items-center gap-2 text-[11px] font-extrabold text-white/85"><ArrowLeft className="h-3.5 w-3.5" /> Back to NFS</Link>
              <div className="mt-8">
                <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-orange-300"><BriefcaseBusiness className="h-4 w-4" /> NFS Careers</span>
                <h1 className="mt-2 text-3xl font-black leading-none tracking-tight">{mode === 'signin' ? 'Welcome back.' : 'Build your future.'}</h1>
                <p className="mt-2 text-[11px] text-blue-100">{mode === 'signin' ? 'Your logistics network is ready.' : 'One account. More opportunities.'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-8 lg:block lg:p-0">
          <div className="hidden lg:block">
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">NFS Account</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
            <p className="mt-2 text-sm text-slate-500">{mode === 'signin' ? 'Sign in to continue to your account.' : 'Choose your account type and get started.'}</p>
          </div>

          <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 lg:mt-8">
            {(['signin', 'signup'] as const).map(item => (
              <button key={item} onClick={() => { setMode(item); setError(''); }} className={`rounded-lg py-2.5 text-xs font-extrabold transition ${mode === item ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>
                {item === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-5 space-y-3.5 lg:mt-7 lg:space-y-4">
            {mode === 'signup' && (
              <>
                <label className="block text-xs font-bold text-slate-700">Full name
                  <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 focus-within:border-blue-500 focus-within:bg-white"><UserRound className="h-4 w-4 text-slate-400" /><input name="name" required className="h-11 w-full bg-transparent outline-none lg:h-12" placeholder="Your full name" /></span>
                </label>
                <label className="block text-xs font-bold text-slate-700">Account type
                  <select name="role" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-blue-500 lg:h-12">
                    <option value="professional">Job seeker / Professional</option>
                    <option value="company">Employer / Company</option>
                    <option value="provider">Fleet / Service provider</option>
                  </select>
                </label>
                <div className="grid grid-cols-[1fr_.7fr] gap-3">
                  <label className="block text-xs font-bold text-slate-700">Country
                    <select name="country" required className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-500 lg:h-12">
                      <option value="">Choose country</option>
                      <option value="India">India</option>
                      <option value="United Arab Emirates">UAE</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Oman">Oman</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </label>
                  <label className="block text-xs font-bold text-slate-700">Dial code
                    <select name="countryCode" required className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-500 lg:h-12">
                      <option value="+91">+91</option>
                      <option value="+971">+971</option>
                      <option value="+966">+966</option>
                      <option value="+974">+974</option>
                      <option value="+965">+965</option>
                      <option value="+968">+968</option>
                      <option value="+973">+973</option>
                      <option value="+44">+44</option>
                      <option value="+1">+1</option>
                      <option value="+49">+49</option>
                    </select>
                  </label>
                </div>
                <label className="block text-xs font-bold text-slate-700">Mobile number
                  <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 focus-within:border-blue-500 focus-within:bg-white">
                    <input name="phone" type="tel" inputMode="numeric" pattern="[0-9]{6,15}" minLength={6} maxLength={15} required className="h-11 w-full bg-transparent outline-none lg:h-12" placeholder="Enter mobile number" />
                  </span>
                </label>
              </>
            )}
            <label className="block text-xs font-bold text-slate-700">Email address
              <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 focus-within:border-blue-500 focus-within:bg-white"><Mail className="h-4 w-4 text-slate-400" /><input name="email" type="email" required className="h-11 w-full bg-transparent outline-none lg:h-12" placeholder="name@company.com" /></span>
            </label>
            <label className="block text-xs font-bold text-slate-700">Password
              <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 focus-within:border-blue-500 focus-within:bg-white"><LockKeyhole className="h-4 w-4 text-slate-400" /><input name="password" type={showPassword ? 'text' : 'password'} minLength={6} required className="h-11 w-full bg-transparent outline-none lg:h-12" placeholder="Minimum 6 characters" /><button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span>
            </label>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-xs font-bold text-red-700">{error}</p>}
            <button disabled={busy} className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 disabled:opacity-60">
              {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in securely' : 'Create account'}
            </button>
          </form>

          <div className="mt-auto pt-6 lg:hidden">
            <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-200/40" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.18em] text-blue-600">Trusted NFS network</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-700">Move your logistics career forward.</p>
                </div>
                <BriefcaseBusiness className="h-7 w-7 shrink-0 text-orange-500" />
              </div>
              <div className="relative mt-3 grid grid-cols-3 divide-x divide-blue-200 text-center">
                <div><strong className="block text-sm font-black text-slate-950">500+</strong><span className="text-[8px] font-bold text-slate-500">Vacancies</span></div>
                <div><strong className="block text-sm font-black text-slate-950">50K+</strong><span className="text-[8px] font-bold text-slate-500">Professionals</span></div>
                <div><strong className="block text-sm font-black text-slate-950">Secure</strong><span className="text-[8px] font-bold text-slate-500">Firebase access</span></div>
              </div>
            </div>
            <p className="mt-3 text-center text-[9px] font-semibold text-slate-400">By continuing, you agree to the NFS account terms and privacy policy.</p>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
