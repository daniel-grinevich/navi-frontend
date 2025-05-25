import React from "react"

export default function ShoppingCart () {
    const [cart,setCart]=React.useState([])

    const handleAddToCart = (newItem) => {
        setCart([...cart,newItem])
    }
    const handleRemoveFromCart = () =>{
        cart.filter((item,index)=> {
            if (item==cart[index]){
                return null
            }
            else {
                return item
            }
        }
        )
    }

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
            {cart.map((item)=>(
                <li>item.name</li>
            )
            )}
            </ul>
        </div>
    )


}