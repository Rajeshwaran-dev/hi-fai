  import { useEffect, useLayoutEffect, useRef } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import * as THREE from "three";
  import NET from "vanta/dist/vanta.net.min.js";

  gsap.registerPlugin(ScrollTrigger);

  const HEADLINE = "Human Intelligence for AI Use";
  const WORDS = HEADLINE.split(" ");

  export default function Hero({ reducedMotion, isMobile }) {
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
        scale: isMobile ? 0.85 : 1,
        scaleMobile: 0.85,
        color: 0x2563eb,
        backgroundColor: 0xfff6f6,
        points: isMobile ? 6 : 10,
        maxDistance: isMobile ? 16 : 22,
        spacing: isMobile ? 18 : 15,
        showDots: true,
      };

      try {
        vantaEffect.current = NET(opts);
      } catch {
        /* Vanta may fail if WebGL unavailable */
      }

      return () => {
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        }
      };
    }, [isMobile]);

    /**
     * Intro text: use gsap.context + revert() so React StrictMode’s double-mount
     * does not leave headline/sub/CTAs stuck at .from()’s opacity: 0 after tl.kill().
     */
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
        /* Animate the whole CTA row so both links stay in sync (no second button stuck at opacity 0). */
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
        <div
          ref={vantaRef}
          className="absolute inset-0 z-0"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-hero-mesh"
          aria-hidden
        />
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
