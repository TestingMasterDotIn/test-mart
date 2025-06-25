
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  inStock: boolean;
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
    image: 'https://images.unsplash.com/photo-1574273669530-12c46ecdc8c4?w=400',
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
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400',
    rating: 4.1,
    category: 'Home',
    description: 'Ceramic coffee mug with heat-resistant handle.',
    inStock: true
  }
];

export const categories = [...new Set(products.map(p => p.category))];
