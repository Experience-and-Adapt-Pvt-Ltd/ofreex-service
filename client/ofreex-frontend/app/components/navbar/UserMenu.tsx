'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeSeller, SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import useSellerModal from "@/app/hooks/useSellerModal";
import getCurrentSeller from "@/app/actions/getCurrentSeller";

interface UserMenuProps {
  currentUser?: SafeUser | null
  currentSeller?: SafeSeller | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  currentSeller
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const sellerModal = useSellerModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [currentUser]);

  const onSeller = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    sellerModal.onOpen();
  }, [loginModal, sellerModal, currentUser]);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {!currentSeller ? <div
          onClick={onSeller}
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
        >
          Become a Seller!!
        </div> : <div
          onClick={onRent}
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
        >
          Add a Listing!!
        </div>}
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
          <AiOutlineMenu />
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
            {currentUser ? (
              <>
                {/* <MenuItem 
                  label="My trips" 
                  onClick={() => router.push('/trips')}
                /> */}
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="Items Bought"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="All my Listings"
                  onClick={() => router.push('/properties')}
                />
                {currentSeller ? <MenuItem label="Add new Listing" onClick={rentModal.onOpen} /> : ""}
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={loginModal.onOpen}
                />
                <MenuItem
                  label="Sign up"
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;