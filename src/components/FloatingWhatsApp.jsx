import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const fabBase =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:h-12 md:w-12";

export default function FloatingWhatsApp() {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show after scrolling past the top hero (home + subpages use #hero).
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setShowBackToTop(window.scrollY > 320);
        return;
      }
      setShowBackToTop(hero.getBoundingClientRect().bottom <= 0);
    };

    let rafId = 0;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [location.pathname]);

  return (
    <div
      className="fixed bottom-8 right-3 z-[135] md:bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] md:right-8"
    >
      {showBackToTop && (
        <a
          href="#hero"
          aria-label="Back to top"
          className={`${fabBase} border border-white/15 bg-ink/70 text-accent-cyan shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:border-accent/40 hover:bg-ink/85 focus-visible:ring-accent/60`}
        >
          <svg
            className="h-5 w-5 md:h-6 md:w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}
