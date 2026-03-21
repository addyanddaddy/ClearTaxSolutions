import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PenaltyInterestCalculator from "@/components/calculators/PenaltyInterestCalculator";

export const metadata: Metadata = {
  title: "IRS Penalty & Interest Calculator | 2024 | Clear Tax Solutions",
  description:
    "Calculate IRS failure-to-file (5%/month), failure-to-pay (0.5%/month), and underpayment interest (8% for 2024). IRC §§ 6601, 6651, 6654, 6656.",
};

export default function PenaltyInterestPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <PenaltyInterestCalculator />
    </section>
  );
}
