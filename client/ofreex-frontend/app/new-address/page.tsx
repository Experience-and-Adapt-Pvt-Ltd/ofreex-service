import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import { getAddresses } from "../actions/address.operations";
import UserAddresses from "./UserAddresses";

const Address = async () => {
  const currentUser = await getCurrentUser();
  const userAddresses = await getAddresses();
  console.log(`Useer Address: ${JSON.stringify(userAddresses, null, 2)}`);
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  return (
    <div>
      <UserAddresses addresses={userAddresses} />
    </div>
  );
};

export default Address;
