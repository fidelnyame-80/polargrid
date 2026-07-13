"use client";

import Link from "next/link";
import SideRays from "@/Components/SideRays"

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-[#050506]">
            {/* Background */}
            <div className="absolute inset-0">
                <SideRays
                    rayColor1="#ffffff"
                    rayColor2="#f3d8e8"
                    intensity={1.6}
                    speed={3.6}
                    spread={1.8}
                    falloff={1.5}
                    origin="top-right"
                />
                <SideRays
                    rayColor1="#ffffff"
                    rayColor2="#f3d8e8"
                    intensity={1.2}
                    speed={2.8}
                    spread={1.4}
                    falloff={1.5}
                    origin="top-left"
                />
                {/* second left light source — lower, softer, to balance the top-right ray */}
                <SideRays
                    rayColor1="#ffffff"
                    rayColor2="#f3d8e8"
                    intensity={0.9}
                    speed={2.2}
                    spread={1.2}
                    falloff={1.6}
                    origin="bottom-left"
                />

                {/* subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#050506_100%)]" />

                {/* noise */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

                {/* left-side ambient glow */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-start">
                    <div className="-ml-[15%] h-[800px] w-[500px] rounded-full bg-white/[0.02] blur-[300px]" />
                </div>
            </div>

            <div className="lg:mt-30 relative mx-auto flex min-h-screen max-w-7xl items-center px-6">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
                        <span className="h-2 w-2 rounded-full bg-[#C2185B]" />

                        <span className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-300">
                            Early Access · Now Open
                        </span>
                    </div>

                    {/* Heading */}

                    <h1 className="max-w-4xl text-balance text-[clamp(3.5rem,7vw,4rem)] font-black leading-[0.95] tracking-[-0.05em] text-white">
                        AI Inference.
                        <br />
                        <span className="bg-gradient-to-r from-white via-pink-200 to-pink-600 bg-clip-text text-transparent">
                            Faster.
                        </span>
                    </h1>

                    {/* Subtitle */}

                    <p className="mt-12 max-w-2xl text-lg leading-8 text-zinc-400">
                        Global GPU infrastructure built for modern AI.
                        Deploy inference at the edge with lower latency,
                        higher throughput, and predictable performance.
                    </p>

                    {/* CTA */}

                    <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="#"
                            className="
              rounded-full
              border
              border-white/10
              bg-white
              px-8
              py-5
              font-semibold
              text-black
              transition
              hover:scale-[1.02]
            "
                        >
                            Start now with $500 in credits →
                        </Link>

                        <Link
                            href="#"
                            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              px-8
              py-5
              font-semibold
              text-white
              backdrop-blur-xl
              transition
              hover:bg-white/[0.06]
            "
                        >
                            Explore Docs
                        </Link>
                    </div>

                    <BuiltFor />
                </div>
            </div>
        </section>
    );
}

function BuiltFor() {
  const items = [
    "VOICE AI",
    "AGENTS",
    "REALTIME CHAT",
    "CODING",
    "SEARCH",
  ];

  return (
    <div className="mt-30 flex flex-col items-center">
      {/* Items */}
      <div className="flex items-center justify-center gap-3 md:gap-6">
        {items.map((item, index) => (
          <div key={item} className="flex items-center">
            <span
              className="
                text-[clamp(12px,1.6vw,17px)]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-white/65
                whitespace-nowrap
                transition-all
                duration-300
                hover:text-white
              "
            >
              {item}
            </span>

            {index !== items.length - 1 && (
              <span className="mx-4 text-[#E91E8C]/70 select-none">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}