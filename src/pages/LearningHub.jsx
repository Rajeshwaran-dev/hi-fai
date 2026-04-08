import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLink from "../components/InnerPageLink.jsx";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion.js";
import { HowItWorks, Services } from "./Home.jsx";
import { FourCardFramework } from "./subpageShared.jsx";

gsap.registerPlugin(ScrollTrigger);

export function LearningHubBody() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <Services reducedMotion={reducedMotion} isMobile={isMobile} />
      <HowItWorks reducedMotion={reducedMotion} isMobile={isMobile} />
      <div className="mt-2 md:mt-6">
        <FourCardFramework
          ctaBelowCards
          copy={[
            "Start with readiness checklists, primers, and discussion starters for classrooms, families, and advisors.",
            "Deploy sprint playbooks, milestone prompts, and facilitation notes that keep studios consistent week to week.",
            "Adapt policy language, acceptable-use templates, and lightweight evaluation criteria for student AI projects.",
            "Grow with portfolio guides, partner office hours, and hub updates driven by real cohort requests.",
          ]}
          ctaTitle="New to HIfAi? Start with pathways for Students"
        >
          <InnerPageLink
            to="/students/school-students"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
          >
            Grades 9th – 12th
          </InnerPageLink>
          <InnerPageLink
            to="/students/college-students"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Students (College)
          </InnerPageLink>
        </FourCardFramework>
      </div>
    </>
  );
}
