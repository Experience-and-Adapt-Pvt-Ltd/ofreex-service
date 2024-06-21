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
  onMouseEnter: any;
  onMouseLeave: any;
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

  // const handleClick = useCallback(() => {
  //   let currentQuery = {};

  //   if (params) {
  //     currentQuery = qs.parse(params.toString());
  //   }

  //   const updatedQuery: any = {
  //     ...currentQuery,
  //     category: label,
  //   };

  //   if (params?.get("category") === label) {
  //     delete updatedQuery.category;
  //   }

  //   const url = qs.stringifyUrl(
  //     {
  //       url: "/",
  //       query: updatedQuery,
  //     },
  //     { skipNull: true }
  //   );

  //   router.push(url);
  // }, [label, router, params]);
  return (
    // <div onClick={toggleDropdown} className="relative cursor-pointer flex flex-col items-center py-2 px-4">
    //   <img src={categoryIcon} alt="category icon" className="h-5 mb-2"/>
    //   <div className="font-medium text-sm">{label}</div>
    //   {isOpen && (
    //     <div
    //       className="absolute rounded-sm z-10 bg-white dark:bg-black shadow-md w-[40vw] md:w-3/4 right-0 top-14 md:top-12 text-sm"
    //       onMouseLeave={() => setIsOpen(false)} // Optionally close the dropdown on mouse leave
    //     >
    //       {subCategories.map((subCategory) => (
    //         <div
    //           key={subCategory.id}
    //           onClick={(event) => handleSubCategorySelect(event, subCategory.id)}
    //           className="flex flex-col cursor-pointer my-4 px-3 pt-1"
    //         >
    //           {subCategory.label}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
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
      <div
        className="origin-top-right absolute mt-1 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
      >
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
