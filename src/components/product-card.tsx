import { TempProduct } from "@/types/products/interface";
import CoffeeImage from "@/utils/coffee-image";
import { Suspense } from "react";

export async function ProductCard({ product }: { product: TempProduct }) {
    const productImageUrl = product.image_url.match(/\/(H[^.]+)\./);
    const imageId: string | undefined = productImageUrl?.[1];

    return (
        <div className="p-4 border border-black h-48 flex flex-col items-center">
            <CoffeeImage
                key={product.id}
                imageId={imageId}
                name={product.name}
                className="w-32 h-32"
            />
            <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-sm">${product.price}</p>
            </div>
        </div>
    );
}