'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Send, Loader2, CheckCircle2, AlertCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

export default function SubmitFeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
    anonymous: false,
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRatingClick = (rate: number) => {
    setFormData((prev) => ({ ...prev, rating: rate }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      setStatus({
        type: 'error',
        message: 'You must provide consent for processing your feedback.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit feedback.');
      }

      setStatus({
        type: 'success',
        message: '🎉 Thank you! Your feedback has been submitted successfully.',
      });
      setFormData({
        name: '',
        email: '',
        message: '',
        rating: 5,
        anonymous: false,
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
    <main className="relative min-h-screen px-4 md:px-8 py-12 text-slate-100 flex flex-col items-center justify-center">
      <AnimatedBackground />

      {/* Header */}
      <div className="w-full max-w-xl mb-8 flex justify-between items-center z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-metro-gold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-glass overflow-hidden border border-white/10 flex items-center justify-center p-1">
            <Image
              src="/wordHouseLogo/darkBackground.png"
              alt="Word House Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Feedback Portal</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl z-10 relative overflow-hidden text-left">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-metro-gold/50 to-transparent" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-metro-gold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Metro Meet 4.0</h2>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Share Your Experience</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Anonymous toggle */}
          <div className="flex items-center gap-3 p-4 bg-slate-950/40 rounded-2xl border border-slate-800/60">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-800 text-amber-500 focus:ring-metro-gold focus:ring-offset-slate-900 bg-slate-950 cursor-pointer"
            />
            <label htmlFor="anonymous" className="text-xs font-semibold text-slate-300 select-none cursor-pointer">
              Submit Feedback Anonymously
            </label>
          </div>

          {!formData.anonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Samuel Adewale"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light text-sm"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. sam@example.com"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light text-sm"
                />
              </div>
            </div>
          )}

          {/* Star Rating */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Rate Your Experience
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 cursor-pointer transition-transform duration-200 hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating ?? formData.rating)
                        ? 'fill-metro-gold text-metro-gold'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              What did you think of the event? <span className="text-metro-gold">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you learned, what you loved, or areas we can improve..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light text-sm resize-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 w-4 h-4 rounded border-slate-800 text-amber-500 focus:ring-metro-gold focus:ring-offset-slate-900 bg-slate-950 cursor-pointer"
            />
            <label htmlFor="consent" className="text-[10px] text-slate-400 select-none leading-relaxed font-light cursor-pointer">
              I permit Metro Meet organizers to securely receive and review my feedback contribution.
            </label>
          </div>

          {/* Status Alert */}
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

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] text-metro-dark py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting Feedback...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
