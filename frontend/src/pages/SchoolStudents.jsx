import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  Play,
  RefreshCw,
  Trophy,
  X,
} from "lucide-react";
import InnerPageLink from "../components/InnerPageLink.jsx";
import enThiranDemoSrc from "../assets/videos/enthiran.mp4?url";
import { GetStartedFormModal } from "./GetStarted.jsx";

// ─── Inject CSS keyframes once ────────────────────────────────────────────────

function injectOrbitStyles() {
  if (document.getElementById("orbit-keyframes")) return;
  const el = document.createElement("style");
  el.id = "orbit-keyframes";
  el.textContent = `
    @keyframes center-spin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(el);
}

// ─── Center play trigger ──────────────────────────────────────────────────────

function CenterPlayTrigger({ onClick }) {
  const textPathId = useId();

  return (
    <div style={{ position: "relative", display: "inline-flex", width: 146, height: 146, alignItems: "center", justifyContent: "center" }}>
      {/* Spinning text ring */}
      <svg
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "rgba(29,78,216,0.8)",
          animation: "center-spin 10s linear infinite",
        }}
        viewBox="0 0 100 100"
        aria-hidden
      >
        <defs>
          <path id={textPathId} d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text fill="currentColor" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "1.9px" }}>
          <textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
          ✦ CHECKOUT ENTHIRAN APP ✦
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
          width: 94,
          height: 94,
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
          width: 68,
          height: 68,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1483ff, #21b9ff)",
            boxShadow: "0 6px 20px rgba(20,131,255,0.45)",
          }}
        >
          <Play style={{ width: 28, height: 28, marginLeft: 3, color: "#fff" }} fill="currentColor" />
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

// ─── Evaluate skill flow (hover → “Click me” → full modal) ───────────────────

function EvaluateFlowModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex min-h-[100dvh] w-full items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="evaluate-flow-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[min(90dvh,840px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.35)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <h2
          id="evaluate-flow-title"
          className="pr-10 font-geom-heading text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
        >
          How to evaluate your skills
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Follow these steps for each skill. Work your way up to{" "}
          <strong className="font-semibold text-slate-800">30-minute</strong>{" "}
          questions and the{" "}
          <strong className="font-semibold text-slate-800">
            most complex
          </strong>{" "}
          category of test when you are ready.
        </p>
        <ol className="mt-6 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
          {EVALUATE_FLOW_STEPS.map((text, idx) => (
            <li key={idx} className="pl-1 marker:font-semibold">
              {text}
            </li>
          ))}
        </ol>
        <p className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-amber-950/90">
          Progress from shorter tests to{" "}
          <strong>30-minute</strong> sessions and the{" "}
          <strong>highest complexity</strong> items so your measure reflects real
          depth—not just a quick check.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#1483ff] to-[#21b9ff] py-3 text-center text-sm font-semibold text-white shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto sm:px-8"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body
  );
}

// ─── Card data ────────────────────────────────────────────────────────────────

/** Order matches CARDS: Explore → Evaluate → Expand → Excel (orbit positions top → right → bottom → left). */
const CARD_ICONS = [
  ({ style }) => (
    <Compass style={style} strokeWidth={1.65} aria-hidden />
  ),
  ({ style }) => (
    <ClipboardCheck style={style} strokeWidth={1.65} aria-hidden />
  ),
  ({ style }) => (
    <RefreshCw style={style} strokeWidth={1.65} aria-hidden />
  ),
  ({ style }) => (
    <Trophy style={style} strokeWidth={1.65} aria-hidden />
  ),
];

const CARDS = [
  {
    label: "Explore",
    copy: "Learn the basics of Digital ABCD with the guides",
  },
  {
    label: "Evaluate",
    copy: "Take a test on any one of the 5 skills",
    /** Right-side orbit card: hover popover + full flow modal */
    evaluateFlow: true,
  },
  {
    label: "Expand",
    copy: "Repeat your evaluation cycles for all 5 core skills",
  },
  {
    label: "Excel",
    copy: "Take external competitive tests to verify you achieve the top 10% of the co-hort",
  },
];

const EVALUATE_FLOW_STEPS = [
  "Choose the easy 10-minute test to start measuring that skill (for example, problem solving and critical thinking).",
  "Repeat this for all the subtopics of that skill.",
  "Get an overall measure of your skill.",
  "If you are happy, go to the next skill.",
  "If not, check guides, learn from the Knowledge Hub, or use free Google-based resources.",
  "Repeat the test until you are happy with the score you achieve.",
];

const CARD_THEME = [
  { base: "#73A5CA", light: "#E8F3FC", deep: "#1E3A5F" }, // Explore
  { base: "#6E1A37", light: "#F9EEF3", deep: "#3F1224" }, // Evaluate
  { base: "#F08D39", light: "#FFF4E9", deep: "#5A3416" }, // Expand
  { base: "#519A66", light: "#EBF8EF", deep: "#1F4A2E" }, // Excel
];

// ─── Orbit cards ──────────────────────────────────────────────────────────────
//
// Desktop keeps a static 4-point layout around the center trigger.
// The card color themes remain unchanged while shape is now rectangular.

const ORBIT_R_PCT = 36;
const CARD_WIDTH_PCT = 37;
const ORBIT_RING_SCALE = 3.2;

function OrbitCards({ onPlayClick }) {
  useEffect(() => { injectOrbitStyles(); }, []);

  const [evaluateFlowOpen, setEvaluateFlowOpen] = useState(false);

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
      <>
      <div style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {CARDS.map(({ label, copy, evaluateFlow }, i) => {
            const Icon = CARD_ICONS[i];
            const theme = CARD_THEME[i];
            return (
              <article
                key={`school-card-${i}`}
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
                  {evaluateFlow ? (
                    <button
                      type="button"
                      onClick={() => setEvaluateFlowOpen(true)}
                      className="mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6E1A37] to-[#9a2349] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                    >
                      Click Me
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
          <CenterPlayTrigger onClick={onPlayClick} />
        </div>

      </div>
      <EvaluateFlowModal
        isOpen={evaluateFlowOpen}
        onClose={() => setEvaluateFlowOpen(false)}
      />
      </>
    );
  }

  return (
    <>
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 760,
        aspectRatio: "1 / 1",
        margin: "0 auto",
        userSelect: "none",
      }}
    >
      <div
        className="orbit-progress-shell"
        style={{
          width: `${ORBIT_R_PCT * ORBIT_RING_SCALE}%`,
          aspectRatio: "1/1",
        }}
        aria-hidden
      >
        <svg
          viewBox="0 0 120 120"
          className="orbit-progress-svg"
          focusable="false"
        >
          <circle
            className="orbit-progress-track"
            cx="60"
            cy="60"
            r="48"
          />
          <circle
            className="orbit-progress-ring"
            cx="60"
            cy="60"
            r="48"
          />
        </svg>
      </div>

      {/* Arrow that travels along the orbit track */}
      <div
        className="orbit-arrow-rotor"
        style={{
          width: `${ORBIT_R_PCT * ORBIT_RING_SCALE}%`,
          aspectRatio: "1/1",
        }}
        aria-hidden
      >
        <div className="orbit-arrow">
          <span className="orbit-arrow-icon-shell">
            <ArrowRight className="orbit-arrow-icon" strokeWidth={2.85} aria-hidden />
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
        }}
      >
        {CARDS.map(({ label, copy, evaluateFlow }, i) => {
          const angleRad = (i * 90 - 90) * (Math.PI / 180);
          const cx = 50 + ORBIT_R_PCT * Math.cos(angleRad);
          const cy = 50 + ORBIT_R_PCT * Math.sin(angleRad);
          const Icon = CARD_ICONS[i];
          const theme = CARD_THEME[i];

          const cardInner = (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: 24,
                overflow: "hidden",
                background: `linear-gradient(155deg, ${theme.light} 0%, #ffffff 38%, ${theme.light} 100%)`,
                border: `2.5px solid ${theme.base}`,
                boxShadow: `0 10px 36px color-mix(in srgb, ${theme.base} 40%, transparent), 0 2px 10px rgba(0,0,0,0.08)`,
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
                  padding: "9.5% 9%",
                  gap: 6,
                }}
              >
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

                <p
                  style={{
                    margin: 0,
                    textAlign: "center",
                    fontWeight: 700,
                    color: theme.deep,
                    fontSize: "22px",
                    lineHeight: 1.12,
                  }}
                >
                  {label}
                </p>

                <p
                  style={{
                    margin: 0,
                    textAlign: "center",
                    color: `color-mix(in srgb, ${theme.deep} 82%, #334155)`,
                    fontSize: evaluateFlow ? "18px" : "18px",
                    lineHeight: 1.36,
                  }}
                >
                  {copy}
                </p>
                {evaluateFlow ? (
                  <button
                    type="button"
                    onClick={() => setEvaluateFlowOpen(true)}
                    className="mt-1 w-[min(100%,9.5rem)] shrink-0 rounded-lg bg-gradient-to-r from-[#6E1A37] to-[#9a2349] px-2.5 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-white shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-1 sm:text-[11px]"
                  >
                    Click Me
                  </button>
                ) : null}
              </div>
            </div>
          );

          return (
            <div
              key={`orbit-card-${i}`}
              style={{
                position: "absolute",
                width: `${CARD_WIDTH_PCT}%`,
                aspectRatio: "1.28 / 1",
                left: `${cx}%`,
                top: `${cy}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {cardInner}
            </div>
          );
        })}
      </div>

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
    <EvaluateFlowModal
      isOpen={evaluateFlowOpen}
      onClose={() => setEvaluateFlowOpen(false)}
    />
    </>
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
      <section className="flex w-full flex-col items-center overflow-hidden px-6 py-12 sm:px-6">
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