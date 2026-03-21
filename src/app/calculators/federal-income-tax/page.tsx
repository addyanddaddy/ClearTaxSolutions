import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FederalIncomeTaxCalculator from "@/components/calculators/FederalIncomeTaxCalculator";

export const metadata: Metadata = {
  title: "Federal Income Tax Calculator | 2024 Tax Brackets | Clear Tax Solutions",
  description:
    "Calculate your 2024 federal income tax with official IRS brackets. Supports all filing statuses — Single, MFJ, MFS, Head of Household. IRC § 1; Rev. Proc. 2023-34.",
};

export default function FederalIncomeTaxPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <FederalIncomeTaxCalculator />
    </section>
  );
}
