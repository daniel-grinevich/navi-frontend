import { TempProduct } from "@/types/products/interface";
import { Suspense } from "react";
import { ProductCard } from "./product-card";
import Link from "next/link";

export async function Products() {
   
    const products: TempProduct[] = await fetch("https://fake-coffee-api.vercel.app/api", {
        next: {
            revalidate: 3600
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        return response.json();
    });

    
    return (
        <div className="grid grid-cols-4 gap-3">
            {products.map((product) => (     
                <Link 
                    key={product.id}
                    prefetch={true}
                    className=""
                    href={`/products/${product.name}`}
                >
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    );
}