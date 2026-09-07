"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Gavel, Building2, CreditCard, ShieldCheck, ScrollText, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function TermsPage() {
  const sections = [
    {
      id: "terms-intro",
      title: "1. Acceptance of Enterprise Terms",
      icon: ScrollText,
      content: "By accessing or utilizing the procurement platform, services, or APIs provided by Alight International Pte. Ltd. ('Alight International', 'we', 'our'), your organization agrees to be bound by these Terms of Service and any applicable Master Services Agreements (MSA)."
    },
    {
      id: "procurement",
      title: "2. Commercial Procurement & Specifications",
      icon: Building2,
      content: "All trade orders and bulk procurement contracts are executed based on agreed product specifications, technical tolerances, and international quality standards. Pre-shipment inspection reports are provided for enterprise container orders prior to export dispatch."
    },
    {
      id: "settlement",
      title: "3. Pricing, Invoicing & Settlement",
      icon: CreditCard,
      content: "Commercial terms, Incoterms (FOB, CIF, DDP), and payment schedules are governed by your corporate trade agreements. Payments are processed in USD, EUR, GBP, SGD, or approved settlement currencies via secure SWIFT transfer, documentary letters of credit (L/C), or approved corporate lines."
    },
    {
      id: "fulfilment",
      title: "4. Shipment, Inspection & Claims",
      icon: ShieldCheck,
      content: "Claims regarding specification variances or transit damages must be filed within 14 calendar days of port delivery accompanied by surveyor reports. Alight International coordinates immediate remedies, replacements, or credit allocations per contractual SLAs."
    },
    {
      id: "governing-law",
      title: "5. Governing Law & Arbitration",
      icon: Gavel,
      content: "These terms and all commercial transactions shall be governed by and construed in accordance with the laws of Singapore. Any disputes arising hereunder shall be submitted to the exclusive jurisdiction of the Singapore International Arbitration Centre (SIAC)."
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
            Terms of <span className="text-sky-600 italic">Service</span>
          </motion.h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Commercial terms, governance protocols, and trade agreement frameworks 
            for Alight International clients and global partners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Legal & Governance</p>
              <Link href={ROUTES.SHIPPING} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Logistics & Fulfilment</Link>
              <Link href={ROUTES.PRIVACY} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Privacy Policy</Link>
              <Link href={ROUTES.TERMS} className="block px-6 py-3 bg-white shadow-sm border-l-4 border-sky-600 text-sky-700 font-bold rounded-r-xl">Terms of Service</Link>
              <Link href={ROUTES.CONTACT} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Corporate Enquiries</Link>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 space-y-8">
            {sections.map((section) => (
              <motion.section 
                key={section.id}
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
                    <section.icon size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed pl-14 text-base">
                  {section.content}
                </p>
              </motion.section>
            ))}

            {/* Help Card */}
            <div className="bg-slate-900 text-white rounded-[1.5rem] p-10 text-center mt-12 border border-slate-800">
               <HelpCircle className="mx-auto text-sky-400 mb-4" size={32} />
               <h3 className="text-xl font-bold mb-2">Custom Master Services Agreement (MSA)</h3>
               <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
                 High-volume enterprise accounts and multi-regional sourcing programs can be structured 
                 under custom MSAs and service level agreements.
               </p>
               <Link 
                href={ROUTES.CONTACT}
                className="inline-block px-10 py-3 bg-sky-600 text-white font-bold rounded-full hover:bg-sky-500 transition-all uppercase tracking-widest text-xs"
               >
                 Inquire with Legal Counsel
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
