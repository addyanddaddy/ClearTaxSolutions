import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RetirementContributionCalculator from "@/components/calculators/RetirementContributionCalculator";

export const metadata: Metadata = {
  title: "Retirement Contribution Calculator | 2024 Limits | Clear Tax Solutions",
  description:
    "See 2024 max contributions for 401(k) ($23,000), IRA ($7,000), SEP IRA ($69,000), and SIMPLE IRA ($16,000) with catch-up limits for age 50+. IRC §§ 219, 401(k), 415.",
};

export default function RetirementContributionsPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <RetirementContributionCalculator />
    </section>
  );
}
