"use client"

import React, { FC } from "react";
import Heading from "../Heading/Heading";
import Pagination from "@/components/shared/Pagination";
import ButtonPrimary from "@/components/shared/button/ButtonPrimary";
import WidgetCategories from "./WidgetCategories";
import WidgetPosts from "./WidgetPosts";
import Card3 from "./Card3";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchBlogPosts, urlFor} from '@/services/sanityClient';
import { Post, Category } from "@/interfaces/blog";
// import Pagination from './postPagination';
import Link from 'next/link';
import Image from 'next/image';

//
export interface SectionLatestPostsProps {
  className?: string;
  postCardName?: "card3";
  initialPosts: Post[];
  categories: Category[];
  totalPosts: number;
  postsPerPage: number;
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  postCardName = "card3",
  className = "",
  initialPosts,
  categories,
  totalPosts,
  postsPerPage,
}) => {
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
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
          <Heading>Latest Articles 🎈</Heading>
          <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
            {posts.length > 0 && posts.map(
              ({ _id, mainImage, title = '', slug, name , excerpt = '', categories, _createdAt}) => (
              slug &&
              <Card3
                key={_id}
                className=""
                title={title}
                name={name}
                mainImage={mainImage}
                slug={slug.current}
                exerpt={excerpt}
                categories={categories}
                _createdAt={_createdAt}
              />
            ))}
          </div>
          <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            {/* <ButtonPrimary>Show me more</ButtonPrimary> */}
          </div>
        </div>
        <div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
          <WidgetCategories />
          <WidgetPosts />
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
