
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  inStock: boolean;
  isSpecial?: boolean;
  specialType?: 'iframe' | 'shadowdom' | 'instant-alert' | 'timed-popup' | 'confirm-dialog' | 'modal-popup';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.8,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    inStock: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    rating: 4.6,
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    inStock: true
  },
  {
    id: '3',
    name: 'Professional Camera',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
    rating: 4.9,
    category: 'Electronics',
    description: 'Professional DSLR camera perfect for photography enthusiasts.',
    inStock: true
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    rating: 4.4,
    category: 'Furniture',
    description: 'Comfortable ergonomic chair designed for long working hours.',
    inStock: true
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
    rating: 4.7,
    category: 'Electronics',
    description: 'RGB mechanical keyboard with tactile switches for gaming.',
    inStock: true
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    rating: 4.3,
    category: 'Electronics',
    description: 'Portable waterproof speaker with excellent sound quality.',
    inStock: true
  },
  {
    id: '7',
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    rating: 4.2,
    category: 'Accessories',
    description: 'Adjustable aluminum laptop stand for better ergonomics.',
    inStock: false
  },
  {
    id: '8',
    name: 'Wireless Mouse',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    rating: 4.5,
    category: 'Electronics',
    description: 'Precision wireless mouse with long battery life.',
    inStock: true
  },
  {
    id: '9',
    name: 'Phone Case',
    price: 24.99,
    image: 'https://plus.unsplash.com/premium_photo-1705346738010-d480180032ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvbmUlMjBjYXNlfGVufDB8fDB8fHww?w=400',
    rating: 4.0,
    category: 'Accessories',
    description: 'Protective phone case with premium materials.',
    inStock: true
  },
  {
    id: '10',
    name: 'USB-C Hub',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400',
    rating: 4.6,
    category: 'Accessories',
    description: 'Multi-port USB-C hub with HDMI and fast charging.',
    inStock: true
  },
  {
    id: '11',
    name: 'Desk Lamp',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 4.4,
    category: 'Furniture',
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    inStock: true
  },
  {
    id: '12',
    name: 'Coffee Mug',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1533776992670-a72f4c28235e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbXVnfGVufDB8fDB8fHww?w=400',
    rating: 4.1,
    category: 'Home',
    description: 'Ceramic coffee mug with heat-resistant handle.',
    inStock: true
  },
  {
    id: '13',
    name: 'Interactive iframe Widget',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1539975611936-f0d1221cfd16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZyYW1lfGVufDB8fDB8fHww?w=400',
    rating: 4.7,
    category: 'Electronics',
    description: 'Advanced widget with embedded iframe content for testing iframe interactions.',
    inStock: true,
    isSpecial: true,
    specialType: 'iframe'
  },
  {
    id: '14',
    name: 'Shadow DOM Component',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
    rating: 4.8,
    category: 'Electronics',
    description: 'Special component using Shadow DOM for encapsulated testing scenarios.',
    inStock: true,
    isSpecial: true,
    specialType: 'shadowdom'
  },
  {
    id: '15',
    name: 'Instant Alert Widget',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.5,
    category: 'Electronics',
    description: 'Testing widget that triggers immediate browser alerts on interaction.',
    inStock: true,
    isSpecial: true,
    specialType: 'instant-alert'
  },
  {
    id: '16',
    name: 'Timed Popup Display',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
    rating: 4.3,
    category: 'Electronics',
    description: 'Automated testing component with timed popups (3, 5, and 10 second delays).',
    inStock: true,
    isSpecial: true,
    specialType: 'timed-popup'
  },
  {
    id: '17',
    name: 'Confirmation Dialog Tester',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
    rating: 4.6,
    category: 'Electronics',
    description: 'Interactive component requiring user confirmation dialogs for testing automation.',
    inStock: true,
    isSpecial: true,
    specialType: 'confirm-dialog'
  },
  {
    id: '18',
    name: 'Modal Popup System',
    price: 329.99,
    image: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=400',
    rating: 4.7,
    category: 'Electronics',
    description: 'Complex modal system with multiple layers and user interaction requirements.',
    inStock: true,
    isSpecial: true,
    specialType: 'modal-popup'
  }
];

export const categories = [...new Set(products.map(p => p.category))];
