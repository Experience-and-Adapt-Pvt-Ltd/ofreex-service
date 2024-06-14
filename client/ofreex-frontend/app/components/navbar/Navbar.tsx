import { SafeCategory, SafeSeller, SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Link from "next/link";
import Search from "./Search";

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
          <Logo />
        {/* <div className="mr-2 ml-2">location</div> */}
       <Search />
        <ul className="flex space-x-4">
          <li>
            <UserMenu currentUser={currentUser} currentSeller={currentSeller} />
          </li>
        </ul>
      </div>
      <Categories categoriesProps={categories} />
    </nav>
  );
};

export default Navbar;
