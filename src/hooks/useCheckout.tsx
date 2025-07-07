import React from 'react'
import { checkoutContext } from '~/context/CheckoutContext'

export function useCheckout() {
  const context = React.useContext(checkoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutContextProvider')
  }
  return context
}
