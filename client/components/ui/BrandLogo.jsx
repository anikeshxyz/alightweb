"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrandLogo({ variant = "light", size = "default", className = "", showTagline = true }) {
  const isDark = variant === "dark"; // variant='dark' means on dark backgrounds

  const dimensions = {
    sm: { width: 170, height: 40 },
    default: { width: 220, height: 50 },
    lg: { width: 280, height: 64 },
  };

  const { width, height } = dimensions[size] || dimensions.default;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 shrink-0 group transition-all duration-300 ${className}`}
      aria-label="Alight - Kitchen, Bathroom and Wardrobe Accessories"
    >
      {/* Official Alight Delta Logo (Vector Render) */}
      <div className="flex items-center gap-3">
        {/* Emblem: Delta Triangle with Black/White Top + Red Bottom */}
        <div className="relative w-10 h-10 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top Apex (Black on light, White on dark) */}
            <path
              d="M 80 16 C 84 9 96 9 100 16 L 132 72 L 108 72 L 90 38 L 72 72 L 48 72 Z"
              fill={isDark ? "#FFFFFF" : "#111111"}
            />
            {/* Lower Left Leg & Base (Vibrant Red) */}
            <path
              d="M 48 72 L 24 116 C 19 125 26 136 36 136 L 108 136 C 115 136 120 131 120 124 C 120 117 115 112 108 112 L 56 112 L 72 72 Z"
              fill="#E51921"
            />
            {/* Lower Right Leg (Vibrant Red) */}
            <path
              d="M 132 72 L 152 108 C 157 117 153 128 144 133 C 135 137 126 133 122 124 L 108 72 Z"
              fill="#E51921"
            />
          </svg>
        </div>

        {/* Wordmark & Tagline */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1 leading-none">
            <span
              className={`text-2xl font-black tracking-[0.12em] font-sans transition-colors duration-300 ${
                isDark ? "text-white group-hover:text-red-400" : "text-slate-900 group-hover:text-red-600"
              }`}
            >
              ALIGHT
            </span>
            <span
              className={`text-[9px] font-black tracking-normal uppercase ${
                isDark ? "text-red-400" : "text-red-600"
              }`}
            >
              TM
            </span>
          </div>

          {showTagline && (
            <span
              className={`text-[7.5px] sm:text-[8.5px] font-semibold tracking-[0.14em] uppercase mt-1 leading-tight font-serif ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Kitchen, Bathroom &amp; Wardrobe
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
