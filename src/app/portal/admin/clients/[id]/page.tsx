"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Save,
  X,
  Briefcase,
  FileText,
  Receipt,
  MessageSquare,
  StickyNote,
  Plus,
  Trash2,
  Send,
  Clock,
  Upload,
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
  password?: string;
}

interface CaseItem {
  id: string;
  userId: string;
  serviceName: string;
  status: string;
  createdAt: string;
  assignedAgent: string;
  events: { date: string; description: string; type: string }[];
}

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
}

interface MessageItem {
  id: string;
  userId: string;
  subject: string;
  body: string;
  from: string;
  to: string;
  date: string;
  read: boolean;
  caseId: string | null;
}

interface NoteItem {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const TABS = ["Overview", "Cases", "Documents", "Invoices", "Messages", "Notes"];

const STATUS_OPTIONS = ["New", "In Review", "Documents Needed", "In Progress", "Filed", "Complete"];

export default function ClientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  const [client, setClient] = useState<UserItem | null>(null);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserItem>>({});

  // Form states
  const [newNote, setNewNote] = useState("");
  const [newMessage, setNewMessage] = useState({ subject: "", body: "" });
  const [showNewCase, setShowNewCase] = useState(false);
  const [newCaseService, setNewCaseService] = useState("");
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    description: "",
    lineItems: [{ description: "", amount: 0 }],
    dueDate: "",
    notes: "",
    caseId: "",
  });
  const [showUploadDoc, setShowUploadDoc] = useState(false);
  const [newDoc, setNewDoc] = useState({ fileName: "", category: "Tax Return", caseId: "" });

  const loadData = React.useCallback(() => {
    const users: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    const found = users.find((u) => u.id === clientId);
    if (found) {
      setClient(found);
      setEditData(found);
    }

    const allCases: CaseItem[] = JSON.parse(localStorage.getItem("cts_cases") || "[]");
    setCases(allCases.filter((c) => c.userId === clientId));

    const allDocs: DocumentItem[] = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    setDocuments(allDocs.filter((d) => d.userId === clientId));

    const allInvoices: InvoiceItem[] = JSON.parse(localStorage.getItem("cts_invoices") || "[]");
    setInvoices(allInvoices.filter((i) => i.userId === clientId));

    const allMessages: MessageItem[] = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    setMessages(allMessages.filter((m) => m.userId === clientId));

    const allNotes: NoteItem[] = JSON.parse(localStorage.getItem("cts_admin_notes") || "[]");
    setNotes(allNotes.filter((n) => n.userId === clientId));
  }, [clientId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSaveClient = () => {
    const users: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    const index = users.findIndex((u) => u.id === clientId);
    if (index !== -1) {
      users[index] = { ...users[index], ...editData };
      localStorage.setItem("cts_users", JSON.stringify(users));
      setClient(users[index]);
    }
    setEditing(false);
  };

  const handleUpdateCaseStatus = (caseId: string, newStatus: string) => {
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

  const handleAddCase = () => {
    if (!newCaseService) return;
    const allCases: CaseItem[] = JSON.parse(localStorage.getItem("cts_cases") || "[]");
    const newCase: CaseItem = {
      id: `case-${Date.now()}`,
      userId: clientId,
      serviceName: newCaseService,
      status: "New",
      createdAt: new Date().toISOString(),
      assignedAgent: "Joseph Gasana, EA",
      events: [
        { date: new Date().toISOString(), description: `Case created for ${newCaseService}`, type: "status" },
      ],
    };
    allCases.push(newCase);
    localStorage.setItem("cts_cases", JSON.stringify(allCases));
    setShowNewCase(false);
    setNewCaseService("");
    loadData();
  };

  const handleAddDocument = () => {
    if (!newDoc.fileName) return;
    const allDocs: DocumentItem[] = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    allDocs.push({
      id: `doc-${Date.now()}`,
      userId: clientId,
      caseId: newDoc.caseId || undefined,
      fileName: newDoc.fileName,
      category: newDoc.category,
      status: "Pending Review",
      uploadedAt: new Date().toISOString(),
      uploadedBy: "Admin",
    });
    localStorage.setItem("cts_documents", JSON.stringify(allDocs));
    setShowUploadDoc(false);
    setNewDoc({ fileName: "", category: "Tax Return", caseId: "" });
    loadData();
  };

  const handleCreateInvoice = () => {
    if (!newInvoice.description) return;
    const allInvoices: InvoiceItem[] = JSON.parse(localStorage.getItem("cts_invoices") || "[]");
    const total = newInvoice.lineItems.reduce((sum, li) => sum + li.amount, 0);
    allInvoices.push({
      id: `inv-${Date.now()}`,
      userId: clientId,
      clientName: client ? `${client.firstName} ${client.lastName}` : "",
      caseId: newInvoice.caseId || undefined,
      description: newInvoice.description,
      lineItems: newInvoice.lineItems.filter((li) => li.description),
      amount: total,
      status: "Draft",
      dueDate: newInvoice.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      notes: newInvoice.notes,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("cts_invoices", JSON.stringify(allInvoices));
    setShowNewInvoice(false);
    setNewInvoice({ description: "", lineItems: [{ description: "", amount: 0 }], dueDate: "", notes: "", caseId: "" });
    loadData();
  };

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.body) return;
    const allMessages: MessageItem[] = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    allMessages.push({
      id: `msg-${Date.now()}`,
      userId: clientId,
      subject: newMessage.subject,
      body: newMessage.body,
      from: "Admin",
      to: client ? `${client.firstName} ${client.lastName}` : "",
      date: new Date().toISOString(),
      read: false,
      caseId: null,
    });
    localStorage.setItem("cts_messages", JSON.stringify(allMessages));
    setNewMessage({ subject: "", body: "" });
    loadData();
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const allNotes: NoteItem[] = JSON.parse(localStorage.getItem("cts_admin_notes") || "[]");
    allNotes.push({
      id: `note-${Date.now()}`,
      userId: clientId,
      content: newNote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem("cts_admin_notes", JSON.stringify(allNotes));
    setNewNote("");
    loadData();
  };

  const handleDeleteNote = (noteId: string) => {
    const allNotes: NoteItem[] = JSON.parse(localStorage.getItem("cts_admin_notes") || "[]");
    localStorage.setItem("cts_admin_notes", JSON.stringify(allNotes.filter((n) => n.id !== noteId)));
    loadData();
  };

  if (!client) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-400">
          <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Client not found</p>
          <button onClick={() => router.push("/portal/admin/clients")} className="text-teal-600 mt-2 text-sm hover:underline">
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.push("/portal/admin/clients")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Clients
      </button>

      {/* Client Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-xl font-bold">
              {client.firstName[0]}
              {client.lastName[0]}
            </div>
            <div>
              {editing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editData.firstName || ""}
                    onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                    className="input-field w-32"
                  />
                  <input
                    type="text"
                    value={editData.lastName || ""}
                    onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                    className="input-field w-32"
                  />
                </div>
              ) : (
                <h1 className="text-xl font-bold text-navy-700">
                  {client.firstName} {client.lastName}
                </h1>
              )}
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {editing ? (
                    <input
                      type="email"
                      value={editData.email || ""}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="input-field w-48 text-sm py-1"
                    />
                  ) : (
                    client.email
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {editing ? (
                    <input
                      type="tel"
                      value={editData.phone || ""}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="input-field w-36 text-sm py-1"
                    />
                  ) : (
                    client.phone || "No phone"
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Registered {new Date(client.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div>
            {editing ? (
              <div className="flex gap-2">
                <button onClick={handleSaveClient} className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                  <Save className="w-4 h-4" /> Save
                </button>
                <button onClick={() => { setEditing(false); setEditData(client); }} className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                <Edit3 className="w-4 h-4" /> Edit Info
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                activeTab === tab
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
              {tab === "Cases" && cases.length > 0 && (
                <span className="ml-1.5 bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">{cases.length}</span>
              )}
              {tab === "Documents" && documents.length > 0 && (
                <span className="ml-1.5 bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">{documents.length}</span>
              )}
              {tab === "Messages" && messages.filter((m) => !m.read && m.from !== "Admin").length > 0 && (
                <span className="ml-1.5 bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">
                  {messages.filter((m) => !m.read && m.from !== "Admin").length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-500">Cases</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{cases.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm text-gray-500">Documents</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-500">Invoices</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-500">Messages</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-navy-700 mb-3">Services Selected</h3>
              {client.serviceNeeded.length === 0 ? (
                <p className="text-gray-400 text-sm">No services selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {client.serviceNeeded.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cases Tab */}
        {activeTab === "Cases" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewCase(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Case
              </button>
            </div>

            {showNewCase && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900 mb-3">Create New Case</h3>
                <div className="flex gap-3">
                  <select
                    value={newCaseService}
                    onChange={(e) => setNewCaseService(e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="">Select service...</option>
                    {SERVICE_CATEGORIES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button onClick={handleAddCase} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                    Create
                  </button>
                  <button onClick={() => setShowNewCase(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {cases.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
                <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No cases yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cases.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{c.serviceName}</h3>
                      <select
                        value={c.status}
                        onChange={(e) => handleUpdateCaseStatus(c.id, e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(c.createdAt).toLocaleDateString()}</span>
                      <span>{c.assignedAgent}</span>
                    </div>
                    <button
                      onClick={() => router.push(`/portal/admin/cases/${c.id}`)}
                      className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium"
                    >
                      View Full Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "Documents" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowUploadDoc(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium"
              >
                <Upload className="w-4 h-4" /> Upload Document
              </button>
            </div>

            {showUploadDoc && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <h3 className="font-medium text-gray-900">Upload Document to Client</h3>
                <input
                  type="text"
                  value={newDoc.fileName}
                  onChange={(e) => setNewDoc({ ...newDoc, fileName: e.target.value })}
                  className="input-field"
                  placeholder="File name (e.g., 2024_W2.pdf)"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select value={newDoc.category} onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })} className="input-field">
                    <option>Tax Return</option>
                    <option>W-2</option>
                    <option>1099</option>
                    <option>Receipt</option>
                    <option>IRS Notice</option>
                    <option>Other</option>
                  </select>
                  <select value={newDoc.caseId} onChange={(e) => setNewDoc({ ...newDoc, caseId: e.target.value })} className="input-field">
                    <option value="">No linked case</option>
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>{c.serviceName}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddDocument} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                    Upload
                  </button>
                  <button onClick={() => setShowUploadDoc(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {documents.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No documents yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium">File Name</th>
                      <th className="px-6 py-3 text-left font-medium">Category</th>
                      <th className="px-6 py-3 text-left font-medium">Status</th>
                      <th className="px-6 py-3 text-left font-medium">Uploaded</th>
                      <th className="px-6 py-3 text-left font-medium">By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium text-gray-900">{doc.fileName}</td>
                        <td className="px-6 py-3 text-gray-500">{doc.category}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                            doc.status === "Reviewed" ? "bg-emerald-100 text-emerald-700" :
                            doc.status === "Action Required" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-500">{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-3 text-gray-500">{doc.uploadedBy || "Client"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === "Invoices" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewInvoice(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Create Invoice
              </button>
            </div>

            {showNewInvoice && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                <h3 className="font-medium text-gray-900">Create New Invoice</h3>
                <input
                  type="text"
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                  className="input-field"
                  placeholder="Invoice description"
                />
                <select
                  value={newInvoice.caseId}
                  onChange={(e) => setNewInvoice({ ...newInvoice, caseId: e.target.value })}
                  className="input-field"
                >
                  <option value="">No linked case</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.serviceName}</option>
                  ))}
                </select>
                <div className="space-y-2">
                  <label className="label-text">Line Items</label>
                  {newInvoice.lineItems.map((li, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={li.description}
                        onChange={(e) => {
                          const items = [...newInvoice.lineItems];
                          items[idx].description = e.target.value;
                          setNewInvoice({ ...newInvoice, lineItems: items });
                        }}
                        className="input-field flex-1"
                        placeholder="Description"
                      />
                      <input
                        type="number"
                        value={li.amount || ""}
                        onChange={(e) => {
                          const items = [...newInvoice.lineItems];
                          items[idx].amount = parseFloat(e.target.value) || 0;
                          setNewInvoice({ ...newInvoice, lineItems: items });
                        }}
                        className="input-field w-32"
                        placeholder="Amount"
                      />
                      {newInvoice.lineItems.length > 1 && (
                        <button
                          onClick={() => {
                            const items = newInvoice.lineItems.filter((_, i) => i !== idx);
                            setNewInvoice({ ...newInvoice, lineItems: items });
                          }}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setNewInvoice({
                        ...newInvoice,
                        lineItems: [...newInvoice.lineItems, { description: "", amount: 0 }],
                      })
                    }
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    + Add Line Item
                  </button>
                </div>
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  className="input-field"
                />
                <textarea
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                  className="input-field"
                  rows={2}
                  placeholder="Notes or terms..."
                />
                <div className="flex gap-2">
                  <button onClick={handleCreateInvoice} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                    Create Invoice
                  </button>
                  <button onClick={() => setShowNewInvoice(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {invoices.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
                <Receipt className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No invoices yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{inv.description}</h3>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" :
                        inv.status === "Overdue" ? "bg-red-100 text-red-700" :
                        inv.status === "Sent" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="font-semibold text-gray-900">${inv.amount.toLocaleString()}</span>
                      <span>Due: {new Date(inv.dueDate).toLocaleDateString()}</span>
                      <span>Created: {new Date(inv.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "Messages" && (
          <div className="space-y-4">
            {/* Compose */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-teal-600" /> Compose Message
              </h3>
              <input
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                className="input-field"
                placeholder="Subject"
              />
              <textarea
                value={newMessage.body}
                onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="Write your message..."
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.subject || !newMessage.body}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </div>

            {/* Message History */}
            {messages.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...messages].reverse().map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-white rounded-xl border border-gray-200 p-5 ${
                      !msg.read && msg.from !== "Admin" ? "border-l-4 border-l-teal-500" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{msg.subject}</h3>
                      <span className="text-xs text-gray-400">{new Date(msg.date).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{msg.body}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className={`font-medium ${msg.from === "Admin" ? "text-teal-600" : "text-navy-600"}`}>
                        {msg.from}
                      </span>
                      <span>to</span>
                      <span>{msg.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "Notes" && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
              <StickyNote className="w-4 h-4 inline mr-2" />
              Internal notes are only visible to admin users. Clients cannot see these notes.
            </div>

            {/* Add Note */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <h3 className="font-medium text-gray-900">Add Internal Note</h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Write a note about this client..."
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Note
              </button>
            </div>

            {/* Notes List */}
            {notes.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
                <StickyNote className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No notes yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...notes].reverse().map((note) => (
                  <div key={note.id} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
