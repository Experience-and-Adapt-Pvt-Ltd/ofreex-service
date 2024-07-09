"use client";

import { useRouter } from "next/navigation";

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
  onClick?: any;
  visible: boolean;
  mobileView: boolean;
}

//To Prevent From Selecting Text
const noselect: React.CSSProperties = {
  WebkitUserSelect: 'none', 
  MozUserSelect: 'none', 
  msUserSelect: 'none', 
  userSelect: 'none' 
};

const CategoryBox: React.FC<CategoryBoxProps> = ({
  id,
  categoryIcon,
  label,
  selected,
  subCategories,
  onMouseEnter, 
  onMouseLeave,
  visible,
  mobileView
}) => {
  const router = useRouter();

  const handleCategoryClick = () => {
    router.push(`/?category=${id}`);
  }

  const handleSubCategoryClick = (subCategoryId: string) => {
    router.push(`/?category=${id}&subcategory=${subCategoryId}`);
  }



  return (
    <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`relative inline-block left-5 border border-gray-300 rounded-lg shadow-sm ${visible === true ? 'bg-white' : 'bg-gray-300'} py-2 px-4 cursor-pointer`}
    style={noselect}
    onClick={mobileView === true && visible === true ? handleCategoryClick : () => {}}
    >
      <div className="flex justify-center items-center">

      <img src={categoryIcon} alt={`${label} icon`} className="h-[50px] w-[60px]" />
      </div>
    <div
      className={`inline-flex cursor-pointer justify-center w-full rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      aria-haspopup="true"
      style={noselect}
    >
      {label}
    </div>
    {selected && (
     <div className="origin-top-right absolute w-32 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
        {subCategories.map(subCategory => (
          <div
            key={subCategory.id}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            role="menuitem"
            onClick={() => handleSubCategoryClick(subCategory.id)}
            style={noselect}
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
