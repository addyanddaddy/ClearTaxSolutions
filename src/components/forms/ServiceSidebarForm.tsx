"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const sidebarSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Enter a valid phone number"
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  description: z.string().optional(),
});

type SidebarFormData = z.infer<typeof sidebarSchema>;

interface ServiceSidebarFormProps {
  serviceCategory: string;
  className?: string;
}

export default function ServiceSidebarForm({
  serviceCategory,
  className = "",
}: ServiceSidebarFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SidebarFormData>({
    resolver: zodResolver(sidebarSchema),
  });

  const onSubmit = async (data: SidebarFormData) => {
    try {
      // Placeholder for EmailJS/Resend integration
      console.log("Sidebar form submission:", { ...data, serviceCategory });

      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitted(true);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again or call us directly.");
    }
  };

  if (submitted) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center ${className}`}>
        <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-navy-500 mb-2">Thank You!</h3>
        <p className="text-gray-600 text-sm mb-4">
          We will reach out within 24 hours about your {serviceCategory.toLowerCase()} needs.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-teal-500 font-medium hover:text-teal-600 text-sm"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <h3 className="text-lg font-bold text-navy-500 mb-1">
        Get a Free Quote
      </h3>
      <p className="text-gray-500 text-sm mb-4">
        {serviceCategory} — fast response guaranteed.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <div>
          <label htmlFor="sidebar-name" className="label-text">
            Name
          </label>
          <input
            id="sidebar-name"
            type="text"
            className={`input-field text-sm py-2.5 ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="Your full name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="sidebar-phone" className="label-text">
            Phone
          </label>
          <input
            id="sidebar-phone"
            type="tel"
            className={`input-field text-sm py-2.5 ${errors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="(555) 123-4567"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="sidebar-email" className="label-text">
            Email
          </label>
          <input
            id="sidebar-email"
            type="email"
            className={`input-field text-sm py-2.5 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="sidebar-description" className="label-text">
            Brief Description{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="sidebar-description"
            rows={3}
            className="input-field text-sm py-2.5 resize-none"
            placeholder="Tell us briefly about your situation..."
            {...register("description")}
          />
        </div>

        {/* Hidden service category */}
        <input type="hidden" value={serviceCategory} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3 text-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Request Free Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400 mb-2">Or call us directly</p>
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="inline-flex items-center gap-1.5 text-navy-500 font-semibold hover:text-teal-500 transition-colors"
        >
          <Phone className="w-4 h-4" />
          {SITE_CONFIG.phone}
        </a>
      </div>
    </div>
  );
}
