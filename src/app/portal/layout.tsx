"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  CreditCard,
  MessageSquare,
  Calendar,
  User,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Shield,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { label: "My Cases", href: "/portal/cases", icon: Briefcase },
  { label: "Documents", href: "/portal/documents", icon: FileText },
  { label: "Payments", href: "/portal/payments", icon: CreditCard },
  { label: "Messages", href: "/portal/messages", icon: MessageSquare },
  { label: "Book Appointment", href: "/book", icon: Calendar },
  { label: "Profile", href: "/portal/profile", icon: User },
];

const bottomLinks = [
  { label: "Back to Website", href: "/", icon: ExternalLink },
];

function SidebarContent({
  pathname,
  onLogout,
  onClose,
}: {
  pathname: string;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-navy-400/30">
        <Link href="/portal/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Clear Tax</div>
            <div className="text-teal-300 text-xs leading-tight">Solutions Portal</div>
          </div>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href || (link.href !== "/portal/dashboard" && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-teal-500/20 text-teal-300 border-l-2 border-teal-400 ml-0"
                  : "text-navy-100 hover:bg-navy-400/20 hover:text-white"
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="border-t border-navy-400/30 py-3 px-3 space-y-1">
        {bottomLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-navy-200 hover:bg-navy-400/20 hover:text-white transition-all duration-200"
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={() => {
            onLogout();
            onClose?.();
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200 w-full text-left"
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );
}

function PortalShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Public portal routes that don't need auth
  const publicRoutes = ["/portal", "/portal/login", "/portal/register"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith("/portal/admin");

  useEffect(() => {
    if (!loading && !user && !isPublicRoute) {
      router.push("/portal/login");
    }
  }, [user, loading, pathname, isPublicRoute, router]);

  // For public pages, render without the portal shell
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Admin routes have their own layout shell
  if (isAdminRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const unreadMessages = (() => {
    try {
      const msgs = JSON.parse(localStorage.getItem("cts_messages") || "[]");
      return msgs.filter((m: { read: boolean; userId: string }) => !m.read && m.userId === user.id).length;
    } catch {
      return 0;
    }
  })();

  const handleLogout = () => {
    logout();
    router.push("/portal/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gradient-to-b from-navy-500 via-navy-600 to-navy-800 z-30">
        <SidebarContent pathname={pathname} onLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-navy-500 via-navy-600 to-navy-800 z-50">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent pathname={pathname} onLogout={handleLogout} onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden lg:block">
              <h2 className="text-sm text-gray-500">
                {sidebarLinks.find((l) => pathname === l.href || (l.href !== "/portal/dashboard" && pathname.startsWith(l.href)))?.label || "Portal"}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <Link
                href="/portal/messages"
                className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadMessages > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {unreadMessages}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-navy-500 flex items-center justify-center text-white text-sm font-semibold">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.firstName} {user.lastName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                      <Link
                        href="/portal/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/portal/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PortalShell>{children}</PortalShell>
    </AuthProvider>
  );
}
