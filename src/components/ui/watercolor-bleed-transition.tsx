"use client";

import React from "react";

export interface WatercolorBleedTransitionProps {
  direction?: "to-blue" | "to-white";
  className?: string;
}

export function WatercolorBleedTransition({
  direction = "to-blue",
  className = "",
}: WatercolorBleedTransitionProps) {
  const isToWhite = direction === "to-white";

  if (isToWhite) {
    // ─── MAVİDEN BEYAZA GEÇİŞ (Tepesi #0272FC, Aşağıya doğru beyaz kağıda dökülen organik suluboya boya akması) ───
    return (
      <div className={`relative w-full h-20 sm:h-28 md:h-36 overflow-hidden select-none pointer-events-none -mb-0.5 z-20 ${className}`}>
        <svg
          className="w-full h-full block"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="watercolor-filter-towhite" x="-10%" y="-10%" width="120%" height="130%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.035 0.045"
                numOctaves="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="26"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feGaussianBlur in="displaced" stdDeviation="1.5" result="blurred" />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="displaced" />
              </feMerge>
            </filter>

            {/* Mavi boyadan şeffafa/beyaza doğru yumuşak pigment geçişi */}
            <linearGradient id="watercolor-blue-to-transparent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0272FC" stopOpacity="1" />
              <stop offset="45%" stopColor="#0272FC" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#0272FC" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0272FC" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="watercolor-cyan-wash-down" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0272FC" stopOpacity="1" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Layer 1: Opak mavi tavan (Page 2'nin zeminini yüzde yüz mühürler) */}
          <path
            d="M 0,0 L 1440,0 L 1440,75 
               Q 1220,95 1000,70 
               T 560,85 
               T 120,65 
               L 0,80 Z"
            fill="#0272FC"
            filter="url(#watercolor-filter-towhite)"
          />

          {/* Layer 2: Aşağıya doğru kağıt liflerine sızan ana mavi boya akıntısı */}
          <path
            d="M 0,0 L 1440,0 L 1440,120 
               C 1260,150 1120,85 960,125 
               C 800,165 640,90 480,130 
               C 320,170 160,105 0,140 Z"
            fill="url(#watercolor-blue-to-transparent)"
            filter="url(#watercolor-filter-towhite)"
            opacity="0.9"
          />

          {/* Layer 3: En uca kadar seyreltilmiş ıslak cyan pigment sızıntısı */}
          <path
            d="M 0,0 L 1440,0 L 1440,155 
               Q 1260,175 1080,145 
               T 720,168 
               T 360,140 
               T 0,160 Z"
            fill="url(#watercolor-cyan-wash-down)"
            filter="url(#watercolor-filter-towhite)"
            opacity="0.75"
          />
        </svg>
      </div>
    );
  }

  // ─── BEYAZDAN MAVİYE GEÇİŞ (Tepesi Beyaz, Aşağıya doğru maviye dökülen suluboya) ───
  return (
    <div className={`relative w-full h-20 sm:h-28 md:h-36 overflow-hidden select-none pointer-events-none -mt-1 -mb-1 z-20 ${className}`}>
      <svg
        className="w-full h-full block"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="watercolor-filter-toblue" x="-10%" y="-10%" width="120%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035 0.045"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="1.5" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>

          <linearGradient id="watercolor-ink-grad-toblue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0272FC" stopOpacity="0" />
            <stop offset="25%" stopColor="#0272FC" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#0272FC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0272FC" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="watercolor-cyan-wash-toblue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#0272FC" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0272FC" stopOpacity="1" />
          </linearGradient>
        </defs>

        <path
          d="M 0,55 Q 180,15 360,45 T 720,25 T 1080,48 T 1440,30 L 1440,180 L 0,180 Z"
          fill="url(#watercolor-cyan-wash-toblue)"
          filter="url(#watercolor-filter-toblue)"
          opacity="0.65"
        />

        <path
          d="M 0,85 C 160,50 280,110 440,75 C 600,40 760,115 920,80 C 1080,45 1240,105 1440,70 L 1440,180 L 0,180 Z"
          fill="url(#watercolor-ink-grad-toblue)"
          filter="url(#watercolor-filter-toblue)"
          opacity="0.9"
        />

        <path
          d="M 0,115 Q 220,95 440,120 T 880,105 T 1320,125 L 1440,110 L 1440,180 L 0,180 Z"
          fill="#0272FC"
          filter="url(#watercolor-filter-toblue)"
        />
      </svg>
    </div>
  );
}
