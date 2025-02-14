"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

type ExchangeRate = {
  currency: string;
  rate: number;
  trend: "up" | "down";
};

export function ExchangeRates() {
  const [rates, setRates] = useState<ExchangeRate[]>([
    { currency: "USD", rate: 1324.50, trend: "up" },
    { currency: "EUR", rate: 1445.32, trend: "down" },
    { currency: "JPY", rate: 932.45, trend: "up" },
    { currency: "CNY", rate: 184.67, trend: "down" },
    { currency: "GBP", rate: 1678.90, trend: "up" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev => prev.map(rate => ({
        ...rate,
        rate: rate.rate + (Math.random() - 0.5) * 5,
        trend: Math.random() > 0.5 ? "up" : "down"
      })));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-[300px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          실시간 환율 정보
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {rates.map((rate) => (
            <div key={rate.currency} className="flex justify-between items-center">
              <span className="text-lg font-medium">{rate.currency}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{rate.rate.toFixed(2)}</span>
                <span className={`text-lg ${rate.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {rate.trend === "up" ? "▲" : "▼"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}