'use client';

import { useState } from 'react';
import Link from 'next/link';

type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const THRESHOLDS_2024: Record<FilingStatus, { lower: number; upper: number }> = {
  single: { lower: 191950, upper: 241950 },
  mfj: { lower: 383900, upper: 483900 },
  mfs: { lower: 191950, upper: 241950 },
  hoh: { lower: 191950, upper: 241950 },
};

export default function QBIDeductionCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [qbi, setQbi] = useState('');
  const [taxableIncome, setTaxableIncome] = useState('');
  const [w2Wages, setW2Wages] = useState('');
  const [ubia, setUbia] = useState('');
  const [isSSTB, setIsSSTB] = useState(false);

  const qbiVal = parseFloat(qbi) || 0;
  const tiVal = parseFloat(taxableIncome) || 0;
  const wages = parseFloat(w2Wages) || 0;
  const ubiaVal = parseFloat(ubia) || 0;

  const threshold = THRESHOLDS_2024[filingStatus];
  const phaseInRange = threshold.upper - threshold.lower;

  // Step 1: 20% of QBI
  const twentyPctQBI = qbiVal * 0.20;

  // Step 2: W-2/UBIA limit
  const wageLimit = Math.max(wages * 0.50, wages * 0.25 + ubiaVal * 0.025);

  let deduction = 0;

  if (tiVal <= threshold.lower) {
    // Below threshold — full 20% deduction
    deduction = twentyPctQBI;
  } else if (tiVal >= threshold.upper) {
    // Above upper threshold
    if (isSSTB) {
      deduction = 0; // SSTBs get zero above upper threshold
    } else {
      deduction = Math.min(twentyPctQBI, wageLimit);
    }
  } else {
    // In phase-in range
    const phaseFraction = (tiVal - threshold.lower) / phaseInRange;
    if (isSSTB) {
      const applicablePct = 1 - phaseFraction;
      const adjustedQBI = qbiVal * applicablePct;
      const adjustedWages = wages * applicablePct;
      const adjustedUBIA = ubiaVal * applicablePct;
      const adjustedWageLimit = Math.max(adjustedWages * 0.50, adjustedWages * 0.25 + adjustedUBIA * 0.025);
      const reductionAmount = (adjustedQBI * 0.20 - Math.min(adjustedQBI * 0.20, adjustedWageLimit)) * phaseFraction;
      deduction = Math.max(0, adjustedQBI * 0.20 - reductionAmount);
    } else {
      const excess = twentyPctQBI - Math.min(twentyPctQBI, wageLimit);
      const reductionAmount = excess * (1 - phaseFraction);
      deduction = twentyPctQBI - excess + reductionAmount;
    }
  }

  // Final limit: lesser of QBI deduction or 20% of taxable income (before QBI deduction)
  deduction = Math.min(deduction, tiVal * 0.20);
  deduction = Math.max(0, deduction);

  const taxSavings = deduction * 0.24;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">QBI Deduction Calculator (Section 199A)</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect; 199A</p>

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
          <label className="label-text">Qualified Business Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 150000" value={qbi} onChange={e => setQbi(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Taxable Income Before QBI Deduction ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 180000" value={taxableIncome} onChange={e => setTaxableIncome(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">W-2 Wages Paid by Business ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 50000" value={w2Wages} onChange={e => setW2Wages(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Relevant only if income exceeds threshold</p>
        </div>
        <div>
          <label className="label-text">UBIA of Qualified Property ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 200000" value={ubia} onChange={e => setUbia(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Unadjusted Basis Immediately After Acquisition</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="sstb"
            checked={isSSTB}
            onChange={e => setIsSSTB(e.target.checked)}
            className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500"
          />
          <label htmlFor="sstb" className="text-sm text-gray-700">
            Specified Service Trade or Business (SSTB)?
          </label>
        </div>
      </div>

      {qbiVal > 0 && (
        <div className="mt-8 bg-navy-50 rounded-lg p-5">
          <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="text-gray-600">Qualified Business Income:</span>
            <span className="font-medium text-right">{fmt(qbiVal)}</span>
            <span className="text-gray-600">20% of QBI:</span>
            <span className="font-medium text-right">{fmt(twentyPctQBI)}</span>
            <span className="text-gray-600">W-2/UBIA Limit:</span>
            <span className="font-medium text-right">{fmt(wageLimit)}</span>
            <span className="text-gray-600">Income Threshold:</span>
            <span className="font-medium text-right">{fmt(threshold.lower)}</span>
            <span className="text-gray-600">SSTB:</span>
            <span className="font-medium text-right">{isSSTB ? 'Yes' : 'No'}</span>
            <div className="col-span-2 border-t border-navy-200 my-1" />
            <span className="text-navy-500 font-semibold">QBI Deduction:</span>
            <span className="text-navy-500 font-bold text-right text-lg">{fmt(deduction)}</span>
            <span className="text-gray-600">Estimated Tax Savings (24%):</span>
            <span className="font-medium text-teal-600 text-right">{fmt(taxSavings)}</span>
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
