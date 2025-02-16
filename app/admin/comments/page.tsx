"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "@/lib/admin-auth";

export default function CommentsPage() {
  const router = useRouter();
  const { adminUser, loading } = useAdminSession();

  useEffect(() => {
    if (!loading && !adminUser) {
      router.replace("/login");
    }
  }, [adminUser, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!adminUser) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">댓글 관리</h1>
      <p className="text-gray-500">댓글 관리 기능 개발 중...</p>
    </div>
  );
}
