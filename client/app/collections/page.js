"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/routes";
import { ArrowRight, Sparkles, Box, LayoutGrid, Package, Bath, Shirt, Wrench } from "lucide-react";

const collections = [
    {
        id: "modular-kitchen",
        name: "Modular Kitchen Accessories",
        description: "Pantry pull-outs, heavy-duty kitchen baskets, spice racks, bottle pull-outs, and corner units.",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
        count: "11 Sub-Lines",
        icon: LayoutGrid,
        color: "bg-sky-600"
    },
    {
        id: "kitchen-storage",
        name: "Kitchen Storage & Organization",
        description: "Wall-mount shelves, modular organizers, stainless steel trays, pull-out systems, and magic corners.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
        count: "5 Sub-Lines",
        icon: Box,
        color: "bg-blue-600"
    },
    {
        id: "tabletop-cutlery",
        name: "Cutlery & Tabletop Products",
        description: "Spoon stands, cup tree holders, napkin holders, rotating cutlery stands, fruit bowls and stands.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
        count: "6 Sub-Lines",
        icon: Package,
        color: "bg-indigo-600"
    },
    {
        id: "bathroom-fixtures",
        name: "Bathroom Fixtures & Accessories",
        description: "SS 304 folding towel racks, corner shower caddies, dual soap dishes, and heavy-duty robe hook strips.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
        count: "4 Sub-Lines",
        icon: Bath,
        color: "bg-teal-600"
    },
    {
        id: "wardrobe-accessories",
        name: "Wardrobe Accessories & Storage",
        description: "Stainless-steel sliding trouser racks, tie/belt pull-outs, and deep wire wardrobe drawers.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
        count: "3 Sub-Lines",
        icon: Shirt,
        color: "bg-cyan-600"
    },
    {
        id: "wire-products",
        name: "Wire Products & Home Furnishings",
        description: "Heavy-duty 4-tier mobile wire racks, under-desk cable management, and stackable wire baskets.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
        count: "3 Sub-Lines",
        icon: Wrench,
        color: "bg-slate-700"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function CollectionsPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* ── Hero Header ────────────────────────────────────────── */}
            <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-sky-100/50 opacity-60 blur-3xl pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <span className="inline-block px-3.5 py-1 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                        Product Catalogs
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        Commercial <span className="text-sky-600">Product Lines</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg font-normal leading-relaxed">
                        Explore Alight International's precision stainless-steel modular kitchen solutions, storage systems, bathroom fixtures, and wire home furnishings.
                    </p>
                </motion.div>
            </section>

            {/* ── Collections Grid ────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {collections.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                whileHover={{ y: -6 }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                                    
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold rounded-full border border-white/10">
                                            <IconComponent size={12} className="text-sky-400" />
                                            {item.count}
                                        </span>
                                    </div>
                                    
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white leading-tight drop-shadow-sm">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                                        {item.description}
                                    </p>
                                    
                                    <Link
                                        href={`${ROUTES.PRODUCT_CATEGORIES}/${item.id}`}
                                        className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-slate-50 hover:bg-sky-600 text-slate-800 hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 group/btn"
                                    >
                                        <span>View Products</span>
                                        <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>
        </div>
    );
}
