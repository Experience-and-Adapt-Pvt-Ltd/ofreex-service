"use client";

import { useRouter } from "next/navigation";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Image from "next/image";

type ListingProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  rating: string;
  quantity: string;
  discount: number;
  imageUrls: string[];
};

interface ListingCardProps {
  data: ListingProps;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  onAction2?: (id: string, listing: SafeListing) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionLabel2?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  quantity?: number;
  discount: number;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  onAction2,
  disabled,
  actionLabel,
  actionLabel2,
  actionId = "",
  currentUser,
  quantity,
  discount = 0,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  let finalPrice = data.price - data.price * (discount / 100);

  let finalDescription = data.description.substring(0, 20) + "...";

  return (
    <div
      className="w-full  bg-white cursor-pointer border border-zinc-600 dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex items-center justify-center w-full h-[15rem]">
      <Image
        height={10}
        width={100}
        className="object-cover w-full h-full " 
        src={data.imageUrls[0]}
        alt="Product Image"
      />
      </div>
      {/* <div className="absolute top-0 right-0 m-2">
        <button className="p-2 bg-white dark:bg-zinc-800 rounded-full shadow-md">
          <img className="w-6 h-6" src="/icons/heart.svg" alt="Heart Icon" />
        </button>
      </div> */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            {data.title}
          </h2>
          <div className="flex items-center">
            <img src="/images/star-image.png" className="h-4 mr-1" />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {data.rating}/5
            </span>
          </div>
        </div>
        <p className="mt-1 text-zinc-600 dark:text-zinc-300">
          {finalDescription}
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Stock Present: {data.quantity}
        </p>
        <div className="mt-1 flex justify-between items-center">
          {data.discount !== 0 ? (
            <p className="text-sm text-red-500 line-through">₹{data.price}</p>
          ) : (
            <p className="text-sm">&nbsp;</p> 
          )}
          <p className="text-lg text-zinc-900 dark:text-white">₹{finalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
