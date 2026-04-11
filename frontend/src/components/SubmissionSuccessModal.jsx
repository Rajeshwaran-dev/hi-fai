import { createPortal } from "react-dom";
import { CheckCircle2, ShieldCheck, Sparkles, X } from "lucide-react";

export default function SubmissionSuccessModal({
  open,
  title = "Submission received successfully",
  description = "Thank you for your interest. Our team will review your details and contact you shortly.",
  onClose,
  refreshOnClose = true,
}) {
  if (!open) return null;

  const handleClose = () => {
    if (onClose) onClose();
    if (refreshOnClose) {
      window.setTimeout(() => {
        window.location.reload();
      }, 80);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-[3px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/35 bg-white shadow-[0_35px_90px_rgba(2,6,23,0.48)]"
      >
        <div className="pointer-events-none absolute -left-16 -top-14 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-indigo-500/20 blur-2xl" />

        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/35 bg-white/90 p-1.5 text-slate-500 transition hover:text-slate-800"
          aria-label="Close success popup"
        >
          <X size={16} />
        </button>

        <div
          className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-6 py-6 text-white"
          style={{ fontFamily: "'Geom', 'Avenir Next', 'Segoe UI', Arial, sans-serif" }}
        >
          <div className="mb-3 inline-flex rounded-full border border-white/35 bg-white/15 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
            <CheckCircle2 size={22} />
          </div>
          <h3 className="text-xl font-semibold leading-tight">{title}</h3>
          <p className="mt-1.5 text-sm text-emerald-50/95">{description}</p>
        </div>

        <div className="px-6 py-5" style={{ fontFamily: "'Geom', 'Avenir Next', 'Segoe UI', Arial, sans-serif" }}>
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-cyan-50 px-4 py-3 text-sm text-emerald-900">
            <p className="flex items-center gap-2 text-[13px] font-semibold">
              <Sparkles size={15} />
              Your details are securely submitted.
            </p>
            <p className="mt-1.5 text-[13px] text-emerald-900/80">
              We usually respond within 1-2 business days.
            </p>
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-slate-500" />
              Confirmation sent. Your enquiry has been recorded in our system.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.25)] transition hover:opacity-95"
          >
            Continue
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
