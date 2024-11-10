// BLOG INTERFACE
interface Post {
  _id: string;
  title: string;
  body: string;
  exerpt: string;
  author: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  _updatedAt: any;
  mainImage: any;

}

interface Category {
  title: string;
}

export type {
    Post,
    Category
}
