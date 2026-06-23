import { Banknote, ClipboardList, CreditCard, Tv, Receipt, Search, Dumbbell, Monitor, BarChart3, FileText, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  banknote: Banknote,
  clipboard: ClipboardList,
  creditcard: CreditCard,
  tv: Tv,
  receipt: Receipt,
  search: Search,
  dumbbell: Dumbbell,
  monitor: Monitor,
  chart: BarChart3,
};

const COLOR_MAP: Record<string, string> = {
  banknote: "bg-green-100 text-green-600",
  clipboard: "bg-blue-100 text-blue-600",
  creditcard: "bg-red-100 text-red-600",
  tv: "bg-purple-100 text-purple-600",
  receipt: "bg-gray-100 text-gray-600",
  search: "bg-amber-100 text-amber-600",
  dumbbell: "bg-orange-100 text-orange-600",
  monitor: "bg-indigo-100 text-indigo-600",
  chart: "bg-cyan-100 text-cyan-600",
};

export function getCoverColors(iconName: string): string {
  return COLOR_MAP[iconName] ?? "bg-blue-100 text-blue-600";
}

export default function BlogCoverIcon({ icon, size = "md" }: { icon: string; size?: "sm" | "md" | "lg" }) {
  const Icon = ICON_MAP[icon] ?? FileText;
  const colorClass = COLOR_MAP[icon] ?? "bg-blue-100 text-blue-600";
  const dims = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const iconDims = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5";
  return (
    <div className={`${dims} rounded-xl ${colorClass} flex items-center justify-center`}>
      <Icon className={iconDims} />
    </div>
  );
}
