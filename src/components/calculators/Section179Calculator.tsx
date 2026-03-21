'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const MAX_DEDUCTION_2024 = 1220000;
const PHASEOUT_START_2024 = 3050000;

export default function Section179Calculator() {
  const [assetCost, setAssetCost] = useState('');
  const [businessUsePct, setBusinessUsePct] = useState('100');
  const [totalAssetsPlaced, setTotalAssetsPlaced] = useState('');
  const [taxableIncome, setTaxableIncome] = useState('');

  const cost = parseFloat(assetCost) || 0;
  const busPct = Math.min(100, Math.max(0, parseFloat(businessUsePct) || 0)) / 100;
  const totalPlaced = parseFloat(totalAssetsPlaced) || cost;
  const taxIncome = parseFloat(taxableIncome) || Infinity;

  const eligibleCost = cost * busPct;

  // Phase-out: dollar-for-dollar reduction when total assets placed exceed threshold
  const excessOverThreshold = Math.max(0, totalPlaced - PHASEOUT_START_2024);
  const adjustedLimit = Math.max(0, MAX_DEDUCTION_2024 - excessOverThreshold);

  // Deduction limited by eligible cost, adjusted limit, and taxable income
  const deduction = Math.min(eligibleCost, adjustedLimit, taxIncome);
  const taxSavingsEstimate = deduction * 0.24; // Approximate 24% bracket

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Section 179 Deduction Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect; 179</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Asset Purchase Price ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 50000" value={assetCost} onChange={e => setAssetCost(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Business-Use Percentage (%)</label>
          <input type="number" className="input-field" placeholder="100" value={businessUsePct} onChange={e => setBusinessUsePct(e.target.value)} min="0" max="100" />
          <p className="text-xs text-gray-400 mt-1">Must be more than 50% for Section 179 eligibility</p>
        </div>
        <div>
          <label className="label-text">Total Assets Placed in Service This Year ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 50000" value={totalAssetsPlaced} onChange={e => setTotalAssetsPlaced(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Phase-out begins at {fmt(PHASEOUT_START_2024)}</p>
        </div>
        <div>
          <label className="label-text">Taxable Business Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 200000" value={taxableIncome} onChange={e => setTaxableIncome(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Section 179 cannot create or increase a net loss</p>
        </div>
      </div>

      {cost > 0 && (
        <div className="mt-8 bg-navy-50 rounded-lg p-5">
          <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="text-gray-600">Asset Cost:</span>
            <span className="font-medium text-right">{fmt(cost)}</span>
            <span className="text-gray-600">Business-Use Amount:</span>
            <span className="font-medium text-right">{fmt(eligibleCost)}</span>
            <span className="text-gray-600">2024 Max Deduction Limit:</span>
            <span className="font-medium text-right">{fmt(MAX_DEDUCTION_2024)}</span>
            <span className="text-gray-600">Phase-Out Reduction:</span>
            <span className="font-medium text-right">{fmt(excessOverThreshold)}</span>
            <span className="text-gray-600">Adjusted Limit:</span>
            <span className="font-medium text-right">{fmt(adjustedLimit)}</span>
            <div className="col-span-2 border-t border-navy-200 my-1" />
            <span className="text-navy-500 font-semibold">Section 179 Deduction:</span>
            <span className="text-navy-500 font-bold text-right text-lg">{fmt(deduction)}</span>
            <span className="text-gray-600">Estimated Tax Savings (24%):</span>
            <span className="font-medium text-teal-600 text-right">{fmt(taxSavingsEstimate)}</span>
          </div>
          {busPct < 0.5 && busPct > 0 && (
            <p className="text-xs text-red-600 mt-3 font-medium">Warning: Business use must exceed 50% for Section 179 eligibility.</p>
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
