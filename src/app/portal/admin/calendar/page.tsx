"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  clientName: string;
  type: "Consultation" | "Filing Deadline" | "Follow-up" | "IRS Deadline";
  date: string;
  time: string;
  notes: string;
}

const EVENT_TYPES = ["Consultation", "Filing Deadline", "Follow-up", "IRS Deadline"] as const;

const TYPE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Consultation: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "Filing Deadline": { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  "Follow-up": { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500" },
  "IRS Deadline": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
};

// IRS key deadlines for the year
const getIRSDeadlines = (year: number): CalendarEvent[] => [
  { id: `irs-jan15-${year}`, clientName: "IRS", type: "IRS Deadline", date: `${year}-01-15`, time: "", notes: "Q4 Estimated Tax Payment Due" },
  { id: `irs-jan31-${year}`, clientName: "IRS", type: "IRS Deadline", date: `${year}-01-31`, time: "", notes: "W-2 and 1099 Forms Due to Recipients" },
  { id: `irs-mar15-${year}`, clientName: "IRS", type: "IRS Deadline", date: `${year}-03-15`, time: "", notes: "S-Corp and Partnership Returns Due (Form 1120-S, 1065)" },
  { id: `irs-apr15-${year}`, clientName: "IRS", type: "IRS Deadline", date: `${year}-04-15`, time: "", notes: "Individual Tax Returns Due (Form 1040) / Q1 Estimated Tax Payment" },
  { id: `irs-jun16-${year}`, clientName: "IRS", type: "IRS Deadline", date: `${year}-06-16`, time: "", notes: "Q2 Estimated Tax Payment Due" },
  { id: `irs-sep15-${year}`, clientName: "IRS", type: "IRS Deadline", date: `${year}-09-15`, time: "", notes: "Q3 Estimated Tax Payment Due / Extended S-Corp & Partnership Returns" },
  { id: `irs-oct15-${year}`, clientName: "IRS", type: "IRS Deadline", date: `${year}-10-15`, time: "", notes: "Extended Individual Tax Returns Due" },
];

export default function AdminCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    clientName: "",
    type: "Consultation",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const stored = JSON.parse(localStorage.getItem("cts_calendar_events") || "[]");
    const year = new Date().getFullYear();
    const irsDeadlines = getIRSDeadlines(year);

    // Merge IRS deadlines (don't duplicate)
    const existingIds = stored.map((e: CalendarEvent) => e.id);
    const mergedEvents = [
      ...stored,
      ...irsDeadlines.filter((d) => !existingIds.includes(d.id)),
    ];
    setEvents(mergedEvents);

    // Save back if IRS deadlines were added
    if (mergedEvents.length !== stored.length) {
      localStorage.setItem("cts_calendar_events", JSON.stringify(mergedEvents));
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const handleAddEvent = () => {
    if (!newEvent.clientName || !newEvent.date) return;
    const allEvents = [...events];
    allEvents.push({
      id: `event-${Date.now()}`,
      clientName: newEvent.clientName || "",
      type: (newEvent.type as CalendarEvent["type"]) || "Consultation",
      date: newEvent.date || "",
      time: newEvent.time || "",
      notes: newEvent.notes || "",
    });
    setEvents(allEvents);
    localStorage.setItem("cts_calendar_events", JSON.stringify(allEvents));
    setShowAddEvent(false);
    setNewEvent({ clientName: "", type: "Consultation", date: "", time: "", notes: "" });
  };

  const handleDeleteEvent = (eventId: string) => {
    const filtered = events.filter((e) => e.id !== eventId);
    setEvents(filtered);
    localStorage.setItem("cts_calendar_events", JSON.stringify(filtered));
  };

  // Upcoming deadlines (next 30 days)
  const nowDate = new Date();
  const thirtyDaysLater = new Date(nowDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const upcomingEvents = events
    .filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate >= nowDate && eventDate <= thirtyDaysLater;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const isToday = (day: number) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Calendar</h1>
          <p className="text-gray-500 mt-1">Appointments, deadlines, and follow-ups</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddEvent(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium text-sm"
          >
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
      </div>

      {/* Google Calendar integration */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <ExternalLink className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Sync with Google Workspace Calendar</p>
          <p className="text-xs text-gray-500">Connect your Google Calendar for automatic sync</p>
        </div>
        <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">Coming Soon</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Month Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => setCurrentDate(new Date(year, month - 1))}
              className="p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-navy-700">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={() => setCurrentDate(new Date(year, month + 1))}
              className="p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="px-2 py-2 text-center text-xs font-semibold text-gray-500 uppercase">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              const dateStr = day
                ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                : "";

              return (
                <div
                  key={idx}
                  className={`min-h-[80px] p-1 border-b border-r border-gray-100 ${
                    day ? "cursor-pointer hover:bg-gray-50" : "bg-gray-50/50"
                  } ${selectedDate === dateStr ? "bg-teal-50" : ""}`}
                  onClick={() => day && setSelectedDate(dateStr)}
                >
                  {day && (
                    <>
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${
                          isToday(day)
                            ? "bg-teal-500 text-white font-bold"
                            : "text-gray-700"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="space-y-0.5 mt-0.5">
                        {dayEvents.slice(0, 2).map((e) => {
                          const colors = TYPE_COLORS[e.type] || TYPE_COLORS.Consultation;
                          return (
                            <div
                              key={e.id}
                              className={`text-[10px] px-1 py-0.5 rounded truncate ${colors.bg} ${colors.text}`}
                            >
                              {e.clientName}
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-[10px] text-gray-400">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Upcoming & Selected Day */}
        <div className="space-y-6">
          {/* Selected Day Events */}
          {selectedDate && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-navy-700 mb-3">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              {events.filter((e) => e.date === selectedDate).length === 0 ? (
                <p className="text-sm text-gray-400">No events</p>
              ) : (
                <div className="space-y-2">
                  {events
                    .filter((e) => e.date === selectedDate)
                    .map((e) => {
                      const colors = TYPE_COLORS[e.type] || TYPE_COLORS.Consultation;
                      return (
                        <div key={e.id} className={`${colors.bg} rounded-lg p-3`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                              <span className={`text-sm font-medium ${colors.text}`}>{e.type}</span>
                            </div>
                            {!e.id.startsWith("irs-") && (
                              <button
                                onClick={() => handleDeleteEvent(e.id)}
                                className="p-1 text-gray-400 hover:text-red-500"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900 mt-1">{e.clientName}</p>
                          {e.time && (
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" /> {e.time}
                            </p>
                          )}
                          {e.notes && <p className="text-xs text-gray-500 mt-1">{e.notes}</p>}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-navy-700 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Upcoming (30 days)
            </h3>
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No upcoming events</p>
            ) : (
              <div className="space-y-2">
                {upcomingEvents.map((e) => {
                  const colors = TYPE_COLORS[e.type] || TYPE_COLORS.Consultation;
                  return (
                    <div key={e.id} className="flex items-start gap-3 py-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{e.clientName}</p>
                        <p className="text-xs text-gray-500">{e.type}</p>
                        {e.notes && <p className="text-xs text-gray-400 truncate">{e.notes}</p>}
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(e.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Type Legend */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-navy-700 mb-3">Event Types</h3>
            <div className="space-y-2">
              {EVENT_TYPES.map((type) => {
                const colors = TYPE_COLORS[type];
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
                    <span className="text-sm text-gray-600">{type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-navy-700">Add Event</h2>
              <button onClick={() => setShowAddEvent(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="label-text">Client / Description *</label>
                <input
                  type="text"
                  value={newEvent.clientName || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, clientName: e.target.value })}
                  className="input-field"
                  placeholder="Client name or description"
                />
              </div>
              <div>
                <label className="label-text">Event Type</label>
                <select
                  value={newEvent.type || "Consultation"}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as CalendarEvent["type"] })}
                  className="input-field"
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text">Date *</label>
                  <input
                    type="date"
                    value={newEvent.date || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-text">Time</label>
                  <input
                    type="time"
                    value={newEvent.time || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="label-text">Notes</label>
                <textarea
                  value={newEvent.notes || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                  className="input-field"
                  rows={2}
                  placeholder="Event notes..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button onClick={() => setShowAddEvent(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                disabled={!newEvent.clientName || !newEvent.date}
                className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium text-sm disabled:opacity-50"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
