import { useEffect } from "react";
import gsap from "gsap";

const CARD_SELECTOR = "[data-tilt-card]";
const IGNORE_SELECTOR = "h1, h2, h3, h4, h5, h6, [data-tilt-ignore]";

export default function useCardTilt({ reducedMotion, isMobile }) {
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
    if (!cards.length) return;

    const cleanups = cards.map((card) => {
      const setRX = gsap.quickTo(card, "rotationX", { duration: 0.28, ease: "power3.out" });
      const setRY = gsap.quickTo(card, "rotationY", { duration: 0.28, ease: "power3.out" });
      const setY = gsap.quickTo(card, "y", { duration: 0.28, ease: "power3.out" });
      const setScale = gsap.quickTo(card, "scale", { duration: 0.28, ease: "power3.out" });

      gsap.set(card, {
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
      });

      const onMove = (e) => {
        if (e.target instanceof Element && e.target.closest(IGNORE_SELECTOR)) return;

        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 12;
        const rotateX = (0.5 - py) * 10;
        setRX(rotateX);
        setRY(rotateY);
        setY(-4);
        setScale(1.015);
      };

      const onLeave = () => {
        setRX(0);
        setRY(0);
        setY(0);
        setScale(1);
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("pointercancel", onLeave);

      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        card.removeEventListener("pointercancel", onLeave);
        gsap.set(card, { clearProps: "transform,transformStyle,transformPerspective,willChange" });
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [reducedMotion, isMobile]);
}
