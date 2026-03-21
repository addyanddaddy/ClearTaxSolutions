'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

const SS_WAGE_BASE_2024 = 168600;
const SS_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const FUTA_WAGE_BASE = 7000;
const FUTA_RATE = 0.06;
const FUTA_CREDIT = 0.054;
const FUTA_NET_RATE = FUTA_RATE - FUTA_CREDIT;

export default function PayrollTaxCalculator() {
  const [numEmployees, setNumEmployees] = useState('1');
  const [annualWages, setAnnualWages] = useState('');
  const [payFrequency, setPayFrequency] = useState('26');

  const employees = Math.max(1, parseInt(numEmployees) || 1);
  const wages = parseFloat(annualWages) || 0;
  const periods = parseInt(payFrequency);

  const perEmployeeWages = wages;

  // Employee share
  const empSS = Math.min(perEmployeeWages, SS_WAGE_BASE_2024) * SS_RATE;
  const empMedicare = perEmployeeWages * MEDICARE_RATE;
  const empAdditionalMedicare = Math.max(0, perEmployeeWages - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE;
  const empTotal = empSS + empMedicare + empAdditionalMedicare;

  // Employer share
  const erSS = Math.min(perEmployeeWages, SS_WAGE_BASE_2024) * SS_RATE;
  const erMedicare = perEmployeeWages * MEDICARE_RATE;
  const erFUTA = Math.min(perEmployeeWages, FUTA_WAGE_BASE) * FUTA_NET_RATE;
  const erTotal = erSS + erMedicare + erFUTA;

  const totalPerEmployee = empTotal + erTotal;
  const totalAllEmployees = totalPerEmployee * employees;
  const erTotalAll = erTotal * employees;

  const perPaycheckEmployee = periods > 0 ? empTotal / periods : 0;
  const perPaycheckEmployer = periods > 0 ? erTotal / periods : 0;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Payroll Tax Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect;&sect; 3101, 3111, 3301</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Number of Employees</label>
          <input type="number" className="input-field" placeholder="e.g. 5" value={numEmployees} onChange={e => setNumEmployees(e.target.value)} min="1" />
        </div>
        <div>
          <label className="label-text">Annual Wages per Employee ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 55000" value={annualWages} onChange={e => setAnnualWages(e.target.value)} min="0" />
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

      {wages > 0 && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-navy-50 rounded-lg p-5">
              <h3 className="font-semibold text-navy-500 mb-3">Employee Share (per employee)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Social Security (6.2%):</span>
                  <span className="font-medium">{fmt(empSS)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medicare (1.45%):</span>
                  <span className="font-medium">{fmt(empMedicare)}</span>
                </div>
                {empAdditionalMedicare > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Add&apos;l Medicare (0.9%):</span>
                    <span className="font-medium">{fmt(empAdditionalMedicare)}</span>
                  </div>
                )}
                <div className="border-t border-navy-200 pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{fmt(empTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Per Paycheck:</span>
                  <span>{fmt(perPaycheckEmployee)}</span>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 rounded-lg p-5">
              <h3 className="font-semibold text-teal-700 mb-3">Employer Share (per employee)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Social Security (6.2%):</span>
                  <span className="font-medium">{fmt(erSS)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medicare (1.45%):</span>
                  <span className="font-medium">{fmt(erMedicare)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">FUTA (0.6%):</span>
                  <span className="font-medium">{fmt(erFUTA)}</span>
                </div>
                <div className="border-t border-teal-200 pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{fmt(erTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Per Paycheck:</span>
                  <span>{fmt(perPaycheckEmployer)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy-50 rounded-lg p-5">
            <h3 className="font-semibold text-navy-500 mb-3">Total Payroll Tax Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="text-gray-600">Total FICA per Employee:</span>
              <span className="font-medium text-right">{fmt(totalPerEmployee)}</span>
              <span className="text-gray-600">Number of Employees:</span>
              <span className="font-medium text-right">{employees}</span>
              <div className="col-span-2 border-t border-navy-200 my-1" />
              <span className="text-navy-500 font-semibold">Total Employer Cost (Annual):</span>
              <span className="text-navy-500 font-bold text-right text-lg">{fmt(erTotalAll)}</span>
              <span className="text-gray-600">Total All Payroll Taxes:</span>
              <span className="font-bold text-right">{fmt(totalAllEmployees)}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
            <p><strong>Note:</strong> Social Security tax applies to wages up to {fmt(SS_WAGE_BASE_2024)}. FUTA applies to the first {fmt(FUTA_WAGE_BASE)} per employee (net rate {(FUTA_NET_RATE * 100).toFixed(1)}% after the 5.4% state credit). Additional Medicare Tax (0.9%) applies to employee wages over {fmt(ADDITIONAL_MEDICARE_THRESHOLD)} — paid by employee only.</p>
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
