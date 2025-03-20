"use client";

import Link from "next/link";

export function CategoryList({ initialCategories }) {
    return(
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {initialCategories.map(category => (
                <Link 
                    href={`/category/${category.slug}`} 
                    key={category.id}
                    className=""
                >
                    <div className="text-lg font-medium">{category.name}</div>
                    {category.description && (
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    )}
                </Link>
            ))}
        </div>
    )
}