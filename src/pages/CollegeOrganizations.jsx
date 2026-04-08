import { useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLink from "../components/InnerPageLink.jsx";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion.js";
import { GetStartedFormModal } from "./GetStarted.jsx";
import { ProjectsSection } from "./Home.jsx";
import { FourCardFramework } from "./subpageShared.jsx";

gsap.registerPlugin(ScrollTrigger);

export function CollegeOrganizationsBody() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      
      <div className="mt-2 md:mt-6">
        <FourCardFramework
          ctaBelowCards
          layoutMode="orbit"
          pillarTitles={["Discover", "Build", "Apply", "Validate"]}
          copy={[
            "Identify your career direction by connecting your skills, interests, and industry demands to make smarter and more focused decisions.",
            "Work on practical skills through real-time learning experiences, collaborative tasks, and hands-on exposure tailored to your career goals.",
            "Apply your knowledge in real-world scenarios by working on projects that simulate industry challenges and expectations.",
            "Strengthen your profile with expert guidance, continuous feedback, and performance tracking to help you confidently step into your career.",
          ]}
          ctaTitle="Invite HIfAi into your next term"
        >
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
          >
            Contact partnerships
          </button>
          <InnerPageLink
            to="/learning-hub"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            See facilitator resources
          </InnerPageLink>
        </FourCardFramework>
      </div>
      <ProjectsSection reducedMotion={reducedMotion} isMobile={isMobile} />
      <GetStartedFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialTab="college-org"
      />
    </>
  );
}
