import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection({ reducedMotion, isMobile }) {
  const sectionRef  = useRef(null);
  const panelRef    = useRef(null);
  const glowRef     = useRef(null);
  const glow2Ref    = useRef(null);
  const contentRef  = useRef(null);
  const btnRef      = useRef(null);
  const shimmerRef  = useRef(null);

  /* ── Scroll-driven panel reveal ─────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      /* Panel wipe up */
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

      /* Content stagger */
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

      /* Ambient glow pulse — primary */
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

      /* Secondary glow counter-pulse */
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

      /* Subtle parallax on scroll out */
      gsap.to(section, {
        y: isMobile ? 0 : -12,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  /* ── Magnetic CTA button ─────────────────────────────────────────── */
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || reducedMotion) return;

    const STRENGTH = 0.3;
    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      gsap.to(btn, {
        x: (e.clientX - cx) * STRENGTH,
        y: (e.clientY - cy) * STRENGTH,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onLeave = () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });

    const onEnter = () => {
      gsap.to(btn, { scale: 1.07, duration: 0.3, ease: "back.out(2)" });
      /* Shimmer sweep */
      if (shimmerRef.current) {
        gsap.fromTo(
          shimmerRef.current,
          { x: "-120%", skewX: -12 },
          { x: "140%",  skewX: -12, duration: 0.55, ease: "power2.inOut" }
        );
      }
    };
    const onOut = () =>
      gsap.to(btn, { scale: 1, duration: 0.4, ease: "power2.out" });

    btn.addEventListener("mousemove",  onMove);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onOut);

    return () => {
      btn.removeEventListener("mousemove",  onMove);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onOut);
    };
  }, [reducedMotion]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative px-4 py-20 md:px-8 md:py-24"
    >
      <div
        ref={panelRef}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-ink via-accent to-accent-cyan px-8 py-16 text-center shadow-2xl md:px-16 md:py-20"
      >
        {/* Primary glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute -left-1/4 -top-1/2 h-[120%] w-[80%] rounded-full bg-accent-cyan/30 blur-3xl"
          aria-hidden
        />
        {/* Secondary glow */}
        <div
          ref={glow2Ref}
          className="pointer-events-none absolute -right-1/4 bottom-0 h-2/3 w-2/3 rounded-full bg-accent/25 blur-3xl"
          aria-hidden
        />
        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          aria-hidden
        />

        <div ref={contentRef} className="relative z-10 flex flex-col items-center">
          <h2 className="font-geom-heading text-[clamp(1.9rem,4.8vw,3.2rem)] font-normal leading-[1.4] tracking-[-0.012em] text-white">
            Start Your Future with HIFAI
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 md:text-lg">
            Join a platform where human insight and AI literacy move together—built for ambitious
            learners and forward-looking institutions.
          </p>

          {/* Trust badges */}
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

          {/* CTA button — magnetic */}
          <a
            ref={btnRef}
            href="mailto:hello@hifai.skills"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          <p className="mt-4 text-xs text-white/50">No account needed · Free to explore</p>
        </div>
      </div>
    </section>
  );
}