import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenisInstance } from "../hooks/Usesmoothscroll.js";

/**
 * Resets scroll on client-side route changes. Lenis (home only) is synced when active;
 * otherwise native window/document scroll is cleared.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        const lenis = getLenisInstance();
        if (lenis) lenis.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }, 0);
      return () => clearTimeout(t);
    }

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
}
