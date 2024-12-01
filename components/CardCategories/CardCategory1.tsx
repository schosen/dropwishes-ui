import React, { FC } from "react";
import NcImage from "../shared/NcImage";
import Link from "next/link";
import { StaticImageData } from "next/image";

export interface CardCategory1Props {
  className?: string;
  size?: "large" | "normal";
  featuredImage?: string | StaticImageData;
  name?: string;
  desc?: string;
  onCategoryChange?: (category: string) => void;
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  name = "",
  desc = "",
  featuredImage = "",
  onCategoryChange
}) => {
  if (!onCategoryChange) {
  return (
      <>
    <Link
      href={'/blog'}
      className={`nc-CardCategory1 flex items-center ${className}`}
    >
      <NcImage
        alt=""
        containerClassName={`flex-shrink-0 relative ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg mr-4 overflow-hidden`}
        src={featuredImage || "https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
        sizes="(max-width: 640px) 100vw, 40vw"
        fill
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
        >
          {name || "No name"}
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {desc}
        </span>
      </div>
    </Link>
    </>
    )

  } else {

  return (
      <>
    <button
      onClick={() => onCategoryChange(name)}
      className={`nc-CardCategory1 flex items-center ${className}`}
    >
      <NcImage
        alt=""
        containerClassName={`flex-shrink-0 relative ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg mr-4 overflow-hidden`}
        src={featuredImage || "https://images.pexels.com/photos/6168061/pexels-photo-6168061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
        sizes="(max-width: 640px) 100vw, 40vw"
        fill
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
        >
          {name || "No name"}
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {desc}
        </span>
      </div>
    </button>
    </>
    )
  }
};

export default CardCategory1;
