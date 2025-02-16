"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroSlider } from "@/components/hero-slider";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import { FinanceInfo } from "@/components/finance-info";
import { CalendarSection } from "@/components/calendar-section";
import { Sidebar } from "@/components/sidebar";

const categories = [
  { title: "Medical", path: "medical" },
  { title: "Pharmaceutical", path: "pharmaceutical" },
  { title: "Medical Devices", path: "medical-devices" },
  { title: "Cosmetics", path: "cosmetics" },
  { title: "Health Supplements", path: "health-supplements" },
  { title: "Digital Healthcare", path: "digital-healthcare" }
];

export default function Home() {
  const [categoryPosts, setCategoryPosts] = useState<Record<string, Post[]>>({});

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      const posts: Record<string, Post[]> = {};
      
      for (const category of categories) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('category', category.path)
          .eq("is_slide",false)
          .order('date', { ascending: false })
          .limit(3);
        
        if (!error && data) {
          posts[category.path] = data;
        }
      }
      
      setCategoryPosts(posts);
    };

    fetchCategoryPosts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Slider */}
      <section className="mb-12 -mx-4 lg:-mx-8">
        <HeroSlider />
      </section>

      {/* Articles Section with Sidebar */}
      <section className="mb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Category Previews */}
            {categories.map((category) => (
              <div key={category.path} className="mb-12">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
                  <Button variant="outline" asChild>
                    <Link href={`/industry/${category.path}`}>
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {categoryPosts[category.path]?.map((post) => (
                    <Link key={post.id} href={`/article/${post.id}`}>
                      <Card className="flex flex-col bg-white border-transparent shadow-lg hover:shadow-xl transition-shadow">
                        {post.image_url && (
                          <div className="relative h-48 w-full overflow-hidden">
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="line-clamp-2 text-lg md:text-xl">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div 
                            className="text-muted-foreground line-clamp-3 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ 
                              __html: post.content.replace(/<img\b[^>]*>/gi, '')
                            }}
                          />
                        </CardContent>
                        <CardFooter className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(post.date || post.created_at).toLocaleDateString()}
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                  {!categoryPosts[category.path] && (
                    <div className="col-span-2 py-8 text-center text-muted-foreground">
                      Loading articles...
                    </div>
                  )}
                  {categoryPosts[category.path]?.length === 0 && (
                    <div className="col-span-2 py-8 text-center text-muted-foreground">
                      No articles available in this category yet.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* Finance Info Section */}
      <section className="mb-12">
        <FinanceInfo />
      </section>

      {/* Calendar Section */}
      <section>
        <CalendarSection />
      </section>
    </main>
  );
}