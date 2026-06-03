'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Calendar, Clock, MapPin, Play } from 'lucide-react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [showFlyerModal, setShowFlyerModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Target Date: Saturday 13th of June 2026, 10:00 AM
    const targetDate = new Date('2026-06-13T13:00:00').getTime();

    const calculateTimeLeft = () => {
      const difference = targetDate - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 overflow-hidden">
      {/* Logos and Header Bar */}
      <div className="absolute top-6 left-0 right-0 px-6 md:px-12 flex justify-between items-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          {/* Logo container */}
          <div className="relative w-12 h-12 rounded-xl bg-glass overflow-hidden border border-white/10 flex items-center justify-center p-1">
            <Image
              src="/wordHouseLogo/darkBackground.png"
              alt="Word House Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="text-xs uppercase tracking-widest font-bold text-slate-400 hidden sm:block">
            MIV Word House
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => scrollToSection('register')}
            className="px-5 py-2 rounded-full border border-metro-gold/50 text-metro-gold hover:bg-metro-gold hover:text-metro-dark transition-all duration-300 font-medium text-sm bg-glass"
          >
            Register Now
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 rounded-full text-slate-300 hover:text-white transition-colors duration-300 text-sm hidden sm:block font-medium"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-5xl text-center z-10 flex flex-col items-center mt-8">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-metro-gold mb-6 backdrop-blur-md shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Metro Meet 4.0 – 4th Edition
          </span>
        </motion.div>

        {/* Catchy Visual Logo / Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-40 h-16 md:w-56 md:h-24 mb-6 flex items-center justify-center"
        >
          <Image
            src="/metroMeetLogo/darkBackground.png"
            alt="Metro Meet Logo"
            fill
            className="object-contain filter drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-amber-400 bg-clip-text text-transparent drop-shadow-xl"
        >
          Mastering Your <br className="hidden md:inline" />
          <span className="text-metro-gold relative inline-block">
            Money Matters
            <span className="absolute bottom-1 left-0 w-full h-[6px] bg-amber-500/30 rounded-full blur-[1px]" />
          </span>
        </motion.h1>

        {/* Description quote */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-light px-4"
        >
          "What if the way you think about money is the very thing determining your future wealth? Come learn how to grow your resources and create lasting financial freedom."
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 justify-center w-full max-w-md px-4"
        >
          <button
            onClick={() => scrollToSection('register')}
            className="flex-1 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-metro-dark font-bold text-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Claim Your Free Seat
          </button>
          <button
            onClick={() => setShowFlyerModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-500 font-medium text-slate-200 transition-all duration-300"
          >
            <Play className="w-5 h-5 fill-white stroke-none" />
            View Event Flyer
          </button>
        </motion.div>

        {/* Countdown Timer */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-4 gap-2 md:gap-4 max-w-lg w-full bg-slate-900/40 backdrop-blur-md border border-slate-800 p-4 md:p-6 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl md:text-4xl font-black text-white font-mono bg-slate-950/80 px-3 py-2 rounded-xl min-w-[50px] md:min-w-[70px] shadow-inner border border-slate-800/80 tracking-widest text-glow text-metro-gold">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs font-semibold text-slate-400 mt-2 uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Info Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-16 border-t border-slate-800/60 pt-10"
        >
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/10">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Date</p>
              <p className="text-sm font-semibold text-white">Sat, June 13th, 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <div className="p-3 bg-amber-500/10 rounded-xl text-metro-gold border border-amber-500/10">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time</p>
              <p className="text-sm font-semibold text-white">1:00 PM Prompt</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-end">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/10">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Venue</p>
              <p className="text-sm font-semibold text-white">Samonda, Ibadan</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bounce Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-6 cursor-pointer text-slate-400 hover:text-metro-gold transition-colors duration-300 z-10"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>

      {/* Flyer Modal */}
      <AnimatePresence>
        {showFlyerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFlyerModal(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl p-2"
            >
              <button
                onClick={() => setShowFlyerModal(false)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer z-10 border border-white/10"
              >
                &times;
              </button>
              <div className="relative aspect-square w-full">
                <Image
                  src="/flyer/flyer.jpeg"
                  alt="Metro Meet 4.0 Flyer"
                  fill
                  className="object-contain rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
