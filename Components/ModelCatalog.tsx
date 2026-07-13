"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ACCENT = "#ff3ba7";
const LINE = "rgba(255,255,255,0.28)";
const LINE_SOFT = "rgba(255,255,255,0.12)";

type IconName = "chat" | "wave" | "cube" | "sine" | "rocket" | "pipeline";
type ArtName = "cube" | "wave" | "bars" | "dots" | "pipeline";

interface CatalogCard {
  title: string;
  subtitle: string;
  price: string;
  unit?: string;
  label: string;
  icon: IconName;
  art?: ArtName;
  className: string;
  flow?: boolean;
  variant?: "whisper";
}

function MiniIcon({ name }: { name: IconName }) {
  const common = {
    stroke: ACCENT,
    strokeWidth: 1.8,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <div className="grid h-11 w-11 place-items-center rounded-[9px] border border-white/15 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_26px_rgba(255,59,167,0.08)]">
      <svg viewBox="0 0 32 32" className="h-6 w-6">
        {name === "chat" && (
          <>
            <rect x="7" y="8" width="18" height="14" rx="4" {...common} />
            <path d="M13 22l-3 4v-4" {...common} />
            <path d="M12 15h.1M16 15h.1M20 15h.1" {...common} strokeWidth={2.6} />
          </>
        )}
        {name === "wave" && (
          <>
            <path d="M8 18v-4M12 22V10M16 25V7M20 22V10M24 18v-4" {...common} />
          </>
        )}
        {name === "cube" && (
          <>
            <path d="M16 5l10 5.5v11L16 27 6 21.5v-11L16 5z" {...common} />
            <path d="M6 10.5l10 5.6 10-5.6M16 16.1V27" {...common} />
          </>
        )}
        {name === "sine" && <path d="M6 17c4 0 3-8 7-8s3 14 7 14 3-8 6-8" {...common} />}
        {name === "rocket" && (
          <>
            <path d="M11 21c2-8 8-14 15-15-1 7-7 13-15 15z" {...common} />
            <path d="M10 17l-4 1.5 3.5 3.5L11 18M14 22l-1.5 4 5-2" {...common} />
            <circle cx="20" cy="12" r="2" {...common} />
          </>
        )}
        {name === "pipeline" && (
          <>
            <path d="M8 13h16M8 19h16" {...common} />
            <path d="M10 10v12M22 10v12" {...common} />
            <path d="M13 13l4-4v14l4-4" {...common} />
          </>
        )}
      </svg>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[9px] border border-white/10 bg-white/[0.045] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      {children}
    </span>
  );
}

function CubeArt({ large = false }: { large?: boolean }) {
  return (
    <svg viewBox="0 0 140 130" className={large ? "h-28 w-32" : "h-24 w-28"} fill="none">
      <path d="M70 11l52 30v58l-52 30-52-30V41L70 11z" stroke={LINE} />
      <path d="M18 41l52 30 52-30M70 71v58M70 11v60" stroke={LINE} />
      <path d="M44 26v88M96 26v88M18 70l52-30 52 30M18 99l52-30 52 30" stroke={LINE_SOFT} />
      <path d="M101 44l19-11v22z" fill={ACCENT} opacity=".85" />
      <circle cx="98" cy="99" r="3" fill={ACCENT} filter="url(#pinkGlowCube)" />
      <defs>
        <filter id="pinkGlowCube" x="80" y="81" width="36" height="36">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function WaveArt() {
  return (
    <svg viewBox="0 0 190 90" className="h-20 w-40" fill="none">
      {[0, 1, 2, 3, 4].map((line) => (
        <path
          key={line}
          d={`M2 ${51 + line * 5}C40 ${51 + line * 5} 52 ${24 + line * 5} 88 ${24 + line * 5}S134 ${51 + line * 5} 182 ${51 + line * 5}`}
          stroke={line < 2 ? LINE : LINE_SOFT}
        />
      ))}
      <circle cx="180" cy="50" r="3" fill={ACCENT} filter="url(#waveGlow)" />
      <defs>
        <filter id="waveGlow" x="162" y="32" width="36" height="36">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function BarsArt() {
  const heights = [10, 14, 20, 28, 42, 56, 60, 48, 34, 20, 14, 10];

  return (
    <svg viewBox="0 0 140 86" className="h-20 w-36" fill="none">
      {heights.map((height, index) => (
        <rect
          key={index}
          x={index * 11 + 6}
          y={(86 - height) / 2}
          width="1.2"
          height={height}
          rx="0.6"
          fill="rgba(255,255,255,0.08)"
        />
      ))}
    </svg>
  );
}

function DotsArt() {
  return (
    <svg viewBox="0 0 180 86" className="h-20 w-44" fill="none">
      {Array.from({ length: 95 }).map((_, index) => {
        const x = 12 + (index % 19) * 8;
        const row = Math.floor(index / 19);
        const middle = Math.abs((index % 19) - 15);
        const height = Math.max(2, 22 - middle * 2 + row * 2);
        const y = 43 + (row - 2) * 5 + (height % 7);
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="1"
            fill={index % 4 === 0 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.13)"}
          />
        );
      })}
      <circle cx="160" cy="43" r="3" fill={ACCENT} filter="url(#dotsGlow)" />
      <defs>
        <filter id="dotsGlow" x="142" y="25" width="36" height="36">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function FlowGraphic() {
  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="grid h-14 w-14 place-items-center rounded-[8px] border border-dashed border-white/24 bg-black/20">
        <MiniIcon name="wave" />
      </div>
      <span className="text-lg text-white/65">-&gt;</span>
      <div className="grid h-14 w-14 place-items-center rounded-[8px] border border-dashed border-white/24 bg-black/20">
        <MiniIcon name="cube" />
      </div>
      <span className="text-lg text-white/65">-&gt;</span>
      <div className="grid h-14 w-14 place-items-center rounded-[8px] border border-dashed border-white/24 bg-black/20">
        <MiniIcon name="wave" />
      </div>
    </div>
  );
}

function DecorativeArt({ name }: { name?: ArtName }) {
  if (!name) return null;

  return (
    <div className="pointer-events-none absolute bottom-8 right-6 opacity-55 transition-opacity duration-300 group-hover:opacity-75">
      {name === "cube" && <CubeArt />}
      {name === "wave" && <WaveArt />}
      {name === "bars" && <BarsArt />}
      {name === "dots" && <DotsArt />}
    </div>
  );
}

const cards: CatalogCard[] = [
  {
    title: "Kokoro 82M",
    subtitle: "82M params - Apache 2.0",
    price: "$0.006 / min",
    label: "TTS",
    icon: "wave",
    art: "wave",
    className: "lg:col-start-1 lg:row-start-3 lg:h-[224px]",
  },
  {
    title: "Realtime Voice Pipeline",
    subtitle: "Whisper Large V3 Turbo - Qwen 3.5 9B - XTTS v2",
    price: "$0.018 / min",
    label: "PIPELINE",
    icon: "sine",
    className: "lg:col-start-1 lg:row-start-4 lg:h-[238px]",
    flow: true,
  },
  {
    title: "Qwen 3.5 27B",
    subtitle: "27B params - FP8 - Apache 2.0",
    price: "$0.20 / $0.75",
    unit: "per 1M tokens",
    label: "LLM",
    icon: "chat",
    art: "cube",
    className: "lg:col-start-2 lg:row-start-1 lg:h-[238px]",
  },
  {
    title: "Whisper Large V3 Turbo",
    subtitle: "OpenAI - 809M params - Apache 2.0",
    price: "$0.004 / min",
    label: "TTS",
    icon: "wave",
    art: "bars",
    variant: "whisper",
    className: "lg:col-start-2 lg:row-start-2 lg:h-[260px]",
  },
  {
    title: "Cohere Transcribe",
    subtitle: "3B params - 14 languages - Apache 2.0",
    price: "$0.004 / min",
    label: "STT",
    icon: "sine",
    art: "dots",
    className: "lg:col-start-2 lg:row-start-3 lg:h-[224px]",
  },
  {
    title: "XTTS v2",
    subtitle: "1.3B params - 17 languages - Apache 2.0",
    price: "$0.008 / min",
    label: "TTS",
    icon: "rocket",
    art: "wave",
    className: "lg:col-start-2 lg:row-start-4 lg:h-[238px]",
  },
  {
    title: "Qwen 3.5 9B",
    subtitle: "9B params - FP8 - Apache 2.0",
    price: "$0.055 / $0.085",
    unit: "per 1M tokens",
    label: "LLM",
    icon: "cube",
    art: "cube",
    className: "lg:col-start-3 lg:row-start-2 lg:h-[236px]",
  },
  {
    title: "Voice Pipeline",
    subtitle: "STT -> LLM -> TTS",
    price: "$0.013 / min",
    label: "PIPELINE",
    icon: "pipeline",
    className: "lg:col-start-3 lg:row-start-3 lg:row-span-2 lg:h-[482px]",
    flow: true,
  },
];

function WhisperCard({ card, index }: { card: CatalogCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      className={`group relative overflow-hidden rounded-[9px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018)_48%,rgba(255,255,255,0.045))] px-9 py-[34px] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur transition duration-300 hover:border-white/22 hover:bg-white/[0.04] ${card.className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,59,167,0.11),transparent_28%),radial-gradient(circle_at_16%_0%,rgba(255,255,255,0.08),transparent_26%)] opacity-70" />

      {/* Badge — positioned 28px from top/right */}
      <span className="absolute right-7 top-7 z-10">
        <Label>{card.label}</Label>
      </span>

      {/* Two-column layout */}
      <div className="relative z-10 flex h-full gap-6">
        {/* LEFT (60%) */}
        <div className="flex w-[58%] flex-col justify-between">
          <div>
            <MiniIcon name={card.icon} />
            <h3 className="mt-5 text-[22px] font-semibold leading-[1.05] tracking-[-0.01em] text-white">
              Whisper Large V3<br />Turbo
            </h3>
            <p className="mt-2 text-sm leading-5 text-white/64">
              OpenAI &bull; 809M params &bull; Apache 2.0
            </p>
          </div>

          <div className="mt-4">
            <div className="h-px w-full bg-white/10" />
            <p className="mt-4 text-[19px] font-bold leading-none text-[#ff4cad]">$0.004 / min</p>
          </div>
        </div>

        {/* RIGHT (38%) — waveform */}
        <div className="flex w-[38%] items-center justify-center">
          <div className="opacity-[0.08]">
            <BarsArt />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ModelCard({ card, index }: { card: CatalogCard; index: number }) {
  if (card.variant === "whisper") {
    return <WhisperCard card={card} index={index} />;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      className={`group relative min-h-[224px] overflow-hidden rounded-[9px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018)_48%,rgba(255,255,255,0.045))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur transition duration-300 hover:border-white/22 hover:bg-white/[0.04] ${card.className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,59,167,0.11),transparent_28%),radial-gradient(circle_at_16%_0%,rgba(255,255,255,0.08),transparent_26%)] opacity-70" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <MiniIcon name={card.icon} />
        <Label>{card.label}</Label>
      </div>

      <div className="relative z-10 mt-5 max-w-[72%]">
        <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-white">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-5 text-white/64">{card.subtitle}</p>
      </div>

      <div className="relative z-10 mt-4 h-px w-[64%] bg-white/10" />

      <div className="relative z-10 mt-4">
        <p className="text-[19px] font-bold leading-none text-[#ff4cad]">{card.price}</p>
        {card.unit && <p className="mt-2 text-sm text-white/72">{card.unit}</p>}
      </div>

      {card.flow && <div className="relative z-10">{<FlowGraphic />}</div>}
      <DecorativeArt name={card.art} />
    </motion.article>
  );
}

export default function ModelCatalog() {
  return (
    <section className="relative overflow-hidden bg-[#050506] px-8 pb-24 pt-20 text-white sm:px-12 lg:px-20 lg:pb-32 lg:pt-28 xl:px-24">
      <div className="pointer-events-none absolute left-1/2 top-16 h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[170px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[#ff2f8f]/[0.05] blur-[150px]" />

      <div className="relative mx-auto max-w-[1420px]">
        <div className="grid gap-8 lg:grid-cols-[440px_minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[238px_236px_224px_238px] lg:gap-5">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:pr-12"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ff3ba7]">
              Model Catalog
            </span>
            <h2 className="mt-7 max-w-[430px] text-[clamp(2.55rem,3.35vw,3.35rem)] font-bold leading-[1.08] text-white">
              Top open-weight models.
              <br />
              All in one place.
            </h2>
            <p className="mt-6 max-w-[405px] text-[17px] leading-7 text-white/58">
              STT, LLM, TTS, and complete voice pipelines, running at the edge.
            </p>

            <a
              href="#"
              className="group mt-14 inline-flex items-center gap-3 border-b border-[#ff3ba7] pb-3 text-sm font-semibold text-white transition hover:text-[#ff65ba] lg:mt-16"
            >
              View all models
              <span className="text-2xl leading-none transition group-hover:translate-x-1 group-hover:-translate-y-1">
                &#8599;
              </span>
            </a>
          </motion.div>

          {cards.map((card, index) => (
            <ModelCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
