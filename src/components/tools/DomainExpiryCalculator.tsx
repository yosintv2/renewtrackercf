"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type Domain = {
  id: string;
  name: string;
  regDate: string;
  term: number;
};

const TERMS = [
  { value: 1, label: "1 year" },
  { value: 2, label: "2 years" },
  { value: 5, label: "5 years" },
  { value: 10, label: "10 years" },
];

function calcExpiry(regDate: string, term: number): Date | null {
  if (!regDate) return null;
  const d = new Date(regDate);
  if (isNaN(d.getTime())) return null;
  d.setFullYear(d.getFullYear() + term);
  return d;
}

function daysBetween(from: Date, to: Date): number {
  const f = new Date(from);
  const t = new Date(to);
  f.setHours(0, 0, 0, 0);
  t.setHours(0, 0, 0, 0);
  return Math.round((t.getTime() - f.getTime()) / 86400000);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DomainExpiryCalculator() {
  const [domains, setDomains] = useState<Domain[]>([
    { id: crypto.randomUUID(), name: "", regDate: "", term: 1 },
  ]);

  function addRow() {
    setDomains((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", regDate: "", term: 1 },
    ]);
  }

  function removeRow(id: string) {
    setDomains((prev) => prev.filter((d) => d.id !== id));
  }

  function update(id: string, field: Partial<Domain>) {
    setDomains((prev) => prev.map((d) => (d.id === id ? { ...d, ...field } : d)));
  }

  const today = new Date();

  return (
    <div>
      <div className="space-y-3">
        {domains.map((domain) => {
          const expiry = calcExpiry(domain.regDate, domain.term);
          const daysLeft = expiry ? daysBetween(today, expiry) : null;

          return (
            <div key={domain.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="e.g. example.com"
                    value={domain.name}
                    onChange={(e) => update(domain.id, { name: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="date"
                    value={domain.regDate}
                    onChange={(e) => update(domain.id, { regDate: e.target.value })}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={domain.term}
                    onChange={(e) => update(domain.id, { term: parseInt(e.target.value) })}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {TERMS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {domains.length > 1 && (
                    <button
                      onClick={() => removeRow(domain.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove domain"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {domain.name && expiry && (
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    Expires: <span className="font-medium text-gray-900">{formatDate(expiry)}</span>
                  </div>
                  {daysLeft !== null && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
                        daysLeft < 0
                          ? "bg-red-100 text-red-700"
                          : daysLeft <= 30
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      )}
                    >
                      {daysLeft < 0
                        ? `Expired ${Math.abs(daysLeft)} days ago`
                        : daysLeft === 0
                          ? "Expires today"
                          : `${daysLeft} days remaining`}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    Auto-renewal recommended
                  </span>
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
          <Plus size={16} /> Add another domain
        </button>
      </div>
    </div>
  );
}
