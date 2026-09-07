"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Send,
  MessageSquare, Clock, Globe,
  Linkedin, Twitter
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", company: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/contact_hero.png"
          alt="Alight International contact"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/30" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-4"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Let's <span className="text-sky-400 italic">Connect</span>.
          </motion.h1>
          <p className="text-lg md:text-xl font-light opacity-80 max-w-2xl mx-auto">
            Whether you're ready to transform your supply chain or simply want to
            explore what's possible, our team is standing by.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* ── Contact Info (4 Columns) ────────────────────────── */}
          <div className="lg:col-span-4 space-y-12">
            <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Reach Our Team</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Global Helpdesk</p>
                    <p className="text-lg font-bold text-slate-800">+65 6800 1200</p>
                    <p className="text-sm text-slate-500">Mon – Fri, 8am – 8pm SGT</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email Us</p>
                    <p className="text-lg font-bold text-slate-800">hello@alightintl.com</p>
                    <p className="text-sm text-slate-500">We respond within 24 business hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-slate-700 group-hover:text-white transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Headquarters</p>
                    <p className="text-lg font-bold text-slate-800">1 Raffles Place</p>
                    <p className="text-sm text-slate-500">Singapore 048616</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {[Linkedin, Twitter, Globe].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Contact Form (8 Columns) ────────────────────────── */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-slate-500 mb-8 text-sm">Tell us about your business and supply chain needs — we'll get back to you with a tailored solution.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-sky-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corporation"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Business Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-sky-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Sourcing inquiry for Southeast Asia"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-sky-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    placeholder="Describe your supply chain requirements, annual volumes, or specific challenges..."
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-sky-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-5 rounded-full font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all
                    ${submitted
                      ? "bg-emerald-500 text-white"
                      : "bg-sky-600 text-white hover:bg-sky-700 active:scale-95"}
                  `}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : submitted ? (
                    "Message Sent — We'll Be in Touch!"
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── Contact Channels ────────────────────────────────────── */}
      <section className="bg-slate-900 py-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              Icon: Clock,
              title: "Order & Shipment Tracking",
              desc: "Check the live status of your active shipments or procurement orders via your client portal."
            },
            {
              Icon: MessageSquare,
              title: "Enterprise Enquiries",
              desc: "Have specific volume, category, or region requirements? Our sourcing team will prepare a custom brief."
            },
            {
              Icon: Globe,
              title: "B2B Partnerships",
              desc: "Explore co-investment, joint procurement, or logistics partnership opportunities with Alight International."
            },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer group">
              <item.Icon className="text-sky-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
