import { MenuItemType } from '~/routes/menu'

type MenuItemProps = {
  menuItem: MenuItemType
  effect: () => void
  imgSize: {
    height: string
    width: string
  }
}

export default function MenuItem({ menuItem, effect, imgSize }: MenuItemProps) {
  return (
    <div className="flex flex-row border p-3 items-center gap-4">
      <div className="menu-item-img flex-shrink-0">
        <img
          src={menuItem.image}
          alt={menuItem.name}
          height={imgSize.height}
          width={imgSize.width}
          className="object-cover"
        />
      </div>
      <div className="menu-item-info flex flex-col">
        <h2 className="font-semibold text-lg">{menuItem.name}</h2>
        <p className="text-sm text-gray-600">{menuItem.description}</p>
        <p className="mt-1 font-medium">{menuItem.price}</p>
      </div>
    </div>
  )
}
