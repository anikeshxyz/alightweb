"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Truck, RotateCcw, ShieldCheck, Box, Clock, HelpCircle, Anchor, Plane } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ShippingPage() {
  const sections = [
    {
      id: "shipping",
      title: "Global Logistics & Freight Corridors",
      icon: Truck,
      content: [
        { h: "Multi-Modal Freight Dispatch", p: "We coordinate full container load (FCL), less-than-container load (LCL), and expedited air cargo shipments across 60+ countries with tier-1 carrier alliances." },
        { h: "Customs Clearance & Documentation", p: "Every commercial dispatch includes automated bill of lading (B/L), certificates of origin, packing lists, and HS tariff compliance paperwork managed end-to-end." },
        { h: "Port-to-Door & Cross-Docking", p: "Through strategically located bonded hubs in Singapore, Shanghai, Rotterdam, and Los Angeles, we ensure minimal transit dwell times and rapid last-mile delivery." },
        { h: "Real-Time Container Telemetry", p: "Clients receive 24/7 GPS container status updates, temperature/humidity sensor tracking for sensitive goods, and automated ETA milestone alerts." }
      ]
    },
    {
      id: "returns",
      title: "Quality Assurance, Inspection & Claims",
      icon: ShieldCheck,
      content: [
        { h: "Pre-Shipment Verification", p: "100% of production runs undergo strict AQL II quality control inspection before container sealing, with digital QA certificates issued to buyers." },
        { h: "Transit Incident Protocols", p: "In the rare event of transit damage or port demurrage discrepancies, our logistics desk initiates expedited marine insurance and surveyor assessments within 48 hours." },
        { h: "Re-procurement & Credit Adjustments", p: "Verified quality or short-shipment claims are immediately resolved through replacement batch production, emergency airfreight dispatch, or commercial ledger credit." }
      ]
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
            Logistics & <span className="text-sky-600 italic">Fulfilment</span>
          </motion.h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base">
            Seamless cross-border freight solutions, end-to-end container visibility, 
            and enterprise supply chain execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Legal & Governance</p>
              <Link href={ROUTES.SHIPPING} className="block px-6 py-3 bg-white shadow-sm border-l-4 border-sky-600 text-sky-700 font-bold rounded-r-xl">Logistics & Fulfilment</Link>
              <Link href={ROUTES.PRIVACY} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Privacy Policy</Link>
              <Link href={ROUTES.TERMS} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Terms of Service</Link>
              <Link href={ROUTES.CONTACT} className="block px-6 py-3 text-slate-600 hover:text-sky-600 transition-all font-medium">Corporate Enquiries</Link>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 space-y-16">
            {sections.map((section) => (
              <motion.section 
                key={section.id}
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
                  <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600">
                    <section.icon size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">{section.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {section.content.map((item, i) => (
                    <div key={i} className="space-y-3">
                      <h3 className="text-lg font-bold text-slate-800">{item.h}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{item.p}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}

            {/* Help Card */}
            <div className="bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full group-hover:bg-sky-500/20 transition-all" />
               <Anchor className="mx-auto text-sky-400 mb-6" size={48} />
               <h2 className="text-3xl font-bold mb-4">Dedicated Logistics Control Tower</h2>
               <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                 Need custom Incoterms, charter flights, bonded warehousing, or bulk vessel bookings? 
                 Our global logistics coordinators are available 24/7.
               </p>
               <Link 
                href={ROUTES.CONTACT}
                className="inline-block px-10 py-4 bg-sky-600 text-white font-bold rounded-full hover:bg-sky-500 transition-all text-sm uppercase tracking-wider"
               >
                 Contact Freight Operations
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
