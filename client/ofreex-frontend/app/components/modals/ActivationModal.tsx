
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

interface ActivationModalProps {
  activationToken: string;
}
const ActivationModal = () => {
  const router = useRouter();
  const activationModal = useActivisionModal();
  const activationTokenHook = useActivationToken();
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
      //console.log("activation Token = " + activationTokenHook.activationToken);
      //console.log("data in Activation = ");

      data = {
        ...data,
        activationToken: activationTokenHook.activationToken
      }
      console.log(data);
      axios.post('/api/activate', data)
        .then((res) => {
          toast.success('Registered!');
          console.log(res);
          activationModal.onClose();
          loginModal.onOpen();
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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Activate
        </button>
      <Button
        outline
        label="Go Back"
        onClick={() => {
          registerModal.onOpen()
          activationModal.onClose()
        }
        }
        className="w-full "
      />
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={activationModal.isOpen}
      title="Activate your account"
      actionLabel="Activate Buyer"
      onClose={activationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default ActivationModal;
