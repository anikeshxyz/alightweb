"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Leaf, ShieldCheck, BarChart2, TrendingUp, Zap } from "lucide-react";

// ─── Simple CountUp Hook ─────────────────────────────────────────────────────
function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    let totalMiliseconds = 2000;
    let incrementTime = (totalMiliseconds / end) * 2;
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}{suffix}</span>;
}

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function ImpactPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0">
          <Image
            src="/images/impacts_hero.png"
            alt="Global trade impact"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1.5 bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-[0.3em] rounded-full mb-8">
              Sustainability & Impact Report 2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight"
          >
            Trade That <span className="text-sky-400">Builds</span> the World.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-2xl text-white/70 font-light max-w-3xl mx-auto leading-relaxed"
          >
            We don't measure success in transactions alone. We measure it by the
            economic value created, the carbon avoided, and the livelihoods empowered
            across our global supply network.
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
        >
          <div className="w-px h-16 bg-gradient-to-t from-sky-500 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ── Dashboard Stats ──────────────────────────────────────── */}
      <section className="relative z-20 -mt-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center backdrop-blur-xl bg-white/90">
          {[
            { Icon: Globe, label: "Countries with Active Trade Lanes", value: "60", suffix: "+" },
            { Icon: TrendingUp, label: "Trade Volume Facilitated", value: "24", suffix: "B+" },
            { Icon: Leaf, label: "ESG-Compliant Supplier Base", value: "94", suffix: "%" },
            { Icon: BarChart2, label: "On-Time Delivery Performance", value: "98", suffix: "%" },
          ].map((stat, i) => (
            <div key={i} className="space-y-3">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.Icon size={24} />
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 border-b-2 border-sky-500/10 inline-block">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pillars of Impact ────────────────────────────────────── */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-32">
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport="viewport" className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900">
              Supplier <span className="text-sky-600">Development</span> Program.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Alight International runs a structured Supplier Development Program that
              actively builds capacity across our global network. Over 85% of our long-term
              suppliers have received formal capability-building support — from ISO certification
              guidance to lean manufacturing training.
            </p>
            <ul className="space-y-4">
              {[
                { icon: ShieldCheck, text: "ISO 9001 & ISO 14001 compliance support for all Tier-1 suppliers." },
                { icon: Zap, text: "Digital onboarding tools that reduce supplier setup time by 60%." },
                { icon: BarChart2, text: "Quarterly performance reviews with actionable improvement roadmaps." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
                    <item.icon size={12} />
                  </div>
                  <span className="text-slate-700 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <div className="relative group">
            <div className="absolute inset-0 bg-sky-600/10 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            <Image
              src="/images/women_led.png"
              alt="Supplier development"
              width={600}
              height={700}
              className="relative rounded-3xl shadow-lg z-10"
            />
          </div>
        </div>

        {/* ESG Pillar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center flex-row-reverse">
          <div className="order-2 md:order-1 relative group">
            <div className="absolute inset-0 bg-emerald-600/10 rounded-3xl -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            <Image
              src="/images/sustainables_banner.png"
              alt="ESG and sustainability"
              width={600}
              height={700}
              className="relative rounded-3xl shadow-lg z-10"
            />
          </div>
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport="viewport" className="space-y-8 order-1 md:order-2">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900">
              Our <span className="text-emerald-600">ESG</span> Commitment.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We embed Environmental, Social, and Governance standards at every layer of
              our operations. From carbon-neutral shipping options to ethical labour audits,
              our ESG framework ensures your supply chain aligns with global sustainability
              expectations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100">
                <p className="text-2xl font-bold text-sky-900 mb-1 leading-none">40%</p>
                <p className="text-xs uppercase tracking-widest text-sky-600 font-bold">Carbon Reduction in 3 Years</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-900 mb-1 leading-none">100%</p>
                <p className="text-xs uppercase tracking-widest text-emerald-600 font-bold">Ethical Audits Completed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Corporate Philosophy Quote ──────────────────────────────── */}
      <section className="bg-slate-900 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView">
            <span className="text-sky-500 font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white italic leading-relaxed mb-12">
              "The future of global trade is transparent, compliant, and sustainable.
              We are building that future — one supply chain at a time."
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-32 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-10">Choose Responsible Trade.</h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-12">Partner with a supply chain operator that holds itself to the same standards it requires of its suppliers.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-12 py-4 bg-sky-600 text-white font-bold rounded-full hover:bg-sky-700 transition-all shadow-xl shadow-sky-600/20">
            Request an ESG Report
          </button>
          <button className="px-12 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-50 transition-all">
            Speak to an Expert
          </button>
        </div>
      </section>
    </div>
  );
}
