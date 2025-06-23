import React from 'react'
import RowSkeleton from '~/components/skeletons/RowSkeleton'
import {
  CustomizationGroupType,
  CustomizationType,
  SelectedCustomizationType,
} from '~/routes/menu/$slug'

interface MenuItemCustomizationsProps {
  customizationGroup: CustomizationGroupType | null
  onSelect: (customization: string) => void
  selectedCustomizations: string[]
}

export default function CustomizationGroup({
  customizationGroup,
  onSelect,
  selectedCustomizations,
}: MenuItemCustomizationsProps) {
  if (customizationGroup === null) {
    return <RowSkeleton />
  }

  const customizations = customizationGroup.customizations

  const handleClick = (option: string) => {
    onSelect(option)
  }

  return (
    <div>
      <h2>{customizationGroup.name}</h2>
      <ul className="flex flex-row gap-3 border p-3">
        {customizations.map((customization, index) => (
          <li key={`${customization.slug}-${index}`}>
            <button
              className={`border p-1 rounded ${
                selectedCustomizations.includes(customization.name)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-black'
              }`}
              type="button"
              onClick={() => handleClick(customization.name)}
            >
              {customization.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
