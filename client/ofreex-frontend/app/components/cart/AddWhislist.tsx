"use client";
import React from "react";
import Button from "../Button";
import {
  removeItemFromCart,
  wishlistFromCart,
} from "@/app/actions/cart.operations";

const AddWhislist = ({ cart, product }) => {
  async function wishlistItem() {
    const item = cart.items.find((item: any) => item.listingId == product.id);
    console.log(item);
    await wishlistFromCart(item.id, cart.user);
  }
  return <Button label="Add to Whislist" onClick={wishlistItem} />;
};

export default AddWhislist;
