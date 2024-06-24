"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    function handleRezise() {
      setIsMobileView(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleRezise);
    handleRezise();

    return () => {
      window.removeEventListener("resize", handleRezise);
    };
  }, []);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isOpen]);

  const onBuyer = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const getName = currentUser?.email
    ? currentUser.email.split("@")[0]
    : "Guest";

  return (
    <div ref={menuRef} className="relative">
      {/* <div onClick={onSeller}>
        log
      </div> */}
      <div className="flex flex-row items-center gap-3">
        {/* <Link
          href="/ComingSoon"
          className="hidden lg:block text-md whitespace-nowrap font-semibold text-black shadow-lg px-5 py-2"
        >
          Refer & Earn
        </Link> */}
        {!isMobileView && (
          <Link
            href="/ComingSoon"
            className="flex items-center justify-center shadow-lg py-2 px-7 whitespace-nowrap"
          >
            <img
              src="/images/promotion.png"
              alt="store icon"
              className="w-6 h-6"
            />
            <span className="text-lg font-medium ml-1">Refer & Earn</span>
          </Link>
        )}
        {!currentSeller && !isMobileView && (
          <Link
            href="/sellerregistration"
            className="flex items-center justify-center shadow-lg py-2 px-7 whitespace-nowrap"
          >
            <img
              src="/images/seller.png"
              alt="store icon"
              className="w-6 h-6"
            />
            <span className="text-lg font-medium ml-1">Become a Seller</span>
          </Link>
        )}
        <div
          onClick={() => router.push("/cart")}
          className="cursor-pointer p-2 border-[1px] ml-2 rounded-full  hover:shadow-md transition"
          style={{ fontSize: "24px" }}
        >
          <FaCartShopping
            style={{ width: "24px", height: "24px", color: "black" }}
          />
        </div>
        <div
          onClick={toggleOpen}
          className="ml-auto p-2 md:p-4 md:py-1 md:px-2 border border-zinc-600 rounded-md flex flex-row items-center gap-3  cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="block h-6 w-6">
            <Avatar src={currentUser?.image} />
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
                    <MenuItem label={getName} href="/" />
                    <MenuItem label="Wishlist" href={"/favorites"} />
                    <MenuItem label="Address" href={"/new-address"} />
                    <MenuItem label="Orders" href={"/ComingSoon"} />
                    <MenuItem href="/ComingSoon" label="Refer and Earn" className="md:hidden"/>
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
                <MenuItem href="/" label="Become a Seller" onClick={onBuyer} className="md:hidden"/>
                <MenuItem href="/" label="Login" onClick={onBuyer} />
                <MenuItem href="/ComingSoon" label="Refer and Earn" className="md:hidden"/>
                <MenuItem href="/ComingSoon" label="How it works" />
                <MenuItem href="/ComingSoon" label="Advertise" />
                <MenuItem href="/ComingSoon" label="About Us" />
                <MenuItem href="/ComingSoon" label="Help & Support" />
                <MenuItem href="/ComingSoon" label="Terms and Conditions" />
                <MenuItem href="/ComingSoon" label="Privacy Policies" />
                <MenuItem href="/ComingSoon" label="Platform Policies" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
