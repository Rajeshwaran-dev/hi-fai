import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function useSmoothAnchorScroll({ offsetY = 90, reducedMotion }) {
  useEffect(() => {
    if (reducedMotion) return;

    const onClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;

      const raw = link.getAttribute("href");
      if (!raw || raw === "#") return;
      const id = raw.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      gsap.to(window, {
        duration: 1,
        ease: "power3.out",
        scrollTo: { y: el, offsetY },
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [offsetY, reducedMotion]);
}
