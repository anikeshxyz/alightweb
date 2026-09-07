"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <span className="inline-block px-4 py-1.5 bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-[0.3em] rounded-full mb-8">
          Historical Catalogs
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
          Trade <span className="text-sky-600">Archive</span>.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-light mb-12 leading-relaxed">
          We are currently digitizing our historical trade volumes, past procurement catalogs, and seasonal product lines. Active commercial accounts can access archived invoices and historical specs directly via the client portal.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link 
            href="/"
            className="px-10 py-4 bg-sky-600 text-white font-bold rounded-full hover:bg-sky-700 transition-all shadow-xl shadow-sky-600/20"
          >
            Back to Home
          </Link>
          <Link 
            href="/collections"
            className="px-10 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all"
          >
            Explore Active Catalog
          </Link>
        </div>
      </motion.div>
      
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
