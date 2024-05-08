'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { SafeCategory } from "@/app/types";
import CategoryBox from "../CategoryBox";
import Container from '../Container';


export let categories: SafeCategory[] | null = [];
interface CategoryProps {
  categoriesProps: SafeCategory[] | null;
}

const Categories: React.FC<CategoryProps> = ({ categoriesProps }) => {
  categories = categoriesProps;
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          md:pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories ? categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon || null}
            selected={category === item.label}
          />
        )) : null}
      </div>
    </Container>
  );
}

export default Categories;