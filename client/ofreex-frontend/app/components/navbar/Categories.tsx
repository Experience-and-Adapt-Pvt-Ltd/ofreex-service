"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { SafeCategory } from "@/app/types";
import { useEffect, useState } from "react";
import Container from "../Container";
import CategoryBox from "../CategoryBox";

interface CategoryProps {
  categoriesProps: SafeCategory[] | null;
}

interface SubCategory {
  id: string;
  label: string;
}

interface Category {
  label: string;
  subCategories: SubCategory[];
}

const Categories: React.FC<CategoryProps> = ({ categoriesProps }) => {
  let categories = categoriesProps;
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function handleRezise() {
      setIsMobileView(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleRezise);
    handleRezise();

    return () => {
      window.removeEventListener("resize", handleRezise);
    };
  }, []);

  const handleMouseEnterCategory = (categoryId: string) => {
    if (!isMobileView) {
      setOpenCategoryId(categoryId);
    }
  };

  const handleMouseLeaveCategory = () => {
    if (!isMobileView) {
      setOpenCategoryId(null);
    }
  };

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          flex flex-row space-x-20 py-4 overflow-auto sm:overflow-visible scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-100
        "
      >
        {categories &&
          categories.map((item) => (
            <CategoryBox
              id={item.id}
              key={item.label}
              label={item.label}
              categoryIcon={item.icon}
              selected={openCategoryId === item.id}
              subCategories={item.subCategories}
              {...(!isMobileView && {
                onMouseEnter: () => handleMouseEnterCategory(item.id),
                onMouseLeave: () => handleMouseLeaveCategory(),
              })}
            />
          ))}
      </div>
    </Container>
  );
};

export default Categories;
