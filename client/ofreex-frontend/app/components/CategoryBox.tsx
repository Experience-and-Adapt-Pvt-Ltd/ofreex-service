"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface CategoryBoxProps {
  categoryIcon: string;
  label: string;
  selected?: boolean;
  id: string;
  subCategories: {
    id: string;
    label: string;
  }[];
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  id,
  categoryIcon,
  label,
  selected,
  subCategories,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSubCategorySelect = (event: any, subCategory: string) => {
    event.stopPropagation();
    console.log(`category id: ${id}, subcategory id: ${subCategory}`);

    const newUrl = `/?category=${id}&subCategory=${subCategory}`;
    console.log(`Navigating to URL: ${newUrl}`);
    router.push(newUrl);
    // close the dropdown when a subcategory is selected
    setIsOpen(false);
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
    <div onClick={toggleDropdown} className="relative cursor-pointer flex flex-col items-center py-2 px-4">
      <img src={categoryIcon} alt="category icon" className="h-5 mb-2"/>
      <div className="font-medium text-sm">{label}</div>
      {isOpen && (
        <div
          className="absolute rounded-sm z-10 bg-white dark:bg-black shadow-md w-[40vw] md:w-3/4 right-0 top-14 md:top-12 text-sm"
          onMouseLeave={() => setIsOpen(false)} // Optionally close the dropdown on mouse leave
        >
          {subCategories.map((subCategory) => (
            <div
              key={subCategory.id}
              onClick={(event) => handleSubCategorySelect(event, subCategory.id)}
              className="flex flex-col cursor-pointer my-4 px-3 pt-1"
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
