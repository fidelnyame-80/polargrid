import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Activity, Gift, Zap } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function TriangleShape({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="250.066 134.4 216.7 154.7"
            className={className}
        >
            <path
                d="M259 289 459 289C466 287 471 277 461 266L369 140C364 133 354 132 347 141L255 266C248 273 248 289 259 289"
                fill="#ffffff"
            />
        </svg>
    );
}

// Radius the callouts travel around (px from the ring's center).
const ORBIT_RADIUS = 280;
// Seconds for one full revolution.
const ORBIT_DURATION = 90;

const BOX_WIDTH = 158;
const BOX_HEIGHT = 115;

/**
 * Pre-computes a circular path as plain translate(x, y) keyframe steps —
 * no rotate() anywhere. The box's own orientation never changes; only its
 * position moves in a circle, so the triangle and its text stay upright and
 * readable for the entire orbit.
 */
function buildOrbitTranslateKeyframes(radius: number, steps = 72): string {
    let body = "";
    for (let i = 0; i <= steps; i++) {
        const pct = (i / steps) * 100;
        const angle = (i / steps) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        body += `${pct.toFixed(3)}% { transform: translate(${x.toFixed(2)}px, ${y.toFixed(2)}px); }\n`;
    }
    return `@keyframes orbit-translate {\n${body}}`;
}

const ORBIT_KEYFRAMES = buildOrbitTranslateKeyframes(ORBIT_RADIUS);

interface OrbitCalloutConfig {
    // Degrees, clockwise from the right (0 = right, 90 = bottom, 180 = left, 270 = top).
    startAngle: number;
    icon: ReactNode;
    value: string;
    label: string;
}

const CALLOUTS: OrbitCalloutConfig[] = [
    { startAngle: 270, icon: <Zap className="h-[14.4px] w-[14.4px]" strokeWidth={2} />, value: "sub-300ms", label: "Time to first audio" },
    { startAngle: 0, icon: <Activity className="h-[14.4px] w-[14.4px]" strokeWidth={2} />, value: "<30ms", label: "P95 round-trip latency" },
    { startAngle: 90, icon: <Gift className="h-[14.4px] w-[14.4px]" strokeWidth={2} />, value: "$500", label: "Free to start" },
    { startAngle: 180, icon: <ArrowUpRight className="h-[14.4px] w-[14.4px]" strokeWidth={2} />, value: "70%+", label: "Latency reduction vs cloud" },
];

function OrbitingCallout({ startAngle, icon, value, label }: OrbitCalloutConfig) {
    // A negative delay starts the animation partway through its cycle, so each
    // callout begins at its own point on the ring instead of all starting at 0deg.
    const delay = -(startAngle / 360) * ORBIT_DURATION;

    return (
        <div
            className="absolute"
            style={{
                left: "50%",
                top: "50%",
                width: BOX_WIDTH,
                height: BOX_HEIGHT,
                marginLeft: -BOX_WIDTH / 2,
                marginTop: -BOX_HEIGHT / 2,
                animation: `orbit-translate ${ORBIT_DURATION}s linear infinite`,
                animationDelay: `${delay}s`,
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
            }}
        >
            {/* Fixed orientation, never rotates — it just rides along as the
                whole box translates around the ring. */}
            <TriangleShape className="absolute inset-0 h-full w-full" />

            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-black"
                style={{ paddingTop: 29 }}
            >
                {icon}
                <span className="mt-1 font-bold leading-none" style={{ fontSize: 17 }}>{value}</span>
                <span
                    className="mx-auto mt-0.5 max-w-[86px] font-bold uppercase leading-tight tracking-wide"
                    style={{ fontSize: 9, color: "rgba(0,0,0,0.8)" }}
                >
                    {label}
                </span>
            </div>
        </div>
    );
}

function Callouts() {
    return (
        <div className="absolute inset-0">
            {CALLOUTS.map((c) => (
                <OrbitingCallout key={c.label} {...c} />
            ))}
        </div>
    );
}

export default function GlobalGpuShowcase() {
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ringRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ringRef.current,
                { scale: 0, transformOrigin: "50% 50%" },
                {
                    scale: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ringRef.current,
                        start: "top 110%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative px-4 py-14" style={{ backgroundColor: "#050506" }}>
            <style>{ORBIT_KEYFRAMES}</style>
            {/* Ring + callouts */}
            <div
                ref={ringRef}
                className="relative mx-auto"
                style={{ width: 560, height: 560, maxWidth: "100%" }}
            >
                <div
                    className="absolute inset-0 rounded-full blur-3xl"
                    style={{ boxShadow: "0 0 0 4px rgba(255,255,255,0.8)", opacity: 0.55 }}
                />
                <div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.9)", opacity: 0.7 }}
                />
                <div
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: "rgba(255,255,255,0.9)" }}
                />

                <div className="absolute  inset-0  flex flex-col items-center justify-center px-12 text-center">
                    <h2 className="text-2xl font-semibold leading-tight bg-gradient-to-r from-white via-pink-200 to-pink-600 bg-clip-text text-transparent md:text-3xl">
                        PolarGrid runs  
                        <br/>
                        GPU nodes at  
                        <br />
                        the edge.
                    </h2>
                    <p className="mt-3 max-w-[264px] text-sm leading-relaxed text-zinc-400">
                        Deploy inference at the edge with lower latency, higher throughput, and
                        predictable performance.
                    </p>
                </div>

                <Callouts />
            </div>


        </section>
    );
}