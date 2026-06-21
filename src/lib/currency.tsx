"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
  { code: "CHF", symbol: "Fr", label: "Swiss Franc" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "NPR", symbol: "Rs.", label: "Nepalese Rupee" },
  { code: "PKR", symbol: "₨", label: "Pakistani Rupee" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi Taka" },
  { code: "LKR", symbol: "Rs", label: "Sri Lankan Rupee" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar" },
  { code: "MYR", symbol: "RM", label: "Malaysian Ringgit" },
  { code: "IDR", symbol: "Rp", label: "Indonesian Rupiah" },
  { code: "PHP", symbol: "₱", label: "Philippine Peso" },
  { code: "THB", symbol: "฿", label: "Thai Baht" },
  { code: "VND", symbol: "₫", label: "Vietnamese Dong" },
  { code: "AED", symbol: "AED", label: "UAE Dirham" },
  { code: "SAR", symbol: "SR", label: "Saudi Riyal" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "KRW", symbol: "₩", label: "South Korean Won" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
  { code: "HKD", symbol: "HK$", label: "Hong Kong Dollar" },
  { code: "TWD", symbol: "NT$", label: "Taiwan Dollar" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real" },
  { code: "MXN", symbol: "MX$", label: "Mexican Peso" },
  { code: "ZAR", symbol: "R", label: "South African Rand" },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira" },
  { code: "EGP", symbol: "E£", label: "Egyptian Pound" },
  { code: "TRY", symbol: "₺", label: "Turkish Lira" },
  { code: "SEK", symbol: "kr", label: "Swedish Krona" },
  { code: "NOK", symbol: "kr", label: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", label: "Danish Krone" },
  { code: "PLN", symbol: "zł", label: "Polish Zloty" },
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

const STORAGE_KEY = "subtrack-currency";

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
