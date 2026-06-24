"use client";

import { useState } from "react";
import { Plus, Trash2, Bell, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  name: string;
  renewalDate: string;
  leadDays: number;
};

const LEAD_OPTIONS = [
  { value: 7, label: "7 days before" },
  { value: 14, label: "14 days before" },
  { value: 30, label: "30 days before" },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calcReminderDate(renewalDate: string, leadDays: number): Date | null {
  if (!renewalDate) return null;
  const d = new Date(renewalDate);
  if (isNaN(d.getTime())) return null;
  d.setDate(d.getDate() - leadDays);
  return d;
}

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export default function RenewalReminderTool() {
  const [services, setServices] = useState<Service[]>([
    { id: crypto.randomUUID(), name: "", renewalDate: "", leadDays: 14 },
  ]);

  function addRow() {
    setServices((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", renewalDate: "", leadDays: 14 },
    ]);
  }

  function removeRow(id: string) {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  function update(id: string, field: Partial<Service>) {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...field } : s)));
  }

  const today = new Date();

  const sorted = [...services]
    .filter((s) => s.name && s.renewalDate)
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime());

  const hasData = sorted.length > 0;

  return (
    <div>
      <div className="space-y-3">
        {services.map((svc) => {
          const reminder = calcReminderDate(svc.renewalDate, svc.leadDays);
          const daysToRenewal = svc.renewalDate ? daysUntil(svc.renewalDate) : null;
          const daysToReminder = reminder ? daysUntil(reminder.toISOString().split("T")[0]) : null;

          return (
            <div key={svc.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Service name"
                    value={svc.name}
                    onChange={(e) => update(svc.id, { name: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="date"
                    value={svc.renewalDate}
                    onChange={(e) => update(svc.id, { renewalDate: e.target.value })}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={svc.leadDays}
                    onChange={(e) => update(svc.id, { leadDays: parseInt(e.target.value) })}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {LEAD_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {services.length > 1 && (
                    <button
                      onClick={() => removeRow(svc.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove service"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {svc.name && svc.renewalDate && reminder && (
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    Renewal: <span className="font-medium text-gray-900">{formatDate(svc.renewalDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bell size={14} className="text-gray-400" />
                    Reminder: <span className="font-medium text-gray-900">{formatDate(reminder.toISOString().split("T")[0])}</span>
                  </div>
                  {daysToReminder !== null && (
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                        daysToReminder < 0
                          ? "bg-red-100 text-red-700"
                          : daysToReminder <= 7
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      )}
                    >
                      {daysToReminder < 0
                        ? "Reminder passed"
                        : daysToReminder === 0
                          ? "Reminder today"
                          : `Reminder in ${daysToReminder} day${daysToReminder === 1 ? "" : "s"}`}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <button
          onClick={addRow}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Plus size={16} /> Add service
        </button>
      </div>

      {hasData && (
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Reminder Calendar</h3>
          <div className="space-y-2">
            {sorted.map((svc) => {
              const reminder = calcReminderDate(svc.renewalDate, svc.leadDays);
              return (
                <div
                  key={svc.id}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4"
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                      reminder && daysUntil(reminder.toISOString().split("T")[0]) < 0
                        ? "bg-red-100"
                        : "bg-blue-100"
                    )}
                  >
                    <Bell size={18} className={reminder && daysUntil(reminder.toISOString().split("T")[0]) < 0 ? "text-red-600" : "text-blue-600"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{svc.name}</p>
                    <p className="text-xs text-gray-500">
                      Renews {formatDate(svc.renewalDate)} &middot; Remind {svc.leadDays}d before
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {reminder && (
                      <p className="text-xs font-medium text-gray-700">
                        {formatDate(reminder.toISOString().split("T")[0])}
                      </p>
                    )}
                    {svc.renewalDate && (() => {
                      const d = daysUntil(svc.renewalDate);
                      return (
                        <p
                          className={cn(
                            "text-xs",
                            d < 0 ? "text-red-500" : d <= 30 ? "text-yellow-500" : "text-gray-400"
                          )}
                        >
                          {d < 0 ? "Overdue" : d === 0 ? "Today" : `${d} days`}
                        </p>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
