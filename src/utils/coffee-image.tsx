import { ImageConfigContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import Image from "next/image";

export default function CoffeeImage(props: {
  imageId?: string;
  className: string;
  name: string;
}) {
  if (!props.imageId) {
    return (
      <div className={`${props.className} flex items-center justify-center bg-gray-200`}>
        Image not available
      </div>
    );
  }

  return (
    <img
      src={`/api/productimage/${props.imageId}`} 
      className={props.className}
      alt={props.name}
      width={32}
      height={32}
    />
  );
}