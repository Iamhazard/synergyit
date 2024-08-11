export const PRODUCT_CATEGORIES = [
  {
    label: 'Home',
    value: 'cc' as const,
    featured: [
      {
        name: 'Home',
        href: ``,
      },
    ],
  },
  {
    label: 'Category',
    value: 'icons' as const,
    featured: [
      {
        name: 'Switch',
        href: `/me/category`,
      },
      {
        name: 'Hub',
        href: '/me/category',

      },

      {
        name: 'New Arrivals',
        href: '/me/category',

      },

    ],
  },
  {
    label: 'Product',
    value: 'icons' as const,
    featured: [
      {
        name: 'Computers',
        href: `/me/product`,
      },
      {
        name: 'Laptops',
        href: '/me/product',
      },
      {
        name: 'SSD Card',
        href: '/me/product',

      },
      {
        name: 'New Arrivals',
        href: '/me/product',
      },

    ],
  },
]