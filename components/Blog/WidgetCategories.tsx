import CardCategory1 from "@/components/CardCategories/CardCategory1";
import React, { FC } from "react";
import WidgetHeading1 from "./WidgetHeading1";

export interface WidgetCategoriesProps {
  className?: string;
  categories?: any;
  onCategoryChange?: (category: string) => void;
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  categories = [],
  onCategoryChange
}) => {
  return (
    <div
      className={`nc-WidgetCategories rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      <WidgetHeading1
        title="✨ Topics"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          <CardCategory1 className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          name="All Posts"/>
          {categories.map(({ _id, title}) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={_id}
              name={title}
              onCategoryChange={onCategoryChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
