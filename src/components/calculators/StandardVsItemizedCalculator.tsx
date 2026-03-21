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

export default function StandardVsItemizedCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [agi, setAgi] = useState('');
  const [mortgageInterest, setMortgageInterest] = useState('');
  const [saltTaxes, setSaltTaxes] = useState('');
  const [charitableCash, setCharitableCash] = useState('');
  const [charitableNonCash, setCharitableNonCash] = useState('');
  const [medicalExpenses, setMedicalExpenses] = useState('');
  const [otherItemized, setOtherItemized] = useState('');

  const agiVal = parseFloat(agi) || 0;
  const mortgage = parseFloat(mortgageInterest) || 0;
  const salt = Math.min(parseFloat(saltTaxes) || 0, 10000); // SALT cap $10K
  const charCash = parseFloat(charitableCash) || 0;
  const charNonCash = parseFloat(charitableNonCash) || 0;
  const medical = parseFloat(medicalExpenses) || 0;
  const other = parseFloat(otherItemized) || 0;

  const medicalDeductible = Math.max(0, medical - agiVal * 0.075);
  const totalCharity = charCash + charNonCash;
  const totalItemized = mortgage + salt + totalCharity + medicalDeductible + other;
  const standardDed = STANDARD_DEDUCTIONS_2024[filingStatus];
  const better = totalItemized > standardDed ? 'itemized' : 'standard';
  const savings = Math.abs(totalItemized - standardDed);

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Standard vs. Itemized Deduction Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect;&sect; 63, 164, 170, 213</p>

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

        <div className="border-t pt-4">
          <h3 className="font-semibold text-navy-500 mb-3">Itemized Deduction Details</h3>
        </div>

        <div>
          <label className="label-text">Mortgage Interest ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 12000" value={mortgageInterest} onChange={e => setMortgageInterest(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">State & Local Taxes (SALT) ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 8000" value={saltTaxes} onChange={e => setSaltTaxes(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Capped at $10,000 for federal deduction</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-text">Charitable (Cash) ($)</label>
            <input type="number" className="input-field" placeholder="e.g. 3000" value={charitableCash} onChange={e => setCharitableCash(e.target.value)} min="0" />
          </div>
          <div>
            <label className="label-text">Charitable (Non-Cash) ($)</label>
            <input type="number" className="input-field" placeholder="e.g. 500" value={charitableNonCash} onChange={e => setCharitableNonCash(e.target.value)} min="0" />
          </div>
        </div>
        <div>
          <label className="label-text">Medical Expenses ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 10000" value={medicalExpenses} onChange={e => setMedicalExpenses(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Only amounts exceeding 7.5% of AGI are deductible</p>
        </div>
        <div>
          <label className="label-text">Other Itemized Deductions ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 0" value={otherItemized} onChange={e => setOtherItemized(e.target.value)} min="0" />
        </div>
      </div>

      {agiVal > 0 && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-5 rounded-lg border-2 ${better === 'standard' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-gray-50'}`}>
              <h4 className="font-semibold text-lg mb-2">Standard Deduction</h4>
              <p className="text-2xl font-bold text-navy-500">{fmt(standardDed)}</p>
              {better === 'standard' && <span className="inline-block mt-2 text-xs font-semibold bg-teal-500 text-white px-2 py-1 rounded">RECOMMENDED</span>}
            </div>
            <div className={`p-5 rounded-lg border-2 ${better === 'itemized' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-gray-50'}`}>
              <h4 className="font-semibold text-lg mb-2">Itemized Deductions</h4>
              <p className="text-2xl font-bold text-navy-500">{fmt(totalItemized)}</p>
              {better === 'itemized' && <span className="inline-block mt-2 text-xs font-semibold bg-teal-500 text-white px-2 py-1 rounded">RECOMMENDED</span>}
            </div>
          </div>

          <div className="bg-navy-50 rounded-lg p-5">
            <h3 className="font-semibold text-navy-500 mb-3">Itemized Breakdown</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="text-gray-600">Mortgage Interest:</span>
              <span className="font-medium text-right">{fmt(mortgage)}</span>
              <span className="text-gray-600">SALT (capped at $10K):</span>
              <span className="font-medium text-right">{fmt(salt)}</span>
              <span className="text-gray-600">Charitable Contributions:</span>
              <span className="font-medium text-right">{fmt(totalCharity)}</span>
              <span className="text-gray-600">Medical (above 7.5% AGI):</span>
              <span className="font-medium text-right">{fmt(medicalDeductible)}</span>
              <span className="text-gray-600">Other:</span>
              <span className="font-medium text-right">{fmt(other)}</span>
              <div className="col-span-2 border-t border-navy-200 my-1" />
              <span className="font-semibold">Additional Benefit:</span>
              <span className="font-bold text-right">{fmt(savings)} {better === 'itemized' ? 'more with itemized' : 'more with standard'}</span>
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
