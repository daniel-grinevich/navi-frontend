import React from 'react'

interface CategoriesProps {
  categories: string[]
  activeCategory: string
  onCategoryClick: (category: string) => void
}

export default function Categories({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoriesProps) {
  const allCategories = [...categories]

  const handleClick = (category: string) => {
    onCategoryClick(category)
  }

  return (
    <div>
      <h3 className="text-xl">Categories</h3>
      <div className="flex flex-row gap-3 border p-3 overflow-x-scroll">
        {allCategories.map((category, index) => (
          <button
            key={index}
            value={category}
            className={
              category === activeCategory
                ? 'border p-2 border-1 border-indigo-500'
                : 'border p-2 hover:border-1 hover:border-indigo-500'
            }
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
