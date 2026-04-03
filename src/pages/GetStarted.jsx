import { useState } from "react";
import InnerPageLink from "../components/InnerPageLink.jsx";
import { Lead, SectionHeading, SectionLabel } from "./subpageShared.jsx";

export function GetStartedBody() {
  const [tab, setTab] = useState("school-org");

  const tabOptions = [
    { id: "school-org", label: "High school" },
    { id: "college-org", label: "University" },
    { id: "school-student", label: "School Students" },
    { id: "college-student", label: "College Students" },
  ];

  return (
    <>
      <div className="mb-10">
        <SectionLabel>Join a cohort</SectionLabel>
        <SectionHeading>Tell us who you are—we will route your request to the right team</SectionHeading>
        <Lead>
          Applications are reviewed weekly. Schools and universities can share procurement details in the notes
          field; students should use a supervised email where possible.
        </Lead>
      </div>

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:p-8">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-1.5 rounded-[1rem] bg-slate-100 p-1.5 shadow-inner md:grid-cols-4">
          {tabOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-[0.7rem] px-3 py-2.5 text-sm font-semibold transition-all ${
                tab === item.id
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">First name</span>
              <input
                type="text"
                placeholder="Jane"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Last name</span>
              <input
                type="text"
                placeholder="Doe"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                {tab === "school-org"
                  ? "Grades covered"
                  : tab === "college-org"
                    ? "Institution type"
                    : tab === "school-student"
                      ? "Grade"
                      : "Program"}
              </span>
              <select className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20">
                {tab === "school-org" ? (
                  <>
                    <option>Select grade range</option>
                    <option>Middle school (Grades 6-8)</option>
                    <option>Secondary (Grades 9-10)</option>
                    <option>Senior secondary (Grades 11-12)</option>
                    <option>K-12 mixed</option>
                  </>
                ) : tab === "college-org" ? (
                  <>
                    <option>Select institution type</option>
                    <option>University</option>
                    <option>College</option>
                    <option>Research institute</option>
                    <option>Innovation center</option>
                  </>
                ) : tab === "school-student" ? (
                  <>
                    <option>Select grade</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </>
                ) : (
                  <>
                    <option>Select program</option>
                    <option>Undergraduate</option>
                    <option>Postgraduate</option>
                    <option>Diploma</option>
                    <option>PhD</option>
                  </>
                )}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                {tab === "school-org"
                  ? "School name"
                  : tab === "college-org"
                    ? "Institution name"
                    : tab === "school-student"
                      ? "School name"
                      : "University name"}
              </span>
              <input
                type="text"
                placeholder={
                  tab === "school-org"
                    ? "Your high school"
                    : tab === "college-org"
                      ? "Your institution"
                      : tab === "school-student"
                        ? "Your school"
                        : "Your university"
                }
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            {tab === "school-org" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Your role</span>
                <select className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20">
                  <option>Select role</option>
                  <option>Principal / Vice Principal</option>
                  <option>Teacher</option>
                  <option>Curriculum coordinator</option>
                  <option>IT / Innovation lead</option>
                </select>
              </label>
            ) : null}
            {tab === "college-org" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Department / center</span>
                <input
                  type="text"
                  placeholder="e.g. Computer Science Department"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
              </label>
            ) : null}
            {tab === "school-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Parent/guardian email</span>
                <input
                  type="email"
                  placeholder="guardian@email.com"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
              </label>
            ) : null}
            {tab === "college-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Major / focus area</span>
                <input
                  type="text"
                  placeholder="e.g. Data Science"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
              </label>
            ) : null}
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                {tab === "school-org" || tab === "college-org" ? "Partnership goals / notes" : "Learning goals / notes"}
              </span>
              <textarea
                rows={3}
                placeholder={
                  tab === "school-org" || tab === "college-org"
                    ? "e.g. pilot cohort size, timeline, procurement contact..."
                    : "e.g. AI topics you want to learn, project interests..."
                }
                className="w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Phone</span>
              <input
                type="tel"
                placeholder="+1 ••• ••• ••••"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Email</span>
              <input
                type="email"
                placeholder="you@school.edu"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <InnerPageLink
              to="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              Back to home
            </InnerPageLink>
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
            >
              Submit application
            </button>
          </div>
        </form>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
        Prefer email? Reach us directly at{" "}
        <a href="mailto:hifaidgl@gmail.com" className="font-semibold text-blue-600 hover:underline">
          hifaidgl@gmail.com
        </a>
        .
      </p>
    </>
  );
}
