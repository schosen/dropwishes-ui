"use client"
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchBlogPosts, urlFor} from '@/services/sanityClient';
import { Post, Category } from "@/interfaces/blog";
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
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Update state based on query params
  useEffect(() => {
    const page = parseInt(searchParams.get('page') as string) || 1;
    const category = (searchParams.get('category') as string) || null;
    setCurrentPage(page);
    setSelectedCategory(category);
    loadPosts(page, category);
  }, [searchParams.get('page'), searchParams.get('category')]);

  // Fetch posts when page or category changes
  const loadPosts = async (page: number, category?: string) => {
    const newPosts = await fetchBlogPosts(category, page, postsPerPage);
    setPosts(newPosts);
    setCurrentPage(page);
  };

  // Handle category change and update query params
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    const query = new URLSearchParams({ category: category, page: "1"}).toString();

    router.push(`/blog?${query}`);
    // await loadPosts(1, category);
  };

  // Handle page change and update query params
  const handlePageChange = async (page: number) => {
    const query = new URLSearchParams({ category: selectedCategory, page: page}).toString();
    router.push(`/blog?${query}`);
    // await loadPosts(page, selectedCategory || undefined);
  };

  // Render pagination buttons
  const renderPagination = () => {
    const pageNumbers = [];

    // First page button
    if (currentPage > 3) {
      pageNumbers.push(1);
      if (currentPage > 4) pageNumbers.push('...');
    }

    // Previous two pages
    for (let i = currentPage - 2; i < currentPage; i++) {
      if (i > 1) pageNumbers.push(i);
    }

    // Current page
    pageNumbers.push(currentPage);

    // Next two pages
    for (let i = currentPage + 1; i <= currentPage + 2; i++) {
      if (i < totalPages) pageNumbers.push(i);
    }

    // Last page button
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return (
      <div>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        {pageNumbers.map((num, index) =>
          num === '...' ? (
            <span key={index}>...</span>
          ) : (
            <button
              key={num}
              disabled={num === currentPage}
              onClick={() => handlePageChange(num as number)}
            >
              {num}
            </button>
          )
        )}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1>Blog</h1>

      {/* Category Filter */}
      <div>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryChange(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Blog Posts */}
      <ul>
        {posts.length > 0 && posts.map(
          ({ _id, mainImage, title = '', slug = '', _updatedAt, excerpt = ''}) =>
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
              ({new Date(_updatedAt).toDateString()})
            </li>
          )
        )}


      </ul>



      {/* Pagination */}
      {renderPagination()}

    </div>
  );
}
