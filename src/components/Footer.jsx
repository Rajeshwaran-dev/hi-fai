import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ reducedMotion }) {
  const innerRef  = useRef(null);
  const col1Ref   = useRef(null);
  const col2Ref   = useRef(null);
  const col3Ref   = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || reducedMotion) return;

    const ctx = gsap.context(() => {
      const cols = [col1Ref, col2Ref, col3Ref].map((r) => r.current).filter(Boolean);

      gsap.from(cols, {
        y: 32,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: inner, start: "top 88%", toggleActions: "play none none none" },
      });

      if (bottomRef.current) {
        gsap.from(bottomRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: inner, start: "top 82%", toggleActions: "play none none none" },
        });
      }
    }, inner);

    return () => ctx.revert();
  }, [reducedMotion]);

  /* ── Hover line animation on footer links ── */
  const handleLinkEnter = (e) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    gsap.fromTo(el, { backgroundSize: "0% 2px" }, { backgroundSize: "100% 2px", duration: 0.28, ease: "power2.out" });
  };
  const handleLinkLeave = (e) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    gsap.to(el, { backgroundSize: "0% 2px", duration: 0.22, ease: "power2.in" });
  };

  const footerLink = "transition-colors duration-200 hover:text-accent bg-[length:0%_2px] bg-gradient-to-r bg-[position:0_100%] bg-no-repeat from-accent to-accent-cyan";

  return (
    <footer className="relative overflow-hidden border-t border-accent/10 bg-ink px-4 pt-20 pb-14 md:px-8">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(70%_120%_at_50%_-20%,rgba(65,105,225,0.36),transparent)]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 -top-8 h-72 w-72 rounded-full bg-accent/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-accent-cyan/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-10 h-44 w-[70%] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden />

      <div ref={innerRef} className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#07132b] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          {/* Top gradient line */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent-cyan to-accent" />

          <div className="grid gap-10 p-8 md:grid-cols-[1.25fr_1fr_1fr] md:p-10">

            {/* Col 1 — Brand */}
            <div ref={col1Ref}>
              <a href="#hero" className="inline-flex items-center" aria-label="HIFAI Skills home">
                <img
                  src="/logo.png"
                  alt="HIFAI Skills"
                  className="h-14 w-auto md:h-16"
                />
              </a>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/60">Human Intelligence for AI Use</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                Crafting future-ready talent through AI literacy, problem solving, and real-world
                digital innovation programs.
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["AI Skills", "Project-based", "Institution Ready"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/35 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-cyan"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#cta"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:gap-3 hover:shadow-glow"
                >
                  Start With HIFAI
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#hero"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-accent/40 hover:text-accent-cyan"
                >
                  ↑ Back to Top
                </a>
              </div>
            </div>

            {/* Col 2 — Navigation */}
            <nav ref={col2Ref} aria-label="Footer navigation" className="md:pl-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">Explore</p>
              <ul className="mt-4 space-y-3 text-sm font-medium text-white/80">
                {[
                  { label: "Home",     href: "#hero"     },
                  { label: "Services", href: "#services" },
                  { label: "Audience", href: "#audience" },
                  { label: "Process",  href: "#how"      },
                  { label: "Features", href: "#features" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className={footerLink}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 3 — Contact */}
            <div ref={col3Ref} className="md:pl-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">Contact</p>
              <a
                href="mailto:hello@hifai.skills"
                className="mt-4 inline-flex text-sm font-semibold text-accent-cyan transition-colors hover:text-white"
              >
                hello@hifai.skills
              </a>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Open for student cohorts, school partnerships, and university innovation programs.
              </p>

              {/* Status badge */}
              <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-3">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-500" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                    Innovation Partner Network
                  </p>
                </div>
                <p className="mt-2 text-xs text-white/65">Live mentoring, curriculum support, and outcome analytics.</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            ref={bottomRef}
            className="flex flex-col gap-2 border-t border-white/15 bg-black/10 px-8 py-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between md:px-10"
          >
            <p>© {new Date().getFullYear()} HIFAI Skills. All rights reserved.</p>
            <p>Designed for immersive digital innovation experiences.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}