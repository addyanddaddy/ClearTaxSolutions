"use client";

import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Search,
  Filter,
  Upload,
  Eye,
  X,
  FileText,
  HardDrive,
} from "lucide-react";

interface DocumentItem {
  id: string;
  userId: string;
  caseId?: string;
  fileName: string;
  category: string;
  status: string;
  uploadedAt: string;
  notes?: string;
  uploadedBy?: string;
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

const DOC_CATEGORIES = ["Tax Return", "W-2", "1099", "Receipt", "IRS Notice", "Other"];
const DOC_STATUSES = ["Pending Review", "Reviewed", "Action Required"];

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [search, setSearch] = useState("");
  const [filterClient, setFilterClient] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const [newDoc, setNewDoc] = useState({
    userId: "",
    caseId: "",
    fileName: "",
    category: "Tax Return",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setDocuments(JSON.parse(localStorage.getItem("cts_documents") || "[]"));
    const allUsers: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    setUsers(allUsers.filter((u) => u.role === "client"));
    setCases(JSON.parse(localStorage.getItem("cts_cases") || "[]"));
  };

  const getClientName = (userId: string) => {
    const u = users.find((u) => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : "Unknown";
  };

  const getCaseName = (caseId?: string) => {
    if (!caseId) return "—";
    const c = cases.find((c) => c.id === caseId);
    return c ? c.serviceName : "—";
  };

  const clientCases = cases.filter((c) => c.userId === newDoc.userId);

  const filteredDocs = documents.filter((d) => {
    const clientName = getClientName(d.userId).toLowerCase();
    const matchesSearch = !search || clientName.includes(search.toLowerCase()) || d.fileName.toLowerCase().includes(search.toLowerCase());
    const matchesClient = filterClient === "All" || d.userId === filterClient;
    const matchesCategory = filterCategory === "All" || d.category === filterCategory;
    const matchesStatus = filterStatus === "All" || d.status === filterStatus;
    return matchesSearch && matchesClient && matchesCategory && matchesStatus;
  });

  const handleUploadDocument = () => {
    if (!newDoc.fileName || !newDoc.userId) return;
    const allDocs = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    allDocs.push({
      id: `doc-${Date.now()}`,
      userId: newDoc.userId,
      caseId: newDoc.caseId || undefined,
      fileName: newDoc.fileName,
      category: newDoc.category,
      status: "Pending Review",
      uploadedAt: new Date().toISOString(),
      uploadedBy: "Admin",
    });
    localStorage.setItem("cts_documents", JSON.stringify(allDocs));
    setShowUpload(false);
    setNewDoc({ userId: "", caseId: "", fileName: "", category: "Tax Return" });
    loadData();
  };

  const handleUpdateStatus = (docId: string, status: string) => {
    const allDocs: DocumentItem[] = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    const index = allDocs.findIndex((d) => d.id === docId);
    if (index !== -1) {
      allDocs[index].status = status;
      localStorage.setItem("cts_documents", JSON.stringify(allDocs));
      loadData();
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedDocs.length === 0) return;
    const allDocs: DocumentItem[] = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    selectedDocs.forEach((docId) => {
      const index = allDocs.findIndex((d) => d.id === docId);
      if (index !== -1) {
        if (action === "reviewed") {
          allDocs[index].status = "Reviewed";
        } else if (action === "resubmit") {
          allDocs[index].status = "Action Required";
          // Notify client
          const notifications = JSON.parse(localStorage.getItem("cts_notifications") || "[]");
          notifications.push({
            id: `notif-${Date.now()}-${docId}`,
            userId: allDocs[index].userId,
            type: "document_resubmit",
            title: "Document Resubmission Required",
            message: `Please resubmit: ${allDocs[index].fileName}`,
            date: new Date().toISOString(),
            read: false,
          });
          localStorage.setItem("cts_notifications", JSON.stringify(notifications));
        }
      }
    });
    localStorage.setItem("cts_documents", JSON.stringify(allDocs));
    setSelectedDocs([]);
    loadData();
  };

  const toggleSelectDoc = (docId: string) => {
    setSelectedDocs((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedDocs.length === filteredDocs.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filteredDocs.map((d) => d.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Document Review</h1>
          <p className="text-gray-500 mt-1">{documents.length} total documents</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium text-sm"
        >
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Google Drive integration note */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <HardDrive className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Documents synced with Google Drive</p>
          <p className="text-xs text-gray-500">Document storage is managed through Google Workspace integration</p>
        </div>
        <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">Coming Soon</span>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by file name or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <label className="label-text">Client</label>
            <select value={filterClient} onChange={(e) => setFilterClient(e.target.value)} className="input-field">
              <option value="All">All Clients</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text">Category</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="input-field">
              <option value="All">All Categories</option>
              {DOC_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field">
              <option value="All">All Statuses</option>
              {DOC_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedDocs.length > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-teal-700">{selectedDocs.length} document(s) selected</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction("reviewed")}
              className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition"
            >
              Mark as Reviewed
            </button>
            <button
              onClick={() => handleBulkAction("resubmit")}
              className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition"
            >
              Request Resubmission
            </button>
            <button
              onClick={() => setSelectedDocs([])}
              className="px-3 py-1.5 text-gray-600 text-sm font-medium hover:text-gray-800 transition"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Document Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">No documents found</p>
            <p className="text-sm mt-1">Upload documents or adjust your filters</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3.5 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDocs.length === filteredDocs.length && filteredDocs.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                  />
                </th>
                <th className="px-4 py-3.5 text-left font-semibold">File Name</th>
                <th className="px-4 py-3.5 text-left font-semibold">Client</th>
                <th className="px-4 py-3.5 text-left font-semibold hidden md:table-cell">Category</th>
                <th className="px-4 py-3.5 text-left font-semibold hidden lg:table-cell">Case</th>
                <th className="px-4 py-3.5 text-left font-semibold hidden md:table-cell">Uploaded</th>
                <th className="px-4 py-3.5 text-left font-semibold">Status</th>
                <th className="px-4 py-3.5 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => toggleSelectDoc(doc.id)}
                      className="rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-medium text-gray-900">{doc.fileName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{getClientName(doc.userId)}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{doc.category}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{getCaseName(doc.caseId)}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={doc.status}
                      onChange={(e) => handleUpdateStatus(doc.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${
                        doc.status === "Reviewed" ? "bg-emerald-100 text-emerald-700" :
                        doc.status === "Action Required" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {DOC_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-teal-600" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-navy-700">Upload Document</h2>
              <button onClick={() => setShowUpload(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="label-text">Client *</label>
                <select value={newDoc.userId} onChange={(e) => setNewDoc({ ...newDoc, userId: e.target.value, caseId: "" })} className="input-field">
                  <option value="">Select client...</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">Case (optional)</label>
                <select value={newDoc.caseId} onChange={(e) => setNewDoc({ ...newDoc, caseId: e.target.value })} className="input-field">
                  <option value="">No linked case</option>
                  {clientCases.map((c) => (
                    <option key={c.id} value={c.id}>{c.serviceName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">File Name *</label>
                <input
                  type="text"
                  value={newDoc.fileName}
                  onChange={(e) => setNewDoc({ ...newDoc, fileName: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 2024_W2.pdf"
                />
              </div>
              <div>
                <label className="label-text">Category</label>
                <select value={newDoc.category} onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })} className="input-field">
                  {DOC_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button onClick={() => setShowUpload(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button
                onClick={handleUploadDocument}
                disabled={!newDoc.fileName || !newDoc.userId}
                className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium text-sm disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
