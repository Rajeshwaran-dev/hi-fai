import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import InnerPageLink from "../components/InnerPageLink.jsx";
import enThiranDemoSrc from "../assets/videos/enthiran.mp4?url";
import { GetStartedFormModal } from "./GetStarted.jsx";

// ─── Inject CSS keyframes once ────────────────────────────────────────────────
// Pure-CSS continuous spin — no JS timers, no pauses, perfectly smooth.

const SPIN_DURATION = 12; // seconds for one full orbit revolution

function injectOrbitStyles() {
  if (document.getElementById("orbit-keyframes")) return;
  const el = document.createElement("style");
  el.id = "orbit-keyframes";
  el.textContent = `
    @keyframes orbit-ring    { to { transform: rotate(360deg);  } }
    @keyframes orbit-counter { to { transform: rotate(-360deg); } }
    @keyframes center-spin   { to { transform: rotate(360deg);  } }
  `;
  document.head.appendChild(el);
}

// ─── Center play trigger ──────────────────────────────────────────────────────

function CenterPlayTrigger({ onClick }) {
  const textPathId = useId();

  return (
    <div style={{ position: "relative", display: "inline-flex", width: 128, height: 128, alignItems: "center", justifyContent: "center" }}>
      {/* Spinning text ring */}
      <svg
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "rgba(29,78,216,0.8)",
          animation: `center-spin 10s linear infinite`,
        }}
        viewBox="0 0 100 100"
        aria-hidden
      >
        <defs>
          <path id={textPathId} d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text fill="currentColor" style={{ fontSize: "8.5px", fontWeight: 600, letterSpacing: "1.6px" }}>
          <textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
            CHECKOUT ENTHIRAN APP ✦
          </textPath>
        </text>
      </svg>

      {/* Play button */}
      <button
        type="button"
        onClick={onClick}
        style={{
          position: "relative",
          zIndex: 10,
          display: "inline-flex",
          width: 80,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2.5px solid rgba(147,197,253,0.9)",
          background: "#fff",
          cursor: "pointer",
          boxShadow: "0 16px 40px rgba(15,23,42,0.18)",
          transition: "transform 0.2s, box-shadow 0.2s",
          outline: "none",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        aria-label="Play En-Thiran demo video"
      >
        <span
          style={{
            display: "inline-flex",
            width: 56,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1483ff, #21b9ff)",
            boxShadow: "0 6px 20px rgba(20,131,255,0.45)",
          }}
        >
          <Play style={{ width: 22, height: 22, marginLeft: 3, color: "#fff" }} fill="currentColor" />
        </span>
      </button>
    </div>
  );
}

// ─── Video modal ──────────────────────────────────────────────────────────────

function SchoolStudentVideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const el = videoRef.current;
    if (!el) return;
    const p = el.play();
    if (p !== undefined) p.catch(() => {});
    return () => { el.pause(); el.currentTime = 0; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex min-h-[100dvh] w-full items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="dialog" aria-modal="true" aria-label="En-Thiran demo video"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[360px]" onClick={(e) => e.stopPropagation()}>
        <button
          type="button" onClick={onClose}
          className="absolute -right-2 -top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
          aria-label="Close video popup"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative w-full drop-shadow-[0_28px_60px_rgba(15,23,42,0.4)]">
          <div className="pointer-events-none absolute -inset-3 rounded-[2.75rem] bg-gradient-to-b from-blue-400/15 via-transparent to-cyan-400/10 blur-xl" aria-hidden />
          <div className="relative rounded-[2.4rem] border-[11px] border-slate-800 bg-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
            <div className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[1.65rem] bg-black">
              <div className="absolute left-1/2 top-2.5 z-10 h-5 w-[4.5rem] -translate-x-1/2 rounded-full bg-black/55 ring-1 ring-white/10" aria-hidden />
              <video
                ref={videoRef} className="h-full w-full object-cover"
                src={enThiranDemoSrc} controls playsInline preload="metadata"
                onError={() => setVideoError(true)}
              />
              {videoError && (
                <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-2 bg-slate-900 p-4 text-center text-xs text-white/80">
                  <p className="font-semibold text-white">Video unavailable</p>
                  <p className="text-white/70">Add <code className="rounded bg-white/10 px-1">src/assets/videos/enthiran.mp4</code> and refresh.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Card data ────────────────────────────────────────────────────────────────

const CARD_ICONS = [
  ({ style }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  ({ style }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  ),
  ({ style }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  ({ style }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
];

const CARDS = [
  {
    label: "Explore",
    copy: "Get a glimpse of your true potential with En-Thiran — our smart skill discovery experience where you interact and understand yourself in a whole new way.",
  },
  {
    label: "Expand",
    copy: "Explore different skills. Discover what clicks for you. Start building your foundation step by step with guided pathways designed for you.",
  },
  {
    label: "Evaluate",
    copy: "We help you think digitally to innovate and lead global AI. Take a quick 5-minute trial and see your strengths unfold in real time.",
  },
  {
    label: "Empower",
    copy: "Grow with confidence. Move beyond academics. Get expert support — personalised, focused, and designed for you.",
  },
];

const CARD_THEME = [
  { base: "#73A5CA", light: "#E8F3FC", deep: "#1E3A5F" }, // Explore
  { base: "#6E1A37", light: "#F9EEF3", deep: "#3F1224" }, // Expand
  { base: "#F08D39", light: "#FFF4E9", deep: "#5A3416" }, // Evaluate
  { base: "#519A66", light: "#EBF8EF", deep: "#1F4A2E" }, // Empower
];

// ─── Orbit cards ──────────────────────────────────────────────────────────────
//
// KEY DESIGN:
//   • The ring div uses a pure CSS @keyframes `orbit-ring` — linear, infinite,
//     NO JS timer. This guarantees zero pausing.
//   • Each card's inner div runs `orbit-counter` (same duration, reverse) so
//     text always reads upright.
//   • Active card detection: rAF reads the ring's current CSS matrix angle and
//     picks whichever card is nearest the top (12 o'clock). This is purely
//     cosmetic highlighting — it never touches the animation timing.
//   • Container is w-full up to 640px so no wasted side space.
//   • ORBIT_R_PCT = 33% puts card centres at 33% radius; card width = 40% so
//     card edges nearly reach both the container edge AND the center button.

const ORBIT_R_PCT = 33;
const CARD_SIZE_PCT = 41;

function OrbitCards({ onPlayClick }) {
  useEffect(() => { injectOrbitStyles(); }, []);

  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverMeta, setHoverMeta] = useState(null);
  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobileView(e.matches);
    setIsMobileView(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (isMobileView) {
    return (
      <div style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {CARDS.map(({ label, copy }, i) => {
            const Icon = CARD_ICONS[i];
            const theme = CARD_THEME[i];
            return (
              <article
                key={label}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  borderRadius: 18,
                  padding: "18px 16px",
                  background: `linear-gradient(160deg, #ffffff 0%, ${theme.light} 100%)`,
                  border: `1.5px solid color-mix(in srgb, ${theme.base} 60%, #dbeafe)`,
                  boxShadow: `0 8px 24px color-mix(in srgb, ${theme.base} 16%, transparent), 0 2px 10px rgba(15,23,42,0.06)`,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${theme.base}, color-mix(in srgb, ${theme.base} 74%, #ffffff))`,
                    boxShadow: `0 8px 18px color-mix(in srgb, ${theme.base} 28%, transparent)`,
                  }}
                >
                  <Icon style={{ width: 20, height: 20, color: "#fff" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 36,
                      lineHeight: 0.9,
                      color: `color-mix(in srgb, ${theme.base} 24%, #ffffff)`,
                      fontWeight: 700,
                    }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 34,
                      lineHeight: 0.98,
                      fontWeight: 700,
                      color: theme.deep,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 20,
                      lineHeight: 1.45,
                      color: `color-mix(in srgb, ${theme.deep} 82%, #334155)`,
                    }}
                  >
                    {copy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
          <CenterPlayTrigger onClick={onPlayClick} />
        </div>

      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 640,
        aspectRatio: "1 / 1",
        margin: "0 auto",
        userSelect: "none",
      }}
    >
      {/* Faint dashed orbit track */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          left: "50%",
          top: "50%",
          width: `${ORBIT_R_PCT * 2 + CARD_SIZE_PCT}%`,
          aspectRatio: "1/1",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1.5px dashed rgba(147,197,253,0.45)",
        }}
      />

      {/* Continuously rotating ring — pure CSS, no JS timing */}
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          inset: 0,
          animation: `orbit-ring ${SPIN_DURATION}s linear infinite`,
          animationPlayState: hoveredIndex !== null ? "paused" : "running",
        }}
      >
        {CARDS.map(({ label, copy }, i) => {
          const angleRad = (i * 90 - 90) * (Math.PI / 180);
          const cx = 50 + ORBIT_R_PCT * Math.cos(angleRad);
          const cy = 50 + ORBIT_R_PCT * Math.sin(angleRad);
          const Icon = CARD_ICONS[i];
          const theme = CARD_THEME[i];

          return (
            <div
              key={label}
              style={{
                position: "absolute",
                width: `${CARD_SIZE_PCT}%`,
                aspectRatio: "1 / 1",
                left: `${cx}%`,
                top: `${cy}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Counter-rotating card shell */}
              <div
                onMouseEnter={(e) => {
                  const containerRect = containerRef.current?.getBoundingClientRect();
                  const cardRect = e.currentTarget.getBoundingClientRect();
                  if (!containerRect) return;

                  const centerX = cardRect.left + cardRect.width / 2;
                  const centerY = cardRect.top + cardRect.height / 2;
                  const showOnRight = centerX <= containerRect.left + containerRect.width / 2;
                  setHoveredIndex(i);
                  setHoverMeta({
                    top: centerY - containerRect.top,
                    side: showOnRight ? "right" : "left",
                    offset: showOnRight
                      ? cardRect.right - containerRect.left + 14
                      : containerRect.right - cardRect.left + 14,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setHoverMeta(null);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  animation: `orbit-counter ${SPIN_DURATION}s linear infinite`,
                  animationPlayState: hoveredIndex !== null ? "paused" : "running",
                  background: `linear-gradient(155deg, ${theme.light} 0%, #ffffff 38%, ${theme.light} 100%)`,
                  border: `2.5px solid ${theme.base}`,
                  boxShadow: `0 10px 36px color-mix(in srgb, ${theme.base} 40%, transparent), 0 2px 10px rgba(0,0,0,0.08)`,
                  // Transition only the visual properties, NOT transform (which is animated)
                  transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12%",
                    gap: 5,
                  }}
                >
                  {/* Icon badge */}
                  <div
                    style={{
                      width: "29%",
                      aspectRatio: "1/1",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: `linear-gradient(135deg, ${theme.base}, color-mix(in srgb, ${theme.base} 74%, #ffffff))`,
                      transition: "background 0.35s",
                    }}
                  >
                    <Icon
                      style={{
                        width: "54%",
                        height: "54%",
                        color: "#fff",
                      }}
                    />
                  </div>

                  {/* Label */}
                  <p
                    style={{
                      margin: 0,
                      textAlign: "center",
                      fontWeight: 700,
                      color: theme.deep,
                      fontSize: "16px",
                      lineHeight: 1.15,
                    }}
                  >
                    {label}
                  </p>

                  {/* Body copy */}
                  <p
                    style={{
                      margin: 0,
                      textAlign: "center",
                      color: `color-mix(in srgb, ${theme.deep} 82%, #334155)`,
                      fontSize: "16px",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      transition: "color 0.35s",
                    }}
                  >
                    {copy}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hoveredIndex !== null && hoverMeta && (
        <div
          style={{
            position: "absolute",
            top: hoverMeta.top,
            transform: "translateY(-50%)",
            zIndex: 40,
            width: "min(300px, 46vw)",
            maxWidth: "calc(100% - 24px)",
            ...(hoverMeta.side === "right"
              ? { left: hoverMeta.offset }
              : { right: hoverMeta.offset }),
            padding: "14px 16px",
            borderRadius: 16,
            background: `linear-gradient(135deg, ${CARD_THEME[hoveredIndex].deep} 0%, ${CARD_THEME[hoveredIndex].base} 100%)`,
            border: `1px solid color-mix(in srgb, ${CARD_THEME[hoveredIndex].base} 50%, #ffffff)`,
            boxShadow: "0 14px 36px rgba(2,6,23,0.35)",
            color: "#e2e8f0",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.86)",
            }}
          >
            {CARDS[hoveredIndex].label}
          </p>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 14,
              lineHeight: 1.45,
              color: "#f8fafc",
            }}
          >
            {CARDS[hoveredIndex].copy}
          </p>
        </div>
      )}

      {/* School Students page: centered video trigger */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          <CenterPlayTrigger onClick={onPlayClick} />
        </div>
      </div>

    </div>
  );
}

// ─── CTA block ────────────────────────────────────────────────────────────────

function CTABlock({ onStartClick }) {
  return (
    <div className="mt-10 flex w-full flex-col items-center gap-2 text-center">
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onStartClick}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-10 py-3 text-base font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
        >
          Start your journey
        </button>
        <InnerPageLink
          to="/learning-hub"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-slate-300 bg-white px-10 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Explore how it works
        </InnerPageLink>
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function SchoolStudentsBody() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="flex w-full flex-col items-center overflow-hidden px-4 py-12 sm:px-6">
        <OrbitCards onPlayClick={() => setIsVideoOpen(true)} />
        <CTABlock onStartClick={() => setIsFormOpen(true)} />
      </section>

      <SchoolStudentVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <GetStartedFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialTab="school-student"
      />
    </>
  );
}