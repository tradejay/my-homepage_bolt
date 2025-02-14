"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText } from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "Medical", href: "/policy/medical" },
  { title: "Pharmaceutical", href: "/policy/pharmaceutical" },
  { title: "Medical Devices", href: "/policy/medical-devices" },
  { title: "Cosmetics", href: "/policy/cosmetics" },
  { title: "Health Supplements", href: "/policy/health-supplements" },
  { title: "Digital Healthcare", href: "/policy/digital-healthcare" },
];

export default function PolicyTrendsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Policy Trends</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.href} href={category.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ScrollText className="h-5 w-5" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Policy updates and regulations in {category.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}