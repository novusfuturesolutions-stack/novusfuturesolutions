'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDoc, collection, doc, deleteDoc, getDoc, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import {
  User,
  UserRole,
  Job,
  JobCategory,
  JobApplication,
  Post,
  ServiceListing,
  ServiceRequest,
  Message,
  Notification,
  VerificationRequest,
  ProfessionalProfile,
  CompanyProfile
} from '../types';
import {
  MOCK_USERS,
  MOCK_CATEGORIES,
  MOCK_POSTS,
  MOCK_NOTIFICATIONS,
  MOCK_MESSAGES,
  MOCK_VERIFICATION_REQUESTS
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUserRole: (role: UserRole) => void;
  users: User[];
  companies: CompanyProfile[];
  professionalProfiles: ProfessionalProfile[];
  dataLoaded: {
    jobs: boolean;
    companies: boolean;
    professionals: boolean;
  };
  categories: JobCategory[];
  jobs: Job[];
  applications: JobApplication[];
  posts: Post[];
  services: ServiceListing[];
  serviceRequests: ServiceRequest[];
  notifications: Notification[];
  messages: Message[];
  verificationRequests: VerificationRequest[];
  savedJobIds: string[];
  savedPostIds: string[];
  connectedUserIds: string[];
  currentCurrency: string;
  setCurrentCurrency: (currency: string) => void;
  formatPrice: (amountUsd: number) => string;

  // Sidebar Navigation Drawer
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Actions
  addCategory: (name: string, description: string, iconName?: string, imageUrl?: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  toggleSaveJob: (jobId: string) => void;
  toggleSavePost: (postId: string) => void;
  applyForJob: (jobId: string, coverLetter?: string, screeningAnswers?: Record<string, string>) => void;
  createJob: (jobData: Omit<Job, 'id' | 'postedAt' | 'applicantsCount' | 'status'>) => void;
  createPost: (content: string, postType?: Post['postType'], mediaUrl?: string, hashtags?: string[]) => void;
  reactToPost: (postId: string, reactionType: 'like' | 'support' | 'celebrate' | 'insightful') => void;
  addPostComment: (postId: string, text: string) => void;
  sendConnectionRequest: (targetUserId: string) => void;
  sendMessage: (receiverId: string, content: string) => void;
  submitServiceRequest: (requestData: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateApplicationStatus: (applicationId: string, status: JobApplication['status'], notes?: string) => void;
  updateVerificationStatus: (requestId: string, status: VerificationRequest['status'], notes?: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current logged in user state (Defaults to Wazir Ahmed - Professional)
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [currentCurrency, setCurrentCurrency] = useState<string>('INR');

  // Main collections
  const [users] = useState<User[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [professionalProfiles, setProfessionalProfiles] = useState<ProfessionalProfile[]>([]);
  const [dataLoaded, setDataLoaded] = useState({ jobs: false, companies: false, professionals: false });
  const [categories, setCategories] = useState<JobCategory[]>(MOCK_CATEGORIES);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [services, setServices] = useState<ServiceListing[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(MOCK_VERIFICATION_REQUESTS);

  // User interactions
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [savedPostIds, setSavedPostIds] = useState<string[]>(['post-1']);
  const [connectedUserIds, setConnectedUserIds] = useState<string[]>(['u-3']);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedUserRole = localStorage.getItem('vc_user_role');
      if (storedUserRole) {
        const found = MOCK_USERS.find(u => u.role === storedUserRole);
        if (found) setCurrentUser(found);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Private real-time notifications for the currently authenticated user.
  useEffect(() => {
    let stopNotifications: (() => void) | undefined;
    const stopAuth = onAuthStateChanged(auth, firebaseUser => {
      stopNotifications?.();
      if (!firebaseUser) {
        setNotifications([]);
        return;
      }
      const notificationCacheKey = `nfs_notifications_${firebaseUser.uid}`;
      try {
        const cached = localStorage.getItem(notificationCacheKey);
        if (cached) setNotifications(JSON.parse(cached) as Notification[]);
      } catch {
      }
      const notificationsQuery = query(
        collection(db, 'applications'),
        where('applicantId', '==', firebaseUser.uid)
      );
      stopNotifications = onSnapshot(notificationsQuery, snapshot => {
        const liveNotifications = snapshot.docs
          .map(item => {
            const data = item.data();
            const status = String(data.status || 'submitted');
            const statusLabel = status.replaceAll('_', ' ');
            return {
              id: `application-${item.id}`,
              userId: firebaseUser.uid,
              type: 'application_update',
              title: status === 'selected' ? 'Congratulations! You were selected' : `Application ${statusLabel}`,
              message: `Your application for ${data.jobTitle || 'the position'} at ${data.companyName || 'the company'} is ${statusLabel}.`,
              link: `/jobs/${data.jobId}`,
              read: status === 'submitted',
              createdAt: data.createdAt?.toDate?.().toISOString?.() || data.appliedAt || new Date().toISOString(),
            } as Notification;
          })
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setNotifications(liveNotifications);
        try {
          localStorage.setItem(notificationCacheKey, JSON.stringify(liveNotifications));
        } catch {
        }
      }, error => {
        console.warn('Application updates are temporarily unavailable.', error.code);
      });
    });
    return () => {
      stopNotifications?.();
      stopAuth();
    };
  }, []);

  // Live Firestore data shared by the public website and admin workspace.
  useEffect(() => {
    const unsubscribers = [
      onSnapshot(collection(db, 'categories'), snapshot => {
        if (!snapshot.empty) {
          const dbCategories = snapshot.docs.map(item => ({ ...item.data(), id: item.id } as JobCategory));
          setCategories(dbCategories);
        }
      }, error => console.error('Could not load categories:', error)),
      onSnapshot(collection(db, 'jobs'), snapshot => {
        const liveJobs = snapshot.docs
          .map(item => ({ ...item.data(), id: item.id } as Job))
          .filter(item => item.status !== 'closed')
          .sort((a, b) => String(b.postedAt || '').localeCompare(String(a.postedAt || '')));
        setJobs(liveJobs);
        setDataLoaded(current => ({ ...current, jobs: true }));
      }, error => console.error('Could not load jobs:', error)),
      onSnapshot(collection(db, 'posts'), snapshot => {
        setPosts(snapshot.docs.map(item => ({ ...item.data(), id: item.id } as Post)));
      }, error => console.error('Could not load posts:', error)),
      onSnapshot(collection(db, 'services'), snapshot => {
        setServices(snapshot.docs.map(item => ({ ...item.data(), id: item.id } as ServiceListing)));
      }, error => console.error('Could not load services:', error)),
      onSnapshot(collection(db, 'companies'), snapshot => {
        setCompanies(snapshot.docs.map(item => ({ ...item.data(), id: item.id } as CompanyProfile)));
        setDataLoaded(current => ({ ...current, companies: true }));
      }, error => console.error('Could not load companies:', error)),
      onSnapshot(collection(db, 'professionals'), snapshot => {
        setProfessionalProfiles(snapshot.docs.map(item => ({ ...item.data(), userId: item.data().userId || item.id } as ProfessionalProfile)));
        setDataLoaded(current => ({ ...current, professionals: true }));
      }, error => console.error('Could not load professionals:', error)),
    ];

    return () => unsubscribers.forEach(unsubscribe => unsubscribe());
  }, []);

  const addCategory = async (name: string, description: string, iconName?: string, imageUrl?: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCat: Omit<JobCategory, 'id'> = {
      name,
      slug,
      description,
      iconName: iconName || 'Briefcase',
      imageUrl: imageUrl || '',
      featured: true,
      jobsCount: 0
    };
    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...newCat,
        createdAt: serverTimestamp()
      });
      setCategories(prev => [...prev, { ...newCat, id: docRef.id }]);
    } catch (err) {
      console.error("Could not add category to Firestore:", err);
      // Fallback local addition if Firestore fails
      setCategories(prev => [...prev, { ...newCat, id: `cat-${Date.now()}` }]);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (err) {
      console.error("Could not delete category from Firestore:", err);
    }
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const setCurrentUserRole = (role: UserRole) => {
    const targetUser = MOCK_USERS.find(u => u.role === role) || {
      ...MOCK_USERS[0],
      role,
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} Demo User`
    };
    setCurrentUser(targetUser);
    try {
      localStorage.setItem('vc_user_role', role);
    } catch {}
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const toggleSavePost = (postId: string) => {
    setSavedPostIds(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const applyForJob = (jobId: string, coverLetter?: string, screeningAnswers?: Record<string, string>) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      companyName: targetJob.companyName,
      companyLogo: targetJob.companyLogo,
      applicantId: firebaseUser.uid,
      applicantName: firebaseUser.displayName || currentUser.name,
      applicantAvatar: firebaseUser.photoURL || currentUser.avatar || '/images/nfs-logo.png',
      applicantHeadline: currentUser.headline || 'Logistics Professional',
      applicantEmail: firebaseUser.email || currentUser.email,
      applicantPhone: currentUser.phone || '+971 50 000 0000',
      cvUrl: '/sample-cv-wazir.pdf',
      coverLetter,
      screeningAnswers,
      status: 'submitted',
      appliedAt: new Date().toISOString()
    };

    const { id: localApplicationId, ...applicationPayload } = newApp;
    void localApplicationId;
    void getDoc(doc(db, 'users', firebaseUser.uid))
      .then(profile => addDoc(collection(db, 'applications'), {
        ...applicationPayload,
        applicantId: firebaseUser.uid,
        applicantName: profile.data()?.name || newApp.applicantName,
        applicantPhone: profile.data()?.phone || newApp.applicantPhone,
        applicantCountry: profile.data()?.country || '',
        createdAt: serverTimestamp(),
      }))
      .catch(error => console.error('Could not submit application:', error));

    // Increment applicants count
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );

    // Add notification
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      type: 'application_update',
      title: 'Application Submitted',
      message: `Your application for "${targetJob.title}" at ${targetJob.companyName} was submitted successfully!`,
      link: '/dashboard/professional',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const createJob = (jobData: Omit<Job, 'id' | 'postedAt' | 'applicantsCount' | 'status'>) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedAt: new Date().toISOString(),
      applicantsCount: 0,
      status: 'active'
    };
    const { id: localJobId, ...jobPayload } = newJob;
    void localJobId;
    void addDoc(collection(db, 'jobs'), {
      ...jobPayload,
      createdAt: serverTimestamp(),
    }).catch(error => console.error('Could not create job:', error));
  };

  const createPost = (content: string, postType: Post['postType'] = 'text', mediaUrl?: string, hashtags?: string[]) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorHeadline: currentUser.headline || 'Logistics Member',
      authorRole: currentUser.role,
      authorVerified: currentUser.verified,
      postType,
      content,
      mediaUrl,
      hashtags: hashtags || ['Logistics', 'NFS', 'LogisticsJobs', 'Recruitment'],
      reactions: { like: 1, support: 0, celebrate: 0, insightful: 0 },
      comments: [],
      sharesCount: 0,
      createdAt: new Date().toISOString()
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const reactToPost = (postId: string, reactionType: 'like' | 'support' | 'celebrate' | 'insightful') => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const currentReaction = p.userReaction;
        const newReactions = { ...p.reactions };

        if (currentReaction) {
          newReactions[currentReaction] = Math.max(0, newReactions[currentReaction] - 1);
        }

        if (currentReaction !== reactionType) {
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
        }

        return {
          ...p,
          reactions: newReactions,
          userReaction: currentReaction === reactionType ? undefined : reactionType
        };
      })
    );
  };

  const addPostComment = (postId: string, text: string) => {
    const comment = {
      id: `c-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      content: text,
      createdAt: new Date().toISOString()
    };
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
    );
  };

  const sendConnectionRequest = (targetUserId: string) => {
    if (!connectedUserIds.includes(targetUserId)) {
      setConnectedUserIds(prev => [...prev, targetUserId]);
      const notif: Notification = {
        id: `notif-${Date.now()}`,
        userId: targetUserId,
        type: 'connection_request',
        title: 'New Connection Request',
        message: `${currentUser.name} connected with you on Novus Future Solutions (NFS).`,
        read: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const sendMessage = (receiverId: string, content: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: 'conv-1',
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId,
      content,
      read: false,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const submitServiceRequest = (requestData: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => {
    const req: ServiceRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setServiceRequests(prev => [req, ...prev]);
  };

  const updateApplicationStatus = (applicationId: string, status: JobApplication['status'], notes?: string) => {
    setApplications(prev =>
      prev.map(a => (a.id === applicationId ? { ...a, status, interviewNotes: notes } : a))
    );
  };

  const updateVerificationStatus = (requestId: string, status: VerificationRequest['status'], notes?: string) => {
    setVerificationRequests(prev =>
      prev.map(v => (v.id === requestId ? { ...v, status, notes } : v))
    );
  };

  const resetDemoData = () => {
    setJobs([]);
    setPosts(MOCK_POSTS);
    setNotifications(MOCK_NOTIFICATIONS);
    setMessages(MOCK_MESSAGES);
    setVerificationRequests(MOCK_VERIFICATION_REQUESTS);
    setSavedJobIds(['job-1', 'job-3']);
  };

  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    AED: { symbol: 'د.إ', rate: 3.67 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
    INR: { symbol: '₹', rate: 83.5 },
    SAR: { symbol: '﷼', rate: 3.75 }
  };

  const formatPrice = (amountUsd: number) => {
    const curr = currencyRates[currentCurrency] || currencyRates.USD;
    const converted = Math.round(amountUsd * curr.rate);
    const formattedNum = converted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${curr.symbol}${formattedNum}`;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUserRole,
        users,
        companies,
        professionalProfiles,
        dataLoaded,
        categories,
        jobs,
        applications,
        posts,
        services,
        serviceRequests,
        notifications,
        messages,
        verificationRequests,
        savedJobIds,
        savedPostIds,
        connectedUserIds,
        currentCurrency,
        setCurrentCurrency,
        formatPrice,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        addCategory,
        deleteCategory,
        toggleSaveJob,
        toggleSavePost,
        applyForJob,
        createJob,
        createPost,
        reactToPost,
        addPostComment,
        sendConnectionRequest,
        sendMessage,
        submitServiceRequest,
        updateApplicationStatus,
        updateVerificationStatus,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
