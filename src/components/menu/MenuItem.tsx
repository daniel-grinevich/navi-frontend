import { MenuItemType } from '~/utils/menu/fetchMenuItems'

type MenuItemProps = {
  menuItem: MenuItemType | null
  onMenuItemClick: (name: string) => void
  imgSize: {
    height: string
    width: string
  }
}

export default function MenuItem({
  menuItem,
  onMenuItemClick,
  imgSize,
}: MenuItemProps) {
  const handleClick = (name: string) => {
    onMenuItemClick(name)
  }

  if (menuItem === null) {
    return
  }

  return (
    <button
      type="button"
      onClick={() => handleClick(menuItem.name)}
      className="flex flex-row w-full border p-3 items-center gap-3 text-left hover:border-1 hover:border-indigo-500"
    >
      <div className="menu-item-img flex-shrink-0">
        <img
          src={menuItem.image}
          alt={menuItem.name}
          height={imgSize.height}
          width={imgSize.width}
          className="object-cover rounded"
        />
      </div>
      <div className="menu-item-info flex flex-col">
        <h2 className="font-semibold text-lg">{menuItem.name}</h2>
        <p className="text-sm text-gray-300">{menuItem.description}</p>
        <p className="mt-1 font-medium">{menuItem.price}</p>
      </div>
    </button>
  )
}
