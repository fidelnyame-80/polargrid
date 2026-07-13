"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Products", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Documentation", href: "#" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-6">
      <nav
        className="
        relative
        flex
        h-16
        w-full
        max-w-4xl
        items-center
        justify-between
        overflow-hidden
        rounded-2xl

        border
        border-white/[0.08]

        bg-[linear-gradient(180deg,rgba(18,18,22,.82),rgba(7,7,10,.62))]
        backdrop-blur-[24px]

        shadow-[0_20px_80px_rgba(0,0,0,.45)]
      "
      >
        {/* soft internal glow */}
        <div
          className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_-120%,rgba(255,255,255,.06),transparent_65%)]
        "
        />

        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        {/* darker bottom edge */}
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-black/60 to-transparent" />

        {/* Left */}
        <div className="relative flex items-center pl-6">
          <Link
            href="/"
            className="group flex items-center gap-3 select-none"
          >
            <Logo />
          </Link>
        </div>

        {/* Center */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
              group
              relative
              overflow-hidden
              rounded-xl
              px-4
              py-2
              text-[14px]
              font-medium
              text-zinc-400
              transition-all
              duration-300
              hover:text-white
            "
            >
              <span className="relative z-10">
                {item.label}
              </span>

              <span
                className="
                absolute
                inset-0
                rounded-xl
                bg-white/[0.045]
                opacity-0
                transition
                duration-300
                group-hover:opacity-100
              "
              />
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="relative flex items-center gap-2 pr-4">
          <Link
            href="#"
            className="
            hidden
            rounded-xl
            px-4
            py-2
            text-sm
            text-zinc-400
            transition
            duration-300
            hover:text-white
            md:block
          "
          >
            Log in
          </Link>

          <Link
            href="#"
            className="
            group
            relative
            overflow-hidden
            rounded-full

            border
            border-white/15

            

            px-6
            py-[10px]

            text-sm
            font-semibold
            text-white

            transition-all
            duration-300

            hover:border-[#C2185B]/70
            bg-[#C2185B]
            hover:shadow-[0_0_35px_rgba(194,24,91,.22)]
          "
          >
            {/* glass reflection */}
            <div
              className="
              absolute
              left-0
              top-0
              h-px
              w-full
              bg-gradient-to-r
              from-transparent
              via-white/40
              to-transparent
            "
            />

            <span className="relative z-10">
              Sign Up · Get $500 →
            </span>

            <span
              className="
              absolute
              inset-0
              opacity-0
              transition
              duration-500
              group-hover:opacity-100
              bg-[radial-gradient(circle_at_center,rgba(255,255,255,.18),transparent)]
            "
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <Image
      src="/polargridLogo.svg"
      alt="Polargrid"
      width={90}
      height={30}
      className="h-6 w-auto"
      priority
    />
  );
}