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

}