'use client';

import Button from "../Button";

interface ListingReservationProps {
  totalPrice: number;
  quantity?: number;
  discount?: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  totalPrice,
  quantity,
  discount = 0,
}) => {

  let finalDiscount = totalPrice;
  if(discount !== 0){
    finalDiscount = totalPrice - (totalPrice * (discount/100));
  }

  
  return (
    <div
      className="
      rounded-xl 
      border-[1px]
      border-neutral-200 
      overflow-hidden
    "
    >
      <div className="p-4">
        <div
          className="
          mb-4
          text-sm
          font-medium
          text-neutral-600
        "
        >
          Stock available: {quantity}
        </div>
        
      </div>
      <hr />
      <div
        className="
        p-4 
        flex 
        flex-col 
        space-y-2 
        font-semibold
        text-lg
      "
      >
        <div>
          Price: ₹ {totalPrice}
        </div>
        {discount != 0 && (
          <div>
            Discount: {discount}%
          </div>
        )}
        <div className="pt-2">
          Total: ₹ {finalDiscount}
        </div>
        <Button
          label="Buy Product"
          onClick={() => { }}
        />
      </div>
    </div>
  );
}

export default ListingReservation;