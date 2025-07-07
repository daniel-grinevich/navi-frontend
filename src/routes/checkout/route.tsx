import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CheckoutContextProvider } from '~/context/CheckoutContext'

export const Route = createFileRoute('/checkout')({
  component: CheckoutLayout,
})

function CheckoutLayout() {
  return (
    <div>
      <h1>Checkout Page!</h1>
      <CheckoutContextProvider>
        <Outlet />
      </CheckoutContextProvider>
    </div>
  )
}
