import { SafeCategory, SafeSeller, SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

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
    <nav className="bg-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            {/* Increase the size of search bar and center it */}
            <input
              type="search"
              placeholder="Search"
              className="px-4 py-2 w-40 sm:w-1/3 border rounded-md"
            />
          </div>
          <div className="flex justify-end items-center">
            <UserMenu currentUser={currentUser} currentSeller={currentSeller} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Categories categoriesProps={categories} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
