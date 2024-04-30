"use client";
import React from "react";

import { updateItemQuantity } from "@/app/actions/cart.operations";

const QunatityDropDown = ({
  defaultValue,
  cart,
  product,
  productIdx,
  itemMaxCount,
}) => {
  async function updateQuantity(e: any, product: any) {
    const item = cart.items.find((item: any) => item.listingId == product.id);
    await updateItemQuantity(item.id, cart.user, e.target.value);
  }
  console.log(defaultValue);
  return (
    <select
      id={`quantity-${productIdx}`}
      name={`quantity-${productIdx}`}
      value={defaultValue}
      onChange={(e) => updateQuantity(e, product)}
      className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    >
      {Array.apply(null, Array(itemMaxCount))
        .map(function (x, i) {
          return i;
        })
        .map((e) => {
          return <option value={e + 1}>{e + 1}</option>;
        })}
    </select>
  );
};

export default QunatityDropDown;
