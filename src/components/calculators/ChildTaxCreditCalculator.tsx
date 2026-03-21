'use client';

import { useState } from 'react';
import Link from 'next/link';

type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const PHASEOUT: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 400000,
  mfs: 200000,
  hoh: 200000,
};

const CTC_PER_CHILD = 2000;
const ADDITIONAL_CTC_MAX = 1700;
const PHASEOUT_RATE = 50; // $50 per $1,000 over threshold

export default function ChildTaxCreditCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [agi, setAgi] = useState('');
  const [numChildren, setNumChildren] = useState('');
  const [numOtherDependents, setNumOtherDependents] = useState('');
  const [earnedIncome, setEarnedIncome] = useState('');

  const agiVal = parseFloat(agi) || 0;
  const children = parseInt(numChildren) || 0;
  const otherDeps = parseInt(numOtherDependents) || 0;
  const earned = parseFloat(earnedIncome) || 0;

  const threshold = PHASEOUT[filingStatus];
  const excess = Math.max(0, agiVal - threshold);
  const reductionAmountPer1000 = Math.ceil(excess / 1000) * PHASEOUT_RATE;

  const grossCTC = children * CTC_PER_CHILD;
  const otherDependentCredit = otherDeps * 500;
  const totalGrossCredit = grossCTC + otherDependentCredit;
  const ctcAfterPhaseout = Math.max(0, totalGrossCredit - reductionAmountPer1000);

  // Additional CTC (refundable portion)
  const maxRefundable = Math.min(children * ADDITIONAL_CTC_MAX, ctcAfterPhaseout);
  const earnedIncomeFormula = Math.max(0, (earned - 2500) * 0.15);
  const refundablePortion = Math.min(maxRefundable, earnedIncomeFormula);

  const nonrefundablePortion = ctcAfterPhaseout - refundablePortion;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Child Tax Credit Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect; 24</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Filing Status</label>
          <select className="input-field" value={filingStatus} onChange={e => setFilingStatus(e.target.value as FilingStatus)}>
            <option value="single">Single</option>
            <option value="mfj">Married Filing Jointly</option>
            <option value="mfs">Married Filing Separately</option>
            <option value="hoh">Head of Household</option>
          </select>
        </div>
        <div>
          <label className="label-text">Adjusted Gross Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 85000" value={agi} onChange={e => setAgi(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Number of Qualifying Children (under 17)</label>
          <input type="number" className="input-field" placeholder="e.g. 2" value={numChildren} onChange={e => setNumChildren(e.target.value)} min="0" max="20" />
        </div>
        <div>
          <label className="label-text">Number of Other Dependents</label>
          <input type="number" className="input-field" placeholder="e.g. 0" value={numOtherDependents} onChange={e => setNumOtherDependents(e.target.value)} min="0" max="20" />
          <p className="text-xs text-gray-400 mt-1">Dependents 17+ qualify for $500 Other Dependent Credit</p>
        </div>
        <div>
          <label className="label-text">Earned Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 45000" value={earnedIncome} onChange={e => setEarnedIncome(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Used to calculate refundable Additional Child Tax Credit</p>
        </div>
      </div>

      {children > 0 && (
        <div className="mt-8 bg-navy-50 rounded-lg p-5">
          <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="text-gray-600">Qualifying Children:</span>
            <span className="font-medium text-right">{children}</span>
            <span className="text-gray-600">Gross CTC ({fmt(CTC_PER_CHILD)}/child):</span>
            <span className="font-medium text-right">{fmt(grossCTC)}</span>
            {otherDeps > 0 && (
              <>
                <span className="text-gray-600">Other Dependent Credit:</span>
                <span className="font-medium text-right">{fmt(otherDependentCredit)}</span>
              </>
            )}
            <span className="text-gray-600">Phase-Out Threshold:</span>
            <span className="font-medium text-right">{fmt(threshold)}</span>
            {reductionAmountPer1000 > 0 && (
              <>
                <span className="text-gray-600">Phase-Out Reduction:</span>
                <span className="font-medium text-right">-{fmt(reductionAmountPer1000)}</span>
              </>
            )}
            <div className="col-span-2 border-t border-navy-200 my-1" />
            <span className="text-navy-500 font-semibold">Total Credit:</span>
            <span className="text-navy-500 font-bold text-right text-lg">{fmt(ctcAfterPhaseout)}</span>
            <span className="text-gray-600">Non-Refundable Portion:</span>
            <span className="font-medium text-right">{fmt(nonrefundablePortion)}</span>
            <span className="text-gray-600">Refundable (Additional CTC):</span>
            <span className="font-medium text-teal-600 text-right">{fmt(refundablePortion)}</span>
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
