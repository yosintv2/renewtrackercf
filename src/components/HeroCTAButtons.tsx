"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

export default function HeroCTAButtons() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    setLoading(true);
    router.push("/register");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 sm:mb-14">
      <button
        onClick={handleStart}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-90 text-white text-base font-semibold px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 min-w-[160px]"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            Start for free
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      <a
        href="/#features"
        className="inline-flex items-center justify-center gap-2 text-base font-semibold text-gray-700 border border-gray-200 px-6 sm:px-8 py-3.5 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
      >
        See how it works
      </a>
    </div>
  );
}
