import { useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLink from "../components/InnerPageLink.jsx";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion.js";
import { GetStartedFormModal } from "./GetStarted.jsx";
import { ProjectsSection } from "./Home.jsx";
import {
  FourCardFramework,
  ORBIT_ICONS_DISCOVER_CYCLE,
  OrbitCenterPageTitle,
} from "./subpageShared.jsx";

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
          cardsCenterOverlay={<OrbitCenterPageTitle title="Universities" />}
          pillarIcons={ORBIT_ICONS_DISCOVER_CYCLE}
          pillarTitles={["Explore", "Evaluate", "Expand", "Excel"]}
          copy={[
            "Discover and get an inventory of what kind of authentic assessments are in your IT course and how many of the make use of Digital ABCD",
            "In consultation with HIfAi Define authentic assessments and relevant 21st century skills measuring rubrics  to measure the learning outcomes  in all your IT courses and units",
            "Develop evaluation expertise with creative problems design that enables the students to make novel use of Digital ABCD and solve the given problem. Validate the impact with recruitment results",
            "Be the leader in designing and implementing  evaluation process and achieve your students long term success with measurable 21st century skills",
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
