import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min.js";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Human Intelligence for AI Use";
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
      color2: 0x35d4ff,
      backgroundColor: 0xfbf8f8,
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
      const wordSpans = headlineRef.current?.querySelectorAll(".hero-word") ?? [];
      const sub = subRef.current;
      const cta = ctaRef.current;
      gsap.set([...wordSpans, sub, cta].filter(Boolean), { clearProps: "all" });
    };

    if (reducedMotion) {
      clearIntroTargets();
      return;
    }

    const ctx = gsap.context(() => {
      const wordSpans = headlineRef.current?.querySelectorAll(".hero-word") ?? [];
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
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-x-hidden px-4 pt-24 pb-20 md:pb-16"
    >
      <div ref={vantaRef} className="absolute inset-0 z-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-hero-mesh" aria-hidden />
      <div ref={trailLayerRef} className="pointer-events-none absolute inset-0 z-[11]" aria-hidden />
      <div
        ref={parallaxRef}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-700 shadow-sm backdrop-blur-md md:text-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
          Digital innovation services
        </p>

        <h1
          ref={headlineRef}
          data-tilt-ignore
          className="font-display text-[clamp(2.2rem,8vw,4.6rem)] font-normal leading-[1.5] tracking-[-0.015em] text-ink"
        >
          {WORDS.map((w, i) => (
            <span key={i} className="hero-word inline-block mr-[0.2em] last:mr-0">
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
          <a
            href="#services"
            data-magnetic
            className="group relative inline-flex min-h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition-[transform,box-shadow] duration-300 hover:scale-[1.04] hover:shadow-glow md:text-base"
          >
            <span className="relative z-10">Explore Services</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#cta"
            data-magnetic
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border-2 border-ink/10 bg-white/70 px-8 py-3.5 text-center text-sm font-semibold text-ink backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:bg-white hover:shadow-md md:text-base"
          >
            Get Started
          </a>
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

const SERVICE_CARDS = [
  {
    id: "s1",
    title: "21st Century Skills Development",
    image: "/skill-developement.jpg.jpeg",
    short: "Critical thinking, collaboration, and digital fluency for the modern learner.",
    description:
      "Structured pathways that build creativity, communication, and computational thinking alongside core academics-so learners stay ahead of a changing world.",
    bullets: [
      "Competency-based milestones",
      "Portfolio-ready outcomes",
      "Mentor-guided checkpoints",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    accentFrom: "from-blue-500/20",
    accentTo: "to-cyan-400/10",
  },
  {
    id: "s2",
    title: "Digital ABCD Problem Solving",
    image: "/abcd-problem-solving.jpg.jpeg",
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    accentFrom: "from-cyan-500/20",
    accentTo: "to-blue-400/10",
  },
  {
    id: "s3",
    title: "High School Solutions",
    image: "/high-school-solution.jpg.jpeg",
    inquiry: "highSchool",
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    accentFrom: "from-indigo-500/20",
    accentTo: "to-blue-400/10",
  },
  {
    id: "s4",
    title: "University Consulting Services",
    image: "/university-consulting-service.jpg.jpeg",
    inquiry: "university",
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
    accentFrom: "from-sky-500/20",
    accentTo: "to-cyan-400/10",
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
  const ok = name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
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

function SchoolInquiryForm({ variant = "light", formId, className = "", hideSubmit = false }) {
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
    const institution = validateRequiredText(fd.get("institution"), "Institution name");
    if (institution) next.institution = institution;
    const phone = validateInquiryPhone(fd.get("phone"));
    if (phone) next.phone = phone;
    const email = validateInquiryEmail(fd.get("email"));
    if (email) next.email = email;

    setErrors(next);
    if (Object.keys(next).length) {
      const order = ["firstName", "lastName", "grade", "institution", "phone", "email"];
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
            <span className="absolute left-[14%] top-[18%] h-2 w-2 rounded-full bg-accent/50" aria-hidden />
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
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <p className="font-geom-heading text-lg font-normal text-current md:text-xl">You’re in!</p>
          <p
            className={`mt-2 text-sm ${
              variant === "dark" ? "text-white/80" : variant === "surface" ? "text-slate-600" : "text-ink/70"
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
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-cyan/90">
                  {item.label}
                </p>
                <p className={`mt-1 font-semibold ${variant === "dark" ? "text-white/85" : variant === "surface" ? "text-ink" : "text-ink/85"}`}>
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
          <label htmlFor={`${formId}-fn`} className={inquiryLabelClass(variant)}>
            First name
          </label>
          <input
            id={`${formId}-fn`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-describedby={errors.firstName ? `${formId}-fn-err` : undefined}
            className={inquiryControlClass(variant, !!errors.firstName)}
            placeholder="Jane"
            onChange={() => clearErr("firstName")}
          />
          <InquiryFieldError id={`${formId}-fn-err`} message={errors.firstName} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-ln`} className={inquiryLabelClass(variant)}>
            Last name
          </label>
          <input
            id={`${formId}-ln`}
            name="lastName"
            type="text"
            autoComplete="family-name"
            aria-required="true"
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-describedby={errors.lastName ? `${formId}-ln-err` : undefined}
            className={inquiryControlClass(variant, !!errors.lastName)}
            placeholder="Doe"
            onChange={() => clearErr("lastName")}
          />
          <InquiryFieldError id={`${formId}-ln-err`} message={errors.lastName} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-grade`} className={inquiryLabelClass(variant)}>
            Grade
          </label>
          <select
            id={`${formId}-grade`}
            name="grade"
            defaultValue=""
            aria-required="true"
            aria-invalid={errors.grade ? "true" : "false"}
            aria-describedby={errors.grade ? `${formId}-grade-err` : undefined}
            className={`${inquiryControlClass(variant, !!errors.grade)} cursor-pointer`}
            onChange={() => clearErr("grade")}
          >
            {SCHOOL_GRADES.map((g) => (
              <option key={g.value || "placeholder"} value={g.value} disabled={g.value === ""}>
                {g.label}
              </option>
            ))}
          </select>
          <InquiryFieldError id={`${formId}-grade-err`} message={errors.grade} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-school`} className={inquiryLabelClass(variant)}>
            Institution name
          </label>
          <input
            id={`${formId}-school`}
            name="institution"
            type="text"
            autoComplete="organization"
            aria-required="true"
            aria-invalid={errors.institution ? "true" : "false"}
            aria-describedby={errors.institution ? `${formId}-school-err` : undefined}
            className={inquiryControlClass(variant, !!errors.institution)}
            placeholder="Your high school"
            onChange={() => clearErr("institution")}
          />
          <InquiryFieldError id={`${formId}-school-err`} message={errors.institution} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-phone`} className={inquiryLabelClass(variant)}>
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
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
            className={inquiryControlClass(variant, !!errors.phone)}
            placeholder="+1 · · · · · · · · · ·"
            onChange={() => clearErr("phone")}
          />
          <InquiryFieldError id={`${formId}-phone-err`} message={errors.phone} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-email`} className={inquiryLabelClass(variant)}>
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
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
            className={inquiryControlClass(variant, !!errors.email)}
            placeholder="you@school.edu"
            onChange={() => clearErr("email")}
          />
          <InquiryFieldError id={`${formId}-email-err`} message={errors.email} />
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

function UniversityInquiryForm({ variant = "light", formId, className = "", hideSubmit = false }) {
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
    const dept = validateRequiredText(fd.get("departmentYear"), "Department & year");
    if (dept) next.departmentYear = dept;
    const institution = validateRequiredText(fd.get("institution"), "Institution name");
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
            <span className="absolute left-[14%] top-[18%] h-2 w-2 rounded-full bg-accent/45" aria-hidden />
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
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <p className="font-geom-heading text-lg font-normal text-current md:text-xl">You’re in!</p>
          <p
            className={`mt-2 text-sm ${
              variant === "dark" ? "text-white/80" : variant === "surface" ? "text-slate-600" : "text-ink/70"
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
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-cyan/90">
                  {item.label}
                </p>
                <p className={`mt-1 font-semibold ${variant === "dark" ? "text-white/85" : variant === "surface" ? "text-ink" : "text-ink/85"}`}>
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
          <label htmlFor={`${formId}-fn`} className={inquiryLabelClass(variant)}>
            First name
          </label>
          <input
            id={`${formId}-fn`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-describedby={errors.firstName ? `${formId}-fn-err` : undefined}
            className={inquiryControlClass(variant, !!errors.firstName)}
            placeholder="Alex"
            onChange={() => clearErr("firstName")}
          />
          <InquiryFieldError id={`${formId}-fn-err`} message={errors.firstName} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-ln`} className={inquiryLabelClass(variant)}>
            Last name
          </label>
          <input
            id={`${formId}-ln`}
            name="lastName"
            type="text"
            autoComplete="family-name"
            aria-required="true"
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-describedby={errors.lastName ? `${formId}-ln-err` : undefined}
            className={inquiryControlClass(variant, !!errors.lastName)}
            placeholder="Kim"
            onChange={() => clearErr("lastName")}
          />
          <InquiryFieldError id={`${formId}-ln-err`} message={errors.lastName} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-2">
          <label htmlFor={`${formId}-dept`} className={inquiryLabelClass(variant)}>
            Department & year
          </label>
          <input
            id={`${formId}-dept`}
            name="departmentYear"
            type="text"
            aria-required="true"
            aria-invalid={errors.departmentYear ? "true" : "false"}
            aria-describedby={errors.departmentYear ? `${formId}-dept-err` : undefined}
            className={inquiryControlClass(variant, !!errors.departmentYear)}
            placeholder="e.g. Computer Science · Final year"
            onChange={() => clearErr("departmentYear")}
          />
          <InquiryFieldError id={`${formId}-dept-err`} message={errors.departmentYear} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-inst`} className={inquiryLabelClass(variant)}>
            Institution name
          </label>
          <input
            id={`${formId}-inst`}
            name="institution"
            type="text"
            autoComplete="organization"
            aria-required="true"
            aria-invalid={errors.institution ? "true" : "false"}
            aria-describedby={errors.institution ? `${formId}-inst-err` : undefined}
            className={inquiryControlClass(variant, !!errors.institution)}
            placeholder="Your university"
            onChange={() => clearErr("institution")}
          />
          <InquiryFieldError id={`${formId}-inst-err`} message={errors.institution} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-phone`} className={inquiryLabelClass(variant)}>
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
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
            className={inquiryControlClass(variant, !!errors.phone)}
            placeholder="+1 · · · · · · · · · ·"
            onChange={() => clearErr("phone")}
          />
          <InquiryFieldError id={`${formId}-phone-err`} message={errors.phone} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-email`} className={inquiryLabelClass(variant)}>
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
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
            className={inquiryControlClass(variant, !!errors.email)}
            placeholder="you@university.edu"
            onChange={() => clearErr("email")}
          />
          <InquiryFieldError id={`${formId}-email-err`} message={errors.email} />
        </div>
        <div className="inquiry-stagger-item sm:col-span-1">
          <label htmlFor={`${formId}-resume`} className={inquiryLabelClass(variant)}>
            Resume upload{" "}
            <span
              className={`font-normal ${
                variant === "surface" ? "text-slate-500" : variant === "dark" ? "text-white/55" : "text-ink/50"
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
            aria-describedby={errors.resume ? `${formId}-resume-err` : `${formId}-resume-hint`}
            className={resumeFileClass()}
            onChange={() => clearErr("resume")}
          />
          <InquiryFieldError id={`${formId}-resume-err`} message={errors.resume} />
          <p
            id={`${formId}-resume-hint`}
            className={`mt-2 text-xs leading-relaxed ${
              variant === "dark" ? "text-white/55" : variant === "surface" ? "text-slate-500" : "text-ink/50"
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
  const isInquiry = service?.inquiry === "highSchool" || service?.inquiry === "university";
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
      "-=0.15"
    );

    if (listRef.current) {
      const items = listRef.current.querySelectorAll(isInquiry ? ".inquiry-stagger-item" : "li");
      tl.from(
        items,
        {
          x: -16,
          opacity: 0,
          stagger: 0.07,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.25"
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
          isInquiry ? "w-[min(92vw,720px)] flex flex-col" : "w-[min(92vw,700px)]"
        }`}
        style={{
          transformStyle: "preserve-3d",
          height: isInquiry ? "min(92vh,860px)" : undefined,
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-cyan to-accent" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -top-20 h-48 w-48 rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/85 text-xl text-ink/55 shadow-sm transition-all duration-200 hover:bg-white hover:text-ink hover:rotate-90"
          aria-label="Close"
        >
          x
        </button>

        <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-accent">Service Details</p>
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
                  <SchoolInquiryForm key={service.id} variant="surface" formId={modalFormId} hideSubmit />
                ) : (
                  <UniversityInquiryForm key={service.id} variant="surface" formId={modalFormId} hideSubmit />
                )}
              </div>
            </div>
          ) : (
            <>
              <p className="relative z-10 mt-4 leading-relaxed text-ink/75">{service.description}</p>
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
            isInquiry ? "justify-between border-slate-200/90" : "border-accent/15"
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
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
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
              <a
                href="#cta"
                onClick={handleClose}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:gap-3 hover:shadow-glow"
              >
                Join Now
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  -
                </span>
              </a>
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

function JoinNowModal({ open, onClose, reducedMotion }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState("highSchool"); // highSchool | university

  useEffect(() => {
    if (!open || !overlayRef.current || !panelRef.current) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (reducedMotion) {
      gsap.set([overlay, panel], { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.set(overlay, { opacity: 0 });
    gsap.set(panel, { opacity: 0, scale: 0.92, y: 24 });

    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" }).to(
      panel,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.2)",
      },
      "-=0.15"
    );

    return () => tl.kill();
  }, [open, reducedMotion]);

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
      scale: 0.95,
      y: 16,
      duration: 0.3,
      ease: "power2.in",
    }).to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.2");
  };

  const formId = activeTab === "highSchool" ? "school-inquiry-join" : "university-inquiry-join";

  if (!open) return null;

  const target = typeof document !== "undefined" ? document.body : null;
  if (!target) return null;

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button
        type="button"
        ref={overlayRef}
        className="absolute inset-0 bg-ink/45 backdrop-blur-md"
        onClick={handleClose}
        aria-label="Close dialog"
      />

      <div
        ref={panelRef}
        className="relative z-10 flex h-[min(94vh,800px)] w-[min(92vw,740px)] flex-col overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/95 shadow-[0_32px_96px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent-cyan to-accent" aria-hidden />
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-xl text-ink/50 shadow-sm transition-all hover:bg-white hover:text-ink hover:rotate-90"
        >
          &times;
        </button>

        <div className="p-7 pb-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Join Now</p>
          <h2 className="mt-2 font-geom-heading text-[1.6rem] font-normal leading-tight text-ink md:text-[2.2rem]">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-2 text-sm text-ink/60">Choose your pathway and tell us more about you.</p>

          <div className="mx-auto mt-7 flex max-w-sm rounded-[1rem] bg-slate-100 p-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab("highSchool")}
              className={`flex-1 rounded-[0.7rem] py-2.5 text-sm font-semibold transition-all ${
                activeTab === "highSchool"
                  ? "bg-white text-accent shadow-sm ring-1 ring-black/5"
                  : "text-slate-500 hover:text-ink"
              }`}
            >
              High School
            </button>
            <button
              onClick={() => setActiveTab("university")}
              className={`flex-1 rounded-[0.7rem] py-2.5 text-sm font-semibold transition-all ${
                activeTab === "university"
                  ? "bg-white text-accent shadow-sm ring-1 ring-black/5"
                  : "text-slate-500 hover:text-ink"
              }`}
            >
              University
            </button>
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto px-7 pb-8 service-modal-scroll"
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:p-8">
            {activeTab === "highSchool" ? (
              <SchoolInquiryForm key="join-hs" variant="surface" formId={formId} hideSubmit />
            ) : (
              <UniversityInquiryForm key="join-uni" variant="surface" formId={formId} hideSubmit />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/50 p-6 md:flex-row md:items-center md:justify-between">
          <button
            type="submit"
            form={formId}
            className="group flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-glow-cyan md:w-auto"
          >
            Submit Application
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex min-h-[48px] items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, target);
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
      if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    };

    const onEnter = () => {
      if (iconRef.current) {
        gsap.to(iconRef.current, { scale: 1.15, rotate: -6, duration: 0.3, ease: "back.out(2)" });
      }
    };
    const onIconLeave = () => {
      if (iconRef.current) {
        gsap.to(iconRef.current, { scale: 1, rotate: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
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
      <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030b1f]/92 via-[#0a1f44]/70 to-[#071634]/36"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#020817]/90 via-[#091a36]/62 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-95" aria-hidden />

      <div
        ref={glowRef}
        className="pointer-events-none absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-300/35 to-cyan-200/30 blur-2xl opacity-0"
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
        <p className="text-sm leading-relaxed text-white/85 md:text-base">{card.short}</p>

        <div className="mt-auto flex items-center justify-between border-t border-white/25 pt-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition-all duration-300 group-hover:gap-3">
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
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { slidesPerViewRef.current = slidesPerView; }, [slidesPerView]);
  useEffect(() => { maxIndexRef.current = maxIndex; }, [maxIndex]);

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
    const enteringIndices = Array.from({ length: slidesPerView }, (_, k) => newIndex + k);
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
      { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.06 },
      "-=0.3"
    );
  };

  /* ── Touch / swipe support ── */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 48) navigateTo(delta > 0 ? currentIndex + 1 : currentIndex - 1);
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
          x: snapX, duration: 0.45, ease: "power3.out",
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
      cardRefs.current.filter(Boolean).forEach((c) => gsap.set(c, { clearProps: "all" }));
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
          scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
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
            scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none" },
          }
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
            scrollTrigger: { trigger: section, start: "top 68%", toggleActions: "play none none none" },
          }
        );
      }

      if (decorARef.current) {
        gsap.to(decorARef.current, {
          yPercent: -22,
          xPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
      if (decorBRef.current) {
        gsap.to(decorBRef.current, {
          yPercent: 16,
          xPercent: -5,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
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
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
        aria-hidden
      />
      <div
        ref={decorBRef}
        className="pointer-events-none absolute -right-20 bottom-14 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl">
        {/* ── Section heading ── */}
        <div ref={introRef} className="mb-12 max-w-2xl md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">What we offer</p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-normal leading-[1.4] tracking-[-0.012em] text-ink">
            Services built for{" "}
            <span className="relative inline-block">
              <span className="relative z-10">real outcomes</span>
              <span
                className="absolute -bottom-1 left-0 h-3 w-full rounded-md bg-gradient-to-r from-cyan-400/40 to-blue-500/40"
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
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
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
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
                  ref={(el) => { cardRefs.current[i] = el; }}
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
          <div className="mt-8 flex items-center justify-center gap-2.5" role="tablist" aria-label="Slides">
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
                    ? "w-7 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-sm"
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
  { n: "01", title: "Learn Skills", desc: "Structured modules across AI, data, and digital fluency." },
  { n: "02", title: "Apply Knowledge", desc: "Hands-on labs and guided challenges every week." },
  { n: "03", title: "Solve Real Problems", desc: "Team projects modelled on industry scenarios." },
  { n: "04", title: "Grow Career", desc: "Portfolios, credentials, and pathways that compound." },
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
    const allSteps = [...mobileSteps.current, ...desktopSteps.current].filter(Boolean);

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
          scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
        });
      }

      if (lineM) {
        gsap.fromTo(
          lineM,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 60%", end: "bottom 70%", scrub: 0.7 },
          }
        );
      }

      if (lineD) {
        gsap.fromTo(
          lineD,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 68%", end: "bottom 52%", scrub: 1 },
          }
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
          scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none" },
        });
      });

      allSteps.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: isMobile ? 28 : 20,
          duration: isMobile ? 0.5 : 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
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
          scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none" },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section id="how" ref={sectionRef} className="relative px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">How it works</p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-normal leading-[1.4] tracking-[-0.012em] text-ink">
            From first lesson to lasting momentum
          </h2>
        </div>

        <div className="relative md:hidden">
          <div
            ref={lineMobileRef}
            className="absolute left-[1.125rem] top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-600"
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
                <span className="absolute -left-[1.875rem] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-md">
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
            className="absolute left-8 right-8 top-[2.25rem] h-0.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
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
                <div className="step-circle relative z-[1] mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-blue-400/20 bg-cream shadow-glass backdrop-blur-md">
                  {i === 0 && !reducedMotion && (
                    <span className="absolute inset-0 animate-ping rounded-2xl bg-blue-400/20" aria-hidden />
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
    accent: "from-blue-600/20 to-cyan-400/10",
  },
  {
    id: "p2",
    title: "Digital Problem Labs",
    summary:
      "Teams apply the ABCD method to real scenarios, test solutions, and refine delivery through mentor feedback.",
    meta: ["48+ Project Briefs", "Team-based", "Industry-style"],
    accent: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "p3",
    title: "Institution Innovation Tracks",
    summary:
      "Schools and universities launch guided project tracks aligned with future-of-work outcomes and measurable impact.",
    meta: ["School + University", "Implementation Support", "Outcome Analytics"],
    accent: "from-indigo-500/20 to-sky-400/10",
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
    <section id="projects" ref={sectionRef} className="relative px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div ref={introRef} className="mb-12 max-w-3xl md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Projects in action</p>
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
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500" aria-hidden />
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
                <p className="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">{project.summary}</p>

                <ul className="mt-5 space-y-2 border-t border-blue-100/90 pt-4 text-sm text-ink/75">
                  {project.meta.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
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

const FEATURE_ITEMS = [
  {
    title: "Agile Learning",
    desc: "Short cycles, fast feedback, and continuous improvement baked in.",
    stat: { end: 12, suffix: "+", label: "skill modules" },
    progress: 82,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    title: "Real-world Projects",
    desc: "Ship artifacts you can show-portfolios employers actually read.",
    stat: { end: 48, suffix: "+", label: "project briefs" },
    progress: 91,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M8 12h8M8 8h8"
      />
    ),
  },
  {
    title: "AI + Blockchain + Data",
    desc: "Future-facing stacks with ethics, safety, and clarity first.",
    stat: { end: 3, suffix: "", label: "pillar tracks" },
    progress: 100,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    ),
  },
  {
    title: "Subscription-based access",
    desc: "Predictable pricing for individuals, cohorts, and institutions.",
    stat: { end: 98, suffix: "%", label: "renewal intent*" },
    progress: 98,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

function StatNumber({ end, suffix, label, reducedMotion, isMobile, triggerEl }) {
  const numRef = useRef(null);
  const barRef = useRef(null);
  const pct = FEATURE_ITEMS.find((i) => i.stat.end === end)?.progress ?? 80;

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
      onUpdate: () => {
        el.textContent = `${Math.round(proxy.v)}${suffix}`;
      },
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
      <p
        ref={numRef}
        className="font-display text-[2.2rem] font-normal leading-[2] tracking-[-0.01em] text-gradient md:text-[2.8rem]"
      >
        0{suffix}
      </p>
      <p className="mt-1 text-xs text-ink/50 md:text-sm">{label}</p>
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

function FeatureCard({ item, index, reducedMotion, isMobile }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || reducedMotion) return;

    const onEnter = () => {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 24px 48px rgba(37,99,235,0.18)",
        duration: 0.35,
        ease: "power2.out",
      });
      if (icon) gsap.to(icon, { rotate: -8, scale: 1.12, duration: 0.3, ease: "back.out(2)" });
    };
    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        duration: 0.45,
        ease: "power2.inOut",
      });
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
      <span className="pointer-events-none absolute right-4 top-2 select-none font-display text-[4rem] font-bold leading-none text-blue-500/5">
        {index + 1}
      </span>

      <div
        ref={iconRef}
        className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/15 to-cyan-500/10 text-blue-600"
      >
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

export function Features({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const decorRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);
    if (reducedMotion) {
      gsap.set(cards, { clearProps: "all" });
      return;
    }

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

      gsap.set(cards, { clipPath: "inset(0 0 100% 0 round 24px)" });
      gsap.to(cards, {
        clipPath: "inset(0 0 0% 0 round 24px)",
        duration: isMobile ? 0.55 : 0.75,
        stagger: isMobile ? 0.07 : 0.12,
        ease: "power4.inOut",
        scrollTrigger: { trigger: section, start: "top 74%", toggleActions: "play none none none" },
      });

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
          yPercent: -14,
          xPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

}

export function CTASection({ reducedMotion, isMobile }) {
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const glowRef = useRef(null);
  const glow2Ref = useRef(null);
  const contentRef = useRef(null);
  const btnRef = useRef(null);
  const shimmerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { clipPath: "inset(8% 4% 8% 4% round 2rem)", opacity: 0.6, y: 40 },
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
          }
        );
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: isMobile ? 18 : 30,
          opacity: 0,
          stagger: 0.14,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", toggleActions: "play none none none" },
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: isMobile ? 1.06 : 1.14,
          opacity: isMobile ? 0.55 : 0.7,
          duration: isMobile ? 2.8 : 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (glow2Ref.current) {
        gsap.to(glow2Ref.current, {
          scale: 1.1,
          opacity: 0.45,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }

      gsap.to(section, {
        y: isMobile ? 0 : -12,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || reducedMotion) return;

    const STRENGTH = 0.3;
    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      gsap.to(btn, {
        x: (e.clientX - cx) * STRENGTH,
        y: (e.clientY - cy) * STRENGTH,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });

    const onEnter = () => {
      gsap.to(btn, { scale: 1.07, duration: 0.3, ease: "back.out(2)" });
      if (shimmerRef.current) {
        gsap.fromTo(
          shimmerRef.current,
          { x: "-120%", skewX: -12 },
          { x: "140%", skewX: -12, duration: 0.55, ease: "power2.inOut" }
        );
      }
    };
    const onOut = () => gsap.to(btn, { scale: 1, duration: 0.4, ease: "power2.out" });

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onOut);

    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onOut);
    };
  }, [reducedMotion]);

  return (
    <section id="cta" ref={sectionRef} className="relative px-4 py-20 md:px-8 md:py-24">
      <div
        ref={panelRef}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-ink via-accent to-accent-cyan px-8 py-16 text-center shadow-2xl md:px-16 md:py-20"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute -left-1/4 -top-1/2 h-[120%] w-[80%] rounded-full bg-accent-cyan/30 blur-3xl"
          aria-hidden
        />
        <div
          ref={glow2Ref}
          className="pointer-events-none absolute -right-1/4 bottom-0 h-2/3 w-2/3 rounded-full bg-accent/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        <div ref={contentRef} className="relative z-10 flex flex-col items-center">
          <h2 className="font-geom-heading text-[clamp(1.9rem,4.8vw,3.2rem)] font-normal leading-[1.4] tracking-[-0.012em] text-white">
            Start Your Future with HIFAI
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 md:text-lg">
            Join a platform where human insight and AI literacy move together-built for ambitious
            learners and forward-looking institutions.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["12+ Modules", "48+ Projects", "98% Renewal"].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          <button
            ref={btnRef}
            onClick={() => setShowModal(true)}
            className="relative mt-10 inline-flex overflow-hidden rounded-full bg-white px-10 py-4 text-base font-bold text-ink shadow-lg md:text-lg"
          >
            <span
              ref={shimmerRef}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
              style={{ left: "-50%" }}
              aria-hidden
            />
            <span className="relative z-10 flex items-center gap-2">
              Join Now
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>

          <p className="mt-4 text-xs text-white/50">No account needed - Free to explore</p>
        </div>
      </div>

      <JoinNowModal
        open={showModal}
        onClose={() => setShowModal(false)}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}