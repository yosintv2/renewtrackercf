"use client";

import { useState } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type Subscription = {
  id: string;
  name: string;
  amount: string;
  cycle: "monthly" | "yearly";
};

function toNumber(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function SubscriptionCalculator() {
  const [subs, setSubs] = useState<Subscription[]>([
    { id: crypto.randomUUID(), name: "", amount: "", cycle: "monthly" },
  ]);

  function addRow() {
    setSubs((prev) => [...prev, { id: crypto.randomUUID(), name: "", amount: "", cycle: "monthly" }]);
  }

  function removeRow(id: string) {
    setSubs((prev) => prev.filter((s) => s.id !== id));
  }

  function update(id: string, field: Partial<Subscription>) {
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, ...field } : s)));
  }

  const rows = subs.map((s) => ({
    ...s,
    monthly: s.cycle === "monthly" ? toNumber(s.amount) : toNumber(s.amount) / 12,
    yearly: s.cycle === "yearly" ? toNumber(s.amount) : toNumber(s.amount) * 12,
  }));

  const totalMonthly = rows.reduce((sum, r) => sum + r.monthly, 0);
  const totalYearly = rows.reduce((sum, r) => sum + r.yearly, 0);

  function exportCSV() {
    const headers = "Name,Amount,Billing Cycle,Monthly Cost,Yearly Cost\n";
    const csv = rows
      .map((r) => `${r.name},${r.amount},${r.cycle},${r.monthly.toFixed(2)},${r.yearly.toFixed(2)}`)
      .join("\n");
    const blob = new Blob([headers + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscriptions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="space-y-3">
        {subs.map((sub, i) => (
          <div key={sub.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Subscription name"
                value={sub.name}
                onChange={(e) => update(sub.id, { name: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={sub.amount}
                  onChange={(e) => update(sub.id, { amount: e.target.value })}
                  className="w-full sm:w-28 text-sm border border-gray-200 rounded-lg pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <select
                value={sub.cycle}
                onChange={(e) => update(sub.id, { cycle: e.target.value as "monthly" | "yearly" })}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="monthly">/mo</option>
                <option value="yearly">/yr</option>
              </select>
              {subs.length > 1 && (
                <button
                  onClick={() => removeRow(sub.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove subscription"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={addRow}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Plus size={16} /> Add another subscription
        </button>
      </div>

      {rows.some((r) => r.name && r.amount) && (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Monthly</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalMonthly)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Yearly</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalYearly)}</p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Cycle</th>
                  <th className="pb-3 pr-4">Monthly</th>
                  <th className="pb-3">Yearly</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((r) => r.name)
                  .map((r) => (
                    <tr key={r.id} className="border-b border-gray-100 text-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-900">{r.name}</td>
                      <td className="py-3 pr-4">{formatCurrency(toNumber(r.amount))}</td>
                      <td className="py-3 pr-4 capitalize">{r.cycle}</td>
                      <td className="py-3 pr-4">{formatCurrency(r.monthly)}</td>
                      <td className="py-3">{formatCurrency(r.yearly)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 border border-gray-200 rounded-xl px-4 py-2 hover:border-blue-200 transition-colors"
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}
