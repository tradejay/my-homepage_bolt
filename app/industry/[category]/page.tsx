import { Suspense } from "react";
import CategoryContent from "./category-content";

const categories = [
  "medical",
  "pharmaceutical",
  "medical-devices",
  "cosmetics",
  "health-supplements",
  "digital-healthcare"
];

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category,
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Loading...</h1>
        <div className="text-center py-8">Loading posts...</div>
      </div>
    }>
      <CategoryContent category={params.category} />
    </Suspense>
  );
}