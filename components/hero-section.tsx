import Link from "next/link";
import Image from "next/image";
import heroBgImage from "@/app/assets/hero-bg.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Image
        src={heroBgImage}
        alt="Pradap Prada hero background"
        fill
        priority
        className="animate-hero-zoom object-cover object-center"
        style={{
          filter: "blur(2px)",
          transform: "scale(1.03)",
        }}
      />

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

      {/* Light sweep */}
      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 animate-hero-sweep bg-gradient-to-r from-transparent via-white/12 to-transparent blur-xl" />

      {/* Content — centered overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Brand line */}
        <p
          className="animate-fade-in-up opacity-0 text-[12px] font-light tracking-[0.35em] text-white/70 uppercase"
          style={{ animationDelay: "0ms" }}
        >
          PRADAP PRADA
        </p>

        {/* Serif italic tagline */}
        <p
          className="animate-fade-in-up mt-4 max-w-4xl opacity-0 font-serif text-2xl italic text-white/90 md:text-3xl lg:text-4xl"
          style={{ animationDelay: "180ms" }}
        >
          Every gem carries a story. This one is yours.
        </p>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up mt-4 opacity-0 text-[13px] font-light tracking-[0.2em] text-white/75 uppercase"
          style={{ animationDelay: "320ms" }}
        >
          Bespoke Jewelry · Artisan Gemstones · Crafted in Trat
        </p>

        {/* CTA pill */}
        <div
          className="animate-fade-in-up mt-10 opacity-0"
          style={{ animationDelay: "460ms" }}
        >
          <Link
            href="/customize"
            className="inline-flex h-12 items-center rounded-full bg-white px-8 text-[13px] font-light tracking-[0.15em] text-[#2A2A2A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2A2A2A] hover:text-white hover:shadow-[0_14px_30px_rgba(0,0,0,0.28)]"
          >
            Design Your Piece
          </Link>
        </div>
      </div>

    </section>
  );
}
