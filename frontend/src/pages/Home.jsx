import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  Blocks,
  Bot,
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  Globe2,
  MonitorSmartphone,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubmissionSuccessModal from "../components/SubmissionSuccessModal.jsx";
import heroBgUrl from "../assets/images/hero-bg.jpg?url";
import skillDevelopmentImg from "../assets/images/ai.jpg?url";
import abcdProblemImg from "../assets/images/blcok-chain.jpg?url";
import highSchoolImg from "../assets/images/cloud.jpg?url";
import universityConsultingImg from "../assets/images/data.jpg?url";

const STATIC_ASSET_BASE = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

const HERO_HOOK_ACCENTS = {
  short: {
    border:
      "border-amber-400/40 hover:border-amber-300/70 focus-visible:border-amber-300/70",
    surface:
      "bg-gradient-to-br from-amber-500/[0.18] via-white/[0.06] to-white/[0.03]",
    shadow:
      "shadow-[0_0_0_1px_rgba(251,191,36,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(255,255,255,0.12)]",
    labelWrap: "bg-amber-400/20 text-amber-100 ring-1 ring-amber-400/35",
    labelText: "text-amber-50",
    titleWord: "text-amber-100",
    iconWrap: "bg-amber-400/25 text-amber-200",
    descWrap:
      "rounded-xl border border-amber-200/40 bg-amber-950/70 px-2.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-3 sm:py-3",
    descText:
      "text-[clamp(0.72rem,2.25vw,1.02rem)] font-semibold leading-snug tracking-[-0.01em] text-white",
  },
  long: {
    border:
      "border-sky-400/40 hover:border-sky-300/70 focus-visible:border-sky-300/70",
    surface:
      "bg-gradient-to-br from-sky-500/[0.18] via-white/[0.06] to-white/[0.03]",
    shadow:
      "shadow-[0_0_0_1px_rgba(56,189,248,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(14,165,233,0.25),inset_0_1px_0_rgba(255,255,255,0.12)]",
    labelWrap: "bg-sky-400/20 text-sky-100 ring-1 ring-sky-400/35",
    labelText: "text-sky-50",
    titleWord: "text-sky-100",
    iconWrap: "bg-sky-400/25 text-sky-200",
    descWrap:
      "rounded-xl border border-sky-200/40 bg-sky-950/70 px-2.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-3 sm:py-3",
    descText:
      "text-[clamp(0.72rem,2.25vw,1.02rem)] font-semibold leading-snug tracking-[-0.01em] text-white",
  },
};

const HERO_HOOK_POINTS = [
  {
    variant: "short",
    label: "Short Term",
    title: "MARKS",
    text: "Help you in the short term",
    Icon: Target,
  },
  {
    variant: "long",
    label: "Long Term",
    title: "SKILLS",
    text: "Help you achieve your long term goals",
    Icon: BrainCircuit,
  },
];
const HERO_SUBTEXT =
  "There’s a side of you beyond marks that often goes undiscovered HIfAi helps you explore and unlock it in a whole new way.";
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3003";

const HOW_CAN_HIFAI_IMAGE_URLS = {
  enthiranApp: `${STATIC_ASSET_BASE}enthiran.jpeg`,
  digitalAbcdProjects: `${STATIC_ASSET_BASE}abcd.jpeg`,
  highSchools: `${STATIC_ASSET_BASE}school.jpeg`,
  engineeringColleges: `${STATIC_ASSET_BASE}engineering-college.jpeg`,
};

const HOW_CAN_HIFAI_SLIDES = [
  {
    title: "EN-THIRAN APP",
    image: HOW_CAN_HIFAI_IMAGE_URLS.enthiranApp,
    points: [
      "Explore, evaluate, extend, and excel in the 21st century skills.",
      "For 9, 10, 11 and 12 standards.",
    ],
  },
  {
    title: "Digital ABCD Projects",
    image: HOW_CAN_HIFAI_IMAGE_URLS.digitalAbcdProjects,
    points: [
      "Learn and use Agile Time and Team management.",
      "Make novel use of Digital ABCD technologies.",
      "Solve futuristic problems in Finance, Education, Health, and Energy domains.",
    ],
  },
  {
    title: "High Schools",
    image: HOW_CAN_HIFAI_IMAGE_URLS.highSchools,
    points: [
      "Consulting and implementation services.",
      "Measure and Improve student’s learning outcomes across years 9, 10, 11 and 12",
    ],
  },
  {
    title: "Engineering Colleges",
    image: HOW_CAN_HIFAI_IMAGE_URLS.engineeringColleges,
    points: ["Authentic assessment consulting and implementation services."],
  },
];

export function Hero({ reducedMotion, isMobile }) {
  const rootRef = useRef(null);
  const heroBgRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const parallaxRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const clearIntroTargets = () => {
      const lines = headlineRef.current?.querySelectorAll(".hero-line") ?? [];
      const sub = subRef.current;
      const cta = ctaRef.current;
      gsap.set([...lines, sub, cta].filter(Boolean), { clearProps: "all" });
    };

    if (reducedMotion) {
      clearIntroTargets();
      return;
    }

    const ctx = gsap.context(() => {
      const lines = headlineRef.current?.querySelectorAll(".hero-line") ?? [];
      const sub = subRef.current;
      const cta = ctaRef.current;
      if (!lines.length) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(lines, {
        y: isMobile ? 20 : 36,
        opacity: 0,
        stagger: isMobile ? 0.08 : 0.12,
        duration: isMobile ? 0.55 : 0.72,
      });
      if (sub) {
        tl.from(sub, { y: 16, opacity: 0, duration: 0.55 }, "-=0.32");
      }
      if (cta) {
        tl.from(cta, { y: 16, opacity: 0, duration: 0.5 }, "-=0.26");
      }
    }, root);

    return () => {
      ctx.revert();
      clearIntroTargets();
    };
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    if (reducedMotion || !rootRef.current || !parallaxRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        y: isMobile ? 0 : 48,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: isMobile ? 0.5 : 1,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    if (reducedMotion || isMobile || !rootRef.current || !heroBgRef.current)
      return undefined;

    const root = rootRef.current;
    const bg = heroBgRef.current;

    gsap.set(bg, {
      position: "absolute",
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      width: "108%",
      height: "105%",
      force3D: true,
    });

    const maxX = 42;
    const maxY = 26;

    const xTo = gsap.quickTo(bg, "x", {
      duration: 0.85,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(bg, "y", {
      duration: 0.85,
      ease: "power3.out",
    });

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      const w = rect.width || 1;
      const h = rect.height || 1;
      const nx = ((e.clientX - rect.left) / w) * 2 - 1;
      const ny = ((e.clientY - rect.top) / h) * 2 - 1;
      xTo(-nx * maxX);
      yTo(-ny * maxY);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(bg);
    };
  }, [reducedMotion, isMobile]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-x-hidden bg-slate-950 px-4 pt-40 pb-20 md:pt-44 md:pb-16"
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          ref={heroBgRef}
          className="absolute left-1/2 top-1/2 h-[106%] w-[110%] -translate-x-1/2 -translate-y-1/2 bg-slate-950 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: `url(${heroBgUrl})` }}
          aria-hidden
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/50 to-black/85"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-transparent to-black/30"
        aria-hidden
      />

      <div ref={parallaxRef} className="relative z-10 mx-auto w-full max-w-5xl">
        <div
          className="rounded-[1.75rem] border border-white/[0.14] bg-white/[0.08] px-4 py-7 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6 sm:py-8 md:rounded-[2rem] md:px-12 md:py-11"
          style={{
            boxShadow:
              "0 25px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div className="text-center">
            <h1
              ref={headlineRef}
              data-tilt-ignore
              className="mx-auto flex w-full max-w-5xl flex-col gap-3 text-left md:gap-4"
            >
              {HERO_HOOK_POINTS.map((item) => {
                const a = HERO_HOOK_ACCENTS[item.variant];
                return (
                  <div
                    key={item.title}
                    className={`hero-line group relative flex min-h-0 min-w-0 flex-col justify-center rounded-2xl border px-3.5 py-4 backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 sm:min-h-[98px] sm:px-5 sm:py-5 md:min-h-[112px] md:rounded-[1.35rem] md:px-6 md:py-5 ${a.border} ${a.surface} ${a.shadow}`}
                  >
                    <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-2.5 sm:overflow-hidden md:gap-3">
                      <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span
                          className={`font-display text-[clamp(1.2rem,5.2vw,2rem)] font-medium leading-snug tracking-[-0.025em] sm:shrink-0 sm:leading-[1.5] sm:text-[clamp(1.35rem,3.1vw,2rem)] ${a.titleWord}`}
                        >
                          {item.title}
                        </span>
                        <span
                          className="hidden font-bold leading-none text-white/80 sm:inline sm:text-[clamp(1rem,2.6vw,2.1rem)]"
                          aria-hidden
                        >
                          –
                        </span>
                        <p style={{ marginBottom: "0px" }} className="w-full min-w-0 text-[0.92rem] font-semibold leading-snug tracking-[-0.015em] text-white/95 sm:w-auto sm:max-w-none sm:flex-1 sm:text-[clamp(0.9rem,2.05vw,1.9rem)] sm:leading-tight">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </h1>

            <p
              ref={subRef}
              className="mx-auto mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-white/80 md:mt-7 md:text-lg md:leading-relaxed"
            >
              {HERO_SUBTEXT}
            </p>

            <div
              ref={ctaRef}
              className="mt-9 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
            >
              <Link
                to="/students/school-students"
                data-magnetic
                className="group relative inline-flex min-h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 py-3.5 text-center text-[0.98rem] font-semibold text-white shadow-lg shadow-blue-950/40 transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:bg-blue-500 hover:shadow-xl md:text-base"
              >
                <span className="relative z-10">EN-THIRAN APP</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
              <Link
                to="/get-started"
                data-magnetic
                className="group relative inline-flex min-h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/12 px-8 py-3.5 text-center text-[0.98rem] font-semibold text-white shadow-lg shadow-black/20 transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:bg-white/20 hover:shadow-xl md:text-base"
              >
                <span className="relative z-10">Let'sHIfAi</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-10"
        aria-hidden
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/25 pt-2">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}

const hifaiHighlightClass = "font-semibold text-blue-700";

const BRAIN_IMAGE_URL = `${STATIC_ASSET_BASE}brain.png`;

export function HowCanHiFAISection() {
  return (
    <section
      className="relative border-t border-slate-200/80 bg-white px-4 py-4 md:px-8 md:py-12"
      aria-labelledby="how-can-hifai-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2
            id="how-can-hifai-heading"
            className="font-geom-heading text-[clamp(1.45rem,3vw,2rem)] font-normal tracking-[-0.02em] text-ink"
          >
            How can I <span className="text-blue-700">HIfAi?</span>
          </h2>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_18px_48px_-28px_rgba(15,23,42,0.45)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {HOW_CAN_HIFAI_SLIDES.map((slide, index) => (
              <article
                key={slide.title}
                className="border-b border-slate-200/80 p-2 last:border-b-0 md:border-b-0 md:border-slate-200/80 md:odd:border-r md:[&:nth-child(-n+2)]:border-b"
              >
                <div className="h-full overflow-hidden rounded-xl shadow-[0_10px_28px_-18px_rgba(15,23,42,0.45)]">
                  <div className="relative bg-slate-950">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-44 w-full object-cover md:h-[380px]"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                      aria-hidden
                    />
                  </div>

                  <div className="border-t border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50/45 p-4 md:p-5">
                    <h3 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                      {slide.title}
                    </h3>
                    <ul className="mt-3 space-y-2.5" role="list">
                      {slide.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
                        >
                          <span
                            className="mt-1.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY_HIFAI_INSIGHTS = [
  "Your real potential often stays unnoticed.",
  "One system measures everyone, but each of us is unique.",
  "HIfAi changes how this is seen.",
];

const WHY_HIFAI_CLOSING = "Discover what's hidden within you";

export function WhyHifaiMissingLinkSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const whyRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (whyRef.current?.children?.length) {
        gsap.from(whyRef.current.children, {
          y: isMobile ? 16 : 24,
          opacity: 0,
          stagger: 0.06,
          duration: 0.62,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-white px-4 py-14 md:px-8 md:py-16"
      aria-labelledby="why-hifai-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100, 116, 139, 0.11) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-blue-500/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-sky-400/[0.06] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_36px_-12px_rgba(15,23,42,0.1),0_0_0_1px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02]">
          <div className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400/40"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-10 top-28 h-44 w-44 rounded-full bg-sky-400/[0.2] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-6 top-16 h-24 w-24 rounded-full bg-blue-600/[0.06] blur-2xl"
              aria-hidden
            />

            <div
              ref={whyRef}
              className="relative flex flex-col px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-11"
            >
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/90 px-3 py-1 text-[16px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-blue-600"
                  aria-hidden
                />
                Why <span className={hifaiHighlightClass}>HIfAi</span>?
              </p>
              <div className="relative mt-4">
                <span
                  className="pointer-events-none absolute -left-2 -top-3 h-[4.5rem] w-[4.5rem] rounded-full bg-blue-500/[0.12] blur-2xl"
                  aria-hidden
                />
                <h2
                  id="why-hifai-heading"
                  className="relative font-geom-heading text-[clamp(1.65rem,3.6vw,2.35rem)] font-normal leading-[1.25] tracking-[-0.02em] text-ink"
                >
                  Skills aren&apos;t missing. They&apos;re just{" "}
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10">not seen</span>
                    <span
                      className="absolute -bottom-0.5 left-0 h-2.5 w-full rounded-md bg-blue-600/25"
                      aria-hidden
                    />
                  </span>
                  .
                </h2>
              </div>
              <p className="relative mt-4 max-w-2xl text-base leading-relaxed text-ink/65">
                Most systems stop at marks. But how you think, solve, and adapt
                goes far beyond that.
              </p>

              <ul
                className="relative mt-8 grid gap-3 rounded-xl border border-slate-200/70 bg-slate-50/40 p-2.5 sm:grid-cols-2 sm:p-3 lg:grid-cols-3"
                role="list"
              >
                {WHY_HIFAI_INSIGHTS.map((text, i) => (
                  <li
                    key={i}
                    className="group relative overflow-hidden rounded-lg border border-blue-200/55 bg-white px-3.5 py-3.5 shadow-[0_8px_26px_-20px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/70"
                  >
                    <span
                      className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-500/[0.08] blur-xl transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <div className="relative flex items-start gap-3">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white shadow-[0_0_0_3px_rgba(37,99,235,0.15)]">
                        {i + 1}
                      </span>
                      <span className="text-base font-medium leading-relaxed text-ink">
                        {text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="relative mt-8 text-center font-geom-heading text-[clamp(1.15rem,2.4vw,1.35rem)] font-normal tracking-[-0.015em] text-blue-800 md:mt-9">
                {WHY_HIFAI_CLOSING}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HIFAI_UNIQUE_STEPS = [
  {
    title: "Explore You with International Experts’ Guidance",
    icon: MonitorSmartphone,
  },
  { title: "Evaluate your 21st century Skills", icon: UserCheck },
  { title: "Expand your comfort zone", icon: Sparkles },
  { title: "Excel in what you can do with Digial ABCD", icon: Globe2 },
];

const HIFAI_OFFERS_CARDS = [
  {
    step: "01",
    title: "Scale Your Skills",
    body: "Explore, evaluate, expand and excel in your unique skills and institutional capabilities",
    icon: TrendingUp,
    ring: "from-blue-500 via-indigo-500 to-violet-600",
    glow: "bg-blue-500/25",
    borderAccent: "group-hover:border-blue-300/70",
  },
  {
    step: "02",
    title: "Practice with Digital ABCD",
    body: "Make effective and novel use of Digital ABCD (AI, Blockchain, Cloud and Data) technologies.",
    icon: Cpu,
    ring: "from-cyan-500 via-blue-600 to-indigo-700",
    glow: "bg-cyan-500/25",
    borderAccent: "group-hover:border-cyan-300/70",
  },
  {
    step: "03",
    title: "Excel in 21st Century Skills",
    body: "Help individuals and institutions to think, adapt, solve problems with Creativity, Critical Analysis, Communication & digital use skills",
    icon: BrainCircuit,
    ring: "from-sky-500 via-blue-600 to-blue-800",
    glow: "bg-sky-500/20",
    borderAccent: "group-hover:border-sky-300/70",
  },
];

export function WhatIsHifaiSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const uniqueBlockRef = useRef(null);
  const uniqueHeaderRef = useRef(null);
  const u0 = useRef(null);
  const u1 = useRef(null);
  const u2 = useRef(null);
  const u3 = useRef(null);
  const offersBlockRef = useRef(null);
  const offersHeaderRef = useRef(null);
  const offerCardsWrapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const uniqEl = uniqueBlockRef.current;
      if (uniqEl) {
        if (uniqueHeaderRef.current?.children?.length) {
          gsap.from(uniqueHeaderRef.current.children, {
            y: isMobile ? 12 : 16,
            opacity: 0,
            stagger: 0.06,
            duration: 0.58,
            ease: "power3.out",
            scrollTrigger: {
              trigger: uniqEl,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        }
        [u0, u1, u2, u3].forEach((r, i) => {
          if (!r.current) return;
          gsap.from(r.current, {
            scale: 0.88,
            opacity: 0,
            y: isMobile ? 16 : 0,
            duration: 0.6,
            delay: i * 0.09,
            ease: "back.out(1.35)",
            scrollTrigger: {
              trigger: uniqEl,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      const offersRoot = offersBlockRef.current;
      if (offersRoot) {
        if (offersHeaderRef.current?.children?.length) {
          gsap.from(offersHeaderRef.current.children, {
            y: isMobile ? 14 : 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: offersRoot,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          });
        }
        const cardEls = offerCardsWrapRef.current?.children;
        if (cardEls?.length) {
          gsap.from(cardEls, {
            y: isMobile ? 24 : 32,
            opacity: 0,
            rotateX: isMobile ? 0 : 4,
            transformOrigin: "50% 0%",
            stagger: 0.14,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: offersRoot,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200/80 bg-white px-4 py-4 md:px-8 md:py-14"
      aria-labelledby="what-makes-unique-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100, 116, 139, 0.12) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div ref={uniqueBlockRef} className="relative">
          <div
            ref={uniqueHeaderRef}
            className="mx-auto mb-6 max-w-xl text-center md:mb-8"
          >
            <h2
              id="what-makes-unique-heading"
              className="mt-2 font-geom-heading text-[clamp(1.5rem,3.4vw,2.15rem)] font-normal leading-tight tracking-[-0.02em] text-ink md:mt-2.5"
            >
              Why <span className="text-blue-700">HIfAi</span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/60 md:text-[18px]">
              Four pillars that separate skill intelligence from
              one-size-fits-all learning.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl px-1 sm:px-2">
            <div
              className="pointer-events-none relative z-[1] mx-auto mb-5 h-[min(52vw,12rem)] w-[min(52vw,12rem)] max-w-[13rem] overflow-hidden rounded-full ring-2 ring-cyan-300/55 shadow-[0_0_0_1px_rgba(59,130,246,0.24),0_28px_86px_-22px_rgba(37,99,235,0.72),0_0_80px_rgba(34,211,238,0.24)] sm:h-[14rem] sm:w-[14rem] md:absolute md:left-1/2 md:top-[50%] md:mb-0 md:h-[min(72vw,20rem)] md:w-[min(72vw,20rem)] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2 lg:h-[min(66vw,22rem)] lg:w-[min(66vw,22rem)]"
              aria-hidden
            >
              <div className="flex h-full w-full items-center justify-center will-change-transform">
                <img
                  src={BRAIN_IMAGE_URL}
                  alt=""
                  className="h-full w-full object-cover"
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </div>
            <ul
              className="relative z-[2] mx-auto flex list-none flex-col gap-3 p-0 md:grid md:max-w-5xl md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:items-center md:gap-x-6 md:gap-y-14 lg:max-w-6xl lg:gap-x-10 lg:gap-y-16"
              role="list"
            >
              {HIFAI_UNIQUE_STEPS.map((step, index) => {
                const Icon = step.icon;
                const refs = [u0, u1, u2, u3];
                const diamondPlacement = [
                  "md:col-start-2 md:row-start-1 md:justify-self-center md:w-full md:max-w-[18.75rem]",
                  "md:col-start-3 md:row-start-2 md:justify-self-start md:w-full md:max-w-[16.5rem] lg:max-w-[17.5rem]",
                  "md:col-start-2 md:row-start-3 md:justify-self-center md:w-full md:max-w-[18.75rem]",
                  "md:col-start-1 md:row-start-2 md:justify-self-end md:w-full md:max-w-[16.5rem] lg:max-w-[17.5rem]",
                ][index];
                return (
                  <li
                    key={step.title}
                    ref={refs[index]}
                    className={`group/uni mx-auto h-full w-full max-w-lg md:mx-0 md:max-w-none ${diamondPlacement}`}
                  >
                    <div className="relative flex h-full min-h-[5.5rem] overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.03)] ring-1 ring-slate-900/[0.02] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-200/90 hover:shadow-[0_16px_48px_-12px_rgba(37,99,235,0.2),0_0_0_1px_rgba(37,99,235,0.08)] md:min-h-0">
                      <div
                        className="absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b from-blue-500 via-blue-600 to-sky-500 opacity-90 shadow-sm shadow-blue-500/30 transition-all duration-300 group-hover/uni:opacity-100 group-hover/uni:shadow-blue-500/40"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-blue-400/[0.12] to-sky-400/[0.06] blur-2xl transition-opacity duration-500 group-hover/uni:opacity-100"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-blue-600/[0.04] blur-2xl"
                        aria-hidden
                      />
                      <div className="relative flex min-h-[5.5rem] flex-1 items-start gap-4 p-4 pl-5 sm:min-h-[6rem] sm:gap-4 sm:p-5 sm:pl-6 md:min-h-[6.75rem]">
                        <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.45)] ring-[3px] ring-blue-500/15 transition-transform duration-300 group-hover/uni:scale-[1.05] group-hover/uni:shadow-[0_12px_28px_-6px_rgba(37,99,235,0.5)] sm:h-14 sm:w-14">
                          <Icon
                            className="h-[1.35rem] w-[1.35rem] sm:h-6 sm:w-6"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </span>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600/90 sm:text-[11px]">
                            Pillar {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-2 text-[14px] font-semibold leading-snug tracking-[-0.015em] text-slate-900 transition-colors duration-300 group-hover/uni:text-blue-950 sm:text-[16px] md:text-base md:leading-snug">
                            {step.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div ref={offersBlockRef} className="mt-12 md:mt-16">
          <div className="relative overflow-hidden rounded-[1.85rem] border border-slate-200/70 bg-gradient-to-b from-slate-50/95 via-white to-blue-50/35 px-4 py-8 shadow-[0_24px_64px_-28px_rgba(15,23,42,0.16)] md:px-8 md:py-10">
            <div
              className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.4]"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(59,130,246,0.09), transparent 55%), radial-gradient(ellipse 70% 50% at 85% 100%, rgba(6,182,212,0.07), transparent 50%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.25]"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(100, 116, 139, 0.1) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div
              ref={offersHeaderRef}
              className="relative mx-auto mb-8 max-w-2xl text-center md:mb-10"
            >
              <h2
                id="what-hifai-offers-heading"
                className="mt-4 font-geom-heading text-[clamp(1.65rem,4vw,2.45rem)] font-normal leading-[1.15] tracking-[-0.02em] text-ink"
              >
                What <span className="text-blue-700">HIfAi</span> offers?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60 md:text-[18px]">
              HIfAi offers students and education institutions to:
              </p>
            </div>

            <ul
              ref={offerCardsWrapRef}
              className="relative grid list-none grid-cols-1 gap-4 [perspective:1200px] md:grid-cols-2 md:gap-5 lg:gap-6"
            >
              {HIFAI_OFFERS_CARDS.map((card, idx) => {
                const Icon = card.icon;
                const isWide = idx === 2;
                return (
                  <li
                    key={card.step}
                    className={`group relative min-w-0 ${isWide ? "md:col-span-2" : ""}`}
                  >
                    <div
                      className={`pointer-events-none absolute -inset-px rounded-[1.05rem] bg-gradient-to-br ${card.ring} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-30`}
                      aria-hidden
                    />
                    <div
                      className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/85 bg-white/90 p-5 shadow-[0_4px_28px_-10px_rgba(15,23,42,0.14)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:p-6 ${card.borderAccent} group-hover:-translate-y-1.5 group-hover:border-slate-300/90 group-hover:shadow-[0_22px_56px_-18px_rgba(37,99,235,0.22)]`}
                    >
                      <div
                        className={`absolute inset-x-0 top-0 z-[1] h-[3px] bg-gradient-to-r ${card.ring} opacity-80`}
                        aria-hidden
                      />

                      <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-start md:gap-6 lg:gap-8">
                        <div className="relative shrink-0 md:shrink-0">
                          <div
                            className={`pointer-events-none absolute inset-0 rounded-2xl ${card.glow} blur-xl transition-transform duration-500 group-hover:scale-110`}
                            aria-hidden
                          />
                          <div
                            className={`relative flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-2xl bg-gradient-to-br ${card.ring} text-white shadow-[0_12px_28px_-8px_rgba(37,99,235,0.45)] ring-2 ring-white/40 transition-transform duration-500 will-change-transform group-hover:scale-[1.06] group-hover:shadow-[0_16px_36px_-10px_rgba(37,99,235,0.5)] sm:h-16 sm:w-16`}
                          >
                            <Icon
                              className="h-7 w-7 sm:h-8 sm:w-8"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          </div>
                          <span className="absolute -right-1.5 -top-1.5 flex h-7 min-w-[1.75rem] items-center justify-center rounded-full border-2 border-white bg-white px-1.5 font-geom-heading text-[11px] font-normal tabular-nums text-blue-700 shadow-md">
                            {card.step}
                          </span>
                        </div>

                        <div className="min-w-0 w-full flex-1 md:min-w-0 md:pt-0.5">
                          <h3 className="mt-0 max-w-none font-geom-heading text-lg font-normal leading-snug tracking-[-0.02em] text-slate-900 md:text-xl">
                            {card.title}
                          </h3>
                          <p className="mt-2.5 max-w-none text-sm leading-relaxed text-slate-600 md:text-[15px] md:leading-relaxed">
                            {card.body}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 h-1 w-full min-w-0 shrink-0 overflow-hidden rounded-full bg-slate-100 md:mt-6">
                        <div
                          className={`h-full w-[0%] rounded-full bg-gradient-to-r ${card.ring} transition-[width] duration-700 ease-out group-hover:w-full`}
                          aria-hidden
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICE_CARDS = [
  {
    id: "s1",
    title: "Artificial Intelligence (AI)",
    image: skillDevelopmentImg,
    short:
      "Simulation of human intelligence processes by machines and systems.",
    description:
      "Artificial Intelligence (AI) refers to the simulation of human intelligence processes by machines and systems. Every day is evolving with something new in the AI world.",
    details: [
      "Artificial Intelligence (AI) refers to the simulation of human intelligence processes by machines and systems.",
      "Data is the raw fuel and foundational experience required for machine learning models to think, act, and generate insights.",
      "Rules, reasoning, and algorithms define and transform typical human behavior into machine-understandable actions that systems can perform by utilizing logical reasoning.",
      "Learning means continuous feedback, including error corrections to machine learning architectures, enabling self-learning and helping prevent errors as systems progress through data collection and processing.",
      "Every day, the AI world evolves with something new.",
    ],
    icon: <Bot className="h-8 w-8" strokeWidth={1.8} />,
    accentFrom: "from-blue-600/15",
    accentTo: "to-slate-200/20",
  },
  {
    id: "s2",
    title: "Blockchain",
    image: abcdProblemImg,
    short:
      "A decentralized, distributed digital ledger that secures records with transparency.",
    description:
      "Blockchain technology is a decentralized and distributed digital ledger system that securely records transactions across multiple computers.",
    details: [
      "Blockchain technology is a decentralized and distributed digital ledger system that securely records transactions across multiple computers.",
      "Each block in the chain contains a list of transactions and is cryptographically linked to the previous block, forming a secure and immutable chain. This structure ensures that once data is recorded, it cannot be altered or deleted without the consensus of the network, enhancing transparency and trust. ",
      "Furthermore, it uses consensus algorithms, such as proof-of-work or proof-of-stake, to validate transactions, maintaining the integrity of the data. ",
      "Blockchain has diverse applications, including cryptocurrencies, supply chain management, and smart contracts, making it a vital area of study for future engineers in various fields.",
    ],
    icon: <Blocks className="h-8 w-8" strokeWidth={1.8} />,
    accentFrom: "from-blue-500/14",
    accentTo: "to-slate-300/12",
  },
  {
    id: "s3",
    title: "Cloud",
    image: highSchoolImg,
    short:
      "On-demand delivery of IT resources over the internet as scalable virtualized utility.",
    description:
      "Cloud technology delivers servers, storage, databases, networking, and software on-demand, transforming IT from capital-intensive projects into scalable services.",
    details: [
      "Cloud technology is the on-demand delivery of IT resources - servers, storage, databases, networking, and software - over the internet, transforming IT projects from a capital-intensive model into a scalable, virtualized utility.",
      "Instead of provisioning and maintaining physical data centers, engineers leverage remote pooled infrastructure managed by providers like AWS, Azure, or GCP, allowing rapid elasticity during demand spikes without upfront CapEx/OpEx strain.",
      "Key service models include IaaS for raw virtualized infrastructure, PaaS for streamlined development environments, and SaaS for ready-to-use applications, all enabling modern DevOps, containerization (Kubernetes), and all having Omni presence of AI. ",
      "For engineers, it means transitioning from designing resilient, secure and distributed sytems to leveraging best that is available in cloud platform and adopt accordingly.",
    ],
    icon: <Cloud className="h-8 w-8" strokeWidth={1.8} />,
    accentFrom: "from-slate-400/14",
    accentTo: "to-blue-500/10",
  },
  {
    id: "s4",
    title: "Data",
    image: universityConsultingImg,
    short:
      "Structured and unstructured data power AI, ML, reasoning, analytics, and insights.",
    description:
      "Data, in both structured and unstructured formats, is essential for ML and AI algorithms to think, act, and generate valuable outcomes.",
    details: [
      "Data in either structural or unstrctural formats is a essential for any ML, AI algorithams, analysis machine learning models to think, act, and generate insights. ",
      "In current world, data is not merely information; it is the raw fuel and foundational experience required not just for AI but not jut for resoning, gerating insights, analysis and so much more..",
      "Success of A high-performance AI systems lies in robust data pipelines—collecting, cleaning, preprocessing, and transforming raw information into actionable training sets on the quality, quantity",
    ],
    icon: <Database className="h-8 w-8" strokeWidth={1.8} />,
    accentFrom: "from-blue-700/12",
    accentTo: "to-slate-300/12",
  },
];

const SCHOOL_GRADES = [
  { value: "", label: "Select grade" },
  { value: "9", label: "9th" },
  { value: "10", label: "10th" },
  { value: "11", label: "11th" },
  { value: "12", label: "12th" },
];

function inquiryInputClass(variant) {
  if (variant === "dark") {
    return "w-full rounded-xl border border-white/25 bg-white/12 px-3.5 py-2.5 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] placeholder:text-white/45 focus:border-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/25";
  }
  if (variant === "surface") {
    return "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-[0.9375rem] leading-snug text-ink shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-slate-300 focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/15";
  }
  return "w-full rounded-xl border border-ink/12 bg-ink/[0.035] px-3.5 py-2.5 text-sm text-ink shadow-[inset_0_1px_0_rgba(0,0,0,0.03)] placeholder:text-ink/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";
}

function inquiryLabelClass(variant) {
  if (variant === "dark") {
    return "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-cyan-100/95";
  }
  if (variant === "surface") {
    return "mb-2 block text-sm font-medium tracking-normal text-slate-700";
  }
  return "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-accent";
}

function inquiryFieldGridClass(variant) {
  return variant === "surface"
    ? "grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5"
    : "grid gap-3.5 sm:grid-cols-2";
}

const INQUIRY_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const sanitizeEmailInput = (value = "") =>
  String(value).replace(/[^a-zA-Z0-9@._-]/g, "");
const sanitizePhoneInput = (value = "") =>
  String(value).replace(/\D/g, "").slice(0, 10);

function countDigits(value) {
  return (String(value).match(/\d/g) || []).length;
}

function validateInquiryEmail(value) {
  const t = String(value ?? "").trim();
  if (!t) return "Email ID is required.";
  if (!INQUIRY_EMAIL_PATTERN.test(t)) return "Enter a valid email address.";
  return "";
}

function validateInquiryPhone(value) {
  const t = String(value ?? "").trim();
  if (!t) return "Phone number is required.";
  const n = countDigits(t);
  if (n !== 10) return "Phone number must be exactly 10 digits.";
  return "";
}

function validateRequiredText(value, label) {
  if (!String(value ?? "").trim()) return `${label} is required.`;
  return "";
}

function validateResumeFile(file) {
  if (!file || !(file instanceof File) || file.size === 0) return "";
  if (file.size > RESUME_MAX_BYTES) return "File must be 5MB or smaller.";
  const name = file.name.toLowerCase();
  const ok =
    name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
  if (!ok) return "Use PDF or Word only (.pdf, .doc, .docx).";
  return "";
}

function inquiryControlClass(variant, invalid) {
  const base = inquiryInputClass(variant);
  if (!invalid) return base;
  if (variant === "surface") {
    return `${base} border-red-400 ring-1 ring-red-200/80 hover:border-red-400 focus:border-red-500 focus:ring-[3px] focus:ring-red-200/60`;
  }
  if (variant === "dark") {
    return `${base} border-red-400/70 ring-1 ring-red-400/25 focus:border-red-400 focus:ring-red-400/30`;
  }
  return `${base} border-red-400 focus:border-red-500 focus:ring-red-200/50`;
}

function InquiryFieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-600" role="alert">
      {message}
    </p>
  );
}

function SchoolInquiryForm({
  variant = "light",
  formId,
  className = "",
  hideSubmit = false,
}) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});

  const clearErr = (key) => {
    setErrors((prev) => {
      if (prev[key] == null) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next = {};
    const firstName = validateRequiredText(fd.get("firstName"), "First name");
    if (firstName) next.firstName = firstName;
    const lastName = validateRequiredText(fd.get("lastName"), "Last name");
    if (lastName) next.lastName = lastName;
    const grade = String(fd.get("grade") ?? "").trim();
    if (!grade) next.grade = "Please select your grade.";
    const institution = validateRequiredText(
      fd.get("institution"),
      "Institution name",
    );
    if (institution) next.institution = institution;
    const phone = validateInquiryPhone(fd.get("phone"));
    if (phone) next.phone = phone;
    const email = validateInquiryEmail(fd.get("email"));
    if (email) next.email = email;

    setErrors(next);
    if (Object.keys(next).length) {
      const order = [
        "firstName",
        "lastName",
        "grade",
        "institution",
        "phone",
        "email",
      ];
      const idFor = {
        firstName: `${formId}-fn`,
        lastName: `${formId}-ln`,
        grade: `${formId}-grade`,
        institution: `${formId}-school`,
        phone: `${formId}-phone`,
        email: `${formId}-email`,
      };
      for (const k of order) {
        if (next[k]) {
          document.getElementById(idFor[k])?.focus();
          break;
        }
      }
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = {
        name: `${String(fd.get("firstName") ?? "").trim()} ${String(fd.get("lastName") ?? "").trim()}`.trim(),
        email: String(fd.get("email") ?? "").trim(),
        subject: "School Inquiry",
        message: [
          `Grade: ${String(fd.get("grade") ?? "").trim()}`,
          `Institution: ${String(fd.get("institution") ?? "").trim()}`,
          `Phone: ${String(fd.get("phone") ?? "").trim()}`,
        ].join("\n"),
        recipientRoute: "default",
      };
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Email request failed");
      }
      setShowSuccessPopup(true);
      e.currentTarget.reset();
    } catch (_error) {
      setSubmitError("Could not send inquiry now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id={formId} noValidate onSubmit={onSubmit} className={className}>
      {false ? (
        <div
          className={`relative overflow-hidden rounded-2xl border px-5 py-8 text-center ${
            variant === "dark"
              ? "border-white/20 bg-white/10 text-white"
              : variant === "surface"
                ? "border-slate-200 bg-white text-ink shadow-sm"
                : "border-accent/15 bg-gradient-to-br from-accent/5 to-accent-cyan/8 text-ink"
          }`}
        >
          {/* Decorative confetti dots */}
          <div className="pointer-events-none absolute inset-0">
            <span
              className="absolute left-[14%] top-[18%] h-2 w-2 rounded-full bg-accent/50"
              aria-hidden
            />
            <span
              className="absolute left-[26%] top-[10%] h-1.5 w-1.5 rounded-full bg-accent-cyan/45"
              aria-hidden
            />
            <span
              className="absolute right-[22%] top-[14%] h-2 w-2 rounded-full bg-accent-cyan/40"
              aria-hidden
            />
            <span
              className="absolute right-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-accent/35"
              aria-hidden
            />
            <span
              className="absolute left-[36%] bottom-[14%] h-1.5 w-1.5 rounded-full bg-accent/35"
              aria-hidden
            />
            <span
              className="absolute right-[30%] bottom-[18%] h-2 w-2 rounded-full bg-accent-cyan/30"
              aria-hidden
            />
          </div>

          <div
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_18px_60px_rgba(0,0,0,0.25)] ${
              variant === "dark"
                ? "border-white/20 bg-white/10"
                : variant === "surface"
                  ? "border-slate-200 bg-slate-50"
                  : "border-accent/25 bg-gradient-to-br from-accent/15 to-accent-cyan/10"
            }`}
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <p className="font-geom-heading text-lg font-normal text-current md:text-xl">
            You’re in!
          </p>
          <p
            className={`mt-2 text-sm ${
              variant === "dark"
                ? "text-white/80"
                : variant === "surface"
                  ? "text-slate-600"
                  : "text-ink/70"
            }`}
          >
            We’ve received your school inquiry and will be in touch soon.
          </p>

          <div className="mt-5 grid gap-2 text-left text-xs md:grid-cols-3 md:text-center">
            {[
              { label: "Response time", value: "1–2 business days" },
              { label: "Next step", value: "A brief intro call" },
              { label: "What to prepare", value: "Your goals & timeline" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-cyan/90">
                  {item.label}
                </p>
                <p
                  className={`mt-1 font-semibold ${variant === "dark" ? "text-white/85" : variant === "surface" ? "text-ink" : "text-ink/85"}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={inquiryFieldGridClass(variant)}>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-fn`}
                className={inquiryLabelClass(variant)}
              >
                First name
              </label>
              <input
                id={`${formId}-fn`}
                name="firstName"
                type="text"
                autoComplete="given-name"
                aria-required="true"
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={
                  errors.firstName ? `${formId}-fn-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.firstName)}
                placeholder="Enter Your Full Name"
                onChange={() => clearErr("firstName")}
              />
              <InquiryFieldError
                id={`${formId}-fn-err`}
                message={errors.firstName}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-ln`}
                className={inquiryLabelClass(variant)}
              >
                Last name
              </label>
              <input
                id={`${formId}-ln`}
                name="lastName"
                type="text"
                autoComplete="family-name"
                aria-required="true"
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={
                  errors.lastName ? `${formId}-ln-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.lastName)}
                placeholder="Doe"
                onChange={() => clearErr("lastName")}
              />
              <InquiryFieldError
                id={`${formId}-ln-err`}
                message={errors.lastName}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-grade`}
                className={inquiryLabelClass(variant)}
              >
                Grade
              </label>
              <select
                id={`${formId}-grade`}
                name="grade"
                defaultValue=""
                aria-required="true"
                aria-invalid={errors.grade ? "true" : "false"}
                aria-describedby={
                  errors.grade ? `${formId}-grade-err` : undefined
                }
                className={`${inquiryControlClass(variant, !!errors.grade)} cursor-pointer`}
                onChange={() => clearErr("grade")}
              >
                {SCHOOL_GRADES.map((g) => (
                  <option
                    key={g.value || "placeholder"}
                    value={g.value}
                    disabled={g.value === ""}
                  >
                    {g.label}
                  </option>
                ))}
              </select>
              <InquiryFieldError
                id={`${formId}-grade-err`}
                message={errors.grade}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-school`}
                className={inquiryLabelClass(variant)}
              >
                Institution name
              </label>
              <input
                id={`${formId}-school`}
                name="institution"
                type="text"
                autoComplete="organization"
                aria-required="true"
                aria-invalid={errors.institution ? "true" : "false"}
                aria-describedby={
                  errors.institution ? `${formId}-school-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.institution)}
                placeholder="Enter Your School Name"
                onChange={() => clearErr("institution")}
              />
              <InquiryFieldError
                id={`${formId}-school-err`}
                message={errors.institution}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-phone`}
                className={inquiryLabelClass(variant)}
              >
                Phone number
              </label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                pattern="[0-9]{10}"
                aria-required="true"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={
                  errors.phone ? `${formId}-phone-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.phone)}
                placeholder="Enter 10-digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = sanitizePhoneInput(
                    e.currentTarget.value,
                  );
                }}
                onChange={() => clearErr("phone")}
              />
              <InquiryFieldError
                id={`${formId}-phone-err`}
                message={errors.phone}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-email`}
                className={inquiryLabelClass(variant)}
              >
                Email ID
              </label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={
                  errors.email ? `${formId}-email-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.email)}
                placeholder="Enter Your Email ID"
                onInput={(e) => {
                  e.currentTarget.value = sanitizeEmailInput(
                    e.currentTarget.value,
                  );
                }}
                onChange={() => clearErr("email")}
              />
              <InquiryFieldError
                id={`${formId}-email-err`}
                message={errors.email}
              />
            </div>
          </div>
          {!hideSubmit && (
            <div className="inquiry-stagger-item mt-5">
              {submitError ? (
                <p className="mb-3 text-sm font-medium text-red-600">
                  {submitError}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow sm:w-auto"
              >
                {submitting ? "Sending..." : "Submit inquiry"}
              </button>
            </div>
          )}
        </>
      )}
      <SubmissionSuccessModal
        open={showSuccessPopup}
        title="Inquiry submitted successfully"
        description="Thank you for submitting your school inquiry. Our team will contact you shortly."
        onClose={() => setShowSuccessPopup(false)}
      />
    </form>
  );
}

function UniversityInquiryForm({
  variant = "light",
  formId,
  className = "",
  hideSubmit = false,
}) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});

  const clearErr = (key) => {
    setErrors((prev) => {
      if (prev[key] == null) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next = {};
    const firstName = validateRequiredText(fd.get("firstName"), "First name");
    if (firstName) next.firstName = firstName;
    const lastName = validateRequiredText(fd.get("lastName"), "Last name");
    if (lastName) next.lastName = lastName;
    const dept = validateRequiredText(
      fd.get("departmentYear"),
      "Department & year",
    );
    if (dept) next.departmentYear = dept;
    const institution = validateRequiredText(
      fd.get("institution"),
      "Institution name",
    );
    if (institution) next.institution = institution;
    const phone = validateInquiryPhone(fd.get("phone"));
    if (phone) next.phone = phone;
    const email = validateInquiryEmail(fd.get("email"));
    if (email) next.email = email;
    const resume = fd.get("resume");
    if (resume instanceof File) {
      const re = validateResumeFile(resume);
      if (re) next.resume = re;
    }

    setErrors(next);
    if (Object.keys(next).length) {
      const order = [
        "firstName",
        "lastName",
        "departmentYear",
        "institution",
        "phone",
        "email",
        "resume",
      ];
      const idFor = {
        firstName: `${formId}-fn`,
        lastName: `${formId}-ln`,
        departmentYear: `${formId}-dept`,
        institution: `${formId}-inst`,
        phone: `${formId}-phone`,
        email: `${formId}-email`,
        resume: `${formId}-resume`,
      };
      for (const k of order) {
        if (next[k]) {
          document.getElementById(idFor[k])?.focus();
          break;
        }
      }
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const resume = fd.get("resume");
      const resumeInfo =
        resume instanceof File && resume.size > 0
          ? `${resume.name} (${Math.round(resume.size / 1024)} KB)`
          : "Not attached";

      const payload = {
        name: `${String(fd.get("firstName") ?? "").trim()} ${String(fd.get("lastName") ?? "").trim()}`.trim(),
        email: String(fd.get("email") ?? "").trim(),
        subject: "University Inquiry",
        message: [
          `Department & Year: ${String(fd.get("departmentYear") ?? "").trim()}`,
          `Institution: ${String(fd.get("institution") ?? "").trim()}`,
          `Phone: ${String(fd.get("phone") ?? "").trim()}`,
          `Resume: ${resumeInfo}`,
        ].join("\n"),
        recipientRoute: "default",
      };

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Email request failed");
      }
      setShowSuccessPopup(true);
      e.currentTarget.reset();
    } catch (_error) {
      setSubmitError("Could not send inquiry now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resumeFileClass = () => {
    const base =
      variant === "dark"
        ? `${inquiryInputClass(variant)} file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-white/20 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white`
        : variant === "surface"
          ? `${inquiryInputClass(variant)} file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 file:shadow-sm`
          : `${inquiryInputClass(variant)} file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-accent/10 file:px-3 file:py-2 file:text-sm file:font-medium file:text-accent`;
    if (!errors.resume) return base;
    if (variant === "surface") {
      return `${base} border-red-400 ring-1 ring-red-200/80 focus:border-red-500 focus:ring-[3px] focus:ring-red-200/60`;
    }
    if (variant === "dark") {
      return `${base} border-red-400/70 ring-1 ring-red-400/25`;
    }
    return `${base} border-red-400 focus:border-red-500 focus:ring-red-200/50`;
  };

  return (
    <form id={formId} noValidate onSubmit={onSubmit} className={className}>
      {false ? (
        <div
          className={`relative overflow-hidden rounded-2xl border px-5 py-8 text-center ${
            variant === "dark"
              ? "border-white/20 bg-white/10 text-white"
              : variant === "surface"
                ? "border-slate-200 bg-white text-ink shadow-sm"
                : "border-accent/15 bg-gradient-to-br from-accent/5 to-accent-cyan/8 text-ink"
          }`}
        >
          {/* Decorative confetti dots */}
          <div className="pointer-events-none absolute inset-0">
            <span
              className="absolute left-[14%] top-[18%] h-2 w-2 rounded-full bg-accent/45"
              aria-hidden
            />
            <span
              className="absolute left-[26%] top-[10%] h-1.5 w-1.5 rounded-full bg-accent-cyan/40"
              aria-hidden
            />
            <span
              className="absolute right-[22%] top-[14%] h-2 w-2 rounded-full bg-accent-cyan/35"
              aria-hidden
            />
            <span
              className="absolute right-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-accent/30"
              aria-hidden
            />
            <span
              className="absolute left-[36%] bottom-[14%] h-1.5 w-1.5 rounded-full bg-accent/30"
              aria-hidden
            />
            <span
              className="absolute right-[30%] bottom-[18%] h-2 w-2 rounded-full bg-accent-cyan/25"
              aria-hidden
            />
          </div>

          <div
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_18px_60px_rgba(0,0,0,0.25)] ${
              variant === "dark"
                ? "border-white/20 bg-white/10"
                : variant === "surface"
                  ? "border-slate-200 bg-slate-50"
                  : "border-accent/25 bg-gradient-to-br from-accent/15 to-accent-cyan/10"
            }`}
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <p className="font-geom-heading text-lg font-normal text-current md:text-xl">
            You’re in!
          </p>
          <p
            className={`mt-2 text-sm ${
              variant === "dark"
                ? "text-white/80"
                : variant === "surface"
                  ? "text-slate-600"
                  : "text-ink/70"
            }`}
          >
            We’ve received your university inquiry and will be in touch soon.
          </p>

          <div className="mt-5 grid gap-2 text-left text-xs md:grid-cols-3 md:text-center">
            {[
              { label: "Response time", value: "1–2 business days" },
              { label: "Next step", value: "Program-fit discussion" },
              { label: "What to prepare", value: "Your department priorities" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-cyan/90">
                  {item.label}
                </p>
                <p
                  className={`mt-1 font-semibold ${variant === "dark" ? "text-white/85" : variant === "surface" ? "text-ink" : "text-ink/85"}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={inquiryFieldGridClass(variant)}>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-fn`}
                className={inquiryLabelClass(variant)}
              >
                First name
              </label>
              <input
                id={`${formId}-fn`}
                name="firstName"
                type="text"
                autoComplete="given-name"
                aria-required="true"
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={
                  errors.firstName ? `${formId}-fn-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.firstName)}
                placeholder="Alex"
                onChange={() => clearErr("firstName")}
              />
              <InquiryFieldError
                id={`${formId}-fn-err`}
                message={errors.firstName}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-ln`}
                className={inquiryLabelClass(variant)}
              >
                Last name
              </label>
              <input
                id={`${formId}-ln`}
                name="lastName"
                type="text"
                autoComplete="family-name"
                aria-required="true"
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={
                  errors.lastName ? `${formId}-ln-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.lastName)}
                placeholder="Kim"
                onChange={() => clearErr("lastName")}
              />
              <InquiryFieldError
                id={`${formId}-ln-err`}
                message={errors.lastName}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-2">
              <label
                htmlFor={`${formId}-dept`}
                className={inquiryLabelClass(variant)}
              >
                Department & year
              </label>
              <input
                id={`${formId}-dept`}
                name="departmentYear"
                type="text"
                aria-required="true"
                aria-invalid={errors.departmentYear ? "true" : "false"}
                aria-describedby={
                  errors.departmentYear ? `${formId}-dept-err` : undefined
                }
                className={inquiryControlClass(
                  variant,
                  !!errors.departmentYear,
                )}
                placeholder="e.g. Computer Science · Final year"
                onChange={() => clearErr("departmentYear")}
              />
              <InquiryFieldError
                id={`${formId}-dept-err`}
                message={errors.departmentYear}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-inst`}
                className={inquiryLabelClass(variant)}
              >
                Institution name
              </label>
              <input
                id={`${formId}-inst`}
                name="institution"
                type="text"
                autoComplete="organization"
                aria-required="true"
                aria-invalid={errors.institution ? "true" : "false"}
                aria-describedby={
                  errors.institution ? `${formId}-inst-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.institution)}
                placeholder="Your university"
                onChange={() => clearErr("institution")}
              />
              <InquiryFieldError
                id={`${formId}-inst-err`}
                message={errors.institution}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-phone`}
                className={inquiryLabelClass(variant)}
              >
                Phone number
              </label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                pattern="[0-9]{10}"
                aria-required="true"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={
                  errors.phone ? `${formId}-phone-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.phone)}
                placeholder="Enter 10-digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = sanitizePhoneInput(
                    e.currentTarget.value,
                  );
                }}
                onChange={() => clearErr("phone")}
              />
              <InquiryFieldError
                id={`${formId}-phone-err`}
                message={errors.phone}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-email`}
                className={inquiryLabelClass(variant)}
              >
                Email ID
              </label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={
                  errors.email ? `${formId}-email-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.email)}
                placeholder="Enter Your Email ID"
                onInput={(e) => {
                  e.currentTarget.value = sanitizeEmailInput(
                    e.currentTarget.value,
                  );
                }}
                onChange={() => clearErr("email")}
              />
              <InquiryFieldError
                id={`${formId}-email-err`}
                message={errors.email}
              />
            </div>
            <div className="inquiry-stagger-item sm:col-span-1">
              <label
                htmlFor={`${formId}-resume`}
                className={inquiryLabelClass(variant)}
              >
                Resume upload{" "}
                <span
                  className={`font-normal ${
                    variant === "surface"
                      ? "text-slate-500"
                      : variant === "dark"
                        ? "text-white/55"
                        : "text-ink/50"
                  }`}
                >
                  (optional)
                </span>
              </label>
              <input
                id={`${formId}-resume`}
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                aria-invalid={errors.resume ? "true" : "false"}
                aria-describedby={
                  errors.resume
                    ? `${formId}-resume-err`
                    : `${formId}-resume-hint`
                }
                className={resumeFileClass()}
                onChange={() => clearErr("resume")}
              />
              <InquiryFieldError
                id={`${formId}-resume-err`}
                message={errors.resume}
              />
              <p
                id={`${formId}-resume-hint`}
                className={`mt-2 text-xs leading-relaxed ${
                  variant === "dark"
                    ? "text-white/55"
                    : variant === "surface"
                      ? "text-slate-500"
                      : "text-ink/50"
                }`}
              >
                PDF or Word · optional for initial inquiry · max 5MB
              </p>
            </div>
          </div>
          {!hideSubmit && (
            <div className="inquiry-stagger-item mt-5">
              {submitError ? (
                <p className="mb-3 text-sm font-medium text-red-600">
                  {submitError}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow sm:w-auto"
              >
                {submitting ? "Sending..." : "Submit inquiry"}
              </button>
            </div>
          )}
        </>
      )}
      <SubmissionSuccessModal
        open={showSuccessPopup}
        title="Inquiry submitted successfully"
        description="Thank you for submitting your university inquiry. Our team will contact you shortly."
        onClose={() => setShowSuccessPopup(false)}
      />
    </form>
  );
}

function ServiceModal({ open, onClose, service, reducedMotion }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const isInquiry =
    service?.inquiry === "highSchool" || service?.inquiry === "university";
  const modalFormId =
    service?.inquiry === "highSchool"
      ? "school-inquiry-modal"
      : service?.inquiry === "university"
        ? "university-inquiry-modal"
        : null;

  useEffect(() => {
    if (!open || !overlayRef.current || !panelRef.current) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (reducedMotion) {
      gsap.set([overlay, panel], { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.set(overlay, { opacity: 0 });
    gsap.set(panel, { opacity: 0, scale: 0.88, y: 32, rotateX: 8 });

    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" }).to(
      panel,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 0.55,
        ease: "back.out(1.4)",
        transformPerspective: 1000,
      },
      "-=0.15",
    );

    if (listRef.current) {
      const items = listRef.current.querySelectorAll(
        isInquiry ? ".inquiry-stagger-item" : "li",
      );
      tl.from(
        items,
        {
          x: -16,
          opacity: 0,
          stagger: 0.07,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.25",
      );
    }

    return () => tl.kill();
  }, [open, reducedMotion, isInquiry]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleClose = () => {
    if (reducedMotion || !panelRef.current) {
      onClose();
      return;
    }
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
    }).to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.15");
  };

  if (!service) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${
        open ? "pointer-events-auto" : "pointer-events-none invisible"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        ref={overlayRef}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close dialog"
      />

      <div
        ref={panelRef}
        className="relative z-10 flex w-[min(92vw,720px)] flex-col overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/95 p-6 shadow-[0_28px_80px_rgba(9,15,26,0.28)] backdrop-blur-2xl md:p-7"
        style={{
          transformStyle: "preserve-3d",
          maxHeight: "min(92vh, 860px)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-cyan to-accent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-20 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
          aria-hidden
        />
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/85 text-xl text-ink/55 shadow-sm transition-all duration-200 hover:bg-white hover:text-ink hover:rotate-90"
          aria-label="Close"
        >
          x
        </button>
        <div className="relative z-10 mt-2 flex items-start justify-between gap-4 pr-12">
          <h2
            id="modal-title"
            className="font-geom-heading text-[1.35rem] font-normal leading-[1.2] tracking-[-0.008em] text-ink md:text-[1.72rem]"
          >
            {service.title}
          </h2>
          <span className="inline-flex shrink-0 items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
            0{service.id?.replace("s", "")}
          </span>
        </div>

        <div
          className="service-modal-scroll relative z-10 mt-4 min-h-0 flex-1 overflow-y-auto pr-1 pb-4"
          onWheelCapture={(e) => {
            // Prevent Lenis (global wheel handler) from hijacking wheel events.
            e.stopPropagation();
          }}
          onTouchMoveCapture={(e) => {
            // Keep touch scrolling inside the modal.
            e.stopPropagation();
          }}
        >
          {isInquiry ? (
            <div ref={listRef} className="relative z-10">
              <p className="mb-1.5 text-sm font-medium text-accent">
                {service.inquiry === "highSchool"
                  ? "School inquiry · Grades 9–12"
                  : "University inquiry · 3rd & final year"}
              </p>
              <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50/95 to-white p-6 shadow-[0_4px_32px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] md:p-8">
                {service.inquiry === "highSchool" ? (
                  <SchoolInquiryForm
                    key={service.id}
                    variant="surface"
                    formId={modalFormId}
                    hideSubmit
                  />
                ) : (
                  <UniversityInquiryForm
                    key={service.id}
                    variant="surface"
                    formId={modalFormId}
                    hideSubmit
                  />
                )}
              </div>
            </div>
          ) : (
            <>
              {Array.isArray(service.details) && service.details.length ? (
                <ul
                  ref={listRef}
                  className="relative z-10 mt-5 space-y-3 rounded-2xl border border-slate-200/85 bg-white/90 p-4 text-sm leading-relaxed text-ink/80 md:p-5"
                >
                  {service.details.map((line, i) => (
                    <li key={`${service.id}-detail-${i}`}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </>
          )}
        </div>

        <div
          className={`relative z-10 flex flex-wrap items-center gap-3 border-t pt-6 ${
            isInquiry
              ? "justify-between border-slate-200/90"
              : "border-accent/15"
          }`}
        >
          {isInquiry ? (
            <>
              <button
                type="submit"
                form={modalFormId}
                className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-7 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 sm:w-auto"
              >
                Submit inquiry
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
              >
                Close
              </button>
            </>
          ) : (
            <>
              <Link
                to="/get-started"
                onClick={handleClose}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:gap-3 hover:shadow-glow"
              >
                Join Now
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center rounded-full border border-ink/10 bg-white/85 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TiltCard({ card, index, reducedMotion, onClick }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || reducedMotion) return;

    const MAX_TILT = 12;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      gsap.to(el, {
        rotateY: dx * MAX_TILT,
        rotateX: -dy * MAX_TILT,
        scale: 1.035,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 900,
      });

      if (glowRef.current) {
        const pctX = ((e.clientX - rect.left) / rect.width) * 100;
        const pctY = ((e.clientY - rect.top) / rect.height) * 100;
        gsap.to(glowRef.current, {
          left: `${pctX}%`,
          top: `${pctY}%`,
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
        transformPerspective: 900,
      });
      if (glowRef.current)
        gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    };

    const onEnter = () => {
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.15,
          rotate: -6,
          duration: 0.3,
          ease: "back.out(2)",
        });
      }
    };
    const onIconLeave = () => {
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
      }
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
      className="service-card group relative w-full cursor-pointer overflow-hidden rounded-[1.6rem] border border-white/80 text-left shadow-[0_18px_48px_rgba(9,15,26,0.16)] transition-[transform,box-shadow,border-color] duration-300 hover:border-blue-300/50 hover:shadow-[0_22px_58px_rgba(37,99,235,0.24)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-blue-500/90"
        aria-hidden
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/25 blur-2xl opacity-0"
        aria-hidden
        style={{ position: "absolute" }}
      />

      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${card.accentFrom} ${card.accentTo} blur-2xl`}
        aria-hidden
      />

      <div className="relative flex min-h-[420px] h-full flex-col p-5 md:min-h-[430px] md:p-6">
        <span className="absolute right-3 top-1 select-none font-display text-[3rem] font-bold leading-none text-blue-600/20">
          {String.fromCharCode(65 + index)}
        </span>

        <div className="flex items-start gap-3 pr-8">
          <div
            ref={iconRef}
            className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-700 shadow-sm"
          >
            {card.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-geom-heading text-[1.12rem] font-normal leading-[1.2] tracking-[-0.008em] text-slate-900 md:text-[1.28rem]">
              {card.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 md:text-[0.95rem]">
              {card.short}
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-blue-100/90 bg-blue-50/60 p-3">
          <p className="line-clamp-3 text-xs leading-relaxed text-slate-700 md:text-sm">
            {card.description}
          </p>
        </div>

        <div className="relative mt-4 h-36 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 md:h-40">
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020817]/72 via-[#061733]/22 to-transparent"
            aria-hidden
          />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-all duration-300 group-hover:gap-3">
            View Full Content
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </span>
          <span className="rounded-full bg-blue-600/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
          HIfAi
          </span>
        </div>
      </div>
    </button>
  );
}

export function Services({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const decorARef = useRef(null);
  const decorBRef = useRef(null);
  const gridRef = useRef(null);
  const [active, setActive] = useState(null);
  /* ── Scroll-trigger entry animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      if (gridRef.current) {
        gsap.set(gridRef.current, { clearProps: "all" });
      }
      return;
    }

    const ctx = gsap.context(() => {
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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { clipPath: "inset(10% 8% 10% 8% round 24px)", opacity: 0.2 },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            opacity: 1,
            duration: isMobile ? 0.7 : 0.95,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (decorARef.current) {
        gsap.to(decorARef.current, {
          yPercent: -22,
          xPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
      if (decorBRef.current) {
        gsap.to(decorBRef.current, {
          yPercent: 16,
          xPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-4 md:px-8 md:py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18),rgba(237,247,255,0.38))]"
        aria-hidden
      />
      <div
        ref={decorARef}
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-600/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        ref={decorBRef}
        className="pointer-events-none absolute -right-20 bottom-14 h-80 w-80 rounded-full bg-slate-300/20 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl">
        {/* ── Section heading ── */}
        <div ref={introRef} className="mb-4 max-w-4xl md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            What we offer
          </p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-normal leading-[1.4] tracking-[-0.012em] text-ink">
            Services built for real outcomes
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {SERVICE_CARDS.map((card, i) => (
            <TiltCard
              key={card.id}
              card={card}
              index={i}
              reducedMotion={reducedMotion}
              onClick={() => setActive(card)}
            />
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

const STEPS = [
  {
    n: "01",
    title: "Learn Skills",
    desc: "Structured modules across AI, data, and digital fluency.",
  },
  {
    n: "02",
    title: "Apply Knowledge",
    desc: "Hands-on labs and guided challenges every week.",
  },
  {
    n: "03",
    title: "Solve Real Problems",
    desc: "Team projects modelled on industry scenarios.",
  },
  {
    n: "04",
    title: "Grow Future",
    desc: "Portfolios, credentials, and pathways that compound.",
  },
];

export function HowItWorks({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineMobileRef = useRef(null);
  const lineDesktopRef = useRef(null);
  const mobileSteps = useRef([]);
  const desktopSteps = useRef([]);
  const desktopNumbers = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lineM = lineMobileRef.current;
    const lineD = lineDesktopRef.current;
    const allSteps = [...mobileSteps.current, ...desktopSteps.current].filter(
      Boolean,
    );

    if (reducedMotion) {
      gsap.set([lineM, lineD].filter(Boolean), { clearProps: "all" });
      gsap.set(allSteps, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          y: isMobile ? 18 : 28,
          opacity: 0,
          stagger: 0.1,
          duration: 0.62,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      if (lineM) {
        gsap.fromTo(
          lineM,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 70%",
              scrub: 0.7,
            },
          },
        );
      }

      if (lineD) {
        gsap.fromTo(
          lineD,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              end: "bottom 52%",
              scrub: 1,
            },
          },
        );
      }

      desktopNumbers.current.forEach((el, i) => {
        if (!el) return;
        const finalText = STEPS[i].n;
        const finalNum = parseInt(finalText, 10);
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: finalNum,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.12,
          onUpdate: () => {
            el.textContent = String(Math.round(proxy.v)).padStart(2, "0");
          },
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        });
      });

      allSteps.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: isMobile ? 28 : 20,
          duration: isMobile ? 0.5 : 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      desktopSteps.current.forEach((el, i) => {
        if (!el) return;
        const circle = el.querySelector(".step-circle");
        if (!circle) return;
        gsap.from(circle, {
          scale: 0,
          opacity: 0,
          duration: 0.55,
          ease: "back.out(2)",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative bg-white px-4 py-12 md:px-8 md:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            How it works
          </p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-normal leading-[1.4] tracking-[-0.012em] text-ink">
            From first lesson to lasting momentum
          </h2>
        </div>

        <div className="relative md:hidden">
          <div
            ref={lineMobileRef}
            className="absolute left-[1.125rem] top-2 bottom-2 w-0.5 rounded-full bg-slate-200"
            aria-hidden
          />
          <ul className="relative space-y-10 pl-12">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                ref={(el) => {
                  mobileSteps.current[i] = el;
                }}
                className="relative"
              >
                <span className="absolute -left-[1.875rem] top-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-white text-xs font-bold text-blue-700 shadow-sm ring-2 ring-slate-100">
                  {i + 1}
                </span>
                <h3 className="font-geom-heading text-[1.05rem] font-normal leading-[1.2] tracking-[-0.006em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink/65">{step.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden md:block">
          <div
            ref={lineDesktopRef}
            className="absolute left-8 right-8 top-[2.25rem] h-0.5 rounded-full bg-slate-200"
            aria-hidden
          />

          <ul className="relative grid grid-cols-4 gap-6 pt-4">
            {STEPS.map((step, i) => (
              <li
                key={`d-${step.n}`}
                ref={(el) => {
                  desktopSteps.current[i] = el;
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="step-circle relative z-[1] mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-blue-400/20 bg-white shadow-glass backdrop-blur-md">
                  {i === 0 && !reducedMotion && (
                    <span
                      className="absolute inset-0 animate-ping rounded-2xl bg-blue-400/20"
                      aria-hidden
                    />
                  )}
                  <span
                    ref={(el) => {
                      desktopNumbers.current[i] = el;
                    }}
                    className="font-display text-[1.1rem] leading-[2] font-normal tracking-[-0.006em] text-gradient"
                  >
                    {step.n}
                  </span>
                </div>

                <h3 className="font-geom-heading text-[1.05rem] font-normal leading-[1.2] tracking-[-0.006em] text-ink lg:text-[1.22rem]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-ink/65">{step.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    id: "p1",
    title: "AI Skills Studio",
    summary:
      "Learners build practical AI workflows and present evidence-based outcomes across weekly sprint checkpoints.",
    meta: ["12 Modules", "Beginner to Advanced", "Portfolio-ready"],
    accent: "from-blue-600/15 to-blue-400/8",
  },
  {
    id: "p2",
    title: "Digital Problem Labs",
    summary:
      "Teams apply the ABCD method to real scenarios, test solutions, and refine delivery through mentor feedback.",
    meta: ["48+ Project Briefs", "Team-based", "Industry-style"],
    accent: "from-slate-400/12 to-blue-500/10",
  },
  {
    id: "p3",
    title: "Institution Innovation Tracks",
    summary:
      "Schools and universities launch guided project tracks aligned with future-of-work outcomes and measurable impact.",
    meta: [
      "School + University",
      "Implementation Support",
      "Outcome Analytics",
    ],
    accent: "from-blue-700/12 to-slate-300/10",
  },
];

export function ProjectsSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !cards.length) return;

    if (reducedMotion) {
      gsap.set(cards, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      if (introRef.current) {
        gsap.from(introRef.current.children, {
          y: isMobile ? 16 : 26,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      gsap.from(cards, {
        y: isMobile ? 20 : 34,
        opacity: 0,
        stagger: isMobile ? 0.1 : 0.14,
        duration: isMobile ? 0.55 : 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          toggleActions: "play none none none",
        },
      });

      if (!isMobile) {
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 ? -6 : -10,
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
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-6 image.pngmd:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div ref={introRef} className="mb-4 max-w-3xl md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Projects in action
          </p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.1rem)] font-normal leading-[1.3] tracking-[-0.012em] text-ink">
            Real-world project journeys built for measurable outcomes
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-white/75 p-6 shadow-[0_16px_40px_rgba(9,15,26,0.08)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:shadow-[0_22px_56px_rgba(37,99,235,0.18)] md:p-7"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-blue-600/90"
                aria-hidden
              />
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${project.accent} blur-2xl`}
                aria-hidden
              />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600/90">
                  Project 0{i + 1}
                </p>
                <h3 className="mt-3 font-geom-heading text-[1.28rem] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">
                  {project.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-blue-100/90 pt-4 text-sm text-ink/75">
                  {project.meta.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
