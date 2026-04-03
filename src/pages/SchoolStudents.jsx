import InnerPageLink from "../components/InnerPageLink.jsx";
import { FourCardFramework } from "./subpageShared.jsx";

export function SchoolStudentsBody() {
  return (
    <FourCardFramework
      copy={[
        "Designed for school students (Grades 9–12) to start discovering their interests and abilities through a simple digital experience. We help you take your first step beyond marks and understand what you truly enjoy.",
        "Students begin to build their knowledge by exploring different skills and learning in a structured digital environment.",
        "Students can evaluate their skills through structured app-based assessments and understand their strengths clearly. We help you change your \"Hi\" to learn and think digitally to innovate and lead global AI.",
        "With continuous learning and guidance, students gain confidence and improve their skills to perform better academically and beyond.",
      ]}
      ctaTitle="Ready to join as a school student?"
    >
      <InnerPageLink
        to="/get-started"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
      >
        Start your application
      </InnerPageLink>
      <InnerPageLink
        to="/learning-hub"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
      >
        Browse the Learning Hub
      </InnerPageLink>
    </FourCardFramework>
  );
}
