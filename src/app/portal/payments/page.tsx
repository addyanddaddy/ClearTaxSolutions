"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  CreditCard,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  X,
  Send,
  Shield,
  Info,
} from "lucide-react";

interface Invoice {
  id: string;
  userId: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "Pending" | "Paid" | "Overdue";
  caseService: string;
}

interface Payment {
  id: string;
  userId: string;
  description: string;
  amount: number;
  date: string;
  method: string;
  receiptId: string;
  caseService: string;
}

const INVOICE_STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
};

export default function PaymentsPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteDescription, setQuoteDescription] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);

  useEffect(() => {
    if (!user) return;
    try {
      const storedInvoices = JSON.parse(localStorage.getItem("cts_invoices") || "[]");
      setInvoices(storedInvoices.filter((i: Invoice) => i.userId === user.id));

      const storedPayments = JSON.parse(localStorage.getItem("cts_payments") || "[]");
      setPayments(storedPayments.filter((p: Payment) => p.userId === user.id));
    } catch {
      // handle error
    }
  }, [user]);

  if (!user) return null;

  const totalOutstanding = invoices
    .filter((i) => i.status !== "Paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  const handlePayNow = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPayModal(true);
  };

  const handleSendQuoteRequest = () => {
    if (!quoteDescription.trim()) return;

    const messages = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    messages.push({
      id: `msg-${Date.now()}`,
      userId: user.id,
      subject: "Quote Request",
      body: `I'd like to request a quote for the following:\n\n${quoteDescription}`,
      from: `${user.firstName} ${user.lastName}`,
      to: "Joseph Gasana, EA",
      date: new Date().toISOString(),
      read: true,
      caseId: null,
    });
    localStorage.setItem("cts_messages", JSON.stringify(messages));

    setQuoteSent(true);
    setQuoteDescription("");
    setTimeout(() => {
      setQuoteSent(false);
      setShowQuoteForm(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1">Manage invoices and payment history</p>
      </div>

      {/* Payment Header */}
      <div className="bg-gradient-to-r from-navy-500 to-navy-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-teal-300" />
          <span className="font-medium">Payments are processed securely via Square</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <p className="text-navy-200 text-sm">Outstanding Balance</p>
            <p className="text-3xl font-bold mt-1">${totalOutstanding.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-navy-200 text-sm">Total Paid</p>
            <p className="text-3xl font-bold mt-1">${totalPaid.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-navy-200 text-sm">Pending Invoices</p>
            <p className="text-3xl font-bold mt-1">
              {invoices.filter((i) => i.status !== "Paid").length}
            </p>
          </div>
        </div>
      </div>

      {/* Quote-Based Pricing Notice */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-teal-800">Quote-Based Pricing</h3>
            <p className="text-sm text-teal-700 mt-1">
              Clear Tax Solutions pricing is based on the complexity of your specific tax situation.
              After reviewing your documents and case details, Joseph will provide a custom quote
              tailored to your needs. No surprises — you&apos;ll always know the cost before work begins.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="mt-3 text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <DollarSign className="w-4 h-4" /> Request a Quote
            </button>
          </div>
        </div>
      </div>

      {/* Outstanding Invoices */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Outstanding Invoices</h2>
        </div>
        {invoices.filter((i) => i.status !== "Paid").length === 0 ? (
          <div className="p-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No outstanding invoices</p>
            <p className="text-sm text-gray-400 mt-1">
              You&apos;re all caught up! Invoices will appear here when issued.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Due Date</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices
                  .filter((i) => i.status !== "Paid")
                  .map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{invoice.description}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">${invoice.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${INVOICE_STATUS_COLORS[invoice.status]}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handlePayNow(invoice)}
                          className="btn-primary text-sm py-2 px-4"
                        >
                          Pay Now
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
        </div>
        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No payment history yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Your payment records will appear here after payments are processed.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Method</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((pmt) => (
                  <tr key={pmt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(pmt.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{pmt.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${pmt.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{pmt.method}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                        onClick={() => alert("Receipt download will be available with Square integration.")}
                      >
                        <FileText className="w-4 h-4 inline mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pay Now Modal */}
      {showPayModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowPayModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10">
            <button
              onClick={() => setShowPayModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Pay Invoice</h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedInvoice.invoiceNumber} &bull; {selectedInvoice.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
              <p className="text-sm text-gray-500">Amount Due</p>
              <p className="text-3xl font-bold text-gray-900">${selectedInvoice.amount.toFixed(2)}</p>
            </div>

            {/* Square Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="font-medium text-gray-600">Square Web Payments</p>
              <p className="text-sm text-gray-400 mt-2">
                Square payment processing will be activated upon account setup.
                You&apos;ll be able to pay securely with credit card, debit card, or ACH.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 justify-center">
              <Shield className="w-3.5 h-3.5" />
              Secured by Square &bull; PCI DSS Compliant
            </div>
          </div>
        </div>
      )}

      {/* Quote Request Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowQuoteForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10">
            <button
              onClick={() => setShowQuoteForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Request a Quote</h3>
              <p className="text-sm text-gray-500 mt-1">
                Describe the services you need priced
              </p>
            </div>

            {quoteSent ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium text-gray-900">Quote Request Sent!</p>
                <p className="text-sm text-gray-500 mt-1">
                  Joseph will review your request and provide a custom quote.
                </p>
              </div>
            ) : (
              <>
                <textarea
                  value={quoteDescription}
                  onChange={(e) => setQuoteDescription(e.target.value)}
                  className="input-field min-h-[120px] resize-y"
                  placeholder="Describe what services you need priced. Include any relevant details about your tax situation, business type, number of returns, etc."
                  rows={5}
                />
                <button
                  onClick={handleSendQuoteRequest}
                  disabled={!quoteDescription.trim()}
                  className="w-full btn-primary mt-4"
                >
                  <Send className="w-4 h-4 mr-2" /> Send Quote Request
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
