"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

export interface SplineHeroSceneProps {
  className?: string;
  sceneUrl?: string;
}

export function SplineHeroScene({
  className,
  sceneUrl = "https://my.spline.design/thecastle3diconcopycopy-UUBLEwPaNf6grRdkLyKgXkbR-QFz/",
}: SplineHeroSceneProps) {
  const [loaded, setLoaded] = useState(false);

  // Safety fallback: If iframe onLoad fires slowly or is cross-origin delayed, hide loader after 1.5s
  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-full select-none overflow-hidden flex items-center justify-center bg-black",
        className
      )}
    >
      {/* Loading State Indicator with subtle fade out */}
      {!loaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm gap-3 pointer-events-none transition-opacity duration-500">
          <Loader2 className="size-8 text-white animate-spin" />
          <span className="font-mono text-xs text-zinc-400">Loading 3D Scene...</span>
        </div>
      )}

      {/* 
        Ultra Cover-fit with responsive zoom:
        Mobilde dikey ekran (portrait) nedeniyle sahne ortada küçücük kalıyordu.
        Mobilde scale-175 veya scale-[1.9] ile zoom yaparak 3D modeli ekranı dolduracak
        ve etkileyici görünecek boyuta getiriyoruz.
      */}
      <iframe
        src={sceneUrl}
        title="LexicalLayer 3D Castle Scene"
        onLoad={() => setLoaded(true)}
        className="border-0 block pointer-events-none w-full h-[140%] min-h-[135vh] scale-[1.85] sm:scale-[1.35] lg:scale-x-[1.06] lg:scale-y-[1.18] transition-transform duration-500"
        style={{
          display: "block",
          border: "none",
          outline: "none",
          background: "transparent",
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
        allow="autoplay; fullscreen; xr-spatial-tracking"
      />
    </div>
  );
}

export default SplineHeroScene;
