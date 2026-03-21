"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  User,
} from "lucide-react";

interface CaseEvent {
  date: string;
  description: string;
  type: string;
}

interface CaseData {
  id: string;
  userId: string;
  serviceName: string;
  status: string;
  createdAt: string;
  assignedAgent: string;
  events: CaseEvent[];
}

interface DocumentData {
  id: string;
  userId: string;
  fileName: string;
  fileSize: number;
  category: string;
  caseService: string;
  status: string;
  uploadDate: string;
}

interface MessageData {
  id: string;
  userId: string;
  subject: string;
  body: string;
  from: string;
  date: string;
  caseId: string | null;
}

interface PaymentData {
  id: string;
  userId: string;
  description: string;
  amount: number;
  date: string;
  method: string;
  caseService: string;
}

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  "In Review": "bg-yellow-100 text-yellow-700",
  "Documents Needed": "bg-orange-100 text-orange-700",
  "In Progress": "bg-purple-100 text-purple-700",
  Filed: "bg-green-100 text-green-700",
  Complete: "bg-emerald-100 text-emerald-700",
};

const PROGRESS_STEPS = ["Intake", "Document Collection", "Review", "Preparation", "Filing", "Complete"];

function getStepIndex(status: string): number {
  switch (status) {
    case "New": return 0;
    case "Documents Needed": return 1;
    case "In Review": return 2;
    case "In Progress": return 3;
    case "Filed": return 4;
    case "Complete": return 5;
    default: return 0;
  }
}

export default function CaseDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const caseId = params.id as string;

  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [newNote, setNewNote] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (!user) return;
    try {
      const cases = JSON.parse(localStorage.getItem("cts_cases") || "[]");
      const found = cases.find((c: CaseData) => c.id === caseId && c.userId === user.id);
      setCaseData(found || null);

      if (found) {
        // Get case documents
        const docs = JSON.parse(localStorage.getItem("cts_documents") || "[]");
        setDocuments(docs.filter((d: DocumentData) => d.userId === user.id && d.caseService === found.serviceName));

        // Get case messages
        const msgs = JSON.parse(localStorage.getItem("cts_messages") || "[]");
        setMessages(msgs.filter((m: MessageData) => m.userId === user.id && m.caseId === caseId));

        // Get case payments
        const pmts = JSON.parse(localStorage.getItem("cts_payments") || "[]");
        setPayments(pmts.filter((p: PaymentData) => p.userId === user.id && p.caseService === found.serviceName));
      }
    } catch {
      // handle error silently
    }
  }, [user, caseId]);

  if (!user) return null;

  if (!caseData) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h2 className="text-xl font-semibold text-gray-700">Case Not Found</h2>
        <p className="text-gray-500 mt-2">This case does not exist or you don&apos;t have access to it.</p>
        <Link href="/portal/cases" className="btn-primary mt-6 inline-flex">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cases
        </Link>
      </div>
    );
  }

  const currentStep = getStepIndex(caseData.status);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const allMessages = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    const msg = {
      id: `msg-${Date.now()}`,
      userId: user.id,
      subject: `Note on ${caseData.serviceName}`,
      body: newNote,
      from: `${user.firstName} ${user.lastName}`,
      to: "Joseph Gasana, EA",
      date: new Date().toISOString(),
      read: true,
      caseId: caseId,
    };
    allMessages.push(msg);
    localStorage.setItem("cts_messages", JSON.stringify(allMessages));
    setMessages((prev) => [...prev, msg]);
    setNewNote("");
  };

  const handleRequestUpdate = () => {
    const allMessages = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    const msg = {
      id: `msg-${Date.now()}`,
      userId: user.id,
      subject: `Status Update Request: ${caseData.serviceName}`,
      body: `Hi Joseph, I'd like to request a status update on my ${caseData.serviceName} case. Thank you.`,
      from: `${user.firstName} ${user.lastName}`,
      to: "Joseph Gasana, EA",
      date: new Date().toISOString(),
      read: true,
      caseId: caseId,
    };
    allMessages.push(msg);
    localStorage.setItem("cts_messages", JSON.stringify(allMessages));
    setMessages((prev) => [...prev, msg]);
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back Button */}
      <Link
        href="/portal/cases"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Cases
      </Link>

      {/* Case Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{caseData.serviceName}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {caseData.assignedAgent}
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> Opened{" "}
                {new Date(caseData.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                STATUS_COLORS[caseData.status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {caseData.status}
            </span>
            <button
              onClick={handleRequestUpdate}
              disabled={requestSent}
              className="btn-outline text-sm py-2 px-4"
            >
              {requestSent ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Request Sent
                </span>
              ) : (
                "Request Status Update"
              )}
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mt-2">
          <div className="flex items-center w-full">
            {PROGRESS_STEPS.map((step, index) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      index <= currentStep
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index <= currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-xs mt-1.5 whitespace-nowrap ${
                      index <= currentStep ? "text-teal-600 font-semibold" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < PROGRESS_STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-1.5 ${
                      index < currentStep ? "bg-teal-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Documents Section */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" /> Documents ({documents.length})
            </h2>
            <Link
              href="/portal/documents"
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Upload More
            </Link>
          </div>
          {documents.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No documents uploaded for this case</p>
              <Link href="/portal/documents" className="text-sm text-teal-600 hover:underline mt-2 inline-block">
                Upload documents
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {documents.map((doc) => (
                <div key={doc.id} className="px-6 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{doc.fileName}</p>
                    <p className="text-xs text-gray-400">{doc.category} &bull; {new Date(doc.uploadDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    doc.status === "Reviewed" ? "bg-green-100 text-green-700" :
                    doc.status === "Action Required" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-400" /> Payments
            </h2>
            <Link
              href="/portal/payments"
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              View All
            </Link>
          </div>
          {payments.length === 0 ? (
            <div className="p-8 text-center">
              <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No payments recorded for this case</p>
              <Link href="/portal/payments" className="text-sm text-teal-600 hover:underline mt-2 inline-block">
                View payments
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {payments.map((pmt) => (
                <div key={pmt.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{pmt.description}</p>
                    <p className="text-xs text-gray-400">{new Date(pmt.date).toLocaleDateString()}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">${pmt.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages / Notes Section */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-400" /> Case Notes & Messages
          </h2>
        </div>
        <div className="p-6">
          {/* Messages list */}
          {messages.length > 0 && (
            <div className="space-y-4 mb-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-4 rounded-lg ${
                  msg.from.includes("Joseph") ? "bg-navy-50 border border-navy-100" : "bg-teal-50 border border-teal-100"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{msg.from}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{msg.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add Note Form */}
          <div className="flex gap-3">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="input-field flex-1 min-h-[80px] resize-y"
              placeholder="Add a note or message about this case..."
              rows={2}
            />
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="btn-primary self-end"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {caseData.events && caseData.events.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" /> Case Timeline
          </h2>
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gray-200" />
            <div className="space-y-4">
              {caseData.events.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3 relative">
                  <div className="absolute left-[-20px] w-3.5 h-3.5 rounded-full bg-white border-2 border-teal-500 z-10" />
                  <div>
                    <p className="text-sm text-gray-700">{event.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
