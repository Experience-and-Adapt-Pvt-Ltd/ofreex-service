'use client';

import Link from "next/link";

interface MenuItemProps {
  href: string;
  onClick?: () => void;
  label: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  onClick,
  label,
  className
}) => {
  return ( 
    <Link
      href={href}
      className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${className}`}
      onClick={onClick}
    >
      {label}
    </Link>
   );
}
 
export default MenuItem;