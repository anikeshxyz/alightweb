"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Shield, Eye, Lock, RefreshCw, HelpCircle, FileCheck, Globe } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function PrivacyPage() {
  const sections = [
    {
      id: "data-collection",
      title: "1. Information We Collect",
      icon: Eye,
      content: "We collect commercial and operational data provided directly to us during enterprise onboarding, procurement inquiries, platform registrations, or client support engagements. This includes corporate contact details, business entity identifiers, billing information, trade volume requirements, and authorized user credentials."
    },
    {
      id: "data-usage",
      title: "2. How We Use Your Information",
      icon: RefreshCw,
      content: "Collected data is utilized to administer enterprise accounts, fulfill international procurement orders, orchestrate logistics and customs clearance, generate multi-currency compliance documentation, and communicate platform updates. Aggregated operational telemetry helps us continuously optimize trade route efficiency."
    },
    {
      id: "data-security",
      title: "3. Data Sharing & Security Standards",
      icon: Lock,
      content: "Alight International never sells, rents, or monetizes client data. Information is shared strictly on a need-to-know basis with vetted financial institutions, customs authorities, and freight carriers to execute trade transactions. All data in transit and at rest is secured using enterprise-grade TLS 1.3 and AES-256 encryption."
    },
    {
      id: "compliance-rights",
      title: "4. Global Compliance & Enterprise Rights",
      icon: Shield,
      content: "We comply with international data protection frameworks including GDPR, PDPA (Singapore), and applicable enterprise trade privacy standards. Authorized enterprise representatives may request data audit logs, modifications, or deletion by contacting our Data Protection Officer at privacy@alightintl.com."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            Privacy <span className="text-sky-600 italic">Policy</span>
          </motion.h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Alight International is committed to enterprise data integrity, transparency, 
            and global regulatory compliance across every trade corridor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Legal & Governance</p>
              <Link href={ROUTES.SHIPPING} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Logistics & Fulfilment</Link>
              <Link href={ROUTES.PRIVACY} className="block px-6 py-3 bg-white shadow-sm border-l-4 border-sky-600 text-sky-700 font-bold rounded-r-xl">Privacy Policy</Link>
              <Link href={ROUTES.TERMS} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Terms of Service</Link>
              <Link href={ROUTES.CONTACT} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Corporate Enquiries</Link>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 space-y-10">
            {sections.map((section) => (
              <motion.section 
                key={section.id}
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
                    <section.icon size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-base">
                  {section.content}
                </p>
              </motion.section>
            ))}

            {/* Help Card */}
            <div className="bg-slate-900 text-white rounded-[1.5rem] p-8 md:p-10 text-center border border-slate-800 mt-16">
               <h2 className="text-2xl font-bold mb-4">Enterprise Data Protection & Governance</h2>
               <p className="text-slate-400 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
                 Need a signed Data Processing Addendum (DPA) or specific compliance certifications? 
                 Contact our corporate legal team.
               </p>
               <Link 
                href={ROUTES.CONTACT}
                className="inline-block px-8 py-3 bg-sky-600 text-white font-bold rounded-full hover:bg-sky-500 transition-all text-sm uppercase tracking-wider"
               >
                 Contact DPO Team
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
