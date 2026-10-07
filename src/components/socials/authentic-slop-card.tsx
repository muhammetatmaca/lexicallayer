"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Bookmark, 
  MessageCircle, 
  Heart, 
  Repeat, 
  Share, 
  Share2, 
  ThumbsUp, 
  Clock, 
  Ellipsis, 
  Send, 
  Paperclip, 
  ExternalLink, 
  Smile, 
  Check, 
  Hash, 
  BookOpen, 
  Mail, 
  Globe 
} from "lucide-react";
import { TwitterPostCard } from "@/components/socials/twitter-post-card";
import { InstagramPostCard } from "@/components/socials/instagram-post-card";
import { LinkedInPostCard } from "@/components/socials/linked-in-post-card";
import { FacebookPostCard } from "@/components/socials/facebook-post-card";

export type SlopCardType = 
  | "twitter" 
  | "instagram" 
  | "linkedin" 
  | "blog" 
  | "website" 
  | "article" 
  | "email" 
  | "chat";

export interface AuthenticCardProps {
  type: SlopCardType;
}

export function AuthenticSlopCard({ type }: AuthenticCardProps) {
  switch (type) {
    // 1. Twitter / X Birebir Kartı
    case "twitter":
      return (
        <div className="w-[480px] bg-white rounded-2xl p-6 font-sans text-neutral-900 select-none">
          <TwitterPostCard
            username="Alex Rivera"
            handle="@alex_growth"
            timestamp="12m"
            content="Delighted to delve deep into the intricate tapestry of generational paradigms! It is a true testament to fostering seamless synergies and unlocking unprecedented value across our ecosystem. As an AI-forward founder, remember to embrace holistic transformation."
            hashtags="#Leadership #FutureOfWork #Synergy #Innovation"
            likes={4210}
            comments={312}
            reposts={890}
            className="border-0 shadow-none p-0 max-w-none text-base"
          />
        </div>
      );

    // 2. Instagram Birebir Kartı
    case "instagram":
      return (
        <div className="w-[450px] bg-white rounded-2xl overflow-hidden font-sans text-neutral-900 select-none">
          <InstagramPostCard
            username="david_visionary"
            location="San Francisco, California"
            caption="Certainly! Here is an inspiring caption for your post: In today's fast-paced digital tapestry, embarking on this transformative journey serves as a beacon of unprecedented innovation. We meticulously optimize holistic value across every touchpoint. Drop a 🔥 if you agree!"
            hashtags="#leadership #mindset #innovation #growth #disrupt"
            likes={1892}
            timestamp="3 HOURS AGO"
            className="border-0 shadow-none rounded-none w-full max-w-none"
          />
        </div>
      );

    // 3. LinkedIn Birebir Kartı
    case "linkedin":
      return (
        <div className="w-[490px] bg-white rounded-2xl p-6 font-sans text-neutral-900 select-none">
          <LinkedInPostCard
            username="Sarah Sterling · 1st"
            headline="Chief Transformation Evangelist | Keynote Speaker | Top Voice"
            timestamp="1h • Edited"
            content="I asked ChatGPT to analyze our Q3 trajectory, and the results blew my mind. 🤯\n\nAgree?\n\nIn the crucible of the modern corporate tapestry, it is quintessential to remember that synergy isn't just a strategy—it's an imperative paradigm. We are charting unexplored waters of scalable empowerment. 🚀"
            hashtags="#CorporateLife #Leadership #FutureOfWork #Innovation"
            websiteName="synergy-framework.io"
            websiteDescription="Unlock unprecedented exponential growth through holistic digital convergence."
            reactions={1420}
            comments={480}
            reposts={210}
            className="border-0 shadow-none p-0 w-full max-w-none"
          />
        </div>
      );

    // 4. Tech Blog Birebir Kartı
    case "blog":
      return (
        <div className="w-[500px] bg-white rounded-2xl p-7 font-sans text-neutral-900 select-none">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Engineering Insights
            </span>
            <span className="text-xs text-neutral-400">Oct 2026 • 6 min read</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 leading-snug mb-3">
            Demystifying the Intricate Tapestry of Holistic Microservice Paradigms
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed mb-5">
            Certainly, let us delve deeply into cloud infrastructure: It is imperative to meticulously elucidate that our robust architectural paradigm boasts seamless redundancy. In order to mitigate latency, we ensure comprehensive end-to-end verification, thereby fostering a pivotal foundation.
          </p>
          <div className="p-3.5 bg-neutral-900 rounded-xl font-mono text-xs text-emerald-400 mb-5 overflow-hidden">
            <div className="text-neutral-500 mb-1">// End-to-end synergy pipeline</div>
            <div>export const synthesizeHeuristics = async () =&gt; &#123;</div>
            <div className="pl-4 text-neutral-300">await edgeCluster.delveIntoTapestry();</div>
            <div>&#125;;</div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                PA
              </div>
              <span>Principal Architect</span>
            </div>
            <div className="flex items-center gap-4">
              <span>👏 1.2k</span>
              <span>💬 48 comments</span>
            </div>
          </div>
        </div>
      );

    // 5. Web Sitesi / SaaS Hero Birebir Kartı
    case "website":
      return (
        <div className="w-[500px] bg-white rounded-2xl p-7 font-sans text-neutral-900 select-none">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                N
              </div>
              <span className="font-bold text-sm tracking-tight text-neutral-900">NexusFlow</span>
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-900 leading-tight mb-3 tracking-tight">
            Empowering Next-Gen Synergy for Scalable Paradigms.
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            Unlock unprecedented exponential potential with our groundbreaking platform. Seamlessly harmonize multi-tenant workflows and revolutionize cross-functional synergy with turnkey cognitive integration.
          </p>
          <div className="flex items-center gap-3 mb-5">
            <div className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-md">
              Start Free Trial
            </div>
            <div className="px-5 py-2.5 bg-neutral-100 text-neutral-700 rounded-xl text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer">
              Schedule Live Demo
            </div>
          </div>
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>SOC-2 TYPE II CERTIFIED</span>
            <span>99.99% GUARANTEED SLA</span>
          </div>
        </div>
      );

    // 6. Bilimsel / Akademik Makale Birebir Kartı
    case "article":
      return (
        <div className="w-[500px] bg-[#fafafa] rounded-2xl p-8 font-serif text-neutral-900 select-none">
          <div className="font-sans text-[11px] font-mono tracking-widest text-neutral-500 uppercase mb-2">
            Journal of Applied Cognitive Computing • Peer Reviewed
          </div>
          <h2 className="text-xl font-bold text-neutral-950 leading-snug mb-3">
            A Comprehensive Synthesis of Stochastic Latency Attenuation in Multi-Layer Transformer Architectures
          </h2>
          <div className="font-sans text-xs text-neutral-500 mb-4 pb-3 border-b border-neutral-200">
            Dr. Aris Thorne, Ph.D. &bull; Cognitive Compute Laboratory &bull; DOI: 10.1038/s41586-026
          </div>
          <div className="text-xs leading-relaxed text-neutral-700 space-y-2 mb-5">
            <p>
              <strong className="font-sans font-bold text-neutral-900">Abstract: </strong>
              Certainly! Here is an academic synthesis: This investigation serves as a pivotal testament to the profound interplay between parametric token variance and syntactic coherence. We delve deeply into multifaceted distributions across extensive corpora.
            </p>
            <p>
              Furthermore, our empirical findings unequivocally demonstrate that holistic calibration mitigates superficial redundancy while fostering quintessential resonance.
            </p>
          </div>
          <div className="font-sans pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Volume 14, Issue 3 &bull; Cited by 84</span>
            <span className="font-mono text-neutral-600 font-medium">Download PDF (1.4MB)</span>
          </div>
        </div>
      );

    // 7. E-posta Birebir Kartı
    case "email":
      return (
        <div className="w-[500px] bg-white rounded-2xl p-6 font-sans text-neutral-900 select-none">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <Mail className="size-4 text-orange-500" />
              <span>Inbox &bull; Enterprise Mail</span>
            </div>
            <span className="text-xs text-neutral-400 font-mono">10:42 AM</span>
          </div>
          <div className="mb-3 space-y-1">
            <div className="text-sm font-bold text-neutral-900">
              Strategic Alignment &amp; Synergistic Opportunities for Q4
            </div>
            <div className="text-xs text-neutral-500">
              From: <span className="font-semibold text-neutral-700">Sarah Jenkins</span> &lt;sarah.j@enterprisecorp.io&gt;
            </div>
            <div className="text-xs text-neutral-400">
              To: Executive Leadership Team
            </div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-xl text-xs text-neutral-700 leading-relaxed mb-4 space-y-2">
            <p>Hi Team,</p>
            <p>
              I hope this email finds you well. I am reaching out to cordially follow up on our earlier dialogue. It is quintessential that we align our strategic milestones to foster holistic collaboration and delve into our mutual value proposition across this evolving landscape.
            </p>
            <p>
              Please let me know your availability for a proactive sync this week.
            </p>
            <p className="pt-1 text-neutral-500 font-medium">
              Best regards,<br />
              Sarah Jenkins, Chief Commercial Officer
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2 text-xs">
            <div className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-medium cursor-pointer shadow-sm">
              Reply
            </div>
            <div className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg font-medium cursor-pointer">
              Forward
            </div>
          </div>
        </div>
      );

    // 8. Slack / Enterprise Mesaj Birebir Kartı
    case "chat":
      return (
        <div className="w-[500px] bg-white rounded-2xl p-6 font-sans text-neutral-900 select-none">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="font-bold text-xs text-neutral-800">#product-leadership-sync</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">Slack</span>
          </div>
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              BC
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-sm text-neutral-900">Bradley Cooper</span>
                <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">VP Strategy</span>
                <span className="text-xs text-neutral-400">11:15 AM</span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Certainly! Here is a concise update: Hey team, just wanted to circle back and delve into the quarterly tapestry of our deliverables. Let&apos;s ensure all stakeholders cultivate holistic synergy offline! 🚀
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pl-13 pt-1">
            <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-xs cursor-pointer hover:bg-neutral-200 transition-colors">
              👀 6
            </span>
            <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-xs cursor-pointer hover:bg-neutral-200 transition-colors">
              🚀 4
            </span>
            <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-xs cursor-pointer hover:bg-neutral-200 transition-colors">
              🙌 9
            </span>
            <span className="px-2.5 py-1 bg-neutral-100 rounded-full text-xs cursor-pointer hover:bg-neutral-200 transition-colors">
              ✅ 3
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
