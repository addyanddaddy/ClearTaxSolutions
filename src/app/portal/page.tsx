"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  Shield,
  FileText,
  CreditCard,
  MessageSquare,
  Lock,
  CheckCircle,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export default function PortalEntryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(user.role === "admin" ? "/portal/dashboard" : "/portal/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) return null;

  const benefits = [
    {
      icon: Briefcase,
      title: "Track Your Cases",
      description: "Monitor the status of all your tax cases in real-time with detailed progress tracking.",
    },
    {
      icon: FileText,
      title: "Upload Documents Securely",
      description: "Securely upload and manage all your tax documents in one centralized location.",
    },
    {
      icon: CreditCard,
      title: "Make Payments",
      description: "View invoices and make secure payments online through our Square-powered platform.",
    },
    {
      icon: MessageSquare,
      title: "Message Your EA Directly",
      description: "Communicate directly with Joseph Gasana, EA, about your tax matters.",
    },
  ];

  const trustSignals = [
    { icon: Lock, label: "256-bit Encryption" },
    { icon: Shield, label: "Secure Portal" },
    { icon: CheckCircle, label: "Google Workspace Powered" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-500 via-navy-600 to-navy-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Secure Client Portal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Client Portal
          </h1>
          <p className="text-xl text-navy-100 max-w-2xl mx-auto mb-10">
            Access your tax documents, track case progress, make payments, and communicate
            directly with your Enrolled Agent — all in one secure place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/portal/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200 text-lg shadow-lg shadow-teal-500/25"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portal/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 text-lg border border-white/20"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Everything You Need in One Place
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Our client portal puts you in control of your tax experience with powerful tools
          and direct access to your Enrolled Agent.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.label} className="flex items-center gap-2 text-gray-500">
                  <Icon className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-medium">{signal.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
