import { CartType, OrderItemType } from '../../context/CartContext'
import { API_URL } from '~/constants/api'
import { Order } from './fetchOrders'

interface OrderCustomizationPayload {
  customization: string
  quantity: number
}

interface OrderItemPayload {
  menu_item: string
  quantity: number
  unit_price: string
  customizations?: OrderCustomizationPayload[]
}

export interface OrderPayload {
  navi_port: number
  items: OrderItemPayload[]
}

export interface OrderIntentResponse {
  order: Order
  client_secret: string
}

export const createOrder = async (token: string, data: OrderPayload) => {
  const tokenString = `Token ${token}`
  const response = await fetch(`${API_URL}/api/orders/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ['Authorization']: tokenString,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(
      `fetching orders: ${response.status} ${response.statusText}`
    )
  }

  return (await response.json()) as OrderIntentResponse
}

export const buildOrderPayload = (cart: CartType) => {
  return {
    navi_port: 1,
    items: cart.map((item) => ({
      menu_item: item.menuItem.name,
      quantity: item.quantity,
      unit_price: item.menuItem.price.toString(),
      customizations: item.customizations.map((c) => ({
        customization: c.name,
        quantity: c.quantity,
      })),
    })),
  }
}
