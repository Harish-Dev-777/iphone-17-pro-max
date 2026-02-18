"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelCanvas from "./ModelCanvas";

gsap.registerPlugin(ScrollTrigger);

// Canvas position keyframes per section (CSS values)
const CANVAS_KEYFRAMES = {
  desktop: [
    { top: "0vh", left: "50%", xPercent: -50 }, // S1: centered
    { top: "10vh", left: "65%", xPercent: -50 }, // S2: right
    { top: "10vh", left: "20%", xPercent: -50 }, // S3: left
    { top: "10vh", left: "65%", xPercent: -50 }, // S4: text left, model right
    { top: "10vh", left: "20%", xPercent: -50 }, // S5: text right, model left
  ],
  mobile: [
    { top: "0vh", left: "50%", xPercent: -50 }, // All centered on mobile
    { top: "15vh", left: "50%", xPercent: -50 },
    { top: "15vh", left: "50%", xPercent: -50 },
    { top: "20vh", left: "50%", xPercent: -50 },
    { top: "10vh", left: "50%", xPercent: -50 },
  ],
};

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !canvasWrapperRef.current) return;

      const wrapper = canvasWrapperRef.current;
      const mm = gsap.matchMedia();

      // Scroll progress is the same for both
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions as any;
          const kfs = isMobile
            ? CANVAS_KEYFRAMES.mobile
            : CANVAS_KEYFRAMES.desktop;
          const sections = containerRef.current!.querySelectorAll("section");

          sections.forEach((section, i) => {
            const kf = kfs[i];
            ScrollTrigger.create({
              trigger: section,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
              onEnter: () => {
                gsap.to(wrapper, {
                  top: kf.top,
                  left: kf.left,
                  xPercent: kf.xPercent,
                  duration: 1.2,
                  ease: "power2.inOut",
                });
              },
              onEnterBack: () => {
                gsap.to(wrapper, {
                  top: kf.top,
                  left: kf.left,
                  xPercent: kf.xPercent,
                  duration: 1.2,
                  ease: "power2.inOut",
                });
              },
            });
          });
        },
      );

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative bg-black text-white">
      {/* Fixed 3D Canvas — overlays all sections */}
      <ModelCanvas ref={canvasWrapperRef} scrollProgress={scrollProgress} />

      {/* ─── Section 1: Hero ─── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-6">
        <div className="z-20 text-center max-w-4xl">
          <p className="text-white/40 font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6">
            Introducing
          </p>
          <h1 className="font-poppins font-bold text-6xl md:text-[10rem] leading-none tracking-tighter text-white mb-6">
            iPhone 17
            <br />
            <span className="text-white/30">Pro Max</span>
          </h1>
          <p className="text-white/50 font-sans text-lg md:text-2xl max-w-xl mx-auto leading-relaxed">
            Revolutionary performance. Unmatched design.
          </p>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/30">
          <span className="font-sans text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-white/20" />
        </div>
      </section>

      {/* ─── Section 2: Design ─── */}
      <section className="relative w-full h-screen flex flex-col md:flex-row items-center bg-[#0a0a0a] border-t border-white/5 overflow-hidden px-6 md:px-0">
        <div className="z-20 w-full md:w-1/2 md:pl-28 flex flex-col gap-6 md:gap-8 justify-center h-full">
          <p className="text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
            Design
          </p>
          <h2 className="font-poppins font-bold text-4xl md:text-7xl leading-tight text-white">
            Refined.
            <br />
            Reinvented.
          </h2>
          <p className="text-white/50 font-sans text-base md:text-xl leading-relaxed max-w-sm">
            Titanium. Light. Strong. Pure.
          </p>
          <div className="space-y-3">
            <p className="text-white/40 font-sans text-xs md:text-sm tracking-widest uppercase">
              Available in
            </p>
            <div className="flex flex-wrap justify-center md:flex-col md:justify-start gap-x-4 gap-y-1">
              {[
                "Cosmic Black",
                "Silver Titanium",
                "Deep Blue",
                "Desert Gold",
              ].map((color) => (
                <span
                  key={color}
                  className="text-white font-poppins font-medium text-base md:text-lg"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
          <p className="hidden md:block text-white/30 font-sans text-sm italic">
            Precision-milled. Perfectly balanced.
          </p>
        </div>
      </section>

      {/* ─── Section 3: Display ─── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center md:flex-row md:items-center md:justify-end bg-black border-t border-white/5 overflow-hidden px-6 md:px-0">
        <div className="z-20 w-full md:w-1/2 md:pr-28 flex flex-col gap-6 md:gap-8 justify-center h-full text-center md:text-left items-center md:items-start">
          <p className="text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
            Display
          </p>
          <h2 className="font-poppins font-bold text-4xl md:text-7xl leading-tight text-white">
            See every
            <br />
            detail.
          </h2>
          <p className="text-white/50 font-sans text-base md:text-xl leading-relaxed max-w-sm md:ml-0">
            Super Retina XDR. ProMotion. Up to 2000 nits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 w-full md:max-w-md text-left">
            {[
              ["6.9″", "XDR Display"],
              ["2000", "Peak Nits"],
              ["120Hz", "ProMotion"],
              ["Always-On", "Mode"],
            ].map(([val, label]) => (
              <div
                key={label}
                className="border border-white/10 rounded-xl p-3 md:p-4"
              >
                <p className="font-poppins font-bold text-xl md:text-2xl text-white">
                  {val}
                </p>
                <p className="font-sans text-white/40 text-[10px] md:text-sm mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Performance ─── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center md:flex-row md:items-center bg-[#0a0a0a] border-t border-white/5 overflow-hidden px-6 md:px-0">
        <div className="z-20 w-full md:w-1/2 md:pl-28 flex flex-col gap-6 md:gap-8 justify-center h-full text-center md:text-left items-center md:items-start">
          <p className="text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
            Performance
          </p>
          <h2 className="font-poppins font-bold text-4xl md:text-8xl leading-tight text-white">
            A19 Pro.
            <br />
            <span className="text-white/30">Unstoppable.</span>
          </h2>
          <p className="text-white/50 font-sans text-base md:text-xl leading-relaxed max-w-sm">
            The fastest chip ever in a smartphone.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mt-4">
            {[
              "3nm Chip",
              "25% Faster CPU",
              "Next-gen GPU",
              "Neural Engine",
            ].map((tag) => (
              <span
                key={tag}
                className="border border-white/15 rounded-full px-4 md:px-5 py-1.5 md:py-2 text-white/60 font-sans text-[10px] md:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5: CTA ─── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center md:flex-row md:items-center md:justify-end bg-black border-t border-white/5 overflow-hidden px-6 md:px-0">
        <div className="z-20 w-full md:w-1/2 md:pr-28 flex flex-col gap-6 md:gap-10 justify-center h-full text-center md:text-left items-center md:items-start">
          <p className="text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
            Pro Camera
          </p>
          <h2 className="font-poppins font-bold text-4xl md:text-8xl leading-tight text-white">
            The next
            <br />
            era of photo.
          </h2>
          <p className="text-white/50 font-sans text-base md:text-xl leading-relaxed max-w-xl">
            50MP Fusion. 10× Optical Zoom. 8K Video.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 w-full sm:w-auto">
            <button className="bg-white text-black font-poppins font-semibold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
              Order Now
            </button>
            <button className="border border-white/20 text-white font-poppins font-medium text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
