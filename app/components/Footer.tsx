'use client';
import React from 'react';
import Image from 'next/image';
import { Phone, MapPin, ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 py-12 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        {/* Left Side: Brand Logo and Organizer */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-glass overflow-hidden border border-white/10 flex items-center justify-center p-1">
              <Image
                src="/wordHouseLogo/darkBackground.png"
                alt="Word House Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-widest uppercase">MIV WORD HOUSE</p>
              <p className="text-[10px] font-semibold text-metro-gold tracking-widest uppercase">Young People Church</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-light max-w-sm mt-1">
            Proudly organized under the umbrella of Men of Issachar Vision Inc. Empowering young minds for a brighter, value-driven future.
          </p>
        </div>

        {/* Right Side: Quick info & Top Trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Quick info badges */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:0906648462346"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-metro-gold hover:border-metro-gold/30 transition-all cursor-pointer font-medium"
            >
              <Phone className="w-4 h-4 text-metro-gold" />
              <span>0906648462346</span>
            </a>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Samonda, Ibadan</span>
            </div>
          </div>

          {/* Scroll To Top button */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-slate-900 hover:bg-metro-gold hover:text-metro-dark border border-slate-800 hover:border-metro-gold text-slate-400 transition-all duration-300 cursor-pointer shadow-lg"
            title="Scroll to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
        <p className="text-[10px] text-slate-600 font-light">
          &copy; {new Date().getFullYear()} Metro Meet 4.0. Designed with passion for Men of Issachar Vision Inc.
        </p>
        <p className="text-[10px] text-slate-600 font-light">
          Focus: Money Matters | Saturday, June 13th, 2026
        </p>
      </div>
    </footer>
  );
}
