import React, { FC } from "react";
import NcImage from "../shared/NcImage";
import Badge from "../shared/Badge";
import PostCardMeta from "../shared/PostCardMeta";
import Link from "next/link";
import { urlFor } from '@/services/sanityClient';


export interface Card3Props {
  className?: string;
  title?: string;
  name?: string;
  mainImage?: any;
  slug?: string;
  exerpt?: any;
  categories?: any;
  _createdAt?: any;

}

const Card3: FC<Card3Props> = ({
  className = "h-full" ,
  title = '',
  name = 'admin',
  mainImage,
  slug = '',
  exerpt,
  categories,
  _createdAt
}) => {
  return (
    <div
      className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] group ${className}`}
      data-nc-id="Card3"
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-5 mb-4">
          <Badge name={categories[0]} />
          <div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
            >
              <Link
                href={`/blog/${encodeURIComponent(slug.current)}`}
                className="line-clamp-2 capitalize"
                title={slug.current}
              >
                {title}
              </Link>
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                {slug}
              </span>
            </div>
          </div>
          <PostCardMeta
            author={name}
            _createdAt={_createdAt}
          />
        </div>
      </div>

      <div
        className={`block flex-shrink-0 sm:w-56 sm:ml-6 rounded-3xl overflow-hidden mb-5 sm:mb-0`}
      >
        <Link
          href={`/blog/${encodeURIComponent(slug.current)}`}
          className={`block w-full h-0 aspect-h-9 sm:aspect-h-16 aspect-w-16 `}
        >
          <NcImage
            alt=""
            fill
            src={urlFor(mainImage)
                .width(320)
                .url()}
            containerClassName="absolute inset-0"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </Link>
      </div>
    </div>
  );
};

export default Card3;
