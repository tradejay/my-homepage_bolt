"use client";

import { useEffect, useState } from "react";

interface Article {
  id: any;
  title: any;
  description: any;
  link: any;
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, BookOpen, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export function Sidebar() {
  const [slideArticles, setSlideArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchSlideArticles = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, description, link")
        .eq("is_slide", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching slide articles:", error.message);
      } else {
        setSlideArticles(data || []);
      }
    };

    fetchSlideArticles();
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* 슬라이드 아티클 */}
      <Card className="bg-white border-0 relative before:absolute before:inset-0 before:border-2 before:border-dashed before:border-gray-200 before:rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Featured Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {slideArticles.length > 0 ? (
            <ul className="space-y-4">
              {slideArticles.map((article) => (
                <li key={article.id} className="text-sm">
                  <Link href={article.link || "#"} className="hover:underline block">
                    {article.title}
                  </Link>
                  <p className="text-muted-foreground mt-1">{article.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No featured articles available.</p>
          )}
        </CardContent>
      </Card>

      {/* YouTube Channel */}
      <Card className="bg-white border-0 relative before:absolute before:inset-0 before:border-2 before:border-dashed before:border-gray-200 before:rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="h-5 w-5" />
            Latest Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="border-0"
            />
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="https://youtube.com" target="_blank">
              Visit Channel <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
