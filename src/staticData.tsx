import { CustomizationGroupType, CustomizationType } from './routes/menu'
export const mockCustomizationGroups: CustomizationGroupType[] = [
  {
    name: 'Milk Options',
    category: 'Beverage',
    description: 'Choose your preferred milk',
    display_order: 1,
    is_required: true,
  },
  {
    name: 'Extra Shots',
    category: 'Beverage',
    description: 'Add more espresso shots',
    display_order: 2,
    is_required: false,
  },
  {
    name: 'Flavors',
    category: 'Beverage',
    description: 'Add syrup flavors',
    display_order: 3,
    is_required: false,
  },
]

export const mockCustomizations: CustomizationType[] = [
  {
    name: 'Oat Milk',
    group: mockCustomizationGroups[0],
    description: 'Creamy and dairy-free',
    display_order: 1,
    price: 0.5,
  },
  {
    name: 'Whole Milk',
    group: mockCustomizationGroups[0],
    description: 'Classic dairy milk',
    display_order: 2,
    price: 0.0,
  },
  {
    name: 'Almond Milk',
    group: mockCustomizationGroups[0],
    description: 'Nutty and smooth',
    display_order: 3,
    price: 0.5,
  },
  {
    name: '1 Extra Shot',
    group: mockCustomizationGroups[1],
    description: '1 extra espresso shot',
    display_order: 1,
    price: 1.0,
  },
  {
    name: '2 Extra Shots',
    group: mockCustomizationGroups[1],
    description: 'Double espresso boost',
    display_order: 2,
    price: 2.0,
  },
  {
    name: 'Vanilla Syrup',
    group: mockCustomizationGroups[2],
    description: 'Sweet and smooth',
    display_order: 1,
    price: 0.75,
  },
  {
    name: 'Caramel Syrup',
    group: mockCustomizationGroups[2],
    description: 'Rich and buttery',
    display_order: 2,
    price: 0.75,
  },
]
