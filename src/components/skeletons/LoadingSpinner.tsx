export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  )
}
