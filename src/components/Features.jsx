import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: "Agile Learning",
    desc:  "Short cycles, fast feedback, and continuous improvement baked in.",
    stat:  { end: 12, suffix: "+", label: "skill modules" },
    progress: 82,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: "Real-world Projects",
    desc:  "Ship artifacts you can show—portfolios employers actually read.",
    stat:  { end: 48, suffix: "+", label: "project briefs" },
    progress: 91,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M8 12h8M8 8h8" />
    ),
  },
  {
    title: "AI + Blockchain + Data",
    desc:  "Future-facing stacks with ethics, safety, and clarity first.",
    stat:  { end: 3, suffix: "", label: "pillar tracks" },
    progress: 100,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    ),
  },
  {
    title: "Subscription-based access",
    desc:  "Predictable pricing for individuals, cohorts, and institutions.",
    stat:  { end: 98, suffix: "%", label: "renewal intent*" },
    progress: 98,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

/* ── Animated stat number ────────────────────────────────────────────── */
function StatNumber({ end, suffix, label, reducedMotion, isMobile, triggerEl }) {
  const numRef  = useRef(null);
  const barRef  = useRef(null);
  const pct     = ITEMS.find((i) => i.stat.end === end)?.progress ?? 80;

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    if (reducedMotion) {
      el.textContent = `${end}${suffix}`;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      return;
    }

    const proxy = { v: 0 };
    gsap.to(proxy, {
      v: end,
      duration: isMobile ? 1.3 : 2,
      ease: "power2.out",
      onUpdate: () => { el.textContent = `${Math.round(proxy.v)}${suffix}`; },
      scrollTrigger: {
        trigger: triggerEl || el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        {
          width: `${pct}%`,
          duration: isMobile ? 1 : 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerEl || el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [end, suffix, reducedMotion, isMobile, triggerEl, pct]);

  return (
    <div className="mt-5">
      <p ref={numRef} className="font-display text-[2.2rem] font-normal leading-[2] tracking-[-0.01em] text-gradient md:text-[2.8rem]">
        0{suffix}
      </p>
      <p className="mt-1 text-xs text-ink/50 md:text-sm">{label}</p>
      {/* Progress bar */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-blue-100">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
          style={{ width: reducedMotion ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/* ── Individual feature card ─────────────────────────────────────────── */
function FeatureCard({ item, index, reducedMotion, isMobile }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  /* 3D lift on hover */
  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || reducedMotion) return;

    const onEnter = () => {
      gsap.to(card, { y: -8, boxShadow: "0 24px 48px rgba(37,99,235,0.18)", duration: 0.35, ease: "power2.out" });
      if (icon) gsap.to(icon, { rotate: -8, scale: 1.12, duration: 0.3, ease: "back.out(2)" });
    };
    const onLeave = () => {
      gsap.to(card, { y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", duration: 0.45, ease: "power2.inOut" });
      if (icon) gsap.to(icon, { rotate: 0, scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <article
      ref={cardRef}
      data-feature-card
      className="relative rounded-3xl border border-white/70 bg-white/50 p-6 shadow-glass backdrop-blur-xl md:p-8"
    >
      {/* Subtle index watermark */}
      <span className="pointer-events-none absolute right-4 top-2 select-none font-display text-[4rem] font-bold leading-none text-blue-500/5">
        {index + 1}
      </span>

      <div ref={iconRef} className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/15 to-cyan-500/10 text-blue-600">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {item.icon}
        </svg>
      </div>

      <h3 className="mt-4 font-geom-heading text-[1.03rem] font-normal leading-[1.2] tracking-[-0.006em] text-ink">
        {item.title}
      </h3>
      <p className="mt-2 text-sm text-ink/65">{item.desc}</p>

      <StatNumber
        end={item.stat.end}
        suffix={item.stat.suffix}
        label={item.stat.label}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
        triggerEl={cardRef.current}
      />
    </article>
  );
}

export default function Features({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const introRef   = useRef(null);
  const decorRef   = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);
    if (reducedMotion) { gsap.set(cards, { clearProps: "all" }); return; }

    const ctx = gsap.context(() => {
      if (introRef.current) {
        gsap.from(introRef.current.children, {
          y: isMobile ? 18 : 26,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
        });
      }

      /* Cascade reveal with clip-path */
      gsap.set(cards, { clipPath: "inset(0 0 100% 0 round 24px)" });
      gsap.to(cards, {
        clipPath: "inset(0 0 0% 0 round 24px)",
        duration: isMobile ? 0.55 : 0.75,
        stagger: isMobile ? 0.07 : 0.12,
        ease: "power4.inOut",
        scrollTrigger: { trigger: section, start: "top 74%", toggleActions: "play none none none" },
      });

      /* Per-card parallax on desktop only */
      if (!isMobile) {
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 ? -8 : -5,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.45 },
          });
        });
      }

      if (decorRef.current) {
        gsap.to(decorRef.current, {
          yPercent: -14, xPercent: 8, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 md:px-8 md:py-24"
    >
      <div ref={decorRef} className="pointer-events-none absolute -left-24 bottom-2 h-64 w-64 rounded-full bg-blue-300/10 blur-3xl" aria-hidden />

      <div className="mx-auto max-w-7xl">
        <div ref={introRef} className="mb-12 md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Why HIFAI</p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-normal leading-[1.4] tracking-[-0.012em] text-ink">
            Benefits that compound over time
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <div key={item.title} ref={(el) => { cardsRef.current[i] = el; }}>
              <FeatureCard
                item={item}
                index={i}
                reducedMotion={reducedMotion}
                isMobile={isMobile}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}