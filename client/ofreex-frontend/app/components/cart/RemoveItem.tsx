"use client";
import React from "react";
import Button from "../Button";
import { removeItemFromCart } from "@/app/actions/cart.operations";

const RemoveItem = ({ cart, product }) => {
  async function removeItem() {
    const item = cart.items.find((item: any) => item.listingId == product.id);
    await removeItemFromCart(item.id, cart.user);
  }

  return <Button label="Remove item" onClick={removeItem} />;
};

export default RemoveItem;
