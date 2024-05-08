'use client';

import Link from "next/link";

interface MenuItemProps {
  href: string;
  onClick?: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  onClick,
  label
}) => {
  return ( 
    <Link
      href={href}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
      "
      onClick={onClick}
    >
      {label}
    </Link>
   );
}
 
export default MenuItem;