"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type HostingPlan = {
  id: string;
  name: string;
  introPrice: string;
  renewalPrice: string;
  termMonths: number;
};

const TERM_OPTIONS = [
  { value: 12, label: "1 year" },
  { value: 24, label: "2 years" },
  { value: 36, label: "3 years" },
  { value: 60, label: "5 years" },
];

function toNumber(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function HostingRenewalCalculator() {
  const [plans, setPlans] = useState<HostingPlan[]>([
    { id: crypto.randomUUID(), name: "", introPrice: "", renewalPrice: "", termMonths: 12 },
  ]);

  function addRow() {
    setPlans((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", introPrice: "", renewalPrice: "", termMonths: 12 },
    ]);
  }

  function removeRow(id: string) {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  }

  function update(id: string, field: Partial<HostingPlan>) {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...field } : p)));
  }

  const rows = plans.map((p) => {
    const intro = toNumber(p.introPrice);
    const renewal = toNumber(p.renewalPrice);
    const termYears = p.termMonths / 12;

    const year1Cost = intro;
    const year2Cost = termYears >= 2 ? renewal : 0;
    const year3Cost = termYears >= 3 ? renewal : 0;
    const total3Year = intro + year2Cost + year3Cost;

    const savings = renewal > 0 ? (renewal - intro) * termYears : 0;

    return { ...p, intro, renewal, termYears, year1Cost, year2Cost, year3Cost, total3Year, savings };
  });

  const hasData = rows.some((r) => r.name && (r.intro || r.renewal));

  return (
    <div>
      <div className="space-y-3">
        {plans.map((plan) => (
          <div key={plan.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Plan or provider name"
                value={plan.name}
                onChange={(e) => update(plan.id, { name: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  placeholder="Intro price"
                  value={plan.introPrice}
                  onChange={(e) => update(plan.id, { introPrice: e.target.value })}
                  className="w-full sm:w-24 text-sm border border-gray-200 rounded-lg pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="relative flex-1 sm:flex-none">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  placeholder="Renewal"
                  value={plan.renewalPrice}
                  onChange={(e) => update(plan.id, { renewalPrice: e.target.value })}
                  className="w-full sm:w-24 text-sm border border-gray-200 rounded-lg pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <select
                value={plan.termMonths}
                onChange={(e) => update(plan.id, { termMonths: parseInt(e.target.value) })}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {TERM_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              {plans.length > 1 && (
                <button
                  onClick={() => removeRow(plan.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove plan"
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
          <Plus size={16} /> Add hosting plan
        </button>
      </div>

      {hasData && (
        <>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Introductory Period</p>
              <p className="text-2xl font-bold text-gray-900">
                {rows.some((r) => r.intro) ? `${rows.filter((r) => r.intro).length} plan(s)` : "-"}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total 3-Year Cost</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(rows.reduce((sum, r) => sum + r.total3Year, 0))}
              </p>
            </div>
            <div className={cn("border rounded-xl p-5 text-center", "bg-white border-gray-200")}>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Potential Price Increase</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(rows.reduce((sum, r) => sum + r.savings, 0))}
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <th className="pb-3 pr-4">Plan</th>
                  <th className="pb-3 pr-4">Intro Price</th>
                  <th className="pb-3 pr-4">Renewal Price</th>
                  <th className="pb-3 pr-4">Term</th>
                  <th className="pb-3 pr-4">Year 1</th>
                  <th className="pb-3 pr-4">Year 2</th>
                  <th className="pb-3 pr-4">Year 3</th>
                  <th className="pb-3">3-Yr Total</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((r) => r.name)
                  .map((r) => (
                    <tr key={r.id} className="border-b border-gray-100 text-gray-700">
                      <td className="py-3 pr-4 font-medium text-gray-900">{r.name}</td>
                      <td className="py-3 pr-4">{r.intro ? formatCurrency(r.intro) : "-"}</td>
                      <td className="py-3 pr-4">{r.renewal ? formatCurrency(r.renewal) : "-"}</td>
                      <td className="py-3 pr-4">{r.termYears} yr</td>
                      <td className="py-3 pr-4">{r.intro ? formatCurrency(r.year1Cost) : "-"}</td>
                      <td className="py-3 pr-4">{r.year2Cost ? formatCurrency(r.year2Cost) : "-"}</td>
                      <td className="py-3 pr-4">{r.year3Cost ? formatCurrency(r.year3Cost) : "-"}</td>
                      <td className="py-3 font-medium">{formatCurrency(r.total3Year)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {rows.some((r) => r.renewal > r.intro) && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
              <p className="font-semibold mb-1">Price increase alert</p>
              <p>
                Some plans have renewal prices higher than their introductory prices.
                Plan for the increase when your term ends.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
