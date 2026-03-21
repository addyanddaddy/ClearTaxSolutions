import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QBIDeductionCalculator from "@/components/calculators/QBIDeductionCalculator";

export const metadata: Metadata = {
  title: "QBI Deduction Calculator | Section 199A | 2024 | Clear Tax Solutions",
  description:
    "Calculate your Qualified Business Income (QBI) deduction under Section 199A. 20% deduction with W-2 wage/UBIA limits and SSTB phase-out. IRC § 199A.",
};

export default function QBIDeductionPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <QBIDeductionCalculator />
    </section>
  );
}
