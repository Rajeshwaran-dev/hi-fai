import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion, useIsMobile } from "./hooks/useReducedMotion.js";
import Preloader from "./components/Preloader.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import TargetUsers from "./components/TargetUsers.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import Features from "./components/Features.jsx";
import CTASection from "./components/CTASection.jsx";
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
    <div className="relative min-h-screen overflow-x-hidden">
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
        <Services reducedMotion={reducedMotion} isMobile={isMobile} />
        <TargetUsers reducedMotion={reducedMotion} isMobile={isMobile} />
        <HowItWorks reducedMotion={reducedMotion} isMobile={isMobile} />
        <ProjectsSection reducedMotion={reducedMotion} isMobile={isMobile} />
        <Features reducedMotion={reducedMotion} isMobile={isMobile} />
        <CTASection reducedMotion={reducedMotion} isMobile={isMobile} />
      </main>
      <Footer reducedMotion={reducedMotion} />
    </div>
  );
}
