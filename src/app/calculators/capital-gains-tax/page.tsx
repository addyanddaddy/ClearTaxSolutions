import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CapitalGainsTaxCalculator from "@/components/calculators/CapitalGainsTaxCalculator";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator | 2024 LTCG/STCG Rates | Clear Tax Solutions",
  description:
    "Calculate short-term and long-term capital gains tax for 2024. Includes 0%/15%/20% LTCG rates and 3.8% Net Investment Income Tax (NIIT). IRC §§ 1(h), 1221, 1222.",
};

export default function CapitalGainsTaxPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <CapitalGainsTaxCalculator />
    </section>
  );
}
