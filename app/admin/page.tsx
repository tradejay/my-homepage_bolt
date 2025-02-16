"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "@/lib/admin-auth"; // ✅ 관리자 세션 유지 훅
import ArticlesManagement from "@/app/admin/articles/page";
import CalendarManagement from "@/app/admin/calendar/page";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("articles"); // 기본값을 'articles'로 설정
  const { adminUser, loading } = useAdminSession(); // ✅ 전역에서 로그인 상태 유지
  const router = useRouter();

  useEffect(() => {
    if (!loading && !adminUser) {
      router.replace("/login"); // ✅ 로그인 상태가 아니면 로그인 페이지로 이동
    }
  }, [adminUser, loading]);

  if (loading) return <p>Loading...</p>;
  if (!adminUser) return null; // ✅ 로그인이 필요하면 아무것도 렌더링하지 않음

  return (
    <div className="flex flex-col max-h-screen bg-gray-100">
      {/* 탭 네비게이션 상단 고정 */}
      <div className="bg-white shadow-md w-full flex justify-center">
        <div className="flex flex-col sm:flex-row w-full max-w-10xl">
          {["articles", "calendar"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-lg ${
                activeTab === tab
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500"
              } sm:w-1/2`}
            >
              {tab === "articles" ? "기사 관리" : "일정 관리"}
            </button>
          ))}
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-10xl">
        {activeTab === "articles" && <ArticlesManagement />}
        {activeTab === "calendar" && <CalendarManagement />}
      </div>
    </div>
  );
}
