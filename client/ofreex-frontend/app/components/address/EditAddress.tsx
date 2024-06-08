import { getAddresses } from "@/app/actions/address.operations";
import React, { useEffect, useState } from "react";

interface AddressProp {
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  defaultAddress: boolean;
}

const EditAddress: React.FC<AddressProp> = () => {
  const [addresses, setAddresses] = useState<AddressProp[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressProp | null>(
    null
  );
  const [form, setForm] = useState<AddressProp>({
    id: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    defaultAddress: false,
  });

  // Fetch addresses on component mount
  useEffect(() => {
    getAddresses()
      .then((data) => setAddresses(data))
      .catch((error) => console.error("Failed to fetch addresses:", error));
  }, []);

  // Set form when selected address changes
  useEffect(() => {
    if (selectedAddress) {
      setForm(selectedAddress);
    }
  }, [selectedAddress]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Updated Address:", form);
    // Here you would integrate the API to update the address
  };

  const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const addressId = e.target.value;
    const address = addresses.find((a) => a.id === addressId);
    if (address) {
      setSelectedAddress(address);
      setForm(address);
    }
  };

  return (
    <div>
      <h2>Edit Address</h2>
      <div>
        <label>Select an address:</label>
        <select
          onChange={handleSelectAddress}
          value={selectedAddress?.id || ""}
        >
          <option value="">Select an address</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.street}, {address.city}
            </option>
          ))}
        </select>
      </div>
      {selectedAddress && (
        <form onSubmit={handleSubmit}>
          <label>
            Street:
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </label>
          <label>
            Pincode:
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </label>
          <label>
            Default Address:
            <input
              type="checkbox"
              name="defaultAddress"
              checked={form.defaultAddress}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update Address</button>
        </form>
      )}
    </div>
  );
};

export default EditAddress;
