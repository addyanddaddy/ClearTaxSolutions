'use client';

import { useState } from 'react';
import Link from 'next/link';

type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const LTCG_BRACKETS_2024: Record<FilingStatus, { rate: number; max: number }[]> = {
  single: [
    { rate: 0, max: 47025 },
    { rate: 0.15, max: 518900 },
    { rate: 0.20, max: Infinity },
  ],
  mfj: [
    { rate: 0, max: 94050 },
    { rate: 0.15, max: 583750 },
    { rate: 0.20, max: Infinity },
  ],
  mfs: [
    { rate: 0, max: 47025 },
    { rate: 0.15, max: 291850 },
    { rate: 0.20, max: Infinity },
  ],
  hoh: [
    { rate: 0, max: 63000 },
    { rate: 0.15, max: 551350 },
    { rate: 0.20, max: Infinity },
  ],
};

const NIIT_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
  mfs: 125000,
  hoh: 200000,
};

export default function CapitalGainsTaxCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [ordinaryIncome, setOrdinaryIncome] = useState('');
  const [shortTermGains, setShortTermGains] = useState('');
  const [longTermGains, setLongTermGains] = useState('');

  const ordinary = parseFloat(ordinaryIncome) || 0;
  const stg = parseFloat(shortTermGains) || 0;
  const ltg = parseFloat(longTermGains) || 0;

  // Short-term gains taxed at ordinary rates (stacks on ordinary income)
  // Long-term capital gains rate
  const brackets = LTCG_BRACKETS_2024[filingStatus];
  let ltcgTax = 0;
  let remainingGains = ltg;
  let startPoint = ordinary; // LTCG stacks on top of ordinary income

  for (const bracket of brackets) {
    if (remainingGains <= 0) break;
    const spaceInBracket = Math.max(0, bracket.max - startPoint);
    const gainsInBracket = Math.min(remainingGains, spaceInBracket);
    ltcgTax += gainsInBracket * bracket.rate;
    remainingGains -= gainsInBracket;
    startPoint += gainsInBracket;
  }

  // Determine effective LTCG rate
  const effectiveLTCGRate = ltg > 0 ? ltcgTax / ltg : 0;

  // NIIT calculation
  const totalAGI = ordinary + stg + ltg;
  const niitThreshold = NIIT_THRESHOLD[filingStatus];
  const netInvestmentIncome = stg + ltg;
  const niitBase = Math.min(netInvestmentIncome, Math.max(0, totalAGI - niitThreshold));
  const niitTax = niitBase * 0.038;

  const totalCapGainsTax = ltcgTax + niitTax;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Capital Gains Tax Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect;&sect; 1(h), 1221, 1222</p>

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
          <label className="label-text">Ordinary Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 75000" value={ordinaryIncome} onChange={e => setOrdinaryIncome(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Short-Term Capital Gains ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 10000" value={shortTermGains} onChange={e => setShortTermGains(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Assets held 1 year or less — taxed at ordinary income rates</p>
        </div>
        <div>
          <label className="label-text">Long-Term Capital Gains ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 50000" value={longTermGains} onChange={e => setLongTermGains(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Assets held more than 1 year — preferential 0%/15%/20% rates</p>
        </div>
      </div>

      {(stg > 0 || ltg > 0) && (
        <div className="mt-8 bg-navy-50 rounded-lg p-5">
          <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="text-gray-600">Short-Term Gains:</span>
            <span className="font-medium text-right">{fmt(stg)}</span>
            <span className="text-gray-600">Short-Term Tax Rate:</span>
            <span className="font-medium text-right">Ordinary Rates</span>
            <span className="text-gray-600">Long-Term Gains:</span>
            <span className="font-medium text-right">{fmt(ltg)}</span>
            <span className="text-gray-600">Effective LTCG Rate:</span>
            <span className="font-medium text-right">{(effectiveLTCGRate * 100).toFixed(1)}%</span>
            <span className="text-gray-600">Long-Term CG Tax:</span>
            <span className="font-medium text-right">{fmt(ltcgTax)}</span>
            {niitTax > 0 && (
              <>
                <span className="text-gray-600">NIIT (3.8%):</span>
                <span className="font-medium text-right">{fmt(niitTax)}</span>
              </>
            )}
            <div className="col-span-2 border-t border-navy-200 my-1" />
            <span className="text-navy-500 font-semibold">Total Capital Gains Tax:</span>
            <span className="text-navy-500 font-bold text-right text-lg">{fmt(totalCapGainsTax)}</span>
          </div>
          {niitTax > 0 && (
            <p className="text-xs text-gray-500 mt-3">Net Investment Income Tax (NIIT) applies when AGI exceeds {fmt(niitThreshold)}.</p>
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
