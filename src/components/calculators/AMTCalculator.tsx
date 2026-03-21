'use client';

import { useState } from 'react';
import Link from 'next/link';

type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const AMT_EXEMPTION_2024: Record<FilingStatus, number> = {
  single: 85700,
  mfj: 133300,
  mfs: 66650,
  hoh: 85700,
};

const AMT_PHASEOUT_2024: Record<FilingStatus, number> = {
  single: 609350,
  mfj: 1218700,
  mfs: 609350,
  hoh: 609350,
};

const AMT_28_THRESHOLD: Record<FilingStatus, number> = {
  single: 232600,
  mfj: 232600,
  mfs: 116300,
  hoh: 232600,
};

export default function AMTCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [regularTaxableIncome, setRegularTaxableIncome] = useState('');
  const [regularTax, setRegularTax] = useState('');
  const [saltDeducted, setSaltDeducted] = useState('');
  const [isoExercise, setIsoExercise] = useState('');
  const [otherPreferences, setOtherPreferences] = useState('');

  const rti = parseFloat(regularTaxableIncome) || 0;
  const regTax = parseFloat(regularTax) || 0;
  const salt = parseFloat(saltDeducted) || 0;
  const iso = parseFloat(isoExercise) || 0;
  const other = parseFloat(otherPreferences) || 0;

  // AMTI = regular taxable income + preference items
  const amti = rti + salt + iso + other;

  // Exemption with phase-out
  const exemption = AMT_EXEMPTION_2024[filingStatus];
  const phaseoutStart = AMT_PHASEOUT_2024[filingStatus];
  const excessOverPhaseout = Math.max(0, amti - phaseoutStart);
  const exemptionReduction = excessOverPhaseout * 0.25;
  const adjustedExemption = Math.max(0, exemption - exemptionReduction);

  const amtBase = Math.max(0, amti - adjustedExemption);

  // AMT rates: 26% / 28%
  const threshold28 = AMT_28_THRESHOLD[filingStatus];
  let tentativeMinTax = 0;
  if (amtBase <= threshold28) {
    tentativeMinTax = amtBase * 0.26;
  } else {
    tentativeMinTax = threshold28 * 0.26 + (amtBase - threshold28) * 0.28;
  }

  const amtOwed = Math.max(0, tentativeMinTax - regTax);

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Alternative Minimum Tax (AMT) Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect;&sect; 55, 56, 57</p>

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
          <label className="label-text">Regular Taxable Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 200000" value={regularTaxableIncome} onChange={e => setRegularTaxableIncome(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Regular Tax Liability ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 40000" value={regularTax} onChange={e => setRegularTax(e.target.value)} min="0" />
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-navy-500 mb-3">AMT Preference Items / Adjustments</h3>
        </div>

        <div>
          <label className="label-text">SALT Deducted (Add Back) ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 10000" value={saltDeducted} onChange={e => setSaltDeducted(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">ISO Exercise Spread ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 50000" value={isoExercise} onChange={e => setIsoExercise(e.target.value)} min="0" />
          <p className="text-xs text-gray-400 mt-1">Fair market value minus exercise price of incentive stock options</p>
        </div>
        <div>
          <label className="label-text">Other Preference Items ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 0" value={otherPreferences} onChange={e => setOtherPreferences(e.target.value)} min="0" />
        </div>
      </div>

      {rti > 0 && (
        <div className="mt-8 bg-navy-50 rounded-lg p-5">
          <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="text-gray-600">Regular Taxable Income:</span>
            <span className="font-medium text-right">{fmt(rti)}</span>
            <span className="text-gray-600">AMT Adjustments:</span>
            <span className="font-medium text-right">+{fmt(salt + iso + other)}</span>
            <span className="text-gray-600">AMTI:</span>
            <span className="font-medium text-right">{fmt(amti)}</span>
            <span className="text-gray-600">AMT Exemption:</span>
            <span className="font-medium text-right">{fmt(adjustedExemption)}</span>
            <span className="text-gray-600">AMT Base:</span>
            <span className="font-medium text-right">{fmt(amtBase)}</span>
            <span className="text-gray-600">Tentative Minimum Tax:</span>
            <span className="font-medium text-right">{fmt(tentativeMinTax)}</span>
            <span className="text-gray-600">Regular Tax:</span>
            <span className="font-medium text-right">{fmt(regTax)}</span>
            <div className="col-span-2 border-t border-navy-200 my-1" />
            <span className="text-navy-500 font-semibold">AMT Owed:</span>
            <span className={`font-bold text-right text-lg ${amtOwed > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {fmt(amtOwed)}
            </span>
          </div>

          {amtOwed === 0 && (
            <p className="text-sm text-green-700 mt-3 font-medium">No AMT is owed. Your regular tax exceeds the tentative minimum tax.</p>
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
