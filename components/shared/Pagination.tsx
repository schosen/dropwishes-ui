import { CustomLink } from "@/interfaces/types";
import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";

export interface PaginationProps {
  className?: string;
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = (
  { className = "",
    totalPosts,
    postsPerPage,
    currentPage,
    onPageChange
  }) => {

  const totalPages = Math.ceil(totalPosts / postsPerPage);

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

  let pages = generatePageButtons()
  let lastElement = pages.pop();

  const renderItem = (pag: string | number, index: number) => {
    if (currentPage === pag) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      typeof pag === 'number' ? (
      <button
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={() => onPageChange(pag)}
      >
        {pag}
      </button>) : (
          <span key={index} className="inline-flex w-8 h-11 items-center justify-center">...</span>
        )
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      <button className={`inline-flex w-28 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
      onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {generatePageButtons().map(renderItem)}

      <button className={`inline-flex w-20 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
      onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === lastElement}>
        Next
      </button>
    </nav>
  );
};

export default Pagination;
