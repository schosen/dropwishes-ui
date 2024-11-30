import {fetchBlogPosts, fetchCategories, fetchTotalPosts} from "@/services/sanityClient"
import BlogPosts from '@/components/Blog/blogPosts';
import BgGlassmorphism from "@/components/shared/BgGlassmorphism";
import SectionAds from "@/components/Blog/SectionAds";
import SectionMagazine5 from "@/components/Blog/SectionMagazine5";
import SectionPromo2 from "@/components/shared/promo/SectionPromo2";
import SectionLatestPosts from "@/components/Blog/SectionLatestPosts";


export default async function BlogPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {

  const { page = 1, category } = await searchParams
  const postsPerPage = 6;
  const initialPosts = await fetchBlogPosts(category, parseInt(page), postsPerPage);
  const categories = await fetchCategories();
  const totalPosts = await fetchTotalPosts(category);
  // console.log("PAGE: ", page)
  // console.log("CATEGORY: ", category)
  // console.log("CATEGORIES: ", categories)

  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <BgGlassmorphism />
      <div className="container relative">
        <div className="pt-12 pb-16 lg:pb-28">
          {/* Can decide what to do with the below later */}
          {/* <SectionMagazine5 /> */}
        </div>


        {/* === SECTION 1 === */}
        <SectionAds />

        {/* === SECTION 8 === */}
        <SectionLatestPosts
          initialPosts={initialPosts}
          categories={categories}
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
         className="py-16 lg:py-28" />

        {/* === SECTION 1 === */}
        <SectionPromo2 className="pb-16 lg:pb-28" />

        <BlogPosts
          initialPosts={initialPosts}
          categories={categories}
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
        />
      </div>
    </div>
  )
}

// export const revalidate = 60; // revalidate this page every 60 seconds

