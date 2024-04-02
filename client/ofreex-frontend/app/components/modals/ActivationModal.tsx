
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
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useActivisionModal from "@/app/hooks/useActivationModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

interface ActivationModalProps {
  activationToken: string;
}
const ActivationModal: React.FC<ActivationModalProps> = ({activationToken}) => {
  const router = useRouter();
  const activationModal = useActivisionModal();
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
      setIsLoading(true);

      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          setIsLoading(false);

          if (callback?.ok) {
            toast.success('Logged in');
            router.refresh();
            loginModal.onClose();
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      {/* <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>First time using OfreeX?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          > Create an account</span>
        </p>
      </div> */}
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={activationModal.isOpen}
      title="Activate your account"
      actionLabel="Activate"
      onClose={activationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default ActivationModal;
