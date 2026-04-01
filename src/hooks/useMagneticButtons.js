import { useEffect } from "react";
import gsap from "gsap";

export default function useMagneticButtons({ reducedMotion, isMobile }) {
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const buttons = Array.from(document.querySelectorAll("[data-magnetic]"));
    if (!buttons.length) return;

    const cleanups = buttons.map((btn) => {
      const setX = gsap.quickTo(btn, "x", { duration: 0.25, ease: "power3.out" });
      const setY = gsap.quickTo(btn, "y", { duration: 0.25, ease: "power3.out" });
      const setScale = gsap.quickTo(btn, "scale", { duration: 0.25, ease: "power2.out" });

      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        setX(relX * 0.18);
        setY(relY * 0.18);
        setScale(1.03);
      };

      const onLeave = () => {
        setX(0);
        setY(0);
        setScale(1);
      };

      btn.addEventListener("pointermove", onMove);
      btn.addEventListener("pointerleave", onLeave);
      btn.addEventListener("pointercancel", onLeave);

      return () => {
        btn.removeEventListener("pointermove", onMove);
        btn.removeEventListener("pointerleave", onLeave);
        btn.removeEventListener("pointercancel", onLeave);
        gsap.set(btn, { clearProps: "transform" });
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [reducedMotion, isMobile]);
}
