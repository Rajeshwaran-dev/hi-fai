import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import InnerPageLink from "../components/InnerPageLink.jsx";
import enThiranDemoSrc from "../assets/videos/enthiran.mp4?url";
import { FourCardFramework } from "./subpageShared.jsx";

function CenterPlayTrigger({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex h-16 w-16 items-center justify-center rounded-full border border-blue-200/70 bg-white/95 text-blue-600 shadow-[0_12px_28px_rgba(15,23,42,0.2)] transition hover:scale-105 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
      aria-label="Play En-Thiran demo video"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] text-white transition group-hover:shadow-[0_8px_22px_rgba(20,131,255,0.45)]">
        <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
      </span>
    </button>
  );
}

function SchoolStudentVideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const el = videoRef.current;
    if (!el) return;

    const p = el.play();
    if (p !== undefined) p.catch(() => {});

    return () => {
      el.pause();
      el.currentTime = 0;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex min-h-[100dvh] w-full items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="En-Thiran demo video"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[360px]" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-2 -top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
          aria-label="Close video popup"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative w-full drop-shadow-[0_28px_60px_rgba(15,23,42,0.4)]">
          <div
            className="pointer-events-none absolute -inset-3 rounded-[2.75rem] bg-gradient-to-b from-blue-400/15 via-transparent to-cyan-400/10 blur-xl"
            aria-hidden
          />
          <div className="relative rounded-[2.4rem] border-[11px] border-slate-800 bg-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
            <div className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[1.65rem] bg-black">
              <div
                className="absolute left-1/2 top-2.5 z-10 h-5 w-[4.5rem] -translate-x-1/2 rounded-full bg-black/55 ring-1 ring-white/10"
                aria-hidden
              />
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={enThiranDemoSrc}
                controls
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
              />
              {videoError ? (
                <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-2 bg-slate-900 p-4 text-center text-xs text-white/80">
                  <p className="font-semibold text-white">Video unavailable</p>
                  <p className="text-white/70">
                    Add <code className="rounded bg-white/10 px-1">src/assets/videos/enthiran.mp4</code> and refresh.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function SchoolStudentsBody() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <FourCardFramework
        ctaBelowCards
        copy={[
          "Get a glimpse of your true potential with En-Thiran - our smart skill discovery experience, where you can interact, explore, and begin understanding yourself in a whole new way.",
          "Explore different skills. Discover what clicks for you. Start building your foundation step by step.",
          "We help you change your Hi to learn and think digitally to innovate and lead global AI. Take a quick 5-minute trial. See your strengths unfold in real time.",
          "Grow with confidence. Move beyond just academics. Get our Expert support when you need it - personalised, focused, and designed for you(available only with pre-booking).",
        ]}
        ctaTitle="Unlock what's uniquely yours."
        ctaSubtitle="You start. We help you move ahead."
        ctaFooterNote="Takes less than a minute"
        cardsCenterOverlay={<CenterPlayTrigger onClick={() => setIsVideoOpen(true)} />}
        belowCardsContent={
          <div className="flex justify-center md:hidden">
            <CenterPlayTrigger onClick={() => setIsVideoOpen(true)} />
          </div>
        }
      >
        <InnerPageLink
          to="/get-started"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
        >
          Start your journey
        </InnerPageLink>
        <InnerPageLink
          to="/learning-hub"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Explore how it works
        </InnerPageLink>
      </FourCardFramework>
      <SchoolStudentVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
}
