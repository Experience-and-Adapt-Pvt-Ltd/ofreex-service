"use client";

import { useMemo, useState } from "react";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeCategory, SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import Categories from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { addItemToCart } from "@/app/actions/cart.operations";

interface ListingClientProps {
  //reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  categoriesProps: SafeCategory[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  //reservations = [],
  currentUser,
  categoriesProps,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
    return categoriesProps
      ? categoriesProps.find((items) => items.label === listing.category)
      : null;
  }, [listing.category, categoriesProps]);


  const [totalPrice, setTotalPrice] = useState(listing.price);

  const addToCart = async () => {
    await addItemToCart(listing, currentUser);
    router.push("/cart");
  };

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageUrls={listing.imageUrls}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              locationValue={listing.locationValue}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                //price={listing.price}
                totalPrice={totalPrice}
                quantity={listing.quantity}
                discount={listing.discount}
                onAddToCart={addToCart}
                // onChangeDate={(value) => setDateRange(value)}
                //dateRange={dateRange}
                //onSubmit={onCreateReservation}
                // disabled={isLoading}
                //disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
