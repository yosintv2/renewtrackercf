import { cn } from "@/lib/utils";

type IconEntry = {
  color: string;
  bg: string;
  path: string;
  viewBox?: string;
};

const ICONS: Record<string, IconEntry> = {
  netflix: {
    color: "#E50914",
    bg: "#E50914",
    path: "<rect x='7' y='2' width='4' height='20' rx='1'/><rect x='13' y='2' width='4' height='20' rx='1'/><path d='M3 6v14a2 2 0 0 0 2 2h4V6H3Z'/><path d='M15 6v14a2 2 0 0 0 2 2h4V6h-6Z'/>",
  },
  spotify: {
    color: "#1DB954",
    bg: "#1DB954",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M8 11.5c2-.8 6-.8 8 0M9 14c1.5-.6 4.5-.6 6 0M10.5 16.5c1-.4 2-.4 3 0' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round'/>",
  },
  "disney+": {
    color: "#113CCF",
    bg: "#113CCF",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M8 9h3l1 6 1-6h3' stroke='currentColor' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
  },
  "hbo max": {
    color: "#5822B4",
    bg: "#5822B4",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 9v6M10 9v3a2 2 0 0 0 4 0V9M17 9l-2 6' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round'/>",
  },
  hulu: {
    color: "#1CE783",
    bg: "#1CE783",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M6 15V9l3 3 3-3v6' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
  },
  "apple tv+": {
    color: "#555",
    bg: "#555",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><rect x='7' y='7' width='10' height='10' rx='2' fill='none' stroke='currentColor' stroke-width='1.5'/><path d='M12 8.5v7M8.5 12h7' stroke='currentColor' stroke-width='1.2' stroke-linecap='round'/>",
  },
  "amazon prime": {
    color: "#FF9900",
    bg: "#FF9900",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 15c.5-.5 1.5-.8 3 0s2.5.5 3 0c.5-.5 1.5-.8 3 0' stroke='currentColor' stroke-width='1.3' fill='none' stroke-linecap='round'/><path d='M9 10v4M15 10v4M12 8v6' stroke='currentColor' stroke-width='1.5' fill='none'/>",
  },
  "amazon prime video": {
    color: "#FF9900",
    bg: "#FF9900",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 15c.5-.5 1.5-.8 3 0s2.5.5 3 0c.5-.5 1.5-.8 3 0' stroke='currentColor' stroke-width='1.3' fill='none' stroke-linecap='round'/><path d='M9 10v4M15 10v4M12 8v6' stroke='currentColor' stroke-width='1.5' fill='none'/>",
  },
  youtube: {
    color: "#FF0000",
    bg: "#FF0000",
    path: "<rect x='3' y='6' width='18' height='12' rx='3' fill='none' stroke='currentColor' stroke-width='1.6'/><polygon points='10,9 15,12 10,15' fill='currentColor'/>",
  },
  "youtube music": {
    color: "#FF0000",
    bg: "#FF0000",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><circle cx='12' cy='12' r='3' fill='none' stroke='currentColor' stroke-width='1.5'/><path d='M12 5v2M12 17v2M5 12h2M17 12h2' stroke='currentColor' stroke-width='1.3' stroke-linecap='round'/>",
  },
  "chatgpt plus": {
    color: "#10A37F",
    bg: "#10A37F",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M15.5 10c.8.5 1.5 1.3 1.5 2.5 0 2-2 3-4 3s-4-1-4-3c0-1.2.7-2 1.5-2.5' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round'/><circle cx='10' cy='9.5' r='.8' fill='currentColor'/><circle cx='14' cy='9.5' r='.8' fill='currentColor'/>",
  },
  "claude pro": {
    color: "#D97706",
    bg: "#D97706",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 15V9l5 6V9' stroke='currentColor' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
  },
  "github copilot": {
    color: "#6e40c9",
    bg: "#6e40c9",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M8 16c0 2 2 3 4 3s4-1 4-3' stroke='currentColor' stroke-width='1.5' fill='none'/><path d='M9 10.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5S7.5 8.2 7.5 9 8.2 10.5 9 10.5zM15 10.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5z' fill='currentColor'/>",
  },
  github: {
    color: "#24292e",
    bg: "#24292e",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M16 19v-3a2.5 2.5 0 0 0-.7-2c2-.3 4-1.2 4-3.5a3 3 0 0 0-.8-2 3 3 0 0 0 0-2s-.7-.2-2.2.8A7.5 7.5 0 0 0 12 7a7.5 7.5 0 0 0-2.3.3C8.2 6.3 7.5 6.5 7.5 6.5a3 3 0 0 0 0 2 3 3 0 0 0-.8 2c0 2.3 2 3.2 4 3.5a2.5 2.5 0 0 0-.7 2v3' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round'/>",
  },
  notion: {
    color: "#000",
    bg: "#000",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 8.5V16c0 .5.5 1 1 1h8c.5 0 1-.5 1-1V8.5M10 8v8M14 8v8M7 11h10' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round'/>",
  },
  figma: {
    color: "#F24E1E",
    bg: "#F24E1E",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M9 7h3a2 2 0 0 1 0 4H9V7z' fill='none' stroke='currentColor' stroke-width='1.3'/><path d='M9 11h3a2 2 0 0 1 0 4H9v-4z' fill='none' stroke='currentColor' stroke-width='1.3'/><path d='M9 15h3a2 2 0 0 1 0 4 2 2 0 0 1-3-1.7V15z' fill='none' stroke='currentColor' stroke-width='1.3'/>",
  },
  discord: {
    color: "#5865F2",
    bg: "#5865F2",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M8 9.5c0-.8.7-1.5 1.5-1.5h5c.8 0 1.5.7 1.5 1.5V17l-1.5-1-1 1-1-1-1 1-1-1-1.5 1V9.5z' fill='none' stroke='currentColor' stroke-width='1.3'/><circle cx='10' cy='11' r='.7' fill='currentColor'/><circle cx='14' cy='11' r='.7' fill='currentColor'/>",
  },
  slack: {
    color: "#4A154B",
    bg: "#4A154B",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M9 7v3H6M18 12h-3V9M15 17v-3h3M6 12h3v3' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round'/>",
  },
  zoom: {
    color: "#2D8CFF",
    bg: "#2D8CFF",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><polygon points='7,9 13,12 7,15' fill='currentColor'/><rect x='12' y='9' width='5' height='6' rx='1' fill='none' stroke='currentColor' stroke-width='1.3'/>",
  },
  "microsoft 365": {
    color: "#D83B01",
    bg: "#D83B01",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><rect x='7' y='7' width='4' height='4' rx='.8' fill='currentColor'/><rect x='13' y='7' width='4' height='4' rx='.8' fill='currentColor'/><rect x='7' y='13' width='4' height='4' rx='.8' fill='currentColor'/><rect x='13' y='13' width='4' height='4' rx='.8' fill='currentColor'/>",
  },
  "google workspace": {
    color: "#4285F4",
    bg: "#4285F4",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M8 16V8l4 5 4-5v8' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
  },
  adobe: {
    color: "#FF0000",
    bg: "#FF0000",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M9 7l-2 10h3l1-5 1 5h3l-2-10H9z' stroke='currentColor' stroke-width='1.3' fill='none' stroke-linejoin='round'/>",
  },
  "adobe creative cloud": {
    color: "#FF0000",
    bg: "#FF0000",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M9 7l-2 10h3l1-5 1 5h3l-2-10H9z' stroke='currentColor' stroke-width='1.3' fill='none' stroke-linejoin='round'/>",
  },
  dropbox: {
    color: "#0061FF",
    bg: "#0061FF",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M6 9l4-3 4 3-4 3-4-3zM14 6l4 3-4 3-4-3 4-3zM10 12l4 3-4 3-4-3 4-3z' stroke='currentColor' stroke-width='1.3' fill='none' stroke-linejoin='round'/>",
  },
  icloud: {
    color: "#369",
    bg: "#369",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 14.5a2.5 2.5 0 0 1 .5-4.9 4 4 0 0 1 7.5-1 2.5 2.5 0 0 1 .5 4.9' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round'/>",
  },
  "icloud+": {
    color: "#369",
    bg: "#369",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 14.5a2.5 2.5 0 0 1 .5-4.9 4 4 0 0 1 7.5-1 2.5 2.5 0 0 1 .5 4.9' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round'/>",
  },
  canva: {
    color: "#00C4CC",
    bg: "#00C4CC",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M9 7c0 2 1 4 3 4s3-2 3-4M8 10c0 3 1.5 5 4 5s4-2 4-5' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round'/>",
  },
  duolingo: {
    color: "#58CC02",
    bg: "#58CC02",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><circle cx='9' cy='13' r='1.5' fill='currentColor'/><circle cx='15' cy='13' r='1.5' fill='currentColor'/><path d='M9 16c1 1 2 1.5 3 1.5s2-.5 3-1.5' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round'/>",
  },
  crunchyroll: {
    color: "#F47521",
    bg: "#F47521",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M16 10c-.5-2-2-3.5-4-3.5S8 8 8 10s1 3 3 4c2 1 3 1 3 0s-1-2 0-3c1-1 2-1 2-1z' stroke='currentColor' stroke-width='1.3' fill='none'/>",
  },
  "xbox game pass": {
    color: "#107C10",
    bg: "#107C10",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M9 8l-3 4 3 4M15 8l3 4-3 4M8 12h8' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
  },
  playstation: {
    color: "#0070D1",
    bg: "#0070D1",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M8 9c1-1 3-1.5 4-1v8c-1 .5-3 0-4-1v-3M16 9c-1-1-3-1.5-4-1v8c1 .5 3 0 4-1v-3' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round'/>",
  },
  "playstation plus": {
    color: "#0070D1",
    bg: "#0070D1",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M8 9c1-1 3-1.5 4-1v8c-1 .5-3 0-4-1v-3M16 9c-1-1-3-1.5-4-1v8c1 .5 3 0 4-1v-3' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linecap='round'/>",
  },
  nintendo: {
    color: "#E60012",
    bg: "#E60012",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><rect x='7' y='8' width='4' height='8' rx='1.5' fill='none' stroke='currentColor' stroke-width='1.3'/><rect x='13' y='8' width='4' height='8' rx='1.5' fill='none' stroke='currentColor' stroke-width='1.3'/>",
  },
  "nintendo switch online": {
    color: "#E60012",
    bg: "#E60012",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><rect x='7' y='8' width='4' height='8' rx='1.5' fill='none' stroke='currentColor' stroke-width='1.3'/><rect x='13' y='8' width='4' height='8' rx='1.5' fill='none' stroke='currentColor' stroke-width='1.3'/>",
  },
  nordvpn: {
    color: "#4687FF",
    bg: "#4687FF",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M16 10c0 3-4 7-4 7s-4-4-4-7a4 4 0 0 1 8 0z' stroke='currentColor' stroke-width='1.4' fill='none'/><circle cx='12' cy='10' r='1.2' fill='currentColor'/>",
  },
  "1password": {
    color: "#1351B4",
    bg: "#1351B4",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><rect x='9' y='7' width='6' height='10' rx='1' fill='none' stroke='currentColor' stroke-width='1.3'/><path d='M9 7v5l3 1.5 3-1.5V7' stroke='currentColor' stroke-width='1.3' fill='none'/>",
  },
  twitter: {
    color: "#1DA1F2",
    bg: "#1DA1F2",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 17c3-2 5-4 5-8 0 4 2 6 5 8M7 8c3 2 5 4 5 8 0-4 2-6 5-8' stroke='currentColor' stroke-width='1.3' fill='none' stroke-linecap='round'/>",
  },
  strava: {
    color: "#FC4C02",
    bg: "#FC4C02",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M10 15l2-4 2 4M9 12l3-5 3 5' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
  },
  peloton: {
    color: "#000",
    bg: "#000",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><circle cx='12' cy='10' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/><path d='M10 14c0-1 1-1.5 2-1.5s2 .5 2 1.5v3h-4v-3z' fill='none' stroke='currentColor' stroke-width='1.3'/>",
  },
  headspace: {
    color: "#F47D31",
    bg: "#F47D31",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M16 9.5c-1-.5-2.5-.5-4 0s-3 .5-4 0M16 12.5c-1-.5-2.5-.5-4 0s-3 .5-4 0' stroke='currentColor' stroke-width='1.3' fill='none' stroke-linecap='round'/>",
  },
  calm: {
    color: "#5A9E6F",
    bg: "#5A9E6F",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M10 9c0 2 1 4 2 6 1-2 2-4 2-6' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round'/>",
  },
  rent: {
    color: "#64748b",
    bg: "#64748b",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M7 10l5-3 5 3v7H7v-7z' stroke='currentColor' stroke-width='1.4' fill='none' stroke-linejoin='round'/><path d='M10 12h4v5h-4v-5z' fill='none' stroke='currentColor' stroke-width='1.3'/>",
  },
  electricity: {
    color: "#EAB308",
    bg: "#EAB308",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M13 7l-3 6h3l-1 5 4-7h-3z' fill='none' stroke='currentColor' stroke-width='1.4' stroke-linejoin='round'/>",
  },
  internet: {
    color: "#3B82F6",
    bg: "#3B82F6",
    path: "<circle cx='12' cy='12' r='9' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M8 10c1.5-1 4.5-1 6 0M9 13c1-.5 3-.5 4 0M10 16c.5-.3 1.5-.3 2 0' stroke='currentColor' stroke-width='1.3' fill='none' stroke-linecap='round'/>",
  },
};

const FALLBACK_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-rose-500",
  "bg-orange-500", "bg-cyan-500", "bg-pink-500", "bg-indigo-500",
  "bg-teal-500", "bg-amber-500", "bg-lime-500", "bg-violet-500",
];

function getFallbackColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

export function ServiceIcon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const key = name.toLowerCase().trim();
  const icon = ICONS[key];

  if (icon) {
    return (
      <span
        className={cn("inline-flex items-center justify-center rounded-lg flex-shrink-0", className)}
        style={{ width: size, height: size, backgroundColor: icon.bg, color: "white" }}
        dangerouslySetInnerHTML={{
          __html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${icon.path}</svg>`,
        }}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-white text-xs font-bold flex-shrink-0",
        getFallbackColor(name),
        className,
      )}
      style={{ width: size, height: size }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
