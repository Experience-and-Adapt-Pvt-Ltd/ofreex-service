import Link from "next/link";
import React from "react";
import AddAddressClientPopUp from "../components/address/AddAddressClientPopUp";
import RemoveAddress from "../components/address/RemoveAddress";
import EditClientPopUp from "../components/address/EditClientPopUp";


const UserAddresses = ({ addresses }: { addresses?: any[] }) => {
  addresses = Array.isArray(addresses) ? addresses : [];
  console.log("Addresses Array:", addresses);


  return (
    <>
      {addresses.map((address: any) => (
        <div key={address.id} className="relative mb-5 gap-4">
             <RemoveAddress addressId={address.id} />
             <EditClientPopUp />
          <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
                {address.defaultAddress ? "Default Address" : ""}
            <figcaption className="text-gray-600">
              <p>
                {address.street} <br /> {address.city}, {address.state},{" "}
                {address.pincode}
                <br />
              </p>
            </figcaption>
          </figure>
        </div>
      ))}
      <AddAddressClientPopUp />
    </>
  );
};

export default UserAddresses;
