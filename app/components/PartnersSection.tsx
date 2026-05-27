'use client';
import React from 'react';

export default function PartnersSection() {
  return (
    <section className="hidden">
      {/* Partners Section hidden as requested */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-xl text-slate-500">Event Partners</h2>
        <div className="flex justify-center gap-6 mt-4">
          <span>MIV Word House</span>
          <span>Eastcastle Infrastructure</span>
        </div>
      </div>
    </section>
  );
}
