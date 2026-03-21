import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MACRSDepreciationCalculator from "@/components/calculators/MACRSDepreciationCalculator";

export const metadata: Metadata = {
  title: "MACRS Depreciation Calculator | 2024 | Clear Tax Solutions",
  description:
    "Generate MACRS depreciation schedules for 3- to 39-year asset classes. Includes 60% bonus depreciation for 2024, half-year convention. IRC § 168; Rev. Proc. 87-56.",
};

export default function MACRSDepreciationPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <MACRSDepreciationCalculator />
    </section>
  );
}
