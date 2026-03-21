'use client';

import { useState } from 'react';
import Link from 'next/link';

type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const STANDARD_DEDUCTIONS_2024: Record<FilingStatus, number> = {
  single: 14600,
  mfj: 29200,
  mfs: 14600,
  hoh: 21900,
};

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

function calcTax(taxableIncome: number, status: FilingStatus): number {
  let tax = 0;
  for (const bracket of BRACKETS_2024[status]) {
    if (taxableIncome <= bracket.min) break;
    tax += (Math.min(taxableIncome, bracket.max) - bracket.min) * bracket.rate;
  }
  return tax;
}

export default function W4WithholdingCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [annualWages, setAnnualWages] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [credits, setCredits] = useState('');
  const [currentWithholding, setCurrentWithholding] = useState('');
  const [payFrequency, setPayFrequency] = useState('26');

  const wages = parseFloat(annualWages) || 0;
  const other = parseFloat(otherIncome) || 0;
  const ded = parseFloat(deductions) || 0;
  const cred = parseFloat(credits) || 0;
  const withheld = parseFloat(currentWithholding) || 0;
  const periods = parseInt(payFrequency);

  const totalIncome = wages + other;
  const standardDed = STANDARD_DEDUCTIONS_2024[filingStatus];
  const effectiveDed = Math.max(ded, standardDed);
  const taxableIncome = Math.max(0, totalIncome - effectiveDed);
  const totalTax = Math.max(0, calcTax(taxableIncome, filingStatus) - cred);

  const idealAnnualWithholding = totalTax;
  const idealPerPaycheck = periods > 0 ? idealAnnualWithholding / periods : 0;
  const currentAnnualWithholding = withheld * periods;
  const difference = currentAnnualWithholding - idealAnnualWithholding;

  let advice = '';
  if (withheld > 0) {
    if (Math.abs(difference) < 500) {
      advice = 'Your withholding looks about right. You may get a small refund or owe a small amount.';
    } else if (difference > 0) {
      advice = `You are over-withholding by approximately ${fmt(difference)} annually. Consider increasing allowances to keep more in each paycheck.`;
    } else {
      advice = `You are under-withholding by approximately ${fmt(Math.abs(difference))} annually. Consider adding extra withholding to avoid a tax bill.`;
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">W-4 Withholding Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect; 3402; Form W-4</p>

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
          <label className="label-text">Annual Wages ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 75000" value={annualWages} onChange={e => setAnnualWages(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Other Annual Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 5000" value={otherIncome} onChange={e => setOtherIncome(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Interest, dividends, side income, etc.</p>
        </div>
        <div>
          <label className="label-text">Total Deductions ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 14600" value={deductions} onChange={e => setDeductions(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Leave blank to use the standard deduction ({fmt(standardDed)})</p>
        </div>
        <div>
          <label className="label-text">Expected Tax Credits ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 2000" value={credits} onChange={e => setCredits(e.target.value)} min="0" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-text">Current Per-Paycheck Withholding ($)</label>
            <input type="number" className="input-field" placeholder="e.g. 800" value={currentWithholding} onChange={e => setCurrentWithholding(e.target.value)} min="0" />
          </div>
          <div>
            <label className="label-text">Pay Frequency</label>
            <select className="input-field" value={payFrequency} onChange={e => setPayFrequency(e.target.value)}>
              <option value="52">Weekly</option>
              <option value="26">Bi-Weekly</option>
              <option value="24">Semi-Monthly</option>
              <option value="12">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {wages > 0 && (
        <div className="mt-8 space-y-4">
          <div className="bg-navy-50 rounded-lg p-5">
            <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="text-gray-600">Total Income:</span>
              <span className="font-medium text-right">{fmt(totalIncome)}</span>
              <span className="text-gray-600">Deductions Used:</span>
              <span className="font-medium text-right">{fmt(effectiveDed)}</span>
              <span className="text-gray-600">Taxable Income:</span>
              <span className="font-medium text-right">{fmt(taxableIncome)}</span>
              <span className="text-gray-600">Estimated Annual Tax:</span>
              <span className="font-medium text-right">{fmt(totalTax)}</span>
              <div className="col-span-2 border-t border-navy-200 my-1" />
              <span className="text-navy-500 font-semibold">Ideal Per-Paycheck Withholding:</span>
              <span className="text-navy-500 font-bold text-right text-lg">{fmt(idealPerPaycheck)}</span>
            </div>
          </div>

          {withheld > 0 && (
            <div className={`p-4 rounded-lg text-sm ${
              Math.abs(difference) < 500 ? 'bg-green-50 text-green-800' :
              difference > 0 ? 'bg-blue-50 text-blue-800' : 'bg-amber-50 text-amber-800'
            }`}>
              <p className="font-medium">{advice}</p>
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
