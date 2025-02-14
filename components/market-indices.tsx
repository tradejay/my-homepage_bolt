"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

type MarketIndex = {
  name: string;
  value: number;
  change: number;
};

export function MarketIndices() {
  const [indices, setIndices] = useState<MarketIndex[]>([
    { name: "KOSPI", value: 2580.32, change: 0.45 },
    { name: "NASDAQ", value: 15982.11, change: -0.28 },
    { name: "S&P 500", value: 4940.45, change: 0.13 },
    { name: "DOW", value: 38390.56, change: -0.15 },
    { name: "NIKKEI", value: 36230.40, change: 0.91 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => prev.map(index => ({
        ...index,
        value: index.value + (Math.random() - 0.5) * 10,
        change: (Math.random() - 0.5) * 2
      })));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-[300px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5" />
          주요 지수 현황
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {indices.map((index) => (
            <div key={index.name} className="flex justify-between items-center">
              <span className="text-lg font-medium">{index.name}</span>
              <div className="text-right">
                <div className="text-lg">{index.value.toFixed(2)}</div>
                <div className={`text-sm ${index.change > 0 ? "text-green-500" : "text-red-500"}`}>
                  {index.change > 0 ? "▲" : "▼"} {Math.abs(index.change).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}