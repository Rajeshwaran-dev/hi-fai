import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion, useIsMobile } from "./hooks/useReducedMotion.js";
import Preloader from "./components/Preloader.jsx";
import Navbar from "./components/Navbar.jsx";
import {
  Hero,
  HowCanHiFAISection,
  KanavooglePartnershipSection,
  WhyHifaiMissingLinkSection,
  WhatIsHifaiSection,
} from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import useCardTilt from "./hooks/useCardTilt.js";
import useMagneticButtons from "./hooks/useMagneticButtons.js";
import useSmoothScroll from "./hooks/Usesmoothscroll.js";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);
  const [showPreloader, setShowPreloader] = useState(true);

  /* ── Lenis smooth scroll + GSAP ticker sync ── */
  useSmoothScroll(reducedMotion);

  /* ── Global card tilt + magnetic buttons ── */
  useCardTilt({ reducedMotion, isMobile });
  useMagneticButtons({ reducedMotion, isMobile });

  /* ── Keep ScrollTrigger in sync after mount & resize ── */
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {showPreloader && (
        <Preloader
          reducedMotion={reducedMotion}
          onComplete={() => setShowPreloader(false)}
        />
      )}
      <CustomCursor reducedMotion={reducedMotion} isMobile={isMobile} />
      <Navbar reducedMotion={reducedMotion} />
      <main>
        <Hero reducedMotion={reducedMotion} isMobile={isMobile} />
        <WhatIsHifaiSection reducedMotion={reducedMotion} isMobile={isMobile} />
        <WhyHifaiMissingLinkSection
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
        <HowCanHiFAISection />
        <KanavooglePartnershipSection reducedMotion={reducedMotion} isMobile={isMobile} />
      </main>
      <Footer reducedMotion={reducedMotion} />
    </div>
  );
}
