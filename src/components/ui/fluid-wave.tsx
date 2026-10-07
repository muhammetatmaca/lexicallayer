"use client";

import { useEffect, useRef } from "react";
import { bindFullscreenQuad, createProgram, hexToRgb } from "@/lib/webgl";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

// Hash function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// 2D Noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Fractional Brownian Motion (fbm)
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.08;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.45;

  // Horizontal motion and curve
  float x = uv.x + 0.08 * sin(uv.y * 3.5 + t * 0.8);

  // Dynamic ascending wave turbulence
  float a = fbm(vec2(x * 2.8, uv.y * 1.8 - t));
  float b = fbm(vec2(x * 5.2 + 3.1, uv.y * 3.2 - t * 1.6));
  float f = a * 0.7 + b * 0.45;

  // Height taper
  float e = clamp(f * 2.6 - uv.y * 1.8, 0.0, 1.0);

  // Vibrant high-visibility alpha
  float alpha = 0.65 * smoothstep(0.02, 0.45, e) + 0.85 * smoothstep(0.45, 0.95, e);

  // Dual tone color modulation: deep electric blue to glowing cyan crests
  vec3 baseColor = u_color;
  vec3 crestColor = vec3(0.2, 0.75, 1.0);
  vec3 finalColor = mix(baseColor, crestColor, smoothstep(0.3, 0.9, e));

  gl_FragColor = vec4(finalColor * alpha, alpha);
}
`;

export default function FluidWave({ color = "#0272FC" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) return;

    const compiled = createProgram(gl, VERT, FRAG);
    if (!compiled) return;

    gl.useProgram(compiled.program);
    const quad = bindFullscreenQuad(gl, compiled.program, "a_pos");

    const uResolution = gl.getUniformLocation(compiled.program, "u_resolution");
    const uTime = gl.getUniformLocation(compiled.program, "u_time");
    const uColor = gl.getUniformLocation(compiled.program, "u_color");
    gl.uniform3f(uColor, ...hexToRgb(color));

    let frame = 0;
    const startTime = performance.now();

    const draw = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, 12.0 + elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    // Start loop immediately
    frame = requestAnimationFrame(loop);

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth));
      const h = Math.max(1, Math.round(canvas.clientHeight));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResolution, w, h);
      draw();
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(quad);
      compiled.dispose();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80"
    />
  );
}
