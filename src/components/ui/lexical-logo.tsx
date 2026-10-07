import React from "react";
import { cn } from "@/lib/cn";

interface LexicalLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export function LexicalLogo({
  className,
  size = 28,
  color,
}: LexicalLogoProps) {
  const primaryFill = color || "#FFFFFF";
  const secondaryFill = color ? color : "#E7E8E1";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 select-none",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* First 'L' */}
        <path
          d="M5 4H8.5V23.5H23V27H5V4Z"
          fill={primaryFill}
        />

        {/* Second complementary interlocking 'L' */}
        <path
          d="M27 28H23.5V8.5H9V5H27V28Z"
          fill={secondaryFill}
          fillOpacity={color ? 0.65 : 0.85}
        />

        {/* Central hairline architectural connection */}
        <circle cx="16" cy="16" r="1.5" fill={primaryFill} />
      </svg>
    </div>
  );
}

export default LexicalLogo;
