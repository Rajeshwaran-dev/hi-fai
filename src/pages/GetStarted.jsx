import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Lead, SectionHeading } from "./subpageShared.jsx";
import sampleQrImage from "../assets/images/qr.png?url";

const tabOptions = [
  { id: "school-org", label: "Schools" },
  { id: "college-org", label: "Universities" },
  { id: "school-student", label: "School Students" },
  { id: "college-student", label: "College Students" },
];
const DEFAULT_TAB = "school-org";

function getInitialTabFromSearch(search) {
  const requestedTab = new URLSearchParams(search).get("tab");
  if (!requestedTab) return DEFAULT_TAB;
  return tabOptions.some((item) => item.id === requestedTab)
    ? requestedTab
    : DEFAULT_TAB;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_RE = /^\d{10}$/;
const SCHOOL_STUDENT_APP_LINK = "/learning-hub";

export function GetStartedFormPanel({
  initialTab = "school-org",
  lockTab = false,
  showHeader = true,
  showEmailHint = true,
  containerClassName = "mx-auto w-full max-w-6xl",
}) {
  const [tab, setTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    fullName: "",
    gradeOrProgram: "",
    institution: "",
    role: "",
    department: "",
    guardianEmail: "",
    major: "",
    notes: "",
    phone: "",
    email: "",
  });
  const [studentCount, setStudentCount] = useState(1);
  const [studentEntries, setStudentEntries] = useState([
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [isPaying, setIsPaying] = useState(false);
  const [showGpayQrPopup, setShowGpayQrPopup] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [verificationCountdown, setVerificationCountdown] = useState(10);
  const [showPaymentSuccessPopup, setShowPaymentSuccessPopup] = useState(false);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const setStudentField = (index, field, value) => {
    setStudentEntries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
    setErrors((prev) => ({ ...prev, [`student-${field}-${index}`]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    const isCollegeStudent = tab === "college-student";
    const activeStudents = studentEntries.slice(0, studentCount);

    if (!isCollegeStudent) {
      if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    }
    if (!formData.gradeOrProgram) nextErrors.gradeOrProgram = "Please select an option.";
    if (!formData.institution.trim()) nextErrors.institution = "This field is required.";
    if (!formData.notes.trim()) nextErrors.notes = "Please add your goals / notes.";
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) nextErrors.phone = "Phone is required.";
    else if (!PHONE_RE.test(phoneDigits)) nextErrors.phone = "Phone number must be exactly 10 digits.";
    if (!isCollegeStudent) {
      if (!formData.email.trim()) nextErrors.email = "Email is required.";
      else if (!EMAIL_RE.test(formData.email.trim())) nextErrors.email = "Enter a valid email address.";
    }

    if (tab === "school-org" && !formData.role) nextErrors.role = "Please select your role.";
    if (tab === "college-org" && !formData.department.trim()) nextErrors.department = "Department / center is required.";
    if (tab === "school-student") {
      if (!formData.guardianEmail.trim()) nextErrors.guardianEmail = "Parent/guardian email is required.";
      else if (!EMAIL_RE.test(formData.guardianEmail.trim())) nextErrors.guardianEmail = "Enter a valid parent/guardian email.";
    }
    if (tab === "college-student") {
      if (!formData.major.trim()) nextErrors.major = "Major / focus area is required.";
      activeStudents.forEach((student, i) => {
        if (!student.name.trim()) nextErrors[`student-name-${i}`] = "Student name is required.";
        if (!student.email.trim()) nextErrors[`student-email-${i}`] = "Student email is required.";
        else if (!EMAIL_RE.test(student.email.trim())) nextErrors[`student-email-${i}`] = "Enter a valid student email.";
      });
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  useEffect(() => {
    if (!isVerifyingPayment) return undefined;
    if (verificationCountdown <= 0) return undefined;

    const timerId = window.setInterval(() => {
      setVerificationCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerId);
          setIsVerifyingPayment(false);
          setShowPaymentSuccessPopup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isVerifyingPayment, verificationCountdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isStudentFlow = tab === "college-student";
    if (!isStudentFlow) {
      window.alert("Enquiry submitted successfully.");
      return;
    }

    setVerificationCountdown(10);
    setIsVerifyingPayment(false);
    setShowPaymentSuccessPopup(false);
    setShowGpayQrPopup(true);
  };

  const startPaymentVerification = () => {
    if (isVerifyingPayment) return;
    setVerificationCountdown(10);
    setShowPaymentSuccessPopup(false);
    setIsVerifyingPayment(true);
  };

  const closePaymentFlow = () => {
    setShowPaymentSuccessPopup(false);
    setShowGpayQrPopup(false);
    setIsVerifyingPayment(false);
    setVerificationCountdown(10);
  };

  return (
    <div className={containerClassName}>
      {showHeader ? (
        <div className="mb-10 text-center">
          <SectionHeading>Start your journey</SectionHeading>
          <Lead className="mx-auto">
            Tell us a little about you and we&apos;ll take it from there to guide you in the right direction.
          </Lead>
        </div>
      ) : null}

      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:p-8">
        {!lockTab ? (
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
        ) : null}

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit}
        >
          {tab === "college-student" ? (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">How many students</span>
              <select
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 md:max-w-[18rem]"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </label>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {tab !== "college-student" ? (
              <>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-800">Full name</span>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                  />
                  {errors.fullName ? <span className="mt-1 block text-xs text-red-600">{errors.fullName}</span> : null}
                </label>
              </>
            ) : (
              Array.from({ length: studentCount }).map((_, i) => (
                <div key={`student-${i}`} className="contents">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">
                      Student Name {studentCount > 1 ? i + 1 : ""}
                    </span>
                    <input
                      type="text"
                      placeholder="Student name"
                      value={studentEntries[i].name}
                      onChange={(e) => setStudentField(i, "name", e.target.value)}
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                    />
                    {errors[`student-name-${i}`] ? (
                      <span className="mt-1 block text-xs text-red-600">{errors[`student-name-${i}`]}</span>
                    ) : null}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">
                      Student Email ID {studentCount > 1 ? i + 1 : ""}
                    </span>
                    <input
                      type="email"
                      placeholder="student@email.com"
                      value={studentEntries[i].email}
                      onChange={(e) => setStudentField(i, "email", e.target.value)}
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                    />
                    {errors[`student-email-${i}`] ? (
                      <span className="mt-1 block text-xs text-red-600">{errors[`student-email-${i}`]}</span>
                    ) : null}
                  </label>
                </div>
              ))
            )}
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
              <select
                value={formData.gradeOrProgram}
                onChange={(e) => setField("gradeOrProgram", e.target.value)}
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              >
                {tab === "school-org" ? (
                  <>
                    <option value="">Select grade range</option>
                    <option value="Middle school (Grades 6-8)">Middle school (Grades 6-8)</option>
                    <option value="Secondary (Grades 9-10)">Secondary (Grades 9-10)</option>
                    <option value="Senior secondary (Grades 11-12)">Senior secondary (Grades 11-12)</option>
                    <option value="K-12 mixed">K-12 mixed</option>
                  </>
                ) : tab === "college-org" ? (
                  <>
                    <option value="">Select institution type</option>
                    <option value="University">University</option>
                    <option value="College">College</option>
                    <option value="Research institute">Research institute</option>
                    <option value="Innovation center">Innovation center</option>
                  </>
                ) : tab === "school-student" ? (
                  <>
                    <option value="">Select grade</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </>
                ) : (
                  <>
                    <option value="">Select program</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PhD">PhD</option>
                  </>
                )}
              </select>
              {errors.gradeOrProgram ? <span className="mt-1 block text-xs text-red-600">{errors.gradeOrProgram}</span> : null}
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
                value={formData.institution}
                onChange={(e) => setField("institution", e.target.value)}
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
              {errors.institution ? <span className="mt-1 block text-xs text-red-600">{errors.institution}</span> : null}
            </label>
            {tab === "school-org" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Your role</span>
                <select
                  value={formData.role}
                  onChange={(e) => setField("role", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                >
                  <option value="">Select role</option>
                  <option value="Principal / Vice Principal">Principal / Vice Principal</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Curriculum coordinator">Curriculum coordinator</option>
                  <option value="IT / Innovation lead">IT / Innovation lead</option>
                </select>
                {errors.role ? <span className="mt-1 block text-xs text-red-600">{errors.role}</span> : null}
              </label>
            ) : null}
            {tab === "college-org" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Department / center</span>
                <input
                  type="text"
                  placeholder="e.g. Computer Science Department"
                  value={formData.department}
                  onChange={(e) => setField("department", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.department ? <span className="mt-1 block text-xs text-red-600">{errors.department}</span> : null}
              </label>
            ) : null}
            {tab === "school-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Parent/guardian email</span>
                <input
                  type="email"
                  placeholder="guardian@email.com"
                  value={formData.guardianEmail}
                  onChange={(e) => setField("guardianEmail", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.guardianEmail ? <span className="mt-1 block text-xs text-red-600">{errors.guardianEmail}</span> : null}
              </label>
            ) : null}
            {tab === "college-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Major / focus area</span>
                <input
                  type="text"
                  placeholder="e.g. Data Science"
                  value={formData.major}
                  onChange={(e) => setField("major", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.major ? <span className="mt-1 block text-xs text-red-600">{errors.major}</span> : null}
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
                value={formData.notes}
                onChange={(e) => setField("notes", e.target.value)}
                className="w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
              {errors.notes ? <span className="mt-1 block text-xs text-red-600">{errors.notes}</span> : null}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Phone</span>
              <input
                type="tel"
                placeholder="+1 ••• ••• ••••"
                value={formData.phone}
                onChange={(e) => setField("phone", e.target.value)}
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
              {errors.phone ? <span className="mt-1 block text-xs text-red-600">{errors.phone}</span> : null}
            </label>
            {tab !== "college-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Email</span>
                <input
                  type="email"
                  placeholder="you@school.edu"
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email}</span> : null}
              </label>
            ) : null}
          </div>

          <div className="flex gap-3 pt-2 sm:justify-center sm:gap-4">
            <button
              type="submit"
              disabled={isPaying}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
            >
              {tab === "school-org" || tab === "college-org" || tab === "school-student"
                ? "Enquire Now"
                : isPaying
                  ? "Processing..."
                  : "Pay Now"}
            </button>
            {tab === "school-student" ? (
              <a
                href={SCHOOL_STUDENT_APP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                App Link
              </a>
            ) : null}
          </div>
        </form>
      </div>

      {showEmailHint ? (
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
          Prefer email? Reach us directly at{" "}
          <a href="mailto:innovate@hifaiskills.io" className="font-semibold text-blue-600 hover:underline">
            innovate@hifaiskills.io
          </a>
          .
        </p>
      ) : null}

      {showGpayQrPopup ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Google Pay QR popup"
          onClick={() => {
            if (showPaymentSuccessPopup) {
              setShowGpayQrPopup(false);
            }
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_28px_70px_-40px_rgba(15,23,42,0.7)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                Payment
              </p>
              <button
                type="button"
                onClick={() => {
                  if (showPaymentSuccessPopup) {
                    setShowGpayQrPopup(false);
                  }
                }}
                disabled={!showPaymentSuccessPopup}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                aria-label="Close QR popup"
              >
                ×
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900">Google Pay QR Scanner</h3>
            <p className="mt-1 text-sm text-slate-600">
              Scan this QR using Google Pay to continue checkout.
            </p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <img
                src={sampleQrImage}
                alt="Google Pay QR code"
                className="mx-auto aspect-square w-full max-w-[260px] rounded-md border border-slate-200 bg-white object-contain p-1"
              />
            </div>

            {isVerifyingPayment ? (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                <p className="text-sm font-semibold text-amber-800">
                  Verifying payment... {verificationCountdown}s
                </p>
                <p className="mt-0.5 text-xs text-amber-700">
                  Your payment is being verified.
                </p>
              </div>
            ) : null}

            <div className="mt-4 flex justify-end gap-2">
              {!isVerifyingPayment ? (
                <button
                  type="button"
                  onClick={startPaymentVerification}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Complete Payment
                </button>
              ) : null}
              <button
                type="button"
                onClick={closePaymentFlow}
                disabled={!showPaymentSuccessPopup}
                className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(20,131,255,0.35)] transition hover:brightness-110"
              >
                Done
              </button>
            </div>

            {showPaymentSuccessPopup ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl p-4">
                <div className="relative w-full max-w-[320px] rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center shadow-[0_20px_50px_-30px_rgba(5,150,105,0.55)]">
                  <button
                    type="button"
                    onClick={closePaymentFlow}
                    className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-emerald-200 bg-white/80 text-emerald-700 transition hover:bg-white"
                    aria-label="Close success popup"
                  >
                    ×
                  </button>
                  <p className="relative text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Payment Successful
                  </p>
                  <h4 className="relative mt-2 text-lg font-bold text-emerald-900">
                    Check your email ID, we have sent the app link.
                  </h4>
                  <p className="relative mt-2 text-sm text-emerald-800">
                    You can now close this popup.
                  </p>
                  <button
                    type="button"
                    onClick={closePaymentFlow}
                    className="relative mt-4 inline-flex min-h-[38px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function GetStartedFormModal({ isOpen, onClose, initialTab }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex min-h-[100dvh] items-start justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Get Started form"
      onClick={onClose}
    >
      <div className="relative mt-8 w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-2 -top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
          aria-label="Close form popup"
        >
          <X className="h-4 w-4" />
        </button>
        <GetStartedFormPanel
          initialTab={initialTab}
          lockTab
          showHeader={false}
          showEmailHint={false}
          containerClassName="mx-auto w-full"
        />
      </div>
    </div>,
    document.body
  );
}

export function GetStartedBody() {
  const location = useLocation();
  return <GetStartedFormPanel initialTab={getInitialTabFromSearch(location.search)} />;
}
