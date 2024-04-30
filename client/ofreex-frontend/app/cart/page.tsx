import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import CartClient from "./CartClient";

const CartPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="No item Found in Cart" subtitle="Please login" />;
  }

  // if(listings.length === 0){
  //     return(
  //         <ClientOnly>
  //             <EmptyState
  //             title = "No item found in cart"
  //             subtitle = "Looks like you have nothing added to Cart"/>
  //         </ClientOnly>
  //     )
  // }
  return (
    <ClientOnly>
      <CartClient />
    </ClientOnly>
  );
};

export default CartPage;
