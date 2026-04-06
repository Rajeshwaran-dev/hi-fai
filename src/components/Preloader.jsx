import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const VIDEO_SRC = "/preloader.mp4";
/** Minimum overlay time so very short clips do not disappear instantly. */
const MIN_VISIBLE_MS = 900;
/** Safety cap if playback never ends. */
const MAX_WAIT_MS = 45000;

function waitForWindowLoad() {
  if (typeof window === "undefined") return Promise.resolve();
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", resolve, { once: true });
  });
}

/**
 * Homepage entry preloader: fullscreen `public/preloader.mp4`.
 * Only mounted from `App.jsx` (route `/`).
 */
export default function Preloader({ onComplete, reducedMotion = false }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const exitTlRef = useRef(null);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const safeComplete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCompleteRef.current?.();
  };

  useLayoutEffect(() => {
    if (!reducedMotion) return;
    safeComplete();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    let cancelled = false;
    let maxTimerId = 0;

    const loadP = waitForWindowLoad();
    const minP = new Promise((r) => setTimeout(r, MIN_VISIBLE_MS));

    let videoFinished = false;
    const videoP = new Promise((resolve) => {
      const finish = () => {
        if (videoFinished) return;
        videoFinished = true;
        if (maxTimerId) window.clearTimeout(maxTimerId);
        resolve();
      };

      const tryPlay = () => {
        video.play().catch(() => finish());
      };

      video.addEventListener("ended", finish, { once: true });
      video.addEventListener("error", finish, { once: true });

      if (video.readyState >= 2) tryPlay();
      else video.addEventListener("canplay", tryPlay, { once: true });

      maxTimerId = window.setTimeout(finish, MAX_WAIT_MS);
    });

    const runExit = () => {
      if (cancelled) return;
      exitTlRef.current?.kill();
      const exit = gsap.timeline({
        onComplete: () => safeComplete(),
      });
      exitTlRef.current = exit;
      exit.to(root, {
        autoAlpha: 0,
        duration: 0.55,
        ease: "power2.inOut",
      });
    };

    Promise.all([loadP, videoP, minP]).then(() => {
      if (cancelled) return;
      runExit();
    });

    return () => {
      cancelled = true;
      if (maxTimerId) window.clearTimeout(maxTimerId);
      exitTlRef.current?.kill();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={rootRef}
      className="preloader-root preloader-root--video"
      aria-hidden
    >
      <video
        ref={videoRef}
        className="preloader-video"
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        autoPlay
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
      />
    </div>
  );
}
