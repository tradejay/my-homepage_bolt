"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const cities = [
  { name: "뉴욕", timezone: "America/New_York" },
  { name: "런던", timezone: "Europe/London" },
  { name: "도쿄", timezone: "Asia/Tokyo" },
  { name: "베이징", timezone: "Asia/Shanghai" }
];

export function WorldTime() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      cities.forEach(({ name, timezone }) => {
        const time = new Date().toLocaleTimeString("ko-KR", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
        newTimes[name] = time;
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-[300px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          세계 주요 도시 시간
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {cities.map(({ name }) => (
            <div key={name} className="flex justify-between items-center">
              <span className="text-lg font-medium">{name}</span>
              <span className="text-lg text-muted-foreground">{times[name] || "--:--"}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
