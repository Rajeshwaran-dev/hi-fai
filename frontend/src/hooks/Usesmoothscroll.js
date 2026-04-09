import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/** Active Lenis instance while the home route has mounted smooth scroll (null otherwise). */
export function getLenisInstance() {
  return lenisInstance;
}

/**
 * useSmoothScroll
 * ----------------
 * Initialises Lenis smooth-scroll and wires it into GSAP's ticker so
 * every ScrollTrigger reacts to the lerped scroll position, not the
 * native scroll position.  Returns the lenis instance so callers can
 * scroll-to programmatically if needed.
 *
 * Usage (App root):
 *   const lenis = useSmoothScroll();
 */
export default function useSmoothScroll(reducedMotion = false) {
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.95,
    });

    lenisInstance = lenis;

    // Keep GSAP ScrollTrigger in sync
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);

    // Anchor-link smooth scroll
    const handleAnchor = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", handleAnchor);

    return () => {
      gsap.ticker.remove(tickerCb);
      document.removeEventListener("click", handleAnchor);
      lenisInstance = null;
      lenis.destroy();
    };
  }, [reducedMotion]);
}