import type { FallbackProps } from 'react-error-boundary'

export function QueryFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </>
  )
}
