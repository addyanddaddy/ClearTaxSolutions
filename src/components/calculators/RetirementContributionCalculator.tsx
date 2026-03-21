'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

interface PlanLimits {
  name: string;
  under50: number;
  over50: number;
  note: string;
}

const PLANS: PlanLimits[] = [
  { name: '401(k) / 403(b) / 457(b)', under50: 23000, over50: 30500, note: 'Employee elective deferrals' },
  { name: 'Traditional / Roth IRA', under50: 7000, over50: 8000, note: 'Combined limit for all IRAs' },
  { name: 'SEP IRA', under50: 69000, over50: 69000, note: 'Up to 25% of net SE income' },
  { name: 'SIMPLE IRA', under50: 16000, over50: 19500, note: 'Employee contribution limit' },
];

export default function RetirementContributionCalculator() {
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [currentContribution, setCurrentContribution] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('0');
  const [marginalRate, setMarginalRate] = useState('22');

  const ageVal = parseInt(age) || 0;
  const incomeVal = parseFloat(income) || 0;
  const currentVal = parseFloat(currentContribution) || 0;
  const planIdx = parseInt(selectedPlan);
  const rate = parseFloat(marginalRate) / 100;

  const isOver50 = ageVal >= 50;
  const plan = PLANS[planIdx];
  const maxContribution = isOver50 ? plan.over50 : plan.under50;

  // SEP IRA special calculation
  let effectiveMax = maxContribution;
  if (planIdx === 2) {
    effectiveMax = Math.min(maxContribution, incomeVal * 0.25);
  }

  const remainingRoom = Math.max(0, effectiveMax - currentVal);
  const currentTaxSavings = currentVal * rate;
  const additionalSavings = remainingRoom * rate;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Retirement Contribution Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Limits &middot; IRC &sect;&sect; 219, 401(k), 408(k), 408A, 415</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Your Age</label>
          <input type="number" className="input-field" placeholder="e.g. 35" value={age} onChange={e => setAge(e.target.value)} min="0" max="120" />
          <p className="text-xs text-gray-400 mt-1">Age 50+ qualifies for catch-up contributions</p>
        </div>
        <div>
          <label className="label-text">Annual Income ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 100000" value={income} onChange={e => setIncome(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Retirement Plan Type</label>
          <select className="input-field" value={selectedPlan} onChange={e => setSelectedPlan(e.target.value)}>
            {PLANS.map((p, i) => (
              <option key={i} value={i}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-text">Current Annual Contribution ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 10000" value={currentContribution} onChange={e => setCurrentContribution(e.target.value)} min="0" />
        </div>
        <div>
          <label className="label-text">Estimated Marginal Tax Rate (%)</label>
          <select className="input-field" value={marginalRate} onChange={e => setMarginalRate(e.target.value)}>
            <option value="10">10%</option>
            <option value="12">12%</option>
            <option value="22">22%</option>
            <option value="24">24%</option>
            <option value="32">32%</option>
            <option value="35">35%</option>
            <option value="37">37%</option>
          </select>
        </div>
      </div>

      {incomeVal > 0 && (
        <div className="mt-8 space-y-6">
          <div className="bg-navy-50 rounded-lg p-5">
            <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium text-right">{plan.name}</span>
              <span className="text-gray-600">Catch-Up Eligible (50+):</span>
              <span className="font-medium text-right">{isOver50 ? 'Yes' : 'No'}</span>
              <span className="text-gray-600">2024 Maximum Contribution:</span>
              <span className="font-medium text-right">{fmt(effectiveMax)}</span>
              <span className="text-gray-600">Current Contribution:</span>
              <span className="font-medium text-right">{fmt(currentVal)}</span>
              <div className="col-span-2 border-t border-navy-200 my-1" />
              <span className="text-navy-500 font-semibold">Remaining Room:</span>
              <span className="text-navy-500 font-bold text-right text-lg">{fmt(remainingRoom)}</span>
              <span className="text-gray-600">Tax Savings (Current):</span>
              <span className="font-medium text-teal-600 text-right">{fmt(currentTaxSavings)}</span>
              <span className="text-gray-600">Additional Tax Savings if Maxed:</span>
              <span className="font-medium text-teal-600 text-right">{fmt(additionalSavings)}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-navy-500 mb-2">2024 Contribution Limits</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Plan</th>
                    <th className="pb-2 text-right">Under 50</th>
                    <th className="pb-2 text-right">50+</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANS.map((p, i) => (
                    <tr key={i} className={`border-b border-gray-100 ${i === planIdx ? 'bg-teal-50 font-medium' : ''}`}>
                      <td className="py-2">{p.name}</td>
                      <td className="py-2 text-right">{fmt(p.under50)}</td>
                      <td className="py-2 text-right">{fmt(p.over50)}</td>
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
