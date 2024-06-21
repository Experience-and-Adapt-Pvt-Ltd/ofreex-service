"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { SafeCategory } from "@/app/types";
import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { useState } from "react";

export let categories: SafeCategory[] | null = [];
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
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const handleMouseEnterCategory = (categoryId: any) => {
    setOpenCategoryId(categoryId);
  };

  const handleMouseLeaveCategory = () => {
    setOpenCategoryId(null);
  };

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          flex flex-row space-x-4 py-4
        "
      >
        {categories
          ? categories.map((item) => (
              <CategoryBox
                id={item.id}
                key={item.label}
                label={item.label}
                categoryIcon={item.icon}
                selected={openCategoryId === item.id}
                subCategories={item.subCategories}
                onMouseEnter={() => handleMouseEnterCategory(item.id)}
                onMouseLeave={handleMouseLeaveCategory}
              />
            ))
          : null}
      </div>
    </Container>
  );
};

export default Categories;
