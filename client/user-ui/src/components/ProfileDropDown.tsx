"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import AuthScreen from "@/screens/AuthScreen";
import { CgProfile } from "react-icons/cg";

const ProfileDropDown = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {signedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">rupeshmishra813@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">Profile</DropdownItem>
            <DropdownItem key="all_orders">Orders</DropdownItem>
            <DropdownItem key="seller_settings">
              Apply for seller Account
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CgProfile className=" text-2xl cursor-pointer" onClick={()=> setOpen(!open)}/>
      )}
      {
        open && (
          <AuthScreen setOpen={setOpen}/>
        )
      }
    </div>
  );
};

export default ProfileDropDown;
