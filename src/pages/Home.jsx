import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Award,
  BrainCircuit,
  Briefcase,
  ExternalLink,
  Globe2,
  Landmark,
  MonitorSmartphone,
  Orbit,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBgUrl from "../assets/images/hero-bg.jpg?url";
import skillDevelopmentImg from "../assets/images/skill-developement.jpg.jpeg?url";
import abcdProblemImg from "../assets/images/abcd-problem-solving.jpg.jpeg?url";
import highSchoolImg from "../assets/images/high-school-solution.jpg.jpeg?url";
import universityConsultingImg from "../assets/images/university-consulting-service.jpg.jpeg?url";

gsap.registerPlugin(ScrollTrigger);

const HERO_HOOK_POINTS = [
  {
    label: "Short Term",
    title: "MARKS",
    text: "Help you for your next steps",
  },
  {
    label: "Long Term",
    title: "SKILLS",
    text: "Help you to achieve your goals",
  },
];
const HERO_SUBTEXT =
  "There's a side of you beyond marks that remains undiscovered and HIfAi got you discover it differently.";

const HOW_CAN_HIFAI_IMAGE_URLS = {
  enthiranApp:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  digitalAbcdProjects:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  highSchools:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
  engineeringColleges:
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
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
      "Measure and deliver learning outcomes to year 9, 10, 11 and 12.",
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
      width: "120%",
      height: "120%",
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
          className="bg-slate-950 bg-cover bg-center bg-no-repeat will-change-transform"
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

      <div ref={parallaxRef} className="relative z-10 mx-auto w-full max-w-4xl">
        <div
          className="rounded-[1.75rem] border border-white/[0.14] bg-white/[0.08] px-7 py-9 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:rounded-[2rem] md:px-12 md:py-11"
          style={{
            boxShadow:
              "0 25px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div className="text-center">
            <h1
              ref={headlineRef}
              data-tilt-ignore
              className="mx-auto flex max-w-3xl flex-col gap-3 text-left md:gap-4"
            >
              {HERO_HOOK_POINTS.map((item) => (
                <span
                  key={item.title}
                  className="hero-line block rounded-2xl border border-white/20 bg-white/[0.07] px-4 py-3 backdrop-blur-sm md:px-5 md:py-4"
                >
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/95 md:text-xs">
                    {item.label}
                  </span>
                  <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-white">
                    <span className="text-[clamp(1.25rem,3.2vw,2.05rem)] leading-[1.1] tracking-[-0.015em]">
                      {item.title}
                      <span className="ml-2 text-white/85">-</span>
                    </span>
                    <span className="text-[clamp(0.95rem,2.4vw,1.35rem)] font-medium leading-[1.25] text-white/90">
                      {item.text}
                    </span>
                  </span>
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:mt-7 md:text-lg md:leading-relaxed"
            >
              {HERO_SUBTEXT}
            </p>

            <div
              ref={ctaRef}
              className="mt-9 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
            >
              <Link
                to="/learning-hub"
                data-magnetic
                className="group relative inline-flex min-h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:bg-blue-500 hover:shadow-xl md:text-base"
              >
                <span className="relative z-10">Explore Services</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
              <Link
                to="/get-started"
                data-magnetic
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] px-8 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/[0.14] md:text-base"
              >
                Let's HI-fAi
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

const PARTNER_SITE_URL = "https://kanavoogle.com/";
const PARTNER_SITE_DISPLAY = "kanavoogle.com";

const kanavoogleLinkClass =
  "font-medium text-blue-700 no-underline rounded-md px-1.5 py-0.5 transition-colors hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const hifaiHighlightClass = "font-semibold text-blue-700";

/** Partnership column: year — linked title — issuing body / program (external sources). */
const PARTNERSHIP_RECOGNITION_AWARDS = [
  {
    year: "2025",
    title: "CONNECT EducAIT",
    href: "https://research.csiro.au/onalumni/connect-educait/",
    description:
      "CSIRO — Australia's national science agency — ON Prime innovation program.",
  },
  {
    year: "2022",
    title: "Brian Gibson Award for Most Innovative Presentation",
    href: "https://seaanz.org/seaanz-2022-symposium-awards/",
    description:
      "SEAANZ — Small Enterprise Academy of Australia and New Zealand.",
  },
  {
    year: "2021",
    title: "ACDICT Learning and Teaching Grant",
    href: "https://acdict.edu.au/alta-2020-small-projects-grants-recipients-announced/",
    description: "Australian Council of ICT Deans (ACDICT).",
  },
];

const STATIC_ASSET_BASE = import.meta.env.BASE_URL;
const FEMALE_AVATAR_URL = `${STATIC_ASSET_BASE}human.png`;
const MALE_AVATAR_URL = `${STATIC_ASSET_BASE}man.png`;
const BRAIN_IMAGE_URL = `${STATIC_ASSET_BASE}brain.png`;

function getMemberAvatar(member) {
  if (member.gender === "female") return FEMALE_AVATAR_URL;
  if (member.gender === "male") return MALE_AVATAR_URL;
  return /^ms\.|^mrs\./i.test(member.name.trim())
    ? FEMALE_AVATAR_URL
    : MALE_AVATAR_URL;
}

const PARTNERSHIP_TEAM_GROUPS = [
  {
    title: "Leadership",
    subtitle: "Strategy & governance",
    icon: Landmark,
    index: "01",
    theme: {
      bar: "from-blue-900 via-blue-700 to-blue-600",
      icon: "bg-blue-600/15 text-blue-800 ring-1 ring-inset ring-blue-600/20 shadow-sm",
      avatar:
        "border-blue-200/80 bg-gradient-to-br from-white via-blue-50/40 to-blue-100/30 text-blue-950 shadow-sm",
      cardHover:
        "hover:border-blue-200/90 hover:shadow-md hover:shadow-blue-900/[0.06]",
    },
    members: [
      {
        name: "Dr. N. Venkatachalam",
        role: "Consultant",
        org: "Kanavoogle",
        initials: "NV",
        gender: "male",
        orgKind: "partner",
      },
      {
        name: "Mr. Madhu Raju",
        role: "IT Director",
        org: "HIfAi",
        initials: "MR",
        gender: "male",
        orgKind: "hifai",
      },
    ],
  },
  {
    title: "Operations",
    subtitle: "Outreach & analysis",
    icon: Briefcase,
    index: "02",
    theme: {
      bar: "from-indigo-900 via-indigo-700 to-violet-600",
      icon: "bg-indigo-600/15 text-indigo-900 ring-1 ring-inset ring-indigo-600/20 shadow-sm",
      avatar:
        "border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50/35 to-violet-50/40 text-indigo-950 shadow-sm",
      cardHover:
        "hover:border-indigo-200/90 hover:shadow-md hover:shadow-indigo-900/[0.06]",
    },
    members: [
      {
        name: "Mr. G. Saravana Sundar",
        role: "Public Relations Officer",
        org: "HIfAi",
        initials: "GS",
        gender: "male",
        orgKind: "hifai",
      },
      {
        name: "Mrs. M. Sayee Baggiyalakshmi",
        role: "Critical Analyst",
        org: "HIfAi",
        initials: "SB",
        gender: "female",
        orgKind: "hifai",
      },
    ],
  },
  {
    title: "Support",
    subtitle: "Growth & learning depth",
    icon: Users,
    index: "03",
    theme: {
      bar: "from-sky-800 via-cyan-700 to-teal-600",
      icon: "bg-cyan-600/14 text-cyan-950 ring-1 ring-inset ring-cyan-600/20 shadow-sm",
      avatar:
        "border-cyan-200/80 bg-gradient-to-br from-white via-cyan-50/35 to-teal-50/30 text-teal-950 shadow-sm",
      cardHover:
        "hover:border-cyan-200/90 hover:shadow-md hover:shadow-cyan-900/[0.06]",
    },
    members: [
      {
        name: "Ms. S. Sayee Skantha Varshini",
        role: "Marketing Lead",
        org: "HIfAi",
        initials: "SV",
        gender: "female",
        orgKind: "hifai",
      },
      {
        name: "Mrs. N. Mythili",
        role: "Academic Expert",
        org: "HIfAi",
        initials: "NM",
        gender: "female",
        orgKind: "hifai",
      },
    ],
  },
];

export function KanavooglePartnershipSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const awardsRef = useRef(null);
  const teamRef = useRef(null);

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
      if (teamRef.current?.children?.length) {
        gsap.from(teamRef.current.children, {
          y: isMobile ? 18 : 26,
          opacity: 0,
          stagger: 0.11,
          duration: 0.62,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 88%",
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
      className="relative overflow-hidden border-t border-slate-200/80 bg-white px-4 py-10 md:px-8 md:py-12"
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
        <div ref={headerRef} className="mx-auto max-w-5xl text-center">
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
          <p className="mt-3 text-sm leading-relaxed text-ink/65 md:text-[18px]">
            <span className={hifaiHighlightClass}>HIfAi</span> is shaped through
            an active partnership with{" "}
            <a
              href={PARTNER_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={kanavoogleLinkClass}
            >
              Kanavoogle
            </a>
            —connecting Australian innovation networks with our mission to make
            human intelligence visible, measurable, and actionable in a world
            shaped by AI. Explore the collaboration further at{" "}
            <a
              href={PARTNER_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={kanavoogleLinkClass}
            >
              {PARTNER_SITE_DISPLAY}
            </a>
            .
          </p>
        </div>

        <div
          ref={mainRef}
          className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_28px_-6px_rgba(15,23,42,0.1),0_0_0_1px_rgba(15,23,42,0.02)] md:mt-10"
        >
          <div
            className="h-1 bg-gradient-to-r from-blue-800 via-blue-600 to-sky-500"
            aria-hidden
          />

          <div
            className="relative border-t border-slate-100 bg-gradient-to-b from-slate-50/70 via-white to-white px-5 py-6 md:px-8 md:py-7"
            aria-labelledby="partnership-recognition-heading"
          >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-900/15"
                  aria-hidden
                >
                  <Award className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3
                    id="partnership-recognition-heading"
                    className="font-geom-heading text-lg font-normal tracking-[-0.02em] text-slate-900 mb-2"
                  >
                    Recognition & Grants
                  </h3>
                  <p className="relative text-sm leading-relaxed text-slate-700 md:text-[18px]">
                    Together, <span className={hifaiHighlightClass}>HIfAi</span>{" "}
                    and{" "}
                    <a
                      href={PARTNER_SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={kanavoogleLinkClass}
                    >
                      Kanavoogle
                    </a>{" "}
                    bridge innovation in Australia with programs that make
                    skills and human intelligence easier to see and act on. For
                    partnership context, research, and networks, visit{" "}
                    <a
                      href={PARTNER_SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={kanavoogleLinkClass}
                    >
                      {PARTNER_SITE_DISPLAY}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            <ol className="grid gap-3 sm:gap-3.5">
              {PARTNERSHIP_RECOGNITION_AWARDS.map((item) => (
                <li key={`${item.year}-${item.title}`}>
                  <div className="group/row relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.02] transition-all duration-300 hover:border-blue-200/80 hover:shadow-md hover:ring-blue-600/10 sm:p-4 md:flex md:items-start md:gap-5 md:p-5">
                    <div
                      className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-gradient-to-b from-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover/row:opacity-100"
                      aria-hidden
                    />
                    <span className="mb-2 inline-flex min-w-[3.25rem] items-center justify-center rounded-lg border border-slate-200/90 bg-slate-50 px-2 py-1 font-geom-heading text-xs font-normal tabular-nums text-slate-700 md:mb-0 md:min-h-[2.25rem] md:shrink-0">
                      {item.year}
                    </span>
                    <div className="min-w-0 flex-1 md:pt-0.5">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex flex-wrap items-center gap-1.5 text-[16px] font-semibold leading-snug text-ink no-underline transition-colors hover:text-blue-800"
                      >
                        <span className="underline-offset-[3px] group-hover/link:underline">
                          {item.title}
                        </span>
                        <ExternalLink
                          className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover/link:text-blue-600"
                          aria-hidden
                        />
                      </a>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative mt-10 border-t border-slate-200/90 pt-10 md:mt-12 md:pt-12 lg:mt-14 lg:pt-14">
          <div
            className="relative overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04),0_24px_64px_-16px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.03]"
            aria-labelledby="partnership-team-heading"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2844] to-[#143d62] px-6 py-11 md:px-10 md:py-8 lg:px-12 lg:py-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(96, 165, 250, 0.22), transparent 45%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.12), transparent 40%), radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "100% 100%, 100% 100%, 24px 24px",
                }}
              />
              <div
                className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl"
                aria-hidden
              />
              <div className="relative mx-auto max-w-4xl text-center">
                <h3
                  id="partnership-team-heading"
                  className="font-geom-heading text-[clamp(1.75rem,3.8vw,2.35rem)] font-normal leading-snug tracking-[-0.02em] text-white"
                >
                  People powering the partnership
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-300/95 md:mt-5 md:text-lg">
                  Leadership, operations, and support working together across{" "}
                  <span className="font-semibold text-sky-200">HIfAi</span> and
                  our{" "}
                  <a
                    href={PARTNER_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sky-200 underline decoration-sky-200/50 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
                  >
                    Kanavoogle
                  </a>{" "}
                  collaboration.
                </p>
              </div>
            </div>

            <div className="relative border-t border-slate-200/80 bg-gradient-to-b from-slate-100/90 via-slate-50/50 to-white px-4 py-6 md:px-6 md:py-8 lg:px-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(148, 163, 184, 0.14) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div
                ref={teamRef}
                className="relative grid gap-5 sm:gap-6 lg:grid-cols-3"
              >
                {PARTNERSHIP_TEAM_GROUPS.map((group) => {
                  const Icon = group.icon;
                  const { theme } = group;
                  return (
                    <div
                      key={group.title}
                      className="group/col flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.025] transition-shadow duration-300 hover:shadow-[0_12px_40px_-8px_rgba(15,23,42,0.12)]"
                    >
                      <div
                        className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${theme.bar}`}
                        aria-hidden
                      />
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <div className="flex items-start gap-4">
                          <span
                            className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
                            aria-hidden
                          >
                            <Icon
                              className="h-[22px] w-[22px]"
                              strokeWidth={1.65}
                            />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="font-geom-heading text-lg font-normal tracking-[-0.02em] text-slate-900 md:text-xl">
                                {group.title}
                              </p>
                              <span
                                className="font-geom-heading text-2xl font-light tabular-nums leading-none text-slate-200 md:text-[1.65rem]"
                                aria-hidden
                              >
                                {group.index}
                              </span>
                            </div>
                            <p className="mt-1.5 text-sm leading-snug text-slate-600">
                              {group.subtitle}
                            </p>
                          </div>
                        </div>

                        <ul className="mt-7 flex flex-col gap-3">
                          {group.members.map((m) => (
                            <li key={m.name}>
                              <div
                                className={`flex gap-4 rounded-xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-4 shadow-sm transition-all duration-300 md:p-[1.125rem] ${theme.cardHover}`}
                              >
                                <div
                                  className={`flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-xl border text-[10px] font-bold uppercase tracking-[0.1em] ${theme.avatar}`}
                                  aria-hidden
                                >
                                  <img
                                    src={getMemberAvatar(m)}
                                    alt=""
                                    className="h-full w-full rounded-[0.65rem] object-cover"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-[16px] font-semibold leading-snug tracking-tight text-slate-900">
                                    {m.name}
                                  </p>
                                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                    {m.role}
                                  </p>
                                  <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span
                                      className={
                                        m.orgKind === "partner" ||
                                        m.org === "HIfAi"
                                          ? "inline-flex items-center rounded-md bg-blue-600/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-800 ring-1 ring-blue-600/15"
                                          : "inline-flex items-center rounded-md bg-slate-100/90 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200/80"
                                      }
                                    >
                                      {m.org === "HIfAi" ? (
                                        <span className="text-blue-800">
                                          HIfAi
                                        </span>
                                      ) : (
                                        m.org
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowCanHiFAISection() {
  const [activeStart, setActiveStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 1024 ? 2 : 1
  );
  const viewportRef = useRef(null);
  const dragStartXRef = useRef(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 2 : 1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxStart = Math.max(0, HOW_CAN_HIFAI_SLIDES.length - itemsPerView);

  useEffect(() => {
    setActiveStart((prev) => Math.min(prev, maxStart));
  }, [maxStart]);

  const goTo = (nextStart) => {
    const clamped = Math.max(0, Math.min(nextStart, maxStart));
    setActiveStart(clamped);
  };

  const goPrev = () => goTo(activeStart - 1);
  const goNext = () => goTo(activeStart + 1);

  const onPointerDown = (event) => {
    dragStartXRef.current = event.clientX;
    setIsDragging(true);
    setDragX(0);
  };

  const onPointerMove = (event) => {
    if (!isDragging) return;
    setDragX(event.clientX - dragStartXRef.current);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    const viewportWidth = viewportRef.current?.clientWidth ?? 1;
    const swipeThreshold = viewportWidth * 0.12;

    if (dragX <= -swipeThreshold) goNext();
    else if (dragX >= swipeThreshold) goPrev();

    setIsDragging(false);
    setDragX(0);
  };

  return (
    <section
      className="relative border-t border-slate-200/80 bg-white px-4 py-10 md:px-8 md:py-12"
      aria-labelledby="how-can-hifai-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2
            id="how-can-hifai-heading"
            className="font-geom-heading text-[clamp(1.45rem,3vw,2rem)] font-normal tracking-[-0.02em] text-ink"
          >
            How can I <span className="text-blue-700">HiFAI?</span>
          </h2>
        </div>

        <div
          ref={viewportRef}
          className="mt-5 overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_18px_48px_-28px_rgba(15,23,42,0.45)]"
        >
          <div
            className={`flex touch-pan-y ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"} ${
              isDragging ? "" : "transition-transform duration-300 ease-out"
            }`}
            style={{
              transform: `translateX(calc(${-activeStart * (100 / itemsPerView)}% + ${dragX}px))`,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {HOW_CAN_HIFAI_SLIDES.map((slide) => (
              <article
                key={slide.title}
                className="shrink-0 p-2 md:p-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="h-full overflow-hidden rounded-xl shadow-[0_10px_28px_-18px_rgba(15,23,42,0.45)]">
                  <div className="relative bg-slate-950">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-44 w-full object-cover md:h-52"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" aria-hidden />
                  </div>

                  <div className="border-t border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50/45 p-4 md:p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600/90">Program</p>
                    <h3 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900 md:text-xl">{slide.title}</h3>
                    <ul className="mt-3 space-y-2.5" role="list">
                      {slide.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
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

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous slide"
            disabled={activeStart === 0}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex items-center gap-1.5" aria-hidden>
            {Array.from({ length: maxStart + 1 }).map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all ${index === activeStart ? "w-6 bg-blue-600" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next slide"
            disabled={activeStart >= maxStart}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
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
                      <span className="text-base font-medium leading-relaxed text-ink">{text}</span>
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

function WhatIsHoverCard({
  reducedMotion,
  cardRef,
  icon,
  title,
  acronym,
  body,
  footerTags,
  compact = false,
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
      const nx = ((e.clientX - r.left) / r.width) * 100;
      const ny = ((e.clientY - r.top) / r.height) * 100;

      el.style.setProperty("--x", `${nx}%`);
      el.style.setProperty("--y", `${ny}%`);

      setRX(-py * maxTilt);
      setRY(px * maxTilt);
      setY(-8);
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          left: `${nx}%`,
          top: `${ny}%`,
          opacity: 0.6,
          duration: 0.2,
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

  const shellRadius = compact ? "rounded-xl" : "rounded-[1.65rem]";
  const innerRadius = compact ? "rounded-[0.7rem]" : "rounded-[1.58rem]";

  return (
    <article ref={cardRef} className="group/card h-full perspective-[1400px]">
      <div
        className={`relative flex h-full flex-col border border-white/40 bg-white/60 backdrop-blur-md shadow-[0_8px_32px_rgba(31,38,135,0.07)] transition-all duration-700 ease-out group-hover/card:border-blue-400/50 group-hover/card:shadow-[0_20px_50px_rgba(31,38,135,0.12)] ${shellRadius}`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 100%)",
        }}
      >
        <div
          ref={innerRef}
          className={`what-is-card-inner relative flex min-h-0 flex-1 flex-col overflow-hidden transition-[box-shadow,transform] duration-700 group-hover/card:bg-white/40 ${innerRadius}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Animated Gradient Background */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/card:opacity-100 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(59,130,246,0.08),transparent_70%)]"
            aria-hidden
          />

          <div
            ref={glowRef}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[80px] opacity-0 transition-opacity duration-300 ${compact ? "h-40 w-40" : "h-60 w-60"}`}
            style={{ left: "50%", top: "50%" }}
            aria-hidden
          />

          <div
            className={`relative z-10 flex min-h-0 flex-1 flex-col ${compact ? "p-6 sm:p-7" : "h-full p-8 md:p-10"}`}
          >
            <div
              className={`flex min-h-0 flex-1 items-start ${compact ? "gap-5" : "gap-6"} `}
            >
              <div className="flex w-[4.25rem] shrink-0 justify-center sm:w-20">
                <div
                  className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)] transition-all duration-500 group-hover/card:scale-[1.06] group-hover/card:rotate-2 ${compact ? "h-12 w-12" : "h-14 w-14 sm:h-16 sm:w-16"}`}
                >
                  <div className="absolute inset-0 rounded-2xl bg-white/20 blur-[1px] opacity-0 transition-opacity group-hover/card:opacity-100" />
                  {icon}
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h3
                  className={`font-geom-heading font-normal leading-tight tracking-tight text-slate-900 transition-transform duration-500 group-hover/card:translate-x-0.5 ${compact ? "text-[1.35rem] md:text-[1.5rem]" : "text-[1.6rem] md:text-[1.85rem]"}`}
                >
                  {title}
                </h3>

                {acronym ? (
                  <p
                    className={`font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${compact ? "mt-1.5 text-xs tracking-wide" : "mt-2.5 text-sm tracking-wider"}`}
                  >
                    {acronym}
                  </p>
                ) : null}

                <p
                  className={`leading-relaxed text-slate-600 font-medium ${compact ? "mt-4 text-sm md:text-[18px]" : "mt-6 text-[16px] md:text-base"}`}
                >
                  {body}
                </p>

                {footerTags?.length ? (
                  <div
                    className={`mt-auto flex flex-wrap border-slate-200/60 ${compact ? "gap-2 border-t border-dashed pt-4" : "mt-8 gap-3 border-t pt-6"}`}
                  >
                    {footerTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg bg-slate-100/80 text-slate-600 border border-slate-200 transition-all duration-300 group-hover/card:bg-blue-50 group-hover/card:text-blue-700 group-hover/card:border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:opacity-20 transition-opacity">
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </div>
    </article>
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

const HIFAI_OFFERS_POINTS = [
  "Explore, evaluate, expand and excel in their unique skills and capabilities.",
  "With effective and novel use of Digital ABCD (AI, Blockchain, Cloud and Data) technologies.",
];

export function WhatIsHifaiSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const c0 = useRef(null);
  const c1 = useRef(null);
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
      className="relative overflow-hidden border-t border-slate-200/80 bg-white px-4 py-12 md:px-8 md:py-14"
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
          className="mx-auto mb-7 max-w-6xl text-center md:mb-9"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 md:text-sm">
            Why, what, how you can use HifAi with Us?
          </p>
          <h2
            id="what-is-hifai-heading"
            className="mt-2 font-geom-heading text-[clamp(1.65rem,4vw,2.45rem)] font-normal leading-[1.15] tracking-[-0.02em] text-ink md:mt-2.5"
          >
            Human intelligence for {" "}
            <span className="text-blue-700">
              Artificial Intelligence Control
            </span>
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-ink/65 md:text-[18px]">
            By bringing together HI & Al, we create pathways that help learners
            discover their strengths, build real skills, and move towards
            meaningful outcomes.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 md:items-stretch lg:gap-8">
          <WhatIsHoverCard
            reducedMotion={reducedMotion}
            cardRef={c0}
            compact
            icon={
              <BrainCircuit className="h-6 w-6" strokeWidth={1.5} aria-hidden />
            }
            title="21st Century Skills"
            body="At the core, we focus on creative thinking, problem solving, critical analysis, communication, and digital use - helping individuals understand how they think, respond, and grow"
          />
          <WhatIsHoverCard
            reducedMotion={reducedMotion}
            cardRef={c1}
            compact
            icon={<Orbit className="h-6 w-6" strokeWidth={1.5} aria-hidden />}
            title="Digital ABCD Model"
            body="Building on that, Al, Blockchain, Cloud, and Data Analysis create the space where these abilities are applied, explored, and shaped into real-world outcomes."
          />
        </div>

        <div
          ref={uniqueBlockRef}
          className="relative mt-12 border-t border-slate-200/80 pt-10 md:mt-14 md:pt-12"
          aria-labelledby="what-makes-unique-heading"
        >
          <div
            ref={uniqueHeaderRef}
            className="mx-auto mb-6 max-w-xl text-center md:mb-8"
          >
            <h2
              id="what-makes-unique-heading"
              className="mt-2 font-geom-heading text-[clamp(1.5rem,3.4vw,2.15rem)] font-normal leading-tight tracking-[-0.02em] text-ink md:mt-2.5"
            >
              What Makes <span className="text-blue-700">HIfAi</span> Unique?
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

        <div className="mt-10 md:mt-12">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-blue-100/80 bg-white/80 px-4 py-5 shadow-[0_16px_42px_-24px_rgba(37,99,235,0.38)] backdrop-blur-xl md:px-6 md:py-6">
            <span
              className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-blue-300/20 blur-2xl"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl"
              aria-hidden
            />

            <div className="relative mx-auto mb-5 max-w-xl text-center md:mb-6">
              <h2
                id="what-makes-unique-heading"
                className="mt-2 font-geom-heading text-[clamp(1.5rem,3.4vw,2.15rem)] font-normal leading-tight tracking-[-0.02em] text-ink md:mt-2.5"
              >
                What HIfAI offers?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/60 md:text-[18px]">
                HIfAI offers students and education institutions to:
              </p>
            </div>

            <div className="relative">
              <ul
                className="grid list-none gap-3 p-0 md:grid-cols-2 md:gap-4"
                role="list"
              >
                {HIFAI_OFFERS_POINTS.map((point, idx) => (
                  <li
                    key={point}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-200/85 bg-gradient-to-br from-white via-white to-blue-50/40 px-4 py-3.5 text-sm leading-relaxed text-slate-700 shadow-[0_8px_26px_-18px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200/85 hover:shadow-[0_16px_36px_-20px_rgba(37,99,235,0.45)] md:text-[15px]"
                  >
                    <span
                      className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-[11px] font-bold text-white shadow-[0_10px_24px_-12px_rgba(37,99,235,0.75)]"
                      aria-hidden
                    >
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
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
    image: skillDevelopmentImg,
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
    image: abcdProblemImg,
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
    image: highSchoolImg,
    inquiry: "highSchool",
    short:
      "Programs that align with college readiness and future-of-work skills.",
    description:
      "From elective pathways to capstone experiences, we help high schools offer engaging, industry-aligned learning without overloading staff.",
    bullets: [
      "Curriculum mapping support",
      "Teacher enablement workshops",
      "Students' project showcases",
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
    image: universityConsultingImg,
    inquiry: "university",
    short:
      "Innovation labs, digital transformation, and workforce-aligned programs.",
    description:
      "Partner with HIfAi to modernize offerings: micro-credentials, industry projects, and research-to-practice pipelines that Students and employers value.",
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
      className="relative py-20 image.pngmd:py-24"
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
