"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, BookOpen, Library } from "lucide-react";
import Link from "next/link";

const categories = [
  { 
    title: "News", 
    href: "/media-review/news",
    icon: Newspaper,
    description: "Latest news coverage and analysis"
  },
  { 
    title: "Magazine", 
    href: "/media-review/magazine",
    icon: BookOpen,
    description: "Featured magazine articles and reviews"
  },
  { 
    title: "Books", 
    href: "/media-review/books",
    icon: Library,
    description: "Book reviews and recommendations"
  }
];

export default function MediaReviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Media Review</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.href} href={category.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}