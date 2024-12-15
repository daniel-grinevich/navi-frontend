export const mockData = [
    {
      id: 1,
      name: "Cappuccino",
      description: "Rich espresso topped with steamed milk and foam.",
      price: 4.5,
      options: {
        size: [
          { id: 1, name: "Small" },
          { id: 2, name: "Medium" },
          { id: 3, name: "Large" }
        ],
        milk: [
          { id: 1, name: "Whole Milk" },
          { id: 2, name: "Skim Milk" },
          { id: 3, name: "Oat Milk" },
          { id: 4, name: "Almond Milk" },
          { id: 5, name: "Soy Milk" }
        ],
        flavors: [], // No flavors for this product
        temperature: [] // No temperature options for this product
      }
    },
    {
      id: 2,
      name: "Latte",
      description: "Espresso and steamed milk with a light layer of foam.",
      price: 5.0,
      options: {
        size: [
          { id: 1, name: "Small" },
          { id: 2, name: "Medium" },
          { id: 3, name: "Large" }
        ],
        milk: [
          { id: 1, name: "Whole Milk" },
          { id: 2, name: "Skim Milk" },
          { id: 3, name: "Oat Milk" },
          { id: 4, name: "Almond Milk" }
        ],
        flavors: [
          { id: 1, name: "Vanilla" },
          { id: 2, name: "Pumpkin Spice" },
          { id: 3, name: "Hazelnut" },
          { id: 4, name: "Mocha" }
        ],
        temperature: [
          { id: 1, name: "Hot" },
          { id: 2, name: "Iced" }
        ]
      }
    },
    {
      id: 3,
      name: "Americano",
      description: "Espresso with hot water for a smooth, rich flavor.",
      price: 3.5,
      options: {
        size: [
          { id: 1, name: "Small" },
          { id: 2, name: "Medium" },
          { id: 3, name: "Large" }
        ],
        milk: [], // No milk options
        flavors: [], // No flavors
        temperature: [
          { id: 1, name: "Hot" },
          { id: 2, name: "Iced" }
        ]
      }
    },
    {
      id: 4,
      name: "Cold Brew",
      description: "Slow-steeped coffee served over ice for a bold, smooth taste.",
      price: 4.0,
      options: {
        size: [
          { id: 1, name: "Medium" },
          { id: 2, name: "Large" }
        ],
        milk: [
          { id: 1, name: "No Milk" },
          { id: 2, name: "Whole Milk" },
          { id: 3, name: "Oat Milk" },
          { id: 4, name: "Almond Milk" }
        ],
        flavors: [], // No flavors
        temperature: [] // Only served iced
      }
    },
    {
      id: 5,
      name: "Matcha Latte",
      description: "Premium matcha blended with steamed milk and lightly sweetened.",
      price: 5.5,
      options: {
        size: [
          { id: 1, name: "Small" },
          { id: 2, name: "Medium" },
          { id: 3, name: "Large" }
        ],
        milk: [
          { id: 1, name: "Whole Milk" },
          { id: 2, name: "Oat Milk" },
          { id: 3, name: "Almond Milk" }
        ],
        flavors: [], // No flavors
        temperature: [
          { id: 1, name: "Hot" },
          { id: 2, name: "Iced" }
        ]
      }
    }
  ];