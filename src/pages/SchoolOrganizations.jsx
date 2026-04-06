import InnerPageLink from "../components/InnerPageLink.jsx";
import { FourCardFramework } from "./subpageShared.jsx";

export function SchoolOrganizationsBody() {
  return (
    <FourCardFramework
      ctaBelowCards
      copy={[
        "Align programs with your goals, bell schedule, device policy, and safeguarding needs through scoped modules, electives, or club formats.",
        "Empower teachers with co-designed lesson guides, assessment rubrics, and live facilitation coaching—not slides alone.",
        "Track participation, competency checkpoints, and showcase quality with lightweight analytics for boards and grants.",
        "Scale confidently with playbooks for additional grades and after-school tracks while keeping pedagogy institution-owned.",
      ]}
      ctaTitle="Plan a conversation with our school partnerships team"
    >
      <a
        href="mailto:innovate@hifai.io?subject=School%20organization%20partnership"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
      >
        Email to schedule
      </a>
      <InnerPageLink
        to="/get-started"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
      >
        Interest form
      </InnerPageLink>
    </FourCardFramework>
  );
}
