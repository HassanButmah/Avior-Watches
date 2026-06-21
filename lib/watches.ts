export interface Watch {
  id: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  specs: {
    movement: string;
    caseSize: string;
    caseMaterial: string;
    water_resistance: string;
    crystal: string;
    dial: string;
    strap: string;
    power_reserve: string;
    functions: string[];
  };
  features: string[];
  availability: "in_stock" | "limited" | "preorder";
  rating: number;
  reviews: number;
}

export const watches: Watch[] = [
  {
    id: "prestige-pro",
    name: "Avior Prestige Pro",
    collection: "Prestige",
    price: 12500,
    image: "/frames/frame_0060.jpg",
    images: ["/frames/frame_0060.jpg", "/frames/frame_0061.jpg", "/frames/frame_0062.jpg"],
    description: "The ultimate luxury timepiece combining Swiss engineering with contemporary design. Features a complete mechanical movement with visible components.",
    specs: {
      movement: "Automatic Mechanical (In-House)",
      caseSize: "42mm Diameter",
      caseMaterial: "18K White Gold / Stainless Steel",
      water_resistance: "300m (1000ft)",
      crystal: "Sapphire Dome (Domed, AR-Coated)",
      dial: "Luminous White with Gold Markers",
      strap: "Two-tone Integrated Bracelet",
      power_reserve: "72 hours",
      functions: ["Date Window", "GMT Hand", "Chronograph", "Moon Phase"]
    },
    features: [
      "Visible Rotor and Escapement",
      "Gold Bezel with Diving Numbers",
      "Crown Guards",
      "Sapphire Crystal Window",
      "Precision Adjusted Movement",
      "Anti-Reflective Coating"
    ],
    availability: "limited",
    rating: 4.9,
    reviews: 247
  },
  {
    id: "prestige-classic",
    name: "Avior Prestige Classic",
    collection: "Prestige",
    price: 9800,
    image: "/frames/frame_0050.jpg",
    images: ["/frames/frame_0050.jpg", "/frames/frame_0051.jpg", "/frames/frame_0052.jpg"],
    description: "The timeless classic with refined elegance. A dress watch suitable for any occasion with exceptional precision.",
    specs: {
      movement: "Automatic Mechanical",
      caseSize: "40mm Diameter",
      caseMaterial: "18K Gold",
      water_resistance: "100m (330ft)",
      crystal: "Sapphire (Flat, AR-Coated)",
      dial: "Silver with Applied Indices",
      strap: "Leather Alligator Strap",
      power_reserve: "48 hours",
      functions: ["Date Window", "Small Seconds", "Power Reserve Indicator"]
    },
    features: [
      "Thin Case Design",
      "Guilloche Pattern Dial",
      "Gold Hands",
      "Anti-Reflective Coating",
      "Quick-Change Strap System",
      "COSC Certified"
    ],
    availability: "in_stock",
    rating: 4.8,
    reviews: 189
  },
  {
    id: "sports-infinity",
    name: "Avior Sports Infinity",
    collection: "Sports",
    price: 8500,
    images: ["/frames/frame_0040.jpg", "/frames/frame_0041.jpg", "/frames/frame_0042.jpg"],
    image: "/frames/frame_0040.jpg",
    description: "Built for adventure. A robust sports watch with cutting-edge materials and extreme durability.",
    specs: {
      movement: "Automatic Mechanical",
      caseSize: "44mm Diameter",
      caseMaterial: "Titanium with Ceramic Bezel",
      water_resistance: "500m (1640ft)",
      crystal: "Sapphire (Scratch-Resistant)",
      dial: "Matte Black with Lume Markers",
      strap: "Rubber Strap with Titanium Buckle",
      power_reserve: "60 hours",
      functions: ["Date Window", "Chronograph", "Dive Timer", "Compass"]
    },
    features: [
      "Helium Escape Valve",
      "Rotating Bezel",
      "Screw-Down Crown",
      "Military-Grade Materials",
      "Shock Resistant",
      "GPS Synchronized"
    ],
    availability: "in_stock",
    rating: 4.7,
    reviews: 312
  },
  {
    id: "elegant-rose",
    name: "Avior Elegant Rose",
    collection: "Heritage",
    price: 11200,
    images: ["/frames/frame_0030.jpg", "/frames/frame_0031.jpg", "/frames/frame_0032.jpg"],
    image: "/frames/frame_0030.jpg",
    description: "Rose gold elegance meets modern innovation. A watch that captures hearts and moments.",
    specs: {
      movement: "Automatic Mechanical",
      caseSize: "36mm Diameter",
      caseMaterial: "18K Rose Gold",
      water_resistance: "50m (164ft)",
      crystal: "Sapphire (Thin Profile)",
      dial: "Rose Champagne with Diamond Indices",
      strap: "Rose Gold Bracelet with Safety Lock",
      power_reserve: "42 hours",
      functions: ["Date Window", "Second Time Zone", "Power Reserve"]
    },
    features: [
      "Diamond Set Bezel (12 Diamonds)",
      "Mother of Pearl Dial",
      "Gold Hands with Lume",
      "Elegant Case Shape",
      "Adjustable Bracelet",
      "Certificate of Authenticity"
    ],
    availability: "limited",
    rating: 4.9,
    reviews: 154
  },
  {
    id: "marine-blue",
    name: "Avior Marine Blue",
    collection: "Sports",
    price: 7900,
    images: ["/frames/frame_0070.jpg", "/frames/frame_0071.jpg", "/frames/frame_0072.jpg"],
    image: "/frames/frame_0070.jpg",
    description: "Deep ocean inspiration meets precise craftsmanship. Perfect for water enthusiasts.",
    specs: {
      movement: "Automatic Mechanical",
      caseSize: "41mm Diameter",
      caseMaterial: "Stainless Steel with Blue DLC",
      water_resistance: "300m (1000ft)",
      crystal: "Sapphire (Domed)",
      dial: "Deep Blue Sunburst",
      strap: "Rubber Strap or Steel Bracelet",
      power_reserve: "55 hours",
      functions: ["Date Window", "Dive Bezel", "GMT", "Chronograph"]
    },
    features: [
      "Blue Hands and Markers",
      "Rotating Dive Bezel",
      "Screw-Down Crown",
      "Luminous Dial",
      "Water Resistant Crown",
      "Swiss Movement"
    ],
    availability: "in_stock",
    rating: 4.8,
    reviews: 278
  },
  {
    id: "heritage-vintage",
    name: "Avior Heritage Vintage",
    collection: "Heritage",
    images: ["/frames/frame_0020.jpg", "/frames/frame_0021.jpg", "/frames/frame_0022.jpg"],
    price: 10500,
    image: "/frames/frame_0020.jpg",
    description: "Retro-inspired design with modern reliability. A tribute to classic watchmaking.",
    specs: {
      movement: "Automatic Mechanical",
      caseSize: "38mm Diameter",
      caseMaterial: "Stainless Steel / Bronze",
      water_resistance: "100m (330ft)",
      crystal: "Acrylic (Vintage Style)",
      dial: "Cream with Radium-style Markers",
      strap: "Vintage Leather Strap",
      power_reserve: "50 hours",
      functions: ["Date Window", "Small Seconds"]
    },
    features: [
      "Retro Case Design",
      "Onion Crown",
      "Applied Indices",
      "Aged Finish",
      "Mechanical Hands",
      "Vintage Packaging"
    ],
    availability: "preorder",
    rating: 4.7,
    reviews: 98
  }
];

export function getWatchById(id: string): Watch | undefined {
  return watches.find(watch => watch.id === id);
}

export function getWatchesByCollection(collection: string): Watch[] {
  return watches.filter(watch => watch.collection === collection);
}

export function getAllCollections(): string[] {
  return [...new Set(watches.map(watch => watch.collection))];
}
