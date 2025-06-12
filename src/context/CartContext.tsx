import React, { ReactNode, useReducer } from 'react'
import { MenuItemType } from '~/utils/menu/fetchMenuItems'

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

// const getInitialCart = (): CartType => {
//   try {
//     const storedCart = localStorage.getItem('cart')
//     const parsed = storedCart ? JSON.parse(storedCart) : []
//     return Array.isArray(parsed) ? parsed : []
//   } catch {
//     return []
//   }
// }

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
  const [cart, dispatch] = useReducer(reducer, [])

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('cart')
      if (stored) {
        dispatch({ type: 'CLEAR_CART' })
        JSON.parse(stored).forEach((item: OrderItemType) =>
          dispatch({ type: 'ADD_ITEM', payload: { item } })
        )
      }
    } catch {
      /* swallow */
    }
  }, [])

  React.useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [cart])

  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cart' && e.newValue) {
        try {
          const newCart: CartType = JSON.parse(e.newValue)
          dispatch({ type: 'CLEAR_CART' }) // clear current state
          newCart.forEach((item) =>
            dispatch({ type: 'ADD_ITEM', payload: { item } })
          )
        } catch (err) {
          console.error('Failed to sync cart from localStorage', err)
        }
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <cartContext.Provider value={[cart, dispatch]}>
      {children}
    </cartContext.Provider>
  )
}
