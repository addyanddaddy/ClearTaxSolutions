"use client";

import { useState, useEffect, useCallback } from "react";
import { X, FileDown, ArrowRight, Loader2 } from "lucide-react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showPopup = useCallback(() => {
    // Only show once per session
    if (sessionStorage.getItem("exitIntentShown")) return;
    sessionStorage.setItem("exitIntentShown", "true");
    setVisible(true);
  }, []);

  useEffect(() => {
    // Desktop only: detect cursor leaving viewport toward browser bar
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return;

    const handleMouseOut = (e: MouseEvent) => {
      // Only trigger when cursor moves above the viewport (toward browser bar/tabs)
      if (e.clientY <= 0 && e.relatedTarget === null) {
        showPopup();
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, [showPopup]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    try {
      // Placeholder for email capture integration
      console.log("Exit intent email capture:", email);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitted(true);
    } catch (error) {
      console.error("Exit intent form error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Free Tax Prep Checklist"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        style={{
          animation: "exitPopupSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Header */}
        <div className="gradient-navy px-6 pt-8 pb-6 text-center">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <FileDown className="w-7 h-7 text-teal-300" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Wait! Before You Go...
          </h2>
          <p className="text-navy-100 text-sm mt-2">
            Download our free 2024 Tax Prep Checklist
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center mx-auto mb-3">
                <FileDown className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy-500 mb-2">Check Your Email!</h3>
              <p className="text-gray-600 text-sm">
                Your free Tax Prep Checklist is on its way. Check your inbox
                in the next few minutes.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 text-teal-500 font-medium text-sm hover:text-teal-600"
              >
                Close this window
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-sm mb-4 text-center">
                Know exactly which documents you need before filing.
                Stay organized, avoid delays, and maximize your refund.
              </p>

              <ul className="space-y-2 mb-5">
                {[
                  "Complete document checklist for individuals",
                  "Business filing requirements breakdown",
                  "Common deductions you might be missing",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-3"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Download Free Checklist
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-400 mt-3 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Inline animation keyframes */}
      <style jsx>{`
        @keyframes exitPopupSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
