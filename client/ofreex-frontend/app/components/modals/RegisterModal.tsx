"use client";

import axios from "axios";
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
import { useActivationToken } from "@/app/hooks/useActivationToken";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

interface RegisterModalProps {
  onUpdate: (data: string) => void;
}

const RegisterModal = ({ }) => {
  const registerModal = useRegisterModal();
  const activationModal = useActivationModal();
  const activationTokenHook = useActivationToken();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then((res) => {
        toast.success('Registered!');

        activationTokenHook.activationToken = res.data;
        registerModal.onClose();
        activationModal.onOpen();
      })
      .catch((error) => {
        const errorMessage =  'Email Already Exist Please login';
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to OfreeX" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type={!show ? "password" : "text"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
       {!show ? (
            <AiOutlineEyeInvisible
              className="absolute right-[5rem] top-[18.7rem]"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute right-[5rem] top-[18.7rem]"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
      <Input
        id="phoneNumber"
        label="phoneNumber"
        type="phoneNumber"
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
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
