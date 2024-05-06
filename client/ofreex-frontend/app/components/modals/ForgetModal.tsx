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
import useEditModal from "@/app/hooks/useEditModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import axios from "axios";
import { SafeCategory, SafeListing } from "@/app/types";
import { useEdit } from "@/app/hooks/useEdit";
import useForgetModal from "@/app/hooks/useForgetModal";

interface ForgetModalProps {
  id?: string | null;
  listing?: SafeListing | null;
  categories?: SafeCategory[]

}

const ForgetModal: React.FC<ForgetModalProps> = ({
}
) => {
  const editHook = useEdit();
  const forgetModal = useForgetModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
    },
  });

  const onSubmit: SubmitHandler<FieldValues> =
    (data) => {
      setIsLoading(true);
      console.log(data);
      axios.post(`/api/forgetPassword`, {
        ...data
      })
        .then((res) => {
          setIsLoading(false);
          toast.success('Email Sent');
          forgetModal.onClose();
        })
        .catch((error) => {
          setIsLoading(false);
          const errorMessage = error?.response?.data?.errors?.[0]?.message || 'Email id does not exist';
          toast.error(errorMessage)
        })
        .finally(() => {
          setIsLoading(false);
          forgetModal.onClose();
        });
    }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Forget Password"
        subtitle=""
      />
      <Input
        id="email"
        label="Email"
        placeholderString={editHook.obj.listing?.title}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={forgetModal.isOpen}
      title="Reset Password"
      actionLabel="Reset Password"
      onClose={forgetModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default ForgetModal;
