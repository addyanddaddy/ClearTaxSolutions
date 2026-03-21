"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  DollarSign,
  Briefcase,
  FileText,
  TrendingUp,
  Download,
  PieChart,
} from "lucide-react";

interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  serviceNeeded: string[];
  createdAt: string;
}

interface CaseItem {
  id: string;
  userId: string;
  serviceName: string;
  status: string;
  createdAt: string;
}

interface InvoiceItem {
  id: string;
  userId: string;
  clientName: string;
  description: string;
  amount: number;
  status: string;
  createdAt: string;
  paidAt?: string;
}

interface DocumentItem {
  id: string;
  userId: string;
  status: string;
}

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-500",
  "In Review": "bg-purple-500",
  "Documents Needed": "bg-amber-500",
  "In Progress": "bg-teal-500",
  Filed: "bg-emerald-500",
  Complete: "bg-gray-400",
};

export default function AdminReportsPage() {
  const [clients, setClients] = useState<UserItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    const users: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    setClients(users.filter((u) => u.role === "client"));
    setCases(JSON.parse(localStorage.getItem("cts_cases") || "[]"));
    setInvoices(JSON.parse(localStorage.getItem("cts_invoices") || "[]"));
    setDocuments(JSON.parse(localStorage.getItem("cts_documents") || "[]"));
  }, []);

  // Client Growth - by month
  const clientsByMonth: Record<string, number> = {};
  clients.forEach((c) => {
    const date = new Date(c.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    clientsByMonth[key] = (clientsByMonth[key] || 0) + 1;
  });
  const sortedMonths = Object.keys(clientsByMonth).sort();

  // Revenue
  const totalInvoiced = invoices.reduce((sum, i) => sum + i.amount, 0);
  const totalCollected = invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0);
  const totalOutstanding = totalInvoiced - totalCollected;

  // Case Status
  const caseStatusCounts: Record<string, number> = {};
  cases.forEach((c) => {
    caseStatusCounts[c.status] = (caseStatusCounts[c.status] || 0) + 1;
  });

  // Service Popularity
  const serviceCounts: Record<string, number> = {};
  cases.forEach((c) => {
    serviceCounts[c.serviceName] = (serviceCounts[c.serviceName] || 0) + 1;
  });
  const sortedServices = Object.entries(serviceCounts).sort(([, a], [, b]) => b - a);

  // Document Status
  const pendingDocs = documents.filter((d) => d.status === "Pending Review").length;
  const reviewedDocs = documents.filter((d) => d.status === "Reviewed").length;
  const actionDocs = documents.filter((d) => d.status === "Action Required").length;

  const exportCSV = () => {
    const headers = ["Type", "Client", "Service", "Status", "Amount", "Date"];
    const rows: string[][] = [];

    // Add clients
    clients.forEach((c) => {
      rows.push(["Client", `${c.firstName} ${c.lastName}`, c.serviceNeeded.join("; "), "", "", c.createdAt]);
    });

    // Add cases
    cases.forEach((c) => {
      const client = clients.find((u) => u.id === c.userId);
      rows.push(["Case", client ? `${client.firstName} ${client.lastName}` : "", c.serviceName, c.status, "", c.createdAt]);
    });

    // Add invoices
    invoices.forEach((i) => {
      rows.push(["Invoice", i.clientName, i.description, i.status, String(i.amount), i.createdAt]);
    });

    const csvContent = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cts_report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const maxCaseCount = Math.max(...Object.values(caseStatusCounts), 1);
  const maxServiceCount = Math.max(...sortedServices.map(([, count]) => count), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Reports</h1>
          <p className="text-gray-500 mt-1">Business analytics and insights</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition font-medium text-sm"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total Clients</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-sm text-gray-500">Total Cases</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{cases.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-500">Revenue Collected</span>
          </div>
          <p className="text-3xl font-bold text-emerald-600">${totalCollected.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-gray-500">Documents</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Growth */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            Client Growth
          </h2>
          {sortedMonths.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No client data yet</p>
          ) : (
            <div className="space-y-3">
              {sortedMonths.map((month) => {
                const count = clientsByMonth[month];
                const date = new Date(month + "-01");
                const label = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                return (
                  <div key={month} className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-20">{label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-teal-500 h-full rounded-full flex items-center justify-end px-2"
                        style={{ width: `${Math.max((count / Math.max(...Object.values(clientsByMonth))) * 100, 15)}%` }}
                      >
                        <span className="text-xs text-white font-medium">{count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Revenue Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy-700 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Revenue Summary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">Total Invoiced</span>
              <span className="text-lg font-bold text-gray-900">${totalInvoiced.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
              <span className="text-sm text-emerald-700">Total Collected</span>
              <span className="text-lg font-bold text-emerald-600">${totalCollected.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
              <span className="text-sm text-amber-700">Outstanding</span>
              <span className="text-lg font-bold text-amber-600">${totalOutstanding.toLocaleString()}</span>
            </div>
            {totalInvoiced > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                  <span>Collection Rate</span>
                  <span>{Math.round((totalCollected / totalInvoiced) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all"
                    style={{ width: `${(totalCollected / totalInvoiced) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Case Status Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy-700 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            Case Status Breakdown
          </h2>
          {Object.keys(caseStatusCounts).length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No cases yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(caseStatusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[status] || "bg-gray-400"}`} />
                  <span className="text-sm text-gray-600 w-36">{status}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className={`${STATUS_COLORS[status] || "bg-gray-400"} h-full rounded-full flex items-center justify-end px-2`}
                      style={{ width: `${Math.max((count / maxCaseCount) * 100, 15)}%` }}
                    >
                      <span className="text-xs text-white font-medium">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-100 text-right">
                <span className="text-sm text-gray-500">Total: {cases.length} cases</span>
              </div>
            </div>
          )}
        </div>

        {/* Service Popularity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy-700 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Service Popularity
          </h2>
          {sortedServices.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No service data yet</p>
          ) : (
            <div className="space-y-3">
              {sortedServices.map(([service, count], idx) => (
                <div key={service} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 font-medium w-8">{idx + 1}.</span>
                  <span className="text-sm text-gray-600 flex-1 min-w-0 truncate">{service}</span>
                  <div className="w-24 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-navy-500 h-full rounded-full flex items-center justify-end px-2"
                      style={{ width: `${Math.max((count / maxServiceCount) * 100, 20)}%` }}
                    >
                      <span className="text-xs text-white font-medium">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-navy-700 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-600" />
          Document Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-amber-50 rounded-xl">
            <p className="text-3xl font-bold text-amber-600">{pendingDocs}</p>
            <p className="text-sm text-gray-500 mt-1">Pending Review</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <p className="text-3xl font-bold text-emerald-600">{reviewedDocs}</p>
            <p className="text-sm text-gray-500 mt-1">Reviewed</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <p className="text-3xl font-bold text-red-600">{actionDocs}</p>
            <p className="text-sm text-gray-500 mt-1">Action Required</p>
          </div>
        </div>
        {documents.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-0 rounded-full overflow-hidden h-4">
              {pendingDocs > 0 && (
                <div className="bg-amber-500 h-full" style={{ width: `${(pendingDocs / documents.length) * 100}%` }} />
              )}
              {reviewedDocs > 0 && (
                <div className="bg-emerald-500 h-full" style={{ width: `${(reviewedDocs / documents.length) * 100}%` }} />
              )}
              {actionDocs > 0 && (
                <div className="bg-red-500 h-full" style={{ width: `${(actionDocs / documents.length) * 100}%` }} />
              )}
            </div>
            <p className="text-xs text-gray-400 text-right mt-1">{documents.length} total documents</p>
          </div>
        )}
      </div>
    </div>
  );
}
