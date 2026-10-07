"use client";

import React, { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { TearingPaperPhoto, TearingPaperPhotoImage } from "@/components/ui/tearing-paper-photo";
import { AuthenticSlopCard, SlopCardType } from "@/components/socials/authentic-slop-card";

const CARD_TYPES: SlopCardType[] = [
  "twitter",
  "instagram",
  "linkedin",
  "blog",
  "website",
  "article",
  "email",
  "chat",
];

export function SlopSocialTearShowcase() {
  const [capturedImages, setCapturedImages] = useState<TearingPaperPhotoImage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    let mounted = true;

    async function captureAllCards() {
      try {
        const results: TearingPaperPhotoImage[] = [];

        for (const type of CARD_TYPES) {
          const el = cardRefs.current[type];
          if (el) {
            // Render at 2.5x pixel ratio for razor-sharp vector text and crystal clear icons
            const dataUrl = await htmlToImage.toPng(el, {
              pixelRatio: 2.5,
              quality: 1.0,
              cacheBust: true,
            });
            results.push({ src: dataUrl });
          }
        }

        if (mounted && results.length > 0) {
          setCapturedImages(results);
        }
      } catch (err) {
        console.error("Card capture error, retrying:", err);
      }
    }

    // Capture after DOM layout stabilizes
    const timer = setTimeout(captureAllCards, 300);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* 
        OFF-SCREEN AUTHENTIC REACT COMPONENTS:
        These are the 100% exact, pixel-perfect real UI cards:
        1. Twitter Post
        2. Instagram Post
        3. LinkedIn Post
        4. Tech Blog Article
        5. SaaS Website Copy
        6. Academic Paper
        7. Corporate Email
        8. Slack Enterprise Chat
      */}
      <div 
        ref={containerRef}
        style={{ 
          position: "fixed", 
          left: 0, 
          top: 0, 
          transform: "translate(-9999px, -9999px)", 
          pointerEvents: "none", 
          zIndex: -100 
        }} 
        className="flex flex-col gap-10"
      >
        {CARD_TYPES.map((type) => (
          <div 
            key={type} 
            ref={(el) => { cardRefs.current[type] = el; }}
            className="inline-block"
          >
            <AuthenticSlopCard type={type} />
          </div>
        ))}
      </div>

      {/* 
        3D AUTOMATED TEARING STAGE:
        Tears sequentially across all 8 exact, authentic social and digital cards!
      */}
      <div className="w-full flex justify-center items-center">
        {capturedImages.length > 0 ? (
          <TearingPaperPhoto
            className="w-full h-[420px] sm:h-[540px] md:h-[620px] lg:h-[700px] xl:h-[740px] bg-transparent"
            sheetWidth={1.55}
            sheetHeight={2.08}
            autoTear={true}
            autoTearInterval={3500}
            showHandHint={false}
            images={capturedImages}
          />
        ) : (
          <div className="w-full h-[420px] sm:h-[540px] md:h-[620px] lg:h-[700px] xl:h-[740px] flex items-center justify-center">
            <div className="animate-pulse text-white/60 text-sm font-mono tracking-wide">
              Rendering authentic cards...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
