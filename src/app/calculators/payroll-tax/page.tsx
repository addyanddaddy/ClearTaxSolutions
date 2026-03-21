import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PayrollTaxCalculator from "@/components/calculators/PayrollTaxCalculator";

export const metadata: Metadata = {
  title: "Payroll Tax Calculator | FICA & FUTA 2024 | Clear Tax Solutions",
  description:
    "Calculate employer and employee payroll taxes — FICA (6.2% SS + 1.45% Medicare), FUTA (6% on first $7K with 5.4% credit), and Additional Medicare Tax. IRC §§ 3101, 3111, 3301.",
};

export default function PayrollTaxPage() {
  return (
    <section className="section-padding">
      <Link href="/calculators" className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium mb-8">
        <ArrowLeft className="w-4 h-4 mr-1" /> All Calculators
      </Link>
      <PayrollTaxCalculator />
    </section>
  );
}
