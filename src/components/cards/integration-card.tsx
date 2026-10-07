"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/card";

interface VisualContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TeamCardProps {
  visual: React.ReactNode;
  title: string;
  description: string;
  url?: string;
}

interface IntegrationItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  path: string;
  delay: number;
}

const OpenAILogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1636a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.402-.6862zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.907 9.2298V6.8974a.0662.0662 0 0 1 .0331-.0615l4.9922-2.8804a4.504 4.504 0 0 1 6.5108 4.8876zM10.742 13.064l-2.484-1.4338 2.484-1.4338 2.484 1.4338z" />
  </svg>
);

const ClaudeLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="currentColor"
      className={className}
    >
      <path
        d="M5.488 18.62L11.004 15.54L11.088 15.26L11.004 15.12H10.724L9.8 15.064L6.664 14.98L3.92 14.84L1.26 14.7L0.588 14.56L0 13.72L0.056 13.3L0.616 12.936L1.428 12.992L3.192 13.132L5.852 13.3L7.784 13.412L10.64 13.748H11.088L11.144 13.552L11.004 13.44L10.892 13.328L8.12 11.48L5.152 9.52L3.584 8.372L2.744 7.812L2.324 7.252L2.156 6.076L2.912 5.236L3.948 5.32L4.2 5.376L5.236 6.188L7.476 7.896L10.36 10.08L10.78 10.416L10.948 10.304L10.976 10.22L10.78 9.912L9.24 7L7.56 4.088L6.804 2.884L6.608 2.156C6.524 1.876 6.496 1.596 6.496 1.316L7.336 0.14L7.84 0L9.016 0.168L9.464 0.56L10.192 2.24L11.34 4.844L13.16 8.372L13.72 9.436L14 10.388L14.084 10.668H14.28V10.528L14.42 8.512L14.7 6.076L14.98 2.94L15.064 2.044L15.512 0.98L16.352 0.42L17.08 0.728L17.64 1.54L17.556 2.044L17.248 4.2L16.52 7.588L16.1 9.884H16.352L16.632 9.576L17.78 8.064L19.712 5.656L20.552 4.676L21.56 3.64L22.204 3.136H23.408L24.276 4.452L23.884 5.824L22.652 7.392L21.616 8.708L20.132 10.696L19.236 12.292L19.32 12.404H19.516L22.876 11.676L24.668 11.368L26.796 11.004L27.776 11.452L27.888 11.9L27.496 12.852L25.2 13.412L22.512 13.972L18.508 14.896L18.452 14.924L18.508 15.008L20.3 15.176L21.084 15.232H22.988L26.516 15.512L27.44 16.072L27.972 16.828L27.888 17.388L26.46 18.116L24.556 17.668L20.076 16.604L18.564 16.24H18.34V16.352L19.628 17.612L21.952 19.712L24.92 22.428L25.06 23.1L24.696 23.66L24.304 23.604L21.728 21.644L20.72 20.804L18.48 18.9H18.34V19.096L18.844 19.852L21.588 23.968L21.728 25.228L21.532 25.62L20.804 25.9L20.048 25.732L18.424 23.492L16.744 20.972L15.428 18.676L15.288 18.788L14.476 27.244L14.112 27.664L13.272 28L12.572 27.44L12.18 26.6L12.572 24.864L13.02 22.624L13.384 20.832L13.72 18.62L13.916 17.892V17.836H13.72L12.04 20.16L9.52 23.604L7.504 25.732L7.028 25.928L6.188 25.508L6.272 24.724L6.72 24.08L9.52 20.496L11.2 18.284L12.32 16.996L12.292 16.856H12.208L4.816 21.672L3.5 21.84L2.94 21.28L2.996 20.44L3.276 20.16L5.516 18.62H5.488Z"
      />
    </svg>
  );
};

const GeminiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12Z" />
  </svg>
);

const DeepSeekLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
  </svg>
);

const LlamaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4 21l3.5-.95A8.94 8.94 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-2 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
);

const MistralLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 4h3.6v3.6H3V4zm5.4 0H12v3.6H8.4V4zm7.2 0h3.6v3.6h-3.6V4zM3 9.4h3.6V13H3V9.4zm13.8 0h3.6V13h-3.6V9.4zm-8.4 0H12V13H8.4V9.4zM3 14.8h3.6v3.6H3v-3.6zm13.8 0h3.6v3.6h-3.6v-3.6zM3 20.2h3.6v3.6H3v-3.6zm7.2 0H14v3.6h-3.8v-3.6zm6.6 0h3.6v3.6h-3.6v-3.6z" />
  </svg>
);

const CursorLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L3 21.5l1.8.5L12 18l7.2 4 1.8-.5L12 2z" />
  </svg>
);

const OllamaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="10" r="1.5" fill="currentColor" />
    <circle cx="15" cy="10" r="1.5" fill="currentColor" />
    <path d="M8 15s1.5 2 4 2 4-2 4-2" />
  </svg>
);

const GroqLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18h-2v-1.07A6 6 0 0 1 6.07 12H7a5 5 0 0 0 4 4.9v-2.06a3 3 0 0 1-1.84-2.84h2.06a1 1 0 0 0 1.78 0h2.06a3 3 0 0 1-1.84 2.84v2.06A5 5 0 0 0 17 12h.93A6 6 0 0 1 13 16.93z" />
  </svg>
);

const HuggingFaceLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2zm-3.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7.4 7.6c.4-.8 1.8-1.6 3.9-1.6s3.5.8 3.9 1.6c.2.4 0 .9-.4 1-.4.2-.9 0-1.1-.3-.3-.5-1.3-.9-2.4-.9s-2.1.4-2.4.9c-.2.3-.7.5-1.1.3-.4-.1-.6-.6-.4-1z" />
  </svg>
);

const QwenLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5l5.5 3.5L12 11.5 6.5 8 12 4.5zM6 9.5l5 3.2v6.1L6 15.6V9.5zm7 9.3v-6.1l5-3.2v6.1l-5 3.2z" />
  </svg>
);

const CohereLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
  </svg>
);

interface IntegrationExtendedItem extends IntegrationItem {
  label: string;
}

const integrations: IntegrationExtendedItem[] = [
  // Top Outer Left: OpenAI
  {
    id: "openai",
    label: "OpenAI",
    icon: OpenAILogo,
    x: 65,
    y: 65,
    path: "M 255 190 V 85 Q 255 65 235 65 H 65",
    delay: 0.1,
  },
  // Top Mid-Left: Cursor
  {
    id: "cursor",
    label: "Cursor",
    icon: CursorLogo,
    x: 175,
    y: 50,
    path: "M 270 190 V 70 Q 270 50 250 50 H 175",
    delay: 0.15,
  },
  // Top Mid: Qwen
  {
    id: "qwen",
    label: "Qwen",
    icon: QwenLogo,
    x: 282,
    y: 42,
    path: "M 282 190 V 42",
    delay: 0.18,
  },
  // Top Mid-Right: Claude
  {
    id: "claude",
    label: "Claude",
    icon: ClaudeLogo,
    x: 390,
    y: 50,
    path: "M 295 190 V 70 Q 295 50 315 50 H 390",
    delay: 0.22,
  },
  // Top Outer Right: Gemini
  {
    id: "gemini",
    label: "Gemini",
    icon: GeminiLogo,
    x: 500,
    y: 65,
    path: "M 310 190 V 85 Q 310 65 330 65 H 500",
    delay: 0.25,
  },
  // Mid Left: Hugging Face
  {
    id: "hf",
    label: "Hugging Face",
    icon: HuggingFaceLogo,
    x: 55,
    y: 205,
    path: "M 240 205 H 55",
    delay: 0.3,
  },
  // Mid Right: DeepSeek
  {
    id: "deepseek",
    label: "DeepSeek",
    icon: DeepSeekLogo,
    x: 510,
    y: 205,
    path: "M 325 205 H 510",
    delay: 0.35,
  },
  // Bottom Outer Left: Meta Llama
  {
    id: "llama",
    label: "Llama",
    icon: LlamaLogo,
    x: 65,
    y: 345,
    path: "M 255 220 V 325 Q 255 345 235 345 H 65",
    delay: 0.42,
  },
  // Bottom Mid-Left: Ollama
  {
    id: "ollama",
    label: "Ollama",
    icon: OllamaLogo,
    x: 175,
    y: 360,
    path: "M 270 220 V 340 Q 270 360 250 360 H 175",
    delay: 0.48,
  },
  // Bottom Mid: Cohere
  {
    id: "cohere",
    label: "Cohere",
    icon: CohereLogo,
    x: 282,
    y: 368,
    path: "M 282 220 V 368",
    delay: 0.52,
  },
  // Bottom Mid-Right: Mistral
  {
    id: "mistral",
    label: "Mistral",
    icon: MistralLogo,
    x: 390,
    y: 360,
    path: "M 295 220 V 340 Q 295 360 315 360 H 390",
    delay: 0.56,
  },
  // Bottom Outer Right: Groq
  {
    id: "groq",
    label: "Groq",
    icon: GroqLogo,
    x: 500,
    y: 345,
    path: "M 310 220 V 325 Q 310 345 330 345 H 500",
    delay: 0.62,
  },
];

const AnimatedPath = ({ d, id }: { d: string; id: string }) => {
  return (
    <>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-neutral-200 dark:text-neutral-800"
      />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop
            offset="50%"
            stopColor="rgb(16, 185, 129)"
            stopOpacity="0.8"
          />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  );
};

export function Integration() {
  const containerId = useId();

  return (
    <div className="relative h-full w-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 564 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {integrations.map((integration) => (
          <AnimatedPath
            key={integration.id}
            d={integration.path}
            id={`${containerId}-${integration.id}`}
          />
        ))}
      </svg>

      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg sm:rounded-xl border border-neutral-200 bg-white p-1 sm:p-2 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-emerald-500/10 text-emerald-600 font-bold text-[10px] sm:text-xs tracking-wider whitespace-nowrap">
          SDK & SKILLS
        </div>
        <motion.div
          className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-emerald-500/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {integrations.map((integration) => {
        const Icon = integration.icon;
        return (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: integration.delay }}
            style={{
              left: `${(integration.x / 564) * 100}%`,
              top: `${(integration.y / 410) * 100}%`,
            }}
            className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 group"
          >
            <div className="flex h-7 w-7 sm:h-10 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl border border-neutral-200 bg-white shadow-md text-neutral-800 transition-transform group-hover:scale-110 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
              <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </div>
            <span className="mt-0.5 sm:mt-1 text-[7px] sm:text-[9px] font-mono font-medium text-neutral-600 dark:text-neutral-400 bg-white/90 dark:bg-neutral-900/90 px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs whitespace-nowrap pointer-events-none scale-90 sm:scale-100">
              {integration.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}


export function VisualContainer({ children, className }: VisualContainerProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-564/410 w-full max-w-full items-center justify-center overflow-hidden bg-neutral-50 p-2 sm:p-8 dark:bg-neutral-900/50",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 dark:from-neutral-950/60 dark:to-neutral-950/60" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export const IntegrationCard = ({
  visual,
  title,
  description,
  url = "#",
}: TeamCardProps) => {
  return (
    <Card className="mx-auto flex w-full max-w-full flex-col sm:max-w-xl rounded-2xl overflow-hidden p-0 ring-0 border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white dark:bg-neutral-900">
      <VisualContainer className="aspect-[564/340] p-2 sm:p-6">{visual}</VisualContainer>

      <CardContent className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {title}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {["OpenAI", "Claude", "Gemini", "DeepSeek", "Qwen", "Llama", "Mistral", "Cohere", "Ollama", "Groq"].map((tag) => (
              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
          <a
            href={url}
            className="inline-flex items-center justify-center h-8.5 rounded-full px-4 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors text-xs"
          >
            Explore SDK & Skills
          </a>
          <span className="text-[11px] text-neutral-500 font-mono">Zero model lock-in</span>
        </div>
      </CardContent>
    </Card>
  );
};

export function IntegrationCardDemo() {
  return (
    <div className="flex items-center justify-center w-full p-0">
      <IntegrationCard
        visual={<Integration />}
        title="Works with Any Model or Stack"
        description="Drop our lightweight SDK & skills directly into your pipeline. Compatible with OpenAI, Claude, Gemini, DeepSeek, Qwen, Llama, Mistral, and local Ollama/vLLM instances in real time."
        url="#waitlist"
      />
    </div>
  );
}

export default IntegrationCardDemo;
