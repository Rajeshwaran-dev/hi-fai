import { useEffect, useRef, useState } from "react";
import InnerPageLink from "../components/InnerPageLink.jsx";
import { FourCardFramework } from "./subpageShared.jsx";

/** Served from `public/videos/enthiran.mp4` → `/videos/enthiran.mp4` */
const EN_THIRAN_DEMO_SRC = "/videos/enthiran.mp4";

function EnThiranPhoneDemo() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const tryPlay = () => {
      el.muted = true;
      const p = el.play();
      if (p !== undefined) p.catch(() => {});
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    return () => el.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <div className="relative z-10 -mt-2 mb-2 flex flex-col items-center animate-fadeInUp motion-reduce:animate-none motion-reduce:opacity-100 [animation-delay:0.05s]">
      <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-blue-600 md:text-xs">
        Try our HIfAi experience
      </p>
      <div className="relative flex w-full justify-center px-2">
        <div
          className="relative w-full max-w-[280px] drop-shadow-[0_28px_60px_rgba(15,23,42,0.35)]"
          style={{ animationDelay: "0.08s" }}
        >
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
                src={EN_THIRAN_DEMO_SRC}
                muted
                playsInline
                loop
                autoPlay
                preload="auto"
                onError={() => setVideoError(true)}
              />
              {videoError ? (
                <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-2 bg-slate-900 p-4 text-center text-xs text-white/80">
                  <p className="font-semibold text-white">Video unavailable</p>
                  <p className="text-white/70">
                    Add <code className="rounded bg-white/10 px-1">public/videos/enthiran.mp4</code> and refresh.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SchoolStudentsBody() {
  return (
    <FourCardFramework
      copy={[
        "Get a glimpse of your true potential with En-Thiran - our smart skill discovery experience, where you can interact, explore, and begin understanding yourself in a whole new way.",
        "Explore different skills. Discover what clicks for you. Start building your foundation step by step.",
        "We help you change your Hi to learn and think digitally to innovate and lead global AI. Take a quick 5-minute trial. See your strengths unfold in real time.",
        "Grow with confidence. Move beyond just academics. Get our Expert support when you need it - personalised, focused, and designed for you(available only with pre-booking).",
      ]}
      ctaTitle="Unlock what's uniquely yours."
      ctaSubtitle="You start. We help you move ahead."
      ctaFooterNote="Takes less than a minute"
      betweenCardsAndCta={<EnThiranPhoneDemo />}
    >
      <InnerPageLink
        to="/get-started"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
      >
        Start your journey
      </InnerPageLink>
      <InnerPageLink
        to="/learning-hub"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
      >
        Explore how it works
      </InnerPageLink>
    </FourCardFramework>
  );
}
