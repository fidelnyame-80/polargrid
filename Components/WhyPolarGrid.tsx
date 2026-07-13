"use client";

import { motion } from "framer-motion";
import CircularComponent from "@/Components/CircularComponent";
import ModelCatalog from "@/Components/ModelCatalog";
import PolarGridFeatureCards from "@/Components/PolarGridFeatureCards";

export default function WhyPolarGrid() {
  return (
    <section className="relative overflow-hidden bg-[#050506] pb-30">
      {/* Right-side radial glow (behind circle area) */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-end">
        <div className="mr-[5%] mt-[10%] h-[700px] w-[700px] rounded-full bg-white/[0.025] blur-[220px]" />
      </div>

      <div className=" relative mx-[7%] max-w-7xl px-10">

        {/* CircularComponent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full"
        >
          <CircularComponent />
        </motion.div>

        {/* Eyebrow title */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 block text-xs font-semibold uppercase tracking-[0.35em] text-[#E91E8C]"
        >
          WHY POLARGRID
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 font-bold leading-[1.02] tracking-tight bg-gradient-to-r from-white via-pink-200 to-pink-600 bg-clip-text text-transparent lg:text-[clamp(2rem,3.3vw,3rem)]"
        >
          Built for latency-critical AI.
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-[620px] text-left text-lg leading-8 text-white/60"
        >
          Every design decision is optimized for one thing: making your AI models as fast as possible.
        </motion.p>

        <PolarGridFeatureCards />

      </div>
      <ModelCatalog />
    </section>
  );
}
