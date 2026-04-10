import { useState } from "react";
import InnerPageLink from "../components/InnerPageLink.jsx";
import { GetStartedFormModal } from "./GetStarted.jsx";
import { FourCardFramework, OrbitCenterPageTitle } from "./subpageShared.jsx";

export function SchoolOrganizationsBody() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="w-full overflow-hidden py-8">
        <FourCardFramework
          ctaBelowCards
          layoutMode="orbit"
          cardsCenterOverlay={<OrbitCenterPageTitle title="Schools" />}
          pillarTitles={["Explore", "Expand", "Evaluate", "Excel"]}
          copy={[
            "Explore what your present teaching experts do to set and measure the measure learning outcomes in your classes and subject areas in 9,10,11 and 12 classes (Shaping years)",
            "Do a pilot with EN-THIRAN app for a subset of students to measure year level, class level  and subject level scores.",
            "Verify the subject level (Maths, science, IT…) and standard level (9, 10, 11 and 12) achieved learning outcomes against your established targets",
            "Adapt to include authentic assessments and insightful tests at subject and year level evaluations to achieve and exceed your target scores",
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
