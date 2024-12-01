import React, { FC } from "react";
import Image from "next/image";

export interface SectionAdsProps {
  className?: string;
}

const SectionAds: FC<SectionAdsProps> = ({ className = "" }) => {
  return (
    <a href="/#" className={`nc-SectionAds block w-full ${className}`}>
      <Image alt="ads" className="w-full" src="/images/ads.png" width={1280} height={188}/>
    </a>
  );
};

export default SectionAds;
