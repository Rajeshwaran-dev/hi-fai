import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE = "a, button, [data-magnetic], input, textarea, label, [role='button']";

export default function CustomCursor({ reducedMotion, isMobile }) {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const labelRef= useRef(null);

  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    const lbl  = labelRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xDot  = gsap.quickTo(dot,  "x", { duration: 0.12, ease: "power3.out" });
    const yDot  = gsap.quickTo(dot,  "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    const move = ({ clientX: x, clientY: y }) => {
      xDot(x); yDot(y); xRing(x); yRing(y);
    };

    /* Grow ring on click */
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.18, ease: "power2.in" });
    const onUp   = () => gsap.to(ring, { scale: 1,   duration: 0.3,  ease: "elastic.out(1, 0.5)" });

    /* Hover state — ring expands + dot dims */
    const onOver = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (!target) return;

      // Keep cursor clearly visible on light cards and inside modal dialogs.
      if (target.closest(".service-card") || target.closest("[role='dialog']")) {
        gsap.to(ring, {
          scale: 1.45,
          opacity: 1,
          borderColor: "rgba(15, 23, 42, 0.65)",
          backgroundColor: "rgba(255, 255, 255, 0.22)",
          duration: 0.22,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: 1, opacity: 1, backgroundColor: "#0f172a", duration: 0.2 });
        return;
      }

      gsap.to(ring, { scale: 1.8, opacity: 0.72, duration: 0.3, ease: "power2.out" });
      gsap.to(dot,  { scale: 0, opacity: 0, duration: 0.2 });
    };
    const onOut  = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (!target) return;
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        borderColor: "rgba(6, 182, 212, 0.6)",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        duration: 0.35,
        ease: "back.out(2)",
      });
      gsap.to(dot, { scale: 1, opacity: 1, backgroundColor: "#2563eb", duration: 0.25 });
    };

    window.addEventListener("pointermove",  move);
    window.addEventListener("pointerdown",  onDown);
    window.addEventListener("pointerup",    onUp);
    document.addEventListener("pointerover",  onOver);
    document.addEventListener("pointerout",   onOut);

    /* Hide native cursor on desktop */
    const mq = window.matchMedia("(min-width: 768px)");
    const setCursor = () => { document.body.style.cursor = mq.matches ? "none" : ""; };
    setCursor();
    mq.addEventListener("change", setCursor);

    return () => {
      window.removeEventListener("pointermove",  move);
      window.removeEventListener("pointerdown",  onDown);
      window.removeEventListener("pointerup",    onUp);
      document.removeEventListener("pointerover",  onOver);
      document.removeEventListener("pointerout",   onOut);
      mq.removeEventListener("change", setCursor);
      document.body.style.cursor = "";
    };
  }, [reducedMotion, isMobile]);

  if (reducedMotion || isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[10050] hidden md:block"
      aria-hidden
    >
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2.5 w-2.5 rounded-full bg-blue-600"
        style={{ transform: "translate(-50%,-50%)" }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-10 w-10 rounded-full border-[1.5px] border-cyan-500/60 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 backdrop-blur-[1px]"
        style={{ transform: "translate(-50%,-50%)", mixBlendMode: "normal" }}
      />
    </div>
  );
}