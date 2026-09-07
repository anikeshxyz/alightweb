"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/context/AuthContext';
import { formatImageUrl } from '@/lib/utils';
import ProductSection from './ProductSection';
import SquareProductSection from './SquareProductSection';
import ValuesSlider from './ValuesSlider';
import HeartOfArtisans from './HeartOfArtisans';
import InterventionsSection from './InterventionsSection';

// ─── Category navigation data ───────────────────────────────────────────────
const CATEGORIES = [
  {
    label: "Modular Kitchen",
    slug: "modular-kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    accent: "#38bdf8",
  },
  {
    label: "Kitchen Storage",
    slug: "kitchen-storage",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    accent: "#0284c7",
  },
  {
    label: "Tabletop & Cutlery",
    slug: "tabletop-cutlery",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
    accent: "#60a5fa",
  },
  {
    label: "Bathroom Fixtures",
    slug: "bathroom-fixtures",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    accent: "#0ea5e9",
  },
  {
    label: "Wardrobe Accessories",
    slug: "wardrobe-accessories",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    accent: "#38bdf8",
  },
  {
    label: "Wire Products",
    slug: "wire-products",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    accent: "#0284c7",
  },
];

// ─── Counter animation hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

// ─── Individual stat ─────────────────────────────────────────────────────────
function Stat({ value, suffix, label }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="text-4xl md:text-5xl font-extrabold text-white">
        {count.toLocaleString('en-IN')}{suffix}
      </span>
      <span className="text-sm text-white/60 mt-1 uppercase tracking-widest">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const HomePage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        if (res.data?.success) setProducts(res.data.data);
      })
      .catch(err => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  const bestSellers = [...products].reverse().slice(0, 10);
  const justArrived = products.slice(-10).reverse();

  return (
    <div className="w-full flex flex-col overflow-x-clip bg-white">

      {/* ── Welcome ribbon ── */}
      {user && (
        <div className="bg-slate-900 py-2.5 px-6 text-center border-b border-slate-800">
          <p className="text-slate-300 text-xs font-medium">
            Welcome back, <span className="font-bold text-sky-400">{user.name}</span>!&nbsp;
            <Link href={ROUTES.PROFILE} className="underline text-sky-400 hover:text-sky-300 transition-colors">
              Manage corporate orders →
            </Link>
          </p>
        </div>
      )}

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden flex flex-col md:flex-row items-center"
        style={{ minHeight: "clamp(540px, 80vh, 720px)", background: "linear-gradient(135deg, #0a1128 0%, #0f172a 55%, #1e293b 100%)" }}
      >
        {/* Decorative background glows */}
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[15%] w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        {/* LEFT: Hero copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex-1 flex flex-col items-center text-center justify-center px-8 md:px-16 py-20 md:py-0"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center justify-center gap-2 bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-8 w-fit shadow-xs"
          >
            🌐 Global Trade & Enterprise Solutions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight font-heading"
          >
            Empowering Global Trade with <span className="text-sky-400">Precision</span> & <span className="text-sky-300">Reliability</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg font-normal mb-8 sm:mb-12 max-w-2xl px-2 sm:px-0 leading-relaxed"
          >
            Alight International delivers certified product manufacturing, seamless cross-border supply chain operations, and bespoke corporate procurement solutions worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/collections"
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-9 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-sky-900/30 hover:scale-105 text-xs uppercase tracking-widest"
            >
              Explore Solutions
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT: Category cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex-1 flex items-center justify-center gap-4 px-4 md:px-[20px] py-10 md:py-0 flex-wrap lg:flex-nowrap"
        >
          {CATEGORIES.slice(0, 3).map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.15 }}
            >
              <Link
                href={`/collections/${cat.slug}`}
                className="group relative flex flex-col items-center justify-end rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 shadow-2xl block border border-slate-700/60"
                style={{ width: "clamp(120px, 25vw, 160px)", height: "clamp(200px, 35vw, 260px)", flexShrink: 0 }}
              >
                {/* Category image */}
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
                <div className="relative z-10 w-full px-3 py-5 text-center">
                  <span className="text-white font-bold text-[11px] uppercase tracking-widest block drop-shadow-md">{cat.label}</span>
                  <span
                    className="text-[10px] font-bold text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300 block mt-1 uppercase tracking-tighter"
                  >View Catalog →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          SHOP BY CATEGORY / SOLUTIONS GRID
      ════════════════════════════════════════ */}
      <section className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <Link href="/collections" className="inline-block group">
            <span className="text-xs uppercase tracking-[0.25em] text-sky-600 font-bold block mb-2">Product Lines & Sourcing</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 transition-colors group-hover:text-sky-700 uppercase font-heading">
              Commercial Solutions & Catalogs
            </h2>
            <div className="h-1 w-0 group-hover:w-full bg-sky-600 transition-all duration-500 mx-auto mt-2 rounded-full" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group relative flex flex-col justify-end rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 aspect-square border border-slate-100"
            >
              {/* Category image */}
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent transition-all duration-500" />

              {/* Label bar */}
              <div className="relative z-10 text-center py-6 px-4">
                <span className="block text-base md:text-lg font-bold uppercase tracking-wider text-white drop-shadow-md">
                  {cat.label}
                </span>
                <span
                  className="block text-xs font-semibold uppercase tracking-widest mt-1.5 text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                >
                  Explore Catalog →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          CORE CAPABILITIES — 3 PILLARS
      ════════════════════════════════════════ */}
      <section className="w-full bg-slate-50 border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col">

          {/* Heading */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-sky-600 font-bold block mb-2">Our Operational Strengths</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 uppercase font-heading">
              Why Choose Alight International
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              We streamline international trade with strict compliance, transparent supply chains, and dependable worldwide logistics.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: "Global Supply Chain & Logistics",
                desc: "End-to-end freight management, international customs clearance, and timely worldwide destination delivery.",
                badge: "Worldwide Reach"
              },
              {
                title: "Certified Quality Assurance",
                desc: "Stringent multi-tier quality inspections meeting international safety, durability, and material standards.",
                badge: "Strict QA"
              },
              {
                title: "Custom OEM & B2B Sourcing",
                desc: "Tailored manufacturing capabilities, customized packaging, and volume discounts for corporate partners.",
                badge: "Enterprise Sourcing"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-sky-300"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full inline-block mb-4">
                    {item.badge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*════════════════════════════════
      BRAND STORY SLIDER
      ════════════════════════════════════════ */}
      {/* 
      <section className="w-full py-8 bg-white shadow-inner">
        <ValuesSlider />
      </section>
      */}

      {/* ════════════════════════════════════════
          BEST SELLERS — SQUARE BOXES
      ════════════════════════════════════════ */}
      {loading ? (
        <div className="w-full h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
        </div>
      ) : (
        bestSellers.length > 0 && (
          <SquareProductSection
            products={bestSellers}
            title="Featured Solutions"
            slug="best-sellers"
            subtitle="High-Demand Commercial Lines"
          />
        )
      )}

      {/* ════════════════════════════════════════
          ENTERPRISE SOLUTIONS BANNER
      ════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden flex items-center justify-center py-20 my-6 border-y border-slate-800"
        style={{ background: "linear-gradient(135deg, #0a1128 0%, #0f172a 45%, #1e293b 100%)" }}
      >
        <div className="absolute w-96 h-96 rounded-full bg-sky-500/10 blur-3xl top-[-100px] left-[-100px] pointer-events-none" />
        <div className="absolute w-80 h-80 rounded-full bg-blue-600/10 blur-3xl bottom-[-60px] right-[5%] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.35em] mb-4 bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-500/20">
            International Sourcing & OEM Manufacturing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight uppercase font-heading">
            Engineered For <span className="text-sky-400">Global Commerce</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base mb-10 max-w-2xl font-normal leading-relaxed">
            From initial custom specification to container-load dispatch, Alight International manages strict quality inspection, custom branding, and international trade compliance.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["🌐 Worldwide Port Delivery", "📋 Customs Clearance", "🏷️ Custom OEM Branding", "📦 Volume Scalability"].map(tag => (
              <span
                key={tag}
                className="px-5 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800/60 text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/bulk-orders"
            className="px-10 py-4 bg-sky-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-sky-500 transition-all duration-300 shadow-xl shadow-sky-950/50 hover:scale-105 rounded-xl"
          >
            Request Corporate Quote
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════
          JUST ARRIVED — SQUARE BOXES
      ════════════════════════════════════════ */}
      {!loading && justArrived.length > 0 && (
        <SquareProductSection
          products={justArrived}
          title="New Additions"
          slug="just-arrival"
          subtitle="Recent Catalog Releases"
        />
      )}

      {/* ════════════════════════════════════════
          GLOBAL CAPABILITIES & LOGISTICS
      ════════════════════════════════════════ */}
      <InterventionsSection />

      {/* ════════════════════════════════════════
          GLOBAL OPERATIONS NETWORK
      ════════════════════════════════════════ */}
      <HeartOfArtisans />

    </div>
  );
};

export default HomePage;