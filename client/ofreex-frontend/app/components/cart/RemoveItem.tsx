"use client";
import React from "react";
import Button from "../Button";
import { removeItemFromCart } from "@/app/actions/cart.operations";

const RemoveItem = ({ cart, product }) => {
  async function removeItem() {
    const item = cart.items.find((item: any) => item.listingId == product.id);
    await removeItemFromCart(item.id, cart.user);
  }

  return (
    <button
    onClick={removeItem}
    className="bg-green-500 text-white font-semibold py-2 px-8 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 w-[50px] sm:w-auto">
      Remove Item
    </button>
  )
};

export default RemoveItem;