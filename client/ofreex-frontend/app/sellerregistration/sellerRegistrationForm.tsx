"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../components/inputs/Input";
import * as React from 'react';
import { useActivationToken } from "../hooks/useActivationToken";
import useSellerActivationModal from "../hooks/useSellerActivationModal";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import useSellerLoginModal from "../hooks/useSellerLoginModal";

const SellerRegistrationForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      address: "",
      gstNumber: "",
      bankName: "",
      accountNumber: "",
      IFSC: "",
    },
  });

  const activationTokenHook =  useActivationToken();
  const sellerActivationModal = useSellerActivationModal();
  const router = useRouter();
  const sellerLoginModal = useSellerLoginModal();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      ...data,
    };
    

    axios
    .post("/api/registerSeller", formData)
      .then((res) => {
        activationTokenHook.activationToken = res.data;
        reset();
        toast.success("check your mail");
        sellerActivationModal.onOpen();
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          toast.error("No response from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          toast.error("Error sending data");
        }
      });
  };

  const handleBack = () => {
    router.push('/')
  }

  const handleOpenLogin = (event) => {
    event.preventDefault();
    sellerLoginModal.onOpen();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Seller Details
        </h2>
        <form>
          <div className="space-y-4">

            {/* <!-- Seller Name --> */}
            <div>
              <Input
                id="name"
                type="text"
                label="Seller Name"
                placeholder="ex: Rupesh"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
              />
            </div>

            {/* <!-- Email --> */}
            <div>
              <Input
                id="email"
                label="Email"
                type="text"
                placeholder="rupeshkshandilya@gmail.com"
                register={register}
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <Input
                id="phoneNumber"
                label="Phone Number"
                type="number"
                placeholder="+91 8130350091"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Input
                id="password"
                label="Password"
                type="text"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
              />
            </div>

            {/* Address */}
            <div>
              <Input
                id="address"
                label="Address"
                type="text"
                placeholder="ex: Rohini Astha Kunj Society"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
              />
            </div>

            {/* GST Number */}
            <div>
              <Input
                id="gstNumber"
                label="GST"
                type="text"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
                maxLength={15}
              />
            </div>
          <hr />

          {/* Bank Name */}
          <div>
              <Input
                id="bankName"
                label="Bank Name"
                type="text"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
              />
            </div>
            {/* Account Number */}
            <div>
              <Input
                id="accountNumber"
                label="Account Number"
                type="text"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
              />
            </div>

            {/* IFSC */}
            <div>
              <Input
                id="IFSC"
                label="IFSC Code"
                type="text"
                className="form-Input w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                register={register}
                required
              />
            </div>

          </div>

          <button
          className="text-center py-4 cursor-pointer"
          onClick={handleOpenLogin}>Aldready have account? Login</button>

          {/* <!-- Buttons --> */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="bg-gray-200 text-gray-900 rounded px-4 py-2 hover:bg-gray-300"
              onClick={handleBack}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegistrationForm;
