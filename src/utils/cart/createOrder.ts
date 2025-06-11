import { createServerFn } from '@tanstack/react-start'
import { OrderItemType } from '../../context/CartContext'
import { drfLoginMiddleware } from '~/middleware/drfAuthMiddleware'
import { getHeader, setHeader, getHeaders } from '@tanstack/react-start/server'

export interface OrderPayload {
  navi_port: number
  items: OrderItemType[]
}

export const createOrder = createServerFn({
  method: 'POST',
})
  .middleware([drfLoginMiddleware])
  .validator((data: OrderPayload) => data)
  .handler(async ({ context, data }) => {
    const API_URL = import.meta.env.VITE_NAVI_API_URL!

    const { navi_port, items } = data

    setHeader('X-CSRFToken', context.token)
    setHeader('Cookie', `sessionid=${context.session}`)

    console.log('CSRF TOKEN IN server function', context.token)
    console.log('SESSION TOKEN IN server function', context.session)

    const res = await fetch(`${API_URL}/api/orders/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': context.token,
        ['Cookie']: `sessionid=${context.session}`,
      },
      body: JSON.stringify({ navi_port, items }),
    })

    if (!res.ok) {
      throw new Error(`Order failed: ${res.status}`)
    }
    return res.json()
  })
