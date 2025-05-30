import React from 'react'

const API_BASE = import.meta.env.VITE_NAVI_API_URL

export default function useCsrf(): boolean {
  const [csrfReady, setCsrfReady] = React.useState(false)

  React.useEffect(() => {
    let ignore = false

    async function getCsrfToken() {
      try {
        const res = await fetch(`${API_BASE}/api/auth/csrf/`, {
          method: 'GET',
          credentials: 'include',
        })

        if (!res.ok) {
          console.error('CSRF fetch failed:', res.status, res.statusText)
          return
        }

        if (!ignore) {
          setCsrfReady(true)
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error)
      }
    }

    getCsrfToken()

    return () => {
      ignore = true
    }
  }, [])

  return csrfReady
}
