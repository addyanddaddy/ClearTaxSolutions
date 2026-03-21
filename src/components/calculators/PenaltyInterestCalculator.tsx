'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export default function PenaltyInterestCalculator() {
  const [taxOwed, setTaxOwed] = useState('');
  const [monthsLateFile, setMonthsLateFile] = useState('');
  const [monthsLatePay, setMonthsLatePay] = useState('');
  const [underpaymentAmount, setUnderpaymentAmount] = useState('');
  const [underpaymentMonths, setUnderpaymentMonths] = useState('');

  const tax = parseFloat(taxOwed) || 0;
  const fileLate = Math.min(parseInt(monthsLateFile) || 0, 60);
  const payLate = Math.min(parseInt(monthsLatePay) || 0, 60);
  const underAmt = parseFloat(underpaymentAmount) || 0;
  const underMo = parseInt(underpaymentMonths) || 0;

  // Failure to file: 5% per month, max 25%
  const ftfRate = Math.min(fileLate * 0.05, 0.25);
  const ftfPenalty = tax * ftfRate;

  // Failure to pay: 0.5% per month, max 25%
  const ftpRate = Math.min(payLate * 0.005, 0.25);
  const ftpPenalty = tax * ftpRate;

  // When both apply, FTF is reduced by FTP
  const combinedFTF = fileLate > 0 && payLate > 0
    ? Math.max(0, ftfPenalty - tax * Math.min(Math.min(fileLate, payLate) * 0.005, 0.25))
    : ftfPenalty;

  // Underpayment interest: 8% annual rate for 2024 (compounded daily, simplified monthly)
  const annualRate = 0.08;
  const monthlyRate = annualRate / 12;
  const underpaymentInterest = underAmt * monthlyRate * underMo;

  const totalPenaltiesAndInterest = combinedFTF + ftpPenalty + underpaymentInterest;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-navy-500 mb-1">Penalty & Interest Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">2024 Tax Year &middot; IRC &sect;&sect; 6601, 6651, 6654, 6656</p>

      <div className="space-y-4">
        <div>
          <label className="label-text">Tax Owed ($)</label>
          <input type="number" className="input-field" placeholder="e.g. 5000" value={taxOwed} onChange={e => setTaxOwed(e.target.value)} min="0" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-text">Months Late Filing</label>
            <input type="number" className="input-field" placeholder="e.g. 3" value={monthsLateFile} onChange={e => setMonthsLateFile(e.target.value)} min="0" max="60" />
            <p className="text-xs text-gray-400 mt-1">5% per month, max 25%</p>
          </div>
          <div>
            <label className="label-text">Months Late Paying</label>
            <input type="number" className="input-field" placeholder="e.g. 6" value={monthsLatePay} onChange={e => setMonthsLatePay(e.target.value)} min="0" max="60" />
            <p className="text-xs text-gray-400 mt-1">0.5% per month, max 25%</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-navy-500 mb-3">Underpayment Interest</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-text">Underpayment Amount ($)</label>
            <input type="number" className="input-field" placeholder="e.g. 3000" value={underpaymentAmount} onChange={e => setUnderpaymentAmount(e.target.value)} min="0" />
          </div>
          <div>
            <label className="label-text">Months of Underpayment</label>
            <input type="number" className="input-field" placeholder="e.g. 6" value={underpaymentMonths} onChange={e => setUnderpaymentMonths(e.target.value)} min="0" />
          </div>
        </div>
        <p className="text-xs text-gray-400">2024 underpayment interest rate: 8% per annum</p>
      </div>

      {(tax > 0 || underAmt > 0) && (
        <div className="mt-8 bg-navy-50 rounded-lg p-5">
          <h3 className="font-semibold text-navy-500 mb-3">Results Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {tax > 0 && (
              <>
                <span className="text-gray-600">Tax Owed:</span>
                <span className="font-medium text-right">{fmt(tax)}</span>
                <span className="text-gray-600">Failure-to-File Penalty:</span>
                <span className="font-medium text-right">{fmt(combinedFTF)}</span>
                <span className="text-gray-600">Failure-to-Pay Penalty:</span>
                <span className="font-medium text-right">{fmt(ftpPenalty)}</span>
              </>
            )}
            {underAmt > 0 && (
              <>
                <span className="text-gray-600">Underpayment Interest:</span>
                <span className="font-medium text-right">{fmt(underpaymentInterest)}</span>
              </>
            )}
            <div className="col-span-2 border-t border-navy-200 my-1" />
            <span className="text-navy-500 font-semibold">Total Penalties & Interest:</span>
            <span className="text-navy-500 font-bold text-right text-lg">{fmt(totalPenaltiesAndInterest)}</span>
            {tax > 0 && (
              <>
                <span className="text-gray-600">Total Amount Due:</span>
                <span className="font-bold text-red-600 text-right">{fmt(tax + totalPenaltiesAndInterest)}</span>
              </>
            )}
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
