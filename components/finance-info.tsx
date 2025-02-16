"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

type MarketIndex = {
  name: string;
  value: number;
  change: number;
};

type ExchangeRate = {
  currency: string;
  rate: number;
  trend: "up" | "down";
};

type CityTime = {
  name: string;
  time: string;
};

const ROTATION_INTERVAL = 5000; // 5초마다 순환

const INFO_TITLES = [
  { title: "주요 지수현황", icon: LineChart },
  { title: "주요 도시 시간", icon: Clock },
  { title: "환율", icon: DollarSign }
];

export function FinanceInfo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 주요 지수 현황
  const [indices, setIndices] = useState<MarketIndex[]>([
    { name: "코스피", value: 2567.45, change: 0.45 },
    { name: "코스닥", value: 892.31, change: -0.28 },
    { name: "나스닥", value: 14972, change: 0.13 },
    { name: "S&P500", value: 4783, change: 0.15 },
    { name: "다우존스", value: 37562, change: -0.15 }
  ]);

  // 환율 정보
  const [rates, setRates] = useState<ExchangeRate[]>([
    { currency: "USD", rate: 1324.50, trend: "up" },
    { currency: "EUR", rate: 1445.32, trend: "down" },
    { currency: "JPY", rate: 932.45, trend: "up" },
    { currency: "CNY", rate: 184.67, trend: "down" },
    { currency: "GBP", rate: 1678.90, trend: "up" }
  ]);

  // 주요 도시 시간
  const [times, setTimes] = useState<CityTime[]>([
    { name: "뉴욕", time: "" },
    { name: "런던", time: "" },
    { name: "도쿄", time: "" },
    { name: "베이징", time: "" },
    { name: "서울", time: "" }
  ]);

  // 시간 업데이트
  useEffect(() => {
    const updateTimes = () => {
      const newTimes = times.map(city => ({
        name: city.name,
        time: new Date().toLocaleTimeString("ko-KR", {
          timeZone: getTimeZone(city.name),
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      }));
      setTimes(newTimes);
    };

    updateTimes();
    const timeInterval = setInterval(updateTimes, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // 지수와 환율 업데이트
  useEffect(() => {
    const dataInterval = setInterval(() => {
      setIndices(prev => prev.map(index => ({
        ...index,
        value: index.value + (Math.random() - 0.5) * (index.value * 0.001),
        change: (Math.random() - 0.5) * 0.5
      })));

      setRates(prev => prev.map(rate => ({
        ...rate,
        rate: rate.rate + (Math.random() - 0.5) * 2,
        trend: Math.random() > 0.5 ? "up" : "down"
      })));
    }, 3000);

    return () => clearInterval(dataInterval);
  }, []);

  // 순환 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % 3);
        setIsTransitioning(false);
      }, 300);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  function getTimeZone(city: string): string {
    const zones: Record<string, string> = {
      "뉴욕": "America/New_York",
      "런던": "Europe/London",
      "도쿄": "Asia/Tokyo",
      "베이징": "Asia/Shanghai",
      "서울": "Asia/Seoul"
    };
    return zones[city] || "Asia/Seoul";
  }

  return (
    <div className="relative h-[240px] sm:h-[400px] border-2 border-primary/50 rounded-lg p-4">
      {/* Title */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
        <div className="flex items-center gap-2 text-gray-500">
          {INFO_TITLES.map((info, index) => (
            <div
              key={info.title}
              className={cn(
                "flex items-center gap-1 transition-opacity duration-300 whitespace-nowrap overflow-hidden truncate",
                currentIndex === index ? "opacity-100" : "opacity-50"
              )}
            >
              {index > 0 && <span className="mx-2">/</span>}
              <info.icon className="h-4 w-4" />
              <span className="text-sm font-medium truncate">{info.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {/* 주요 지수 현황 */}
        <div
          className={cn(
            "absolute w-full transition-all duration-300 ease-in-out grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4",
            currentIndex === 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          {indices.map((index) => (
            <div key={index.name} className="text-center">
              <div className="text-xs text-gray-500 mb-1 truncate">{index.name}</div>
              <div className="text-sm font-bold text-gray-700 truncate">
                {index.value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })}
              </div>
              <div className={`text-xs ${index.change > 0 ? "text-green-500" : "text-red-500"} truncate`}>
                {index.change > 0 ? "▲" : "▼"}
              </div>
            </div>
          ))}
        </div>

        {/* 주요 도시 시간 */}
        <div
className={cn(
            "absolute w-full h-full transition-all duration-300 ease-in-out grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center overflow-y-auto",
            currentIndex === 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          {times.map((city) => (
<div key={city.name} className="text-center">
            <div className="text-[0.7rem] text-gray-500 mb-0.5 truncate leading-[0.75rem]">{city.name}</div>
            <div className="text-sm font-bold text-gray-700 truncate leading-[0.75rem]">{city.time}</div>
            </div>
          ))}
        </div>

        {/* 환율 정보 */}
        <div
          className={cn(
            "absolute w-full transition-all duration-300 ease-in-out grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4",
            currentIndex === 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          {rates.map((rate) => (
            <div key={rate.currency} className="text-center">
              <div className="text-xs text-gray-500 mb-1 truncate">{rate.currency}</div>
              <div className="text-sm font-bold text-gray-700">
                {rate.rate.toFixed(2)}
              </div>
              <div className={`text-xs ${rate.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {rate.trend === "up" ? "▲" : "▼"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center gap-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index
                ? "bg-primary w-4"
                : "bg-gray-200 hover:bg-gray-300"
            )}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 300);
            }}
          />
        ))}
      </div>
    </div>
  );
}
