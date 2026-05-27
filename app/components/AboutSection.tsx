'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users } from 'lucide-react';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left Side: Bold Intro */}
        <div className="lg:col-span-5 text-left">
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase font-extrabold tracking-widest text-metro-gold mb-3"
          >
            Who We Are
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6"
          >
            Empowering the Next Generation of Thinkers & Doers
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-1.5 bg-gradient-to-r from-metro-gold to-amber-500 rounded-full mb-6"
          />
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-400 leading-relaxed font-light"
          >
            Metro Meet is a premier developmental event proudly organized by <strong>MIV Word House</strong> (the energetic and visionary Young People Church of <em>Men of Issachar Vision Inc.</em>).
          </motion.p>
        </div>

        {/* Right Side: Pillars/Vision Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-metro-gold/40 hover:-translate-y-2 transition-all duration-300 shadow-xl text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-metro-gold mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Core Vision</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Empowering young minds through meaningful, unfiltered discussions on vital topics directly impacting career, relationship, character, and overall future growth.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-metro-gold/40 hover:-translate-y-2 transition-all duration-300 shadow-xl text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-400 mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Vibrant Community</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              MIV Word House brings together dynamic young believers to learn, share insights, foster lifelong partnerships, and walk boldly into their divine purpose.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 p-8 rounded-2xl bg-gradient-to-r from-slate-900/80 to-slate-950/80 backdrop-blur-md border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-2xl text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Our Foundation</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Under the umbrella of Men of Issachar Vision Inc., we provide a safe, faith-grounded space where intellect meets spirituality, unlocking extraordinary capabilities in young men and women.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
