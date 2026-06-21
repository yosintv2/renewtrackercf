"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const CURRENCIES = [
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi Taka" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
  { code: "DKK", symbol: "kr", label: "Danish Krone" },
  { code: "EGP", symbol: "E£", label: "Egyptian Pound" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "HKD", symbol: "HK$", label: "Hong Kong Dollar" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "IDR", symbol: "Rp", label: "Indonesian Rupiah" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "MYR", symbol: "RM", label: "Malaysian Ringgit" },
  { code: "MXN", symbol: "MX$", label: "Mexican Peso" },
  { code: "NPR", symbol: "Rs.", label: "Nepalese Rupee" },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira" },
  { code: "NOK", symbol: "kr", label: "Norwegian Krone" },
  { code: "PKR", symbol: "₨", label: "Pakistani Rupee" },
  { code: "PHP", symbol: "₱", label: "Philippine Peso" },
  { code: "PLN", symbol: "zł", label: "Polish Zloty" },
  { code: "SAR", symbol: "SR", label: "Saudi Riyal" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar" },
  { code: "ZAR", symbol: "R", label: "South African Rand" },
  { code: "KRW", symbol: "₩", label: "South Korean Won" },
  { code: "LKR", symbol: "Rs", label: "Sri Lankan Rupee" },
  { code: "SEK", symbol: "kr", label: "Swedish Krona" },
  { code: "CHF", symbol: "Fr", label: "Swiss Franc" },
  { code: "TWD", symbol: "NT$", label: "Taiwan Dollar" },
  { code: "THB", symbol: "฿", label: "Thai Baht" },
  { code: "TRY", symbol: "₺", label: "Turkish Lira" },
  { code: "AED", symbol: "AED", label: "UAE Dirham" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "VND", symbol: "₫", label: "Vietnamese Dong" },
];

type CurrencyContextType = {
  code: string;
  symbol: string;
  setCurrency: (code: string) => void;
  fmt: (amount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType>({
  code: "USD",
  symbol: "$",
  setCurrency: () => {},
  fmt: (n) => `$${n.toLocaleString()}`,
});

const STORAGE_KEY = "renewtracker-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState("USD");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && CURRENCIES.find((c) => c.code === stored)) {
      setCode(stored);
    }
  }, []);

  function setCurrency(newCode: string) {
    setCode(newCode);
    localStorage.setItem(STORAGE_KEY, newCode);
  }

  const info = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];

  function fmt(amount: number): string {
    return `${info.symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

  return (
    <CurrencyContext.Provider value={{ code, symbol: info.symbol, setCurrency, fmt }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
