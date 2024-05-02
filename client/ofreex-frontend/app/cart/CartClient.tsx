import {
  getCartByUserId,
  getCartSettings,
  updateItemQuantity,
} from "../actions/cart.operations";
import dynamic from "next/dynamic";
import getCurrentUser from "../actions/getCurrentUser";
import { ItemListing } from "../components/cart/ItemListing";

const CartClient = async () => {
  const currentUser = await getCurrentUser();
  const { cart, listings } = await getCartByUserId(currentUser.id);
  const itemMaxCount = await getCartSettings();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <ItemListing
        cart={cart}
        listings={listings}
        itemMaxCount={itemMaxCount}
        />
      </div>
    </div>
  );
};

export default CartClient;
