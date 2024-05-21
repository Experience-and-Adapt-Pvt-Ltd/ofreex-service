'use client';

import {  useState } from "react";
import { toast } from "react-hot-toast";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import axios from "axios";
import { SafeCategory, SafeListing } from "@/app/types";
import { useEdit } from "@/app/hooks/useEdit";
import useSellerForgetModal from "@/app/hooks/useSellerForgetModal";

interface ForgetModalProps {
  id?: string | null;
  listing?: SafeListing | null;
  categories?: SafeCategory[]

}

const SellerForgetModal: React.FC<ForgetModalProps> = ({
}
) => {
  const editHook = useEdit();
  const [isLoading, setIsLoading] = useState(false);
  const forgetModal = useSellerForgetModal();

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
      axios.post(`/api/sellerforgotpassword`, {
        ...data
      })
        .then((res) => {
          setIsLoading(false);
          toast.success('Email Sent');
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error?.response?.data?.error)
        })
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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  )

  const footerContent = (
    <>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSubmit(onSubmit)}
      >
        Send Forget Link
      </button>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={forgetModal.isOpen}
      title="Reset Password"
      actionLabel="Reset Password"
      onClose={forgetModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default SellerForgetModal;
