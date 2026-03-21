"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Briefcase, ArrowRight, Filter, ChevronDown, ChevronUp, Clock } from "lucide-react";

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

const ALL_STATUSES = ["All", "New", "In Review", "Documents Needed", "In Progress", "Filed", "Complete"];

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
    case "New":
      return 0;
    case "Documents Needed":
      return 1;
    case "In Review":
      return 2;
    case "In Progress":
      return 3;
    case "Filed":
      return 4;
    case "Complete":
      return 5;
    default:
      return 0;
  }
}

function ProgressTracker({ status }: { status: string }) {
  const currentStep = getStepIndex(status);
  return (
    <div className="flex items-center w-full">
      {PROGRESS_STEPS.map((step, index) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                index <= currentStep
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-[10px] mt-1 whitespace-nowrap ${
                index <= currentStep ? "text-teal-600 font-medium" : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
          {index < PROGRESS_STEPS.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-1 ${
                index < currentStep ? "bg-teal-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CasesPage() {
  const { user } = useAuth();
  const [cases, setCases] = useState<CaseData[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    try {
      const storedCases = JSON.parse(localStorage.getItem("cts_cases") || "[]");
      setCases(storedCases.filter((c: CaseData) => c.userId === user.id));
    } catch {
      setCases([]);
    }
  }, [user]);

  if (!user) return null;

  const filteredCases =
    filterStatus === "All" ? cases : cases.filter((c) => c.status === filterStatus);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Cases</h1>
          <p className="text-gray-500 mt-1">Track the progress of all your tax cases</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-auto text-sm py-2"
          >
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCases.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">
            {filterStatus === "All"
              ? "No cases found"
              : `No cases with status "${filterStatus}"`}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Cases are created based on your selected services.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCases.map((caseItem) => {
            const isExpanded = expandedCase === caseItem.id;
            return (
              <div
                key={caseItem.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Case Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{caseItem.serviceName}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Agent: {caseItem.assignedAgent} &bull; Opened{" "}
                        {new Date(caseItem.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          STATUS_COLORS[caseItem.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {caseItem.status}
                      </span>
                      <Link
                        href={`/portal/cases/${caseItem.id}`}
                        className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm font-medium"
                      >
                        Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="mt-4">
                    <ProgressTracker status={caseItem.status} />
                  </div>

                  {/* Expand/Collapse Timeline */}
                  <button
                    onClick={() => setExpandedCase(isExpanded ? null : caseItem.id)}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" /> Hide Timeline
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" /> Show Timeline
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Timeline */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Case Timeline</h4>
                    {caseItem.events && caseItem.events.length > 0 ? (
                      <div className="relative pl-6">
                        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gray-300" />
                        <div className="space-y-3">
                          {caseItem.events.map((event, idx) => (
                            <div key={idx} className="flex items-start gap-3 relative">
                              <div className="absolute left-[-20px] w-3.5 h-3.5 rounded-full bg-white border-2 border-teal-500 z-10" />
                              <div>
                                <p className="text-sm text-gray-700">{event.description}</p>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" />
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    month: "short",
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
                    ) : (
                      <p className="text-sm text-gray-400">No timeline events yet.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
