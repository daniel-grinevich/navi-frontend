import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCart } from '~/hooks/useCart'
import NoData from '~/components/NoData'
import CartForm from '~/components/cart/CartForm'
import { useCheckout } from '~/hooks/useCheckout'

export const Route = createFileRoute('/checkout/cart')({
  component: CartPage,
})

function CartPage() {
  const [cart] = useCart()
  const navigate = useNavigate()
  const { handleCreateOrder } = useCheckout()

  const handleClick = React.useCallback(() => {
    handleCreateOrder()
    navigate({ to: '/checkout/payment' })
  }, [])

  if (cart.length === 0)
    return (
      <NoData
        headerText="Your cart is empty 🥲"
        bodyText="Checkout the menu, I swear we have some good stuff in there."
        buttonText="To the menu!"
        url="/menu"
      />
    )
  return <CartForm handleClick={handleClick} />
}
