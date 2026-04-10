import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarClock,
  MessageCircleHeart,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import SubmissionSuccessModal from "../components/SubmissionSuccessModal.jsx";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion.js";
import { Services } from "./Home.jsx";
import chatgptIcon from "../assets/images/chatgpt.png?url";
import claudeIcon from "../assets/images/claude.png?url";
import grokIcon from "../assets/images/grok.png?url";
import deepseekIcon from "../assets/images/deepseek.png?url";
import hyperledgerIcon from "../assets/images/hyperledger.png?url";
import ethereumIcon from "../assets/images/ethereum.png?url";
import rippleIcon from "../assets/images/ripple.png?url";

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3003";
const sanitizeEmailInput = (value = "") =>
  String(value).replace(/[^a-zA-Z0-9@._-]/g, "");
const sanitizePhoneInput = (value = "") =>
  String(value).replace(/\D/g, "").slice(0, 10);

const GRADE_OPTIONS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];
/** Preferred time-of-day slots (Learning Hub tutor request). */
const PREFERRED_TIME_OPTIONS = [{ value: "6-8", label: "6 AM to 8 PM IST" }];
const BOARD_OPTIONS = ["State", "CBSE", "ICSE", "Matric"];
const AVAILABLE_DAY_OPTIONS = [
  { value: "Monday", label: "Monday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Friday", label: "Friday" },
];
/** dayjs `.day()`: 0 Sun … 6 Sat — only Mon / Wed / Fri are bookable. */
const ALLOWED_BOOKING_WEEKDAYS = new Set([1, 3, 5]);
const ALLOWED_SLOT_DAY_VALUES = new Set(
  AVAILABLE_DAY_OPTIONS.map((o) => o.value),
);

function isAllowedBookingDate(d) {
  if (!d || !d.isValid()) return false;
  if (d.startOf("day").isBefore(dayjs().startOf("day"))) return false;
  return ALLOWED_BOOKING_WEEKDAYS.has(d.day());
}
const AI_REFERENCE_TOOLS = [
  {
    name: "ChatGPT",
    url: "https://chatgpt.com",
    iconUrl: chatgptIcon,
    description:
      "A versatile AI assistant for writing, coding, research, and idea generation. Great for drafting content and solving technical problems quickly.",
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    iconUrl: claudeIcon,
    description:
      "Known for long-context reasoning and high-quality responses. Useful for structured analysis, deep reading, and thoughtful drafting.",
  },
  {
    name: "Grok",
    url: "https://grok.com",
    iconUrl: grokIcon,
    description:
      "An AI model designed for fast conversational exploration and current-topic discovery. Helpful for quick brainstorming and trend-focused prompts.",
  },
  {
    name: "DeepSeek",
    url: "https://chat.deepseek.com",
    iconUrl: deepseekIcon,
    description:
      "A strong coding and reasoning assistant suitable for technical tasks. Often used for problem-solving, debugging, and concise explanations.",
  },
];

const BLOCKCHAIN_REFERENCE_TOOLS = [
  {
    name: "Hyperledger (By Linux Foundation)",
    url: "https://www.hyperledger.org/",
    iconUrl: hyperledgerIcon,
    description:
      "An open ecosystem of enterprise blockchain frameworks and tools stewarded by the Linux Foundation—used to build permissioned networks, digital identity, and trusted record-keeping across industries.",
  },
  {
    name: "Ethereum",
    url: "https://ethereum.org/",
    iconUrl: ethereumIcon,
    description:
      "A decentralized platform for smart contracts and applications, powering tokens, DeFi, and Web3 with a large global community and the Ethereum Virtual Machine.",
  },
  {
    name: "Ripple",
    url: "https://ripple.com/",
    iconUrl: rippleIcon,
    description:
      "Payments and settlement technology focused on fast cross-border transfers and liquidity, widely adopted by financial institutions alongside the XRP Ledger ecosystem.",
  },
];

function LearningHubRequestFormSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    grade: "",
    date: "",
    hour: "",
    preferredDate: "",
    board: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const dayOptions = useMemo(() => AVAILABLE_DAY_OPTIONS, []);

  const preferredDatePickerValue = useMemo(() => {
    if (!form.preferredDate) return null;
    const d = dayjs(form.preferredDate, "YYYY-MM-DD", true);
    return isAllowedBookingDate(d) ? d : null;
  }, [form.preferredDate]);

  useEffect(() => {
    if (!form.preferredDate) return;
    const d = dayjs(form.preferredDate, "YYYY-MM-DD", true);
    if (!isAllowedBookingDate(d)) {
      setForm((prev) => ({ ...prev, preferredDate: "" }));
    }
  }, [form.preferredDate]);

  const setField = (key, value) => {
    const nextValue =
      key === "email"
        ? sanitizeEmailInput(value)
        : key === "phone"
          ? sanitizePhoneInput(value)
          : value;
    setForm((prev) => ({ ...prev, [key]: nextValue }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!/^\d{10}$/.test(form.phone)) {
      next.phone = "Phone number must be exactly 10 digits.";
    }
    if (!form.email.trim()) next.email = "Email is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.grade) next.grade = "Please select a grade.";
    if (!form.date) next.date = "Please select a day.";
    if (form.date && !ALLOWED_SLOT_DAY_VALUES.has(form.date)) {
      next.date = "Choose Monday, Wednesday, or Friday.";
    }
    if (!form.hour) next.hour = "Please select a preferred time.";
    if (
      form.hour &&
      !PREFERRED_TIME_OPTIONS.some((o) => o.value === form.hour)
    ) {
      next.hour = "Choose 6 to 8.";
    }
    if (!form.preferredDate) {
      next.preferredDate = "Please select a preferred date.";
    } else {
      const pd = dayjs(form.preferredDate, "YYYY-MM-DD", true);
      if (!pd.isValid()) {
        next.preferredDate = "Please select a valid date.";
      } else if (!ALLOWED_BOOKING_WEEKDAYS.has(pd.day())) {
        next.preferredDate =
          "Only Monday, Wednesday, or Friday can be selected.";
      } else if (pd.startOf("day").isBefore(dayjs().startOf("day"))) {
        next.preferredDate = "Choose today or a future date.";
      }
    }
    if (!form.board) next.board = "Please select a board.";

    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const preferredTimeLabel =
        PREFERRED_TIME_OPTIONS.find((o) => o.value === form.hour)?.label ??
        form.hour;
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: "Learning Hub - School Inquiry",
        message: [
          `Phone: ${form.phone}`,
          `Grade: ${form.grade}`,
          `Available Day: ${form.date}`,
          `Preferred Time: ${preferredTimeLabel}`,
          `Preferred Date: ${form.preferredDate}`,
          `Board: ${form.board}`,
        ].join("\n"),
      };

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setShowSuccessPopup(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        grade: "",
        date: "",
        hour: "",
        preferredDate: "",
        board: "",
      });
    } catch (_error) {
      setSubmitError("Could not send request right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldBase =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50/35 px-4 pt-14 pb-10 md:px-8 md:pt-8 md:pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl rounded-[1.7rem] border border-blue-100/80 bg-white/90 p-6 shadow-[0_24px_70px_-36px_rgba(37,99,235,0.45)] backdrop-blur-sm md:p-9">
        <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          For Students
        </p>
        <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl mb-8">
          Hi 👋 <br></br> I am your personal tutor specialist One-on-One or{" "}
          <br></br> live via internet Maths Any Time
        </h2>
        <p className="mt-2 text-base font-semibold text-blue-700 md:text-lg">
          Ready? Lets look open Slots🔍
        </p>

        {submitError ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        ) : null}

        <form
          onSubmit={onSubmit}
          className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className={`${fieldBase} ${errors.name ? "border-red-400 focus:ring-red-200" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.name ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Phone number *
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              inputMode="numeric"
              maxLength={10}
              pattern="[0-9]{10}"
              className={`${fieldBase} ${errors.phone ? "border-red-400 focus:ring-red-200" : ""}`}
              placeholder="Enter phone number"
            />
            {errors.phone ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Email *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className={`${fieldBase} ${errors.email ? "border-red-400 focus:ring-red-200" : ""}`}
              placeholder="Enter email address"
            />
            {errors.email ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Grade *
            </label>
            <select
              value={form.grade}
              onChange={(e) => setField("grade", e.target.value)}
              className={`${fieldBase} ${errors.grade ? "border-red-400 focus:ring-red-200" : ""}`}
            >
              <option value="">Select grade</option>
              {GRADE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.grade ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.grade}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Available slots *
            </label>
            <select
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
              className={`${fieldBase} ${errors.date ? "border-red-400 focus:ring-red-200" : ""}`}
            >
              <option value="">Select day</option>
              {dayOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.date ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.date}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Preferred Date *
            </label>
            <div
              className={`rounded-xl border bg-white px-2 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${
                errors.preferredDate
                  ? "border-red-400 focus-within:ring-2 focus-within:ring-red-200"
                  : "border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
              }`}
            >
              <DatePicker
                value={preferredDatePickerValue}
                onChange={(d) =>
                  setField("preferredDate", d ? d.format("YYYY-MM-DD") : "")
                }
                format="ddd, D MMM YYYY"
                placeholder="Select preferred date (Mon / Wed / Fri)"
                className="!w-full"
                needConfirm={false}
                disabledDate={(current) =>
                  current ? !isAllowedBookingDate(current) : false
                }
              />
            </div>
            {errors.preferredDate ? (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.preferredDate}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Preferred time (hour) *
            </label>
            <select
              value={form.hour}
              onChange={(e) => setField("hour", e.target.value)}
              className={`${fieldBase} ${errors.hour ? "border-red-400 focus:ring-red-200" : ""}`}
            >
              <option value="">Select time slot</option>
              {PREFERRED_TIME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.hour ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.hour}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Board *
            </label>
            <select
              value={form.board}
              onChange={(e) => setField("board", e.target.value)}
              className={`${fieldBase} ${errors.board ? "border-red-400 focus:ring-red-200" : ""}`}
            >
              <option value="">Select board</option>
              {BOARD_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.board ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.board}</p>
            ) : null}
          </div>

          <div className="md:col-span-2 lg:col-span-3 text-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,131,255,0.35)] transition hover:brightness-110 md:text-base"
            >
              {submitting ? "Sending..." : "Request"}
            </button>
          </div>
        </form>
      </div>
      <SubmissionSuccessModal
        open={showSuccessPopup}
        title="Request submitted successfully"
        description="Our learning team will review your details and reach out to you soon."
        onClose={() => setShowSuccessPopup(false)}
      />
    </section>
  );
}

function ExpertGuidanceQuickForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const setField = (key, value) => {
    const nextValue =
      key === "email"
        ? sanitizeEmailInput(value)
        : key === "phone"
          ? sanitizePhoneInput(value)
          : value;
    setForm((prev) => ({ ...prev, [key]: nextValue }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!/^\d{10}$/.test(form.phone)) {
      next.phone = "Phone number must be exactly 10 digits.";
    }
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: "Learning Hub - Expert session callback",
        message: `Phone: ${form.phone}`,
      };
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setShowSuccess(true);
      setForm({ name: "", email: "", phone: "" });
    } catch {
      setSubmitError("Could not send right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-400 backdrop-blur-sm focus:border-cyan-400/80 focus:outline-none focus:ring-2 focus:ring-cyan-400/25";

  return (
    <div className="min-w-0">
      <div className="rounded-[1.7rem] border border-blue-200/70 bg-gradient-to-br from-slate-900 via-[#0f2b4d] to-[#0b1f38] p-7 text-white shadow-[0_30px_80px_-34px_rgba(15,23,42,0.8)] md:p-9">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
          Quick contact
        </p>
        <h3 className="mt-2 text-xl font-bold leading-tight md:text-2xl">
          We&apos;ll reach out to you
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">
          Share your name, email, and phone — our team will contact you about an
          expert session.
        </p>

        {submitError ? (
          <div className="mt-4 rounded-xl border border-rose-400/40 bg-rose-500/15 px-3 py-2 text-sm text-rose-100">
            {submitError}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="expert-callback-name" className="mb-1 block text-xs font-medium text-slate-200">
              Name *
            </label>
            <input
              id="expert-callback-name"
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              autoComplete="name"
              className={`${inputClass} ${errors.name ? "border-rose-400/70 ring-1 ring-rose-400/30" : ""}`}
              placeholder="Your name"
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-rose-300">{errors.name}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="expert-callback-email" className="mb-1 block text-xs font-medium text-slate-200">
              Email *
            </label>
            <input
              id="expert-callback-email"
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              autoComplete="email"
              className={`${inputClass} ${errors.email ? "border-rose-400/70 ring-1 ring-rose-400/30" : ""}`}
              placeholder="you@example.com"
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-rose-300">{errors.email}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="expert-callback-phone" className="mb-1 block text-xs font-medium text-slate-200">
              Phone number *
            </label>
            <input
              id="expert-callback-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
              className={`${inputClass} ${errors.phone ? "border-rose-400/70 ring-1 ring-rose-400/30" : ""}`}
              placeholder="10-digit mobile number"
            />
            {errors.phone ? (
              <p className="mt-1 text-xs text-rose-300">{errors.phone}</p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400 hover:shadow-xl disabled:opacity-60 md:text-base"
          >
            {submitting ? "Sending…" : "Submit"}
          </button>
        </form>
      </div>
      <SubmissionSuccessModal
        open={showSuccess}
        title="Submitted successfully"
        description="Thanks — we received your details and will contact you soon."
        onClose={() => setShowSuccess(false)}
        refreshOnClose={false}
      />
    </div>
  );
}

function ExpertGuidanceSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50/40 px-4 py-14 md:px-8 md:py-18">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-8 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="rounded-[1.7rem] border border-blue-100/80 bg-white/85 p-7 shadow-[0_24px_70px_-36px_rgba(37,99,235,0.45)] backdrop-blur-sm md:p-9">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            For Teachers, Professors and Organizations
          </p>

          <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
            Get Our Expert Guidence for 21st Century Skills
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Plan your next learning steps with one-to-one expert
            recommendations, personalized mentoring, and focused guidance
            designed around your goals.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">
              <MessageCircleHeart
                className="h-4 w-4 text-blue-600"
                aria-hidden
              />
              Personalized consultation
            </div>
          </div>
        </div>

        <ExpertGuidanceQuickForm />
      </div>
    </section>
  );
}

function LearningHubReferenceCard({ tool, accent }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.25)] ring-1 ring-transparent transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 ${accent.ring} hover:shadow-[0_28px_65px_-30px_rgba(37,99,235,0.45)]`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.topBand}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${accent.glow} blur-2xl`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-100/40 to-cyan-100/20 blur-xl"
      />

      <div className="flex items-start gap-3">
        <div
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${accent.chip}`}
        >
          <img
            src={tool.iconUrl}
            alt=""
            className="h-8 w-8 object-contain"
            loading="lazy"
          />
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`min-w-0 text-lg font-bold leading-snug text-slate-900 underline decoration-blue-300 underline-offset-4 transition ${accent.title} hover:decoration-blue-500`}
        >
          {tool.name}
        </a>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {tool.description}
      </p>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-blue-200/80 via-cyan-200/70 to-transparent" />
    </article>
  );
}

function LearningHubReferencesSection() {
  const accentStyles = [
    {
      chip: "from-emerald-500/15 to-blue-500/15 border-emerald-200/70",
      glow: "from-emerald-300/25 to-blue-300/20",
      ring: "group-hover:ring-emerald-300/45",
      title: "group-hover:text-emerald-700",
      topBand: "from-emerald-500/90 via-blue-500/80 to-cyan-500/75",
      cta: "from-emerald-500 to-blue-500",
    },
    {
      chip: "from-orange-500/15 to-violet-500/15 border-orange-200/70",
      glow: "from-orange-300/25 to-violet-300/20",
      ring: "group-hover:ring-orange-300/45",
      title: "group-hover:text-orange-700",
      topBand: "from-orange-500/90 via-fuchsia-500/80 to-violet-500/75",
      cta: "from-orange-500 to-violet-500",
    },
    {
      chip: "from-slate-500/15 to-indigo-500/15 border-slate-300/70",
      glow: "from-slate-300/25 to-indigo-300/20",
      ring: "group-hover:ring-slate-300/45",
      title: "group-hover:text-slate-800",
      topBand: "from-slate-600/90 via-indigo-500/80 to-blue-500/75",
      cta: "from-slate-700 to-indigo-600",
    },
    {
      chip: "from-blue-500/15 to-cyan-500/15 border-blue-200/70",
      glow: "from-blue-300/25 to-cyan-300/20",
      ring: "group-hover:ring-cyan-300/45",
      title: "group-hover:text-cyan-700",
      topBand: "from-blue-500/90 via-cyan-500/80 to-sky-500/75",
      cta: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-8 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-12 h-64 w-64 rounded-full bg-blue-300/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-2 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-7 md:mb-9">
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {/* References placing card holder with link */}
            Top AI Platforms for Productivity
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {AI_REFERENCE_TOOLS.map((tool, idx) => (
            <LearningHubReferenceCard
              key={tool.name}
              tool={tool}
              accent={accentStyles[idx % accentStyles.length]}
            />
          ))}
        </div>

        <h3 className="mb-4 mt-10 text-lg font-bold tracking-tight text-slate-900 md:mb-5 md:mt-12 md:text-xl">
          Blockchain platforms
        </h3>
        <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {BLOCKCHAIN_REFERENCE_TOOLS.map((tool, idx) => (
            <LearningHubReferenceCard
              key={tool.name}
              tool={tool}
              accent={accentStyles[(idx + 1) % accentStyles.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function LearningHubBody() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <ExpertGuidanceSection />
      <LearningHubRequestFormSection />
      <Services reducedMotion={reducedMotion} isMobile={isMobile} />

      <LearningHubReferencesSection />
    </>
  );
}
