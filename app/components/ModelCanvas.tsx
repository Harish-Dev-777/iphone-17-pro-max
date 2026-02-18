"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, forwardRef } from "react";
import Scene from "@/components/web/Scene";

interface ModelCanvasProps {
  scrollProgress: number;
}

const ModelCanvas = forwardRef<HTMLDivElement, ModelCanvasProps>(
  ({ scrollProgress }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw", // Full width on mobile
          height: "100vh",
          zIndex: 10,
          pointerEvents: "none",
        }}
        className="md:w-[50vw]" // Half width on desktop
      >
        <Canvas
          camera={{ position: [0, 0, 9], fov: 40 }}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%", pointerEvents: "all" }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>
    );
  },
);

ModelCanvas.displayName = "ModelCanvas";

export default ModelCanvas;
