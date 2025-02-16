"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export function HeroSlider() {
  const [slideArticles, setSlideArticles] = useState([]);

  useEffect(() => {
    const fetchSlideArticles = async () => {
      const { data, error } = await supabase
        .from("posts")
        // posts 테이블에서 필요한 필드를 선택합니다.
        // is_slide가 true인 게시글만 가져옵니다.
        .select("id, title, description, image_url")
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
    <Carousel className="w-full">
      <CarouselContent>
        {slideArticles.map((article) => (
          <CarouselItem key={article.id}>
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
              {/* 배경 이미지 영역 */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image_url})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* 슬라이드 내부 텍스트 및 버튼 영역 */}
              <div className="relative h-full flex flex-col justify-center px-12 text-white">
                <h2 className="text-4xl font-bold mb-4">{article.title}</h2>
                <p className="text-xl mb-8 text-gray-300">{article.description}</p>
                <Button asChild className="w-fit" variant="outline">
                  {/* 상세 페이지 링크를 /article/{게시글ID}로 설정 */}
                  <Link href={`/article/${article.id}`}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
