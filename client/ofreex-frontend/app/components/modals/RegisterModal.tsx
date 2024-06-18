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
import Button from "../Button";
import useActivationModal from "@/app/hooks/useActivationModal";
import { useActivationToken } from "@/app/hooks/useActivationToken";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface RegisterModalProps {
  onUpdate: (data: string) => void;
}

const RegisterModal = ({}) => {
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
        toast.success("Registered!");

        activationTokenHook.activationToken = res.data;
        registerModal.onClose();
        activationModal.onOpen();
      })
      .catch((error) => {
        const errorMessage = "Email Already Exist Please login";
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
    <>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <Input
        id="password"
        label="Password"
        type={!show ? "password" : "text"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
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
      <Input
        id="phoneNumber"
        label="phoneNumber"
        type="phoneNumber"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </>
  );

  const footerContent = (
    <div>
      <hr />
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Sign in
      </button>
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
        className="mt-6 w-full"
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
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
