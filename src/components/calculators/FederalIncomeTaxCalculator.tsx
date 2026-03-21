'use client';

import { useState } from 'react';
import Link from 'next/link';

type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

const BRACKETS_2024: Record<FilingStatus, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
  mfj: [
    { rate: 0.10, min: 0, max: 23200 },
    { rate: 0.12, min: 23200, max: 94300 },
    { rate: 0.22, min: 94300, max: 201050 },
    { rate: 0.24, min: 201050, max: 383900 },
    { rate: 0.32, min: 383900, max: 487450 },
    { rate: 0.35, min: 487450, max: 731200 },
    { rate: 0.37, min: 731200, max: Infinity },
  ],
  mfs: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 365600 },
    { rate: 0.37, min: 365600, max: Infinity },
  ],
  hoh: [
    { rate: 0.10, min: 0, max: 16550 },
    { rate: 0.12, min: 16550, max: 63100 },
    { rate: 0.22, min: 63100, max: 100500 },
    { rate: 0.24, min: 100500, max: 191950 },
    { rate: 0.32, min: 191950, max: 243700 },
    { rate: 0.35, min: 243700, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
};

const STATUS_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  mfj: 'Married Filing Jointly',
  mfs: 'Married Filing Separately',
  hoh: 'Head of Household',
};

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(1) + '%';
}

export default function FederalIncomeTaxCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [grossIncome, setGrossIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [credits, setCredits] = useState('');

  const gross = parseFloat(grossIncome) || 0;
  const ded = parseFloat(deductions) || 0;
  const cred = parseFloat(credits) || 0;

  const taxableIncome = Math.max(0, gross - ded);
  const brackets = BRACKETS_2024[filingStatus];

  let totalTax = 0;
  const breakdownRows: { rate: string; range: string; tax: number }[] = [];

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    const taxInBracket = taxableInBracket * bracket.rate;
    totalTax += taxInBracket;
    breakdownRows.push({
      rate: (bracket.rate * 100).toFixed(0) + '%',
      range: `${fmt(bracket.min)} – ${bracket.max === Infinity ? '∞' : fmt(bracket.max)}`,
      tax: taxInBracket,
    });
  }

  const afterCredits = Math.max(0, totalTax - cred);
  const effectiveRate = gross > 0 ? afterCredits / gross : 0;
  const marginalRate = brackets.find(b => taxableIncome <= b.max)?.rate || 0.37;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Federal Income Tax Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect; 1; Rev. Proc. 2023-34</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Filing Status</label>
          <select
            className="input-field"
            value={filingStatus}
            onChange={e => setFilingStatus(e.target.value as FilingStatus)}
          >
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-text">Gross Income ($)</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g. 85000"
            value={grossIncome}
            onChange={e => setGrossIncome(e.target.value)}
            min="0"
          />
        </div>

        <div>
          <label className="label-text">Total Deductions ($)</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g. 14600"
            value={deductions}
            onChange={e => setDeductions(e.target.value)}
            min="0"
          />
        </div>

        <div>
          <label className="label-text">Tax Credits ($)</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g. 2000"
            value={credits}
            onChange={e => setCredits(e.target.value)}
            min="0"
          />
        </div>
      </div>

      {gross > 0 && (
        <div className="mt-8 space-y-6">
          <div className="bg-navy-50 rounded-lg p-5">
            <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="text-gray-600">Gross Income:</span>
              <span className="font-medium text-right">{fmt(gross)}</span>
              <span className="text-gray-600">Deductions:</span>
              <span className="font-medium text-right">-{fmt(ded)}</span>
              <span className="text-gray-600">Taxable Income:</span>
              <span className="font-medium text-right">{fmt(taxableIncome)}</span>
              <span className="text-gray-600">Tax Before Credits:</span>
              <span className="font-medium text-right">{fmt(totalTax)}</span>
              <span className="text-gray-600">Tax Credits:</span>
              <span className="font-medium text-right">-{fmt(cred)}</span>
              <div className="col-span-2 border-t border-navy-200 my-1" />
              <span className="text-navy-500 font-semibold">Estimated Tax:</span>
              <span className="text-navy-500 font-bold text-right text-lg">{fmt(afterCredits)}</span>
              <span className="text-gray-600">Effective Rate:</span>
              <span className="font-medium text-right">{fmtPct(effectiveRate)}</span>
              <span className="text-gray-600">Marginal Rate:</span>
              <span className="font-medium text-right">{fmtPct(marginalRate)}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-navy-500 mb-2">Bracket Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Rate</th>
                    <th className="pb-2">Income Range</th>
                    <th className="pb-2 text-right">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdownRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 font-medium">{row.rate}</td>
                      <td className="py-2">{row.range}</td>
                      <td className="py-2 text-right">{fmt(row.tax)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-teal-50 rounded-lg text-center">
        <p className="text-gray-700 mb-3">Want a precise calculation? Book a free consultation.</p>
        <Link href="/book" className="btn-primary">
          Book Free Consultation
        </Link>
      </div>
    </div>
  );
}
