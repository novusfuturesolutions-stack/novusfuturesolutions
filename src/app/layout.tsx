import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/context/AppContext';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { AuthProvider } from '@/lib/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: 'Novus Future Solutions (NFS) | Logistics, Driver Vacancies & Business Advisory',
  description: 'Find driver, transport, warehouse, and logistics jobs with trusted employers. NFS connects skilled logistics professionals with top opportunities and advisory services.',
  keywords: ['Novus Future Solutions', 'NFS', 'logistics jobs', 'driver jobs', 'truck driver vacancies', 'warehouse jobs', 'transport recruitment', 'staffing placement', 'freight logistics'],
  authors: [{ name: 'Novus Future Solutions (NFS)' }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body
        suppressHydrationWarning
        className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white"
      >
        <AppProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 pt-[4.4rem] md:pt-20">{children}</main>
            <Footer />
            <MobileBottomNav />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
