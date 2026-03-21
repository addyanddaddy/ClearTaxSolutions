"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  FileText,
  Briefcase,
  MessageSquare,
  Calendar,
  Upload,
  CreditCard,
  User,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  FileCheck,
  Activity,
} from "lucide-react";

interface CaseData {
  id: string;
  userId: string;
  serviceName: string;
  status: string;
  createdAt: string;
  assignedAgent: string;
}

interface ActivityData {
  id: string;
  userId: string;
  type: string;
  description: string;
  date: string;
}

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  "In Review": "bg-yellow-100 text-yellow-700",
  "Documents Needed": "bg-orange-100 text-orange-700",
  "In Progress": "bg-purple-100 text-purple-700",
  Filed: "bg-green-100 text-green-700",
  Complete: "bg-emerald-100 text-emerald-700",
};

const ACTIVITY_ICONS: Record<string, typeof CheckCircle> = {
  registration: CheckCircle,
  case_created: Briefcase,
  document_uploaded: FileCheck,
  status_change: Activity,
  message: MessageSquare,
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [cases, setCases] = useState<CaseData[]>([]);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [documentCount, setDocumentCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    try {
      const storedCases = JSON.parse(localStorage.getItem("cts_cases") || "[]");
      setCases(storedCases.filter((c: CaseData) => c.userId === user.id));

      const storedActivity = JSON.parse(localStorage.getItem("cts_activity") || "[]");
      setActivities(
        storedActivity
          .filter((a: ActivityData) => a.userId === user.id)
          .sort((a: ActivityData, b: ActivityData) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
      );

      const storedDocs = JSON.parse(localStorage.getItem("cts_documents") || "[]");
      setDocumentCount(storedDocs.filter((d: { userId: string }) => d.userId === user.id).length);

      const storedMsgs = JSON.parse(localStorage.getItem("cts_messages") || "[]");
      setMessageCount(
        storedMsgs.filter((m: { userId: string; read: boolean }) => m.userId === user.id && !m.read).length
      );
    } catch {
      // silently fail
    }
  }, [user]);

  if (!user) return null;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Next deadline: April 15 of current or next year
  const currentYear = today.getFullYear();
  const april15 = new Date(currentYear, 3, 15);
  const nextDeadline = today > april15 ? new Date(currentYear + 1, 3, 15) : april15;
  const daysUntilDeadline = Math.ceil(
    (nextDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const stats = [
    {
      label: "Documents Uploaded",
      value: documentCount.toString(),
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
      href: "/portal/documents",
    },
    {
      label: "Active Cases",
      value: cases.length.toString(),
      icon: Briefcase,
      color: "bg-purple-50 text-purple-600",
      href: "/portal/cases",
    },
    {
      label: "Unread Messages",
      value: messageCount.toString(),
      icon: MessageSquare,
      color: "bg-teal-50 text-teal-600",
      href: "/portal/messages",
    },
    {
      label: "Tax Deadline",
      value: `${daysUntilDeadline}d`,
      subtext: nextDeadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      icon: Calendar,
      color: daysUntilDeadline < 30 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600",
      href: "/portal/cases",
    },
  ];

  const quickActions = [
    { label: "Upload Documents", icon: Upload, href: "/portal/documents", color: "text-blue-600 bg-blue-50" },
    { label: "View My Cases", icon: Briefcase, href: "/portal/cases", color: "text-purple-600 bg-purple-50" },
    { label: "Make a Payment", icon: CreditCard, href: "/portal/payments", color: "text-green-600 bg-green-50" },
    { label: "Send a Message", icon: MessageSquare, href: "/portal/messages", color: "text-teal-600 bg-teal-50" },
    { label: "Book Appointment", icon: Calendar, href: "/book", color: "text-orange-600 bg-orange-50" },
    { label: "Update Profile", icon: User, href: "/portal/profile", color: "text-navy-600 bg-navy-50" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {user.firstName}
        </h1>
        <p className="text-gray-500 mt-1">{formattedDate}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              {stat.subtext && <div className="text-xs text-gray-400 mt-0.5">{stat.subtext}</div>}
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* My Cases */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">My Cases</h2>
              <Link
                href="/portal/cases"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {cases.length === 0 ? (
              <div className="p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No active cases yet.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Your selected services will appear here as cases.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {cases.slice(0, 4).map((c) => (
                  <Link
                    key={c.id}
                    href={`/portal/cases/${c.id}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{c.serviceName}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Agent: {c.assignedAgent} &bull;{" "}
                        {new Date(c.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        STATUS_COLORS[c.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            {activities.length === 0 ? (
              <div className="p-8 text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent activity</p>
              </div>
            ) : (
              <div className="p-4">
                <div className="relative">
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-200" />
                  <div className="space-y-4">
                    {activities.map((activity) => {
                      const Icon = ACTIVITY_ICONS[activity.type] || AlertCircle;
                      return (
                        <div key={activity.id} className="flex gap-3 relative">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 relative z-10">
                            <Icon className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="min-w-0 pt-1">
                            <p className="text-sm text-gray-700">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(activity.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-all duration-200 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
