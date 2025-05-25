import { createFileRoute } from '@tanstack/react-router'
import ShoppingCart  from '~/components/ShoppingCart'

export const Route = createFileRoute('/shoppingCart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ShoppingCart />
}
