"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Input from "../inputs/Input";
import useSellerModal from "@/app/hooks/useSellerModal";
import useSellerLoginModal from "@/app/hooks/useSellerLoginModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useSellerForgetModalModal from "@/app/hooks/useSellerForgetModal";

const SellerLoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const registerSellerModal = useSellerModal();
  const sellerLoginModal = useSellerLoginModal();
  const [show, setShow] = useState(false);
  const forgotPasswordModal = useSellerForgetModalModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      role: "seller",
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.push("/properties");
        sellerLoginModal.onClose();
      }

      if (callback?.error) {
        console.log("1234");
        toast.error(callback.error);
      } else {
        router.refresh();
      }
    });
  };

  const onToggle = useCallback(() => {
    sellerLoginModal.onClose();
    // registerSellerModal.onOpen();
  }, [sellerLoginModal]);

  const bodyContent = (
    <>
      <Input
        id="email"
        type="email"
        placeholder="Email address"
        label="Email"
        register={register}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

      <div className="mb-4">
        <Input
          id="password"
          type={!show ? "password" : "text"}
          placeholder="Password"
          label="Password"
          register={register}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {!show ? (
            <AiOutlineEyeInvisible
              className="relative left-72 bottom-7 sm:left-80"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="relative left-72 bottom-7 sm:left-80"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          <div 
        className="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
        onClick={()=>{
        sellerLoginModal.onClose()
        forgotPasswordModal.onOpen()
        }}>
          Forgot password?
        </div>
      </div>
    </>
  );

  const footerContent = (
    <>
      <div className="mb-6">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Sign in
        </button>
      </div>
      <div className="text-center">
        <p className="text-gray-500 text-sm">
          Not a member?{" "}
          <div className="text-blue-500 hover:text-blue-80 cursor-pointer"
          onClick={onToggle}>
            Click here to Register
          </div>
        </p>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={sellerLoginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={sellerLoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SellerLoginModal;
