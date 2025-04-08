// @ts-nocheck
import ArticlesSection from "@/ArticlesSection";
import { SearchDropdown } from "@/search-dropdown";
import { MainNav } from "@/main-nav";

interface SearchParams {
  q: string;
}

export const dynamic = 'force-dynamic';
export const generateStaticParams = async () => { return [] }

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const query = searchParams.q || "";

  return (
    <>
      <MainNav />
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
          <SearchDropdown />
        </div>
        <ArticlesSection category={query} />
      </div>
    </>
  );
}
