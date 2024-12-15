import { Product } from "@/types/products/interface";
import { Suspense } from "react";
import { ProductCard } from "./product-card";

export async function Products() {
   
    const products = await fetch("https://fake-coffee-api.vercel.app/api")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }
            return res.json();
        });

    
    return (
        <div className="grid grid-cols-4 gap-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}


{/* <div key={product.id}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                </div> */}