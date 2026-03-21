"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Briefcase,
  FileText,
  DollarSign,
  FileCheck,
  UserPlus,
  Receipt,
  Send,
  Eye,
  Upload,
  BarChart3,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface CaseItem {
  id: string;
  userId: string;
  serviceName: string;
  status: string;
  createdAt: string;
  events?: { date: string; description: string; type: string }[];
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
  fileName: string;
  status: string;
  uploadedAt: string;
}

interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  serviceNeeded: string[];
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [clients, setClients] = useState<UserItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);

  useEffect(() => {
    const users: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    setClients(users.filter((u) => u.role === "client"));

    setCases(JSON.parse(localStorage.getItem("cts_cases") || "[]"));
    setDocuments(JSON.parse(localStorage.getItem("cts_documents") || "[]"));
    setInvoices(JSON.parse(localStorage.getItem("cts_invoices") || "[]"));
  }, []);

  const activeCases = cases.filter((c) => c.status !== "Complete");
  const pendingDocs = documents.filter((d) => d.status === "Pending Review");
  const outstandingRevenue = invoices
    .filter((i) => i.status !== "Paid")
    .reduce((sum, i) => sum + (i.amount || 0), 0);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const casesFiledThisMonth = cases.filter((c) => {
    const caseDate = new Date(c.createdAt);
    return c.status === "Filed" && caseDate >= startOfMonth;
  }).length;

  const recentClients = [...clients]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const attentionCases = cases.filter(
    (c) => c.status === "Documents Needed" || c.status === "New"
  );

  const totalInvoiced = invoices.reduce((sum, i) => sum + (i.amount || 0), 0);
  const totalPaid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + (i.amount || 0), 0);

  const recentPayments = invoices
    .filter((i) => i.status === "Paid")
    .sort((a, b) => new Date(b.paidAt || b.createdAt).getTime() - new Date(a.paidAt || a.createdAt).getTime())
    .slice(0, 5);

  const getClientName = (userId: string) => {
    const allUsers: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    const u = allUsers.find((u) => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : "Unknown Client";
  };

  const daysSince = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const stats = [
    {
      label: "Total Clients",
      value: clients.length,
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Active Cases",
      value: activeCases.length,
      icon: Briefcase,
      color: "bg-teal-500",
      lightColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      label: "Docs Pending Review",
      value: pendingDocs.length,
      icon: FileText,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Outstanding Revenue",
      value: `$${outstandingRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Filed This Month",
      value: casesFiledThisMonth,
      icon: FileCheck,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const quickActions = [
    { label: "Add New Client", icon: UserPlus, href: "/portal/admin/clients", color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
    { label: "Create Invoice", icon: Receipt, href: "/portal/admin/invoices", color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
    { label: "Send Broadcast", icon: Send, href: "/portal/admin/messages", color: "text-purple-600 bg-purple-50 hover:bg-purple-100" },
    { label: "View All Cases", icon: Eye, href: "/portal/admin/cases", color: "text-teal-600 bg-teal-50 hover:bg-teal-100" },
    { label: "Upload Document", icon: Upload, href: "/portal/admin/documents", color: "text-amber-600 bg-amber-50 hover:bg-amber-100" },
    { label: "Generate Report", icon: BarChart3, href: "/portal/admin/reports", color: "text-navy-600 bg-navy-50 hover:bg-navy-100" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-700">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Business overview and quick actions</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.lightColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Client Registrations */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy-700">Recent Client Registrations</h2>
            <button
              onClick={() => router.push("/portal/admin/clients")}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            {recentClients.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No clients registered yet</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Name</th>
                    <th className="px-6 py-3 text-left font-medium">Email</th>
                    <th className="px-6 py-3 text-left font-medium">Services</th>
                    <th className="px-6 py-3 text-left font-medium">Registered</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {client.firstName} {client.lastName}
                      </td>
                      <td className="px-6 py-3 text-gray-500">{client.email}</td>
                      <td className="px-6 py-3">
                        <div className="flex flex-wrap gap-1">
                          {client.serviceNeeded.slice(0, 2).map((s) => (
                            <span key={s} className="px-2 py-0.5 text-xs bg-teal-50 text-teal-700 rounded-full">
                              {s}
                            </span>
                          ))}
                          {client.serviceNeeded.length > 2 && (
                            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">
                              +{client.serviceNeeded.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-gray-500">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => router.push(`/portal/admin/clients/${client.id}`)}
                          className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => router.push(action.href)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 ${action.color}`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases Requiring Attention */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy-700 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Cases Requiring Attention
            </h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {attentionCases.length}
            </span>
          </div>
          {attentionCases.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>All cases are up to date</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {attentionCases.slice(0, 5).map((c) => (
                <div key={c.id} className="px-6 py-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{getClientName(c.userId)}</p>
                    <span
                      className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${
                        c.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{c.serviceName}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {daysSince(c.createdAt)} days since last update
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/portal/admin/cases/${c.id}`)}
                        className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                      >
                        View Case
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revenue Overview */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-navy-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Revenue Overview
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">${totalInvoiced.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Invoiced</p>
              </div>
              <div className="text-center p-3 bg-emerald-50 rounded-lg">
                <p className="text-lg font-bold text-emerald-600">${totalPaid.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Paid</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-lg font-bold text-amber-600">${outstandingRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Outstanding</p>
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Payments</h3>
            {recentPayments.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No payments received yet</p>
            ) : (
              <div className="space-y-2">
                {recentPayments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{p.clientName}</p>
                      <p className="text-xs text-gray-500">{p.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600">
                      ${p.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
