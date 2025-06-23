import { API_URL } from '~/constants/api'

interface Customization {
  order_item: number
  customization: string
  quantity: number
  unit_price: string
}

interface Item {
  slug: string
  menu_item: string
  quantity: number
  unit_price: string
  customizations: Customization[]
}

export interface Order {
  slug: string
  price: number
  created_at: Date
  status: string
  items: Item[]
}

export const fetchOrders = async (token: string) => {
  const tokenString = `Token ${token}`
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${tokenString}`,
    },
  })

  if (!response.ok) {
    throw new Error(
      `fetching orders: ${response.status} ${response.statusText}`
    )
  }

  return (await response.json()) as Array<Order>
}
