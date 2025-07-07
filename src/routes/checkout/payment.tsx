// routes/checkout/payment.tsx
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { createFileRoute } from '@tanstack/react-router'
import PaymentForm from '~/components/cart/PaymentForm'
import { STRIPE_API_P_KEY } from '~/constants/api'
import { useCheckout } from '~/hooks/useCheckout'

const stripePromise = loadStripe(STRIPE_API_P_KEY)
const appearance = {
  theme: 'night',
}

const loader = 'auto'

export const Route = createFileRoute('/checkout/payment')({
  component: PaymentPage,
})

function PaymentPage() {
  const { clientSecret } = useCheckout()

  if (!clientSecret) return <div>Loading payment form…</div>

  return (
    <Elements
      options={{ clientSecret, appearance, loader }}
      stripe={stripePromise}
    >
      <PaymentForm />
    </Elements>
  )
}
