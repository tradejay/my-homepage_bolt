import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { TopHeader } from "@/components/top-header";

export const metadata: Metadata = {
  title: 'Healthcare Industry Blog',
  description: 'Comprehensive coverage of healthcare industry trends and news',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
                <div className="container max-w-[1400px] mx-auto px-4 lg:px-8">
                  <div className="py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Healthcare Industry Blog</h1>
                  </div>
                  <MainNav />
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