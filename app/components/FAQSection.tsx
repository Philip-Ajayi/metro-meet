'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Who should attend Metro Meet 4.0?',
      a: 'Metro Meet 4.0 is specifically designed for young professionals, entrepreneurs, students, and anyone looking to fundamentally transform their financial mindset, build scalable resource strategies, and plan a future of lasting wealth.'
    },
    {
      q: 'Is there a cost to register for Metro Meet 4.0?',
      a: 'No, Metro Meet 4.0 is completely FREE to attend. However, registration is highly mandatory due to hall sitting capacity limitations.'
    },
    {
      q: 'Where and when is Metro Meet 4.0 taking place?',
      a: 'Join us on Saturday, 13th June 2026, at Behind Accord Building, Obadeyi Estate, Samonda, Ibadan, for an icebreaker session at 12:30 PM, followed by the main event at 1:00 PM.'
    },
    {
      q: 'What is MIV Word House?',
      a: 'MIV Word House is the energetic Young People Church under the umbrella of Men of Issachar Vision Inc. Our primary mission is empowering young believers, cultivating excellence across career sectors, and igniting spiritual leadership.'
    },
  ];

  return (
    <section id="faq" className="relative py-24 max-w-4xl mx-auto px-4 md:px-8 overflow-hidden">
      {/* Background highlight */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase font-extrabold tracking-widest text-metro-gold mb-3"
        >
          Got Questions?
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
          <HelpCircle className="text-metro-gold w-8 h-8" /> Frequently Asked
        </h2>
      </div>

      {/* Accordions */}
      <div className="space-y-4 text-left">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left cursor-pointer hover:bg-slate-900/30 transition-colors"
              >
                <span className="font-bold text-white text-sm md:text-base pr-4">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-metro-gold flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-6 pt-0 text-slate-300 font-light text-xs md:text-sm leading-relaxed border-t border-slate-800/40">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
