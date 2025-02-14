"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "Medical", href: "/industry/medical" },
  { title: "Pharmaceutical", href: "/industry/pharmaceutical" },
  { title: "Medical Devices", href: "/industry/medical-devices" },
  { title: "Cosmetics", href: "/industry/cosmetics" },
  { title: "Health Supplements", href: "/industry/health-supplements" },
  { title: "Digital Healthcare", href: "/industry/digital-healthcare" },
];

export default function IndustryTrendsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Industry Trends</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.href} href={category.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Latest trends and developments in {category.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}