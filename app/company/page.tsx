"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "Medical", href: "/company/medical" },
  { title: "Pharmaceutical", href: "/company/pharmaceutical" },
  { title: "Medical Devices", href: "/company/medical-devices" },
  { title: "Cosmetics", href: "/company/cosmetics" },
  { title: "Health Supplements", href: "/company/health-supplements" },
  { title: "Digital Healthcare", href: "/company/digital-healthcare" },
];

export default function CompanyTrendsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Company Trends</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.href} href={category.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Company analysis and updates in {category.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}