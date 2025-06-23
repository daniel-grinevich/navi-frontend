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
      <div className="flex flex-row space-x-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 lg:flex-col lg:overflow-visible lg:space-x-0 lg:space-y-3 lg:py-0">
        {allCategories.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              onClick={() => handleClick(category)}
              className={
                `text-sm focus:outline-none border-b ` +
                (isActive ? 'text-blue-600 font-semibold' : 'text-gray-200')
              }
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// return (
//   <div>
//     <h3 className="text-lg font-medium mb-2">Categories</h3>
//     <div className="flex space-x-4 overflow-x-auto">
//       {allCategories.map((category) => {
//         const isActive = category === activeCategory
//         return (
//           <button
//             key={category}
//             onClick={() => handleClick(category)}
//             className={
//               `text-sm focus:outline-none ` +
//               (isActive
//                 ? 'text-indigo-600 font-semibold underline'
//                 : 'text-gray-700 hover:underline')
//             }
//           >
//             {category}
//           </button>
//         )
//       })}
//     </div>
//   </div>
// )
