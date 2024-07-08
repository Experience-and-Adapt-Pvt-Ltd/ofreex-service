"use client";
import { SafeCategory, SafeSeller, SafeUser } from "@/app/types";

import Categories from "./Categories";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Search from "./Search";
import Location from "./Location";

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
  return (
    <nav className="text-black p-2 bg-slate-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <div className="ml-2">
            <Location />
          </div>
        </div>
        <UserMenu currentUser={currentUser} currentSeller={currentSeller} />
      </div>
      <Search />
      <Categories categoriesProps={categories} />
    </nav>
  );
};

export default Navbar;
