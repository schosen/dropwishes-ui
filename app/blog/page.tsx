import {fetchBlogPosts, fetchCategories, fetchTotalPosts} from "@/services/sanityClient"
import BlogPosts from '@/components/Blog/blogPosts';
import { NextRequest, URLPattern } from 'next/server'


export default async function BlogPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {

  const { page = 1, category } = await searchParams
  const postsPerPage = 4;
  const initialPosts = await fetchBlogPosts(category, parseInt(page), postsPerPage);
  const categories = await fetchCategories();
  const totalPosts = await fetchTotalPosts(category);
  // console.log("PAGE: ", page)
  // console.log("CATEGORY: ", category)
  // console.log("CATEGORIES: ", categories)

  return (
    <div className='mt-48'>
      <BlogPosts
        initialPosts={initialPosts}
        categories={categories}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
      />
    </div>
  )
}

// export const revalidate = 60; // revalidate this page every 60 seconds

