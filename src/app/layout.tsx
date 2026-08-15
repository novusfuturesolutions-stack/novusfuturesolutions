import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppProvider } from '@/lib/context/AppContext';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { AuthProvider } from '@/lib/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';

export const metadata: Metadata = {
  title: 'Jobs in Europe | Warehouse Jobs, Heavy Driver Jobs & English Speaking Jobs for Foreigners & Indians',
  description: 'Find verified Jobs in Europe, Warehouse jobs, Heavydriver jobs, and English speaking jobs in Europe. Full visa sponsorship for foreigners and Indian job seekers with trusted global employers.',
  keywords: [
    'Jobs in Europe',
    'Warehouse jobs',
    'Heavydriver jobs',
    'Heavy driver jobs',
    'English speaking jobs in Europe',
    'Jobs for indians',
    'Jobs for Indians in Europe',
    'Jobs for foreigners in Europe',
    'Europe jobs visa sponsorship',
    'Warehouse jobs in Germany',
    'Heavy driver jobs in Poland',
    'Novus Future Solutions',
    'NFS Recruitment'
  ],
  authors: [{ name: 'Novus Future Solutions (NFS)' }],
  openGraph: {
    title: 'Jobs in Europe | Warehouse, Heavy Driver & English Speaking Vacancies',
    description: 'Explore verified Jobs in Europe, Warehouse jobs, Heavydriver jobs, and English speaking roles with visa sponsorship for foreigners and Indians.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Novus Future Solutions (NFS)'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Europe | Warehouse & Heavy Driver Jobs for Foreigners',
    description: 'Verified English speaking jobs in Europe, warehouse roles, and heavy driver vacancies for Indians and international job seekers.'
  },
  icons: {
    icon: '/images/favicon-96x96.png',
    shortcut: '/images/favicon-96x96.png',
    apple: '/images/favicon-96x96.png'
  }
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Novus Future Solutions (NFS)',
  url: 'https://novusfuturesolutions.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://novusfuturesolutions.com/jobs?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Novus Future Solutions (NFS)',
  url: 'https://novusfuturesolutions.com',
  logo: 'https://novusfuturesolutions.com/images/nfs-logo.png',
  description: 'Global recruitment platform providing verified Jobs in Europe, Warehouse jobs, Heavy driver jobs, and English speaking opportunities for foreigners and Indians.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png" />
        <link rel="shortcut icon" href="/images/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/images/favicon-96x96.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BR9KLFT7F3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BR9KLFT7F3');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white"
      >
        <LoadingScreen />
        <AppProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 bg-slate-50">{children}</main>
            <Footer />
            <MobileBottomNav />
            <WhatsAppWidget />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
