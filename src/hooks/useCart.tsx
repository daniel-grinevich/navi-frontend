import React from 'react'
import { cartContext } from '~/context/CartContext'

export function useCart() {
  const context = React.useContext(cartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider')
  }
  return context
}
