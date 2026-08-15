'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '4915216405341'; // Official NFS WhatsApp line
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Novus Future Solutions, I would like to inquire about job vacancies and corporate services.')}`;

  return (
    <div className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end gap-3 font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* Quick Chat Popup Tooltip */}
      {isOpen && (
        <div className="w-72 sm:w-80 rounded-3xl border border-emerald-200 bg-white p-4 shadow-2xl text-slate-900 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 p-0.5 shadow-sm overflow-hidden">
                <img
                  src="/images/410199-PD37U2-851-removebg-preview.png"
                  alt="NFS Support Agent"
                  className="h-full w-full object-contain transform scale-110"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Novus Future Solutions</h4>
                <p className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • 24/7 Support Desk
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
              aria-label="Close WhatsApp chat prompt"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="my-3 rounded-2xl bg-emerald-50/70 p-3 border border-emerald-100 text-[11px] text-slate-700 leading-relaxed font-medium">
            👋 Hello! Need assistance with vacancies, candidate recruitment, or visa sponsorship? Chat directly with our team on WhatsApp!
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] py-3 text-xs font-black text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-95"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.107 4.04 4.04-1.06 1.06-.313z"/>
            </svg>
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Main Floating Avatar Image WhatsApp Button */}
      <div className="relative group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(prev => !prev)}
          className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] p-2 shadow-[0_10px_30px_rgba(37,211,102,.5)] ring-4 ring-white/40 transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] hover:shadow-[0_15px_35px_rgba(37,211,102,.75)] active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          {/* Animated Glow Pulse */}
          <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-60 animate-ping" />

          {/* Standalone Circular Image Container */}
          <div className="relative h-full w-full rounded-full bg-white/20 overflow-hidden flex items-center justify-center p-0.5">
            <img
              src="/images/410199-PD37U2-851-removebg-preview.png"
              alt="WhatsApp Support"
              className="h-full w-full object-contain transform scale-110 drop-shadow-md"
            />
          </div>
        </a>

        {/* Desktop Tooltip */}
        {!isOpen && (
          <span className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-xl bg-slate-900/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-extrabold text-white opacity-0 shadow-lg group-hover:opacity-100 transition-all pointer-events-none">
            Chat on WhatsApp 💬
          </span>
        )}
      </div>

    </div>
  );
}
