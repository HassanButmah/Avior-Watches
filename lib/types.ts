export type Category = 'watches' | 'bracelets' | 'accessories';

export interface Product {
  id: number;
  name: string;
  nameAr: string;
  category: Category | string;
  price: number;
  image: string;
  description: string;
  descriptionAr: string;
  features: string[];
  inStock: boolean;
}

export interface Settings {
  whatsappNumber: string;
  instagramHandle: string;
  usdToIls: number;
  freeShippingThreshold: number;
  announcementBar: {
    enabled: boolean;
    text: string;
  };
}

