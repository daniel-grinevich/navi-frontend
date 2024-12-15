export async function ProductCard({product}) {

    return (
        <div className="p-4 border border-white h-32">
            <h1>{product.name}</h1>
            <h2>${product.price}</h2>
        </div>
    )
}