'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, ZoomIn } from 'lucide-react';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: '/gallery/1.jpg', alt: 'Metro Meet past memories 1', title: 'Empowering Young Minds' },
    { src: '/gallery/2.jpg', alt: 'Metro Meet past memories 2', title: 'Deep Strategy Discussions' },
    { src: '/gallery/3.jpg', alt: 'Metro Meet past memories 3', title: 'Community & Networking' },
    { src: '/gallery/4.jpg', alt: 'Metro Meet past memories 4', title: 'Growth & Insights' },
  ];

  return (
    <section id="gallery" className="relative py-24 bg-slate-950/20 border-t border-slate-900 overflow-hidden">
      {/* Background highlight */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-extrabold tracking-widest text-metro-gold mb-3"
          >
            Metro Meet Memories
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
            <Camera className="text-metro-gold w-8 h-8" /> Event Gallery
          </h2>
          <p className="text-base text-slate-400 font-light mt-4">
            Take a visual tour through our past editions. Real connections, life-changing moments, and impactful conversations.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setSelectedImage(img.src)}
              className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg cursor-pointer group"
            >
              {/* Zoom overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <div className="p-3 bg-metro-gold/20 rounded-full border border-metro-gold/30 scale-75 group-hover:scale-100 transition-transform duration-300 text-metro-gold">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 300px"
              />

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 text-left">
                <p className="text-sm font-bold text-white tracking-wide">{img.title}</p>
                <p className="text-[10px] text-metro-gold uppercase font-bold tracking-wider mt-0.5">Metro Meet Gallery</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer border border-white/10"
            >
              &times;
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-2 bg-slate-950"
            >
              <Image
                src={selectedImage}
                alt="Selected Lightbox Image"
                fill
                className="object-contain rounded-2xl"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
