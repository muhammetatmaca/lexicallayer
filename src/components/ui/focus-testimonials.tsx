"use client";

import React, { useState, useRef, useCallback, memo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Testimonial {
  id: number;
  author: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    author: "Emre Yılmaz",
    role: "Kurucu Ortak & CTO",
    company: "SaaS Studio",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&auto=format&fit=crop&crop=faces&q=80",
    quote: "LexicalLayer, yapay zeka çıktılarındaki o bariz robotik kokuyu anında sildi. Müşterilerimize giden otomatik e-postalar artık doğrudan deneyimli bir yazar tarafından kaleme alınmış gibi doğal okunuyor.",
  },
  {
    id: 1,
    author: "Deniz Kaya",
    role: "Yapay Zeka Mühendislik Lideri",
    company: "Vektor Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&auto=format&fit=crop&crop=faces&q=80",
    quote: "Milisaniye altı ters proxy entegrasyonu muazzam. Sıfır gecikme yükü, sıfır karmaşık prompt düzenlemesi ve üretim ortamındaki tüm akışlarda tavizsiz ton tutarlılığı.",
  },
  {
    id: 2,
    author: "Can Özkan",
    role: "Ürün Tasarım Direktörü",
    company: "Modular Craft",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&auto=format&fit=crop&crop=faces&q=80",
    quote: "Modeller 'delve', 'testament' ve 'tapestry' gibi yapay zeka jargonu kustuğunda kurumsal güvenilirlik zedeleniyor. LexicalLayer'ı bağlamak bültenlerimize net ve pürüzsüz bir dil kazandırdı.",
  },
  {
    id: 3,
    author: "Zeynep Arslan",
    role: "Kıdemli Altyapı Mimarı",
    company: "CloudScale",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&auto=format&fit=crop&crop=faces&q=80",
    quote: "Mevcut OpenAI ve Anthropic API çağrılarımızın önüne tek satırla entegre ettik. Ekstra hiçbir model eğitimi gerektirmeden tüm yanıtlar gerçek insan ahengine kavuştu.",
  },
];

const TestimonialSpanItem = memo(function TestimonialSpanItem({
  item,
  isHovered,
  hasHover,
  onHover,
}: {
  item: Testimonial;
  isHovered: boolean;
  hasHover: boolean;
  onHover: (id: number) => void;
}) {
  const stateClass = !hasHover
    ? "opacity-75 blur-0 text-[rgb(115,115,122)]"
    : isHovered
    ? "opacity-100 blur-0 text-[rgb(10,10,14)]"
    : "opacity-30 blur-[2.8px] text-[rgb(175,175,175)]";

  const avatarClass = !hasHover
    ? "grayscale-[25%] opacity-90 scale-100"
    : isHovered
    ? "grayscale-0 opacity-100 scale-110 shadow-none"
    : "grayscale-[70%] blur-[1.2px] opacity-35 scale-95 shadow-none";

  return (
    <span
      onMouseEnter={() => onHover(item.id)}
      className={cn(
        "inline cursor-pointer select-none transition-[opacity,filter,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,filter,color]",
        stateClass
      )}
    >
      <span
        className={cn(
          "inline-block align-middle mr-2.5 overflow-hidden rounded-full transition-[transform,filter,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,filter,opacity]",
          avatarClass
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.avatar}
          alt={item.author}
          width={44}
          height={44}
          loading="eager"
          className="inline-block w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full object-cover align-middle border-0 outline-none shadow-none ring-0 scale-110"
        />
      </span>
      {item.quote}
      <span className="relative inline-block w-0 h-0 align-baseline" />{" "}
    </span>
  );
});

export default function FocusTestimonials() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 320, mass: 0.45 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  const activeItem =
    hoveredId !== null ? INITIAL_TESTIMONIALS.find((t) => t.id === hoveredId) : null;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      rawMouseX.set(e.clientX - rect.left);
      rawMouseY.set(e.clientY - rect.top);
    },
    [rawMouseX, rawMouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  const handleHover = useCallback((id: number) => {
    setHoveredId(id);
  }, []);

  const hasHover = hoveredId !== null;

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-transparent select-none py-4">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 flex w-full max-w-[1400px] flex-col rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-10 md:p-14 text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_12px_32px_rgba(0,0,0,0.04)] transition-all"
      >
        <AnimatePresence>
          {activeItem && (
            <motion.div
              key="author-tooltip"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.85,
                y: 6,
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                x: smoothX,
                y: smoothY,
                translateX: 18,
                translateY: -56,
              }}
              className="pointer-events-none absolute left-0 top-0 z-50 flex items-center gap-2.5 rounded-full border border-white/20 bg-neutral-950/90 pl-2 pr-4 py-2 text-white shadow-2xl backdrop-blur-xl will-change-[transform,opacity]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="h-7 w-7 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={activeItem.avatar}
                  alt={activeItem.author}
                  width={28}
                  height={28}
                  className="h-full w-full object-cover border-0 outline-none shadow-none ring-0 scale-110"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white whitespace-nowrap">
                  {activeItem.author}
                </span>
                <span className="text-[10px] sm:text-xs font-normal text-slate-300 whitespace-nowrap">
                  {activeItem.role} ·{" "}
                  <span className="font-medium text-white">
                    {activeItem.company}
                  </span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex-1 text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-medium leading-[148%] tracking-[-0.025em] text-slate-900">
          {INITIAL_TESTIMONIALS.map((item) => (
            <TestimonialSpanItem
              key={item.id}
              item={item}
              isHovered={hoveredId === item.id}
              hasHover={hasHover}
              onHover={handleHover}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
