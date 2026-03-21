import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AMTCalculator from "@/components/calculators/AMTCalculator";

export const metadata: Metadata = {
  title: "AMT Calculator | Alternative Minimum Tax 2024 | Clear Tax Solutions",
  description:
    "Calculate Alternative Minimum Tax for 2024. AMT exemption $85,700 (single) / $133,300 (MFJ), 26%/28% rates, and phase-out analysis. IRC §§ 55, 56, 57.",
};

export default function AMTPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <AMTCalculator />
    </section>
  );
}
