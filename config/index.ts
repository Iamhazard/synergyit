export const PRODUCT_CATEGORIES = [
  {
    label: 'CC Camera',
    value: 'cc' as const,
    featured: [
      {
        name: 'Ours picks',
        href: `/products?category=products_kits`,
        imageSrc: '/images/nav/cctv.webp',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=products_kits&sort=desc',
        imageSrc: '/images/nav/cctv.webp',
      },
        {
        name: 'Video recorder',
        href: '/products?category=icons',
        imageSrc: '/images/nav/cctv.webp',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=products_kits',
        imageSrc: '/images/nav/cctv.webp',
      },
    ],
  },
  {
    label: 'Networking',
    value: 'icons' as const,
    featured: [
      {
        name: 'Switch',
        href: `/products?category=icons`,
        imageSrc: '/images/nav/switch.webp',
      },
      {
        name: 'Hub',
        href: '/products?category=icons',
        imageSrc: '/images/nav/hu.webp',
      },
    
      {
        name: 'New Arrivals',
        href: '/products?category=icons&sort=desc',
        imageSrc: '/images/nav/switch.webp',
      },
      
    ],
  },
    {
    label: 'Others',
    value: 'icons' as const,
    featured: [
      {
        name: 'Computers',
        href: `/products?category=icons`,
        imageSrc: '/images/nav/computer.jpg',
      },
      {
        name: 'Laptops',
        href: '/products?category=icons',
        imageSrc: '/images/nav/laptop.jpg',
      },
      {
        name: 'SSD Card',
        href: '/products?category=icons',
        imageSrc: '/images/nav/icons/bestsellers.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=icons&sort=desc',
        imageSrc: '/images/nav/computer.jpg',
      },
      
    ],
  },
]