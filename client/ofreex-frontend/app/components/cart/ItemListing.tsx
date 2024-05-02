"use client";
import { useState } from "react";
import RemoveItem from "./RemoveItem";
import AddWhislist from "./AddWhislist";
import QunatityDropDown from "./Dropdown";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { updateItemQuantity } from "@/app/actions/cart.operations";

export function ItemListing({ cart, listings, itemMaxCount }) {
  const [listingState, setListingState] = useState(listings);
  const [cartState, setCartState] = useState(cart);

  async function updateQuantity(e: any, product: any) {
    const item = cart.items.find((item: any) => item.listingId == product.id);
    item.quantity = e.target.value;
    setCartState((prevState: any) => {
      const itemIndex = prevState.items.findIndex((e: any) => e.id == item.id);
      const cartItems = [...cartState.items];
      cartItems[itemIndex] = item;
      return { ...prevState, items: cartItems };
    });
    await updateItemQuantity(item.id, cart.user, e.target.value);
  }

  const discount = () =>
    cart.items.reduce((prevValue: number, currentValue: any) => {
      const item = listings.find((item) => item.id == currentValue.listingId);
      return (currentValue.quantity * (item.price * item.discount)) / 100;
    }, 0);

  const totalAmount = () =>
    cart.items.reduce((prevValue: number, currentValue: any) => {
      const item = listings.find((item) => item.id == currentValue.listingId);
      return prevValue + item.price * currentValue.quantity;
    }, 0);

  return (
    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section aria-labelledby="cart-heading" className="lg:col-span-7">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>
        <ul
          role="list"
          className="divide-y divide-gray-200 border-b border-t border-gray-200"
        >
          {listingState?.map((product: any, productIdx: number) => (
            <li key={product.id} className="flex py-6 sm:py-10">
              <div className="flex-shrink-0">
                <img
                  src={product.imageUrls[1]}
                  alt={product.title}
                  className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm">
                        <a
                          href={product.href}
                          className="font-medium text-2xl text-gray-700 hover:text-gray-800"
                        >
                          {product.description}
                        </a>
                      </h3>
                    </div>
                    <div className="mt-1 flex text-sm">
                      <p className="text-gray-500">{product.color}</p>
                      {product.size ? (
                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                          {product.size}
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xl font-medium text-gray-900">
                    ₹ {product.price}
                    </p>
                    <div className="flex space-x-2 mt-16">
                      <div>
                    <RemoveItem cart={cart} product={product} />
                      </div>
                      <div>
                    <AddWhislist cart={cart} product={product} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:pr-9">
                    <label
                      htmlFor={`quantity-${productIdx}`}
                      className="sr-only"
                    >
                      Quantity, {product.name}
                    </label>
                    <QunatityDropDown
                      defaultValue={
                        cartState.items.find(
                          (item: any) => item.listingId == product.id
                        ).quantity
                      }
                      product={product}
                      productIdx={productIdx}
                      itemMaxCount={Math.min(itemMaxCount, product.quantity)}
                      updateQuantity={updateQuantity}
                    />
                  </div>
                </div>

                <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                  {/* {!product.inStock ? (
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
              ) : (
                <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
              )} */}

                  {/* <span>{!product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span> */}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {listings.length ? (
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                {" "}
                ₹ {totalAmount()}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a
                  href="#"
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">
                    Learn more about how shipping is calculated
                  </span>
                  <QuestionMarkCircleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">₹ 50</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a
                  href="#"
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">
                    Learn more about how tax is calculated
                  </span>
                  <QuestionMarkCircleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
              ₹ {totalAmount() * (18 / 100)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">Discount</dt>
              <dd className="text-sm font-medium text-gray-900">
              ₹ {discount()}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">
              ₹ {totalAmount() + totalAmount() * (18 / 100) + 50 - discount()}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      ) : (
        <div>
          <p>No products yet</p>
        </div>
      )}
    </form>
  );
}
