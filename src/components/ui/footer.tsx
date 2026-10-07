"use client";

import { Fragment } from "react";
import Link from "next/link";
import FluidWave from "@/components/ui/fluid-wave";
import { LexicalLogo } from "@/components/ui/lexical-logo";

const GITHUB_URL = "https://github.com";
const X_URL = "https://x.com";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  icon?: (props: { className?: string }) => React.ReactElement;
};

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LINKS: FooterLink[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Compare", href: "/compare" },
  { label: "Integrations", href: "/integrations" },
  { label: "Developers", href: "/developers" },
  { label: "Research", href: "/research" },
  { label: "Customers", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: GITHUB_URL, external: true, icon: GithubIcon },
  { label: "X / Twitter", href: X_URL, external: true, icon: XIcon },
];

const UTILITY_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Security", href: "#" },
  { label: "System Status", href: "#" },
];

const HOVER = "transition-colors duration-150 ease-out hover:text-white";
const MUTED = "text-white/60";

function NavLink({ label, href, external, icon: Icon }: FooterLink) {
  const className = `w-fit ${Icon ? "flex items-center" : "text-base sm:text-lg font-medium"} ${MUTED} ${HOVER}`;
  const content = Icon ? <Icon className="h-5 w-5" /> : label;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label={Icon ? label : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={className} aria-label={Icon ? label : undefined}>
      {content}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#05080d] text-white">
      {/* Rare UI FluidWave WebGL Live Interactive Canvas Shader */}
      <FluidWave color="#0272FC" />

      {/* Subtle Top Border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0272FC]/40 to-transparent" />

      <div className="relative mx-auto flex min-h-[min(50svh,50rem)] w-full max-w-[96rem] flex-col px-6 pt-12 sm:min-h-[min(85svh,52rem)] sm:px-10 sm:pt-24 md:pt-32">
        {/* Top Border Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Top Navigation Row */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-8">
          <Link href="/" className="flex h-fit w-fit items-center gap-3">
            <LexicalLogo size={32} />
            <span className="font-serif italic text-2xl font-normal tracking-tight text-white">
              Lexical<span className="font-sans font-medium uppercase text-xs tracking-[0.25em] ml-2 text-white/70">Layer</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {LINKS.map((link, index) => (
              <Fragment key={link.label}>
                {link.icon && !LINKS[index - 1]?.icon && (
                  <span
                    aria-hidden="true"
                    className="-mx-3 text-lg text-white/25"
                  >
                    |
                  </span>
                )}
                <NavLink {...link} />
              </Fragment>
            ))}
          </nav>
        </div>

        {/* Hero Big Typography Showcase (Rare UI Signature element) */}
        <div className="flex flex-1 items-center py-16 sm:py-24">
          <h2 className="font-serif italic text-[clamp(2.75rem,11.5vw,9.5rem)] font-light leading-[0.92] tracking-tight text-white select-none">
            Authentic Voice
          </h2>
        </div>

        {/* Bottom Utility and Copyright Row */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 pb-8 text-xs ${MUTED} border-t border-white/10 pt-6`}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span>LexicalLayer &copy; {new Date().getFullYear()}</span>
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            <a href="mailto:hello@lexicallayer.com" className={HOVER}>
              hello@lexicallayer.com
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {UTILITY_LINKS.map((link, index) => (
              <Fragment key={link.label}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/25">
                    &middot;
                  </span>
                )}
                <a href={link.href} className={HOVER}>
                  {link.label}
                </a>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
