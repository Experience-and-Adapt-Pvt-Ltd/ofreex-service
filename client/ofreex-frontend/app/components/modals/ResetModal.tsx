'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import axios from "axios";
import { SafeCategory, SafeListing } from "@/app/types";
import { useEdit } from "@/app/hooks/useEdit";
import useResetModal from "@/app/hooks/useResetModal";

interface ResetModalProps {
  id?: string | null;
  listing?: SafeListing | null;
  categories?: SafeCategory[];
  verify?: string;
}

const ResetModal: React.FC<ResetModalProps> = ({
  verify
}
) => {
  const editHook = useEdit();
  const router = useRouter();
  const resetModal = useResetModal();
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
      if (data.nPassword !== data.cPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }
      axios.post(`/api/resetPassword`, {
        activationToken: verify,
        ...data
      })
        .then((res) => {
          setIsLoading(false);
          toast.success('Password Updated successfully');
          resetModal.onClose();
          router.replace('/');
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error?.response?.data?.error)
        })
    }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Reset Password"
        subtitle="Reset your Password!"
      />
      <Input
        id="nPassword"
        label="New Password"
        placeholderString={editHook.obj.listing?.title}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="cPassword"
        label="Confirm Password"
        placeholderString={editHook.obj.listing?.description}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={resetModal.isOpen}
      title="Reset Password"
      actionLabel="Reset Password"
      onClose={resetModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default ResetModal;
