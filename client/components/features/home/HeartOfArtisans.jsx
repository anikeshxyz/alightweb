"use client";
import React from 'react';
import Link from 'next/link';
import { Globe2, ShieldCheck, ArrowRight } from 'lucide-react';

const HeartOfArtisans = () => {
  return (
    <div className="relative overflow-hidden flex items-center justify-center bg-slate-900 text-white py-20 border-t border-slate-800">
      {/* Subtle geometric background glows */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto">
        <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-500/20">
          Global Enterprise Partnership
        </span>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight font-heading">
          Connecting Markets. <span className="text-sky-400">Delivering Trust.</span>
        </h2>

        <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-10 font-normal leading-relaxed">
          Alight International operates a connected global supply network built for resilience, compliance, and enterprise reliability across North America, Europe, and Asia.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-sky-950/50 uppercase tracking-wider text-xs flex items-center gap-2"
          >
            <span>Partner With Us</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/about"
            className="border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 font-medium px-8 py-3.5 rounded-xl transition-all duration-200 uppercase tracking-wider text-xs"
          >
            Corporate Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeartOfArtisans;