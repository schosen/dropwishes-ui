
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


export type {
  Wishlist,
  FormData,
  Product,
  UserWishlists,
//   WishlistIds
}
