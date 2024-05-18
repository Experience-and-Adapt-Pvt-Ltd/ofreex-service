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
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import useForgetModal from "@/app/hooks/useForgetModal";

const LoginModal = () => {
  const router = useRouter();
  const forgetModal = useForgetModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

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

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

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
    </div>
  </>
  )

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
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
