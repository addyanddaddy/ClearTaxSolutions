"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
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
  serviceNeeded: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadCaptureFormProps {
  heading?: string;
  subheading?: string;
  className?: string;
}

export default function LeadCaptureForm({
  heading = "Get Your Free Tax Consultation",
  subheading = "Tell us about your situation and we will reach out within 24 hours.",
  className = "",
}: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    try {
      // Placeholder for EmailJS/Resend integration
      console.log("Lead form submission:", data);

      // Simulate network request
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
      <div className={`bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-navy-500 mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600 mb-4">
          We have received your information and will be in touch within 24 hours.
        </p>
        <p className="text-sm text-gray-500">
          Check your email for a confirmation. If you need immediate help, call
          us directly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-teal-500 font-medium hover:text-teal-600 text-sm"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-2xl p-6 sm:p-8 ${className}`}>
      {heading && (
        <h2 className="text-xl font-bold text-navy-500 mb-1">{heading}</h2>
      )}
      {subheading && (
        <p className="text-gray-500 text-sm mb-6">{subheading}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-firstName" className="label-text">
              First Name
            </label>
            <input
              id="lead-firstName"
              type="text"
              className={`input-field ${errors.firstName ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="John"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lead-lastName" className="label-text">
              Last Name
            </label>
            <input
              id="lead-lastName"
              type="text"
              className={`input-field ${errors.lastName ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="Smith"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="lead-phone" className="label-text">
            Phone Number
          </label>
          <input
            id="lead-phone"
            type="tel"
            className={`input-field ${errors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="(555) 123-4567"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="lead-email" className="label-text">
            Email Address
          </label>
          <input
            id="lead-email"
            type="email"
            className={`input-field ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="john@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Service Needed */}
        <div>
          <label htmlFor="lead-service" className="label-text">
            What do you need help with?
          </label>
          <select
            id="lead-service"
            className={`input-field ${errors.serviceNeeded ? "border-red-500 focus:ring-red-500" : ""}`}
            {...register("serviceNeeded")}
          >
            <option value="">Select a service...</option>
            {SERVICE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.serviceNeeded && (
            <p className="text-red-500 text-xs mt-1">{errors.serviceNeeded.message}</p>
          )}
        </div>

        {/* Message (Optional) */}
        <div>
          <label htmlFor="lead-message" className="label-text">
            Message <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="lead-message"
            rows={3}
            className="input-field resize-none"
            placeholder="Briefly describe your tax situation..."
            {...register("message")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full text-lg py-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Get My Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-3 text-center">
        No spam. No obligation. Your information is kept confidential.
      </p>
    </div>
  );
}
