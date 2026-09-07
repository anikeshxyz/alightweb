"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search, User, ShoppingCart, ChevronDown, Heart,
  LogOut, Menu, X, Globe, Sparkles, Phone, FileText,
  ShieldCheck, LayoutGrid, ArrowRight, CheckCircle2,
  Package, Box, Bath, Shirt, Wrench, Layers, Award,
  Compass, ExternalLink, SlidersHorizontal, Flame, Lock
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { ROUTES, NAV_LINKS } from "@/lib/routes";

const REGIONS = [
  { name: "India (INR)", code: "INR", symbol: "₹" },
  { name: "United States (USD)", code: "USD", symbol: "$" },
];

const CATEGORY_META = {
  "Modular Kitchen": {
    icon: LayoutGrid,
    desc: "Engineered SS 304 wire pull-outs, corner carousels & heavy baskets",
    badge: "Flagship Line",
    highlightImg: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    features: ["Heavy-Gauge SS 304", "Smooth Soft-Close", "Zero-Rust Finish"],
  },
  "Kitchen Storage": {
    icon: Box,
    desc: "Modular wall shelves, sliding drawers & high-capacity pantry racks",
    badge: "Bestseller",
    highlightImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    features: ["Max Space Efficiency", "Quick Installation", "Precision Welded"],
  },
  "Tabletop & Cutlery": {
    icon: Package,
    desc: "Architectural spoon stands, cup holders, tissue & cutlery organizers",
    badge: "New Release",
    highlightImg: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80",
    features: ["Mirror Chrome Luster", "Countertop Ready", "Anti-Scratch Base"],
  },
  "Bathroom Fixtures": {
    icon: Bath,
    desc: "Commercial-grade SS folding towel racks & shower corner caddies",
    badge: "SS 304 Certified",
    highlightImg: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
    features: ["100% Moisture Proof", "Hotel Luxury Grade", "Concealed Mounts"],
  },
  "Wardrobe Accessories": {
    icon: Shirt,
    desc: "Soft-close sliding trouser racks, tie organizers & pull-out baskets",
    badge: "Executive",
    highlightImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    features: ["Full Extension Slides", "Velvet Non-Slip Lining", "Modular Fit"],
  },
  "Wire Products": {
    icon: Wrench,
    desc: "Heavy-duty wire storage racks & under-desk utility wire baskets",
    badge: "Industrial Strength",
    highlightImg: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
    features: ["High Load Capacity", "Multi-Utility Design", "Reinforced Mesh"],
  },
};

const POPULAR_SEARCH_TAGS = [
  "Pantry Pull-Outs",
  "Plain Baskets",
  "Spice Racks",
  "Corner Units",
  "Folding Towel Rack",
  "Cutlery Stands",
  "Cylinder Trolley",
];

export default function Navigation() {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef(null);

  const { currency, changeCurrency } = useCurrency();
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const { wishlistTotal } = useWishlist();
  const cartCount = getCartCount();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 80) {
        setActiveMegaMenu(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setActiveMegaMenu(null);
        setUserDropdownOpen(false);
        setCurrencyOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search input auto-focus
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#currency-dropdown-btn") && !e.target.closest("#currency-dropdown-menu")) {
        setCurrencyOpen(false);
      }
      if (!e.target.closest("#user-dropdown-btn") && !e.target.closest("#user-dropdown-menu")) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Route changes close dropdowns & drawers
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setSearchOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (href) => {
    if (href === ROUTES.HOME) return pathname === href;
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      {/* ── 1. Top Utility Ribbon ────────────────────────────────────── */}
      <div className="w-full bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Manufacturing & Certified Trust Badges */}
          <div className="flex items-center gap-3 md:gap-5 text-[11px]">
            <div className="inline-flex items-center gap-2 font-semibold text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="tracking-wide">ALIGHT™ Direct Manufacturing</span>
            </div>
            
            <span className="text-slate-700 hidden sm:inline">•</span>
            
            <div className="text-slate-400 hidden sm:flex items-center gap-1.5 font-medium">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>100% SS 304 Grade Stainless Steel</span>
            </div>
          </div>

          {/* Right: Helpline, Quick Links & Currency Selector */}
          <div className="flex items-center gap-4 md:gap-6 text-[11px]">
            <Link
              href={ROUTES.CONTACT}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <Phone size={12} className="text-red-400" />
              <span className="hidden md:inline">Helpline:</span>
              <span>+91 98765 43210</span>
            </Link>

            <span className="text-slate-700">•</span>

            {/* Currency selector */}
            <div className="relative">
              <button
                id="currency-dropdown-btn"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white font-medium transition-colors cursor-pointer py-0.5"
                aria-label="Select Currency"
              >
                <Globe size={12} className="text-red-400" />
                <span className="font-semibold">{currency}</span>
                <ChevronDown size={10} className={`transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
              </button>

              {currencyOpen && (
                <div
                  id="currency-dropdown-menu"
                  className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 backdrop-blur-md"
                >
                  <div className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-800">
                    Select Currency
                  </div>
                  {REGIONS.map((r) => (
                    <button
                      key={r.code}
                      onClick={() => { changeCurrency(r.code); setCurrencyOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors mt-1 cursor-pointer ${
                        currency === r.code ? "bg-red-600/20 text-red-400 font-bold" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span>{r.name}</span>
                      <span className="font-mono text-slate-400 font-bold">{r.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── 2. Main Sticky Navigation Header ─────────────────────────── */}
      <header
        className={`w-full sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/5 border-b border-slate-200/90 py-2.5"
            : "bg-white border-b border-slate-200/80 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* ── Brand Logo ─────────────────────────────────────────── */}
          <div className="flex items-center shrink-0">
            <BrandLogo variant="light" size="default" />
          </div>

          {/* ── Desktop Nav Links (Interactive Mega Menus) ─────────── */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              const hasMega = item.children && item.children.length > 0;
              const meta = CATEGORY_META[item.name];
              const isMenuOpen = activeMegaMenu === item.name;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasMega && setActiveMegaMenu(item.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-bold tracking-tight transition-all duration-200 relative group
                      ${active
                        ? "text-red-600 bg-red-50/90 shadow-xs"
                        : "text-slate-800 hover:text-red-600 hover:bg-slate-50"}
                    `}
                  >
                    <span>{item.name}</span>
                    {hasMega && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          isMenuOpen ? "rotate-180 text-red-600" : "text-slate-400 group-hover:text-red-600"
                        }`}
                      />
                    )}
                  </Link>

                  {/* ── Desktop Mega Menu Dropdown ────────────────── */}
                  {hasMega && isMenuOpen && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[760px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-slate-900/5"
                    >
                      <div className="grid grid-cols-12 gap-6 items-stretch">
                        
                        {/* Left Column: Subcategory Grid (8 cols) */}
                        <div className="col-span-8 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                              <div className="flex items-center gap-2">
                                {meta?.icon && (
                                  <div className="w-6 h-6 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                                    <meta.icon size={14} />
                                  </div>
                                )}
                                <div>
                                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                                    {item.name} Categories
                                  </span>
                                  <span className="text-[11px] text-slate-400 ml-2 font-normal">
                                    ({item.children.length} collections)
                                  </span>
                                </div>
                              </div>
                              <Link
                                href={item.href}
                                className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group/all"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <span>View All</span>
                                <ArrowRight size={12} className="group-hover/all:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>

                            <div className={`grid ${item.children.length > 6 ? "grid-cols-2" : "grid-cols-2"} gap-2`}>
                              {item.children.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setActiveMegaMenu(null)}
                                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-red-600 hover:bg-red-50/70 transition-all duration-200 group/sub border border-transparent hover:border-red-100"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/sub:bg-red-500 group-hover/sub:scale-125 transition-all shrink-0" />
                                  <span className="line-clamp-1">{sub.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Category trust bar at bottom of menu */}
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <ShieldCheck size={12} className="text-emerald-500" />
                              SS 304 Nickel-Chrome Guarantee
                            </span>
                            <Link
                              href={ROUTES.COLLECTIONS}
                              onClick={() => setActiveMegaMenu(null)}
                              className="text-slate-600 hover:text-red-600 font-semibold transition-colors"
                            >
                              Explore Master Catalog →
                            </Link>
                          </div>
                        </div>

                        {/* Right Column: Featured Spotlight Card (4 cols) */}
                        <div className="col-span-4 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-xl p-4 text-white flex flex-col justify-between relative overflow-hidden shadow-inner">
                          {/* Radial Glow */}
                          <div className="absolute top-0 right-0 w-36 h-36 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

                          <div>
                            {meta?.badge && (
                              <span className="inline-block px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md mb-2.5 shadow-xs">
                                {meta.badge}
                              </span>
                            )}
                            <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">{item.name}</h4>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-normal mb-3">
                              {meta?.desc || "Certified commercial grade accessories with export quality finish."}
                            </p>

                            {/* Features list */}
                            {meta?.features && (
                              <div className="space-y-1.5 mb-2">
                                {meta.features.map((feat, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                                    <CheckCircle2 size={11} className="text-red-400 shrink-0" />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-800/80">
                            <Link
                              href={item.href}
                              onClick={() => setActiveMegaMenu(null)}
                              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-red-950/40 hover:scale-[1.02]"
                            >
                              <span>Shop {item.name.split(" ")[0]}</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── Right Action Controls ─────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-2.5">

            {/* Quick Search Trigger Input */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100/90 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 text-xs font-medium transition-all duration-200 border border-transparent hover:border-slate-200 group cursor-pointer"
                aria-label="Search catalog"
              >
                <Search size={14} className="text-slate-500 group-hover:text-red-600 transition-colors" />
                <span className="hidden md:inline text-slate-500 font-normal">Search products…</span>
                <span className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200/80 shadow-2xs">
                  ⌘K
                </span>
              </button>

              {/* Expandable Search Modal Popover */}
              {searchOpen && (
                <div
                  className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 animate-in fade-in duration-150"
                  onClick={() => setSearchOpen(false)}
                >
                  <div
                    className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 p-4 sm:p-5 border-b border-slate-100">
                      <Search size={22} className="text-red-600 shrink-0" />
                      <input
                        ref={searchRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search modular kitchen, wire baskets, bathroom racks, organizers…"
                        className="w-full text-base font-medium outline-none text-slate-900 placeholder-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setSearchOpen(false)}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </form>

                    <div className="p-5 bg-slate-50/80">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                        <Flame size={13} className="text-red-500" />
                        Popular Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_SEARCH_TAGS.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => {
                              router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(term)}`);
                              setSearchOpen(false);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-red-500 hover:text-red-600 hover:shadow-xs transition-all cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <Link
              href={ROUTES.WISHLIST}
              className="p-2.5 rounded-full text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-all relative group"
              aria-label="Saved items"
            >
              <Heart size={19} className="group-hover:scale-110 transition-transform" />
              {wishlistTotal > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistTotal}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <Link
              href={ROUTES.CART}
              className="p-2.5 rounded-full text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-all relative group"
              aria-label="Cart"
            >
              <ShoppingCart size={19} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* User Account Dropdown */}
            <div className="relative hidden md:block">
              <button
                id="user-dropdown-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-all cursor-pointer"
                aria-label="User Account"
              >
                {user ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors">
                    <User size={18} />
                  </div>
                )}
              </button>

              {userDropdownOpen && (
                <div
                  id="user-dropdown-menu"
                  className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ring-1 ring-slate-900/5"
                >
                  {user ? (
                    <>
                      <div className="px-3 py-2.5 bg-slate-50 rounded-xl mb-2">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href={ROUTES.PROFILE}
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      >
                        Account Dashboard
                      </Link>
                      <Link
                        href={ROUTES.WISHLIST}
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      >
                        Saved Wishlist
                      </Link>
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        onClick={() => { logout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="p-2 space-y-3">
                      <div>
                        <p className="text-xs font-bold text-slate-900">Welcome to ALIGHT™</p>
                        <p className="text-[11px] text-slate-500">Access exclusive trade discounts & orders</p>
                      </div>
                      <Link
                        href={ROUTES.LOGIN}
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full text-center py-2.5 bg-slate-900 hover:bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>
      </header>

      {/* ── 3. Mobile Navigation Drawer ──────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs xl:hidden animate-in fade-in duration-200">
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
            
            {/* Mobile Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <BrandLogo variant="light" size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              
              {/* Account Quick Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                {user ? (
                  <div>
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.email}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-bold text-slate-900">Welcome Guest</p>
                    <p className="text-[10px] text-slate-400">Sign in for saved items & orders</p>
                  </div>
                )}
                <Link
                  href={user ? ROUTES.PROFILE : ROUTES.LOGIN}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-xl hover:bg-red-600 transition-colors"
                >
                  {user ? "Profile" : "Sign In"}
                </Link>
              </div>

              {/* Categories Accordion */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5 px-1">
                  Product Categories
                </p>
                <div className="space-y-1">
                  {NAV_LINKS.map((item) => {
                    const isExpanded = mobileExpandedCat === item.name;
                    const hasChildren = item.children && item.children.length > 0;
                    const meta = CATEGORY_META[item.name];

                    return (
                      <div key={item.name} className="border-b border-slate-100 last:border-none">
                        <div className="flex items-center justify-between py-2.5">
                          <Link
                            href={item.href}
                            onClick={() => !hasChildren && setMobileMenuOpen(false)}
                            className="text-sm font-bold text-slate-800 hover:text-red-600 flex items-center gap-2"
                          >
                            {meta?.icon && <meta.icon size={15} className="text-red-600" />}
                            <span>{item.name}</span>
                          </Link>
                          {hasChildren && (
                            <button
                              onClick={() => setMobileExpandedCat(isExpanded ? null : item.name)}
                              className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
                              aria-label="Expand category"
                            >
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-red-600" : ""}`}
                              />
                            </button>
                          )}
                        </div>

                        {hasChildren && isExpanded && (
                          <div className="pl-4 pb-3 space-y-2 bg-slate-50/60 rounded-xl p-2.5 mb-2">
                            {item.children.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-red-600 py-1 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                <span>{sub.name}</span>
                              </Link>
                            ))}
                            <div className="pt-2 border-t border-slate-200/60">
                              <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1"
                              >
                                <span>Browse full {item.name} series</span>
                                <ArrowRight size={11} />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Company & Support Links */}
              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs font-semibold text-slate-700">
                <Link
                  href={ROUTES.COLLECTIONS}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-red-600 transition-colors"
                >
                  All Collections
                </Link>
                <Link
                  href={ROUTES.ABOUT}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-red-600 transition-colors"
                >
                  About ALIGHT™ Direct
                </Link>
                <Link
                  href={ROUTES.CONTACT}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-red-600 transition-colors"
                >
                  Contact & Factory Support
                </Link>
                <Link
                  href={ROUTES.SHIPPING}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-red-600 transition-colors"
                >
                  Shipping & Logistics
                </Link>
              </div>

            </div>

            {/* Mobile Footer with Helpline */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="font-semibold">ISO 9001 Certified</span>
              </div>
              <a
                href="tel:+919876543210"
                className="font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <Phone size={12} />
                <span>Call Support</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
