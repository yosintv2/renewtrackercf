"use client";

import { useState } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type Sub = {
  id: string;
  name: string;
  monthlyCost: string;
  annualCost: string;
  cycle: "monthly" | "yearly";
};

function toNumber(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function YearlySubscriptionCalculator() {
  const [subs, setSubs] = useState<Sub[]>([
    { id: crypto.randomUUID(), name: "", monthlyCost: "", annualCost: "", cycle: "monthly" },
  ]);

  function addRow() {
    setSubs((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", monthlyCost: "", annualCost: "", cycle: "monthly" },
    ]);
  }

  function removeRow(id: string) {
    setSubs((prev) => prev.filter((s) => s.id !== id));
  }

  function update(id: string, field: Partial<Sub>) {
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, ...field } : s)));
  }

  const rows = subs.map((s) => {
    const mc = toNumber(s.monthlyCost);
    const ac = toNumber(s.annualCost);
    const monthlyTotal = s.cycle === "monthly" ? mc * 12 : ac;
    const annualTotal = s.cycle === "yearly" ? ac : mc * 12;
    const savings = monthlyTotal - annualTotal;
    return { ...s, monthlyTotal, annualTotal, savings };
  });

  const totalMonthlyBilling = rows.reduce((sum, r) => sum + r.monthlyTotal, 0);
  const totalAnnualBilling = rows.reduce((sum, r) => sum + r.annualTotal, 0);
  const totalSavings = totalMonthlyBilling - totalAnnualBilling;

  function exportCSV() {
    const headers = "Name,Monthly Cost,Annual Cost,Cycle,Monthly Billing Total,Annual Billing Total,Potential Savings\n";
    const csv = rows
      .map(
        (r) =>
          `${r.name},${r.monthlyCost},${r.annualCost},${r.cycle},${r.monthlyTotal.toFixed(2)},${r.annualTotal.toFixed(2)},${r.savings.toFixed(2)}`
      )
      .join("\n");
    const blob = new Blob([headers + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yearly-subscription-projection.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="space-y-3">
        {subs.map((sub) => (
          <div key={sub.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Service name"
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
                  placeholder="Monthly"
                  value={sub.monthlyCost}
                  onChange={(e) => update(sub.id, { monthlyCost: e.target.value })}
                  className="w-full sm:w-24 text-sm border border-gray-200 rounded-lg pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <span className="text-xs text-gray-400">/mo</span>
              <div className="relative flex-1 sm:flex-none">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  placeholder="Yearly"
                  value={sub.annualCost}
                  onChange={(e) => update(sub.id, { annualCost: e.target.value })}
                  className="w-full sm:w-24 text-sm border border-gray-200 rounded-lg pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <span className="text-xs text-gray-400">/yr</span>
              <select
                value={sub.cycle}
                onChange={(e) => update(sub.id, { cycle: e.target.value as "monthly" | "yearly" })}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Annual</option>
              </select>
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
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={addRow}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Plus size={16} /> Add service
        </button>
      </div>

      {rows.some((r) => r.name && (r.monthlyCost || r.annualCost)) && (
        <>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">If Billed Monthly</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalMonthlyBilling)}</p>
              <p className="text-xs text-gray-400 mt-1">per year</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">If Billed Annually</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAnnualBilling)}</p>
              <p className="text-xs text-gray-400 mt-1">per year</p>
            </div>
            <div className={cn("border rounded-xl p-5 text-center", totalSavings > 0 ? "bg-green-50 border-green-200" : "bg-white border-gray-200")}>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Potential Savings</p>
              <p className={cn("text-2xl font-bold", totalSavings > 0 ? "text-green-700" : "text-gray-900")}>
                {totalSavings > 0 ? formatCurrency(totalSavings) : "$0"}
              </p>
              <p className="text-xs text-gray-400 mt-1">per year</p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Billing Cycle</th>
                  <th className="pb-3 pr-4">Monthly Total</th>
                  <th className="pb-3 pr-4">Annual Total</th>
                  <th className="pb-3">Savings</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((r) => r.name)
                  .map((r) => (
                    <tr key={r.id} className="border-b border-gray-100 text-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-900">{r.name}</td>
                      <td className="py-3 pr-4 capitalize">{r.cycle}</td>
                      <td className="py-3 pr-4">{formatCurrency(r.monthlyTotal)}</td>
                      <td className="py-3 pr-4">{formatCurrency(r.annualTotal)}</td>
                      <td className={cn("py-3", r.savings > 0 ? "text-green-600 font-medium" : "text-gray-400")}>
                        {r.savings > 0 ? formatCurrency(r.savings) : "-"}
                      </td>
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
