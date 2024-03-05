'use client'
import { LOGIN_USER } from "@/graphql/action/login.action";
import { RESET_PASSWORD } from "@/graphql/action/reset-password.action";
import styles from "@/utils/style";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod";

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine(
    (values) => {
        return values.password === values.confirmPassword
    },
    {
        message: "Password and Confirm Password are not same",
        path: ["confirmPassword"],
    }
);

type ResetPasswordSchema = z.infer<typeof formSchema>;

const ResetPassword = ({
  activationToken,
}: {
  activationToken: string | string[];
}) => {
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
        const response = await resetPassword({
            variables: {
                password: data.password,
                activationToken: activationToken
            }
        });
        console.log(response);
        toast.success("Password Changed Successfully")
    } catch (error: any) {
        toast.error(error.message);   
    }
  };

  const [show, setShow] = useState(false);
  const [confirmPasswordshow, setconfirmPasswordshow] = useState(false);

  return (
    <div className="w-full flex justify-center items-center h-screen">
    <div className="md:w-[500px] w-full">
      <h1 className={`${styles.title}`}>Reset Your Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            {...register("password")}
            type={!show ? "password" : "text"}
            placeholder="password!@%"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-[3px] right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-[3px] right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500">{`${errors.password.message}`}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="confirmPassword" className={`${styles.label}`}>
            Enter your confirm password
          </label>
          <input
            {...register("confirmPassword")}
            type={!confirmPasswordshow ? "password" : "text"}
            placeholder="password!@%"
            className={`${styles.input}`}
          />
          {!confirmPasswordshow ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-[3px] right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setconfirmPasswordshow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-[3px] right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setconfirmPasswordshow(false)}
            />
          )}
        </div>
        {errors.confirmPassword && (
          <span className="text-red-500">{`${errors.confirmPassword.message}`}</span>
        )}
        <br />
        <input
          type="submit"
          value="Submit"
          disabled={isSubmitting || loading}
          className={`${styles.button} mt-3`}
        />
        <br />
      </form>
    </div>
  </div>
  );
};

export default ResetPassword;
