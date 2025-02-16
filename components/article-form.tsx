"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAdminSession } from "@/lib/admin-auth"; // 관리자 세션 훅 임포트

interface ArticleFormProps {
  id?: string;  // id를 optional prop으로 정의
}

export default function ArticleForm({ id }: ArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { adminUser, loading: adminLoading } = useAdminSession(); // 단일 관리자 세션 소스 사용

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [isSlide, setIsSlide] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // 관리자 세션 체크: 관리자가 아니라면 로그인 페이지로 이동
  useEffect(() => {
    if (!adminLoading && !adminUser) {
      router.push("/admin/login");
    }
  }, [adminLoading, adminUser, router]);

  // 게시글 수정인 경우 기존 게시글 데이터 불러오기
  useEffect(() => {
    if (!id) return;

    async function fetchArticle() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load article",
          variant: "destructive",
        });
        router.push("/admin/articles");
        return;
      }

      setTitle(data.title);
      setCategory(data.category);
      setDate(data.date);
      setContent(data.content);
      setIsSlide(data.is_slide);
      setImgUrl(data.image_url || "");
      if (data.description) {
        setDescription(data.description);
      }
    }

    fetchArticle();
  }, [id, router, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!adminUser) {
        toast({
          title: "Error",
          description: "You must be logged in as admin to save articles.",
          variant: "destructive",
        });
        return;
      }

      let articleData: any = {
        title,
        category,
        content,
        date: new Date(date).toISOString().split("T")[0],
        is_slide: isSlide,
        image_url: imgUrl.trim() !== "" ? imgUrl.trim() : null,
      };

      if (isSlide) {
        articleData.description = description;
      }

      let error;
      if (id) {
        // 게시글 업데이트
        const { error: updateError } = await supabase
          .from("posts")
          .update(articleData)
          .eq("id", id)
          .eq("user_id", adminUser.id)
          .select()
          .single();

        if (updateError) {
          error = updateError;
        }
      } else {
        // 새로운 게시글 생성
        const { error: insertError } = await supabase
          .from("posts")
          .insert([{ ...articleData, user_id: adminUser.id }])
          .select()
          .single();

        if (insertError) {
          error = insertError;
        }
      }

      if (error) {
        toast({
          title: "Error",
          description: `Failed to ${id ? "update" : "create"} article`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Article ${id ? "updated" : "created"} successfully`,
        });
        router.push("/admin");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (adminLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-white px-4 py-4">
      <h1 className="text-3xl font-bold mb-6">{id ? "Edit" : "New"} Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-3xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
          ></textarea>
        </div>
        {/* 그룹화된 Display on Slider 및 Description 영역 */}
        <div className="border p-4 rounded bg-gray-50">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isSlide"
              checked={isSlide}
              onChange={(e) => setIsSlide(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isSlide" className="text-sm font-medium text-gray-700">
              Display on Slider
            </label>
          </div>
          {isSlide && (
            <div className="mt-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24"
                placeholder="슬라이더에 표시할 설명을 입력하세요"
              ></textarea>
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {loading
              ? id
                ? "Updating..."
                : "Creating..."
              : id
              ? "Update Article"
              : "Create Article"}
          </button>
        </div>
      </form>
    </div>
  );
}
