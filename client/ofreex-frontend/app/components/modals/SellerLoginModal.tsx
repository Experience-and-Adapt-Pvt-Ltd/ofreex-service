'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";


import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useSellerModal from "@/app/hooks/useSellerModal";
import useSellerLoginModal from "@/app/hooks/useSellerLoginModal";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import useSellerForgetModalModal from "@/app/hooks/useSellerForgetModal";


const SellerLoginModal = () => {
  const router = useRouter();
  const sellerLogin = useSellerLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const registerSellerModal = useSellerModal();
  const sellerLoginModal = useSellerLoginModal()
  const [show, setShow] = useState(false);
  const forgetModal = useSellerForgetModalModal();
  

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
        role: 'seller',
        redirect: false,
      })
        .then((callback) => {
          setIsLoading(false);
          
          
          if (callback?.ok) {
            toast.success('Logged in');
            router.push('/properties');
            sellerLoginModal.onClose();
          }

          if (callback?.error) {
            console.log("1234");
            toast.error(callback.error);
          }
          else{
            router.refresh();
          }
        });
    }

  const onToggle = useCallback(() => {
    
    sellerLoginModal.onClose();
    registerSellerModal.onOpen();
  }, [sellerLoginModal, registerSellerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your seller account!"
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
        type={!show ? "password" : "text"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {!show ? (
            <AiOutlineEyeInvisible
              className="absolute right-[5rem] top-[13rem]"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute right-[5rem] top-[13rem]"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
       <Button
        outline
        label="Forget Password?"
        onClick={() => {
          sellerLogin.onClose();
          forgetModal.onOpen();
        }}
      />
      <hr />
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
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={sellerLoginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={sellerLoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default SellerLoginModal;
