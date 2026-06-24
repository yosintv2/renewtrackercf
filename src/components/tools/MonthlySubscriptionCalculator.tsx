"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Sub = {
  id: string;
  name: string;
  amount: string;
};

function toNumber(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const BENCHMARKS = [
  { label: "Below average", max: 50, color: "text-green-600", bar: "bg-green-400" },
  { label: "Average", max: 150, color: "text-yellow-600", bar: "bg-yellow-400" },
  { label: "Above average", max: 300, color: "text-orange-600", bar: "bg-orange-400" },
  { label: "High spender", max: Infinity, color: "text-red-600", bar: "bg-red-400" },
];

export default function MonthlySubscriptionCalculator() {
  const [subs, setSubs] = useState<Sub[]>([
    { id: crypto.randomUUID(), name: "", amount: "" },
  ]);

  function addRow() {
    setSubs((prev) => [...prev, { id: crypto.randomUUID(), name: "", amount: "" }]);
  }

  function removeRow(id: string) {
    setSubs((prev) => prev.filter((s) => s.id !== id));
  }

  function update(id: string, field: Partial<Sub>) {
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, ...field } : s)));
  }

  const total = subs.reduce((sum, s) => sum + toNumber(s.amount), 0);
  const benchmark = BENCHMARKS.find((b) => total <= b.max) ?? BENCHMARKS[BENCHMARKS.length - 1];
  const maxBench = 300;
  const pct = Math.min((total / maxBench) * 100, 100);

  return (
    <div>
      <div className="space-y-3">
        {subs.map((sub) => (
          <div key={sub.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Subscription name"
                value={sub.name}
                onChange={(e) => update(sub.id, { name: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={sub.amount}
                onChange={(e) => update(sub.id, { amount: e.target.value })}
                className="w-28 text-sm border border-gray-200 rounded-lg pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            {subs.length > 1 && (
              <button
                onClick={() => removeRow(sub.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={addRow}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Plus size={16} /> Add subscription
        </button>
      </div>

      {subs.some((s) => s.name && s.amount) && (
        <>
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Monthly Spend</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(total)}</p>
            <p className={cn("text-sm font-medium mt-2", benchmark.color)}>{benchmark.label}</p>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className={cn("h-full rounded-full transition-all duration-300", benchmark.bar)} style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1.5">
              <span>$0</span>
              <span>$150</span>
              <span>$300+</span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {subs
              .filter((s) => s.name && s.amount)
              .map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-4 py-3">
                  <span className="text-sm font-medium text-gray-900">{s.name}</span>
                  <span className="text-sm text-gray-600">{formatCurrency(toNumber(s.amount))}/mo</span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
