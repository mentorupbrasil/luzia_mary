import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Menu, Users, X } from "lucide-react";
import { mainNav } from "@/config/site";

export function HeroCandidate() {
  return (
    <section className="relative overflow-hidden bg-[#031936] text-white">
      {/*
        DESKTOP: a direção de arte aprovada é preservada como uma composição única.
        Os links transparentes sobre a arte mantêm a navegação funcional e acessível.
      */}
      <div className="relative hidden aspect-[16/9] w-full md:block">
        <Image
          src="/images/hero-luzia-desktop.webp"
          alt="Luzia Mary, pré-candidata a deputada federal pelo Maranhão"
          fill
          priority
          sizes="100vw"
          className="object-fill"
        />

        <nav className="absolute inset-0 z-10" aria-label="Navegação da página inicial">
          <Link
            href="/"
            aria-label="Início"
            className="absolute left-[53.2%] top-[2.5%] h-[8.5%] w-[6.4%] rounded focus-visible:bg-white/10"
          />
          <Link
            href="/sobre"
            aria-label="Biografia"
            className="absolute left-[60.5%] top-[2.5%] h-[8.5%] w-[9.2%] rounded focus-visible:bg-white/10"
          />
          <Link
            href="/propostas"
            aria-label="Propostas"
            className="absolute left-[70.5%] top-[2.5%] h-[8.5%] w-[9.5%] rounded focus-visible:bg-white/10"
          />
          <Link
            href="/agenda"
            aria-label="Agenda"
            className="absolute left-[80.5%] top-[2.5%] h-[8.5%] w-[8%] rounded focus-visible:bg-white/10"
          />
          <Link
            href="/participe"
            aria-label="Participe"
            className="absolute left-[89%] top-[2.5%] h-[8.5%] w-[9%] rounded focus-visible:bg-white/10"
          />
        </nav>

        <Link
          href="/sobre"
          aria-label="Conheça Luzia Mary"
          className="absolute left-[6.7%] top-[70.5%] z-20 h-[9.4%] w-[20.3%] rounded-full focus-visible:ring-4 focus-visible:ring-white/80"
        />

        <h1 id="hero-title" className="sr-only">
          Luzia Mary — pré-candidata a deputada federal pelo Maranhão
        </h1>
      </div>

      {/* MOBILE: versão responsiva com a mesma identidade e fotografia da arte aprovada. */}
      <div className="relative min-h-[860px] md:hidden">
        <Image
          src="/images/hero-luzia-mobile.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,17,42,.72)_0%,rgba(2,25,58,.38)_35%,rgba(2,20,48,.8)_72%,#031936_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,22,53,.96)_0%,rgba(2,22,53,.7)_54%,rgba(2,22,53,.12)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[860px] flex-col px-5 pb-0 pt-5">
          <div className="flex items-start justify-between gap-4">
            <Link href="/" className="leading-none" aria-label="Luzia Mary — início">
              <strong className="block text-[2rem] font-black uppercase tracking-[-0.055em] text-white">
                <span className="text-[#ffd21a]">L</span>uzia <span className="text-[#21a34b]">M</span>ary
              </strong>
              <span className="mt-2 block text-[8px] font-bold uppercase tracking-[0.12em] text-white/76">
                Pré-candidata a deputada federal pelo Maranhão
              </span>
            </Link>

            <details className="group relative">
              <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/25 bg-[#031936]/75 backdrop-blur-md [&::-webkit-details-marker]:hidden">
                <Menu className="group-open:hidden" size={20} aria-hidden />
                <X className="hidden group-open:block" size={20} aria-hidden />
                <span className="sr-only">Abrir menu</span>
              </summary>
              <nav className="absolute right-0 top-14 w-56 rounded-2xl border border-white/15 bg-[#031936]/95 p-2 shadow-2xl backdrop-blur-xl" aria-label="Menu mobile">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white/90 transition hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </details>
          </div>

          <div className="mt-[15vh] max-w-[92%]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#ffd21a]">
              Pré-candidata a deputada federal pelo Maranhão
            </p>

            <div className="relative mt-5 w-fit">
              <h1 id="hero-title-mobile" className="text-[clamp(5.4rem,28vw,7.5rem)] font-black uppercase leading-[0.72] tracking-[-0.09em] text-white drop-shadow-[0_12px_28px_rgba(0,0,0,.2)]">
                Luzia
              </h1>
              <span className="absolute -bottom-10 right-[-1.2rem] -rotate-3 font-[cursive] text-[clamp(3.8rem,18vw,5.4rem)] font-bold leading-none text-[#ffd21a] drop-shadow-lg">
                Mary
              </span>
            </div>

            <p className="mt-16 max-w-[19rem] text-[1.65rem] font-medium leading-[1.05] text-white">
              A mulher do povo,
              <br />
              de <strong className="text-[#ffd21a]">Imperatriz</strong> para o <strong className="text-[#ffd21a]">Maranhão.</strong>
            </p>

            <Link
              href="/sobre"
              className="mt-7 inline-flex h-14 items-center gap-8 rounded-full bg-[#ffd21a] px-7 text-sm font-black uppercase tracking-[0.02em] text-[#06306b] shadow-[0_16px_36px_rgba(0,0,0,.22)] transition active:scale-[.98]"
            >
              Conheça Luzia <ArrowRight size={20} aria-hidden />
            </Link>
          </div>

          <div className="mt-auto -mx-5 grid">
            <div className="flex min-h-20 items-center gap-4 bg-[#ffd21a] px-6 text-[#06306b]">
              <Users size={24} aria-hidden />
              <strong className="text-base font-black uppercase">A mulher do povo!</strong>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex min-h-20 items-center gap-3 bg-[#079447] px-4 text-white">
                <MapPin className="shrink-0 text-[#ffd21a]" size={22} aria-hidden />
                <span className="leading-tight">
                  <small className="block text-[9px] font-bold uppercase tracking-[0.08em]">De Imperatriz</small>
                  <strong className="text-lg">para o Maranhão</strong>
                </span>
              </div>
              <div className="flex min-h-20 items-center justify-center gap-3 bg-[#06306b] px-4 text-white">
                <Heart className="shrink-0 text-[#ffd21a]" size={21} aria-hidden />
                <strong className="text-[11px] uppercase tracking-[0.1em]">Trabalho · Fé · Família</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
