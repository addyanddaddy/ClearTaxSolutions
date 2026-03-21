"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Check,
  User,
  Building2,
  ShieldCheck,
  DollarSign,
  Users,
  TrendingUp,
  Landmark,
} from "lucide-react";

const SERVICES = [
  { id: "individual", label: "Individual Tax Preparation", icon: User },
  { id: "business", label: "Business Tax Preparation", icon: Building2 },
  { id: "irs-audit", label: "IRS Audit Representation", icon: ShieldCheck },
  { id: "tax-debt", label: "Tax Debt Resolution", icon: DollarSign },
  { id: "payroll", label: "Payroll Tax Services", icon: Users },
  { id: "tax-planning", label: "Tax Planning & Strategy", icon: TrendingUp },
  { id: "estate-trust", label: "Estate & Trust Tax", icon: Landmark },
];

const REFERRAL_SOURCES = [
  "Google Search",
  "Social Media",
  "Friend or Family Referral",
  "Professional Referral",
  "Online Advertisement",
  "IRS Website",
  "Local Community",
  "Other",
];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    serviceNeeded: [] as string[],
    hearAboutUs: "",
    taxSituation: "",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceNeeded: prev.serviceNeeded.includes(serviceId)
        ? prev.serviceNeeded.filter((s) => s !== serviceId)
        : [...prev.serviceNeeded, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.serviceNeeded.length === 0) {
      setError("Please select at least one service");
      return;
    }
    if (!formData.termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const result = register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      serviceNeeded: formData.serviceNeeded.map((id) => {
        const service = SERVICES.find((s) => s.id === id);
        return service?.label || id;
      }),
      hearAboutUs: formData.hearAboutUs,
      taxSituation: formData.taxSituation,
    });

    if (result.success) {
      router.push("/portal/dashboard");
    } else {
      setError(result.error || "Registration failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-500 via-navy-600 to-navy-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/portal" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Clear Tax Solutions</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Create Your Client Account</h1>
          <p className="text-navy-100 text-lg">Get started with your secure tax portal in minutes</p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 pb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="label-text">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                    className="input-field"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="label-text">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                    className="input-field"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label-text">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="input-field"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="label-text">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="input-field"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Password</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="label-text">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                      className="input-field pr-12"
                      placeholder="Min. 6 characters"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="label-text">
                    Confirm Password *
                  </label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((p) => ({ ...p, confirmPassword: e.target.value }))}
                    className="input-field"
                    placeholder="Repeat password"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Services Needed *</h2>
              <p className="text-sm text-gray-500 mb-4">
                Select all the services you&apos;re interested in. You can always add more later.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SERVICES.map((service) => {
                  const Icon = service.icon;
                  const selected = formData.serviceNeeded.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selected
                          ? "border-teal-500 bg-teal-50 ring-1 ring-teal-500/20"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selected ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-sm font-medium leading-tight ${
                          selected ? "text-teal-700" : "text-gray-700"
                        }`}
                      >
                        {service.label}
                      </span>
                      {selected && (
                        <div className="absolute top-2 right-2">
                          <Check className="w-4 h-4 text-teal-500" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="hearAboutUs" className="label-text">
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={(e) => setFormData((p) => ({ ...p, hearAboutUs: e.target.value }))}
                    className="input-field"
                  >
                    <option value="">Select an option</option>
                    {REFERRAL_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="taxSituation" className="label-text">
                    Brief description of your tax situation
                  </label>
                  <textarea
                    id="taxSituation"
                    value={formData.taxSituation}
                    onChange={(e) => setFormData((p) => ({ ...p, taxSituation: e.target.value }))}
                    className="input-field min-h-[100px] resize-y"
                    placeholder="Tell us a bit about your tax needs, any deadlines, or specific concerns..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="border-t border-gray-100 pt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData((p) => ({ ...p, termsAccepted: e.target.checked }))}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <button type="button" className="text-teal-600 hover:underline font-medium">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-teal-600 hover:underline font-medium">
                    Privacy Policy
                  </button>
                  . I understand that my information will be handled securely and used solely for
                  tax preparation purposes.
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating your account...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/portal/login" className="text-teal-600 hover:text-teal-700 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Your data is protected with 256-bit encryption
        </p>
      </div>
    </div>
  );
}
