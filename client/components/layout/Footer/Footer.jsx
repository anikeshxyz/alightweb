"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Facebook, Instagram, Twitter, Linkedin,
  Mail, ArrowUpRight, ChevronUp, CheckCircle2,
  MapPin, Phone, Globe, ShieldCheck, Award
} from "lucide-react";
import { ROUTES } from "@/lib/routes";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white overflow-hidden pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* Brand & Mission (4 columns) */}
          <div className="md:col-span-4 space-y-6">
            <BrandLogo variant="dark" />

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              ALIGHT™ is a premier manufacturer and global supplier of high-precision stainless steel modular kitchen accessories, bathroom fixtures, wardrobe storage systems, and heavy-duty wire home furnishings.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400">Connect</span>
              <div className="h-px flex-1 bg-slate-800 max-w-[40px]" />
              <div className="flex gap-4">
                {[
                  { Icon: Linkedin, color: "hover:text-sky-400", href: "#", label: "LinkedIn" },
                  { Icon: Twitter, color: "hover:text-sky-400", href: "#", label: "Twitter" },
                  { Icon: Facebook, color: "hover:text-blue-500", href: "#", label: "Facebook" },
                  { Icon: Instagram, color: "hover:text-pink-400", href: "#", label: "Instagram" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={`Follow us on ${social.label}`}
                    className={`text-slate-500 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  >
                    <social.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Enterprise Solutions (2 columns) */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">Solutions</h4>
            <ul className="space-y-3.5">
              {[
                { name: "All Solutions", href: ROUTES.COLLECTIONS },
                { name: "Custom Sourcing", href: ROUTES.BULK_ORDERS },
                { name: "Global Operations", href: ROUTES.ABOUT },
                { name: "Catalog Search", href: ROUTES.SEARCH },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 text-xs tracking-wide hover:text-sky-400 hover:translate-x-1 transition-all flex items-center gap-2 group">
                    <span className="w-1 h-px bg-slate-700 group-hover:w-2 group-hover:bg-sky-400 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Support (2 columns) */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">Company & Legal</h4>
            <ul className="space-y-3.5">
              {[
                { name: "About Us", href: ROUTES.ABOUT },
                { name: "Contact & RFQ", href: ROUTES.CONTACT },
                { name: "Shipping Policy", href: ROUTES.SHIPPING },
                { name: "Privacy Policy", href: ROUTES.PRIVACY },
                { name: "Terms of Service", href: ROUTES.TERMS },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 text-xs tracking-wide hover:text-sky-400 hover:translate-x-1 transition-all flex items-center gap-2 group">
                    <span className="w-1 h-px bg-slate-700 group-hover:w-2 group-hover:bg-sky-400 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trade Briefing (4 columns) */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">Trade Intelligence</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Subscribe to receive updates on international product availability, trade logistics, and bespoke supply capabilities.
            </p>

            <form onSubmit={handleSubscribe} className="relative group">
              <div className="flex items-center border-b border-slate-700 focus-within:border-sky-400 transition-all py-2">
                <Mail size={16} className="text-slate-500 mr-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter corporate email"
                  className="bg-transparent border-none focus:outline-none text-xs flex-1 placeholder:text-slate-600 text-white"
                  required
                />
                <button
                  type="submit"
                  className="text-sky-400 hover:text-sky-300 transform transition-transform group-hover:translate-x-1"
                  aria-label="Submit newsletter subscription"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>

              {subscribed && (
                <div className="absolute top-full left-0 mt-2 flex items-center gap-2 text-sky-400 text-xs animate-in fade-in duration-300">
                  <CheckCircle2 size={14} />
                  <span>Thank you for subscribing to Alight International updates.</span>
                </div>
              )}
            </form>

            <div className="pt-3 space-y-2.5">
              <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                <Globe size={14} className="text-sky-400 shrink-0" />
                <span>Worldwide Fulfillment & Distribution Network</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                <ShieldCheck size={14} className="text-sky-400 shrink-0" />
                <span>Certified Enterprise Quality Assurance</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider & Social Bottom */}
        <div className="border-t border-slate-800/80 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-slate-400">
            <span>Global Trade</span>
            <span className="w-1 h-1 rounded-full bg-sky-500" />
            <span>Reliable Logistics</span>
            <span className="w-1 h-1 rounded-full bg-sky-500" />
            <span>Enterprise Quality</span>
          </div>

          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Alight International. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-sky-400 transition-colors group"
            aria-label="Scroll back to top"
          >
            Back to Top
            <div className="p-1.5 rounded-lg border border-slate-800 group-hover:border-sky-500 transition-all">
              <ChevronUp size={12} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

