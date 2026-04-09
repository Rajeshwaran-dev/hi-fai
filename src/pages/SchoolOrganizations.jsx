import { useState } from "react";
import InnerPageLink from "../components/InnerPageLink.jsx";
import { GetStartedFormModal } from "./GetStarted.jsx";
import { FourCardFramework } from "./subpageShared.jsx";

export function SchoolOrganizationsBody() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="w-full overflow-hidden py-8">
        <FourCardFramework
          ctaBelowCards
          layoutMode="orbit"
          pillarTitles={["Explore", "Expand", "Evaluate", "Excel"]}
          copy={[
            "Discover your hidden talents and interests through guided activities designed to help you understand what truly excites and motivates you at an early stage.",
            "Step into different domains and skills with interactive experiences that allow you to experiment, learn, and find the paths that suit you best.",
            "Understand your strengths, thinking patterns, and growth areas with smart evaluation tools that give you clarity about your future direction.",
            "Start building confidence and real-world readiness with structured support, helping you grow beyond academics and prepare for bigger opportunities.",
          ]}
          ctaTitle="Plan a conversation with our school partnerships team"
        >
          <a
            href="mailto:innovate@hifaiskills.io?subject=School%20organization%20partnership"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
          >
            Email to schedule
          </a>
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Interest form
          </button>
        </FourCardFramework>
      </div>
      <GetStartedFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialTab="school-org"
      />
    </>
  );
}
