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

  return (
    <div className="relative">
      {/* <div onClick={onSeller}>
        log
      </div> */}
      <div className="flex flex-row items-center gap-3">
        {!currentUser && !currentSeller ? (
          <Link
          href={"/sellerregistration"}
            className="
          hidden
    md:block
    text-sm 
    font-semibold 
    py-2 
    px-4 
    rounded-full 
    dark:hover:bg-gray-900
    transition 
    cursor-pointer
    border-4
    border-[#37b668]
    w-auto
    whitespace-nowrap
          "
          >
            Become a Seller!!
          </Link>
        ) : (
          <div
            onClick={() => {}}
            className="
          hidden
          md:block
          text-sm 
          font-semibold 
          py-3 
          px-4 
          rounded-full 
          dark:hover:bg-gray-900
          transition 
          cursor-pointer
          "
          ></div>
        )}
        <div
          onClick={() => router.push("/cart")}
          className="cursor-pointer p-2 border-[1px] border-neutral-200 rounded-full hover:shadow-md transition"
          style={{ fontSize: "24px" }}
        >
          <FaCartShopping style={{ width: "24px", height: "24px" }} />
        </div>
        <div
          onClick={toggleOpen}
          className="
        ml-auto
        p-2
      md:p-4
      md:py-1
      md:px-2
      border-[1px] 
      border-neutral-200 
      flex 
      flex-row 
      items-center 
      gap-3 
      rounded-full 
      cursor-pointer 
      hover:shadow-md 
      transition
          "
        >
          <AiOutlineMenu style={{ width: "28px", height: "28px" }} />
          <div className="block md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl
            z-10
            bg-white
            dark:bg-black
            shadow-md
            w-[40vw]
            md:w-3/4 
            overflow-hidden 
            right-0 
            top-14
            md:top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser || currentSeller ? (
              <>
                {currentUser ? (
                  <MenuItem label="My favorites" href={"/favorites"} />
                ) : (
                  ""
                )}
                {currentUser ? (
                  <MenuItem label="Your Order" href={"/cart"} />
                ) : (
                  ""
                )}
                {currentSeller ? (
                  <MenuItem label="All my Listings" href={"/properties"} />
                ) : (
                  ""
                )}

                {currentSeller ? (
                  <MenuItem
                    label="Add new Listing"
                    href={"/sellerproductform"}
                  />
                ) : (
                  ""
                )}
                {/* {currentSeller ? <MenuItem label="Add new Listing" onClick={rentModal.onOpen} /> : ""} */}
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
