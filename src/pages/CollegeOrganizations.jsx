import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLink from "../components/InnerPageLink.jsx";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion.js";
import { ProjectsSection } from "./Home.jsx";
import { FourCardFramework } from "./subpageShared.jsx";

gsap.registerPlugin(ScrollTrigger);

export function CollegeOrganizationsBody() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <ProjectsSection reducedMotion={reducedMotion} isMobile={isMobile} />
      <div className="mt-2 md:mt-6">
        <FourCardFramework
          copy={[
            "Design certificates, minors, and co-curricular paths with clear outcomes that departments and innovation centers can stack together.",
            "Extend support for research-adjacent work—responsible use playbooks, literature acceleration, and cross-lab collaboration protocols.",
            "Run shared rubrics, mentor rotations, and review days with metrics sponsors and accreditation teams can read.",
            "Bridge to employers with briefings on portfolios, take-home expectations, and ethics screens your students are prepared for.",
          ]}
          ctaTitle="Invite HIfAi into your next term"
        >
          <a
            href="mailto:hello@hifai.skills?subject=College%20organization%20partnership"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
          >
            Contact partnerships
          </a>
          <InnerPageLink
            to="/learning-hub"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            See facilitator resources
          </InnerPageLink>
        </FourCardFramework>
      </div>
    </>
  );
}
