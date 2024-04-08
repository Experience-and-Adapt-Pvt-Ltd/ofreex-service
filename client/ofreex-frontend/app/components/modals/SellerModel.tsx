"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useActivationModal from "@/app/hooks/useActivationModal";
import useSellerModal from "@/app/hooks/useSellerModal";
import useBankDetailsModal from "@/app/hooks/useBankDetailsModal";
import { useActivationToken } from "@/app/hooks/useActivationToken";
import { useData } from "@/app/hooks/useData";

interface RegisterModalProps {
  onUpdate: (data: string) => void;
}

const SellerModal = ({ }) => {
  console.log("seller modal");
  const registerModal = useRegisterModal();
  const sellerModal = useSellerModal();
  const bankDetailsModal = useBankDetailsModal();
  const activationModal = useActivationModal();
  const activationTokenHook = useActivationToken();
  const dataHook = useData();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      GST: ""
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    dataHook.obj = data;
    sellerModal.onClose();
    bankDetailsModal.onOpen();
    setIsLoading(false);
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Seller Registration" subtitle="Become a Seller" />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="phoneNumber"
        label="phoneNumber"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="address"
        label="Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="GST"
        label="GST number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={sellerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={sellerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SellerModal;
