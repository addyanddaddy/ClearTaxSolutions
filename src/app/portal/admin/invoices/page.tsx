"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Receipt,
  Plus,
  Search,
  Edit3,
  Trash2,
  Send,
  CheckCircle,
  AlertCircle,
  DollarSign,
  CreditCard,
  X,
} from "lucide-react";

interface InvoiceItem {
  id: string;
  userId: string;
  clientName: string;
  caseId?: string;
  description: string;
  lineItems: { description: string; amount: number }[];
  amount: number;
  status: string;
  dueDate: string;
  notes?: string;
  createdAt: string;
  paidAt?: string;
}

interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface CaseItem {
  id: string;
  userId: string;
  serviceName: string;
}

const STATUS_TABS = ["All", "Draft", "Sent", "Paid", "Overdue"];

export default function AdminInvoicesPage() {
  const searchParams = useSearchParams();
  const preselectedClient = searchParams.get("client") || "";

  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(!!preselectedClient);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    userId: preselectedClient,
    caseId: "",
    description: "",
    lineItems: [{ description: "", amount: 0 }],
    dueDate: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setInvoices(JSON.parse(localStorage.getItem("cts_invoices") || "[]"));
    const allUsers: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    setUsers(allUsers.filter((u) => u.role === "client"));
    setCases(JSON.parse(localStorage.getItem("cts_cases") || "[]"));
  };

  const getClientName = (userId: string) => {
    const u = users.find((u) => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : "Unknown";
  };

  const clientCases = cases.filter((c) => c.userId === form.userId);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesTab = activeTab === "All" || inv.status === activeTab;
    const matchesSearch =
      !search ||
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.description.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalInvoiced = invoices.reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0);
  const totalOutstanding = invoices.filter((i) => i.status !== "Paid").reduce((sum, i) => sum + i.amount, 0);

  const handleCreateInvoice = () => {
    if (!form.description || !form.userId) return;
    const total = form.lineItems.reduce((sum, li) => sum + li.amount, 0);
    const allInvoices: InvoiceItem[] = JSON.parse(localStorage.getItem("cts_invoices") || "[]");

    if (editingId) {
      const index = allInvoices.findIndex((i) => i.id === editingId);
      if (index !== -1) {
        allInvoices[index] = {
          ...allInvoices[index],
          userId: form.userId,
          clientName: getClientName(form.userId),
          caseId: form.caseId || undefined,
          description: form.description,
          lineItems: form.lineItems.filter((li) => li.description),
          amount: total,
          dueDate: form.dueDate || allInvoices[index].dueDate,
          notes: form.notes,
        };
      }
      setEditingId(null);
    } else {
      allInvoices.push({
        id: `INV-${String(allInvoices.length + 1).padStart(4, "0")}`,
        userId: form.userId,
        clientName: getClientName(form.userId),
        caseId: form.caseId || undefined,
        description: form.description,
        lineItems: form.lineItems.filter((li) => li.description),
        amount: total,
        status: "Draft",
        dueDate: form.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        notes: form.notes,
        createdAt: new Date().toISOString(),
      });
    }

    localStorage.setItem("cts_invoices", JSON.stringify(allInvoices));
    resetForm();
    loadData();
  };

  const resetForm = () => {
    setForm({ userId: "", caseId: "", description: "", lineItems: [{ description: "", amount: 0 }], dueDate: "", notes: "" });
    setShowCreateForm(false);
    setEditingId(null);
  };

  const handleEditInvoice = (inv: InvoiceItem) => {
    setForm({
      userId: inv.userId,
      caseId: inv.caseId || "",
      description: inv.description,
      lineItems: inv.lineItems.length > 0 ? inv.lineItems : [{ description: "", amount: 0 }],
      dueDate: inv.dueDate ? inv.dueDate.split("T")[0] : "",
      notes: inv.notes || "",
    });
    setEditingId(inv.id);
    setShowCreateForm(true);
  };

  const handleStatusChange = (invId: string, status: string) => {
    const allInvoices: InvoiceItem[] = JSON.parse(localStorage.getItem("cts_invoices") || "[]");
    const index = allInvoices.findIndex((i) => i.id === invId);
    if (index !== -1) {
      allInvoices[index].status = status;
      if (status === "Paid") {
        allInvoices[index].paidAt = new Date().toISOString();
      }
      if (status === "Sent") {
        // Notify client
        const inv = allInvoices[index];
        const notifications = JSON.parse(localStorage.getItem("cts_notifications") || "[]");
        notifications.push({
          id: `notif-${Date.now()}`,
          userId: inv.userId,
          type: "invoice",
          title: "New Invoice",
          message: `You have a new invoice for $${inv.amount.toLocaleString()}: ${inv.description}`,
          date: new Date().toISOString(),
          read: false,
        });
        localStorage.setItem("cts_notifications", JSON.stringify(notifications));
      }
      localStorage.setItem("cts_invoices", JSON.stringify(allInvoices));
      loadData();
    }
  };

  const handleDeleteInvoice = (invId: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    const allInvoices: InvoiceItem[] = JSON.parse(localStorage.getItem("cts_invoices") || "[]");
    localStorage.setItem("cts_invoices", JSON.stringify(allInvoices.filter((i) => i.id !== invId)));
    loadData();
  };

  const handleSendReminder = (inv: InvoiceItem) => {
    const messages = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    messages.push({
      id: `msg-reminder-${Date.now()}`,
      userId: inv.userId,
      subject: `Payment Reminder: ${inv.description}`,
      body: `This is a friendly reminder that your invoice for $${inv.amount.toLocaleString()} is due on ${new Date(inv.dueDate).toLocaleDateString()}. Please log in to your portal to make a payment.`,
      from: "Admin",
      to: inv.clientName,
      date: new Date().toISOString(),
      read: false,
      caseId: inv.caseId || null,
    });
    localStorage.setItem("cts_messages", JSON.stringify(messages));
    alert("Payment reminder sent.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Invoice Management</h1>
          <p className="text-gray-500 mt-1">{invoices.length} total invoices</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium text-sm"
        >
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total Invoiced</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalInvoiced.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-500">Total Paid</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-sm text-gray-500">Outstanding</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">${totalOutstanding.toLocaleString()}</p>
        </div>
      </div>

      {/* Square Integration */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-6 h-6 text-navy-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Payment Processing via Square</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            When Square is connected, clients will be able to pay invoices directly through the portal. Payment confirmations are automatic.
          </p>
        </div>
        <button className="px-4 py-2 border border-navy-300 text-navy-600 rounded-lg text-sm font-medium hover:bg-navy-50 transition whitespace-nowrap">
          Connect Square Account
        </button>
      </div>

      {/* Pricing Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
        <AlertCircle className="w-4 h-4 inline mr-2" />
        Pricing is based on complexity. Adjust line items and amounts per client situation.
      </div>

      {/* Create/Edit Invoice Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy-700">
              {editingId ? "Edit Invoice" : "Create New Invoice"}
            </h2>
            <button onClick={resetForm} className="p-2 rounded-lg hover:bg-gray-100 transition">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-text">Client *</label>
              <select
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value, caseId: "" })}
                className="input-field"
              >
                <option value="">Select client...</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Case (optional)</label>
              <select
                value={form.caseId}
                onChange={(e) => setForm({ ...form, caseId: e.target.value })}
                className="input-field"
              >
                <option value="">No linked case</option>
                {clientCases.map((c) => (
                  <option key={c.id} value={c.id}>{c.serviceName}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="label-text">Description *</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field"
              placeholder="Invoice description"
            />
          </div>
          <div>
            <label className="label-text">Line Items</label>
            <div className="space-y-2">
              {form.lineItems.map((li, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={li.description}
                    onChange={(e) => {
                      const items = [...form.lineItems];
                      items[idx].description = e.target.value;
                      setForm({ ...form, lineItems: items });
                    }}
                    className="input-field flex-1"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={li.amount || ""}
                    onChange={(e) => {
                      const items = [...form.lineItems];
                      items[idx].amount = parseFloat(e.target.value) || 0;
                      setForm({ ...form, lineItems: items });
                    }}
                    className="input-field w-32"
                    placeholder="Amount"
                  />
                  {form.lineItems.length > 1 && (
                    <button
                      onClick={() => setForm({ ...form, lineItems: form.lineItems.filter((_, i) => i !== idx) })}
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setForm({ ...form, lineItems: [...form.lineItems, { description: "", amount: 0 }] })}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                + Add Line Item
              </button>
            </div>
            <div className="mt-2 text-right text-sm font-semibold text-gray-700">
              Total: ${form.lineItems.reduce((sum, li) => sum + li.amount, 0).toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-text">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="label-text">Notes / Terms</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="input-field"
              rows={2}
              placeholder="Payment terms, notes..."
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreateInvoice}
              disabled={!form.description || !form.userId}
              className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium text-sm disabled:opacity-50"
            >
              {editingId ? "Update Invoice" : "Generate Invoice"}
            </button>
            <button onClick={resetForm} className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {STATUS_TABS.map((tab) => {
          const count = tab === "All" ? invoices.length : invoices.filter((i) => i.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === tab
                  ? "bg-white text-navy-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              <span className="ml-1.5 text-xs opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        />
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredInvoices.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">No invoices found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5 text-left font-semibold">Invoice #</th>
                <th className="px-6 py-3.5 text-left font-semibold">Client</th>
                <th className="px-6 py-3.5 text-left font-semibold hidden md:table-cell">Description</th>
                <th className="px-6 py-3.5 text-left font-semibold">Amount</th>
                <th className="px-6 py-3.5 text-left font-semibold hidden md:table-cell">Date</th>
                <th className="px-6 py-3.5 text-left font-semibold hidden lg:table-cell">Due Date</th>
                <th className="px-6 py-3.5 text-left font-semibold">Status</th>
                <th className="px-6 py-3.5 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{inv.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{inv.clientName}</td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{inv.description}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">${inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" :
                      inv.status === "Overdue" ? "bg-red-100 text-red-700" :
                      inv.status === "Sent" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {inv.status === "Draft" && (
                        <>
                          <button
                            onClick={() => handleEditInvoice(inv)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(inv.id, "Sent")}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-teal-600 transition"
                            title="Mark as Sent"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {(inv.status === "Sent" || inv.status === "Overdue") && (
                        <>
                          <button
                            onClick={() => handleStatusChange(inv.id, "Paid")}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-emerald-600 transition"
                            title="Mark as Paid"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSendReminder(inv)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-amber-600 transition"
                            title="Send Reminder"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteInvoice(inv.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
