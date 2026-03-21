"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Search,
  Filter,
  Clock,
  FileText,
  User,
  ArrowRight,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

interface CaseItem {
  id: string;
  userId: string;
  serviceName: string;
  status: string;
  createdAt: string;
  assignedAgent: string;
  events?: { date: string; description: string; type: string }[];
}

interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface DocumentItem {
  id: string;
  userId: string;
  caseId?: string;
}

const KANBAN_COLUMNS = [
  { status: "New", color: "bg-blue-500", lightColor: "bg-blue-50", textColor: "text-blue-700", borderColor: "border-blue-200" },
  { status: "In Review", color: "bg-purple-500", lightColor: "bg-purple-50", textColor: "text-purple-700", borderColor: "border-purple-200" },
  { status: "Documents Needed", color: "bg-amber-500", lightColor: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-200" },
  { status: "In Progress", color: "bg-teal-500", lightColor: "bg-teal-50", textColor: "text-teal-700", borderColor: "border-teal-200" },
  { status: "Filed", color: "bg-emerald-500", lightColor: "bg-emerald-50", textColor: "text-emerald-700", borderColor: "border-emerald-200" },
  { status: "Complete", color: "bg-gray-500", lightColor: "bg-gray-50", textColor: "text-gray-700", borderColor: "border-gray-200" },
];

const STATUS_OPTIONS = ["New", "In Review", "Documents Needed", "In Progress", "Filed", "Complete"];

export default function AdminCasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterService, setFilterService] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCases(JSON.parse(localStorage.getItem("cts_cases") || "[]"));
    setUsers(JSON.parse(localStorage.getItem("cts_users") || "[]"));
    setDocuments(JSON.parse(localStorage.getItem("cts_documents") || "[]"));
  };

  const getClientName = (userId: string) => {
    const u = users.find((u) => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : "Unknown";
  };

  const getDocCount = (caseId: string) => documents.filter((d) => d.caseId === caseId).length;

  const daysSince = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getLastEvent = (c: CaseItem) => {
    if (!c.events || c.events.length === 0) return c.createdAt;
    return c.events[c.events.length - 1].date;
  };

  const filteredCases = cases.filter((c) => {
    const clientName = getClientName(c.userId).toLowerCase();
    const matchesSearch = !searchQuery || clientName.includes(searchQuery.toLowerCase()) || c.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || c.status === filterStatus;
    const matchesService = filterService === "All" || c.serviceName === filterService;
    return matchesSearch && matchesStatus && matchesService;
  });

  const handleStatusChange = (caseId: string, newStatus: string) => {
    const allCases: CaseItem[] = JSON.parse(localStorage.getItem("cts_cases") || "[]");
    const index = allCases.findIndex((c) => c.id === caseId);
    if (index !== -1) {
      allCases[index].status = newStatus;
      allCases[index].events = allCases[index].events || [];
      allCases[index].events.push({
        date: new Date().toISOString(),
        description: `Status changed to ${newStatus}`,
        type: "status",
      });
      localStorage.setItem("cts_cases", JSON.stringify(allCases));
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Case Management</h1>
          <p className="text-gray-500 mt-1">{cases.length} total cases across all clients</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("kanban")}
            className={`px-3 py-2 text-sm rounded-lg font-medium transition ${
              viewMode === "kanban" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Kanban
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-2 text-sm rounded-lg font-medium transition ${
              viewMode === "list" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by client name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition text-sm font-medium text-gray-600"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-4">
          <div>
            <label className="label-text">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text">Service Type</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="input-field"
            >
              <option value="All">All Services</option>
              {SERVICE_CATEGORIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1200px]">
            {KANBAN_COLUMNS.map((col) => {
              const columnCases = filteredCases.filter((c) => c.status === col.status);
              return (
                <div key={col.status} className="flex-1 min-w-[200px]">
                  <div className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-lg ${col.lightColor}`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                    <span className={`text-sm font-semibold ${col.textColor}`}>{col.status}</span>
                    <span className={`ml-auto text-xs font-medium ${col.textColor} opacity-70`}>{columnCases.length}</span>
                  </div>
                  <div className="space-y-3">
                    {columnCases.map((c) => (
                      <div
                        key={c.id}
                        className={`bg-white rounded-xl border ${col.borderColor} p-4 hover:shadow-md transition cursor-pointer`}
                        onClick={() => router.push(`/portal/admin/cases/${c.id}`)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {getClientName(c.userId)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{c.serviceName}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {daysSince(getLastEvent(c))}d
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {getDocCount(c.id)}
                          </span>
                        </div>

                        {/* Quick status change buttons */}
                        <div className="mt-3 pt-3 border-t border-gray-100 flex gap-1">
                          {STATUS_OPTIONS.filter((s) => s !== c.status)
                            .slice(0, 2)
                            .map((s) => (
                              <button
                                key={s}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(c.id, s);
                                }}
                                className="flex-1 text-xs py-1 px-1.5 rounded bg-gray-50 text-gray-500 hover:bg-teal-50 hover:text-teal-700 transition truncate"
                              >
                                {s}
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                    {columnCases.length === 0 && (
                      <div className="text-center py-8 text-gray-300 text-sm">No cases</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredCases.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No cases found</p>
              <p className="text-sm mt-1">Adjust your filters or search query</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Client</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Service</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Status</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Created</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Days in Status</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Docs</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCases.map((c) => {
                  const col = KANBAN_COLUMNS.find((k) => k.status === c.status);
                  return (
                    <tr key={c.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">{getClientName(c.userId)}</td>
                      <td className="px-6 py-4 text-gray-500">{c.serviceName}</td>
                      <td className="px-6 py-4">
                        <select
                          value={c.status}
                          onChange={(e) => handleStatusChange(c.id, e.target.value)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 ${col?.lightColor} ${col?.textColor} focus:ring-2 focus:ring-teal-500`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-500">{daysSince(getLastEvent(c))} days</td>
                      <td className="px-6 py-4 text-gray-500">{getDocCount(c.id)}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => router.push(`/portal/admin/cases/${c.id}`)}
                          className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                        >
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
