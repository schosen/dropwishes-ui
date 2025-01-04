import { StaticImageData } from "next/image";

// WISHLIST INTERFACE
interface Wishlist {
  id: number;
  title: string;
  description: string;
  occasion_date: string | null;
  address: string;
  products: any[]; // should be Product[];
}

// FORM DATA INTERFACE
interface FormData {
  wishlist: Wishlist;
}

// interface WishlistIds {
//     wishlistIds: string[]
// }

// USER WISHLISTS
interface UserWishlists {
  wishlistData: Wishlist[];
}

// PRODUCT INTERFACE
interface Product {
  id: string;
  name: string;
  priority?: string;
  price: number;
  notes?: string;
  link?: string;
  image: string | null;
}


interface AffiliateProduct {
  id: number;
  name: string;
  price: number;
  image: StaticImageData | string;
  description: string;
  category: string;
  tags: string[];
  link: string;
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
  rating?: string;
  numberOfReviews?: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  thumbnail?: StaticImageData | string;
  color?: string;
  featuredImage: StaticImageData | string;
}


export type {
  Wishlist,
  FormData,
  Product,
  AffiliateProduct,
  UserWishlists,
//   WishlistIds
}
