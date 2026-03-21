"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  User,
  Send,
  Bell,
  FileText,
  StickyNote,
  Receipt,
  MessageSquare,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";

interface CaseItem {
  id: string;
  userId: string;
  serviceName: string;
  status: string;
  createdAt: string;
  assignedAgent: string;
  events: { date: string; description: string; type: string }[];
}

interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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

interface NoteItem {
  id: string;
  caseId: string;
  content: string;
  createdAt: string;
}

const STATUS_OPTIONS = ["New", "In Review", "Documents Needed", "In Progress", "Filed", "Complete"];
const DOC_STATUS_OPTIONS = ["Pending Review", "Reviewed", "Action Required"];

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  "In Review": "bg-purple-100 text-purple-700",
  "Documents Needed": "bg-amber-100 text-amber-700",
  "In Progress": "bg-teal-100 text-teal-700",
  Filed: "bg-emerald-100 text-emerald-700",
  Complete: "bg-gray-100 text-gray-700",
};

export default function AdminCaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const caseId = params.id as string;

  const [caseData, setCaseData] = useState<CaseItem | null>(null);
  const [client, setClient] = useState<UserItem | null>(null);
  const [caseDocuments, setCaseDocuments] = useState<DocumentItem[]>([]);
  const [caseInvoices, setCaseInvoices] = useState<InvoiceItem[]>([]);
  const [caseNotes, setCaseNotes] = useState<NoteItem[]>([]);
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newMessage, setNewMessage] = useState({ subject: "", body: "" });
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    description: "",
    lineItems: [{ description: "", amount: 0 }],
    dueDate: "",
    notes: "",
  });

  const loadData = React.useCallback(() => {
    const allCases: CaseItem[] = JSON.parse(localStorage.getItem("cts_cases") || "[]");
    const found = allCases.find((c) => c.id === caseId);
    if (found) {
      setCaseData(found);
      setNewStatus(found.status);

      const allUsers: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
      setClient(allUsers.find((u) => u.id === found.userId) || null);
    }

    const allDocs: DocumentItem[] = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    setCaseDocuments(allDocs.filter((d) => d.caseId === caseId));

    const allInvoices: InvoiceItem[] = JSON.parse(localStorage.getItem("cts_invoices") || "[]");
    setCaseInvoices(allInvoices.filter((i) => i.caseId === caseId));

    const allNotes: NoteItem[] = JSON.parse(localStorage.getItem("cts_case_notes") || "[]");
    setCaseNotes(allNotes.filter((n) => n.caseId === caseId));
  }, [caseId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdateStatus = (notify: boolean) => {
    if (!caseData || newStatus === caseData.status) return;

    const allCases: CaseItem[] = JSON.parse(localStorage.getItem("cts_cases") || "[]");
    const index = allCases.findIndex((c) => c.id === caseId);
    if (index !== -1) {
      allCases[index].status = newStatus;
      allCases[index].events.push({
        date: new Date().toISOString(),
        description: `Status changed to ${newStatus}`,
        type: "status",
      });
      localStorage.setItem("cts_cases", JSON.stringify(allCases));

      if (notify && caseData) {
        // Add notification to client
        const notifications = JSON.parse(localStorage.getItem("cts_notifications") || "[]");
        notifications.push({
          id: `notif-${Date.now()}`,
          userId: caseData.userId,
          type: "case_update",
          title: "Case Status Updated",
          message: `Your ${caseData.serviceName} case has been updated to: ${newStatus}`,
          date: new Date().toISOString(),
          read: false,
        });
        localStorage.setItem("cts_notifications", JSON.stringify(notifications));

        // Also send a message
        const messages = JSON.parse(localStorage.getItem("cts_messages") || "[]");
        messages.push({
          id: `msg-status-${Date.now()}`,
          userId: caseData.userId,
          subject: `Case Update: ${caseData.serviceName}`,
          body: `Your case for ${caseData.serviceName} has been updated to "${newStatus}". Please log in to your portal for details.`,
          from: "Admin",
          to: client ? `${client.firstName} ${client.lastName}` : "",
          date: new Date().toISOString(),
          read: false,
          caseId: caseId,
        });
        localStorage.setItem("cts_messages", JSON.stringify(messages));
      }

      loadData();
    }
  };

  const handleUpdateDocStatus = (docId: string, status: string) => {
    const allDocs: DocumentItem[] = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    const index = allDocs.findIndex((d) => d.id === docId);
    if (index !== -1) {
      allDocs[index].status = status;
      localStorage.setItem("cts_documents", JSON.stringify(allDocs));
      loadData();
    }
  };

  const handleUpdateDocNotes = (docId: string, notes: string) => {
    const allDocs: DocumentItem[] = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    const index = allDocs.findIndex((d) => d.id === docId);
    if (index !== -1) {
      allDocs[index].notes = notes;
      localStorage.setItem("cts_documents", JSON.stringify(allDocs));
      loadData();
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const allNotes: NoteItem[] = JSON.parse(localStorage.getItem("cts_case_notes") || "[]");
    allNotes.push({
      id: `cnote-${Date.now()}`,
      caseId,
      content: newNote,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("cts_case_notes", JSON.stringify(allNotes));
    setNewNote("");
    loadData();
  };

  const handleDeleteNote = (noteId: string) => {
    const allNotes: NoteItem[] = JSON.parse(localStorage.getItem("cts_case_notes") || "[]");
    localStorage.setItem("cts_case_notes", JSON.stringify(allNotes.filter((n) => n.id !== noteId)));
    loadData();
  };

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.body || !caseData) return;
    const messages = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    messages.push({
      id: `msg-${Date.now()}`,
      userId: caseData.userId,
      subject: newMessage.subject,
      body: newMessage.body,
      from: "Admin",
      to: client ? `${client.firstName} ${client.lastName}` : "",
      date: new Date().toISOString(),
      read: false,
      caseId: caseId,
    });
    localStorage.setItem("cts_messages", JSON.stringify(messages));
    setNewMessage({ subject: "", body: "" });
  };

  const handleCreateInvoice = () => {
    if (!newInvoice.description || !caseData) return;
    const allInvoices: InvoiceItem[] = JSON.parse(localStorage.getItem("cts_invoices") || "[]");
    const total = newInvoice.lineItems.reduce((sum, li) => sum + li.amount, 0);
    allInvoices.push({
      id: `inv-${Date.now()}`,
      userId: caseData.userId,
      clientName: client ? `${client.firstName} ${client.lastName}` : "",
      caseId: caseId,
      description: newInvoice.description,
      lineItems: newInvoice.lineItems.filter((li) => li.description),
      amount: total,
      status: "Draft",
      dueDate: newInvoice.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      notes: newInvoice.notes,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("cts_invoices", JSON.stringify(allInvoices));
    setShowInvoiceForm(false);
    setNewInvoice({ description: "", lineItems: [{ description: "", amount: 0 }], dueDate: "", notes: "" });
    loadData();
  };

  const handleSendStatusNotification = () => {
    if (!caseData) return;
    const notifications = JSON.parse(localStorage.getItem("cts_notifications") || "[]");
    notifications.push({
      id: `notif-${Date.now()}`,
      userId: caseData.userId,
      type: "case_update",
      title: "Status Update from Your Tax Agent",
      message: `Your ${caseData.serviceName} case is currently "${caseData.status}". Our team is actively working on your behalf.`,
      date: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem("cts_notifications", JSON.stringify(notifications));
    alert("Status update notification sent to client.");
  };

  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-400">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Case not found</p>
          <button onClick={() => router.push("/portal/admin/cases")} className="text-teal-600 mt-2 text-sm hover:underline">
            Back to Cases
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => router.push("/portal/admin/cases")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cases
      </button>

      {/* Case Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-navy-700">{caseData.serviceName}</h1>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[caseData.status] || "bg-gray-100 text-gray-700"}`}>
                {caseData.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {client && (
                <button
                  onClick={() => router.push(`/portal/admin/clients/${client.id}`)}
                  className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium"
                >
                  <User className="w-3.5 h-3.5" />
                  {client.firstName} {client.lastName}
                </button>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Created {new Date(caseData.createdAt).toLocaleDateString()}
              </span>
              <span>Assigned: {caseData.assignedAgent}</span>
            </div>
          </div>
          <button
            onClick={handleSendStatusNotification}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition text-sm font-medium"
          >
            <Bell className="w-4 h-4" />
            Send Status Update to Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Management */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-navy-700 mb-4">Status Management</h2>
            <div className="flex items-center gap-3">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="input-field flex-1"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button
                onClick={() => handleUpdateStatus(false)}
                className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium whitespace-nowrap"
              >
                Update
              </button>
              <button
                onClick={() => handleUpdateStatus(true)}
                className="px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium whitespace-nowrap flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Update & Notify
              </button>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-navy-700 mb-4">Progress Timeline</h2>
            {caseData.events && caseData.events.length > 0 ? (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-4">
                  {[...caseData.events].reverse().map((event, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 pl-10">
                      <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                        idx === 0 ? "bg-teal-500 border-teal-500" : "bg-white border-gray-300"
                      }`} />
                      <div className="flex-1 pb-2">
                        <p className="text-sm font-medium text-gray-900">{event.description}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(event.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No events recorded</p>
            )}
          </div>

          {/* Document Review */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-navy-700 mb-4">Document Review</h2>
            {caseDocuments.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No documents linked to this case</p>
              </div>
            ) : (
              <div className="space-y-3">
                {caseDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900 text-sm">{doc.fileName}</span>
                        <span className="text-xs text-gray-400">{doc.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-teal-600 transition" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <select
                          value={doc.status}
                          onChange={(e) => handleUpdateDocStatus(doc.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            doc.status === "Reviewed" ? "bg-emerald-100 text-emerald-700" :
                            doc.status === "Action Required" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {DOC_STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Add review notes..."
                      defaultValue={doc.notes || ""}
                      onBlur={(e) => handleUpdateDocNotes(doc.id, e.target.value)}
                      className="w-full text-sm text-gray-500 bg-gray-50 border-0 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Client Communication */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-navy-700 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-600" />
              Message Client About This Case
            </h2>
            <div className="space-y-3">
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
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium disabled:opacity-50"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Internal Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-navy-700 mb-4 flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-amber-500" />
              Internal Notes
            </h2>
            <div className="space-y-3 mb-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="input-field text-sm"
                rows={2}
                placeholder="Add a note..."
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="w-full px-3 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition text-sm font-medium disabled:opacity-50"
              >
                Add Note
              </button>
            </div>
            {caseNotes.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-2">No notes</p>
            ) : (
              <div className="space-y-2">
                {[...caseNotes].reverse().map((note) => (
                  <div key={note.id} className="bg-amber-50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-700">{note.content}</p>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1 text-gray-400 hover:text-red-500 flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{new Date(note.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Case Invoices */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-navy-700 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-600" />
                Invoices
              </h2>
              <button
                onClick={() => setShowInvoiceForm(!showInvoiceForm)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition text-teal-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {showInvoiceForm && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2">
                <input
                  type="text"
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                  className="input-field text-sm"
                  placeholder="Description"
                />
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
                      className="input-field text-sm flex-1"
                      placeholder="Item"
                    />
                    <input
                      type="number"
                      value={li.amount || ""}
                      onChange={(e) => {
                        const items = [...newInvoice.lineItems];
                        items[idx].amount = parseFloat(e.target.value) || 0;
                        setNewInvoice({ ...newInvoice, lineItems: items });
                      }}
                      className="input-field text-sm w-24"
                      placeholder="$"
                    />
                  </div>
                ))}
                <button
                  onClick={() =>
                    setNewInvoice({ ...newInvoice, lineItems: [...newInvoice.lineItems, { description: "", amount: 0 }] })
                  }
                  className="text-xs text-teal-600 hover:text-teal-700"
                >
                  + Add item
                </button>
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  className="input-field text-sm"
                />
                <div className="flex gap-2">
                  <button onClick={handleCreateInvoice} className="px-3 py-1.5 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600">
                    Create
                  </button>
                  <button onClick={() => setShowInvoiceForm(false)} className="px-3 py-1.5 text-gray-600 text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {caseInvoices.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-2">No invoices for this case</p>
            ) : (
              <div className="space-y-2">
                {caseInvoices.map((inv) => (
                  <div key={inv.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{inv.description}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" :
                        inv.status === "Overdue" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">${inv.amount.toLocaleString()}</p>
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
