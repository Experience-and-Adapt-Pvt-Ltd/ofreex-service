"use client";
import React from "react";

const QunatityDropDown = ({
  defaultValue,
  product,
  productIdx,
  itemMaxCount,
  updateQuantity,
}) => {
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
          return (
            <option value={e + 1} key={e}>
              {e + 1}
            </option>
          );
        })}
    </select>
  );
};

export default QunatityDropDown;
