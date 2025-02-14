"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/supabase";
import { FinanceInfo } from "@/components/finance-info";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";

const categoryTitles: Record<string, string> = {
  "medical": "의료",
  "pharmaceutical": "제약",
  "medical-devices": "의료기기",
  "cosmetics": "화장품",
  "health-supplements": "건강기능식품",
  "digital-healthcare": "디지털헬스케어"
};

export default function CategoryContent({ category }: { category: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .order('date', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl font-bold mb-8">{categoryTitles[category] || category}</h1>
          
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg" />
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                      <div className="h-4 bg-gray-200 rounded w-4/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 mb-12">
                {posts.map((post) => (
                  <Link key={post.id} href={`/article/${post.id}`}>
                    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                      {post.image_url && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div 
                          className="text-muted-foreground line-clamp-3 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ 
                            __html: post.content.replace(/<[^>]*>/g, '')
                          }}
                        />
                      </CardContent>
                      <CardFooter className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(post.date || post.created_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              {posts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground mb-12">
                  <p>현재 이 카테고리에는 기사가 없습니다.</p>
                </div>
              )}

              {/* Finance Info Section */}
              <div className="mt-12">
                <FinanceInfo />
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}