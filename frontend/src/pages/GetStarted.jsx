import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Lead, SectionHeading } from "./subpageShared.jsx";
import sampleQrImage from "../assets/images/qr.jpeg?url";

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

const SCHOOL_STUDENT_APP_LINK = "/students/school-students";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3003";

const GHL_FORMS = {
  "school-org": {
    src: "https://hl.hifaiskills.com/widget/form/7Vuyw1toiIixml2HJSdT",
    id: "inline-7Vuyw1toiIixml2HJSdT",
    name: "School",
    height: "633",
    formId: "7Vuyw1toiIixml2HJSdT"
  },
  "college-org": {
    src: "https://hl.hifaiskills.com/widget/form/tldvVwdJwGjvjk8Y4bX8",
    id: "inline-tldvVwdJwGjvjk8Y4bX8",
    name: "Universities",
    height: "636",
    formId: "tldvVwdJwGjvjk8Y4bX8"
  },
  "school-student": {
    src: "https://hl.hifaiskills.com/widget/form/niAmxyyGgdJIsHytD9cg",
    id: "inline-niAmxyyGgdJIsHytD9cg",
    name: "School Students - Copy",
    height: "1153",
    formId: "niAmxyyGgdJIsHytD9cg"
  },
  "college-student": {
    src: "https://hl.hifaiskills.com/widget/form/jgZyf5prTZzx5OneWgsW",
    id: "inline-jgZyf5prTZzx5OneWgsW",
    name: "College Students",
    height: "657",
    formId: "jgZyf5prTZzx5OneWgsW"
  }
};

export function GetStartedFormPanel({
  initialTab = "school-org",
  lockTab = false,
  showHeader = true,
  showEmailHint = true,
  containerClassName = "mx-auto w-full max-w-6xl",
}) {
  const [tab, setTab] = useState(initialTab);


  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleMessage = async (event) => {
      const data = event.data;
      if (!data) return;

      let isGHLSubmit = false;
      let formData = {};

      // Detect common GoHighLevel postMessage submission formats
      if (typeof data === "string" && (data === "form-submit" || data.includes("form_submit"))) {
        isGHLSubmit = true;
      } else if (Array.isArray(data) && data[0] === "form-submit") {
        isGHLSubmit = true;
        formData = data[1] || {};
      } else if (data.type === "FORM_SUBMITTED" || data.type === "ghl_form_submitted" || data.message === "ghl_form_submitted") {
        isGHLSubmit = true;
        formData = data.formData || data.data || data || {};
      }

      if (isGHLSubmit) {
        // Attempt to map GoHighLevel fields to our backend format
        const name = formData.name || formData.fullName || formData.first_name || "GoHighLevel Lead";
        const email = formData.email || "no-email-provided@ghl.com";
        const phone = formData.phone || "N/A";
        
        try {
          await fetch(`${API_BASE_URL}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              email: email,
              subject: `Get Started Inquiry - ${tab}`,
              message: `Form submitted via GoHighLevel on the ${tab} tab.\n\nPhone: ${phone}\n\nNote: This data was intercepted from a GoHighLevel iframe. Raw Payload: ${JSON.stringify(formData)}`,
              recipientRoute: tab === "college-student" ? "college_students" : "default",
            }),
          });
        } catch (error) {
          console.error("Failed to sync GHL submission to local backend:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [tab]);

  useEffect(() => {
    const scriptId = "ghl-form-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://hl.hifaiskills.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={containerClassName}>
      {showHeader ? (
        <div className="mb-10 grid items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:grid-cols-[minmax(0,1fr)_260px] md:gap-8 md:p-7">
          <div className="text-center md:text-left">
            <SectionHeading className="mb-2">Start your journey</SectionHeading>
            <Lead className="mx-auto md:mx-0">
              Tell us a little about you and we&apos;ll take it from there to guide you in the right direction.
            </Lead>
          </div>

          <div className="mx-auto w-full max-w-[220px] md:mx-0 md:justify-self-end">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
              <img
                src={sampleQrImage}
                alt="HiFAI quick access QR code"
                className="mx-auto aspect-square w-full rounded-lg border border-slate-200 bg-white object-contain p-1"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
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

        {(() => {
          const config = GHL_FORMS[tab];
          if (!config) return null;
          return (
            <div className="mt-6 w-full" style={{ minHeight: `${config.height}px` }}>
              <iframe
                src={config.src}
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
                id={config.id}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={config.name}
                data-height={config.height}
                data-layout-iframe-id={config.id}
                data-form-id={config.formId}
                title={config.name}
              />
            </div>
          );
        })()}

        {tab === "school-student" ? (
          <div className="mt-6 flex justify-center">
            <a
              href={SCHOOL_STUDENT_APP_LINK}
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              ENTHIRAN APP LINK
            </a>
          </div>
        ) : null}
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


      {/* 
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
            {tab === "college-student" && getCollegeTotalAmount(studentCount) ? (
              <p className="mt-3 rounded-lg border border-blue-100 bg-blue-50/80 px-3 py-2 text-center text-sm font-semibold text-blue-950">
                Amount due: {formatPayAmountInr(getCollegeTotalAmount(studentCount))}
              </p>
            ) : null}

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
                <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/95 p-6 text-center backdrop-blur-sm">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Payment Successful</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Your details have been recorded.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      */}
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
