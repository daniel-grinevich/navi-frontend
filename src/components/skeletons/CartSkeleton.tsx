import React from 'react'

export default function CartSkeleton() {
  const placeholderCount = 3
  return (
    <ul className="flex flex-col gap-3 p-3 w-full justify-center items-center">
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <li key={i}>
          <div className="h-[20vh] w-[30vw] bg-gray-200 rounded animate-pulse" />
        </li>
      ))}
    </ul>
  )
}
