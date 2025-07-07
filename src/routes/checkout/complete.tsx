import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { createFileRoute } from '@tanstack/react-router'
import CompletePage from '~/components/cart/CompletePage'
import { STRIPE_API_P_KEY } from '~/constants/api'
import { useCheckout } from '~/hooks/useCheckout'

const stripePromise = loadStripe(STRIPE_API_P_KEY)

const appearance = {
  theme: 'night',
}

const loader = 'auto'

export const Route = createFileRoute('/checkout/complete')({
  component: CompleteComponent,
})

function CompleteComponent() {
  const { clientSecret } = useCheckout()

  return (
    <Elements
      options={{ clientSecret, appearance, loader }}
      stripe={stripePromise}
    >
      <CompletePage />
    </Elements>
  )
}
