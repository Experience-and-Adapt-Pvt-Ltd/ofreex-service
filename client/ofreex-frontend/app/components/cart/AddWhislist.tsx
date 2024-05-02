"use client";
import React from "react";
import Button from "../Button";
import { wishlistFromCart } from "@/app/actions/cart.operations";

const AddWhislist = ({ cart, product }) => {
  async function wishlistItem() {
    const item = cart.items.find((item: any) => item.listingId == product.id);
    await wishlistFromCart(item.id, cart.user);
  }
  return (
    <button
    onClick={wishlistItem}
    className="bg-green-500 text-white font-semibold py-2 px-8 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 w-[50px] sm:w-auto">
      Add to Whislist
    </button>
  );
};

export default AddWhislist;