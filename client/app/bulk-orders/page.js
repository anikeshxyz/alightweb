"use client";
import React, { useState } from "react";
import { Mail, Phone, Building, User, FileText, Send, Globe, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productCategory: "",
    annualVolume: "",
    originCountry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enterprise Inquiry:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Send size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Inquiry Received!</h2>
          <p className="text-slate-600 text-center max-w-md mb-8">
            Thank you for your interest in partnering with Alight International.
            Our enterprise solutions team will review your requirements and respond within 24–48 business hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sky-600 font-bold hover:underline"
          >
            Submit another inquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="inline-block text-sky-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">Enterprise Solutions</span>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Request a Quote</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Alight International offers bespoke sourcing, procurement, and logistics solutions
          for enterprise clients. Tell us about your requirements and we'll design the right solution.
        </p>
      </div>

      {/* ── Value Propositions ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { Icon: Globe, title: "60+ Countries", desc: "Global sourcing network" },
            { Icon: ShieldCheck, title: "Fully Compliant", desc: "ESG & trade law adherence" },
            { Icon: TrendingUp, title: "40% Cost Savings", desc: "vs. traditional procurement" },
            { Icon: Zap, title: "48hr Response", desc: "On all enterprise inquiries" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <item.Icon size={22} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
              <p className="text-slate-500 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Main Form Card ──────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-5 h-full">
            {/* Left Panel: Contact Info */}
            <div className="md:col-span-2 bg-slate-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Why Partner With Alight?</h3>
                <p className="text-white/60 text-sm mb-8">Trusted by 2,400+ enterprise clients across 60 countries.</p>
                <ul className="space-y-4 text-white/80 text-sm">
                  {[
                    "End-to-end supply chain management",
                    "Dedicated enterprise account team",
                    "Real-time platform visibility",
                    "Multi-currency settlement & invoicing",
                    "White-glove onboarding support",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-12">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">Direct Contact</h4>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-sky-400" />
                    <span>enterprise@alightintl.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-sky-400" />
                    <span>+65 6800 1201</span>
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
            </div>

            {/* Right Panel: Form */}
            <div className="md:col-span-3 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Enterprise Inquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none text-sm"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Company Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none text-sm"
                        placeholder="Acme Corp Ltd."
                        value={formData.company}
                        onChange={handleChange}
                      />
                      <Building size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Business Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none text-sm"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <Mail size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none text-sm"
                        placeholder="+1 555 000 0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <Phone size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Product Category</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="productCategory"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none text-sm"
                        placeholder="e.g. Electronics, Textiles, FMCG"
                        value={formData.productCategory}
                        onChange={handleChange}
                      />
                      <FileText size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Estimated Annual Volume</label>
                    <select
                      name="annualVolume"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none text-sm text-slate-700"
                      value={formData.annualVolume}
                      onChange={handleChange}
                    >
                      <option value="">Select range</option>
                      <option>Under $500K</option>
                      <option>$500K – $2M</option>
                      <option>$2M – $10M</option>
                      <option>$10M – $50M</option>
                      <option>$50M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Message / Requirements</label>
                  <textarea
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none resize-none text-sm"
                    placeholder="Describe your sourcing needs, target markets, or any specific compliance/logistics requirements..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-sky-600/20 hover:bg-sky-700 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-widest text-sm"
                >
                  Submit Enterprise Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
