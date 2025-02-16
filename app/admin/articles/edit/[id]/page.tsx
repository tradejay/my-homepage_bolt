import ArticleForm from "@/components/article-form";
import { supabase } from "@/lib/supabase";

// ✅ Next.js가 빌드 시점에 사용할 `id` 목록을 가져옴
export async function generateStaticParams() {
  const { data: articles } = await supabase.from("posts").select("id");

  if (!articles) return [];

  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}

export default function EditArticlePage({ params }: { params: { id: string } }) {
  return <ArticleForm id={params.id} />;
}
