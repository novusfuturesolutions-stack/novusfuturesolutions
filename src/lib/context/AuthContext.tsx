'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

type AccountRole = 'professional' | 'company' | 'provider' | 'customer' | 'admin';

interface AuthContextValue {
  user: FirebaseUser | null;
  role: AccountRole | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: Exclude<AccountRole, 'admin'>, country: string, countryCode: string, phone: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<AccountRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, async firebaseUser => {
    setUser(firebaseUser);
    setRole(null);
    if (firebaseUser) {
      const snapshot = await getDoc(doc(db, 'users', firebaseUser.uid));
      const fetchedRole = snapshot.data()?.role as AccountRole | undefined;
      
      const emailLower = (firebaseUser.email || '').toLowerCase();
      const isAdminEmail = emailLower.includes('admin@') || emailLower === 'admin@novusfuturesolutions.com' || emailLower === 'marcus.vance@novusfuturesolutions.com';
      
      const calculatedRole = fetchedRole === 'admin' || isAdminEmail ? 'admin' : (fetchedRole || 'professional');
      setRole(calculatedRole);
    }
    setLoading(false);
  }), []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    accountRole: Exclude<AccountRole, 'admin'>,
    country: string,
    countryCode: string,
    phone: string
  ) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    await setDoc(doc(db, 'users', credential.user.uid), {
      name,
      email: credential.user.email,
      role: accountRole,
      country,
      countryCode,
      phone: `${countryCode}${phone}`,
      verified: false,
      createdAt: serverTimestamp(),
    });
    setRole(accountRole);
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      loading,
      isAdmin: role === 'admin',
      signIn,
      signUp,
      signOut: () => firebaseSignOut(auth),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
