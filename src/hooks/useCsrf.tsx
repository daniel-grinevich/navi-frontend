import React from 'react'

const API_BASE = import.meta.env.VITE_NAVI_API_URL

export default function useCsrf(): string {
  const [csrfToken, setCsrfToken] = React.useState('')

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
          const data = await res.json()
          setCsrfToken(data.csrfToken)
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

  return csrfToken
}
