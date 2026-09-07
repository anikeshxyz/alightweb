"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Globe, ShieldCheck, Zap, TrendingUp, Users, BarChart2, ChevronRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// ── Animated counter ──────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

const journey = [
  {
    year: "2015",
    title: "Founded in Singapore",
    text: "Alight International was established by a team of seasoned logistics and trade finance professionals with a mission to simplify cross-border sourcing for mid-market enterprises."
  },
  {
    year: "2018",
    title: "Asia-Pacific Expansion",
    text: "We scaled our sourcing network across Southeast Asia, South Asia, and East Asia — building compliant, audited supply chains in over 12 manufacturing corridors."
  },
  {
    year: "2021",
    title: "Global Trade Platform Launch",
    text: "We launched our proprietary trade management platform, enabling real-time procurement visibility, compliance tracking, and multi-currency settlement for enterprise clients worldwide."
  },
  {
    year: "Today",
    title: "$2.4B+ in Trade Facilitated",
    text: "Serving Fortune 500 companies and fast-scaling enterprises, Alight International is the trusted backbone for global supply chains across 60+ countries."
  }
];

export default function AboutPage() {
  const [showLetter, setShowLetter] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ scale: heroImgScale }} className="absolute inset-0">
          <Image
            src="/images/about_heros.png"
            alt="Global trade operations"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/20" />

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="block text-sky-400/90 text-xs font-semibold uppercase mb-6"
          >
            Alight International — Est. 2015, Singapore
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Built for <span className="text-sky-400 italic">Global</span> Commerce.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Powering enterprise-grade supply chains across 60+ countries — with the speed,
            compliance, and intelligence that global trade demands.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Metrics Strip ─────────────────────────────────────────── */}
      <section className="bg-slate-900 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { to: 60, suffix: "+", label: "Countries Served" },
            { to: 2400, suffix: "+", label: "Enterprise Clients" },
            { to: 98, suffix: "%", label: "On-time Delivery Rate" },
            { to: 15, suffix: "+", label: "Years of Expertise" }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-bold text-sky-400">
                <Counter to={s.to} suffix={s.suffix} />
              </span>
              <span className="text-[11px] uppercase tracking-wider text-white/50">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ──────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-sky-600 font-bold uppercase tracking-[0.2em] text-xs">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              A decade of moving goods that <span className="text-sky-600 italic">move markets.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Founded in 2015, Alight International was born from a singular frustration:
              global trade was too complex, too opaque, and too slow for growing enterprises.
              We built the infrastructure to change that.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Today, we orchestrate end-to-end supply chains for over 2,400 clients spanning
              manufacturing, retail, FMCG, and industrial sectors — delivering predictability
              at scale, every time.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/small_village.png"
              alt="Global operations center"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 md:pl-0">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-sky-200 -translate-x-1/2" />
          <div className="space-y-12 md:space-y-0">
            {journey.map((j, i) => (
              <motion.div
                key={j.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className={`md:flex md:items-center md:gap-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } relative md:py-8`}
              >
                <div className="md:w-1/2 md:px-10">
                  <div className={`border-l-2 md:border-l-0 border-sky-300 pl-4 md:pl-0 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="text-sky-600 font-bold text-2xl">{j.year}</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">{j.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{j.text}</p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-0 justify-center">
                  <div className="w-3 h-3 rounded-full bg-sky-500 ring-4 ring-sky-100 absolute left-1/2 -translate-x-1/2" />
                </div>
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values Grid ──────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sky-600 font-bold uppercase tracking-[0.2em] text-xs">What we stand for</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">Our Core Principles</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mx-auto" />
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                Icon: Globe,
                title: "Global Reach, Local Expertise",
                desc: "Operating in 60+ countries with on-the-ground intelligence that keeps your supply chain compliant and resilient."
              },
              {
                Icon: ShieldCheck,
                title: "Compliance-First Approach",
                desc: "Every corridor we operate in is fully audited — trade compliance, ESG standards, and customs regulations built into every step."
              },
              {
                Icon: Zap,
                title: "Speed & Agility",
                desc: "From RFQ to delivery, our streamlined workflows cut lead times by up to 40% compared to traditional freight models."
              },
              {
                Icon: TrendingUp,
                title: "Data-Driven Decisions",
                desc: "Our platform delivers real-time analytics on spend, risk, supplier performance, and market pricing — always on, always current."
              },
              {
                Icon: Users,
                title: "Dedicated Account Teams",
                desc: "Every enterprise client gets a dedicated supply chain manager with deep category and regional expertise."
              },
              {
                Icon: BarChart2,
                title: "Transparent Pricing",
                desc: "No hidden fees, no opaque margins. Our open-book pricing model ensures you always know where your money goes."
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                className="bg-slate-50 p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-sky-200 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                  <value.Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Leadership Banner ────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-slate-900">
        <div className="absolute top-[-10%] left-[-10%] w-[30%] aspect-square rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35%] aspect-square rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight italic tracking-wide max-w-3xl">
            "The best supply chain is one your customers never have to think about — seamless, reliable, invisible."
          </h2>

          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl max-w-xl shadow-2xl flex flex-col items-center gap-4 transition-all duration-300 hover:border-sky-400/30"
          >
            <div className="flex flex-col items-center">
              <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">Our CEO</span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 rounded-full bg-white/10 border-2 border-sky-400/40 p-1 mb-4 flex items-center justify-center overflow-hidden shadow-lg"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
                  <Image src="/images/logo.png" alt="CEO" width={48} height={48} className="object-contain" />
                </div>
              </motion.div>
              <span className="text-2xl font-bold uppercase tracking-widest text-white">Rajiv Mehta</span>
              <span className="text-white/50 text-xs tracking-wider mt-1">Chief Executive Officer</span>
            </div>

            <AnimatePresence mode="wait">
              {!showLetter ? (
                <motion.button
                  key="read-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowLetter(true)}
                  className="mt-4 px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  Read CEO Letter <ChevronRight className="w-3.5 h-3.5" />
                </motion.button>
              ) : (
                <motion.div
                  key="letter-body"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden flex flex-col items-center"
                >
                  <p className="text-white/80 text-sm font-light leading-relaxed text-center mt-4 max-w-md italic border-t border-white/10 pt-6">
                    "Global trade is the engine of prosperity. At Alight International, we've spent a decade removing the friction that slows that engine down — from customs complexity to supplier qualification. Our mission is to give every enterprise the supply chain capability once reserved for the world's largest corporations."
                  </p>
                  <button
                    onClick={() => setShowLetter(false)}
                    className="mt-6 text-sky-400 hover:text-sky-300 text-xs font-bold uppercase tracking-widest underline decoration-dotted transition-colors"
                  >
                    Close Letter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Call to Action ───────────────────────────────────────── */}
      <section className="py-24 text-center px-6 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-8" />
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
            Ready to Modernize Your Supply Chain?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={ROUTES.BULK_ORDERS || "/bulk-orders"}
              className="px-10 py-4 bg-sky-600 text-white font-bold rounded-full hover:bg-sky-700 transition-all transform hover:scale-105 shadow-xl inline-block"
            >
              Request a Demo
            </Link>
            <Link
              href={ROUTES.IMPACT}
              className="px-10 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              View Impact Report
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}