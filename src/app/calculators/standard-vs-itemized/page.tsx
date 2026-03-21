import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StandardVsItemizedCalculator from "@/components/calculators/StandardVsItemizedCalculator";

export const metadata: Metadata = {
  title: "Standard vs. Itemized Deduction Calculator | 2024 | Clear Tax Solutions",
  description:
    "Compare standard deduction ($14,600 single/$29,200 MFJ) vs. itemized deductions including mortgage interest, SALT cap, charity, and medical expenses. IRC §§ 63, 164, 170, 213.",
};

export default function StandardVsItemizedPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <StandardVsItemizedCalculator />
    </section>
  );
}
