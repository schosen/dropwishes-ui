import React, { FC } from "react";
import NcImage from "../shared/NcImage";
import SocialsShare from "../shared/social/SocialsShare";
// import { imgHigtQualitys } from "@/contains/fakeData";
import PostCardMeta from "../shared/PostCardMeta";
import Link from "next/link";

export interface Card12Props {
  className?: string;
}

const Card12: FC<Card12Props> = ({ className = "h-full" }) => {
  return (
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      <Link
        href={"/blog-single"}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"
      >
        <NcImage
          src="https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          containerClassName="absolute inset-0"
          alt={"title"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>

      <SocialsShare className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" />

      <div className=" mt-8 pr-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
        >
          <Link
            href={"/blog-single"}
            className="line-clamp-2 capitalize"
            title={"title"}
          >
            Dummy Data
          </Link>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            vero perspiciatis ullam ea? Nihil accusamus similique debitis
            tempore mollitia? Aperiam.
          </span>
        </span>
        <PostCardMeta className="mt-5" />
      </div>
    </div>
  );
};

export default Card12;
