'use client';

import { useEffect, useState, memo } from 'react';
import Image from 'next/image';
import {
  Globe,
  ShieldCheck,
  Briefcase,
  Users,
  Building2,
  Sparkles,
  Zap
} from 'lucide-react';

const WEBSITE_FEATURES = [
  { icon: Globe, text: 'Global Multi-Industry Recruitment Platform' },
  { icon: Briefcase, text: 'Verified Vacancies in Tech, Healthcare & Finance' },
  { icon: ShieldCheck, text: 'Degree & Background Verification Engine' },
  { icon: Users, text: 'Enterprise Candidate Sourcing & Headhunting' },
  { icon: Building2, text: 'Direct Representation in Germany & Lithuania' },
  { icon: Zap, text: 'Connecting Top Talent with Global Employers' }
];

export const LoadingScreen = memo(function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Feature cycling interval every 450ms
    const featureInterval = setInterval(() => {
      setFeatureIndex(prev => (prev + 1) % WEBSITE_FEATURES.length);
    }, 450);

    // Progress counter interval (0% to 100% over ~2 seconds)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    // Start fade-out after 2.3s, then fully unmount at 2.9s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2300);
    const removeTimer = setTimeout(() => setVisible(false), 2900);

    return () => {
      clearInterval(featureInterval);
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  const CurrentIcon = WEBSITE_FEATURES[featureIndex].icon;
  const currentFeatureText = WEBSITE_FEATURES[featureIndex].text;

  return (
    <div
      className={`nfs-loading-overlay${fadeOut ? ' nfs-loading-overlay--out' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Background Animated Gradient Mesh Glows */}
      <div className="nfs-loading-bg-glow nfs-loading-bg-glow--1" />
      <div className="nfs-loading-bg-glow nfs-loading-bg-glow--2" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-5 sm:space-y-6 text-center px-4 w-full max-w-sm sm:max-w-md mx-auto">
        
        {/* Logo wrap with dual rotating particle orbit */}
        <div className="nfs-loading-logo-wrap">
          {/* Orbital spin rings */}
          <div className="nfs-loading-orbit nfs-loading-orbit--outer" />
          <div className="nfs-loading-orbit nfs-loading-orbit--inner" />

          {/* Borderless glowing logo halo (No rectangular box card) */}
          <div className="nfs-loading-logo-halo">
            <Image
              src="/images/nfs-logo.png"
              alt="NFS Logo"
              width={140}
              height={56}
              priority
              className="nfs-loading-logo-img"
            />
          </div>
        </div>

        {/* Brand Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[10px] font-extrabold text-blue-600 shadow-2xs">
            <Sparkles className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Novus Future Solutions (NFS)</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
            Connecting Talent. Driving Growth.
          </h2>
        </div>

        {/* Progress Bar & Percentage Counter */}
        <div className="w-56 sm:w-64 space-y-2">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold text-slate-500 font-mono">
            <span>LOADING MARKETPLACE</span>
            <span className="text-blue-600 font-black">{Math.min(100, progress)}%</span>
          </div>
          
          <div className="nfs-loading-progress-track">
            <div
              className="nfs-loading-progress-bar"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>

        {/* Website Features Small Text Carousel Pill */}
        <div className="pt-1 min-h-[44px] flex items-center justify-center w-full">
          <div
            key={featureIndex}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-200/90 shadow-md text-[11px] sm:text-xs font-bold text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-full"
          >
            <div className="p-1 rounded-lg bg-blue-600 text-white shrink-0 shadow-xs">
              <CurrentIcon className="w-3.5 h-3.5" />
            </div>
            <span className="truncate max-w-[210px] sm:max-w-xs">{currentFeatureText}</span>
          </div>
        </div>

      </div>
    </div>
  );
});
