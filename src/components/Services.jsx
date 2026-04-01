import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceModal from "./ServiceModal.jsx";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "s1",
    title: "21st Century Skills Development",
    short: "Critical thinking, collaboration, and digital fluency for the modern learner.",
    description:
      "Structured pathways that build creativity, communication, and computational thinking alongside core academics—so learners stay ahead of a changing world.",
    bullets: [
      "Competency-based milestones",
      "Portfolio-ready outcomes",
      "Mentor-guided checkpoints",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    accentFrom: "from-blue-500/20",
    accentTo:   "to-cyan-400/10",
  },
  {
    id: "s2",
    title: "Digital ABCD Problem Solving",
    short: "Analyze, Build, Connect, and Deliver with structured digital workflows.",
    description:
      "Our ABCD framework turns messy challenges into repeatable problem-solving: analyze context, build prototypes, connect data and people, and deliver measurable impact.",
    bullets: [
      "Design sprints & retrospectives",
      "Data-informed decisions",
      "Stakeholder storytelling",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    accentFrom: "from-cyan-500/20",
    accentTo:   "to-blue-400/10",
  },
  {
    id: "s3",
    title: "High School Solutions",
    short: "Programs that align with college readiness and future-of-work skills.",
    description:
      "From elective pathways to capstone experiences, we help high schools offer engaging, industry-aligned learning without overloading staff.",
    bullets: [
      "Curriculum mapping support",
      "Teacher enablement workshops",
      "Student project showcases",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    accentFrom: "from-indigo-500/20",
    accentTo:   "to-blue-400/10",
  },
  {
    id: "s4",
    title: "University Consulting Services",
    short: "Innovation labs, digital transformation, and workforce-aligned programs.",
    description:
      "Partner with HIFAI to modernize offerings: micro-credentials, industry projects, and research-to-practice pipelines that students and employers value.",
    bullets: [
      "Program design sprints",
      "Industry advisory loops",
      "Analytics for learner success",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    accentFrom: "from-sky-500/20",
    accentTo:   "to-cyan-400/10",
  },
];

/* ── 3-D tilt card ──────────────────────────────────────────────────── */
function TiltCard({ card, index, reducedMotion, onClick }) {
  const cardRef   = useRef(null);
  const glowRef   = useRef(null);
  const iconRef   = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || reducedMotion) return;

    const MAX_TILT = 12;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);

      gsap.to(el, {
        rotateY:  dx * MAX_TILT,
        rotateX: -dy * MAX_TILT,
        scale: 1.035,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 900,
      });

      // Glow follows mouse
      if (glowRef.current) {
        const pctX = ((e.clientX - rect.left) / rect.width)  * 100;
        const pctY = ((e.clientY - rect.top)  / rect.height) * 100;
        gsap.to(glowRef.current, {
          left: `${pctX}%`,
          top:  `${pctY}%`,
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.6, ease: "elastic.out(1, 0.5)",
        transformPerspective: 900,
      });
      if (glowRef.current)
        gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    };

    const onEnter = () => {
      if (iconRef.current)
        gsap.to(iconRef.current, { scale: 1.15, rotate: -6, duration: 0.3, ease: "back.out(2)" });
    };
    const onIconLeave = () => {
      if (iconRef.current)
        gsap.to(iconRef.current, { scale: 1, rotate: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onIconLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onIconLeave);
    };
  }, [reducedMotion]);

  return (
    <button
      type="button"
      ref={cardRef}
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
      className="service-card group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/70 p-6 text-left shadow-[0_18px_48px_rgba(9,15,26,0.08)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:border-blue-300/45 hover:shadow-[0_22px_58px_rgba(37,99,235,0.18)] md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-blue-50/35 opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 opacity-90" aria-hidden />

      {/* Mouse-following radial glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/35 to-cyan-300/25 blur-2xl opacity-0"
        aria-hidden
        style={{ position: "absolute" }}
      />

      {/* Static corner glow */}
      <div className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${card.accentFrom} ${card.accentTo} blur-2xl`} aria-hidden />

      <div className="relative flex h-full flex-col gap-4">
        {/* Icon */}
        <div
          ref={iconRef}
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 text-blue-600 shadow-sm"
        >
          {card.icon}
        </div>

        {/* Step number */}
        <span className="absolute right-0 top-0 font-display text-[3.4rem] font-bold leading-none text-blue-500/10 select-none">
          0{index + 1}
        </span>

        <h3 className="font-geom-heading text-[1.12rem] font-normal leading-[1.2] tracking-[-0.008em] text-ink md:text-[1.35rem]">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink/65 md:text-base">{card.short}</p>

        <div className="mt-auto flex items-center justify-between border-t border-blue-100/80 pt-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:gap-3">
            View details
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
            HIFAI
          </span>
        </div>
      </div>
    </button>
  );
}

export default function Services({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const introRef   = useRef(null);
  const decorARef  = useRef(null);
  const decorBRef  = useRef(null);
  const cardsRef   = useRef([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    if (reducedMotion) {
      gsap.set(cards, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      /* Section heading */
      if (introRef.current) {
        gsap.from(introRef.current.children, {
          y: isMobile ? 20 : 36,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      /* Cards — clip-path wipe + stagger */
      gsap.set(cards, { clipPath: "inset(0 100% 0 0 round 24px)" });
      gsap.to(cards, {
        clipPath: "inset(0 0% 0 0 round 24px)",
        duration: isMobile ? 0.6 : 0.85,
        stagger: isMobile ? 0.1 : 0.15,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      /* Subtle parallax on desktop only to avoid mobile lag */
      if (!isMobile) {
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -6 : -10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.45,
            },
          });
        });
      }

      /* Decorative blobs */
      if (decorARef.current) {
        gsap.to(decorARef.current, {
          yPercent: -22, xPercent: 7, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
      if (decorBRef.current) {
        gsap.to(decorBRef.current, {
          yPercent: 16, xPercent: -5, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 md:px-8 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18),rgba(237,247,255,0.38))]" aria-hidden />
      <div ref={decorARef} className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" aria-hidden />
      <div ref={decorBRef} className="pointer-events-none absolute -right-20 bottom-14 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden />

      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <div ref={introRef} className="mb-12 max-w-2xl md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">What we offer</p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-normal leading-[1.4] tracking-[-0.012em] text-ink">
            Services built for{" "}
            <span className="relative inline-block">
              <span className="relative z-10">real outcomes</span>
              <span className="absolute -bottom-1 left-0 h-3 w-full rounded-md bg-gradient-to-r from-cyan-400/40 to-blue-500/40" aria-hidden />
            </span>
          </h2>
          <p className="mt-4 text-ink/65 md:text-lg">
            Four focused pillars—each designed to scale from individual learners to entire institutions.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <TiltCard
                card={card}
                index={i}
                reducedMotion={reducedMotion}
                onClick={() => setActive(card)}
              />
            </div>
          ))}
        </div>
      </div>

      <ServiceModal
        open={!!active}
        onClose={() => setActive(null)}
        service={active}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}