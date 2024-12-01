import React, { FC } from "react";
import Avatar from "./Avatar";
// import { _getPersonNameRd } from "@/contains/fakeData";
import Link from "next/link";

export interface PostCardMetaProps {
  className?: string;
  hiddenAvatar?: boolean;
  author?: string;
  _createdAt?: any;
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none",
  hiddenAvatar = false,
  author = "",
  _createdAt = "",
}) => {
  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 text-sm ${className}`}
      data-nc-id="PostCardMeta"
    >
      <Link
        href={"/blog"}
        className="flex-shrink-0 relative flex items-center space-x-2"
      >
        {!hiddenAvatar && (
          <Avatar radius="rounded-full" sizeClass={"h-7 w-7 text-sm"} userName={author} />
        )}
        <span className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {author}
        </span>
      </Link>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
          {new Date(_createdAt).toDateString()}
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;
