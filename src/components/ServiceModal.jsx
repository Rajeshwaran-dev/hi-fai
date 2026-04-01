import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ServiceModal({ open, onClose, service, reducedMotion }) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);
  const listRef    = useRef(null);

  /* ── Open animation ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!open || !overlayRef.current || !panelRef.current) return;

    const overlay = overlayRef.current;
    const panel   = panelRef.current;

    if (reducedMotion) {
      gsap.set([overlay, panel], { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.set(overlay, { opacity: 0 });
    gsap.set(panel, { opacity: 0, scale: 0.88, y: 32, rotateX: 8 });

    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .to(panel, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 0.55,
        ease: "back.out(1.4)",
        transformPerspective: 1000,
      }, "-=0.15");

    /* Stagger bullets */
    if (listRef.current) {
      const items = listRef.current.querySelectorAll("li");
      tl.from(items, {
        x: -16,
        opacity: 0,
        stagger: 0.07,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.25");
    }

    return () => tl.kill();
  }, [open, reducedMotion]);

  /* ── Close on Escape ─────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* ── Animate-out then close ──────────────────────────────────────── */
  const handleClose = () => {
    if (reducedMotion || !panelRef.current) { onClose(); return; }
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { opacity: 0, scale: 0.92, y: 20, duration: 0.3, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.15");
  };

  if (!service) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${
        open ? "pointer-events-auto" : "pointer-events-none invisible"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <button
        type="button"
        ref={overlayRef}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close dialog"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-[min(92vw,700px)] overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/95 p-6 shadow-[0_28px_80px_rgba(9,15,26,0.28)] backdrop-blur-2xl md:p-7"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-cyan to-accent" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -top-20 h-48 w-48 rounded-full bg-accent/20 blur-3xl" aria-hidden />

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/85 text-xl text-ink/55 shadow-sm transition-all duration-200 hover:bg-white hover:text-ink hover:rotate-90"
          aria-label="Close"
        >
          ×
        </button>

        {/* Tag */}
        <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-accent">Service Details</p>

        {/* Title */}
        <div className="relative z-10 mt-2 flex items-start justify-between gap-4">
          <h2
            id="modal-title"
            className="font-geom-heading text-[1.35rem] font-normal leading-[1.2] tracking-[-0.008em] text-ink md:text-[1.72rem]"
          >
            {service.title}
          </h2>
          <span className="inline-flex shrink-0 items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
            0{service.id?.replace("s", "")}
          </span>
        </div>

        {/* Description */}
        <p className="relative z-10 mt-4 leading-relaxed text-ink/75">{service.description}</p>

        {/* Bullets */}
        <ul
          ref={listRef}
          className="relative z-10 mt-6 space-y-2.5 rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/5 to-accent-cyan/6 p-4 text-sm text-ink/75"
        >
          {service.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-cyan text-[10px] font-bold text-white">
                {i + 1}
              </span>
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="relative z-10 mt-7 flex flex-wrap items-center gap-3 border-t border-accent/15 pt-5">
          <a
            href="#cta"
            onClick={handleClose}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:gap-3 hover:shadow-glow"
          >
            Join Now
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center rounded-full border border-ink/10 bg-white/85 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}