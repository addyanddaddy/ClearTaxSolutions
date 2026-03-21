import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Section179Calculator from "@/components/calculators/Section179Calculator";

export const metadata: Metadata = {
  title: "Section 179 Deduction Calculator | 2024 | Clear Tax Solutions",
  description:
    "Calculate your Section 179 equipment deduction for 2024. $1,220,000 max deduction, phase-out begins at $3,050,000. Includes business-use percentage. IRC § 179.",
};

export default function Section179Page() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <Section179Calculator />
    </section>
  );
}
