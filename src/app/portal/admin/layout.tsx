"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderOpen,
  Receipt,
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  Eye,
  LogOut,
  Bell,
  Menu,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { label: "Clients", href: "/portal/admin/clients", icon: Users },
  { label: "Cases", href: "/portal/admin/cases", icon: Briefcase },
  { label: "Documents", href: "/portal/admin/documents", icon: FolderOpen },
  { label: "Invoices", href: "/portal/admin/invoices", icon: Receipt },
  { label: "Messages", href: "/portal/admin/messages", icon: MessageSquare },
  { label: "Calendar", href: "/portal/admin/calendar", icon: Calendar },
  { label: "Reports", href: "/portal/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/portal/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/portal/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Count unread items for notification badge
    try {
      const messages = JSON.parse(localStorage.getItem("cts_messages") || "[]");
      const unreadMessages = messages.filter(
        (m: { read: boolean; from: string }) => !m.read && m.from !== "Admin"
      ).length;
      const documents = JSON.parse(localStorage.getItem("cts_documents") || "[]");
      const pendingDocs = documents.filter(
        (d: { status: string }) => d.status === "Pending Review"
      ).length;
      setNotificationCount(unreadMessages + pendingDocs);
    } catch {
      setNotificationCount(0);
    }
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  const isActive = (href: string) => {
    if (href === "/portal/admin") return pathname === "/portal/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push("/portal/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-navy-700 via-navy-800 to-navy-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-navy-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">Clear Tax Solutions</h1>
              <p className="text-xs text-teal-300 font-medium">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-teal-500/20 text-teal-300 border-l-3 border-teal-400"
                    : "text-gray-300 hover:bg-navy-600 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-teal-400" : ""}`} />
                {item.label}
                {item.label === "Messages" && notificationCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>
            );
          })}

          {/* Separator */}
          <div className="border-t border-navy-600 my-4" />

          {/* Switch to Client View */}
          <button
            onClick={() => {
              router.push("/portal/dashboard");
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-navy-600 hover:text-white transition-all duration-200"
          >
            <Eye className="w-5 h-5 flex-shrink-0" />
            Switch to Client View
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Logout
          </button>
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-navy-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-lg font-bold text-navy-700">
                Clear Tax Solutions{" "}
                <span className="text-teal-600 font-normal">— Admin</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button
              onClick={() => router.push("/portal/admin/messages")}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>

            {/* Admin name */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center text-white text-xs font-bold">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
