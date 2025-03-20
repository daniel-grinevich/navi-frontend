import { CategoriesContainer } from "@/components/category_container";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="mx-3 relative">
      <h1 className="text-3xl">Pick a category!</h1>
      <div>
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoriesContainer />
        </Suspense>
      </div>
    </div>
  );
}