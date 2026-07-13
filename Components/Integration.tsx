"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const features = [
  {
    title: "Auto-routing built in",
    description:
      "The SDK pings edge nodes and selects the fastest healthy route. No config required.",
    icon: (
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6.6 6.6l2.1 2.1m6.6 6.6 2.1 2.1m0-10.8-2.1 2.1m-6.6 6.6-2.1 2.1M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
    ),
  },
  {
    title: "Same auth model",
    description:
      "API keys work the same way. Generate one in the console at app.polargrid.ai.",
    icon: (
      <path d="M7 11V8a5 5 0 0 1 10 0v3M6.5 11h11A1.5 1.5 0 0 1 19 12.5v6A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-6A1.5 1.5 0 0 1 6.5 11ZM12 15v2" />
    ),
  },
  {
    title: "Python & TypeScript SDKs",
    description:
      "Native SDKs available, or use any OpenAI-compatible library directly.",
    icon: (
      <path d="M8 4v3M16 4v3M5 8h14M7 5h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3.5 8.5 1.5 1.5 3-4" />
    ),
  },
];

export default function Integration() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden bg-[#050506] px-6 pb-24 pt-20 sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,255,255,.055),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.32em] text-[#E91E8C]">
            Integration
          </span>

          <h2 className="mt-5 text-[clamp(2.35rem,5vw,4.1rem)] font-black leading-[0.98] tracking-tight text-white">
            One line to switch.
          </h2>

          <p className="mt-6 max-w-[590px] text-base leading-8 text-[#c8d3ff]/80 sm:text-lg">
            PolarGrid is a drop-in replacement for the OpenAI API. Change your
            base URL and you&apos;re done. Every SDK, framework, and integration
            you already use continues to work.
          </p>

          <div className="mt-9 grid gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#E91E8C]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{feature.title}</h3>
                  <p className="mt-1 max-w-[460px] text-sm leading-6 text-[#c8d3ff]/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3">
            <Command text="pip install polargrid-sdk" />
            <Command text="npm install @polargrid/polargrid-sdk" />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c0c10] shadow-[0_28px_100px_rgba(0,0,0,.45)]">
          <div className="flex h-10 items-center gap-2 border-b border-white/[0.08] bg-white/[0.035] px-5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/14" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="ml-3 text-xs text-white/28">migration.ts</span>
          </div>

          <div className="space-y-9 px-6 py-7 sm:px-8">
            <CodeSnippet variant="before" />
            <CodeSnippet variant="after" />

            <div className="space-y-2 text-[13px] leading-6 text-[#5e6d8f]">
              <p>// Same API. Same models interface.</p>
              <p>// Sub-300ms TTFA. Up to 70% lower latency.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function CodeSnippet({ variant }: { variant: "before" | "after" }) {
  const isAfter = variant === "after";

  return (
    <pre className="overflow-x-auto text-[12px] leading-7 sm:text-[13px]">
      <code>
        <Line className="text-[#5e6d8f]">
          {isAfter
            ? "// After: PolarGrid - edge-routed, faster"
            : "// Before: any OpenAI-compatible provider"}
        </Line>
        <Line className="mt-2 font-semibold text-white">
          <Syntax color="pink">const</Syntax> client = <Syntax color="pink">new</Syntax>{" "}
          <Syntax color="green">OpenAI</Syntax>({"{"}
        </Line>
        <Line>
          {"  "}
          <Syntax color="green">baseURL</Syntax>:{" "}
          <Syntax color="green">
            &quot;
            {isAfter
              ? "https://autorouter.polargrid.ai/v1"
              : "https://api.openai.com/v1"}
            &quot;
          </Syntax>
          ,
        </Line>
        <Line>
          {"  "}
          <Syntax color="green">apiKey</Syntax>: process.env.
          <Syntax color="green">
            {isAfter ? "POLARGRID_API_KEY" : "OPENAI_API_KEY"}
          </Syntax>
          ,
        </Line>
        <Line>{"});"}</Line>
      </code>
    </pre>
  );
}

function Line({
  children,
  className = "text-white",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`block ${className}`}>{children}</span>;
}

function Syntax({
  children,
  color,
}: {
  children: ReactNode;
  color: "green" | "pink";
}) {
  return (
    <span className={color === "green" ? "text-[#4dff9d]" : "text-[#ff2f8f]"}>
      {children}
    </span>
  );
}

function Command({ text }: { text: string }) {
  return (
    <div className="w-fit rounded-lg border border-white/[0.08] bg-black/35 px-4 py-2 font-mono text-xs text-[#d8e0ff]">
      {text}
    </div>
  );
}
