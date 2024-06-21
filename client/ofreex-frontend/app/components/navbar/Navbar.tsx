"use client";
import { SafeCategory, SafeSeller, SafeUser } from "@/app/types";

import Categories from "./Categories";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Search from "./Search";
import { useEffect, useState } from "react";
import MobileSearch from "./MobileSearch";

interface NavbarProps {
  currentUser?: SafeUser | null;
  currentSeller?: SafeSeller | null;
  categories: SafeCategory[] | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentSeller,
  categories,
}) => {
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileView(true);
    }
  }, []);
  return (
    <nav className="text-black p-2 bg-slate-100">
      <div className="container mx-auto flex justify-between items-center">
          <Logo />
        {/* <div className="mr-2 ml-2">location</div> */}
        {!isMobileView && <Search />}
        <UserMenu currentUser={currentUser} currentSeller={currentSeller} />
        </div>
        {isMobileView && (
            <MobileSearch />
        )}
      <Categories categoriesProps={categories} />
    </nav>
  );
};

export default Navbar;
