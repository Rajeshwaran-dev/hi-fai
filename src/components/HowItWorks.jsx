import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger);
// DrawSVGPlugin is Club-GSAP; we use a CSS-trick fallback so the file works
// without it.  If you have a licence, un-comment the line below:
// gsap.registerPlugin(DrawSVGPlugin);

const STEPS = [
  { n: "01", title: "Learn Skills",       desc: "Structured modules across AI, data, and digital fluency." },
  { n: "02", title: "Apply Knowledge",    desc: "Hands-on labs and guided challenges every week." },
  { n: "03", title: "Solve Real Problems",desc: "Team projects modelled on industry scenarios." },
  { n: "04", title: "Grow Career",        desc: "Portfolios, credentials, and pathways that compound." },
];

export default function HowItWorks({ reducedMotion, isMobile }) {
  const sectionRef      = useRef(null);
  const headingRef      = useRef(null);
  const lineMobileRef   = useRef(null);
  const lineDesktopRef  = useRef(null);
  const mobileSteps     = useRef([]);
  const desktopSteps    = useRef([]);
  const desktopNumbers  = useRef([]);

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
      /* Heading reveal */
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

      /* ── Mobile vertical line (scrub) ── */
      if (lineM) {
        gsap.fromTo(lineM,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, ease: "none",
            scrollTrigger: { trigger: section, start: "top 60%", end: "bottom 70%", scrub: 0.7 },
          }
        );
      }

      /* ── Desktop horizontal line (scrub) ── */
      if (lineD) {
        gsap.fromTo(lineD,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1, ease: "none",
            scrollTrigger: { trigger: section, start: "top 68%", end: "bottom 52%", scrub: 1 },
          }
        );
      }

      /* ── Desktop step numbers — count up on enter ── */
      desktopNumbers.current.forEach((el, i) => {
        if (!el) return;
        const finalText = STEPS[i].n;
        const finalNum  = parseInt(finalText, 10);
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: finalNum,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.12,
          onUpdate: () => { el.textContent = String(Math.round(proxy.v)).padStart(2, "0"); },
          scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none" },
        });
      });

      /* ── Step cards stagger ── */
      allSteps.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: isMobile ? 28 : 20,
          duration: isMobile ? 0.5 : 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      /* ── Desktop number circles scale-bounce on enter ── */
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
    <section
      id="how"
      ref={sectionRef}
      className="relative px-4 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">How it works</p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-normal leading-[1.4] tracking-[-0.012em] text-ink">
            From first lesson to lasting momentum
          </h2>
        </div>

        {/* ── Mobile vertical layout ── */}
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
                ref={(el) => { mobileSteps.current[i] = el; }}
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

        {/* ── Desktop horizontal layout ── */}
        <div className="relative hidden md:block">
          {/* Connector line */}
          <div
            ref={lineDesktopRef}
            className="absolute left-8 right-8 top-[2.25rem] h-0.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
            aria-hidden
          />

          <ul className="relative grid grid-cols-4 gap-6 pt-4">
            {STEPS.map((step, i) => (
              <li
                key={`d-${step.n}`}
                ref={(el) => { desktopSteps.current[i] = el; }}
                className="flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="step-circle relative z-[1] mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-blue-400/20 bg-cream shadow-glass backdrop-blur-md">
                  {/* Pulsing ring on first step */}
                  {i === 0 && !reducedMotion && (
                    <span className="absolute inset-0 animate-ping rounded-2xl bg-blue-400/20" aria-hidden />
                  )}
                  <span
                    ref={(el) => { desktopNumbers.current[i] = el; }}
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