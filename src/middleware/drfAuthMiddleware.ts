import { createMiddleware } from '@tanstack/react-start'

const API_URL = import.meta.env.VITE_NAVI_API_URL!

export const drfLoginMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const res = await fetch(`${API_URL}/api/auth/csrf/`, {
      credentials: 'include',
    })
    const { csrfToken } = await res.json()

    console.log('CSRF TOKEN LOGIN MIDDLE WARE', csrfToken)
    const resp = await fetch(`${API_URL}/api/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ username: 'test@test.com', password: 'test' }),
    })

    if (!resp.ok) throw new Error(`Login failed: ${resp.status}`)

    const { session_key } = await resp.json()

    console.log('RESPONSE SUCCESSFUL??')
    return next({ sendContext: { token: csrfToken, session: session_key } })
  }
)
