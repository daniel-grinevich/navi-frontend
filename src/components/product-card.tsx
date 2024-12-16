import { TempProduct } from "@/types/products/interface";
import CoffeeImage from "@/utils/coffee-image";
import { Suspense } from "react";

export async function ProductCard({ product }: { product: TempProduct }) {
    const productImageUrl = product.image_url.match(/\/(H[^.]+)\./);
    const imageId: string | undefined = productImageUrl?.[1];

    return (
        <div className="p-4 border border-white h-48">
            <CoffeeImage
                key={product.id}
                imageId={imageId}
                name={product.name}
                className="w-8 h-8"
            />
            <h1>{product.name}</h1>
            <h2>${product.price}</h2>
        </div>
    );
}