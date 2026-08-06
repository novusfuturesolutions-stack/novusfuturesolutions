import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context/AppContext';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { AuthProvider } from '@/lib/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Novus Future Solutions (NFS) | Universal Job Search & Global Recruitment Platform',
  description: 'Find verified vacancies or recruit top talent across Technology, Healthcare, Finance, Engineering, Sales, Logistics, and Executive Management with trusted global employers.',
  keywords: ['Novus Future Solutions', 'NFS', 'job portal', 'global recruitment', 'tech jobs', 'healthcare jobs', 'finance vacancies', 'engineering careers', 'executive staffing'],
  authors: [{ name: 'Novus Future Solutions (NFS)' }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white"
      >
        <AppProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 bg-slate-50">{children}</main>
            <Footer />
            <MobileBottomNav />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
