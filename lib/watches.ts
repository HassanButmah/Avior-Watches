export type WatchAvailability = 'in_stock' | 'limited' | 'preorder';
export type WatchCategory = 'dress' | 'sport' | 'diver' | 'chronograph';
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'bestselling';

export interface WatchSpecs {
  movement: string;
  caseSize: string;
  caseMaterial: string;
  water_resistance: string;
  crystal: string;
  dial: string;
  strap: string;
  power_reserve: string;
  functions: string[];
}

export interface WatchReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}

export interface Watch {
  id: string;
  name: string;
  collection: string;
  category: WatchCategory;
  price: number;
  image: string;
  images: string[];
  description: string;
  specs: WatchSpecs;
  features: string[];
  availability: WatchAvailability;
  rating: number;
  reviews: number;
  reviewList: WatchReview[];
  isNew: boolean;
  isBestseller: boolean;
  createdAt: string;
  shippingInfo: string;
}

export interface WatchFilters {
  collection?: string;
  category?: string;
  availability?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const COLLECTIONS = ['Prestige', 'Sports', 'Heritage'] as const;
export const CATEGORIES: WatchCategory[] = ['dress', 'sport', 'diver', 'chronograph'];
export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'bestselling', label: 'Best Selling' },
];

const defaultReviews: WatchReview[] = [
  {
    id: 'r1',
    author: 'James M.',
    rating: 5,
    date: '2026-01-15',
    title: 'Exceptional craftsmanship',
    content: 'The attention to detail is remarkable. This timepiece exceeds every expectation.',
  },
  {
    id: 'r2',
    author: 'Sarah L.',
    rating: 5,
    date: '2025-12-08',
    title: 'A true luxury experience',
    content: 'From unboxing to wearing, every moment feels premium. The movement is flawless.',
  },
  {
    id: 'r3',
    author: 'Michael R.',
    rating: 4,
    date: '2025-11-22',
    title: 'Worth every penny',
    content: 'Stunning design and impeccable finishing. A worthy addition to any collection.',
  },
];

export const watches: Watch[] = [
  {
    id: 'prestige-pro',
    name: 'Avior Prestige Pro',
    collection: 'Prestige',
    category: 'chronograph',
    price: 12500,
    image: '/watches/prestige-pro.svg',
    images: ['/watches/prestige-pro.svg', '/watches/prestige-pro-2.svg', '/watches/prestige-pro-3.svg'],
    description:
      'The ultimate luxury timepiece combining Swiss engineering with contemporary design. Features a complete mechanical movement with visible components.',
    specs: {
      movement: 'Automatic Mechanical (In-House)',
      caseSize: '42mm Diameter',
      caseMaterial: '18K White Gold / Stainless Steel',
      water_resistance: '300m (1000ft)',
      crystal: 'Sapphire Dome (Domed, AR-Coated)',
      dial: 'Luminous White with Gold Markers',
      strap: 'Two-tone Integrated Bracelet',
      power_reserve: '72 hours',
      functions: ['Date Window', 'GMT Hand', 'Chronograph', 'Moon Phase'],
    },
    features: [
      'Visible Rotor and Escapement',
      'Gold Bezel with Diving Numbers',
      'Crown Guards',
      'Sapphire Crystal Window',
      'Precision Adjusted Movement',
      'Anti-Reflective Coating',
    ],
    availability: 'limited',
    rating: 4.9,
    reviews: 247,
    reviewList: defaultReviews,
    isNew: true,
    isBestseller: true,
    createdAt: '2026-01-10',
    shippingInfo: 'Complimentary white-glove delivery within 5–7 business days. International shipping available.',
  },
  {
    id: 'prestige-classic',
    name: 'Avior Prestige Classic',
    collection: 'Prestige',
    category: 'dress',
    price: 9800,
    image: '/watches/prestige-classic.svg',
    images: ['/watches/prestige-classic.svg', '/watches/prestige-classic-2.svg', '/watches/prestige-classic-3.svg'],
    description:
      'The timeless classic with refined elegance. A dress watch suitable for any occasion with exceptional precision.',
    specs: {
      movement: 'Automatic Mechanical',
      caseSize: '40mm Diameter',
      caseMaterial: '18K Gold',
      water_resistance: '100m (330ft)',
      crystal: 'Sapphire (Flat, AR-Coated)',
      dial: 'Silver with Applied Indices',
      strap: 'Leather Alligator Strap',
      power_reserve: '48 hours',
      functions: ['Date Window', 'Small Seconds', 'Power Reserve Indicator'],
    },
    features: [
      'Thin Case Design',
      'Guilloche Pattern Dial',
      'Gold Hands',
      'Anti-Reflective Coating',
      'Quick-Change Strap System',
      'COSC Certified',
    ],
    availability: 'in_stock',
    rating: 4.8,
    reviews: 189,
    reviewList: defaultReviews,
    isNew: false,
    isBestseller: true,
    createdAt: '2025-09-15',
    shippingInfo: 'Express delivery within 3–5 business days. Signature required upon receipt.',
  },
  {
    id: 'sports-infinity',
    name: 'Avior Sports Infinity',
    collection: 'Sports',
    category: 'sport',
    price: 8500,
    image: '/watches/sports-infinity.svg',
    images: ['/watches/sports-infinity.svg', '/watches/sports-infinity-2.svg', '/watches/sports-infinity-3.svg'],
    description: 'Built for adventure. A robust sports watch with cutting-edge materials and extreme durability.',
    specs: {
      movement: 'Automatic Mechanical',
      caseSize: '44mm Diameter',
      caseMaterial: 'Titanium with Ceramic Bezel',
      water_resistance: '500m (1640ft)',
      crystal: 'Sapphire (Scratch-Resistant)',
      dial: 'Matte Black with Lume Markers',
      strap: 'Rubber Strap with Titanium Buckle',
      power_reserve: '60 hours',
      functions: ['Date Window', 'Chronograph', 'Dive Timer', 'Compass'],
    },
    features: [
      'Helium Escape Valve',
      'Rotating Bezel',
      'Screw-Down Crown',
      'Military-Grade Materials',
      'Shock Resistant',
      'GPS Synchronized',
    ],
    availability: 'in_stock',
    rating: 4.7,
    reviews: 312,
    reviewList: defaultReviews,
    isNew: false,
    isBestseller: true,
    createdAt: '2025-08-01',
    shippingInfo: 'Standard delivery within 5–7 business days. Free returns within 30 days.',
  },
  {
    id: 'elegant-rose',
    name: 'Avior Elegant Rose',
    collection: 'Heritage',
    category: 'dress',
    price: 11200,
    image: '/watches/elegant-rose.svg',
    images: ['/watches/elegant-rose.svg', '/watches/elegant-rose-2.svg', '/watches/elegant-rose-3.svg'],
    description: 'Rose gold elegance meets modern innovation. A watch that captures hearts and moments.',
    specs: {
      movement: 'Automatic Mechanical',
      caseSize: '36mm Diameter',
      caseMaterial: '18K Rose Gold',
      water_resistance: '50m (164ft)',
      crystal: 'Sapphire (Thin Profile)',
      dial: 'Rose Champagne with Diamond Indices',
      strap: 'Rose Gold Bracelet with Safety Lock',
      power_reserve: '42 hours',
      functions: ['Date Window', 'Second Time Zone', 'Power Reserve'],
    },
    features: [
      'Diamond Set Bezel (12 Diamonds)',
      'Mother of Pearl Dial',
      'Gold Hands with Lume',
      'Elegant Case Shape',
      'Adjustable Bracelet',
      'Certificate of Authenticity',
    ],
    availability: 'limited',
    rating: 4.9,
    reviews: 154,
    reviewList: defaultReviews,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-02-01',
    shippingInfo: 'Complimentary insured delivery. Certificate of authenticity included.',
  },
  {
    id: 'marine-blue',
    name: 'Avior Marine Blue',
    collection: 'Sports',
    category: 'diver',
    price: 7900,
    image: '/watches/marine-blue.svg',
    images: ['/watches/marine-blue.svg', '/watches/marine-blue-2.svg', '/watches/marine-blue-3.svg'],
    description: 'Deep ocean inspiration meets precise craftsmanship. Perfect for water enthusiasts.',
    specs: {
      movement: 'Automatic Mechanical',
      caseSize: '41mm Diameter',
      caseMaterial: 'Stainless Steel with Blue DLC',
      water_resistance: '300m (1000ft)',
      crystal: 'Sapphire (Domed)',
      dial: 'Deep Blue Sunburst',
      strap: 'Rubber Strap or Steel Bracelet',
      power_reserve: '55 hours',
      functions: ['Date Window', 'Dive Bezel', 'GMT', 'Chronograph'],
    },
    features: [
      'Blue Hands and Markers',
      'Rotating Dive Bezel',
      'Screw-Down Crown',
      'Luminous Dial',
      'Water Resistant Crown',
      'Swiss Movement',
    ],
    availability: 'in_stock',
    rating: 4.8,
    reviews: 278,
    reviewList: defaultReviews,
    isNew: false,
    isBestseller: false,
    createdAt: '2025-10-20',
    shippingInfo: 'Standard delivery within 5–7 business days.',
  },
  {
    id: 'heritage-vintage',
    name: 'Avior Heritage Vintage',
    collection: 'Heritage',
    category: 'dress',
    price: 10500,
    image: '/watches/heritage-vintage.svg',
    images: ['/watches/heritage-vintage.svg', '/watches/heritage-vintage-2.svg', '/watches/heritage-vintage-3.svg'],
    description: 'Retro-inspired design with modern reliability. A tribute to classic watchmaking.',
    specs: {
      movement: 'Automatic Mechanical',
      caseSize: '38mm Diameter',
      caseMaterial: 'Stainless Steel / Bronze',
      water_resistance: '100m (330ft)',
      crystal: 'Acrylic (Vintage Style)',
      dial: 'Cream with Radium-style Markers',
      strap: 'Vintage Leather Strap',
      power_reserve: '50 hours',
      functions: ['Date Window', 'Small Seconds'],
    },
    features: [
      'Retro Case Design',
      'Onion Crown',
      'Applied Indices',
      'Aged Finish',
      'Mechanical Hands',
      'Vintage Packaging',
    ],
    availability: 'preorder',
    rating: 4.7,
    reviews: 98,
    reviewList: defaultReviews,
    isNew: true,
    isBestseller: false,
    createdAt: '2026-03-01',
    shippingInfo: 'Pre-order ships within 8–12 weeks. Deposit required at checkout.',
  },
];

export function getWatchById(id: string): Watch | undefined {
  return watches.find((watch) => watch.id === id);
}

export function getWatchesByCollection(collection: string): Watch[] {
  return watches.filter((watch) => watch.collection === collection);
}

export function getAllCollections(): string[] {
  return [...new Set(watches.map((watch) => watch.collection))];
}

export function getRelatedWatches(watchId: string, limit = 3): Watch[] {
  const watch = getWatchById(watchId);
  if (!watch) return [];
  return watches.filter((w) => w.id !== watchId && w.collection === watch.collection).slice(0, limit);
}

export function getPriceRange(): { min: number; max: number } {
  const prices = watches.map((w) => w.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
