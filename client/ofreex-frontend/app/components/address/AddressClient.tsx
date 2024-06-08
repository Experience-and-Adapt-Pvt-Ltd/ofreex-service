"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";

const AddressClient = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      saveAs: "",
      defaultAddress: false,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      ...data,
      defaultAddress: data.defaultAddress || false,
    };

    console.log("Form Data:", formData);

    axios
      .post(`/api/add/address`, formData)
      .then(() => {
        toast.success("Address Added");
        reset();
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.error(
            "Error during activation:",
            error.response?.data || error.message
          );
          console.log(error.response?.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          // console.error('Error during activation:', error.response?.data || error.message);
          console.log(error.request);
          toast.error("No response from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error(
            "Error during activation:",
            error.response?.data || error.message
          );
          console.log("Error", error.message);
          toast.error("Error sending data");
        }
      });
  };

  return (
    <>
      <section className="py-10" >
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* <Sidebar /> */}
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <div
                style={{ maxWidth: "480px" }}
                className="relative mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
              >
                <button
                  onClick={onClose}
                  className="absolute top-0 right-0 p-2 text-xl"
                >
                  close Icon
                </button>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2 className="mb-5 text-2xl font-semibold">Add new Address</h2>
                  <Input id="street" register={register} label="Street*" type="text" className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"/>
                  <Input id="city" register={register} label="City" type="text"  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"/>
                  <Input id="state" register={register} label="State" type="text"  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"/>
                  <Input id="pincode" register={register} label="Zip Code" type="number" className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"/>
                  <Input id="saveAs" register={register} label="Save As" type="text"  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"/>
                  <div className="flex items-center mb-4">
                    <input type="checkbox" {...register("defaultAddress")} className="mr-2" />
                    <label htmlFor="defaultAddress" className="text-sm">Set as default address</label>
                  </div>
                  <button type="submit" className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Add
                  </button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddressClient;
