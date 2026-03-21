"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  MessageSquare,
  Send,
  Mail,
  MailOpen,
  ArrowLeft,
  X,
  Clock,
  ChevronRight,
} from "lucide-react";

interface Message {
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

interface CaseData {
  id: string;
  userId: string;
  serviceName: string;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [cases, setCases] = useState<CaseData[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCaseId, setNewCaseId] = useState("");
  const [sending, setSending] = useState(false);

  const loadMessages = useCallback(() => {
    if (!user) return;
    try {
      const msgs = JSON.parse(localStorage.getItem("cts_messages") || "[]");
      setMessages(
        msgs
          .filter((m: Message) => m.userId === user.id)
          .sort((a: Message, b: Message) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );

      const storedCases = JSON.parse(localStorage.getItem("cts_cases") || "[]");
      setCases(storedCases.filter((c: CaseData) => c.userId === user.id));
    } catch {
      setMessages([]);
    }
  }, [user]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  if (!user) return null;

  const markAsRead = (msg: Message) => {
    if (msg.read) return;
    const allMsgs = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    const idx = allMsgs.findIndex((m: Message) => m.id === msg.id);
    if (idx !== -1) {
      allMsgs[idx].read = true;
      localStorage.setItem("cts_messages", JSON.stringify(allMsgs));
      loadMessages();
    }
  };

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    setShowCompose(false);
    markAsRead(msg);
  };

  const handleSendMessage = async () => {
    if (!newSubject.trim() || !newBody.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 500));

    const allMsgs = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      userId: user.id,
      subject: newSubject,
      body: newBody,
      from: `${user.firstName} ${user.lastName}`,
      to: "Joseph Gasana, EA",
      date: new Date().toISOString(),
      read: true,
      caseId: newCaseId || null,
    };
    allMsgs.push(newMsg);
    localStorage.setItem("cts_messages", JSON.stringify(allMsgs));

    // Add activity
    const activities = JSON.parse(localStorage.getItem("cts_activity") || "[]");
    activities.push({
      id: `act-${Date.now()}`,
      userId: user.id,
      type: "message",
      description: `Sent message: ${newSubject}`,
      date: new Date().toISOString(),
    });
    localStorage.setItem("cts_activity", JSON.stringify(activities));

    setNewSubject("");
    setNewBody("");
    setNewCaseId("");
    setShowCompose(false);
    setSending(false);
    loadMessages();
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "Communicate with your Enrolled Agent"}
          </p>
        </div>
        <button
          onClick={() => {
            setShowCompose(true);
            setSelectedMessage(null);
          }}
          className="btn-primary"
        >
          <Send className="w-4 h-4 mr-2" /> New Message
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden min-h-[500px]">
        <div className="flex h-full">
          {/* Message List */}
          <div
            className={`w-full md:w-96 border-r border-gray-100 flex flex-col ${
              (selectedMessage || showCompose) ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-sm font-medium text-gray-600">
                {messages.length} message{messages.length !== 1 ? "s" : ""}
              </p>
            </div>
            {messages.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No messages yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Start a conversation with your EA
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === msg.id ? "bg-teal-50 border-l-2 border-l-teal-500" : ""
                    } ${!msg.read ? "bg-blue-50/50" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {msg.read ? (
                          <MailOpen className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Mail className="w-4 h-4 text-teal-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm truncate ${!msg.read ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                            {msg.from}
                          </p>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {new Date(msg.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className={`text-sm truncate mt-0.5 ${!msg.read ? "font-semibold text-gray-800" : "text-gray-600"}`}>
                          {msg.subject}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {msg.body.substring(0, 80)}...
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1 md:hidden" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail / Compose */}
          <div
            className={`flex-1 flex flex-col ${
              !selectedMessage && !showCompose ? "hidden md:flex" : "flex"
            }`}
          >
            {showCompose ? (
              /* Compose Form */
              <div className="flex-1 flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">New Message</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCompose(false)}
                      className="md:hidden text-gray-400 hover:text-gray-600"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowCompose(false)}
                      className="hidden md:block text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-4">
                  <div>
                    <label className="label-text">To</label>
                    <input
                      type="text"
                      value="Joseph Gasana, EA"
                      disabled
                      className="input-field bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="label-text">Subject *</label>
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="input-field"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  <div>
                    <label className="label-text">Related Case</label>
                    <select
                      value={newCaseId}
                      onChange={(e) => setNewCaseId(e.target.value)}
                      className="input-field"
                    >
                      <option value="">None (General Inquiry)</option>
                      {cases.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="label-text">Message *</label>
                    <textarea
                      value={newBody}
                      onChange={(e) => setNewBody(e.target.value)}
                      className="input-field min-h-[200px] resize-y"
                      placeholder="Type your message here..."
                      rows={8}
                    />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100">
                  <button
                    onClick={handleSendMessage}
                    disabled={!newSubject.trim() || !newBody.trim() || sending}
                    className="btn-primary"
                  >
                    {sending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : selectedMessage ? (
              /* Message Detail */
              <div className="flex-1 flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="md:hidden text-gray-400 hover:text-gray-600"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="font-semibold text-gray-900 truncate">{selectedMessage.subject}</h2>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy-500 flex items-center justify-center text-white text-sm font-bold">
                        {selectedMessage.from.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedMessage.from}</p>
                        <p className="text-xs text-gray-400">
                          To: {selectedMessage.to || "You"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(selectedMessage.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {selectedMessage.body}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowCompose(true);
                      setNewSubject(`Re: ${selectedMessage.subject}`);
                      setNewCaseId(selectedMessage.caseId || "");
                      setSelectedMessage(null);
                    }}
                    className="btn-outline text-sm"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500">Select a message to read</p>
                  <p className="text-sm text-gray-400 mt-1">Or compose a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
