"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  {
    heading: "Explore",
    links: ["Home", "Design", "Display", "Performance", "Camera"],
  },
  {
    heading: "Shop",
    links: [
      "Order Now",
      "Compare Models",
      "Trade-In",
      "Financing",
      "Accessories",
    ],
  },
  {
    heading: "Support",
    links: ["Get Help", "AppleCare+", "Repair", "Contact Us", "Find a Store"],
  },
];

const SOCIAL_LINKS = [
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current || !wordmarkRef.current) return;

      // Reveal wordmark on scroll into view
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        },
      );

      // Stagger nav columns
      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative z-50 w-full bg-[#080808] text-white border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle gradient glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-10">
        {/* Giant wordmark */}
        <div ref={wordmarkRef} className="mb-16 md:mb-20">
          <p className="text-white/25 font-sans text-[10px] tracking-[0.4em] uppercase mb-3">
            Apple Inc.
          </p>
          <h2 className="font-poppins font-bold text-[clamp(3rem,12vw,9rem)] leading-none tracking-tighter text-white">
            iPhone 17
            <br />
            <span className="text-white/15">Pro Max</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.07] mb-14" />

        {/* Nav columns + tagline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          {NAV_LINKS.map((col) => (
            <div key={col.heading} className="footer-col flex flex-col gap-4">
              <p className="text-white/30 font-sans text-[10px] tracking-[0.35em] uppercase">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group relative inline-block text-white/60 font-sans text-sm hover:text-white transition-colors duration-300"
                    >
                      {link}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tagline column */}
          <div className="footer-col hidden lg:flex flex-col justify-between">
            <p className="text-white/20 font-poppins font-medium text-xl leading-snug">
              Revolutionary
              <br />
              performance.
              <br />
              <span className="text-white/10">Unmatched design.</span>
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-white/40 font-sans text-xs tracking-widest uppercase hover:text-white transition-colors duration-300"
            >
              Order Now
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.07] mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Legal */}
          <div className="flex flex-col gap-1.5">
            <p className="text-white/20 font-sans text-[11px] leading-relaxed max-w-lg">
              Copyright © 2025 Apple Inc. All rights reserved. |{" "}
              <a href="#" className="hover:text-white/50 transition-colors">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="hover:text-white/50 transition-colors">
                Terms of Use
              </a>{" "}
              |{" "}
              <a href="#" className="hover:text-white/50 transition-colors">
                Sales and Refunds
              </a>
            </p>
            <p className="text-white/10 font-sans text-[10px]">
              iPhone 17 Pro Max. Designed by Apple in California.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom strip */}
      <div className="sticky bottom-0 w-full bg-[#050505]/90 backdrop-blur-md border-t border-white/[0.05] px-6 md:px-12 lg:px-20 py-3 flex items-center justify-between z-50">
        <p className="text-white/20 font-sans text-[10px] tracking-widest uppercase">
          iPhone 17 Pro Max — 2025
        </p>
        <a
          href="#"
          className="group flex items-center gap-1.5 text-white/30 font-sans text-[10px] tracking-widest uppercase hover:text-white transition-colors duration-300"
        >
          Back to top
          <svg
            className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M8 12V4M4 8l4-4 4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
