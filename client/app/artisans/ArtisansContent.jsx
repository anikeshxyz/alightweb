"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Globe, ShieldCheck, Zap, BarChart2, TrendingUp } from "lucide-react";

const hubs = [
  {
    name: "South & Southeast Asia Hub",
    location: "Singapore / Mumbai",
    category: "Manufacturing & Sourcing",
    story: "Our largest sourcing network spans textile manufacturing, electronics assembly, and industrial goods across India, Bangladesh, Vietnam, and Thailand — all fully audited and ESG-compliant.",
    image: "/images/bamboo_cluster.png",
    tags: ["Manufacturing", "Sourcing"]
  },
  {
    name: "East Asia Procurement Hub",
    location: "Shanghai / Seoul",
    category: "High-Value Components",
    story: "Specialized procurement of precision-engineered components, consumer electronics, and advanced materials from China, South Korea, and Japan — with rigorous IP protection protocols.",
    image: "/images/moonj_cluster.png",
    tags: ["Components", "Technology"]
  },
  {
    name: "Middle East & Africa Hub",
    location: "Dubai / Nairobi",
    category: "Raw Materials & Commodities",
    story: "We manage raw material corridors across the Gulf and Sub-Saharan Africa, facilitating compliant commodity procurement and last-mile distribution for enterprise buyers.",
    image: "/images/rug_jharkhand.png",
    tags: ["Commodities", "Distribution"]
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function ArtisansPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/artisans_hero.png"
          alt="Global supply network"
          fill
          className="object-cover brightness-50 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sky-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Our Global Partner Network
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            The Hubs That <span className="text-sky-400 italic">Power</span> Trade.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl font-light opacity-90 max-w-3xl mx-auto leading-relaxed"
          >
            Alight International operates strategic sourcing and distribution hubs across
            three continents — giving enterprise clients reliable access to the world's most
            competitive manufacturing regions.
          </motion.p>
        </div>
      </section>

      {/* ── Global Sourcing Hubs ──────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Sourcing Hubs</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Each hub is a fully operational sourcing centre with dedicated procurement teams, compliance officers, and logistics coordinators on the ground.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {hubs.map((hub, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              viewport="viewport"
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={hub.image}
                  alt={hub.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {hub.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-sky-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-sky-600 mb-2">
                  <MapPin size={14} />
                  <span className="text-xs font-bold uppercase tracking-widest">{hub.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{hub.name}</h3>
                <span className="text-sky-600 font-semibold text-sm block mb-4 italic">{hub.category}</span>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {hub.story}
                </p>
                <button className="w-full py-3 bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-sky-600 hover:text-white transition-all">
                  View Hub Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Coverage Map ──────────────────────────────────────────── */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Image src="/images/lotus_icon.png" alt="" fill className="object-contain scale-150 rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Sourcing Across the <span className="text-sky-400">Globe</span>.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Our global network spans every major manufacturing corridor, ensuring you always
              have access to the most competitive pricing, fastest lead times, and
              highest compliance standards — regardless of where your goods originate.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "South & SE Asia", count: "28 Countries", detail: "Textiles, Electronics, Industrial" },
                { label: "East Asia", count: "5 Countries", detail: "Components, Tech, Precision Parts" },
                { label: "Middle East", count: "12 Countries", detail: "Commodities, Energy, Distribution" },
                { label: "Europe & Americas", count: "18 Countries", detail: "Premium Goods, Distribution" },
              ].map((region, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <h4 className="text-sky-400 font-bold mb-1">{region.label}</h4>
                  <p className="text-white text-xs mb-2 opacity-60 italic">{region.count}</p>
                  <p className="text-white text-sm font-medium">{region.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-sky-400/20 bg-black/40">
              <Image
                src="/images/india_craft_map.png"
                alt="Global trade network map"
                fill
                className="object-cover opacity-80 mix-blend-screen"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />

              {/* Interactive Region Markers */}
              {[
                { name: "Singapore Hub", top: "62%", left: "72%" },
                { name: "Dubai Hub", top: "44%", left: "54%" },
                { name: "Shanghai Hub", top: "38%", left: "78%" },
                { name: "Mumbai Hub", top: "52%", left: "60%" }
              ].map((loc, idx) => (
                <div
                  key={idx}
                  className="absolute group z-10 flex flex-col items-center justify-center cursor-pointer"
                  style={{ top: loc.top, left: loc.left, transform: 'translate(-50%, -50%)' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                    className="absolute w-8 h-8 bg-sky-400/50 rounded-full"
                  />
                  <div className="relative w-3 h-3 bg-sky-400 rounded-full border-2 border-slate-900 shadow-[0_0_15px_rgba(56,189,248,0.8)] group-hover:scale-150 transition-transform duration-300" />

                  {/* Tooltip */}
                  <div className="absolute mt-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-slate-900/90 text-sky-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg whitespace-nowrap border border-sky-400/30 backdrop-blur-md shadow-xl">
                    <span className="block mb-1 opacity-70 text-[8px] leading-none">Alight Hub</span>
                    {loc.name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Operational Process ────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sky-600 font-bold uppercase tracking-[0.2em] text-xs">How We Work</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3">Our Supply Chain Process</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              Icon: Globe,
              title: "Global Sourcing",
              desc: "We identify and qualify the best suppliers across our global network for your specific requirements."
            },
            {
              Icon: ShieldCheck,
              title: "Compliance Audit",
              desc: "Every supplier undergoes rigorous ethical, quality, and regulatory compliance audits."
            },
            {
              Icon: Zap,
              title: "Rapid Procurement",
              desc: "Streamlined RFQ-to-PO processes that cut lead times by up to 40% vs. traditional models."
            },
            {
              Icon: BarChart2,
              title: "Live Tracking",
              desc: "Real-time shipment tracking and performance analytics delivered to your dashboard."
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="text-center space-y-4"
            >
              <div className="w-20 h-20 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 border border-sky-100 hover:bg-sky-600 hover:text-white transition-colors duration-300">
                <item.Icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
