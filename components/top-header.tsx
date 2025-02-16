"use client";

import Link from "next/link";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getAdminUser, signOutAdmin } from "@/lib/admin-auth";

export function TopHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getAdminUser();
      console.log("User in TopHeader:", user);
      setIsAdmin(!!user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOutAdmin();
    setIsLoggedIn(false);
    setIsAdmin(null);
  };

  return (
    <div className="bg-transparent border-b border-gray-200">
      <div className="container max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex justify-between py-2 text-sm">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 inline-flex items-center">
            Home
          </Link>
          <div className="space-x-4">
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <>
                {isAdmin === null ? null : isAdmin ? (
                  <Link
                    href="/admin"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center font-bold"
                  >
                    관리자 페이지
                  </Link>
                ) : null}
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 inline-flex items-center font-bold"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
