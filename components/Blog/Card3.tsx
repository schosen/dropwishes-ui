import React, { FC } from "react";
import NcImage from "../shared/NcImage";
import Badge from "../shared/Badge";
import PostCardMeta from "../shared/PostCardMeta";
import Link from "next/link";

export interface Card3Props {
  className?: string;
}

const Card3: FC<Card3Props> = ({ className = "h-full" }) => {
  return (
    <div
      className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] group ${className}`}
      data-nc-id="Card3"
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-5 mb-4">
          <Badge name="Dummy Name" />
          <div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
            >
              <Link
                href={"/blog-single"}
                className="line-clamp-2 capitalize"
                title={"title"}
              >
                Dummy Title
              </Link>
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur, culpa?
              </span>
            </div>
          </div>
          <PostCardMeta />
        </div>
      </div>

      <div
        className={`block flex-shrink-0 sm:w-56 sm:ml-6 rounded-3xl overflow-hidden mb-5 sm:mb-0`}
      >
        <Link
          href={"/blog-single"}
          className={`block w-full h-0 aspect-h-9 sm:aspect-h-16 aspect-w-16 `}
        >
          <NcImage
            alt=""
            fill
            src="https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            containerClassName="absolute inset-0"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </Link>
      </div>
    </div>
  );
};

export default Card3;
