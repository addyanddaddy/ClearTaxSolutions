"use client";

import Link from "next/link";
import { ArrowRight, Calculator, Info } from "lucide-react";

interface CalculatorCTAProps {
  className?: string;
}

export default function CalculatorCTA({ className = "" }: CalculatorCTAProps) {
  return (
    <div
      className={`relative bg-gradient-to-br from-navy-500 to-navy-700 rounded-xl p-6 sm:p-8 text-white overflow-hidden ${className}`}
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Important Disclaimer</h3>
            <p className="text-navy-100 text-sm mt-1 leading-relaxed">
              This is an estimate based on general tax rules. Your actual tax
              liability may vary depending on your specific situation, deductions,
              credits, and filing status.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-5">
          <p className="text-teal-200 font-semibold text-sm flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            For your exact tax liability, book a free consultation.
          </p>
          <p className="text-navy-100 text-xs mt-1">
            An IRS Enrolled Agent will review your full financial picture and
            identify every deduction and credit you qualify for.
          </p>
        </div>

        <Link
          href="/book"
          className="btn-primary w-full text-center py-3"
        >
          Book Your Free Consultation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}
