'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: '',
    message: '',
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
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
        message: 'You must provide consent for processing your message.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
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
        message: '🎉 Your message has been sent successfully! We will get in touch soon.',
      });
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        subject: '',
        message: '',
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
    <section id="contact" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase font-extrabold tracking-widest text-metro-gold mb-3"
        >
          Get In Touch
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Connect With <span className="text-metro-gold font-display italic font-medium">Metro Meet</span>
        </h2>
        <p className="text-slate-400 font-light mt-3 max-w-xl mx-auto text-sm md:text-base">
          Have an inquiry, sponsorship question, or need direction guidelines? Drop us a line or call our direct phone line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Side: Contact Information & Interactive Map */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between gap-8 text-left"
        >
          {/* Quick cards */}
          <div className="space-y-6">
            <a
              href="tel:0906648462346"
              className="flex items-center gap-5 p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/80 hover:border-metro-gold/40 hover:-translate-y-1 transition-all duration-300 shadow-xl group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-metro-gold flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Call or WhatsApp</p>
                <p className="text-lg font-bold text-white group-hover:text-metro-gold transition-colors mt-0.5">
                  0906648462346
                </p>
              </div>
            </a>

            <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/80 hover:border-metro-gold/40 hover:-translate-y-1 transition-all duration-300 shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email Inquiry</p>
                <p className="text-base font-bold text-white mt-0.5">
                  ajayiphilipg@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/80 hover:border-metro-gold/40 hover:-translate-y-1 transition-all duration-300 shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Physical Venue</p>
                <p className="text-sm font-bold text-white leading-relaxed mt-0.5">
                  Behind Accord Building, Obadeyi Estate Samonda Ibadan
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Map Layout */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl flex flex-col justify-end p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.1287118015383!2d3.8967!3d7.4208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d89e47cb82b%3A0xeab50800b73c4d60!2sSamonda%2C%20Ibadan!5e0!3m2!1sen!2sng!4v1716800000000!5m2!1sen!2sng"
              className="absolute inset-0 w-full h-full border-0 opacity-80"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="relative z-10 w-full bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
              <MapPin className="text-metro-gold w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Metro Meet Venue Map</p>
                <p className="text-xs font-semibold text-white">Behind Accord Building, Obadeyi Estate Samonda Ibadan</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Message Fillable Form */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 flex"
        >
          <div className="relative w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-5 text-left w-full">
              <h3 className="text-xl font-bold text-white mb-4">Send Us a Direct Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Full Name <span className="text-metro-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light text-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Email Address <span className="text-metro-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* WhatsApp Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-whatsapp" className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    id="contact-whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="e.g. 09066484623"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light text-sm"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Sponsorship Inquiry"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light text-sm"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  Message <span className="text-metro-gold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all font-light text-sm resize-none"
                />
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="contact-consent"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-slate-800 text-amber-500 focus:ring-metro-gold focus:ring-offset-slate-900 bg-slate-950 cursor-pointer"
                />
                <label htmlFor="contact-consent" className="text-[10px] text-slate-400 select-none leading-relaxed font-light cursor-pointer">
                  I give explicit permission to Metro Meet & MIV Word House to securely process my form inputs and forward a copy to the event organizers.
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
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] text-metro-dark py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
