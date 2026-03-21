"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  UserPlus,
  MessageSquare,
  Receipt,
  Briefcase,
  Eye,
  X,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  serviceNeeded: string[];
  createdAt: string;
}

interface CaseItem {
  id: string;
  userId: string;
  status: string;
}

export default function AdminClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<UserItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceNeeded: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const users: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    setClients(users.filter((u) => u.role === "client"));
    setCases(JSON.parse(localStorage.getItem("cts_cases") || "[]"));
  };

  const filteredClients = clients.filter((c) => {
    const q = search.toLowerCase();
    return (
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const getCaseCount = (userId: string) => cases.filter((c) => c.userId === userId).length;

  const getStatus = (userId: string) => {
    const userCases = cases.filter((c) => c.userId === userId);
    if (userCases.length === 0) return "Inactive";
    const hasActive = userCases.some((c) => c.status !== "Complete");
    return hasActive ? "Active" : "Inactive";
  };

  const toggleService = (service: string) => {
    setNewClient((prev) => ({
      ...prev,
      serviceNeeded: prev.serviceNeeded.includes(service)
        ? prev.serviceNeeded.filter((s) => s !== service)
        : [...prev.serviceNeeded, service],
    }));
  };

  const handleAddClient = () => {
    if (!newClient.firstName || !newClient.lastName || !newClient.email) return;

    const users = JSON.parse(localStorage.getItem("cts_users") || "[]");
    const exists = users.find(
      (u: UserItem) => u.email.toLowerCase() === newClient.email.toLowerCase()
    );
    if (exists) {
      alert("A client with this email already exists.");
      return;
    }

    const client = {
      id: `user-${Date.now()}`,
      firstName: newClient.firstName,
      lastName: newClient.lastName,
      email: newClient.email,
      phone: newClient.phone,
      role: "client",
      serviceNeeded: newClient.serviceNeeded,
      createdAt: new Date().toISOString(),
      password: "client123",
    };

    users.push(client);
    localStorage.setItem("cts_users", JSON.stringify(users));

    // Create cases for selected services
    if (newClient.serviceNeeded.length > 0) {
      const existingCases = JSON.parse(localStorage.getItem("cts_cases") || "[]");
      const newCases = newClient.serviceNeeded.map((service, index) => ({
        id: `case-${client.id}-${index}`,
        userId: client.id,
        serviceName: service,
        status: "New",
        createdAt: new Date().toISOString(),
        assignedAgent: "Joseph Gasana, EA",
        events: [
          {
            date: new Date().toISOString(),
            description: `Case created for ${service}`,
            type: "status",
          },
        ],
      }));
      localStorage.setItem("cts_cases", JSON.stringify([...existingCases, ...newCases]));
    }

    // Send welcome message
    const messages = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    messages.push({
      id: `msg-welcome-${client.id}`,
      userId: client.id,
      subject: "Welcome to Clear Tax Solutions!",
      body: "Your account has been created by our team. Please log in and upload any relevant documents to get started.",
      from: "Admin",
      to: `${client.firstName} ${client.lastName}`,
      date: new Date().toISOString(),
      read: false,
      caseId: null,
    });
    localStorage.setItem("cts_messages", JSON.stringify(messages));

    setNewClient({ firstName: "", lastName: "", email: "", phone: "", serviceNeeded: [] });
    setShowAddModal(false);
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Client Management</h1>
          <p className="text-gray-500 mt-1">{clients.length} total clients</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium text-sm"
        >
          <UserPlus className="w-4 h-4" />
          Add New Client
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {filteredClients.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No clients found</p>
              <p className="text-sm mt-1">
                {search ? "Try adjusting your search" : "Add your first client to get started"}
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Name</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Email</th>
                  <th className="px-6 py-3.5 text-left font-semibold hidden md:table-cell">Phone</th>
                  <th className="px-6 py-3.5 text-left font-semibold hidden lg:table-cell">Services</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Cases</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Status</th>
                  <th className="px-6 py-3.5 text-left font-semibold hidden md:table-cell">Registered</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClients.map((client) => {
                  const status = getStatus(client.id);
                  return (
                    <tr key={client.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-xs font-bold">
                            {client.firstName[0]}
                            {client.lastName[0]}
                          </div>
                          <span className="font-medium text-gray-900">
                            {client.firstName} {client.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{client.email}</td>
                      <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{client.phone || "—"}</td>
                      <td className="px-6 py-4 hidden lg:table-cell">
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
                          {client.serviceNeeded.length === 0 && (
                            <span className="text-gray-400">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-700">{getCaseCount(client.id)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                            status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => router.push(`/portal/admin/clients/${client.id}`)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-teal-600"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/portal/admin/messages?client=${client.id}`)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-blue-600"
                            title="Send Message"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/portal/admin/invoices?client=${client.id}`)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-emerald-600"
                            title="Create Invoice"
                          >
                            <Receipt className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/portal/admin/cases?client=${client.id}`)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-purple-600"
                            title="Add Case"
                          >
                            <Briefcase className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-navy-700">Add New Client</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">First Name *</label>
                  <input
                    type="text"
                    value={newClient.firstName}
                    onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
                    className="input-field"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="label-text">Last Name *</label>
                  <input
                    type="text"
                    value={newClient.lastName}
                    onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                    className="input-field"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="label-text">Email *</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="label-text">Phone</label>
                <input
                  type="tel"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="input-field"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="label-text">Services Needed</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {SERVICE_CATEGORIES.map((service) => (
                    <label
                      key={service}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition text-sm ${
                        newClient.serviceNeeded.includes(service)
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newClient.serviceNeeded.includes(service)}
                        onChange={() => toggleService(service)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          newClient.serviceNeeded.includes(service)
                            ? "border-teal-500 bg-teal-500"
                            : "border-gray-300"
                        }`}
                      >
                        {newClient.serviceNeeded.includes(service) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {service}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium text-sm"
                disabled={!newClient.firstName || !newClient.lastName || !newClient.email}
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
