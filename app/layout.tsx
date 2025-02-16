// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { TopHeader } from "@/components/top-header";
import SearchDropdown from "@/components/search-dropdown";
import Link from "next/link";
import * as React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <header>
              <TopHeader />
              <div className="border-b">
                {/* 헤더 영역을 flex로 만들어 왼쪽에 타이틀+메뉴, 오른쪽에 검색 바 배치 */}
                <div className="container max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
                  <div className="w-full sm:w-auto">
                    <div className="py-4 flex items-center justify-between">
                      <Link
                        href="/"
                        className="text-2xl font-bold text-gray-900"
                      >
                        Healthcare Industry Blog
                      </Link>
                    </div>
                    <MainNav />
                  </div>
                  {/* 우측 상단 검색 바 */}
                  <SearchDropdown />
                </div>
              </div>
            </header>
            <main className="flex-1 container max-w-[1400px] mx-auto px-4 lg:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
