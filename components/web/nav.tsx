"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { X, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const navlinks = [
    { id: 1, name: "Home", href: "#home" },
    { id: 2, name: "Design", href: "#design" },
    { id: 3, name: "Display", href: "#display" },
    { id: 4, name: "Performance", href: "#performance" },
    { id: 5, name: "Camera", href: "#camera" },
  ];

  useGSAP(
    () => {
      // Clear previous animations to prevent overlaps
      gsap.killTweensOf([overlayRef.current, linksRef.current]);

      if (isOpen) {
        // Opening animation - High performance settings
        gsap.to(overlayRef.current, {
          y: 0,
          duration: 0.7,
          ease: "power4.inOut",
          force3D: true, // Hardware acceleration
        });
        gsap.to(linksRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
          force3D: true,
        });
      } else {
        // Closing animation
        gsap.to(linksRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.in",
          force3D: true,
        });
        gsap.to(overlayRef.current, {
          y: "-100%",
          duration: 0.7,
          ease: "power4.inOut",
          delay: 0.15,
          force3D: true,
        });
      }
    },
    { dependencies: [isOpen], scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      {/* --- Main Header Navigation --- */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex items-center justify-between mix-blend-difference pointer-events-none">
        {/* Logo */}
        <div className="pointer-events-auto">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center p-2 transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="black" className="w-full h-full">
                <path d="M17.057 10.78c-.045-2.19 1.785-3.238 1.868-3.294-1.018-1.488-2.589-1.693-3.153-1.714-1.344-.136-2.618.794-3.303.794-.68 0-1.737-.775-2.854-.753-1.472.023-2.83.857-3.588 2.174-1.537 2.66-.39 6.59 1.1 8.75.733 1.054 1.597 2.235 2.73 2.194 1.096-.04 1.506-.7 2.827-.7 1.325 0 1.693.7 2.845.678 1.173-.018 1.93-1.07 2.66-2.133.847-1.235 1.196-2.433 1.215-2.492-.027-.01-.235-.088-.41-.16l.16-.062-.16.15zm-2.83-6.522c.607-.735 1.012-1.758.898-2.776-.874.036-1.928.583-2.553 1.31-.56.643-1.05 1.683-.918 2.678.975.076 1.96-.477 2.573-1.212z" />
              </svg>
            </div>
            <span className="text-white font-poppins font-bold tracking-tighter text-lg md:text-xl">
              iP17.
            </span>
          </Link>
        </div>

        {/* Center label (desktop only) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="px-5 py-2 border border-white/20 rounded-full backdrop-blur-xl bg-white/5 text-white/70 text-[10px] uppercase tracking-[0.4em] font-sans">
            Pro Max Series
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "default" }),
              "hidden sm:flex bg-white text-black hover:bg-white/90 rounded-full px-6 transition-all duration-300 border-none",
            )}
          >
            Buy Now
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-2 md:gap-4 text-white p-2 hover:opacity-80 transition-opacity"
          >
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.4em] font-sans">
              {isOpen ? "Close" : "Menu"}
            </span>
            <div className="relative w-6 h-6 flex flex-col items-center justify-center gap-1.5 transition-all">
              {isOpen ? (
                <X
                  size={24}
                  className="animate-in fade-in zoom-in duration-300"
                />
              ) : (
                <>
                  <span className="w-6 h-[1.5px] bg-white rounded-full group-hover:w-4 transition-all" />
                  <span className="w-6 h-[1.5px] bg-white rounded-full" />
                  <span className="w-6 h-[1.5px] bg-white rounded-full group-hover:w-4 transition-all" />
                </>
              )}
            </div>
          </button>
        </div>
      </header>

      {/* --- Full Screen Menu Overlay --- */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-[#050505] translate-y-[-100%] flex flex-col items-center justify-center px-6 will-change-transform"
      >
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="h-full w-px bg-white absolute left-1/4" />
          <div className="h-full w-px bg-white absolute left-1/2" />
          <div className="h-full w-px bg-white absolute left-3/4" />
          <div className="w-full h-px bg-white absolute top-1/4" />
          <div className="w-full h-px bg-white absolute top-1/2" />
          <div className="w-full h-px bg-white absolute top-3/4" />
        </div>

        <nav className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-16">
          {/* Main Links */}
          <ul className="flex flex-col gap-0">
            {navlinks.map((link, idx) => (
              <li key={link.id} className="overflow-hidden group">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  ref={(el) => {
                    linksRef.current[idx] = el;
                  }}
                  className="block font-poppins font-black text-[12vw] sm:text-[8vw] md:text-[6.5vw] leading-[1.05] text-white/20 hover:text-white transition-all duration-300 translate-y-[100%] opacity-0 group-hover:pl-4 will-change-transform"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Social / Contact Column */}
          <div className="flex flex-col items-end gap-10 md:text-right">
            <div className="space-y-4">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-sans">
                Connect
              </p>
              <div className="flex flex-col items-end gap-3">
                {["Instagram", "Twitter", "Youtube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="flex items-center gap-1 group text-white/50 hover:text-white text-lg transition-colors"
                  >
                    {social}
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-w-[200px] text-right">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-sans">
                Location
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                One Apple Park Way
                <br />
                Cupertino, CA 95014
              </p>
            </div>
          </div>
        </nav>

        {/* Bottom Bar */}
        <div className="absolute bottom-10 left-0 w-full px-6 md:px-12 flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-white/20 text-[10px] font-sans uppercase tracking-[0.4em]">
              Est. 2026
            </span>
            <p className="text-white/40 text-[11px] font-poppins">
              Titanium Edition.
            </p>
          </div>
          <div className="flex items-center gap-6 text-white/20 text-[10px] font-sans uppercase tracking-[0.4em]">
            <span className="hover:text-white/60 transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-white/60 transition-colors cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
