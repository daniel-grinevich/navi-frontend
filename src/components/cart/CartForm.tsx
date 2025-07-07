import React from 'react'
import CartItem from '../CartItem'
import { useCart } from '~/hooks/useCart'

interface CartFormProps {
  handleClick: () => void
}

export default function CartForm({ handleClick }: CartFormProps) {
  const [cart] = useCart()
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-6">Review your order!</h1>
        <div>
          <ul className="divide-y divide-gray-200 mb-6">
            {cart.map((orderItem, index) => (
              <li key={index}>
                <CartItem orderItem={orderItem} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="
              w-full
              bg-blue-600 hover:bg-blue-700 
              text-white font-semibold 
              rounded-lg py-3 
              shadow-md 
              transition 
              duration-200
            "
            onClick={handleClick}
          >
            Just One More Step...
          </button>
        </div>
      </div>
    </div>
  )
}
