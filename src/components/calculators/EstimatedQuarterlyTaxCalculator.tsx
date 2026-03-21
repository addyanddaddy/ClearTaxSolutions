'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const QUARTERS = [
  { label: 'Q1 (Jan–Mar)', due: 'April 15, 2024' },
  { label: 'Q2 (Apr–May)', due: 'June 17, 2024' },
  { label: 'Q3 (Jun–Aug)', due: 'September 16, 2024' },
  { label: 'Q4 (Sep–Dec)', due: 'January 15, 2025' },
];

export default function EstimatedQuarterlyTaxCalculator() {
  const [expectedIncome, setExpectedIncome] = useState('');
  const [expectedTax, setExpectedTax] = useState('');
  const [priorYearTax, setPriorYearTax] = useState('');
  const [priorYearAGI, setPriorYearAGI] = useState('');
  const [withheld, setWithheld] = useState('');

  const expTax = parseFloat(expectedTax) || 0;
  const priorTax = parseFloat(priorYearTax) || 0;
  const priorAGI = parseFloat(priorYearAGI) || 0;
  const wheld = parseFloat(withheld) || 0;

  const safeHarborPct = priorAGI > 150000 ? 1.10 : 1.00;
  const safeHarborAmount = priorTax * safeHarborPct;

  const requiredPayment = Math.min(expTax, safeHarborAmount);
  const remainingAfterWithholding = Math.max(0, requiredPayment - wheld);
  const quarterlyPayment = remainingAfterWithholding / 4;

  const safeHarborMet = wheld >= requiredPayment;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Estimated Quarterly Tax Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect; 6654; Form 1040-ES</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Expected Total Income This Year ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 120000" value={expectedIncome} onChange={e => setExpectedIncome(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Expected Total Tax Liability ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 24000" value={expectedTax} onChange={e => setExpectedTax(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Your projected total federal tax for the current year</p>
        </div>
        <div>
          <label className="label-text">Prior Year Tax Liability ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 20000" value={priorYearTax} onChange={e => setPriorYearTax(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Prior Year AGI ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 100000" value={priorYearAGI} onChange={e => setPriorYearAGI(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">If AGI exceeds $150K, safe harbor is 110% of prior year tax</p>
        </div>
        <div>
          <label className="label-text">Total Withholding Already Expected ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 5000" value={withheld} onChange={e => setWithheld(e.target.value)} min="0" />
        </div>
      </div>

      {(expTax > 0 || priorTax > 0) && (
        <div className="mt-8 space-y-6">
          <div className="bg-navy-50 rounded-lg p-5">
            <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="text-gray-600">Expected Tax Liability:</span>
              <span className="font-medium text-right">{fmt(expTax)}</span>
              <span className="text-gray-600">Safe Harbor ({(safeHarborPct * 100).toFixed(0)}% of Prior Year):</span>
              <span className="font-medium text-right">{fmt(safeHarborAmount)}</span>
              <span className="text-gray-600">Required Annual Payment:</span>
              <span className="font-medium text-right">{fmt(requiredPayment)}</span>
              <span className="text-gray-600">Less Withholding:</span>
              <span className="font-medium text-right">-{fmt(wheld)}</span>
              <div className="col-span-2 border-t border-navy-200 my-1" />
              <span className="text-navy-500 font-semibold">Quarterly Payment:</span>
              <span className="text-navy-500 font-bold text-right text-lg">{fmt(quarterlyPayment)}</span>
            </div>

            <div className={`mt-4 p-3 rounded text-sm font-medium ${safeHarborMet ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              {safeHarborMet ? 'Your withholding meets safe harbor requirements.' : 'You likely need to make estimated payments to avoid underpayment penalties.'}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-navy-500 mb-2">Payment Due Dates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {QUARTERS.map((q, i) => (
                <div key={i} className="flex justify-between p-3 bg-gray-50 rounded-lg text-sm">
                  <span className="font-medium">{q.label}</span>
                  <span className="text-gray-600">{q.due} &mdash; {fmt(quarterlyPayment)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-teal-50 rounded-lg text-center">
        <p className="text-gray-700 mb-3">Want a precise calculation? Book a free consultation.</p>
        <Link href="/book" className="btn-primary">Book Free Consultation</Link>
      </div>
    </div>
  );
}
