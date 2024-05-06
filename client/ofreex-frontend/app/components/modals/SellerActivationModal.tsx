
'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useActivisionModal from "@/app/hooks/useActivationModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { useActivationToken } from "@/app/hooks/useActivationToken";
import axios from "axios";
import useSellerActivationModal from "@/app/hooks/useSellerActivationModal";

interface ActivationModalProps {
  activationToken: string;
}
const SellerActivationModal = () => {
  const router = useRouter();
  const activationModal = useActivisionModal();
  const activationTokenHook = useActivationToken();
  const sellerActivationModal = useSellerActivationModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> =
    (data) => {
      console.log("activation Token = " + activationTokenHook.activationToken);
      console.log("data in ActivationSeller = ");

      data = {
        ...data,
        activationToken: activationTokenHook.activationToken
      }
      axios.post('/api/activateSeller', data)
        .then((res) => {
          toast.success('Seller Registered!');
          sellerActivationModal.onClose();
          router.refresh();
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
          toast.error(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Activate"
        subtitle="Activate your account!"
      />
      <Input
        id="activationCode"
        label="activationCode"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={sellerActivationModal.isOpen}
      title="Activate your account"
      actionLabel="Activate"
      onClose={sellerActivationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default SellerActivationModal;
