'use client';

import { useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPosts,
  postsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalPosts / postsPerPage);


    // // Handle page change and update query params
  // const handlePageChange = async (page: number) => {
  //   let query = selectedCategory == null ? new URLSearchParams({page: page}).toString() : new URLSearchParams({ category: selectedCategory, page: page}).toString()

  //   router.push(`/blog?${query}`);
  //   // await loadPosts(page, selectedCategory || undefined);
  // };

  const generatePageButtons = () => {
    const pages = [];
    pages.push(1); // First page

    if (currentPage > 3) pages.push('...'); // Ellipsis if necessary

    for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('...'); // Ellipsis if necessary
    if (totalPages > 1) pages.push(totalPages); // Last page

    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      {generatePageButtons().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ) : (
          <span key={index}>...</span>
        )
      )}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
