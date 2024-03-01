import { FORGOT_PASSWORD } from "@/graphql/action/forgot-password.action";
import styles from "@/utils/style";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof formSchema>;

const ForgotPassword = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
        const response = await forgotPassword({
            variables: {
                email: data.email
            },
        });
        toast.success("Please check your email to reset your password ")
        reset();
    } catch (error: any) {
        console.log(error);
        toast.error(error.message)
    }
  };

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <h1 className={`${styles.title}`}>Forgot Your Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="example@gmail.com"
          className={`${styles.input} py-1 mt-2`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}
        <br />
        <input 
        type="submit"
        value="Submit"
        disabled={isSubmitting || loading}
        className={`${styles.button} mt-3`}/>

        <h5 className="text-center pt-4 font-Poppins text-[16px]">
          Or Go Back to
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Login")}
          >
            Login
          </span>
        </h5>
      </form>
    </div>
  );
};

export default ForgotPassword;
