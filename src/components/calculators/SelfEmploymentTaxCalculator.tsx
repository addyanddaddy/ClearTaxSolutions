'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const SS_WAGE_BASE_2024 = 168600;
const SS_RATE = 0.124;
const MEDICARE_RATE = 0.029;
const SE_FACTOR = 0.9235;
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.009;

export default function SelfEmploymentTaxCalculator() {
  const [netIncome, setNetIncome] = useState('');
  const [otherW2, setOtherW2] = useState('');
  const [filingStatus, setFilingStatus] = useState('single');

  const net = parseFloat(netIncome) || 0;
  const w2 = parseFloat(otherW2) || 0;

  const seEarnings = net * SE_FACTOR;
  const ssBase = Math.max(0, Math.min(seEarnings, SS_WAGE_BASE_2024 - w2));
  const ssTax = ssBase * SS_RATE;
  const medicareTax = seEarnings * MEDICARE_RATE;

  const threshold = filingStatus === 'mfj' ? 250000 : ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;
  const additionalMedicareBase = Math.max(0, seEarnings + w2 - threshold);
  const additionalMedicare = Math.min(additionalMedicareBase, seEarnings) * ADDITIONAL_MEDICARE_RATE;

  const totalSETax = ssTax + medicareTax + additionalMedicare;
  const deduction = totalSETax / 2;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Self-Employment Tax Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect;&sect; 1401, 1402</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Filing Status</label>
          <select className="input-field" value={filingStatus} onChange={e => setFilingStatus(e.target.value)}>
            <option value="single">Single</option>
            <option value="mfj">Married Filing Jointly</option>
            <option value="mfs">Married Filing Separately</option>
            <option value="hoh">Head of Household</option>
          </select>
        </div>

        <div>
          <label className="label-text">Net Self-Employment Income ($)</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g. 80000"
            value={netIncome}
            onChange={e => setNetIncome(e.target.value)}
            min="0"
          />
          <p className="text-xs text-gray-400 mt-1">Gross revenue minus business expenses (Schedule C net profit)</p>
        </div>

        <div>
          <label className="label-text">Other W-2 Wages ($)</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g. 0"
            value={otherW2}
            onChange={e => setOtherW2(e.target.value)}
            min="0"
          />
          <p className="text-xs text-gray-400 mt-1">Reduces the Social Security wage base available for SE tax</p>
        </div>
      </div>

      {net > 0 && (
        <div className="mt-8 bg-navy-50 rounded-lg p-5">
          <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="text-gray-600">Net SE Income:</span>
            <span className="font-medium text-right">{fmt(net)}</span>
            <span className="text-gray-600">SE Earnings (× 92.35%):</span>
            <span className="font-medium text-right">{fmt(seEarnings)}</span>
            <span className="text-gray-600">Social Security Tax (12.4%):</span>
            <span className="font-medium text-right">{fmt(ssTax)}</span>
            <span className="text-gray-600">Medicare Tax (2.9%):</span>
            <span className="font-medium text-right">{fmt(medicareTax)}</span>
            {additionalMedicare > 0 && (
              <>
                <span className="text-gray-600">Additional Medicare (0.9%):</span>
                <span className="font-medium text-right">{fmt(additionalMedicare)}</span>
              </>
            )}
            <div className="col-span-2 border-t border-navy-200 my-1" />
            <span className="text-navy-500 font-semibold">Total SE Tax:</span>
            <span className="text-navy-500 font-bold text-right text-lg">{fmt(totalSETax)}</span>
            <span className="text-gray-600">Deductible (50% of SE Tax):</span>
            <span className="font-medium text-teal-600 text-right">{fmt(deduction)}</span>
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
