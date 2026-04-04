import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import {
  Award,
  BrainCircuit,
  Briefcase,
  GraduationCap,
  Landmark,
  LayoutGrid,
  Orbit,
  Route,
  School,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min.js";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Human Intelligence for Artificial Control";
const WORDS = HEADLINE.split(" ");

export function Hero({ reducedMotion, isMobile }) {
  const rootRef = useRef(null);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const parallaxRef = useRef(null);
  const trailLayerRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current || vantaEffect.current) return;

    const opts = {
      el: vantaRef.current,
      THREE,
      mouseControls: !isMobile,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: isMobile ? 0.92 : 1,
      scaleMobile: 0.9,
      color: 0x2f63ff,
      color2: 0x4a7dff,
      backgroundColor: 0xffffff,
      size: isMobile ? 0.62 : 0.72,
    };

    try {
      vantaEffect.current = GLOBE(opts);
    } catch {
      // Vanta may fail if WebGL unavailable.
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [isMobile]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const clearIntroTargets = () => {
      const wordSpans =
        headlineRef.current?.querySelectorAll(".hero-word") ?? [];
      const sub = subRef.current;
      const cta = ctaRef.current;
      gsap.set([...wordSpans, sub, cta].filter(Boolean), { clearProps: "all" });
    };

    if (reducedMotion) {
      clearIntroTargets();
      return;
    }

    const ctx = gsap.context(() => {
      const wordSpans =
        headlineRef.current?.querySelectorAll(".hero-word") ?? [];
      const sub = subRef.current;
      const cta = ctaRef.current;
      if (!wordSpans.length) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(wordSpans, {
        y: isMobile ? 24 : 48,
        opacity: 0,
        stagger: isMobile ? 0.06 : 0.08,
        duration: isMobile ? 0.55 : 0.75,
      });
      if (sub) {
        tl.from(sub, { y: 20, opacity: 0, duration: 0.6 }, "-=0.35");
      }
      if (cta) {
        tl.from(cta, { y: 20, opacity: 0, duration: 0.55 }, "-=0.28");
      }
    }, root);

    return () => {
      ctx.revert();
      clearIntroTargets();
    };
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const root = rootRef.current;
    const layer = trailLayerRef.current;
    if (!root || !layer) return;

    const dots = Array.from({ length: 16 }, (_, i) => {
      const dot = document.createElement("span");
      dot.className = "hero-trail-dot";
      dot.style.width = `${8 - i * 0.22}px`;
      dot.style.height = `${8 - i * 0.22}px`;
      layer.appendChild(dot);
      return dot;
    });
    let index = 0;

    const spawn = (x, y) => {
      const dot = dots[index];
      index = (index + 1) % dots.length;
      gsap.killTweensOf(dot);
      gsap.set(dot, { x, y, opacity: 0.52, scale: 1 });
      gsap.to(dot, {
        y: y - 8,
        opacity: 0,
        scale: 0.25,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      spawn(e.clientX - rect.left, e.clientY - rect.top);
    };

    root.addEventListener("pointermove", onMove);
    return () => {
      root.removeEventListener("pointermove", onMove);
      dots.forEach((dot) => dot.remove());
    };
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    if (reducedMotion || !rootRef.current || !parallaxRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        y: isMobile ? 0 : 80,
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

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-x-hidden bg-white px-4 pt-32 pb-20 md:pb-16"
    >
      <div ref={vantaRef} className="absolute inset-0 z-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-hero-mesh"
        aria-hidden
      />
      <div
        ref={trailLayerRef}
        className="pointer-events-none absolute inset-0 z-[11]"
        aria-hidden
      />
      <div
        ref={parallaxRef}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-700 shadow-sm backdrop-blur-md md:text-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600" />
          Digital innovation services
        </p>

        <h1
          ref={headlineRef}
          data-tilt-ignore
          className="font-display text-[clamp(2.2rem,8vw,4.6rem)] font-normal leading-[1.5] tracking-[-0.015em] text-ink"
        >
          {WORDS.map((w, i) => (
            <span
              key={i}
              className="hero-word inline-block mr-[0.2em] last:mr-0"
            >
              {w}
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 md:text-[1.45rem]"
        >
          Empowering Students & Institutions with Future Skills
        </p>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <Link
            to="/learning-hub#services"
            data-magnetic
            className="group relative inline-flex min-h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-md transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg md:text-base"
          >
            <span className="relative z-10">Explore Services</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
          <Link
            to="/get-started"
            data-magnetic
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border-2 border-ink/10 bg-white/70 px-8 py-3.5 text-center text-sm font-semibold text-ink backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:bg-white hover:shadow-md md:text-base"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-10"
        aria-hidden
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-ink/20 pt-2">
          <div className="h-2 w-1 animate-bounce rounded-full bg-blue-600/60" />
        </div>
      </div>
    </section>
  );
}

const PARTNER_SITE_URL = "https://kanavoogle.com/";

/** Award-style Lottie for the Kanavoogle consultant card (lottie.host). */
const CONSULTANT_AWARD_LOTTIE_SRC =
  "https://lottie.host/1a3c4202-23fe-487d-9f33-29d81b472a6d/hNqk3E74Uj.lottie";

const kanavoogleLinkClass =
  "font-medium text-blue-800 no-underline rounded-md px-1.5 py-0.5 transition-colors hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const PARTNERSHIP_AWARD_HIGHLIGHTS = [
  {
    title: "Innovation & concept design",
    text: "The HIfAi model has been recognised in forums that reward fresh thinking at the intersection of human capability, assessment, and AI.",
  },
  {
    title: "Education & future skills",
    text: "Highlighted for addressing how learners and institutions move from grades to visible, actionable skill intelligence.",
  },
  {
    title: "Responsible, scalable vision",
    text: "Commended for keeping human insight central while building pathways institutions can adopt with confidence.",
  },
];

export function KanavooglePartnershipSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const awardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current?.children?.length) {
        gsap.from(headerRef.current.children, {
          y: isMobile ? 14 : 22,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
      if (mainRef.current?.children?.length) {
        gsap.from(mainRef.current.children, {
          y: isMobile ? 18 : 26,
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
      if (awardsRef.current?.children?.length) {
        gsap.from(awardsRef.current.children, {
          y: isMobile ? 16 : 20,
          opacity: 0,
          stagger: 0.09,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: awardsRef.current,
            start: "top 90%",
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
      className="relative overflow-hidden border-t border-slate-200/80 bg-white px-4 py-14 md:px-8 md:py-15"
      aria-labelledby="kanavoogle-partnership-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100, 116, 139, 0.12) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[22rem] w-[22rem] -translate-y-1/3 translate-x-1/4 rounded-full bg-blue-600/[0.05] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Partnership
          </p>
          <h2
            id="kanavoogle-partnership-heading"
            className="mt-3 font-geom-heading text-[clamp(1.75rem,3.8vw,2.5rem)] font-normal leading-[1.2] tracking-[-0.02em] text-ink"
          >
            Proud partner of{" "}
            <a
              href={PARTNER_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={kanavoogleLinkClass}
            >
              Kanavoogle
            </a>
            <span className="text-ink/80">, Australia</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 md:text-[17px]">
            HIfAi is shaped through an active partnership with{" "}
            <a
              href={PARTNER_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={kanavoogleLinkClass}
            >
              Kanavoogle
            </a>
            connecting Australian innovation networks with our mission to make
            human intelligence visible, measurable, and actionable in a world
            shaped by AI.
          </p>
        </div>

        <div
          ref={mainRef}
          className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-stretch lg:gap-10"
        >
          <div className="flex flex-col justify-center rounded-2xl border border-slate-200/90 bg-slate-50/60 p-8 shadow-sm lg:col-span-7 lg:p-10">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-700 shadow-sm"
                aria-hidden
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              Global alignment
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75 md:text-base">
              <a
                href={PARTNER_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={kanavoogleLinkClass}
              >
                Kanavoogle
              </a>{" "}
              helps us stress-test product direction, research rigour, and
              go-to-market clarity—so schools, universities, and learners
              receive a platform built for real institutions, not slide decks
              alone.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75 md:text-base">
              Together we focus on ethical AI literacy, evidence-led skill
              signals, and pathways that respect both local context and
              international expectations for work and study.
            </p>
          </div>

          <aside className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] lg:col-span-5 lg:p-9">
            <div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                    Kanavoogle consultant
                  </p>
                  <p className="mt-4 font-geom-heading text-xl font-normal leading-snug tracking-[-0.02em] text-ink md:text-[1.35rem]">
                    Dr. N. Venkatachalam
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink/55">
                    BE (Hons), MBA, PhD
                  </p>
                </div>
                <div
                  className="mx-auto flex shrink-0 items-center justify-center sm:mx-0 sm:pt-0.5"
                  aria-hidden
                >
                  <DotLottieReact
                    src={CONSULTANT_AWARD_LOTTIE_SRC}
                    loop
                    autoplay={!reducedMotion}
                    className="h-[7.25rem] w-[7.25rem] sm:h-[8.25rem] sm:w-[8.25rem]"
                  />
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                Strategic guidance on validating the HIfAi concept,
                strengthening institutional narratives, and aligning the
                platform with global standards for skills, assessment, and
                responsible AI adoption.
              </p>
            </div>
            <p className="mt-8 border-t border-slate-100 pt-6 text-xs leading-relaxed text-ink/50">
              Credentials listed reflect academic and professional preparation;
              role with HIfAi is advisory in support of the Kanavoogle
              partnership.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

const WHY_HIFAI_POINTS = [
  { text: "Education measures knowledge, not skills.", kind: "gap" },
  { text: "Core human abilities remain unidentified.", kind: "gap" },
  { text: "No unified skill assessment exists.", kind: "gap" },
  { text: "HIfAi maps human intelligence using AI.", kind: "answer" },
  { text: "Enables focused skill development.", kind: "answer" },
  { text: "Aligns strengths with future pathways.", kind: "answer" },
];

export function WhyHifaiSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (leftRef.current?.children?.length) {
        gsap.from(leftRef.current.children, {
          y: isMobile ? 16 : 28,
          opacity: 0,
          stagger: 0.07,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }
      if (rightRef.current) {
        gsap.from(rightRef.current, {
          x: isMobile ? 0 : 28,
          y: isMobile ? 20 : 0,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
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
      className="relative overflow-hidden border-t border-slate-200/80 bg-white px-4 py-16 md:px-8 md:py-15"
      aria-labelledby="why-hifai-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100, 116, 139, 0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-blue-600/[0.06] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div ref={leftRef} className="flex flex-col">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Why HIfAi?
          </p>
          <h2
            id="why-hifai-heading"
            className="mt-3 font-geom-heading text-[clamp(1.85rem,4.2vw,2.75rem)] font-normal leading-[1.2] tracking-[-0.02em] text-ink"
          >
            Skills and intelligence,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">made visible</span>
              <span
                className="absolute -bottom-0.5 left-0 h-2.5 w-full rounded-md bg-blue-600/20"
                aria-hidden
              />
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65 md:text-[17px]">
            Traditional systems stop at grades. HIfAi closes the loop between
            what people know, what they can do, and where they are headed next.
          </p>

          <ul className="mt-8 space-y-0" role="list">
            {WHY_HIFAI_POINTS.map(({ text, kind }, i) => (
              <li
                key={i}
                className={`flex gap-4 border-t border-slate-200/80 py-4 first:border-t-0 first:pt-0 md:gap-5 ${
                  kind === "answer" ? "md:pl-1" : ""
                }`}
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    kind === "gap"
                      ? "bg-slate-300 ring-2 ring-slate-200/80"
                      : "bg-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
                  }`}
                  aria-hidden
                />
                <span
                  className={`text-[15px] leading-relaxed md:text-base ${
                    kind === "gap" ? "text-ink/70" : "font-medium text-ink"
                  }`}
                >
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={rightRef}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
        >
          <div
            className="absolute -inset-3 rounded-[1.75rem] bg-blue-600/[0.07] blur-xl md:-inset-4"
            aria-hidden
          />
          <figure className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.12)] ring-1 ring-ink/5">
            <img
              src="/why-hifai.jpg"
              alt="Learners building future-ready skills through guided practice and collaboration"
              className="aspect-[4/3] h-full w-full object-cover md:aspect-[5/4]"
              width={800}
              height={640}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="sr-only">
              Skill development and collaborative learning
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const MISSING_LINK_POINTS = [
  "One-size-fits-all assessments dominate learning.",
  "Exam results reflect knowledge only.",
  "Cognitive skills remain unmeasured.",
  "Students lack visibility of real strengths.",
  "Educators lack skill-based evaluation tools.",
];

export function MissingLinkSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          x: isMobile ? 0 : -32,
          y: isMobile ? 18 : 0,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
      if (contentRef.current?.children?.length) {
        gsap.from(contentRef.current.children, {
          y: isMobile ? 16 : 28,
          opacity: 0,
          stagger: 0.07,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
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
      className="relative overflow-hidden border-t border-slate-200/70 bg-white px-4 py-16 md:px-8 md:py-15"
      aria-labelledby="missing-link-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100, 116, 139, 0.12) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blue-600/[0.05] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div
          ref={imageRef}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
        >
          <div
            className="absolute -inset-3 rounded-[1.75rem] bg-blue-600/[0.06] blur-xl md:-inset-4"
            aria-hidden
          />
          <figure className="relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-slate-100 shadow-[0_24px_64px_rgba(15,23,42,0.1)] ring-1 ring-ink/5">
            <img
              src="/high-school-solution.jpg.jpeg"
              alt="Classroom and institutional learning where assessment often stops at exam scores"
              className="aspect-[4/3] h-full w-full object-cover md:aspect-[5/4]"
              width={800}
              height={640}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="sr-only">
              School and organizational learning context
            </figcaption>
          </figure>
        </div>

        <div ref={contentRef} className="flex flex-col">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Education today
          </p>
          <h2
            id="missing-link-heading"
            className="mt-3 font-geom-heading text-[clamp(1.85rem,4.2vw,2.75rem)] font-normal leading-[1.2] tracking-[-0.02em] text-ink"
          >
            This Missing Link{" "}
            <span className="relative inline-block">
              <span className="relative z-10">in Education</span>
              <span
                className="absolute -bottom-0.5 left-0 h-2.5 w-full rounded-md bg-blue-600/20"
                aria-hidden
              />
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65 md:text-[17px]">
            When measurement ends at marks, both learners and teachers lose the
            signal they need for the next best step—skills stay invisible and
            decisions stay guesswork.
          </p>

          <ul className="mt-8 space-y-0" role="list">
            {MISSING_LINK_POINTS.map((text, i) => (
              <li
                key={i}
                className="flex gap-4 border-t border-slate-200/80 py-4 first:border-t-0 first:pt-0 md:gap-5"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 ring-2 ring-slate-200/90"
                  aria-hidden
                />
                <span className="text-[15px] leading-relaxed text-ink/75 md:text-base">
                  {text}
                </span>
              </li>
            ))}
            <li className="mt-2 flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:gap-5 md:p-6">
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white shadow-sm"
                aria-hidden
              >
                !
              </span>
              <p className="text-[15px] font-semibold leading-relaxed text-ink md:text-base">
                This gap limits academic and career decisions.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function WhatIsHoverCard({
  reducedMotion,
  cardRef,
  icon,
  chip,
  title,
  acronym,
  body,
  footerTags,
}) {
  const innerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || reducedMotion) return;

    gsap.set(el, { transformOrigin: "50% 50%", transformPerspective: 1000 });

    const maxTilt = 9;
    const setRX = gsap.quickTo(el, "rotateX", {
      duration: 0.35,
      ease: "power3.out",
    });
    const setRY = gsap.quickTo(el, "rotateY", {
      duration: 0.35,
      ease: "power3.out",
    });
    const setY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setRX(-py * maxTilt);
      setRY(px * maxTilt);
      setY(-6);
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          left: `${((e.clientX - r.left) / r.width) * 100}%`,
          top: `${((e.clientY - r.top) / r.height) * 100}%`,
          opacity: 0.55,
          duration: 0.25,
        });
      }
    };

    const onLeave = () => {
      setRX(0);
      setRY(0);
      setY(0);
      if (glowRef.current)
        gsap.to(glowRef.current, { opacity: 0, duration: 0.45 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <article ref={cardRef} className="group/card h-full perspective-[1400px]">
      <div className="relative h-full rounded-[1.65rem] border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out group-hover/card:border-blue-200/90 group-hover/card:shadow-[0_20px_48px_rgba(15,23,42,0.1)]">
        <div
          ref={innerRef}
          className="what-is-card-inner relative h-full overflow-hidden rounded-[1.58rem] border border-slate-100 bg-white transition-[box-shadow] duration-500 group-hover/card:border-slate-200"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            ref={glowRef}
            className="pointer-events-none absolute h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/18 blur-3xl opacity-0 transition-opacity duration-300"
            style={{ left: "50%", top: "50%" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-600/[0.06] blur-3xl transition-all duration-700 group-hover/card:scale-110"
            aria-hidden
          />

          <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-700 shadow-sm transition-all duration-500 group-hover/card:scale-[1.03] group-hover/card:border-blue-200 group-hover/card:bg-blue-50/80">
                {icon}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 transition-colors duration-300 group-hover/card:border-blue-200 group-hover/card:bg-blue-50 group-hover/card:text-blue-800">
                {chip}
              </span>
            </div>

            <h3 className="mt-6 font-geom-heading text-[1.45rem] font-normal leading-tight tracking-[-0.02em] text-ink md:text-[1.65rem] transition-transform duration-500 group-hover/card:translate-x-0.5">
              {title}
            </h3>
            {acronym ? (
              <p className="mt-2 text-sm font-semibold tracking-wide text-blue-600/95">
                {acronym}
              </p>
            ) : null}

            <p className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/72 md:text-base">
              {body}
            </p>

            {footerTags?.length ? (
              <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                {footerTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 transition-all duration-300 group-hover/card:border-blue-200 group-hover/card:bg-blue-50 group-hover/card:text-blue-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function BeneficiaryHoverCard({ reducedMotion, cardRef, icon, title, body }) {
  const innerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || reducedMotion) return;

    gsap.set(el, { transformOrigin: "50% 50%", transformPerspective: 1000 });

    const maxTilt = 8;
    const setRX = gsap.quickTo(el, "rotateX", {
      duration: 0.32,
      ease: "power3.out",
    });
    const setRY = gsap.quickTo(el, "rotateY", {
      duration: 0.32,
      ease: "power3.out",
    });
    const setY = gsap.quickTo(el, "y", { duration: 0.32, ease: "power3.out" });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setRX(-py * maxTilt);
      setRY(px * maxTilt);
      setY(-5);
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          left: `${((e.clientX - r.left) / r.width) * 100}%`,
          top: `${((e.clientY - r.top) / r.height) * 100}%`,
          opacity: 0.5,
          duration: 0.22,
        });
      }
    };

    const onLeave = () => {
      setRX(0);
      setRY(0);
      setY(0);
      if (glowRef.current)
        gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <article ref={cardRef} className="group/ben h-full perspective-[1300px]">
      <div className="relative h-full rounded-[1.4rem] border border-slate-200/90 bg-white shadow-[0_10px_36px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out group-hover/ben:border-blue-200/90 group-hover/ben:shadow-[0_18px_44px_rgba(15,23,42,0.09)]">
        <div
          ref={innerRef}
          className="relative h-full overflow-hidden rounded-[1.33rem] border border-slate-100 bg-white transition-[box-shadow] duration-500 group-hover/ben:border-slate-200"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            ref={glowRef}
            className="pointer-events-none absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl opacity-0"
            style={{ left: "50%", top: "50%" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-600/[0.05] blur-2xl transition-all duration-500 group-hover/ben:scale-110"
            aria-hidden
          />

          <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-700 shadow-sm transition-all duration-500 group-hover/ben:scale-[1.04] group-hover/ben:rotate-[-3deg] group-hover/ben:border-blue-200 group-hover/ben:bg-blue-50/80 md:h-14 md:w-14">
              {icon}
            </span>
            <h3 className="mt-5 font-geom-heading text-[1.2rem] font-normal leading-tight tracking-[-0.02em] text-ink md:text-[1.35rem] transition-transform duration-500 group-hover/ben:translate-x-0.5">
              {title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/72 md:text-[15px]">
              {body}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

const HIFAI_UNIQUE_STEPS = [
  { title: "Personalized Skill Development", icon: Sparkles },
  { title: "Customizable Learning Paths", icon: Route },
  { title: "Board-Agnostic Skill Building", icon: LayoutGrid },
  { title: "Lifelong Skills Portfolio", icon: Briefcase },
];

export function WhatIsHifaiSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const c0 = useRef(null);
  const c1 = useRef(null);
  const whoBlockRef = useRef(null);
  const whoHeaderRef = useRef(null);
  const w0 = useRef(null);
  const w1 = useRef(null);
  const w2 = useRef(null);
  const uniqueBlockRef = useRef(null);
  const uniqueHeaderRef = useRef(null);
  const u0 = useRef(null);
  const u1 = useRef(null);
  const u2 = useRef(null);
  const u3 = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current?.children?.length) {
        gsap.from(headerRef.current.children, {
          y: isMobile ? 14 : 22,
          opacity: 0,
          stagger: 0.08,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        });
      }
      [c0, c1].forEach((r, i) => {
        if (!r.current) return;
        gsap.from(r.current, {
          y: isMobile ? 28 : 40,
          opacity: 0,
          rotateX: 8,
          duration: 0.75,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });
      });

      const whoEl = whoBlockRef.current;
      if (whoEl) {
        if (whoHeaderRef.current?.children?.length) {
          gsap.from(whoHeaderRef.current.children, {
            y: isMobile ? 12 : 18,
            opacity: 0,
            stagger: 0.07,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whoEl,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          });
        }
        [w0, w1, w2].forEach((r, i) => {
          if (!r.current) return;
          gsap.from(r.current, {
            y: isMobile ? 24 : 32,
            opacity: 0,
            rotateX: 6,
            duration: 0.68,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whoEl,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        });
      }

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
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200/80 bg-white px-4 py-16 md:px-8 md:py-15"
      aria-labelledby="what-is-hifai-heading"
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
        <div
          ref={headerRef}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
            What is HIfAi?
          </p>
          <h2
            id="what-is-hifai-heading"
            className="mt-3 font-geom-heading text-[clamp(1.9rem,4.5vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.02em] text-ink"
          >
            Human intelligence,{" "}
            <span className="text-blue-700">amplified by AI</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 md:text-[17px]">
            Two sides of one platform—who you are as a learner, and how modern
            digital pillars power your growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <WhatIsHoverCard
            reducedMotion={reducedMotion}
            cardRef={c0}
            chip="Platform"
            icon={
              <BrainCircuit
                className="h-7 w-7"
                strokeWidth={1.75}
                aria-hidden
              />
            }
            title="HIfAi"
            acronym="Human Intelligence for Artificial Intelligence"
            body="HIfAi is a skill-centric platform focused on identifying and nurturing core human capabilities beyond academic knowledge."
          />
          <WhatIsHoverCard
            reducedMotion={reducedMotion}
            cardRef={c1}
            chip="Digital ABCD"
            icon={<Orbit className="h-7 w-7" strokeWidth={1.75} aria-hidden />}
            title="AI-driven pathways"
            acronym={null}
            body="It utilizes AI-driven insights and the Digital ABCD model (AI, Blockchain, Cloud, Data) to enable targeted skill development and help learners apply their strengths in education and career pathways."
            footerTags={["AI", "Blockchain", "Cloud", "Data"]}
          />
        </div>

        <div
          ref={whoBlockRef}
          className="relative mt-16 border-t border-slate-200/80 pt-14 md:mt-20 md:pt-16"
          aria-labelledby="who-benefits-heading"
        >
          <div
            ref={whoHeaderRef}
            className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
              Audience
            </p>
            <h2
              id="who-benefits-heading"
              className="mt-3 font-geom-heading text-[clamp(1.65rem,3.8vw,2.35rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              Who Benefits?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60 md:text-base">
              Learners, schools, and universities each get a clearer line of
              sight from skills to outcomes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-7">
            <BeneficiaryHoverCard
              reducedMotion={reducedMotion}
              cardRef={w0}
              icon={
                <GraduationCap
                  className="h-7 w-7 md:h-8 md:w-8"
                  strokeWidth={1.65}
                  aria-hidden
                />
              }
              title="Students"
              body="Evaluate core skills, choose aligned career paths."
            />
            <BeneficiaryHoverCard
              reducedMotion={reducedMotion}
              cardRef={w1}
              icon={
                <School
                  className="h-7 w-7 md:h-8 md:w-8"
                  strokeWidth={1.65}
                  aria-hidden
                />
              }
              title="Schools"
              body="Measure outcomes, redesign skill-based assessment."
            />
            <BeneficiaryHoverCard
              reducedMotion={reducedMotion}
              cardRef={w2}
              icon={
                <Landmark
                  className="h-7 w-7 md:h-8 md:w-8"
                  strokeWidth={1.65}
                  aria-hidden
                />
              }
              title="Universities"
              body="Build employable skills via project-based learning."
            />
          </div>
        </div>

        <div
          ref={uniqueBlockRef}
          className="relative mt-16 border-t border-slate-200/80 pt-14 md:mt-20 md:pt-16"
          aria-labelledby="what-makes-unique-heading"
        >
          <div
            ref={uniqueHeaderRef}
            className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
              Differentiators
            </p>
            <h2
              id="what-makes-unique-heading"
              className="mt-3 font-geom-heading text-[clamp(1.65rem,3.8vw,2.45rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              What Makes HIfAi Unique?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60 md:text-base">
              Four pillars that separate skill intelligence from
              one-size-fits-all learning.
            </p>
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div
              className="pointer-events-none absolute left-[calc(2.25rem-2px)] top-10 bottom-10 w-1 rounded-full bg-slate-200 md:hidden"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-[12%] right-[12%] top-[3.65rem] z-0 hidden h-1 rounded-full bg-slate-200 md:block"
              aria-hidden
            />

            <ol
              className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-5 lg:gap-8"
              role="list"
            >
              {HIFAI_UNIQUE_STEPS.map((step, i) => {
                const Icon = step.icon;
                const refs = [u0, u1, u2, u3];
                return (
                  <li
                    key={step.title}
                    ref={refs[i]}
                    className="group/uni relative flex flex-row items-center gap-5 md:flex-col md:items-center md:text-center"
                  >
                    <div className="relative shrink-0 md:mb-5">
                      <div
                        className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-blue-600/10 opacity-0 blur-2xl transition-all duration-500 group-hover/uni:opacity-100"
                        aria-hidden
                      />
                      <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-slate-200 p-[3px] shadow-sm transition-all duration-500 ease-out group-hover/uni:-translate-y-1 group-hover/uni:bg-blue-200 md:h-32 md:w-32 md:group-hover/uni:-translate-y-2 lg:h-36 lg:w-36">
                        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-slate-100 bg-white text-blue-700 shadow-inner ring-4 ring-white md:ring-[6px]">
                          <span className="font-display text-lg font-normal md:text-2xl lg:text-[1.65rem]">
                            {i + 1}
                          </span>
                          <Icon
                            className="mt-0.5 h-4 w-4 md:mt-1 md:h-6 md:w-6 lg:h-7 lg:w-7"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 md:flex-none">
                      <p className="text-[15px] font-semibold leading-snug text-ink transition-colors duration-300 group-hover/uni:text-blue-800 md:mx-auto md:max-w-[12.5rem] md:text-sm lg:text-[15px]">
                        {step.title}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICE_CARDS = [
  {
    id: "s1",
    title: "21st Century Skills Development",
    image: "/skill-developement.jpg.jpeg",
    short:
      "Critical thinking, collaboration, and digital fluency for the modern learner.",
    description:
      "Structured pathways that build creativity, communication, and computational thinking alongside core academics-so learners stay ahead of a changing world.",
    bullets: [
      "Creative thinking",
      "Problem Solving",
      "Critical Analysis",
      "Communication",
      "Digital Use",
    ],
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    accentFrom: "from-blue-600/15",
    accentTo: "to-slate-200/20",
  },
  {
    id: "s2",
    title: "Digital ABCD Problem Solving",
    image: "/abcd-problem-solving.jpg.jpeg",
    short:
      "Analyze, Build, Connect, and Deliver with structured digital workflows.",
    description:
      "Our ABCD framework turns messy challenges into repeatable problem-solving: analyze context, build prototypes, connect data and people, and deliver measurable impact.",
    bullets: ["AI", "Blockchain", "Cloud", "Data Analysis"],
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    accentFrom: "from-blue-500/14",
    accentTo: "to-slate-300/12",
  },
  {
    id: "s3",
    title: "High School Solutions",
    image: "/high-school-solution.jpg.jpeg",
    inquiry: "highSchool",
    short:
      "Programs that align with college readiness and future-of-work skills.",
    description:
      "From elective pathways to capstone experiences, we help high schools offer engaging, industry-aligned learning without overloading staff.",
    bullets: [
      "Curriculum mapping support",
      "Teacher enablement workshops",
      "Student project showcases",
    ],
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    accentFrom: "from-slate-400/14",
    accentTo: "to-blue-500/10",
  },
  {
    id: "s4",
    title: "University Consulting Services",
    image: "/university-consulting-service.jpg.jpeg",
    inquiry: "university",
    short:
      "Innovation labs, digital transformation, and workforce-aligned programs.",
    description:
      "Partner with HIFAI to modernize offerings: micro-credentials, industry projects, and research-to-practice pipelines that students and employers value.",
    bullets: [
      "Program design sprints",
      "Industry advisory loops",
      "Analytics for learner success",
    ],
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
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
  if (n < 10) return "Enter a valid phone number (at least 10 digits).";
  if (n > 15) return "Phone number has too many digits.";
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
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const clearErr = (key) => {
    setErrors((prev) => {
      if (prev[key] == null) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = (e) => {
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
    setDone(true);
  };

  return (
    <form id={formId} noValidate onSubmit={onSubmit} className={className}>
      {done ? (
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
                placeholder="Jane"
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
                placeholder="Your high school"
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
                inputMode="tel"
                autoComplete="tel"
                aria-required="true"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={
                  errors.phone ? `${formId}-phone-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.phone)}
                placeholder="+1 · · · · · · · · · ·"
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
                placeholder="you@school.edu"
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
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow sm:w-auto"
              >
                Submit inquiry
              </button>
            </div>
          )}
        </>
      )}
    </form>
  );
}

function UniversityInquiryForm({
  variant = "light",
  formId,
  className = "",
  hideSubmit = false,
}) {
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const clearErr = (key) => {
    setErrors((prev) => {
      if (prev[key] == null) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const onSubmit = (e) => {
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
    setDone(true);
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
      {done ? (
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
                inputMode="tel"
                autoComplete="tel"
                aria-required="true"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={
                  errors.phone ? `${formId}-phone-err` : undefined
                }
                className={inquiryControlClass(variant, !!errors.phone)}
                placeholder="+1 · · · · · · · · · ·"
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
                placeholder="you@university.edu"
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
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow sm:w-auto"
              >
                Submit inquiry
              </button>
            </div>
          )}
        </>
      )}
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
        className={`relative z-10 overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/95 p-6 shadow-[0_28px_80px_rgba(9,15,26,0.28)] backdrop-blur-2xl md:p-7 ${
          isInquiry
            ? "w-[min(92vw,720px)] flex flex-col"
            : "w-[min(92vw,700px)]"
        }`}
        style={{
          transformStyle: "preserve-3d",
          height: isInquiry ? "min(92vh,860px)" : undefined,
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

        <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-accent">
          Service Details
        </p>
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
          className={
            isInquiry
              ? "relative z-10 mt-4 flex-1 overflow-y-auto min-h-0 pr-1 pb-4 service-modal-scroll"
              : "relative z-10 mt-4"
          }
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
              <p className="relative z-10 mt-4 leading-relaxed text-ink/75">
                {service.description}
              </p>
              <ul
                ref={listRef}
                className="relative z-10 mt-6 space-y-2.5 rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/5 to-accent-cyan/6 p-4 text-sm text-ink/75"
              >
                {service.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-cyan text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
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
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030b1f]/92 via-[#0a1f44]/70 to-[#071634]/36"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#020817]/90 via-[#091a36]/62 to-transparent"
        aria-hidden
      />
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

      <div className="relative flex min-h-[380px] h-full flex-col gap-4 p-6 md:min-h-[380px] md:p-7">
        <div
          ref={iconRef}
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/50 bg-white/85 text-blue-700 shadow-sm"
        >
          {card.icon}
        </div>

        <span className="absolute right-1 top-1 select-none font-display text-[3.4rem] font-bold leading-none text-white/25">
          0{index + 1}
        </span>

        <h3 className="font-geom-heading text-[1.12rem] font-normal leading-[1.2] tracking-[-0.008em] text-white md:text-[1.35rem]">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/85 md:text-base">
          {card.short}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/25 pt-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition-all duration-300 group-hover:gap-3">
            {card.inquiry ? "Open inquiry form" : "View More"}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </span>
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            HIFAI
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
  const sliderWrapRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const touchStartX = useRef(null);

  const totalCards = SERVICE_CARDS.length;
  const hasDragged = useRef(false);

  // Ref-mirrors so the drag handler always reads fresh values without stale closures
  const currentIndexRef = useRef(0);
  const slidesPerViewRef = useRef(1);
  const maxIndexRef = useRef(0);

  /* ── Responsive slides-per-view ── */
  useEffect(() => {
    const update = () => setSlidesPerView(window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, totalCards - slidesPerView);

  // Keep ref-mirrors in sync
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  useEffect(() => {
    slidesPerViewRef.current = slidesPerView;
  }, [slidesPerView]);
  useEffect(() => {
    maxIndexRef.current = maxIndex;
  }, [maxIndex]);

  /* ── Sync track position on resize / slidesPerView change ── */
  useEffect(() => {
    const clamped = Math.min(currentIndex, maxIndex);
    const track = trackRef.current;
    const wrap = sliderWrapRef.current;
    if (!track || !wrap) return;
    const cardW = wrap.offsetWidth / slidesPerView;
    gsap.set(track, { x: -clamped * cardW });
    if (clamped !== currentIndex) setCurrentIndex(clamped);
  }, [slidesPerView]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Navigate to a slide index with GSAP ── */
  const navigateTo = (newIndex) => {
    if (isAnimating.current) return;
    newIndex = Math.max(0, Math.min(newIndex, maxIndex));
    if (newIndex === currentIndex) return;

    const track = trackRef.current;
    const wrap = sliderWrapRef.current;

    if (!track || !wrap || reducedMotion) {
      setCurrentIndex(newIndex);
      if (track && wrap) {
        const cardW = wrap.offsetWidth / slidesPerView;
        gsap.set(track, { x: -newIndex * cardW });
      }
      return;
    }

    isAnimating.current = true;
    const cardW = wrap.offsetWidth / slidesPerView;
    const direction = newIndex > currentIndex ? 1 : -1;

    /* Subtle scale/opacity punch on entering cards */
    const enteringIndices = Array.from(
      { length: slidesPerView },
      (_, k) => newIndex + k,
    );
    const enteringCards = enteringIndices
      .map((idx) => cardRefs.current[idx])
      .filter(Boolean);

    gsap.set(enteringCards, { scale: 0.96, opacity: 0.7 });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setCurrentIndex(newIndex);
      },
    });

    tl.to(track, {
      x: -newIndex * cardW,
      duration: 0.65,
      ease: "power3.inOut",
    }).to(
      enteringCards,
      {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.06,
      },
      "-=0.3",
    );
  };

  /* ── Touch / swipe support ── */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 48)
      navigateTo(delta > 0 ? currentIndex + 1 : currentIndex - 1);
    touchStartX.current = null;
  };

  /* ── Mouse drag-to-scroll ── */
  useEffect(() => {
    const wrap = sliderWrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const setX = gsap.quickSetter(track, "x", "px");
    let dragging = false;
    let startX = 0;
    let startTrackX = 0;
    let dragDelta = 0;

    const getTrackX = () => Number(gsap.getProperty(track, "x")) || 0;

    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      gsap.killTweensOf(track);
      dragging = true;
      hasDragged.current = false;
      startX = e.clientX;
      startTrackX = getTrackX();
      dragDelta = 0;
      wrap.style.cursor = "grabbing";
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!dragging) return;
      dragDelta = e.clientX - startX;
      if (Math.abs(dragDelta) > 5) hasDragged.current = true;
      const spv = slidesPerViewRef.current;
      const maxI = maxIndexRef.current;
      const cardW = wrap.offsetWidth / spv;
      const minX = -maxI * cardW;
      const rawX = startTrackX + dragDelta;
      let clampedX;
      if (rawX > 0) {
        clampedX = rawX * 0.25;
      } else if (rawX < minX) {
        clampedX = minX + (rawX - minX) * 0.25;
      } else {
        clampedX = rawX;
      }
      setX(clampedX);
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      wrap.style.cursor = "grab";
      const spv = slidesPerViewRef.current;
      const maxI = maxIndexRef.current;
      const curI = currentIndexRef.current;
      const cardW = wrap.offsetWidth / spv;
      let targetIndex;
      if (Math.abs(dragDelta) > 48) {
        targetIndex = dragDelta < 0 ? curI + 1 : curI - 1;
      } else {
        const currentX = getTrackX();
        targetIndex = Math.round(-currentX / cardW);
      }
      targetIndex = Math.max(0, Math.min(targetIndex, maxI));
      const snapX = -targetIndex * cardW;
      if (targetIndex !== curI) {
        isAnimating.current = true;
        gsap.to(track, {
          x: snapX,
          duration: 0.45,
          ease: "power3.out",
          onComplete: () => {
            isAnimating.current = false;
            setCurrentIndex(targetIndex);
          },
        });
      } else {
        gsap.to(track, { x: snapX, duration: 0.5, ease: "back.out(2)" });
      }
    };

    const onClickCapture = (e) => {
      if (hasDragged.current) {
        e.stopPropagation();
        hasDragged.current = false;
      }
    };

    wrap.style.cursor = "grab";
    wrap.style.userSelect = "none";
    wrap.addEventListener("mousedown", onMouseDown);
    wrap.addEventListener("click", onClickCapture, true);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      wrap.removeEventListener("mousedown", onMouseDown);
      wrap.removeEventListener("click", onClickCapture, true);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      wrap.style.cursor = "";
      wrap.style.userSelect = "";
    };
  }, []); // runs once — reads live values via refs

  /* ── Scroll-trigger entry animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      cardRefs.current
        .filter(Boolean)
        .forEach((c) => gsap.set(c, { clearProps: "all" }));
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

      /* Reveal the slider viewport with a clip-path wipe */
      if (sliderWrapRef.current) {
        gsap.fromTo(
          sliderWrapRef.current,
          { clipPath: "inset(0 100% 0 0 round 24px)" },
          {
            clipPath: "inset(0 0% 0 0 round 24px)",
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

      /* Staggered card reveal inside the track */
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.55 : 0.7,
            stagger: isMobile ? 0.08 : 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
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

  const dotCount = maxIndex + 1;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 md:px-8 md:py-24"
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
        <div ref={introRef} className="mb-12 max-w-2xl md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            What we offer
          </p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-normal leading-[1.4] tracking-[-0.012em] text-ink">
            Services built for{" "}
            <span className="relative inline-block">
              <span className="relative z-10">real outcomes</span>
              <span
                className="absolute -bottom-1 left-0 h-3 w-full rounded-md bg-blue-600/18"
                aria-hidden
              />
            </span>
          </h2>
        </div>

        {/* ── Swiper ── */}
        <div className="relative">
          {/* Prev arrow */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => navigateTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-6 flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-30"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => navigateTo(currentIndex + 1)}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-6 flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-30"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Overflow viewport */}
          <div
            ref={sliderWrapRef}
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Sliding track — width = totalCards × cardWidth */}
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{ width: `${(totalCards / slidesPerView) * 100}%` }}
            >
              {SERVICE_CARDS.map((card, i) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / totalCards}%` }}
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

          {/* ── Dot pagination ── */}
          <div
            className="mt-8 flex items-center justify-center gap-2.5"
            role="tablist"
            aria-label="Slides"
          >
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => navigateTo(i)}
                className={`h-2 rounded-full transition-all duration-350 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  i === currentIndex
                    ? "w-7 bg-blue-600 shadow-sm"
                    : "w-2 bg-blue-300/60 hover:bg-blue-400/80"
                }`}
              />
            ))}
          </div>

          {/* Slide counter (e.g. 1 / 3) */}
          <p className="mt-3 text-center text-xs font-semibold tabular-nums text-ink/40 tracking-wider select-none">
            {currentIndex + 1} / {dotCount}
          </p>
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

export function TargetUsers() {
  return null;
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
    title: "Grow Career",
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
      className="relative bg-white px-4 py-20 md:px-8 md:py-24"
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
      className="relative px-4 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={introRef} className="mb-12 max-w-3xl md:mb-16">
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
