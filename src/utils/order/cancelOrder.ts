import { API_URL } from '~/constants/api'
import { Order } from './fetchOrders'

export const cancelOrder = async (token: string, orderSlug: string) => {
  const tokenString = `Token ${token}`
  const response = await fetch(
    `${API_URL}/api/orders/${orderSlug}/cancel_order/`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenString}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `fetching orders: ${response.status} ${response.statusText}`
    )
  }

  return (await response.json()) as Array<Order>
}
