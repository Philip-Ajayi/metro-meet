'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowLeft, MessageSquare, Loader2, Calendar, User, EyeOff } from 'lucide-react';
import AnimatedBackground from '../../components/AnimatedBackground';

interface FeedbackItem {
  _id: string;
  name?: string;
  email?: string;
  message: string;
  rating?: number;
  anonymous: boolean;
  createdAt: string;
}

export default function AdminFeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Compute stats
  const total = feedbacks.length;
  const averageRating = total
    ? (feedbacks.reduce((acc, curr) => acc + (curr.rating || 0), 0) / total).toFixed(1)
    : '0.0';

  return (
    <main className="relative min-h-screen px-4 md:px-8 py-12 text-slate-100 flex flex-col items-center">
      <AnimatedBackground />

      {/* Header */}
      <div className="w-full max-w-4xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-metro-gold uppercase tracking-wider transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
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
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">Feedback Dashboard</h1>
            <p className="text-[10px] text-metro-gold uppercase font-bold tracking-widest">Administrator View</p>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 z-10">
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex items-center gap-5 shadow-xl text-left">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Submissions</p>
            <p className="text-2xl font-bold text-white mt-1">{total}</p>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex items-center gap-5 shadow-xl text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-metro-gold">
            <Star className="w-6 h-6 fill-metro-gold" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Average Rating</p>
            <p className="text-2xl font-bold text-white mt-1">
              {averageRating} <span className="text-sm text-slate-500">/ 5.0</span>
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Feed */}
      <div className="w-full max-w-4xl space-y-6 z-10 text-left">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-metro-gold" />
            <span>Retrieving Feedback Feed...</span>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="py-20 text-center text-slate-500 bg-slate-900/20 rounded-3xl border border-slate-800/80">
            No feedback entries have been submitted yet.
          </div>
        ) : (
          feedbacks.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.anonymous ? 'bg-slate-850 text-slate-500' : 'bg-amber-500/10 text-metro-gold'}`}>
                    {item.anonymous ? <EyeOff className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {item.anonymous ? 'Anonymous Attendee' : item.name}
                    </h4>
                    {!item.anonymous && item.email && (
                      <p className="text-xs text-slate-500 mt-0.5">{item.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Rating Stars */}
                  {item.rating && (
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= (item.rating || 0) ? 'fill-metro-gold text-metro-gold' : 'text-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
