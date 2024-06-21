"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeSeller, SafeUser } from "@/app/types";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import useSellerModal from "@/app/hooks/useSellerModal";
import { FaCartShopping } from "react-icons/fa6";
import useLoginModal from "@/app/hooks/useLoginModal";
import Link from "next/link";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  currentSeller?: SafeSeller | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, currentSeller }) => {
  const router = useRouter();
  const sellerModal = useSellerModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [currentUser]);

  const onSeller = useCallback(() => {
    sellerModal.onOpen();
  }, [sellerModal]);
  const onBuyer = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const getName = currentUser?.email.split('@')[0];
  // getName = getName.s

  return (
    <div className="relative">
      {/* <div onClick={onSeller}>
        log
      </div> */}
      <div className="flex flex-row items-center gap-3">
        <Link
          href="/ComingSoon"
          className="hidden lg:block text-md whitespace-nowrap font-semibold text-black shadow-lg px-5 py-2"
        >
          Refer & Earn
        </Link>
        { !currentSeller && (
          <Link
            href={"/sellerregistration"}
            className="hidden md:block text-md font-semibold text-black px-5 py-2 shadow-lg dark:hover:bg-gray-900 transition cursor-pointer whitespace-nowrap"
          >
            Become a Seller
          </Link>
        )}
        <div
          onClick={() => router.push("/cart")}
          className="cursor-pointer p-2 border-[1px] ml-2 rounded-full border-red-500 hover:shadow-md transition"
          style={{ fontSize: "24px" }}
        >
          <FaCartShopping style={{ width: "24px", height: "24px", color:"black" }}/>
        </div>
        <div
          onClick={toggleOpen}
          className="ml-auto p-2 md:p-4 md:py-1 md:px-2 border border-zinc-600 rounded-md flex flex-row items-center gap-3  cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu  />
          <div className="block h-6 w-6">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl z-10 bg-white dark:bg-black shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-14 md:top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser || currentSeller ? (
              <>
                {currentUser ? (
                  <>
                  <MenuItem label={getName} href="/"/>
                    <MenuItem label="Wishlist" href={"/favorites"} />
                    <MenuItem label="Address" href={"/new-address"} />
                    <MenuItem label="Orders" href={"/ComingSoon"} />
                    <MenuItem href="/ComingSoon" label="Refer and Earn" />
                    <MenuItem href="/ComingSoon" label="How it works" />
                    <MenuItem href="/ComingSoon" label="Advertise" />
                    <MenuItem href="/ComingSoon" label="About Us" />
                    <MenuItem href="/ComingSoon" label="Help & Support" />
                    <MenuItem href="/ComingSoon" label="Terms and Conditions" />
                    <MenuItem href="/ComingSoon" label="Privacy Policies" />
                    <MenuItem href="/ComingSoon" label="Platform Policies" />
                  </>
                ) : (
                  <>
                    <MenuItem label="My Dashboard" href={"/properties"} />
                    <MenuItem
                      label="Add new Listing"
                      href={"/sellerproductform"}
                    />
                  </>
                )}
                <hr />
                <MenuItem
                  label="Logout"
                  href="/"
                  onClick={async () => {
                    console.log(
                      await signOut({ callbackUrl: "http://localhost:3000/" })
                    );
                  }}
                />
              </>
            ) : (
              <div className="flex flex-col cursor-pointer">
                <MenuItem href="/" label="Login" onClick={onBuyer} />
                <MenuItem href="/ComingSoon" label="Refer and Earn" />
                <MenuItem href="/ComingSoon" label="How it works" />
                <MenuItem href="/ComingSoon" label="Advertise" />
                <MenuItem href="/ComingSoon" label="About Us" />
                <MenuItem href="/ComingSoon" label="Help & Support" />
                <MenuItem href="/ComingSoon" label="Terms and Conditions" />
                <MenuItem href="/ComingSoon" label="Privacy Policies" />
                <MenuItem href="/ComingSoon" label="Platform Policies" />
                <div className="md:hidden">
                  <MenuItem
                    href="/"
                    label="Become a Seller"
                    onClick={onBuyer}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
