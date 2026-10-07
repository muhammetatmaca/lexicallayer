"use client";

import React, { useId } from "react";
import { cn } from "@/lib/cn";

export interface HeroHandContourProps {
  className?: string;
  glow?: boolean;
}

/**
 * HeroHandContour:
 * Kullanıcının referans görselindeki (media_1791168431813.jpg) yatay uzanan sibernetik/organik
 * elin tam sınırlarına (border/silhouette) oturan, sadece saf kesintisiz editoryal çizgilerden
 * oluşan SVG kontur çizimi.
 * 
 * - Noktalar, daireler, vida noktaları ve dot-pattern'ler tamamen kaldırıldı.
 * - Sadece elin ve sibernetik kolun zarif sınır konturları (border paths) yer almaktadır.
 */
export function HeroHandContour({
  className,
  glow = true,
}: HeroHandContourProps) {
  const filterId = useId();

  return (
    <div
      className={cn(
        "pointer-events-none select-none absolute inset-0 w-full h-full overflow-hidden z-10 flex items-center justify-center",
        className
      )}
      aria-hidden="true"
    >
      <div className="relative w-full h-full max-w-[100vw] overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1600 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full max-w-full object-cover scale-[1.3] sm:scale-100 origin-center transition-transform"
        >
          <defs>
            {/* Subtle glow filter for hairline accents */}
            <filter id={`glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Cyan/White gradient along the arm silhouette */}
            <linearGradient id={`grad-arm-${filterId}`} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#93c5fd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id={`grad-cyber-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* ───────────────────────────────────────────────────────────
              1. MAIN HORIZONTAL HAND & ARM SILHOUETTE BORDERS
              ─────────────────────────────────────────────────────────── */}
          
          {/* ÜST SINIR (Top Border Line): Kol üstünden parmak ucuna */}
          <path
            d="M -20 425 
               C 120 410, 260 380, 420 365 
               C 580 345, 740 338, 880 355 
               C 1020 375, 1160 415, 1280 470 
               C 1380 515, 1480 560, 1580 620"
            stroke={`url(#grad-arm-${filterId})`}
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-700"
            style={{
              filter: glow ? `url(#glow-${filterId})` : undefined,
            }}
          />

          {/* İkinci paralel ince editoryal çizgi */}
          <path
            d="M -20 418 
               C 120 403, 260 373, 420 358 
               C 580 338, 740 331, 880 348 
               C 1020 368, 1160 408, 1280 463 
               C 1380 508, 1480 553, 1580 613"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />

          {/* ALT SINIR (Bottom Border Line): Kol tabanı ve el altı */}
          <path
            d="M -20 620 
               C 100 635, 240 655, 380 665 
               C 520 680, 680 720, 820 740 
               C 920 750, 1020 710, 1120 640 
               C 1180 600, 1240 560, 1340 540"
            stroke={`url(#grad-arm-${filterId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              filter: glow ? `url(#glow-${filterId})` : undefined,
            }}
          />

          {/* ───────────────────────────────────────────────────────────
              2. THUMB & PALM BORDER LINES (Başparmak ve Aya Sınırları)
              ─────────────────────────────────────────────────────────── */}
          {/* Başparmak Alt Kıvrım Sınırı */}
          <path
            d="M 540 680 
               C 620 730, 720 770, 840 760 
               C 920 755, 980 720, 1020 660 
               C 980 620, 860 625, 760 630"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeOpacity="0.85"
            style={{
              filter: glow ? `url(#glow-${filterId})` : undefined,
            }}
          />

          {/* Başparmak İç Boğum Çizgisi */}
          <path
            d="M 680 700 C 740 730, 810 745, 890 735"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* ───────────────────────────────────────────────────────────
              3. FINGER & NAIL BORDER LINES (İşaret & Orta Parmak Sınırları)
              ─────────────────────────────────────────────────────────── */}
          {/* İşaret Parmağı Üst Sınırı */}
          <path
            d="M 1060 435 
               C 1140 455, 1260 500, 1380 545 
               C 1460 575, 1540 615, 1580 630"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeOpacity="0.9"
            style={{
              filter: glow ? `url(#glow-${filterId})` : undefined,
            }}
          />

          {/* Tırnak / Parmak Boğum Çizgisi */}
          <path
            d="M 1320 520 C 1340 515, 1365 528, 1370 545"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />

          {/* Orta Parmak Sınır Çizgisi */}
          <path
            d="M 960 480 
               C 1060 495, 1180 530, 1300 580 
               C 1380 610, 1460 650, 1520 680"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />

          {/* ───────────────────────────────────────────────────────────
              4. CYBERNETIC PANEL SEAMS (Kol Panel Ayrım Çizgileri)
              ─────────────────────────────────────────────────────────── */}
          {/* Kol Ortasındaki Kavisli Mekanik Panel Çizgisi */}
          <path
            d="M 180 430 
               C 280 435, 380 460, 480 475 
               C 560 490, 600 520, 620 570"
            stroke={`url(#grad-cyber-${filterId})`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* İkinci Alt Mekanik Panel Ayrım Çizgisi */}
          <path
            d="M 60 520 
               C 160 530, 260 550, 360 560 
               C 440 570, 500 590, 530 630"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />

          {/* Bilek Eklemi Geçiş Çizgisi */}
          <path
            d="M 440 370 C 470 420, 490 500, 500 580"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeOpacity="0.55"
          />

          {/* ───────────────────────────────────────────────────────────
              5. PRISMATIC BLOCK CONTOUR (Öndeki Kristal Obje Çizgileri)
              ─────────────────────────────────────────────────────────── */}
          <g opacity="0.8">
            <polygon
              points="1050,560 1180,480 1260,530 1260,700 1130,780 1050,710"
              stroke="#ffffff"
              strokeWidth="1.4"
              strokeLinejoin="round"
              fill="none"
              style={{
                filter: glow ? `url(#glow-${filterId})` : undefined,
              }}
            />
            {/* Kristal İç Hat Çizgileri */}
            <line x1="1130" y1="780" x2="1130" y2="590" stroke="#38bdf8" strokeWidth="1" />
            <line x1="1130" y1="590" x2="1050" y2="560" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="1130" y1="590" x2="1260" y2="530" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="1180" y1="480" x2="1130" y2="590" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default HeroHandContour;
