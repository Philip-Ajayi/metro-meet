'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Award, Briefcase, GraduationCap, Info, TrendingUp } from 'lucide-react';

export default function SpeakerSection() {
  const [activeTab, setActiveTab] = useState<'profile' | 'bio' | 'credentials'>('profile');

  const qualifications = [
    { title: 'FCA', desc: 'Fellow, Institute of Chartered Accountants of Nigeria' },
    { title: 'ACCA', desc: 'Associate, Association of Chartered Certified Accountants' },
    { title: 'DipIFR', desc: 'Diploma in International Financial Reporting Standards' },
    { title: 'ACTI', desc: 'Associate, Chartered Institute of Taxation of Nigeria' },
    { title: 'FRCN', desc: 'Member, Financial Reporting Council of Nigeria' },
    { title: 'Google BI', desc: 'Certified Google Business Intelligence Analyst' },
  ];

  return (
    <section id="speaker" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase font-extrabold tracking-widest text-metro-gold mb-3"
        >
          Metro Meet Guest Speaker
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tight"
        >
          Learn from a <span className="text-metro-gold font-display italic font-medium">Finance Leader</span>
        </motion.h2>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Image Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-[320px] sm:w-[360px] aspect-[4/5] rounded-3xl bg-slate-900 border border-slate-800 p-3 shadow-2xl relative overflow-hidden group">
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-metro-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
              <Image
                src="/speaker/sobayo.jpg"
                alt="Femi Sobayo"
                fill
                className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 300px, 400px"
              />
              {/* Profile Bottom Tag */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-left">
                <p className="text-xl font-bold text-white leading-tight">Olumuyiwa Femi Sobayo</p>
                <p className="text-xs font-semibold text-metro-gold mt-1 uppercase tracking-wider">
                  Finance Director, Eastcastle Infrastructure
                </p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                  Former CFO, Lagos Chamber of Commerce and Industry (LCCI)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: Bio / Interactive Tab View */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 text-left flex flex-col justify-center"
        >
          {/* Tab buttons */}
          <div className="flex gap-2 p-1.5 bg-slate-950/80 backdrop-blur-md rounded-full border border-slate-900 mb-8 self-start w-full sm:w-auto">
            {[
              { id: 'profile', label: 'Brief Profile', icon: <Briefcase className="w-4 h-4" /> },
              { id: 'bio', label: 'Full Bio', icon: <Info className="w-4 h-4" /> },
              { id: 'credentials', label: 'Qualifications', icon: <GraduationCap className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-metro-gold text-metro-dark shadow-lg shadow-metro-gold/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Frame */}
          <div className="min-h-[300px] bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="text-metro-gold w-5 h-5" /> Executive Summary
                  </h3>
                  <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                    Olumuyiwa Femi Sobayo is a distinguished finance, strategy, and business intelligence leader with over <strong>15 years of exceptional, cross-functional experience</strong>. 
                  </p>
                  <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                    He has successfully steered financial governance, capital models, and long-term valuation portfolios across high-impact sectors including Banking, FMCG, Pharmaceuticals, Engineering, Agriculture, Trade Development, and top-tier NGOs.
                  </p>
                  <div className="border-t border-slate-800/60 pt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Current Role</p>
                      <p className="text-sm font-semibold text-white">Finance Director, Eastcastle Infrastructure</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Previous Peak Role</p>
                      <p className="text-sm font-semibold text-white">CFO, Lagos Chamber of Commerce & Industry</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bio' && (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar"
                >
                  <h3 className="text-xl font-bold text-white">Detailed Experience</h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    Olumuyiwa currently directs strategic financial frameworks, treasury actions, asset configurations, liquidity positions, and performance architectures at Eastcastle Infrastructure, creating sustainable long-term shareholder value.
                  </p>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    In his former capacity as CFO at the Lagos Chamber of Commerce and Industry—the oldest and premier Chamber of Commerce in West Africa—he structured dynamic models for governance compliance, risk management, and council advisory protocols.
                  </p>
                  <p className="text-sm text-slate-300 font-light leading-relaxed font-semibold italic text-metro-gold">
                    "Olumuyiwa is incredibly passionate about utilizing data-driven analysis, intelligent strategy, and automated technology to unlock business operations and empower high-yield systems."
                  </p>
                </motion.div>
              )}

              {activeTab === 'credentials' && (
                <motion.div
                  key="credentials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                      <GraduationCap className="text-metro-gold w-5 h-5" /> Academic Milestones
                    </h3>
                    <p className="text-sm text-slate-300 font-light">
                      Graduated as the <strong className="text-white">2nd Best overall</strong> in his first degree and completed his MBA with <strong className="text-white">Best Overall student award</strong> (ND, HND, and MBA all at Distinction levels).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
                      <Award className="text-metro-gold w-5 h-5" /> Professional Certifications
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {qualifications.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center flex flex-col justify-center items-center group/badge hover:border-metro-gold transition-colors"
                        >
                          <span className="text-xs font-bold text-metro-gold group-hover/badge:scale-105 transition-transform">{item.title}</span>
                          <span className="text-[8px] text-slate-500 mt-1 uppercase tracking-wider hidden sm:block text-center line-clamp-1">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
