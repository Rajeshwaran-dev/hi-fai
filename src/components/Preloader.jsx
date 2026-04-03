import { useEffect, useRef } from "react";
import gsap from "gsap";

const LOGO_SRC = "/logo-1.png";

/** Minimum time (ms) preloader stays before exit can begin — ships with full page load wait. */
const MIN_VISIBLE_MS = 1500;

function waitForWindowLoad() {
  if (typeof window === "undefined") return Promise.resolve();
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", resolve, { once: true });
  });
}

export default function Preloader({ onComplete, reducedMotion = false }) {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const glowLeftRef = useRef(null);
  const glowRightRef = useRef(null);
  const logoWrapRef = useRef(null);
  const exitTlRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const grid = gridRef.current;
    const glowL = glowLeftRef.current;
    const glowR = glowRightRef.current;
    const logoWrap = logoWrapRef.current;
    if (!root || !grid || !glowL || !glowR || !logoWrap) return;

    let cancelled = false;
    const loadP = waitForWindowLoad();
    const minP = new Promise((r) => setTimeout(r, MIN_VISIBLE_MS));

    const finishExit = () => {
      if (cancelled || !onComplete) return;
      onComplete();
    };

    const runExit = () => {
      if (cancelled) return;
      exitTlRef.current?.kill();
      const exit = gsap.timeline({ onComplete: finishExit });
      exitTlRef.current = exit;
      exit
        .to(
          logoWrap,
          {
            autoAlpha: 0,
            y: -12,
            scale: 1.03,
            duration: 0.48,
            ease: "power2.inOut",
          },
          0
        )
        .to(grid, { opacity: 0, duration: 0.44, ease: "power2.inOut" }, 0.04)
        .to(
          [glowL, glowR],
          { opacity: 0, scale: 1.04, duration: 0.46, ease: "power2.inOut", stagger: 0.03 },
          0.03
        )
        .to(root, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }, 0.18);
    };

    const afterIntroWaitAndExit = () => {
      Promise.all([loadP, minP]).then(() => {
        if (cancelled) return;
        runExit();
      });
    };

    if (reducedMotion) {
      const intro = gsap.timeline({
        onComplete: afterIntroWaitAndExit,
      });
      intro
        .set(root, { autoAlpha: 1 })
        .set(logoWrap, { y: 0, scale: 1 })
        .to(grid, { opacity: 0.2, duration: 0.32, ease: "power1.out" }, 0)
        .to([glowL, glowR], { opacity: 1, duration: 0.32, ease: "power1.out" }, 0)
        .fromTo(
          logoWrap,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.38, ease: "power1.out" },
          0.04
        );
      return () => {
        cancelled = true;
        intro.kill();
        exitTlRef.current?.kill();
      };
    }

    const easeIntro = "power3.out";

    const intro = gsap.timeline({
      defaults: { ease: easeIntro },
      onComplete: afterIntroWaitAndExit,
    });

    intro
      .set(root, { autoAlpha: 1 })
      .set(grid, { opacity: 0 })
      .set([glowL, glowR], { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" })
      .set(logoWrap, { autoAlpha: 0, y: 22, scale: 0.94, force3D: true })
      .to(grid, { opacity: 0.2, duration: 0.55, ease: easeIntro }, 0)
      .to(glowL, { opacity: 1, scale: 1, duration: 0.62, ease: easeIntro }, 0.06)
      .to(glowR, { opacity: 1, scale: 1, duration: 0.62, ease: easeIntro }, 0.12)
      .to(
        logoWrap,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.58,
          ease: easeIntro,
        },
        0.1
      )
      .to(logoWrap, { scale: 1.012, duration: 0.34, ease: "sine.out" }, "-=0.22")
      .to(logoWrap, { scale: 1, duration: 0.38, ease: "sine.inOut" });

    return () => {
      cancelled = true;
      intro.kill();
      exitTlRef.current?.kill();
    };
  }, [onComplete, reducedMotion]);

  return (
    <div ref={rootRef} className="preloader-root" aria-hidden>
      <div ref={gridRef} className="preloader-grid" />
      <div ref={glowLeftRef} className="preloader-glow preloader-glow-left" />
      <div ref={glowRightRef} className="preloader-glow preloader-glow-right" />
      <div className="preloader-stage preloader-stage--logo">
        <div ref={logoWrapRef} className="preloader-logo-wrap">
          <img
            src={LOGO_SRC}
            alt=""
            className="preloader-logo"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

/*
ARCHIVED — high-five preloader (HumanHandSVG + GSAP). Comment terminators inside this block were changed to '* /' in the archived copy so the outer block comment stays valid.

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

/**
 * Realistic open palm (high-five pose). `partner` uses a slightly warmer skin
 * tone so the two hands read as two people; IDs are unique per instance.
 * /
function HumanHandSVG({ partner = false }) {
  const uid = useId().replace(/:/g, "");
  const g = (n) => `ph-${uid}-${n}`;

  const skin = partner
    ? { a: "#fff8f4", b: "#f0e6df", c: "#e0d2c8" }
    : { a: "#fffefb", b: "#f0f4fb", c: "#dde6f4" };
  const tip = partner
    ? { a: "#faf3ee", b: "#e2d5ce" }
    : { a: "#f3f8ff", b: "#d4e2f8" };
  const thumb = partner
    ? { a: "#faf5f0", b: "#e4dad3" }
    : { a: "#f8fbff", b: "#d7e5fb" };
  const palmHL = partner
    ? { core: "rgba(255,255,255,0.78)", edge: "rgba(210,180,160,0)" }
    : { core: "rgba(255,255,255,0.85)", edge: "rgba(185,210,255,0)" };
  const nail = partner
    ? { a: "#fffefb", b: "#f0e8e2", c: "#ddd3cc" }
    : { a: "#ffffff", b: "#eef4ff", c: "#d3e1f7" };
  const knuckle = partner ? "rgba(195,120,95,0.42)" : "rgba(240,165,100,0.45)";

  return (
    <svg
      viewBox="0 0 160 260"
      className="preloader-hand-svg"
      role="presentation"
      aria-hidden
      overflow="visible"
      style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.55))" }}
    >
      <defs>
        <linearGradient id={g("skin")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={skin.a} />
          <stop offset="52%" stopColor={skin.b} />
          <stop offset="100%" stopColor={skin.c} />
        </linearGradient>
        <linearGradient id={g("tip")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={tip.a} />
          <stop offset="100%" stopColor={tip.b} />
        </linearGradient>
        <radialGradient id={g("palmHL")} cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor={palmHL.core} />
          <stop offset="100%" stopColor={palmHL.edge} />
        </radialGradient>
        <linearGradient id={g("thumb")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={thumb.a} />
          <stop offset="100%" stopColor={thumb.b} />
        </linearGradient>
        <radialGradient id={g("ao")} cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="rgba(8,30,70,0.24)" />
          <stop offset="100%" stopColor="rgba(8,30,70,0)" />
        </radialGradient>
        <linearGradient id={g("nail")} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={nail.a} />
          <stop offset="60%" stopColor={nail.b} />
          <stop offset="100%" stopColor={nail.c} />
        </linearGradient>
        <filter id={g("shadow")} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(100,40,10,0.4)" />
        </filter>
      </defs>

      <path
        d="M28 210 C24 218 22 232 24 248 C26 258 134 258 136 248 C138 232 136 218 132 210 Z"
        fill={`url(#${g("skin")})`}
      />
      <path d="M30 218 Q80 224 130 218" fill="none" stroke="rgba(33,73,130,0.22)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M28 228 Q80 234 132 228" fill="none" stroke="rgba(33,73,130,0.14)" strokeWidth="1.0" strokeLinecap="round" />

      <path
        d="M22 85 C20 75 24 68 32 66 L128 66 C136 66 140 73 140 83 L140 212 C140 220 134 226 126 226 L34 226 C26 226 20 220 20 212 Z"
        fill={`url(#${g("skin")})`}
        filter={`url(#${g("shadow")})`}
      />
      <ellipse cx="80" cy="220" rx="62" ry="12" fill={`url(#${g("ao")})`} />
      <ellipse cx="72" cy="145" rx="40" ry="55" fill={`url(#${g("palmHL")})`} />

      <path
        d="M22 125
           C14 118 4 118 2 128
           C0 140 4 155 12 160
           C20 165 28 160 30 150
           L32 125 Z"
        fill={`url(#${g("thumb")})`}
        stroke="rgba(33,73,130,0.2)"
        strokeWidth="0.8"
      />
      <path d="M6 138 Q18 143 30 137" fill="none" stroke="rgba(33,73,130,0.28)" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="8" cy="128" rx="6" ry="7.5" fill={`url(#${g("nail")})`} stroke="rgba(54,98,160,0.24)" strokeWidth="0.6" />
      <ellipse cx="7" cy="126" rx="4" ry="5" fill="rgba(255,245,235,0.6)" />

      <path
        d="M42 66 Q52 58 62 56 Q72 54 82 54 Q96 54 106 57 Q116 60 126 66"
        fill="none"
        stroke="rgba(33,73,130,0.14)"
        strokeWidth="1"
      />

      <g filter={`url(#${g("shadow")})`}>
        <path
          d="M38 68
             C37 52 36 34 37 18
             C38 9  43 4  50 4
             C57 4  62 9  63 18
             C64 34 63 52 62 68 Z"
          fill={`url(#${g("skin")})`}
          stroke="rgba(33,73,130,0.16)"
          strokeWidth="0.8"
        />
        <path d="M38 44 Q50 49 62 44" fill="none" stroke="rgba(33,73,130,0.26)" strokeWidth="1" strokeLinecap="round" />
        <path d="M38 57 Q50 61 62 57" fill="none" stroke="rgba(33,73,130,0.18)" strokeWidth="0.9" strokeLinecap="round" />
        <ellipse cx="50" cy="7" rx="13" ry="7" fill={`url(#${g("tip")})`} />
        <rect x="43" y="4" width="14" height="10" rx="7" fill={`url(#${g("nail")})`} stroke="rgba(54,98,160,0.22)" strokeWidth="0.5" />
        <rect x="44.5" y="4.5" width="11" height="7" rx="5.5" fill="rgba(255,245,235,0.55)" />
      </g>

      <g filter={`url(#${g("shadow")})`}>
        <path
          d="M62 68
             C61 46 60 22 61 8
             C62 -2 67 -8 75 -8
             C83 -8 88 -2 89 8
             C90 22 89 46 88 68 Z"
          fill={`url(#${g("skin")})`}
          stroke="rgba(33,73,130,0.16)"
          strokeWidth="0.8"
        />
        <path d="M62 40 Q75 45 88 40" fill="none" stroke="rgba(33,73,130,0.26)" strokeWidth="1" strokeLinecap="round" />
        <path d="M62 56 Q75 60 88 56" fill="none" stroke="rgba(33,73,130,0.18)" strokeWidth="0.9" strokeLinecap="round" />
        <ellipse cx="75" cy="-2" rx="14" ry="7.5" fill={`url(#${g("tip")})`} />
        <rect x="68" y="-7" width="15" height="11" rx="7.5" fill={`url(#${g("nail")})`} stroke="rgba(54,98,160,0.22)" strokeWidth="0.5" />
        <rect x="69.5" y="-6" width="12" height="8" rx="6" fill="rgba(255,245,235,0.55)" />
      </g>

      <g filter={`url(#${g("shadow")})`}>
        <path
          d="M88 68
             C87 50 86 30 87 17
             C88 8  93 3  100 3
             C107 3 112 8  113 17
             C114 30 113 50 112 68 Z"
          fill={`url(#${g("skin")})`}
          stroke="rgba(33,73,130,0.16)"
          strokeWidth="0.8"
        />
        <path d="M88 42 Q100 47 112 42" fill="none" stroke="rgba(33,73,130,0.26)" strokeWidth="1" strokeLinecap="round" />
        <path d="M88 57 Q100 61 112 57" fill="none" stroke="rgba(33,73,130,0.18)" strokeWidth="0.9" strokeLinecap="round" />
        <ellipse cx="100" cy="6" rx="13" ry="7" fill={`url(#${g("tip")})`} />
        <rect x="93" y="2" width="14" height="10" rx="7" fill={`url(#${g("nail")})`} stroke="rgba(54,98,160,0.22)" strokeWidth="0.5" />
        <rect x="94.5" y="3" width="11" height="7" rx="5.5" fill="rgba(255,245,235,0.55)" />
      </g>

      <g filter={`url(#${g("shadow")})`}>
        <path
          d="M112 68
             C111 54 110 38 111 28
             C112 20 116 16 122 16
             C128 16 132 20 133 28
             C134 38 133 54 132 68 Z"
          fill={`url(#${g("skin")})`}
          stroke="rgba(33,73,130,0.16)"
          strokeWidth="0.8"
        />
        <path d="M112 49 Q122 53 132 49" fill="none" stroke="rgba(33,73,130,0.26)" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M112 61 Q122 64 132 61" fill="none" stroke="rgba(33,73,130,0.18)" strokeWidth="0.8" strokeLinecap="round" />
        <ellipse cx="122" cy="19" rx="11" ry="6" fill={`url(#${g("tip")})`} />
        <rect x="116" y="15" width="12" height="9" rx="6" fill={`url(#${g("nail")})`} stroke="rgba(54,98,160,0.22)" strokeWidth="0.5" />
        <rect x="117" y="16" width="10" height="6.5" rx="5" fill="rgba(255,245,235,0.55)" />
      </g>

      <path d="M24 115 C50 122 110 122 138 115" fill="none" stroke="rgba(33,73,130,0.2)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M22 148 C50 156 110 156 138 148" fill="none" stroke="rgba(33,73,130,0.14)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M24 182 C50 188 110 188 136 182" fill="none" stroke="rgba(33,73,130,0.1)" strokeWidth="1.0" strokeLinecap="round" />
      <path d="M30 105 Q56 135 45 185" fill="none" stroke="rgba(33,73,130,0.13)" strokeWidth="1" strokeLinecap="round" />

      <ellipse cx="50" cy="69" rx="10" ry="5.5" fill={knuckle} />
      <ellipse cx="75" cy="69" rx="10" ry="5.5" fill={knuckle} />
      <ellipse cx="100" cy="69" rx="10" ry="5.5" fill={knuckle} />
      <ellipse cx="122" cy="69" rx="9" ry="5" fill={knuckle} />

      <path
        d="M38 70 C36 120 36 170 38 210 Q44 215 50 210 C48 170 48 120 50 70 Z"
        fill="rgba(255,245,230,0.18)"
      />
    </svg>
  );
}

export default function Preloader({ onComplete, reducedMotion = false }) {
  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const impactRef = useRef(null);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const impact = impactRef.current;
    const ripples = ripplesRef.current.filter(Boolean);
    if (!root || !left || !right || !impact) return;

    if (reducedMotion) {
      const q = gsap.to(root, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.2,
        onComplete,
      });
      return () => q.kill();
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete });

    tl.set(root, { autoAlpha: 1 })
      .set(left, {
        x: -240,
        y: 28,
        rotate: -11,
        autoAlpha: 0,
        transformOrigin: "70% 80%",
      })
      .set(right, {
        x: 240,
        y: 28,
        rotate: 11,
        autoAlpha: 0,
        transformOrigin: "30% 80%",
      })
      .set(impact, { autoAlpha: 0, scale: 0 })
      .set(ripples, { autoAlpha: 0, scale: 0 })

      .to([left, right], { autoAlpha: 1, duration: 0.32, ease: "power2.out" })

      /* Approach: slight inward arc toward center (high-five) * /
      .to(
        left,
        { x: -10, y: 4, rotate: -5, duration: 0.95, ease: "power2.inOut" },
        "<0.05"
      )
      .to(right, { x: 10, y: 4, rotate: 5, duration: 0.95, ease: "power2.inOut" }, "<")

      /* Brief wind-up * /
      .to(left, { x: -22, y: 6, rotate: -6, duration: 0.2, ease: "sine.inOut" })
      .to(right, { x: 22, y: 6, rotate: 6, duration: 0.2, ease: "sine.inOut" }, "<")

      /* Contact * /
      .to([left, right], { x: 0, y: 0, rotate: 0, duration: 0.16, ease: "power2.in" })

      /* Soft cyan/white contact pulse (not a solid “orb”) * /
      .to(impact, { autoAlpha: 1, scale: 1.15, duration: 0.1, ease: "power2.out" }, "-=0.06")
      .to(ripples, { autoAlpha: 0.85, scale: 1, duration: 0.22, ease: "power2.out", stagger: 0.07 }, "<")

      .to(impact, { autoAlpha: 0, scale: 3.2, duration: 0.5, ease: "power2.out" })
      .to(ripples, { autoAlpha: 0, scale: 4.2, duration: 0.55, ease: "power2.out", stagger: 0.08 }, "<")

      .to(left, { x: -14, rotate: -4, duration: 0.24, ease: "power2.out" }, "<0.35")
      .to(right, { x: 14, rotate: 4, duration: 0.24, ease: "power2.out" }, "<")
      .to([left, right], { x: 0, rotate: 0, duration: 0.5, ease: "elastic.out(1,0.65)" })

      .to({}, { duration: 0.45 })

      .to(left, { x: -220, autoAlpha: 0, rotate: -8, duration: 0.52, ease: "power3.in" })
      .to(right, { x: 220, autoAlpha: 0, rotate: 8, duration: 0.52, ease: "power3.in" }, "<")
      .to(root, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, "<0.22");

    return () => tl.kill();
  }, [onComplete, reducedMotion]);

  return (
    <div ref={rootRef} className="preloader-root" aria-hidden>
      <div className="preloader-grid" />
      <div className="preloader-glow preloader-glow-left" />
      <div className="preloader-glow preloader-glow-right" />

      <div className="preloader-stage">
        <div ref={leftRef} className="preloader-hand-wrap preloader-hand-left">
          <HumanHandSVG />
        </div>

        <div ref={impactRef} className="preloader-impact" />
        <div ref={(el) => (ripplesRef.current[0] = el)} className="preloader-ripple preloader-ripple-1" />
        <div ref={(el) => (ripplesRef.current[1] = el)} className="preloader-ripple preloader-ripple-2" />
        <div ref={(el) => (ripplesRef.current[2] = el)} className="preloader-ripple preloader-ripple-3" />

        <div ref={rightRef} className="preloader-hand-wrap preloader-hand-right preloader-hand-flip">
          <HumanHandSVG partner />
        </div>
      </div>
    </div>
  );
}

*/
