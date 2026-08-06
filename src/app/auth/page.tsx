'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '@/lib/context/AuthContext';
import { useApp } from '@/lib/context/AppContext';

const WORLD_COUNTRIES = [
  { name: 'India', code: '+91' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Qatar', code: '+974' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Oman', code: '+968' },
  { name: 'Bahrain', code: '+973' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Germany', code: '+49' },
  { name: 'Afghanistan', code: '+93' },
  { name: 'Albania', code: '+355' },
  { name: 'Algeria', code: '+213' },
  { name: 'Andorra', code: '+376' },
  { name: 'Angola', code: '+244' },
  { name: 'Argentina', code: '+54' },
  { name: 'Armenia', code: '+374' },
  { name: 'Australia', code: '+61' },
  { name: 'Austria', code: '+43' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Bahamas', code: '+1-242' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Barbados', code: '+1-246' },
  { name: 'Belarus', code: '+375' },
  { name: 'Belgium', code: '+32' },
  { name: 'Belize', code: '+501' },
  { name: 'Benin', code: '+229' },
  { name: 'Bhutan', code: '+975' },
  { name: 'Bolivia', code: '+591' },
  { name: 'Bosnia and Herzegovina', code: '+387' },
  { name: 'Botswana', code: '+267' },
  { name: 'Brazil', code: '+55' },
  { name: 'Brunei', code: '+673' },
  { name: 'Bulgaria', code: '+359' },
  { name: 'Burkina Faso', code: '+226' },
  { name: 'Burundi', code: '+257' },
  { name: 'Cambodia', code: '+855' },
  { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' },
  { name: 'Cape Verde', code: '+238' },
  { name: 'Central African Republic', code: '+236' },
  { name: 'Chad', code: '+235' },
  { name: 'Chile', code: '+56' },
  { name: 'China', code: '+86' },
  { name: 'Colombia', code: '+57' },
  { name: 'Comoros', code: '+269' },
  { name: 'Congo', code: '+242' },
  { name: 'Costa Rica', code: '+506' },
  { name: 'Croatia', code: '+385' },
  { name: 'Cuba', code: '+53' },
  { name: 'Cyprus', code: '+357' },
  { name: 'Czech Republic', code: '+420' },
  { name: 'Denmark', code: '+45' },
  { name: 'Djibouti', code: '+253' },
  { name: 'Dominica', code: '+1-767' },
  { name: 'Dominican Republic', code: '+1-809' },
  { name: 'Ecuador', code: '+593' },
  { name: 'Egypt', code: '+20' },
  { name: 'El Salvador', code: '+503' },
  { name: 'Equatorial Guinea', code: '+240' },
  { name: 'Eritrea', code: '+291' },
  { name: 'Estonia', code: '+372' },
  { name: 'Eswatini', code: '+268' },
  { name: 'Ethiopia', code: '+251' },
  { name: 'Fiji', code: '+679' },
  { name: 'Finland', code: '+358' },
  { name: 'France', code: '+33' },
  { name: 'Gabon', code: '+241' },
  { name: 'Gambia', code: '+220' },
  { name: 'Georgia', code: '+995' },
  { name: 'Ghana', code: '+233' },
  { name: 'Greece', code: '+30' },
  { name: 'Grenada', code: '+1-473' },
  { name: 'Guatemala', code: '+502' },
  { name: 'Guinea', code: '+224' },
  { name: 'Guyana', code: '+592' },
  { name: 'Haiti', code: '+509' },
  { name: 'Honduras', code: '+504' },
  { name: 'Hungary', code: '+36' },
  { name: 'Iceland', code: '+354' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Iran', code: '+98' },
  { name: 'Iraq', code: '+964' },
  { name: 'Ireland', code: '+353' },
  { name: 'Israel', code: '+972' },
  { name: 'Italy', code: '+39' },
  { name: 'Jamaica', code: '+1-876' },
  { name: 'Japan', code: '+81' },
  { name: 'Jordan', code: '+962' },
  { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' },
  { name: 'Kiribati', code: '+686' },
  { name: 'Korea, North', code: '+850' },
  { name: 'Korea, South', code: '+82' },
  { name: 'Kyrgyzstan', code: '+996' },
  { name: 'Laos', code: '+856' },
  { name: 'Latvia', code: '+371' },
  { name: 'Lebanon', code: '+961' },
  { name: 'Lesotho', code: '+266' },
  { name: 'Liberia', code: '+231' },
  { name: 'Libya', code: '+218' },
  { name: 'Liechtenstein', code: '+423' },
  { name: 'Lithuania', code: '+370' },
  { name: 'Luxembourg', code: '+352' },
  { name: 'Madagascar', code: '+261' },
  { name: 'Malawi', code: '+265' },
  { name: 'Malaysia', code: '+60' },
  { name: 'Maldives', code: '+960' },
  { name: 'Mali', code: '+223' },
  { name: 'Malta', code: '+356' },
  { name: 'Marshall Islands', code: '+692' },
  { name: 'Mauritania', code: '+222' },
  { name: 'Mauritius', code: '+230' },
  { name: 'Mexico', code: '+52' },
  { name: 'Micronesia', code: '+691' },
  { name: 'Moldova', code: '+373' },
  { name: 'Monaco', code: '+377' },
  { name: 'Mongolia', code: '+976' },
  { name: 'Montenegro', code: '+382' },
  { name: 'Morocco', code: '+212' },
  { name: 'Mozambique', code: '+258' },
  { name: 'Myanmar', code: '+95' },
  { name: 'Namibia', code: '+264' },
  { name: 'Nauru', code: '+674' },
  { name: 'Nepal', code: '+977' },
  { name: 'Netherlands', code: '+31' },
  { name: 'New Zealand', code: '+64' },
  { name: 'Nicaragua', code: '+505' },
  { name: 'Niger', code: '+227' },
  { name: 'Nigeria', code: '+234' },
  { name: 'North Macedonia', code: '+389' },
  { name: 'Norway', code: '+47' },
  { name: 'Pakistan', code: '+92' },
  { name: 'Palau', code: '+680' },
  { name: 'Palestine', code: '+970' },
  { name: 'Panama', code: '+507' },
  { name: 'Papua New Guinea', code: '+675' },
  { name: 'Paraguay', code: '+595' },
  { name: 'Peru', code: '+51' },
  { name: 'Philippines', code: '+63' },
  { name: 'Poland', code: '+48' },
  { name: 'Portugal', code: '+351' },
  { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' },
  { name: 'Rwanda', code: '+250' },
  { name: 'Saint Kitts and Nevis', code: '+1-869' },
  { name: 'Saint Lucia', code: '+1-758' },
  { name: 'Saint Vincent and the Grenadines', code: '+1-784' },
  { name: 'Samoa', code: '+685' },
  { name: 'San Marino', code: '+378' },
  { name: 'Sao Tome and Principe', code: '+239' },
  { name: 'Senegal', code: '+221' },
  { name: 'Serbia', code: '+381' },
  { name: 'Seychelles', code: '+248' },
  { name: 'Sierra Leone', code: '+232' },
  { name: 'Singapore', code: '+65' },
  { name: 'Slovakia', code: '+421' },
  { name: 'Slovenia', code: '+386' },
  { name: 'Solomon Islands', code: '+677' },
  { name: 'Somalia', code: '+252' },
  { name: 'South Africa', code: '+27' },
  { name: 'South Sudan', code: '+211' },
  { name: 'Spain', code: '+34' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Sudan', code: '+249' },
  { name: 'Suriname', code: '+597' },
  { name: 'Sweden', code: '+46' },
  { name: 'Switzerland', code: '+41' },
  { name: 'Syria', code: '+963' },
  { name: 'Taiwan', code: '+886' },
  { name: 'Tajikistan', code: '+992' },
  { name: 'Tanzania', code: '+255' },
  { name: 'Thailand', code: '+66' },
  { name: 'Timor-Leste', code: '+670' },
  { name: 'Togo', code: '+228' },
  { name: 'Tonga', code: '+676' },
  { name: 'Trinidad and Tobago', code: '+1-868' },
  { name: 'Tunisia', code: '+216' },
  { name: 'Turkey', code: '+90' },
  { name: 'Turkmenistan', code: '+993' },
  { name: 'Tuvalu', code: '+688' },
  { name: 'Uganda', code: '+256' },
  { name: 'Ukraine', code: '+380' },
  { name: 'Uruguay', code: '+598' },
  { name: 'Uzbekistan', code: '+998' },
  { name: 'Vanuatu', code: '+678' },
  { name: 'Vatican City', code: '+379' },
  { name: 'Venezuela', code: '+58' },
  { name: 'Vietnam', code: '+84' },
  { name: 'Yemen', code: '+967' },
  { name: 'Zambia', code: '+260' },
  { name: 'Zimbabwe', code: '+263' }
];

function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) return 'Authentication failed. Please try again.';

  const messages: Record<string, string> = {
    'auth/configuration-not-found': 'Sign-up is currently initializing. Please try again.',
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
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const { signIn, signUp } = useAuth();
  const { setCurrentUserRole } = useApp();
  const router = useRouter();

  const handleCountryChange = (countryName: string) => {
    const matched = WORLD_COUNTRIES.find(c => c.name === countryName);
    if (matched) {
      setSelectedCountryCode(matched.code);
    }
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const data = new FormData(event.currentTarget);
    try {
      if (mode === 'signin') {
        await signIn(String(data.get('email')), String(data.get('password')));
      } else {
        const role = (data.get('role') as 'professional' | 'company' | 'provider') || 'professional';
        await signUp(
          String(data.get('name')),
          String(data.get('email')),
          String(data.get('password')),
          role,
          String(data.get('country')),
          String(data.get('countryCode')),
          String(data.get('phone'))
        );
        setCurrentUserRole(role);
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
    <div className="fixed inset-0 z-[100] overflow-hidden bg-slate-900 p-2 text-slate-900 sm:p-6 lg:py-8">
      <div className="mx-auto grid h-full max-h-[calc(100dvh-1rem)] max-w-5xl overflow-hidden rounded-[1.75rem] border border-blue-200 bg-white shadow-[0_28px_90px_rgba(37,99,235,.2)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem] lg:max-h-[calc(100dvh-4rem)] lg:grid-cols-[.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 p-12 lg:flex lg:flex-col lg:justify-between border-r border-blue-700 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/images/nfs-hero-bg.png')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(30,58,138,.9)_0%,rgba(29,78,216,.85)_50%,rgba(15,23,42,.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(96,165,250,.25),transparent_40%)]" />
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[52px] border-white/10" />
          <Link href="/" className="relative inline-flex items-center gap-2 text-xs font-extrabold text-blue-100 hover:text-white transition-colors"><ArrowLeft className="h-4 w-4" /> Back to NFS</Link>
          <div className="relative">
            <BriefcaseBusiness className="mb-7 h-12 w-12 text-blue-300" />
            <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-white">Your next move starts here.</h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">Join a trusted network of logistics professionals, employers, and fleet partners.</p>
          </div>
          <p className="relative text-xs font-bold text-blue-200">Secure encrypted account access</p>
        </aside>
        <main className="flex flex-col overflow-y-auto p-0 text-slate-900 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block lg:p-12">
          <div className="relative min-h-40 overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 p-5 text-white lg:hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/nfs-hero-bg.png')" }} />
            <div className="relative flex h-full flex-col justify-between">
              <Link href="/" className="inline-flex w-fit items-center gap-2 text-[11px] font-extrabold text-white/90"><ArrowLeft className="h-3.5 w-3.5" /> Back to NFS</Link>
              <div className="mt-8">
                <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-blue-300"><BriefcaseBusiness className="h-4 w-4" /> NFS Careers</span>
                <h1 className="mt-2 text-3xl font-black leading-none tracking-tight">{mode === 'signin' ? 'Welcome back.' : 'Build your future.'}</h1>
                <p className="mt-2 text-[11px] text-blue-100">{mode === 'signin' ? 'Your logistics network is ready.' : 'One account. More opportunities.'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-8 lg:block lg:p-0">
          <div className="hidden lg:block">
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">NFS Account</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
            <p className="mt-2 text-sm text-slate-600">{mode === 'signin' ? 'Sign in to continue to your account.' : 'Choose your account type and get started.'}</p>
          </div>

          <div className="grid grid-cols-2 rounded-xl bg-slate-100 border border-slate-200 p-1 lg:mt-8">
            {(['signin', 'signup'] as const).map(item => (
              <button key={item} onClick={() => { setMode(item); setError(''); }} className={`rounded-lg py-2.5 text-xs font-extrabold transition ${mode === item ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                {item === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-5 space-y-3.5 lg:mt-7 lg:space-y-4">
            {mode === 'signup' && (
              <>
                <label className="block text-xs font-bold text-slate-700">Full name
                  <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-600 focus-within:bg-white"><UserRound className="h-4 w-4 text-slate-400" /><input name="name" required className="h-11 w-full bg-transparent text-slate-900 outline-none lg:h-12" placeholder="Your full name" /></span>
                </label>
                <label className="block text-xs font-bold text-slate-700">Account type
                  <select
                    name="role"
                    onChange={(e) => setCurrentUserRole(e.target.value as 'professional' | 'company' | 'provider')}
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none focus:border-blue-600 focus:bg-white lg:h-12"
                  >
                    <option value="professional">Job seeker / Professional</option>
                    <option value="company">Employer / Company</option>
                    <option value="provider">Fleet / Service provider</option>
                  </select>
                </label>
                <div className="grid grid-cols-[1fr_.7fr] gap-3">
                  <label className="block text-xs font-bold text-slate-700">Country
                    <select
                      name="country"
                      required
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none focus:border-blue-600 focus:bg-white lg:h-12"
                    >
                      <option value="">Choose country</option>
                      {WORLD_COUNTRIES.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-xs font-bold text-slate-700">Dial code
                    <select
                      name="countryCode"
                      required
                      value={selectedCountryCode}
                      onChange={(e) => setSelectedCountryCode(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none focus:border-blue-600 focus:bg-white lg:h-12"
                    >
                      {WORLD_COUNTRIES.map(c => (
                        <option key={`${c.name}-${c.code}`} value={c.code}>{c.code} ({c.name})</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="block text-xs font-bold text-slate-700">Mobile number
                  <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-600 focus-within:bg-white">
                    <input name="phone" type="tel" inputMode="numeric" pattern="[0-9]{6,15}" minLength={6} maxLength={15} required className="h-11 w-full bg-transparent text-slate-900 outline-none lg:h-12" placeholder="Enter mobile number" />
                  </span>
                </label>
              </>
            )}
            <label className="block text-xs font-bold text-slate-700">Email address
              <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-600 focus-within:bg-white"><Mail className="h-4 w-4 text-slate-400" /><input name="email" type="email" required className="h-11 w-full bg-transparent text-slate-900 outline-none lg:h-12" placeholder="name@company.com" /></span>
            </label>
            <label className="block text-xs font-bold text-slate-700">Password
              <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-600 focus-within:bg-white"><LockKeyhole className="h-4 w-4 text-slate-400" /><input name="password" type={showPassword ? 'text' : 'password'} minLength={6} required className="h-11 w-full bg-transparent text-slate-900 outline-none lg:h-12" placeholder="Minimum 6 characters" /><button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? <EyeOff className="h-4 w-4 text-slate-500" /> : <Eye className="h-4 w-4 text-slate-500" />}</button></span>
            </label>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-xs font-bold text-red-700 border border-red-200">{error}</p>}
            <button disabled={busy} className="btn-orange w-full py-3.5 text-sm font-black justify-center">
              {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in securely' : 'Create account'}
            </button>
          </form>

          <div className="mt-auto pt-6 lg:hidden">
            <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-slate-50 p-4">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-600/10" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.18em] text-blue-600">Trusted NFS network</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-700">Move your logistics career forward.</p>
                </div>
                <BriefcaseBusiness className="h-7 w-7 shrink-0 text-blue-600" />
              </div>
              <div className="relative mt-3 grid grid-cols-3 divide-x divide-slate-200 text-center">
                <div><strong className="block text-sm font-black text-slate-900">500+</strong><span className="text-[8px] font-bold text-slate-500">Vacancies</span></div>
                <div><strong className="block text-sm font-black text-slate-900">50K+</strong><span className="text-[8px] font-bold text-slate-500">Professionals</span></div>
                <div><strong className="block text-sm font-black text-slate-900">Secure</strong><span className="text-[8px] font-bold text-slate-500">Encrypted access</span></div>
              </div>
            </div>
            <p className="mt-3 text-center text-[9px] font-semibold text-slate-500">By continuing, you agree to the NFS account terms and privacy policy.</p>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
