"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const product = [
  "Console",
  "Documentation",
  "Pricing",
  "API Reference",
];

const company = [
  "About",
  "Blog",
  "Careers",
  "Contact",
];

const legal = [
  "Privacy",
  "Terms",
  "Cookies",
];

export default function FooterCTA() {
  return (
    <>
      {/* CTA */}
      <section className="relative overflow-hidden border-t border-zinc-900 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.07),transparent_50%),#050505] py-32">
        {/* layered glows */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-pink-500/8 blur-[190px]" />
          <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/5 blur-[90px]" />
        </div>
        {/* noise overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <span className="mb-5 rounded-full border border-pink-500/20 bg-pink-500/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-pink-200 shadow-[0_0_30px_rgba(236,72,153,.08)]">
            Ready to build?
          </span>

          <h2 className="max-w-3xl text-5xl font-bold tracking-tight text-white md:text-7xl">
            Deploy AI
            <br />
            without the infrastructure.
          </h2>

          <div className="mx-auto mt-6 h-px w-[110px]" style={{ background: "linear-gradient(90deg,transparent,rgba(236,72,153,0.6),transparent)" }} />

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
            Launch production-ready inference with globally distributed
            infrastructure engineered for speed and reliability.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-b from-pink-400 to-pink-600 px-8 font-semibold text-white shadow-[0_0_40px_rgba(236,72,153,.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_70px_rgba(236,72,153,.28)]"
            >
              Start Free

              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-zinc-800 px-8 font-semibold text-zinc-300 transition-all duration-300 ease-out hover:border-pink-500/40 hover:bg-pink-500/5 hover:text-white"
            >
              Book Demo
            </Link>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            No credit card required • Free developer tier
          </p>
        </div>
      </section>

      {/* divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,rgba(236,72,153,0.25),transparent)" }} />

      {/* FOOTER */}
      <footer className="bg-[#050505]">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 py-24 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">

          {/* Left */}
          <div>
            <Link href="/" className="block">
              <img src="/polargridLogo.svg" alt="PolarGrid" className="h-8" />
            </Link>

            <p className="mt-6 max-w-xs text-zinc-400">
              High-performance inference infrastructure built for modern AI
              applications.
            </p>

            <form className="mt-10 flex max-w-md">
              <input
                placeholder="Email address"
                className="h-12 flex-1 rounded-l-xl border border-zinc-800 bg-zinc-950 px-4 text-white outline-none placeholder:text-zinc-600 transition-all duration-300 ease-out focus:border-pink-500/50 focus:shadow-[0_0_20px_rgba(236,72,153,.12)]"
              />

              <button className="flex h-12 items-center rounded-r-xl bg-gradient-to-b from-pink-400 to-pink-600 px-5 font-medium text-white shadow-[0_0_20px_rgba(236,72,153,.12)] transition-all duration-300 ease-out hover:shadow-[0_0_40px_rgba(236,72,153,.22)]">
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-10 text-sm text-zinc-600">
              © 2026 PolarGrid. All rights reserved.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Product
            </h4>

            <ul className="space-y-4">
              {product.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-zinc-400 transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Company
            </h4>

            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-zinc-400 transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Legal
            </h4>

            <ul className="space-y-4">
              {legal.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-zinc-400 transition-all duration-300 ease-out hover:text-white hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-2xl border border-pink-500/15 bg-gradient-to-b from-pink-500/[0.03] to-transparent p-5 shadow-[0_0_30px_rgba(236,72,153,.06)]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-200/70">Get started</span>
              <p className="mt-2 text-xs text-zinc-400">Deploy your first model in minutes.</p>
              <Link
                href="/signup"
                className="mt-4 inline-flex items-center rounded-xl bg-gradient-to-b from-pink-400 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(236,72,153,.15)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(236,72,153,.25)]"
              >
                Start Building
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
