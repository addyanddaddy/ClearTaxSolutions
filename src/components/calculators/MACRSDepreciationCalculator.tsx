'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtPct(n: number): string {
  return (n * 100).toFixed(2) + '%';
}

// MACRS half-year convention percentages (200% DB switching to SL)
const MACRS_RATES: Record<number, number[]> = {
  3: [0.3333, 0.4445, 0.1481, 0.0741],
  5: [0.2000, 0.3200, 0.1920, 0.1152, 0.1152, 0.0576],
  7: [0.1429, 0.2449, 0.1749, 0.1249, 0.0893, 0.0892, 0.0893, 0.0446],
  10: [0.1000, 0.1800, 0.1440, 0.1152, 0.0922, 0.0737, 0.0655, 0.0655, 0.0656, 0.0655, 0.0328],
  15: [0.0500, 0.0950, 0.0855, 0.0770, 0.0693, 0.0623, 0.0590, 0.0590, 0.0591, 0.0590, 0.0591, 0.0590, 0.0591, 0.0590, 0.0591, 0.0295],
  20: [0.0375, 0.0722, 0.0668, 0.0618, 0.0571, 0.0528, 0.0489, 0.0452, 0.0447, 0.0447, 0.0446, 0.0446, 0.0446, 0.0446, 0.0446, 0.0446, 0.0446, 0.0446, 0.0446, 0.0446, 0.0223],
};

// Straight-line for residential (27.5) and commercial (39)
const SL_YEARS: Record<string, number> = {
  '27.5': 27.5,
  '39': 39,
};

interface AssetClass {
  label: string;
  years: number | string;
  example: string;
}

const ASSET_CLASSES: AssetClass[] = [
  { label: '3-Year Property', years: 3, example: 'Tractor units, racehorses' },
  { label: '5-Year Property', years: 5, example: 'Computers, vehicles, office equipment' },
  { label: '7-Year Property', years: 7, example: 'Office furniture, fixtures' },
  { label: '10-Year Property', years: 10, example: 'Vessels, barges, single-purpose structures' },
  { label: '15-Year Property', years: 15, example: 'Land improvements, restaurant property' },
  { label: '20-Year Property', years: 20, example: 'Farm buildings, municipal sewers' },
  { label: '27.5-Year Residential Rental', years: '27.5', example: 'Residential rental property' },
  { label: '39-Year Nonresidential Real', years: '39', example: 'Commercial buildings, offices' },
];

const BONUS_DEPRECIATION_2024 = 0.60;

export default function MACRSDepreciationCalculator() {
  const [assetCost, setAssetCost] = useState('');
  const [assetClass, setAssetClass] = useState('1'); // index into ASSET_CLASSES
  const [useBonus, setUseBonus] = useState(true);
  const [businessUsePct, setBusinessUsePct] = useState('100');

  const cost = parseFloat(assetCost) || 0;
  const classIdx = parseInt(assetClass);
  const selected = ASSET_CLASSES[classIdx];
  const busPct = Math.min(100, Math.max(0, parseFloat(businessUsePct) || 0)) / 100;
  const depreciableBasis = cost * busPct;

  const years = selected.years;
  const isRealProperty = typeof years === 'string';

  const schedule: { year: number; rate: number; deduction: number; accumulated: number }[] = [];
  let bonusAmount = 0;
  let basisAfterBonus = depreciableBasis;

  // Real property doesn't get bonus depreciation (simplified)
  if (!isRealProperty && useBonus) {
    bonusAmount = depreciableBasis * BONUS_DEPRECIATION_2024;
    basisAfterBonus = depreciableBasis - bonusAmount;
  }

  if (isRealProperty) {
    const slYears = SL_YEARS[years as string];
    const annualDeduction = depreciableBasis / slYears;
    let accumulated = 0;
    // First year: half-month convention (simplified to half year)
    const firstYear = annualDeduction / 2;
    accumulated += firstYear;
    schedule.push({ year: 1, rate: 1 / slYears / 2, deduction: firstYear, accumulated });

    for (let i = 2; i <= Math.ceil(slYears); i++) {
      const ded = i <= slYears ? annualDeduction : annualDeduction / 2;
      accumulated += ded;
      schedule.push({ year: i, rate: 1 / slYears, deduction: ded, accumulated });
    }
  } else {
    const rates = MACRS_RATES[years as number] || [];
    let accumulated = bonusAmount;
    rates.forEach((rate, i) => {
      const deduction = basisAfterBonus * rate;
      accumulated += deduction;
      schedule.push({ year: i + 1, rate, deduction, accumulated });
    });
  }

  const firstYearDeduction = bonusAmount + (schedule[0]?.deduction || 0);

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">MACRS Depreciation Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect; 168; Rev. Proc. 87-56</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Asset Cost ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 50000" value={assetCost} onChange={e => setAssetCost(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Asset Class</label>
          <select className="input-field" value={assetClass} onChange={e => setAssetClass(e.target.value)}>
            {ASSET_CLASSES.map((ac, i) => (
              <option key={i} value={i}>{ac.label} — {ac.example}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text">Business-Use Percentage (%)</label>
          <input type="number" className="input-field" placeholder="100" value={businessUsePct} onChange={e => setBusinessUsePct(e.target.value)} min="0" max="100" />
        </div>
        {!isRealProperty && (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bonus"
              checked={useBonus}
              onChange={e => setUseBonus(e.target.checked)}
              className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500"
            />
            <label htmlFor="bonus" className="text-sm text-gray-700">
              Apply Bonus Depreciation (60% for 2024)
            </label>
          </div>
        )}
      </div>

      {cost > 0 && (
        <div className="mt-8 space-y-6">
          <div className="bg-navy-50 rounded-lg p-5">
            <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="text-gray-600">Asset Cost:</span>
              <span className="font-medium text-right">{fmt(cost)}</span>
              <span className="text-gray-600">Depreciable Basis:</span>
              <span className="font-medium text-right">{fmt(depreciableBasis)}</span>
              <span className="text-gray-600">Recovery Period:</span>
              <span className="font-medium text-right">{years} years</span>
              {bonusAmount > 0 && (
                <>
                  <span className="text-gray-600">Bonus Depreciation (60%):</span>
                  <span className="font-medium text-right">{fmt(bonusAmount)}</span>
                </>
              )}
              <div className="col-span-2 border-t border-navy-200 my-1" />
              <span className="text-navy-500 font-semibold">First-Year Deduction:</span>
              <span className="text-navy-500 font-bold text-right text-lg">{fmt(firstYearDeduction)}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-navy-500 mb-2">Depreciation Schedule</h3>
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Year</th>
                    <th className="pb-2 text-right">Rate</th>
                    <th className="pb-2 text-right">Deduction</th>
                    <th className="pb-2 text-right">Accumulated</th>
                  </tr>
                </thead>
                <tbody>
                  {bonusAmount > 0 && (
                    <tr className="border-b border-gray-100 bg-teal-50">
                      <td className="py-2 font-medium">Bonus</td>
                      <td className="py-2 text-right">60.00%</td>
                      <td className="py-2 text-right">{fmt(bonusAmount)}</td>
                      <td className="py-2 text-right">{fmt(bonusAmount)}</td>
                    </tr>
                  )}
                  {schedule.map((row) => (
                    <tr key={row.year} className="border-b border-gray-100">
                      <td className="py-2 font-medium">{row.year}</td>
                      <td className="py-2 text-right">{fmtPct(row.rate)}</td>
                      <td className="py-2 text-right">{fmt(row.deduction)}</td>
                      <td className="py-2 text-right">{fmt(row.accumulated)}</td>
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
        <Link href="/book" className="btn-primary">Book Free Consultation</Link>
      </div>
    </div>
  );
}
