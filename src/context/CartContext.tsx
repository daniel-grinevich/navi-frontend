import React, { ReactNode, useReducer } from 'react'
import { MenuItemType } from '~/routes/menu'

export interface OrderCustomizationType {
  name: string
  quantity: number
}

export interface OrderItemType {
  id: string
  menuItem: MenuItemType
  quantity: number
  customizations: OrderCustomizationType[]
}
export type CartType = OrderItemType[]

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: OrderItemType } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | {
      type: 'UPDATE'
      payload: { id: string; updatedItem: Partial<OrderItemType> }
    }
  | { type: 'CLEAR_CART' }

interface CartProviderProps {
  children: ReactNode
}

const initialState: CartType = []

export const cartContext = React.createContext<
  [CartType, React.Dispatch<CartAction>] | undefined
>(undefined)

function reducer(cart: CartType, action: CartAction): CartType {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = cart.find(
        (item) =>
          item.menuItem.name === action.payload.item.menuItem.name &&
          JSON.stringify(item.customizations) ===
            JSON.stringify(action.payload.item.customizations)
      )

      if (existing) {
        return cart.map((item) =>
          item.id === existing.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.item.quantity,
              }
            : item
        )
      }

      return [...cart, action.payload.item]
    }

    case 'UPDATE': {
      return cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updatedItem }
          : item
      )
    }

    case 'REMOVE_ITEM': {
      return cart.filter((item) => item.id !== action.payload.id)
    }

    case 'CLEAR_CART': {
      return []
    }

    default:
      return cart
  }
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(reducer, initialState)
  return (
    <cartContext.Provider value={[cart, dispatch]}>
      {children}
    </cartContext.Provider>
  )
}

export function useCart() {
  const context = React.useContext(cartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider')
  }
  return context
}
