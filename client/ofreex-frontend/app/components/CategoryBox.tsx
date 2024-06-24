"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CategoryBoxProps {
  categoryIcon: string;
  label: string;
  selected?: boolean;
  id: string;
  subCategories: {
    id: string;
    label: string;
  }[];
  onMouseEnter?: any;
  onMouseLeave?: any;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  id,
  categoryIcon,
  label,
  selected,
  subCategories,
  onMouseEnter, 
  onMouseLeave,
}) => {
  const router = useRouter();


  const handleSubCategorySelect = (event: any, subCategory: string) => {
    event.stopPropagation();
    console.log(`category id: ${id}, subcategory id: ${subCategory}`);

    const newUrl = `/?category=${id}&subCategory=${subCategory}`;
    console.log(`Navigating to URL: ${newUrl}`);
    router.push(newUrl);
  };

  return (
    <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="relative inline-block text-left"
  >
    <div
      className="inline-flex cursor-pointer justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-haspopup="true"
    >
      {label}
      <img src={categoryIcon} alt={`${label} icon`} className="ml-2 -mr-1 h-5 w-5" />
    </div>
    {selected && (
     <div className="origin-top-right absolute mt-1 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
        {subCategories.map(subCategory => (
          <div
            key={subCategory.id}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            role="menuitem"
            onClick={(event) => handleSubCategorySelect(event, subCategory.id)}
          >
            {subCategory.label}
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default CategoryBox;
