import type { ReactNode } from "react";

const ACCENT = "#ff2f8f";
const LINE = "rgba(255,255,255,0.42)";
const LINE_SOFT = "rgba(255,255,255,0.24)";
const STROKE = 1.5;

/* ---------- Decorative artwork, one per card ---------- */

function GlobeArt() {
  return (
    <svg viewBox="85 25 130 130" className="h-full w-full" fill="none" strokeWidth={STROKE}>
      <circle cx="150" cy="90" r="58" stroke={LINE} strokeDasharray="2 4" />
      <circle cx="150" cy="90" r="42" stroke={LINE} />
      <ellipse cx="150" cy="90" rx="42" ry="16" stroke={LINE} />
      <ellipse cx="150" cy="90" rx="42" ry="16" stroke={LINE} transform="rotate(60 150 90)" />
      <ellipse cx="150" cy="90" rx="42" ry="16" stroke={LINE} transform="rotate(120 150 90)" />
      <line x1="108" y1="90" x2="192" y2="90" stroke={LINE} />
      <line x1="150" y1="48" x2="150" y2="132" stroke={LINE} />
      <circle cx="127" cy="72" r="4" fill={ACCENT} />
      <line x1="127" y1="72" x2="150" y2="90" stroke={ACCENT} strokeWidth="1.2" strokeOpacity="0.7" />
    </svg>
  );
}

function PipelineArt() {
  return (
    <svg viewBox="70 20 160 160" className="h-full w-full" fill="none" strokeWidth={STROKE}>
      <path d="M60 60 C 110 60, 110 90, 160 90 S 210 120, 240 120" stroke={LINE} />
      <path d="M60 80 C 110 80, 110 105, 160 105 S 210 130, 240 130" stroke={LINE} />
      <path d="M60 100 C 110 100, 110 120, 160 120 S 210 140, 240 140" stroke={LINE_SOFT} />
      <path d="M60 40 C 110 40, 110 75, 160 75 S 210 105, 240 105" stroke={LINE_SOFT} />
      <circle cx="160" cy="90" r="4.5" fill={ACCENT} />
    </svg>
  );
}

function NoColdStartArt() {
  return (
    <svg viewBox="90 30 120 120" className="h-full w-full" fill="none" strokeWidth={STROKE}>
      <circle cx="150" cy="90" r="46" stroke={LINE} strokeDasharray="2 5" />
      <circle cx="196" cy="90" r="3" fill={LINE} />
      <circle cx="150" cy="44" r="2.5" fill={LINE} />
      <circle cx="180" cy="130" r="2.5" fill={LINE} />
      <circle cx="112" cy="60" r="2.5" fill={LINE} />
      <path
        d="M154 62 L134 96 L148 96 L144 120 L168 84 L152 84 Z"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TerminalArt() {
  return (
    <svg viewBox="89 21 130 130" className="h-full w-full" fill="none" strokeWidth={STROKE}>
      <rect x="100" y="46" width="108" height="80" rx="8" stroke={LINE} />
      <line x1="100" y1="68" x2="208" y2="68" stroke={LINE} />
      <circle cx="190" cy="57" r="2.8" fill={ACCENT} />
      <circle cx="180" cy="57" r="2.8" fill={LINE} />
      <text x="112" y="92" fill={ACCENT} fontSize="16" fontFamily="monospace">
        &gt;_
      </text>
      <line x1="112" y1="102" x2="170" y2="102" stroke={LINE_SOFT} />
      <line x1="112" y1="112" x2="150" y2="112" stroke={LINE_SOFT} />
    </svg>
  );
}

function CubeArt() {
  return (
    <svg viewBox="85 20 130 130" className="h-full w-full" fill="none" strokeWidth={STROKE}>
      <path d="M150 46 L188 66 L150 86 L112 66 Z" stroke={LINE} strokeLinejoin="round" />
      <path d="M112 66 L112 104 L150 124 L150 86 Z" stroke={LINE} strokeLinejoin="round" />
      <path d="M188 66 L188 104 L150 124 L150 86 Z" stroke={LINE} strokeLinejoin="round" />
      <circle cx="150" cy="66" r="4" fill={ACCENT} />
    </svg>
  );
}

function LayersArt() {
  return (
    <svg viewBox="80 18 140 140" className="h-full w-full" fill="none" strokeWidth={STROKE}>
      <path d="M150 44 L192 64 L150 84 L108 64 Z" stroke={LINE_SOFT} strokeLinejoin="round" />
      <path d="M150 68 L192 88 L150 108 L108 88 Z" stroke={LINE} strokeLinejoin="round" />
      <path d="M150 92 L192 112 L150 132 L108 112 Z" stroke={ACCENT} strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Card data ---------- */

interface FeatureCard {
  number: string;
  title: string;
  description: string;
  tag: string;
  art: ReactNode;
}

const cards: FeatureCard[] = [
  {
    number: "01",
    title: "Distributed nodes. Lower latency.",
    description:
      "Every request routes to the lowest TTF node for that user. PolarGrid removes 100ms+ network hops by running inference at the edge, not in distant cloud regions.",
    tag: "<30ms P95",
    art: <GlobeArt />,
  },
  {
    number: "02",
    title: "Full pipeline. One hop.",
    description:
      "STT → LLM → TTS runs co-located on a single node — no cross-service calls, no cross-region round trips. The entire voice pipeline completes in under 300ms.",
    tag: "sub-300ms TTFA",
    art: <PipelineArt />,
  },
  {
    number: "03",
    title: "No cold starts. Ever.",
    description:
      "Models are loaded and warm on PolarGrid nodes 24/7. No spinning up containers, no queue waiting, no first-request penalty. Request in, inference out.",
    tag: "0ms cold start",
    art: <NoColdStartArt />,
  },
  {
    number: "04",
    title: "OpenAI-compatible API.",
    description:
      "Drop-in replacement. Change one line of code — your base URL — and you're on PolarGrid. Every SDK, framework, and tool you already use continues to work.",
    tag: "1 line to switch",
    art: <TerminalArt />,
  },
  {
    number: "05",
    title: "Top open weight models.",
    description:
      "Qwen 3.5, PersonaPlex, Whisper V3, Cohere Transcribe, Hume AI TADA, Kokoro. Best in class open weight models for STT, LLM and TTS — all on a single platform.",
    tag: "6+ models",
    art: <CubeArt />,
  },
  {
    number: "06",
    title: "Host your fine-tuned and proprietary models.",
    description:
      "Leverage PolarGrid to host your own models at the edge, drastically cutting network latency and realizing material improvements in TTFT.",
    tag: "Bring Your Own Model",
    art: <LayersArt />,
  },
];

/* ---------- Component ---------- */

export default function PolarGridFeatureCards() {
  return (
    <section className="bg-black px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.number}
            className="group flex flex-col justify-between bg-black p-5 transition-colors duration-300 hover:bg-white/[0.03]"
          >
            {/* top row: full-width text, small artwork icon anchored top-right */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-xs font-medium tracking-widest text-white/35">
                  {card.number}
                </span>

                <h3 className="mt-2 text-xl font-bold leading-snug text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {card.description}
                </p>
              </div>

              <div className="h-20 w-20 shrink-0 sm:h-20 sm:w-20">
                {card.art}
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-3">
              <span className="text-sm font-semibold" style={{ color: ACCENT }}>
                {card.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
