"use client";

// High-definition Canvas generator for 8 distinct digital artifacts with realistic typography, icons, and UI
export interface SlopCardItem {
  type: "twitter" | "instagram" | "linkedin" | "blog" | "website" | "article" | "email" | "chat";
  author: string;
  handleOrRole: string;
  badgeText: string;
  timestamp: string;
  title?: string;
  body: string;
  extraMeta?: string;
  accentColor: string;
  likesOrReplies?: string;
}

export const SLOP_CARDS_DATA: SlopCardItem[] = [
  // 1. Twitter / X Post
  {
    type: "twitter",
    author: "Alex Vance",
    handleOrRole: "@alexvance_ai",
    badgeText: "POST",
    timestamp: "18m",
    body: "Delighted to delve deep into our multifaceted ecosystem of generative synergy. Truly a testament to navigating unexplored paradigms in modern agentic tapestries.",
    extraMeta: "#GenAI #Synergy #Disruption #ScalableParadigms",
    accentColor: "#1d9bf0",
    likesOrReplies: "4,281 Likes • 342 Retweets • 128 Quotes",
  },

  // 2. Instagram Post
  {
    type: "instagram",
    author: "elena_creative_mind",
    handleOrRole: "San Francisco, CA",
    badgeText: "INSTAGRAM",
    timestamp: "2 HOURS AGO",
    body: "In today's fast-paced digital tapestry, embarking on this transformative journey serves as a humble beacon of unprecedented innovation. We meticulously curate authentic resonance.",
    extraMeta: "#LeadershipJourney #VisionaryCraft #NextGenMindset",
    accentColor: "#e1306c",
    likesOrReplies: "2,840 likes • 218 comments",
  },

  // 3. LinkedIn Thought Leadership Post
  {
    type: "linkedin",
    author: "Marcus Sterling · 1st",
    handleOrRole: "Chief Global Transformation Evangelist | Keynote Speaker",
    badgeText: "LINKEDIN",
    timestamp: "3h • Edited",
    body: "I am humbled and thrilled to announce that we are charting unexplored waters. In the crucible of modern enterprise, it is paramount to remember that synergy isn't just an aspirational strategy—it is a non-negotiable paradigm shift.",
    extraMeta: "#FutureOfWork #ExecutiveMindset #HyperScale #Synergy",
    accentColor: "#0a66c2",
    likesOrReplies: "1,940 reactions • 512 comments • 182 reposts",
  },

  // 4. Tech Blog Header & Excerpt
  {
    type: "blog",
    author: "DevOps Insights Blog",
    handleOrRole: "By Principal Cloud Architect • 6 min read",
    badgeText: "TECH BLOG",
    timestamp: "October 2026",
    title: "Demystifying Holistic Cloud Architecture Across Microservices",
    body: "It is imperative to meticulously elucidate that our robust architectural paradigm boasts seamless redundancy. By leveraging proactive heuristics, we ensure comprehensive end-to-end verification without compromising bandwidth.",
    extraMeta: "Categories: Infrastructure, Distributed Systems, Optimization",
    accentColor: "#6366f1",
    likesOrReplies: "1,240 claps • 45 highlights",
  },

  // 5. Landing Page Hero / SaaS Website Copy
  {
    type: "website",
    author: "NexusFlow AI",
    handleOrRole: "https://nexusflow.io/solutions",
    badgeText: "SAAS HERO",
    timestamp: "v3.4 Production",
    title: "Empowering Next-Gen Synergy for Scalable Paradigms",
    body: "Unlock unprecedented exponential potential with our groundbreaking platform. Seamlessly harmonize multi-tenant workflows and revolutionize cross-functional synergy with turnkey transformer integration.",
    extraMeta: "SOC-2 Type II Certified • 99.99% Guaranteed SLA Uptime",
    accentColor: "#059669",
    likesOrReplies: "Free 14-day trial • No credit card required",
  },

  // 6. Scientific / Research Article
  {
    type: "article",
    author: "Quarterly Review of AI Ergonomics",
    handleOrRole: "Peer-Reviewed Article • DOI: 10.1038/s41586-026",
    badgeText: "ACADEMIC PAPER",
    timestamp: "Vol. 14, Issue 3",
    title: "A Comprehensive Synthesis of Stochastic Latency Attenuation",
    body: "This investigation serves as a pivotal testament to the profound interplay between parametric token variance and syntactic coherence. We rigorously scrutinized multi-layer attention distributions across extensive corpora.",
    extraMeta: "Keywords: syntactic variance, generative fidelity, empirical benchmarks",
    accentColor: "#8b5cf6",
    likesOrReplies: "Cited by 84 publications • 1.2k PDF downloads",
  },

  // 7. Corporate Email / Customer Success Pitch
  {
    type: "email",
    author: "Sarah Jenkins <sarah.j@enterprisecorp.io>",
    handleOrRole: "Subject: Strategic Alignment & Synergistic Opportunities for Q4",
    badgeText: "INBOX",
    timestamp: "Today, 10:42 AM",
    body: "Hi Team,\n\nI hope this email finds you well. I am reaching out to cordially follow up on our earlier dialogue. It is quintessential that we align our strategic milestones to foster holistic collaboration and optimize our mutual value proposition.",
    extraMeta: "Attachments: Q4_Alignment_Roadmap.pdf (4.2 MB)",
    accentColor: "#ea580c",
    likesOrReplies: "Reply • Reply All • Forward",
  },

  // 8. Direct Message / Slack Enterprise Chat
  {
    type: "chat",
    author: "Bradley Cooper [VP of Strategy]",
    handleOrRole: "#product-leadership-sync • Slack",
    badgeText: "DIRECT CHAT",
    timestamp: "11:15 AM",
    body: "Hey folks, just wanted to circle back on our bandwidth for the upcoming sync. Can we take a proactive step and touch base offline? We need to make sure all stakeholders are singing from the same hymn sheet regarding the pivotal deliverables.",
    extraMeta: "Thread: 8 replies from VP Engineering & Head of Product",
    accentColor: "#14b8a6",
    likesOrReplies: "👀 6  🚀 4  🙌 9  ✅ 3",
  },
];

// Helper to draw clean rounded rectangles
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor?: string,
  strokeColor?: string,
  lineWidth?: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor && lineWidth) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

// Word-wrap utility for clean typography
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const paragraphs = text.split("\n");
  let currentY = y;

  for (const para of paragraphs) {
    if (para.trim() === "") {
      currentY += lineHeight * 0.7;
      continue;
    }

    const words = para.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }

  return currentY;
}

/**
 * Generates an ultra crisp Canvas element rendered at high DPI (1000 x 1333)
 */
export function generateSlopCardCanvas(item: SlopCardItem): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const width = 1000;
  const height = 1333;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // 1. Crisp Card Outer Background (White with subtle warmth)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Soft border container
  drawRoundRect(ctx, 30, 30, width - 60, height - 60, 36, "#ffffff", "#e2e8f0", 4);

  // 2. Top Color Branding Ribbon
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(30, 30, width - 60, 18, [36, 36, 0, 0]);
  ctx.fillStyle = item.accentColor;
  ctx.fill();
  ctx.restore();

  // 3. Top Platform Badge Pill
  drawRoundRect(ctx, 60, 75, 160, 38, 19, `${item.accentColor}18`, item.accentColor, 2);
  ctx.fillStyle = item.accentColor;
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(item.badgeText, 140, 100);

  // Timestamp on the right
  ctx.fillStyle = "#94a3b8";
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(item.timestamp, width - 70, 100);

  // 4. Header with Avatar & Author Meta
  const avatarX = 100;
  const avatarY = 185;
  const avatarR = 40;

  // Avatar Circle
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
  ctx.fillStyle = item.accentColor;
  ctx.fill();

  // Avatar Initials
  const initials = item.author
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(initials, avatarX, avatarY + 9);

  // Author Name
  ctx.textAlign = "left";
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(item.author, 165, 175);

  // Handle / Subtitle
  ctx.fillStyle = "#64748b";
  ctx.font = "500 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const truncatedHandle = item.handleOrRole.length > 55 ? item.handleOrRole.slice(0, 52) + "..." : item.handleOrRole;
  ctx.fillText(truncatedHandle, 165, 205);

  // Thin separator
  ctx.strokeStyle = "#f1f5f9";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 250);
  ctx.lineTo(width - 60, 250);
  ctx.stroke();

  let nextY = 300;

  // 5. Optional Article/Blog/Website Title
  if (item.title) {
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    nextY = wrapText(ctx, item.title, 65, nextY, width - 130, 44);
    nextY += 24;
  }

  // 6. Main Body Text (Simulating AI Slop Buzzwords)
  ctx.fillStyle = "#334155";
  ctx.font = "400 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Georgia, serif";
  nextY = wrapText(ctx, item.body, 65, nextY, width - 130, 38);
  nextY += 30;

  // 7. Visual Media Box (for Instagram, Blog, or Website)
  if (item.type === "instagram") {
    // Beautiful aesthetic photo mockup inside the post
    const mediaH = 340;
    const mediaY = Math.min(nextY, height - 480);
    drawRoundRect(ctx, 65, mediaY, width - 130, mediaH, 24, "#0f172a");

    // Vibrant gradient background
    const grad = ctx.createLinearGradient(65, mediaY, width - 65, mediaY + mediaH);
    grad.addColorStop(0, "#4f46e5");
    grad.addColorStop(0.5, "#ec4899");
    grad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(65, mediaY, width - 130, mediaH, 24);
    ctx.fill();

    // Center aesthetic graphic badge
    drawRoundRect(ctx, width / 2 - 140, mediaY + mediaH / 2 - 35, 280, 70, 35, "rgba(255, 255, 255, 0.25)", "#ffffff", 2);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SYNTHETIC VIBES", width / 2, mediaY + mediaH / 2 + 8);

    nextY = mediaY + mediaH + 30;
  } else if (item.type === "website" || item.type === "blog") {
    // Code / Quote snippet box
    const snippetH = 150;
    const snippetY = Math.min(nextY, height - 330);
    drawRoundRect(ctx, 65, snippetY, width - 130, snippetH, 18, "#f8fafc", "#e2e8f0", 2);
    
    // Left decorative color bar
    ctx.fillStyle = item.accentColor;
    ctx.fillRect(65, snippetY, 8, snippetH);

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 18px monospace";
    ctx.textAlign = "left";
    ctx.fillText("export default function EnterpriseSynergy() {", 95, snippetY + 45);
    ctx.fillStyle = "#64748b";
    ctx.fillText("  // Meticulously optimizing holistic cloud paradigm", 95, snippetY + 80);
    ctx.fillStyle = item.accentColor;
    ctx.fillText("  return <ParadigmShift seamless={true} />;", 95, snippetY + 115);

    nextY = snippetY + snippetH + 30;
  }

  // 8. Extra Metadata / Hashtags
  if (item.extraMeta) {
    ctx.fillStyle = item.accentColor;
    ctx.font = "600 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    wrapText(ctx, item.extraMeta, 65, Math.min(nextY, height - 170), width - 130, 28);
  }

  // 9. Bottom Footer Bar (Social Metrics / Engagement Stats)
  const footerY = height - 90;
  ctx.strokeStyle = "#f1f5f9";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, footerY);
  ctx.lineTo(width - 60, footerY);
  ctx.stroke();

  if (item.likesOrReplies) {
    ctx.fillStyle = "#64748b";
    ctx.font = "500 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(item.likesOrReplies, 65, footerY + 45);
  }

  // Right-aligned clean indicator
  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 16px monospace";
  ctx.textAlign = "right";
  ctx.fillText("LEXICAL LAYER", width - 65, footerY + 45);

  return canvas;
}
