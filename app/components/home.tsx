"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelCanvas from "./ModelCanvas";

gsap.registerPlugin(ScrollTrigger);

// Canvas position keyframes per section (CSS values)
const CANVAS_KEYFRAMES = [
  { top: "0vh", left: "50%", xPercent: -50 }, // S1: centered
  { top: "10vh", left: "65%", xPercent: -50 }, // S2: right
  { top: "10vh", left: "25%", xPercent: -50 }, // S3: left
  { top: "15vh", left: "50%", xPercent: -50 }, // S4: centered
  { top: "5vh", left: "50%", xPercent: -50 }, // S5: centered
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !canvasWrapperRef.current) return;

      const totalSections = 5;
      const wrapper = canvasWrapperRef.current;

      // Animate scroll progress (drives 3D model rotation via React state)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Animate canvas position per section using GSAP directly on DOM
      const sections = containerRef.current.querySelectorAll("section");
      sections.forEach((section, i) => {
        const kf = CANVAS_KEYFRAMES[i];
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

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative bg-black text-white">
      {/* Fixed 3D Canvas — overlays all sections */}
      <ModelCanvas ref={canvasWrapperRef} scrollProgress={scrollProgress} />

      {/* ─── Section 1: Hero ─── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        <div className="z-20 text-center px-6 max-w-4xl">
          <p className="text-white/40 font-sans text-sm tracking-[0.3em] uppercase mb-6">
            Introducing
          </p>
          <h1 className="font-poppins font-bold text-7xl md:text-[10rem] leading-none tracking-tighter text-white mb-6">
            iPhone 17
            <br />
            <span className="text-white/30">Pro Max</span>
          </h1>
          <p className="text-white/50 font-sans text-xl md:text-2xl max-w-xl mx-auto leading-relaxed">
            The most powerful iPhone ever made.
          </p>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="font-sans text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-white/20" />
        </div>
      </section>

      {/* ─── Section 2: Design ─── */}
      <section className="relative w-full h-screen flex items-center bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
        <div className="z-20 w-1/2 pl-16 md:pl-28 pr-8 flex flex-col gap-8">
          <p className="text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
            Design
          </p>
          <h2 className="font-poppins font-bold text-5xl md:text-7xl leading-tight text-white">
            Refined.
            <br />
            Reinvented.
          </h2>
          <p className="text-white/50 font-sans text-lg md:text-xl leading-relaxed max-w-sm">
            A seamless fusion of glass and aerospace-grade titanium. Thinner
            bezels. Lighter body. Stronger frame.
          </p>
          <div className="space-y-3">
            <p className="text-white/40 font-sans text-sm tracking-widest uppercase">
              Available in
            </p>
            <div className="flex flex-col gap-2">
              {[
                "Cosmic Black",
                "Silver Titanium",
                "Deep Blue",
                "Desert Gold",
              ].map((color) => (
                <span
                  key={color}
                  className="text-white font-poppins font-medium text-lg"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
          <p className="text-white/30 font-sans text-sm italic">
            Precision-milled. Perfectly balanced.
          </p>
        </div>
      </section>

      {/* ─── Section 3: Display ─── */}
      <section className="relative w-full h-screen flex items-center justify-end bg-black border-t border-white/5 overflow-hidden">
        <div className="z-20 w-1/2 pr-16 md:pr-28 pl-8 flex flex-col gap-8">
          <p className="text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
            Display
          </p>
          <h2 className="font-poppins font-bold text-5xl md:text-7xl leading-tight text-white">
            See every
            <br />
            detail.
          </h2>
          <p className="text-white/50 font-sans text-lg md:text-xl leading-relaxed max-w-sm">
            The Super Retina XDR display with ProMotion. Up to 2000 nits peak
            brightness. Always-On. Always stunning.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[
              ["6.9″", "Super Retina XDR"],
              ["2000", "Peak Nits"],
              ["120Hz", "ProMotion"],
              ["Always-On", "Display"],
            ].map(([val, label]) => (
              <div
                key={label}
                className="border border-white/10 rounded-xl p-4"
              >
                <p className="font-poppins font-bold text-2xl text-white">
                  {val}
                </p>
                <p className="font-sans text-white/40 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Performance ─── */}
      <section className="relative w-full h-screen flex items-center justify-center bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
        <div className="z-20 text-center flex flex-col items-center gap-8 max-w-2xl px-6">
          <p className="text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
            Performance
          </p>
          <h2 className="font-poppins font-bold text-5xl md:text-8xl leading-tight text-white">
            A19 Pro.
            <br />
            <span className="text-white/30">Unstoppable.</span>
          </h2>
          <p className="text-white/50 font-sans text-lg md:text-xl leading-relaxed">
            Engineered on 3nm next-gen architecture. 25% faster CPU.
            Console-class GPU. AI-optimized Neural Engine.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {[
              "3nm Architecture",
              "25% Faster CPU",
              "Console-class GPU",
              "Neural Engine",
              "Ultra-efficient",
            ].map((tag) => (
              <span
                key={tag}
                className="border border-white/15 rounded-full px-5 py-2 text-white/60 font-sans text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5: CTA ─── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black border-t border-white/5 overflow-hidden">
        <div className="z-20 text-center flex flex-col items-center gap-10 max-w-3xl px-6">
          <p className="text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
            Pro Camera System
          </p>
          <h2 className="font-poppins font-bold text-5xl md:text-8xl leading-tight text-white">
            Capture
            <br />
            masterpieces.
          </h2>
          <p className="text-white/50 font-sans text-lg md:text-xl leading-relaxed max-w-xl">
            50MP Fusion camera. Periscope Telephoto with 10× optical zoom. 8K
            video. Cinematic Mode 2.0. AI-powered Night Photography.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="bg-white text-black font-poppins font-semibold text-lg px-10 py-4 rounded-full hover:bg-white/90 transition-colors">
              Order Now
            </button>
            <button className="border border-white/20 text-white font-poppins font-medium text-lg px-10 py-4 rounded-full hover:bg-white/5 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
