"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Send,
  Search,
  Bell,
  Users,
  AlertTriangle,
  Mail,
  X,
} from "lucide-react";

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
  isAlert?: boolean;
}

interface UserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function AdminMessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClient = searchParams.get("client") || "";

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [selectedClientId, setSelectedClientId] = useState(preselectedClient);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState({ subject: "", body: "", isAlert: false });
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState({ subject: "", body: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setMessages(JSON.parse(localStorage.getItem("cts_messages") || "[]"));
    const allUsers: UserItem[] = JSON.parse(localStorage.getItem("cts_users") || "[]");
    setUsers(allUsers.filter((u) => u.role === "client"));
  };

  const getClientName = (userId: string) => {
    const u = users.find((u) => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : "Unknown";
  };

  // Group messages by client
  const clientThreads = users
    .map((u) => {
      const clientMessages = messages.filter((m) => m.userId === u.id);
      const unreadCount = clientMessages.filter((m) => !m.read && m.from !== "Admin").length;
      const lastMessage = clientMessages.length > 0
        ? clientMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
        : null;
      return { user: u, messages: clientMessages, unreadCount, lastMessage };
    })
    .filter((t) => {
      if (!search) return true;
      return `${t.user.firstName} ${t.user.lastName}`.toLowerCase().includes(search.toLowerCase());
    })
    .filter((t) => t.messages.length > 0 || t.user.id === selectedClientId)
    .sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.date).getTime() - new Date(a.lastMessage.date).getTime();
    });

  const selectedThread = clientThreads.find((t) => t.user.id === selectedClientId);
  const selectedMessages = selectedThread
    ? selectedThread.messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.body || !selectedClientId) return;
    const allMessages: MessageItem[] = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    const msg: MessageItem = {
      id: `msg-${Date.now()}`,
      userId: selectedClientId,
      subject: newMessage.subject,
      body: newMessage.body,
      from: "Admin",
      to: getClientName(selectedClientId),
      date: new Date().toISOString(),
      read: false,
      caseId: null,
      isAlert: newMessage.isAlert,
    };
    allMessages.push(msg);
    localStorage.setItem("cts_messages", JSON.stringify(allMessages));

    // If alert, also add to notifications
    if (newMessage.isAlert) {
      const notifications = JSON.parse(localStorage.getItem("cts_notifications") || "[]");
      notifications.push({
        id: `notif-${Date.now()}`,
        userId: selectedClientId,
        type: "alert",
        title: newMessage.subject,
        message: newMessage.body,
        date: new Date().toISOString(),
        read: false,
      });
      localStorage.setItem("cts_notifications", JSON.stringify(notifications));
    }

    setNewMessage({ subject: "", body: "", isAlert: false });
    loadData();
  };

  const handleBroadcast = () => {
    if (!broadcastMessage.subject || !broadcastMessage.body) return;
    const allMessages: MessageItem[] = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    const notifications = JSON.parse(localStorage.getItem("cts_notifications") || "[]");

    users.forEach((u) => {
      allMessages.push({
        id: `msg-broadcast-${u.id}-${Date.now()}`,
        userId: u.id,
        subject: broadcastMessage.subject,
        body: broadcastMessage.body,
        from: "Admin",
        to: `${u.firstName} ${u.lastName}`,
        date: new Date().toISOString(),
        read: false,
        caseId: null,
      });
      notifications.push({
        id: `notif-broadcast-${u.id}-${Date.now()}`,
        userId: u.id,
        type: "broadcast",
        title: broadcastMessage.subject,
        message: broadcastMessage.body,
        date: new Date().toISOString(),
        read: false,
      });
    });

    localStorage.setItem("cts_messages", JSON.stringify(allMessages));
    localStorage.setItem("cts_notifications", JSON.stringify(notifications));
    setShowBroadcast(false);
    setBroadcastMessage({ subject: "", body: "" });
    loadData();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const markAsRead = (msgId: string) => {
    const allMessages: MessageItem[] = JSON.parse(localStorage.getItem("cts_messages") || "[]");
    const index = allMessages.findIndex((m) => m.id === msgId);
    if (index !== -1) {
      allMessages[index].read = true;
      localStorage.setItem("cts_messages", JSON.stringify(allMessages));
      loadData();
    }
  };

  // Mark all selected client messages as read when selected
  useEffect(() => {
    if (selectedClientId) {
      const allMessages: MessageItem[] = JSON.parse(localStorage.getItem("cts_messages") || "[]");
      let changed = false;
      allMessages.forEach((m) => {
        if (m.userId === selectedClientId && !m.read && m.from !== "Admin") {
          m.read = true;
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem("cts_messages", JSON.stringify(allMessages));
        loadData();
      }
    }
  }, [selectedClientId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Messages</h1>
          <p className="text-gray-500 mt-1">Client communication center</p>
        </div>
        <button
          onClick={() => setShowBroadcast(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition font-medium text-sm"
        >
          <Users className="w-4 h-4" /> Broadcast to All
        </button>
      </div>

      {/* Broadcast Modal */}
      {showBroadcast && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-navy-700">Broadcast Message</h2>
              <button onClick={() => setShowBroadcast(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500">This message will be sent to all {users.length} clients.</p>
              <input
                type="text"
                value={broadcastMessage.subject}
                onChange={(e) => setBroadcastMessage({ ...broadcastMessage, subject: e.target.value })}
                className="input-field"
                placeholder="Subject"
              />
              <textarea
                value={broadcastMessage.body}
                onChange={(e) => setBroadcastMessage({ ...broadcastMessage, body: e.target.value })}
                className="input-field"
                rows={4}
                placeholder="Write your broadcast message..."
              />
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button onClick={() => setShowBroadcast(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button
                onClick={handleBroadcast}
                disabled={!broadcastMessage.subject || !broadcastMessage.body}
                className="px-6 py-2.5 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition font-medium text-sm disabled:opacity-50"
              >
                Send to All Clients
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Panel */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
        <div className="flex h-full">
          {/* Left: Client List */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {clientThreads.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">
                  <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No conversations
                </div>
              ) : (
                clientThreads.map((thread) => (
                  <button
                    key={thread.user.id}
                    onClick={() => setSelectedClientId(thread.user.id)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition ${
                      selectedClientId === thread.user.id ? "bg-teal-50 border-l-3 border-l-teal-500" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-xs font-bold flex-shrink-0">
                          {thread.user.firstName[0]}
                          {thread.user.lastName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {thread.user.firstName} {thread.user.lastName}
                          </p>
                          {thread.lastMessage && (
                            <p className="text-xs text-gray-500 truncate">{thread.lastMessage.subject}</p>
                          )}
                        </div>
                      </div>
                      {thread.unreadCount > 0 && (
                        <span className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right: Message Thread */}
          <div className="flex-1 flex flex-col">
            {!selectedClientId ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium">Select a client</p>
                  <p className="text-sm mt-1">Choose a conversation from the left panel</p>
                </div>
              </div>
            ) : (
              <>
                {/* Thread Header */}
                <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-xs font-bold">
                      {selectedThread?.user.firstName[0]}
                      {selectedThread?.user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedThread?.user.firstName} {selectedThread?.user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{selectedThread?.user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/portal/admin/clients/${selectedClientId}`)}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    View Profile
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.from === "Admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-md rounded-xl px-4 py-3 ${
                          msg.from === "Admin"
                            ? "bg-teal-500 text-white"
                            : "bg-gray-100 text-gray-900"
                        } ${msg.isAlert ? "border-2 border-amber-400" : ""}`}
                      >
                        {msg.isAlert && (
                          <div className={`flex items-center gap-1 text-xs mb-1 ${msg.from === "Admin" ? "text-amber-200" : "text-amber-600"}`}>
                            <AlertTriangle className="w-3 h-3" /> Alert
                          </div>
                        )}
                        <p className={`text-xs font-medium mb-1 ${msg.from === "Admin" ? "text-teal-100" : "text-gray-500"}`}>
                          {msg.subject}
                        </p>
                        <p className="text-sm">{msg.body}</p>
                        <p className={`text-xs mt-2 ${msg.from === "Admin" ? "text-teal-200" : "text-gray-400"}`}>
                          {new Date(msg.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {selectedMessages.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <p className="text-sm">No messages yet. Start the conversation below.</p>
                    </div>
                  )}
                </div>

                {/* Compose */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Subject"
                    />
                    <div className="flex gap-2">
                      <textarea
                        value={newMessage.body}
                        onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        rows={2}
                        placeholder="Write your message..."
                      />
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={handleSendMessage}
                          disabled={!newMessage.subject || !newMessage.body}
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium disabled:opacity-50"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setNewMessage({ ...newMessage, isAlert: !newMessage.isAlert })}
                          className={`px-4 py-2 rounded-lg transition text-sm ${
                            newMessage.isAlert
                              ? "bg-amber-100 text-amber-700 border border-amber-300"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                          title="Send as Alert"
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
