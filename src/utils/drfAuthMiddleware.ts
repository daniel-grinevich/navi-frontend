import { createMiddleware } from '@tanstack/react-start'
import { setHeader } from '@tanstack/react-start/server'

const API_URL = import.meta.env.VITE_NAVI_API_URL!
const USER    = import.meta.env.VITE_NAVI_USERNAME!
const PASS    = import.meta.env.VITE_NAVI_PASSWORD!

export const drfAuth = createMiddleware()
  .server(async ({ next, context }) => {
    const ctx = (context ?? {}) as { token?: string }
    let token = ctx.token

    if (!token) {
      console.log("making token")
      const authUrl = `${API_URL}/api/auth-token/`

      const resp = await fetch(
        authUrl,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: USER, password: PASS }),
        }
      )
      if (!resp.ok) throw new Error('DRF authentication failed')

      const data = (await resp.json()) as { token: string }
      token = data.token

      setHeader(
        'Set-Cookie',
        `drfToken=${token}; HttpOnly; Path=/; SameSite=Strict`,
      )
    }

    return next({ context: { token } })
  })
