export default function RowSkeleton() {
  const placeholderCount = 5
  return (
    <ul className="flex flex-row gap-3 border p-3">
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <li key={i}>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        </li>
      ))}
    </ul>
  )
}
