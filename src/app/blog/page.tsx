'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  Share2,
  Bookmark,
  CheckCircle2,
  TrendingUp,
  Globe,
  Tag,
  Briefcase,
  ChevronRight,
  X,
  Send,
  LoaderCircle
} from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  tags?: string[];
}

const DEFAULT_BLOGS: BlogArticle[] = [
  {
    id: '1',
    title: 'Complete 2026 Guide to EU Blue Card & Skilled Worker Visa Sponsorship in Germany',
    slug: 'eu-blue-card-germany-2026-guide',
    category: 'Visa & Immigration',
    excerpt: 'Key salary thresholds, degree verification steps, and visa acceleration updates for IT, Engineering, and Healthcare professionals moving to Germany in 2026.',
    content: `
Germany remains one of the most attractive destinations for skilled international talent across Europe. With the updated 2026 Skilled Immigration Act (Fachkräfteeinwanderungsgesetz), securing an EU Blue Card has become faster and more streamlined than ever.

### Key Salary & Degree Requirements for 2026

1. **STEM & Bottleneck Professions** (Software Engineers, IT Managers, Doctors, Civil Engineers):
   - Minimum Annual Gross Salary: €41,040
   - Recognized University Degree (or 3+ years verifiable IT professional experience).

2. **Standard Non-Bottleneck Professions**:
   - Minimum Annual Gross Salary: €45,300

3. **Fast-Track Work Permit Processing**:
   Employers verified under the Federal Employment Agency (Bundesagentur für Arbeit) can now sponsor candidates in under 6 weeks with pre-approval certificates (Vorabzustimmung).

### Step-by-Step Application Checklist
- Step 1: Secure a job offer from an EU-verified corporate employer (browse verified vacancies on NFS).
- Step 2: Obtain ANABIN / ZAB degree recognition statement.
- Step 3: Schedule your embassy appointment with pre-approval documents.
- Step 4: Relocate to Germany with full relocation & accommodation support.
    `,
    author: 'Elena Rostova',
    authorRole: 'Global Mobility & Immigration Specialist',
    publishedAt: 'Feb 4, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tags: ['Germany', 'EU Blue Card', 'Visa Sponsorship', 'Global Mobility']
  },
  {
    id: '2',
    title: 'Top 10 High-Demand Logistics & Heavy Truck Driving Careers in Europe & GCC',
    slug: 'high-demand-logistics-truck-driving-careers-2026',
    category: 'Global Recruitment',
    excerpt: 'Discover why Category CE Drivers with Code 95 certificates are receiving tax-free perks, free accommodation, and high monthly salaries across Western Europe.',
    content: `
Commercial freight transport and international supply chains are experiencing unprecedented demand across Europe (Lithuania, Germany, Netherlands) and the GCC region.

### Why Logistics Drivers are in High Demand
- **CE Driver & Code 95 Licensing**: Certified drivers with digital tachograph experience command base monthly salaries ranging from €2,800 to €3,800 + daily meal stipends.
- **Corporate Perks**: Tier-1 logistics providers listed on NFS offer employer-funded housing, return flights, and full legal residency visa sponsorship.

### Essential Qualifications Required:
1. Valid Category CE Commercial Driver License.
2. Code 95 Professional Qualification Certificate.
3. Clean driving history & basic English or German language skills.
    `,
    author: 'Marcus Vance',
    authorRole: 'Head of Industrial & Supply Chain Staffing',
    publishedAt: 'Jan 28, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tags: ['Logistics', 'Code 95', 'CE Driver', 'Europe Jobs']
  },
  {
    id: '3',
    title: 'How AI & Vector Search are Transforming Tech Recruitment in 2026',
    slug: 'ai-vector-search-tech-recruitment-2026',
    category: 'Workforce Tech',
    excerpt: 'Explore how automated candidate matching algorithms shorten hiring cycles from weeks to 48 hours for corporate employers worldwide.',
    content: `
Modern corporate hiring is shifting from passive resume scanning to active semantic matching powered by AI vector embeddings.

### Key Benefits for Corporate Employers
- **Precision Matching**: Algorithms score candidate profiles based on practical skill alignment rather than keyword stuffing.
- **Reduced Time-to-Hire**: Verified candidates receive targeted vacancy recommendations within seconds of registration.
- **Fairness & Bias Reduction**: Automated evaluation prioritizes verified qualifications and certified experience.
    `,
    author: 'Dr. Aris Thorne',
    authorRole: 'Chief Technology Officer at NFS',
    publishedAt: 'Jan 15, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tags: ['AI Tech', 'Recruitment', 'Future of Work', 'Vector Search']
  },
  {
    id: '4',
    title: '5 Steps to Ace Your International Corporate Interview & Negotiate Relocation Perks',
    slug: 'ace-international-interview-negotiate-relocation-perks',
    category: 'Career Advice',
    excerpt: 'Proven tactics for candidates interviewing with overseas corporate employers—from handling technical assessments to securing housing allowances.',
    content: `
Landing a job with an international corporate employer requires distinct preparation compared to local hires.

### 1. Highlight Cross-Cultural Adaptability
Corporate hiring managers want to know that you can adjust seamlessly to new working environments and regulatory standards.

### 2. Request Clear Relocation Support Terms
When negotiating your job offer, ensure the contract explicitly specifies:
- Visa processing fee reimbursement.
- Initial 30 to 60 days of temporary company-sponsored accommodation.
- Family health insurance coverage.
    `,
    author: 'Sarah Jenkins',
    authorRole: 'Executive Career Coach',
    publishedAt: 'Jan 10, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tags: ['Interview Tips', 'Career Growth', 'Relocation', 'Salary Negotiation']
  },
  {
    id: '5',
    title: 'Healthcare Staffing Trends 2026: Fast-Tracking Specialist Nurses to EU Hospitals',
    slug: 'healthcare-staffing-trends-fast-track-nurses-eu-2026',
    category: 'Employer Guides',
    excerpt: 'An overview of hospital staffing programs across Germany, Austria, and Switzerland aimed at recruiting registered ICU & clinical specialist nurses.',
    content: `
Healthcare systems across Western Europe face expanding shortages in critical care, ICU, and clinical supervisory personnel.

### Simplified Homologation Programs
EU medical boards have launched accelerated credential equivalence checks (Anerkennungsverfahren) that allow qualified BSN nurses to start working under clinical supervision while completing language fluency certifications.
    `,
    author: 'Dr. Michael Stern',
    authorRole: 'Healthcare Talent Director',
    publishedAt: 'Jan 02, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tags: ['Healthcare', 'Nursing', 'Germany Jobs', 'Medical Staffing']
  }
];

const CATEGORIES = [
  'All Articles',
  'Visa & Immigration',
  'Global Recruitment',
  'Workforce Tech',
  'Career Advice',
  'Employer Guides'
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  // Fetch blogs ONLY created by Admin in Firestore
  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const list: BlogArticle[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || 'Untitled Article',
              slug: data.slug || doc.id,
              category: data.category || 'Insights',
              excerpt: data.excerpt || '',
              content: data.content || '',
              author: data.author || 'NFS Editorial Team',
              authorRole: data.authorRole || 'Global Recruitment Insights',
              publishedAt: data.publishedAt || '2026',
              readTime: data.readTime || '5 min read',
              imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80',
              featured: data.featured || false,
              tags: data.tags || []
            };
          });
          setBlogs(list);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error('Error fetching admin blog articles:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  // Filter logic
  const filteredBlogs = blogs.filter(article => {
    const matchesCategory = selectedCategory === 'All Articles' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = blogs.find(b => b.featured) || blogs[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribeSuccess(true);
      setTimeout(() => setSubscribeSuccess(false), 5000);
      setSubscribedEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900/50">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-full max-w-6xl rounded-full bg-blue-600/20 blur-[120px]" />
        
        <div className="relative mx-auto max-w-5xl text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-black uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>NFS Global Mobility &amp; Career Insights</span>
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Knowledge, Trends &amp; Advice for Global Hiring.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-blue-100/90 font-medium leading-relaxed">
            Stay ahead with official European visa guides, international relocation strategies, and corporate workforce staffing trends updated weekly.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles by title, country, or topic (e.g. EU Blue Card, Code 95)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-300 text-sm font-medium focus:outline-none focus:border-blue-400 focus:bg-white/15 backdrop-blur-xl transition-all shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS BAR */}
      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* 3. FEATURED ARTICLE (IF ALL CATEGORIES & NO SEARCH QUERY) */}
        {selectedCategory === 'All Articles' && !searchQuery && featuredArticle && (
          <div className="group relative overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-xl transition-all hover:shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider shadow-md">
                  🌟 Featured Article
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 text-blue-200 font-bold text-[10px] backdrop-blur-md border border-white/20">
                  {featuredArticle.category}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-600" /> {featuredArticle.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-600" /> {featuredArticle.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-4">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs border border-blue-200">
                    {featuredArticle.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">{featuredArticle.author}</div>
                    <div className="text-[10px] font-medium text-slate-500">{featuredArticle.authorRole}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition hover:-translate-y-0.5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* 4. ARTICLES GRID */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Latest Articles</span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {filteredBlogs.length}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing articles for <strong className="text-slate-800">{selectedCategory}</strong>
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-16 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
              <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <p className="text-xs font-extrabold text-slate-600">Loading blog articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {blogs.length === 0 ? 'No Blog Articles Published Yet' : 'No articles matched your criteria'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {blogs.length === 0
                  ? 'Blog articles published by the Admin in the Admin Panel will appear here.'
                  : 'Try adjusting your search keywords or switching category filters.'}
              </p>
              {blogs.length > 0 && (
                <button
                  onClick={() => { setSelectedCategory('All Articles'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700 transition"
                >
                  Reset Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map(article => (
                <article
                  key={article.id}
                  className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white font-bold text-[10px] backdrop-blur-md border border-white/20">
                        {article.category}
                      </span>
                    </div>

                    {/* Content Header */}
                    <div className="px-6 space-y-2">
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-blue-600" /> {article.publishedAt}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-600" /> {article.readTime}</span>
                      </div>

                      <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 font-medium leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Article Footer */}
                  <div className="p-6 pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] font-bold text-slate-700 truncate max-w-[150px]">
                      By {article.author}
                    </div>

                    <button
                      onClick={() => setActiveArticle(article)}
                      className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-extrabold text-xs flex items-center gap-1 transition-all"
                    >
                      <span>Read Article</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* 5. NEWSLETTER SUBSCRIBE BANNER */}
        <section className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-12 text-white shadow-2xl">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Weekly Industry Digest</span>
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Get International Hiring &amp; Visa Updates Delivered Directly.
            </h2>
            
            <p className="text-xs sm:text-sm text-blue-100">
              Subscribe to the NFS Insights newsletter for early access to verified corporate vacancies, European visa law updates, and interview prep guides.
            </p>

            {subscribeSuccess ? (
              <div className="p-4 rounded-xl bg-white text-blue-700 font-extrabold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Thank you for subscribing! You will receive our next edition in your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email address..."
                  value={subscribedEmail}
                  onChange={e => setSubscribedEmail(e.target.value)}
                  className="w-full sm:w-80 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-xs font-bold focus:outline-none shadow-sm"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shrink-0 flex items-center justify-center gap-2 shadow-md transition"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Subscribe Now</span>
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* 6. FULL ARTICLE READER MODAL */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-[130] grid place-items-center overflow-y-auto bg-slate-900/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onMouseDown={e => { if (e.target === e.currentTarget) setActiveArticle(null); }}
        >
          <div className="my-8 w-full max-w-3xl overflow-hidden rounded-3xl bg-white border border-blue-200 shadow-2xl text-slate-900">
            
            {/* Modal Header Banner */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 border border-white/20 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                <span className="px-3 py-1 rounded-full bg-blue-600 font-extrabold text-[10px] uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <h1 className="text-xl sm:text-3xl font-black leading-tight text-white">
                  {activeArticle.title}
                </h1>
                
                <div className="flex items-center gap-4 text-xs text-blue-200 font-medium">
                  <span>By {activeArticle.author} ({activeArticle.authorRole})</span>
                  <span>•</span>
                  <span>{activeArticle.publishedAt}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Reader Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold italic">
                &quot;{activeArticle.excerpt}&quot;
              </div>

              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-medium">
                {activeArticle.content}
              </div>

              {activeArticle.tags && activeArticle.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-blue-600" />
                  {activeArticle.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Call to action bar inside article */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-extrabold text-sm text-white">Looking for Verified Corporate Vacancies?</h4>
                  <p className="text-xs text-blue-100">Explore active hiring vacancies with visa sponsorship and relocation support.</p>
                </div>
                
                <Link
                  href="/jobs"
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2.5 rounded-xl bg-white text-blue-700 font-black text-xs shrink-0 hover:bg-blue-50 transition shadow-md"
                >
                  View Active Vacancies
                </Link>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: activeArticle.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 hover:bg-slate-100 transition"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Share Article</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 transition"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
