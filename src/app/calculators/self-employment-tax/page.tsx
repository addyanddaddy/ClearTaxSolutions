import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SelfEmploymentTaxCalculator from "@/components/calculators/SelfEmploymentTaxCalculator";

export const metadata: Metadata = {
  title: "Self-Employment Tax Calculator | 2024 SE Tax | Clear Tax Solutions",
  description:
    "Calculate self-employment tax for 2024 — 12.4% Social Security (up to $168,600) + 2.9% Medicare. Includes 50% SE tax deduction. IRC §§ 1401, 1402.",
};

export default function SelfEmploymentTaxPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <SelfEmploymentTaxCalculator />
    </section>
  );
}
