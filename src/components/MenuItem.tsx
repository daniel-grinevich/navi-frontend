interface MenuItemProps {
    name: string;
    description: string;
    price: number;
  }

export default function MenuItem({name,description,price}:MenuItemProps) {


    return (
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="mt-1 font-medium">${price}</p>
        </div>
    )
}