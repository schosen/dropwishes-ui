import React, { FC } from "react";
import NcImage from "../shared/NcImage";
import product1 from "@/public/images/products/1.png"
// import explore1Svg from "@/images/collections/explore1.svg";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export interface CardCategory4Props {
  className?: string;
  featuredImage?: StaticImageData | string;
  bgSVG?: string;
  title: string;
  desc: string;
  uuid: string
  color?: string;
  count?: number;
  editDelete?: any;
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  featuredImage = product1,
  bgSVG = "",
  title,
  desc,
  uuid,
  color = "bg-rose-50",
  editDelete,
  count,
}) => {
  return (
    <div
      className={`nc-CardCategory4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80">
          <Image src={bgSVG} alt="" />
        </div>

        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <NcImage
              alt=""
              src={featuredImage}
              containerClassName={`w-20 h-20 rounded-full overflow-hidden z-0 ${color}`}
              width={80}
              height={80}
            />
            { editDelete && editDelete }
            {/* <span className="text-xs text-slate-700 dark:text-neutral-300 font-medium">
              {count} products
            </span> */}
          </div>

          <div className="">
            <span
              className={`block mb-2 text-sm text-slate-500 dark:text-slate-400`}
            >
              {desc}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-semibold`}>{title}</h2>
          </div>

          <Link
            href={"/collection"}
            className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors"
          >
            <span>View All</span>
            <ArrowRightIcon className="w-4 h-4 ml-2.5" />
          </Link>
        </div>
      </div>

      <Link href={`/wishlists/${uuid}`}></Link>
    </div>
  );
};

export default CardCategory4;
