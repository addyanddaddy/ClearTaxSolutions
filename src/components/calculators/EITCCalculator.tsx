'use client';

import { useState } from 'react';
import Link from 'next/link';

type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

interface EITCParams {
  maxCredit: number;
  phaseInEnd: number;
  phaseOutStart: number;
  phaseOutEnd: number;
  phaseInRate: number;
  phaseOutRate: number;
}

const EITC_2024: Record<string, Record<number, EITCParams>> = {
  single: {
    0: { maxCredit: 632, phaseInEnd: 7840, phaseOutStart: 9800, phaseOutEnd: 18591, phaseInRate: 0.0765, phaseOutRate: 0.0765 },
    1: { maxCredit: 3995, phaseInEnd: 11750, phaseOutStart: 21370, phaseOutEnd: 49084, phaseInRate: 0.34, phaseOutRate: 0.1598 },
    2: { maxCredit: 6604, phaseInEnd: 16510, phaseOutStart: 21370, phaseOutEnd: 55768, phaseInRate: 0.40, phaseOutRate: 0.2106 },
    3: { maxCredit: 7430, phaseInEnd: 16510, phaseOutStart: 21370, phaseOutEnd: 59899, phaseInRate: 0.45, phaseOutRate: 0.2106 },
  },
  mfj: {
    0: { maxCredit: 632, phaseInEnd: 7840, phaseOutStart: 16370, phaseOutEnd: 25161, phaseInRate: 0.0765, phaseOutRate: 0.0765 },
    1: { maxCredit: 3995, phaseInEnd: 11750, phaseOutStart: 27940, phaseOutEnd: 55768, phaseInRate: 0.34, phaseOutRate: 0.1598 },
    2: { maxCredit: 6604, phaseInEnd: 16510, phaseOutStart: 27940, phaseOutEnd: 62688, phaseInRate: 0.40, phaseOutRate: 0.2106 },
    3: { maxCredit: 7430, phaseInEnd: 16510, phaseOutStart: 27940, phaseOutEnd: 66819, phaseInRate: 0.45, phaseOutRate: 0.2106 },
  },
};

// HoH and MFS use single table (MFS generally not eligible unless specific rules)
EITC_2024.hoh = EITC_2024.single;
EITC_2024.mfs = EITC_2024.single;

function calcEITC(earned: number, agi: number, children: number, status: string): number {
  const key = Math.min(children, 3);
  const params = EITC_2024[status]?.[key];
  if (!params) return 0;

  const higherIncome = Math.max(earned, agi);

  // Phase-in
  let credit = Math.min(earned * params.phaseInRate, params.maxCredit);

  // Phase-out
  if (higherIncome > params.phaseOutStart) {
    const reduction = (higherIncome - params.phaseOutStart) * params.phaseOutRate;
    credit = Math.max(0, credit - reduction);
  }

  return Math.round(credit);
}

export default function EITCCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [earnedIncome, setEarnedIncome] = useState('');
  const [agi, setAgi] = useState('');
  const [children, setChildren] = useState('0');
  const [investmentIncome, setInvestmentIncome] = useState('');

  const earned = parseFloat(earnedIncome) || 0;
  const agiVal = parseFloat(agi) || earned;
  const numChildren = parseInt(children) || 0;
  const invIncome = parseFloat(investmentIncome) || 0;

  const eitcCredit = calcEITC(earned, agiVal, numChildren, filingStatus);
  const investmentLimit = 11600; // 2024 investment income limit
  const disqualified = invIncome > investmentLimit;

  const finalCredit = disqualified ? 0 : eitcCredit;

  const key = Math.min(numChildren, 3);
  const params = EITC_2024[filingStatus]?.[key];

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Earned Income Tax Credit (EITC) Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect; 32</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Filing Status</label>
          <select className="input-field" value={filingStatus} onChange={e => setFilingStatus(e.target.value as FilingStatus)}>
            <option value="single">Single</option>
            <option value="mfj">Married Filing Jointly</option>
            <option value="hoh">Head of Household</option>
            <option value="mfs">Married Filing Separately</option>
          </select>
        </div>
        <div>
          <label className="label-text">Earned Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 30000" value={earnedIncome} onChange={e => setEarnedIncome(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Wages, salaries, self-employment income</p>
        </div>
        <div>
          <label className="label-text">Adjusted Gross Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 32000" value={agi} onChange={e => setAgi(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Leave blank if same as earned income</p>
        </div>
        <div>
          <label className="label-text">Number of Qualifying Children</label>
          <select className="input-field" value={children} onChange={e => setChildren(e.target.value)}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3 or more</option>
          </select>
        </div>
        <div>
          <label className="label-text">Investment Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 1000" value={investmentIncome} onChange={e => setInvestmentIncome(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Must be {fmt(investmentLimit)} or less to qualify</p>
        </div>
      </div>

      {earned > 0 && (
        <div className="mt-8 space-y-4">
          <div className="bg-navy-50 rounded-lg p-5">
            <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="text-gray-600">Earned Income:</span>
              <span className="font-medium text-right">{fmt(earned)}</span>
              <span className="text-gray-600">Qualifying Children:</span>
              <span className="font-medium text-right">{numChildren}</span>
              <span className="text-gray-600">Max Possible Credit:</span>
              <span className="font-medium text-right">{params ? fmt(params.maxCredit) : '$0'}</span>
              <span className="text-gray-600">Income Limit:</span>
              <span className="font-medium text-right">{params ? fmt(params.phaseOutEnd) : 'N/A'}</span>
              <div className="col-span-2 border-t border-navy-200 my-1" />
              <span className="text-navy-500 font-semibold">Estimated EITC:</span>
              <span className="text-navy-500 font-bold text-right text-lg">{fmt(finalCredit)}</span>
            </div>
          </div>

          {disqualified && (
            <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm">
              <p className="font-medium">Disqualified: Investment income ({fmt(invIncome)}) exceeds the {fmt(investmentLimit)} limit for 2024.</p>
            </div>
          )}

          {finalCredit > 0 && (
            <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm">
              <p className="font-medium">The EITC is fully refundable — you receive {fmt(finalCredit)} even if you owe no tax.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-4 bg-teal-50 rounded-lg text-center">
        <p className="text-gray-700 mb-3">Want a precise calculation? Book a free consultation.</p>
        <Link href="/book" className="btn-primary">Book Free Consultation</Link>
      </div>
    </div>
  );
}
