"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { interventionsData } from '@/lib/data/interventions';
import { useParams, notFound } from 'next/navigation';
import { MapPin, ChevronLeft, ShieldCheck, Zap, Globe, Building2, CheckCircle2 } from 'lucide-react';

export default function InterventionDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const data = interventionsData[slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          className="object-cover brightness-[0.4] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-sky-400 transition-colors mb-8 text-xs uppercase tracking-widest font-bold"
          >
            <ChevronLeft size={16} /> Back to Hub Overview
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-sky-400 mb-4">
              <MapPin size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">{data.location}</span>
            </div>
            <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight mb-6">
              {data.title}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              {data.shortDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT METRICS ──────────────────────────────────────── */}
      <section className="relative z-20 mt-[-50px] max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.impact.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center"
            >
              <p className="text-4xl font-bold text-sky-600 mb-2">{item.value}</p>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-500">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FULL STORY ──────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sky-600 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Strategic Operations</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Operational <span className="text-sky-600 italic">Excellence</span>
            </h2>
          </motion.div>
          
          <div className="prose prose-lg text-slate-600 font-light leading-relaxed space-y-6">
            {data.fullStory.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="flex gap-8 pt-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
                <Building2 size={22} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Infrastructure</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <ShieldCheck size={22} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">QA Compliance</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <Globe size={22} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Global Reach</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl border-8 border-slate-50"
        >
          <Image
            src={data.heroImage}
            alt="Operational hub"
            fill
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* ── TECHNICAL SPECIFICATIONS SPOTLIGHT ──────────────────── */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center overflow-hidden relative">
            <div className="w-full md:w-2/3 relative z-10">
              <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Process Standards</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">{data.craftDetails.title}</h3>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                {data.craftDetails.description}
              </p>
              <div className="flex items-center gap-4 py-4 border-t border-slate-700">
                <div className="text-sky-400 font-bold uppercase tracking-widest text-xs">Primary Category:</div>
                <div className="text-slate-200 text-sm font-semibold">{data.craftDetails.material}</div>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-center relative z-10">
               <div className="w-48 h-48 bg-sky-500/10 border border-sky-500/20 rounded-3xl flex flex-col items-center justify-center text-sky-400 p-6 text-center">
                  <CheckCircle2 size={48} className="mb-3" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">ISO 9001:2015</span>
                  <span className="text-[10px] text-sky-300">Certified Facility</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CALL TO ACTION ───────────────────────────────── */}
      <section className="py-28 text-center bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Procure From This <span className="text-sky-600 italic">Regional Hub</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg mb-10 font-light">
            Contact our supply chain team to discuss volume allocations, custom manufacturing specs, or direct container shipments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/bulk-orders"
              className="bg-sky-600 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20"
            >
              Request Hub Quote
            </Link>
            <Link 
              href="/collections"
              className="bg-white border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-100 transition-all"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
