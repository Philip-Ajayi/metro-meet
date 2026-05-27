'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function RegistrationSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    church: '',
    address: '',
    whatsapp: '',
    email: '',
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      setStatus({
        type: 'error',
        message: 'You must provide consent for registration storage.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      setStatus({
        type: 'success',
        message: '🎉 Congratulations! You are registered successfully. Check your email inbox!',
      });
      setFormData({
        firstName: '',
        lastName: '',
        church: '',
        address: '',
        whatsapp: '',
        email: '',
        consent: false,
      });
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-metro-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase font-extrabold tracking-widest text-metro-gold mb-3"
        >
          Secure Your Spot
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
          <Sparkles className="text-metro-gold w-8 h-8" /> Event Registration
        </h2>
        <p className="text-slate-400 font-light mt-3 max-w-xl mx-auto text-sm md:text-base">
          Be part of Metro Meet 4.0 "Money Matters". Fill out your details below to obtain your digital confirmation invitation.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden"
      >
        {/* Subtle internal border accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-metro-gold/50 to-transparent" />

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="firstName" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                First Name <span className="text-metro-gold">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. John"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="lastName" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Last Name <span className="text-metro-gold">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g. Doe"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Church */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="church" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Your Church <span className="text-metro-gold">*</span>
              </label>
              <input
                type="text"
                id="church"
                name="church"
                required
                value={formData.church}
                onChange={handleChange}
                placeholder="e.g. MIV Word House"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light"
              />
            </div>

            {/* Address / City */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                City / Address <span className="text-metro-gold">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Samonda, Ibadan"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* WhatsApp Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="whatsapp" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                WhatsApp Phone Number <span className="text-metro-gold">*</span>
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="e.g. 09066484623"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Email Address <span className="text-metro-gold">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. user@domain.com"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light"
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 w-4 h-4 rounded border-slate-800 text-amber-500 focus:ring-metro-gold focus:ring-offset-slate-900 bg-slate-950 cursor-pointer"
            />
            <label htmlFor="consent" className="text-xs text-slate-400 select-none leading-relaxed font-light cursor-pointer">
              I give explicit permission to Metro Meet & MIV Word House to securely register my details in their database and send me event confirmation messages.
            </label>
          </div>

          {/* Status Message */}
          {status.type && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                status.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              }`}
            >
              {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              <span>{status.message}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] text-metro-dark py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Registering Seat...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Complete Free Registration
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
