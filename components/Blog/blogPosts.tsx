"use client"
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchBlogPosts, urlFor} from '@/services/sanityClient';
import { Post, Category } from "@/interfaces/blog";
import Pagination from './postPagination';
import Link from 'next/link';
import Image from 'next/image';


interface BlogPageProps {
  initialPosts: Post[];
  categories: Category[];
  totalPosts: number;
  postsPerPage: number;
}

export default function BlogPosts({ initialPosts, categories, totalPosts, postsPerPage}: BlogPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const currentPage = parseInt(searchParams.get('page') || '1');
  const selectedCategory = searchParams.get('category') || '';

  const loadPosts = async (page: number, category?: string) => {
    const newPosts = await fetchBlogPosts(category, page, postsPerPage);
    setPosts(newPosts);
  };

  // Handle category change and update query params
  const handleCategoryChange = async (category: string) => {
    const params = new URLSearchParams(searchParams as any);
    params.set('category', category);
    params.set('page', '1'); // Reset to first page
    router.push(`?${params.toString()}`);
    loadPosts(1, category);
  };

  // handle page change and update query params
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set('page', page.toString());
    if (selectedCategory) params.set('category', selectedCategory);
    router.push(`?${params.toString()}`);
    loadPosts(page, selectedCategory);
  };


  useEffect(() => {
    loadPosts(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);


  return (
    <div>
      <h1>Blog</h1>

      {/* Category Filter */}
      <div>
        <Link href="/blog" >
          All Posts
        </Link>
        {categories.map((category) => (
          <li key={category._id}>
          <button
            key={category._id}
            onClick={() => handleCategoryChange(category.title)}
          >
            {category.title}
          </button>
          </li>
        ))}
      </div>

      {/* Blog Posts */}
      <ul>
        {posts.length > 0 && posts.map(
          ({ _id, mainImage, title = '', slug = '', _createdAt, excerpt = ''}) =>
          slug && (
            <li key={_id}>
              <Link href={`/blog/${encodeURIComponent(slug.current)}`}>
                {title}
                <Image src={urlFor(mainImage)
                .width(320)
                .url()}
                alt="blog image"
                width={320}
                height={240}
                />
              </Link>{' '}
              <p>{excerpt}{" ...Read More"}</p>
              ({new Date(_createdAt).toDateString()})
            </li>
          )
        )}

      </ul>


      {/* Pagination */}
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

    </div>
  );
}
