"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, forwardRef } from "react";
import Scene from "@/components/web/Scene";

interface ModelCanvasProps {
  scrollProgress: number;
  isMobile: boolean;
}

const ModelCanvas = forwardRef<HTMLDivElement, ModelCanvasProps>(
  ({ scrollProgress, isMobile }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "none",
          // On mobile: full viewport coverage so the canvas is always 100vw × 100vh
          width: isMobile ? "100vw" : undefined,
          height: isMobile ? "100vh" : undefined,
        }}
        className={
          isMobile
            ? "" // mobile: inline styles handle sizing
            : "w-[50vw] h-screen" // desktop: half-width, full height
        }
      >
        <Canvas
          camera={{ position: [0, 0, 9], fov: 40 }}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%", pointerEvents: "all" }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>
    );
  },
);

ModelCanvas.displayName = "ModelCanvas";

export default ModelCanvas;
