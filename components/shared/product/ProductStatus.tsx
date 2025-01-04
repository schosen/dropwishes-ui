import {
  NoSymbolIcon,
  // ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import React, { FC } from "react";
import IconDiscount from "../IconDiscount";

interface Props {
  status: string;
  className?: string;
}

const ProductStatus: FC<Props> = ({
  status,
  className = "absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300",
}) => {
  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
    if (status.toUpperCase() === "HIGH") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">priority</span>
        </div>
      );
    }
    if (status.toUpperCase() === "MEDIUM") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status.toUpperCase() === "LOW") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">{status}</span>
        </div>
      );
    }
    // if (status === "limited edition") {
    //   return (
    //     <div className={CLASSES}>
    //       <ClockIcon className="w-3.5 h-3.5" />
    //       <span className="ms-1 leading-none">{status}</span>
    //     </div>
    //   );
    // }
    return null;
  };

  return renderStatus();
};

export default ProductStatus;
