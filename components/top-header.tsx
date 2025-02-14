"use client";

import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

export function TopHeader() {
  return (
    <div className="bg-transparent border-b border-gray-200">
      <div className="container max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex justify-end py-2 text-sm">
          <div className="space-x-4">
            <Link 
              href="/signup" 
              className="text-gray-600 hover:text-gray-900 inline-flex items-center"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">회원가입</span>
            </Link>
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-gray-900 inline-flex items-center"
            >
              <LogIn className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">로그인</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}