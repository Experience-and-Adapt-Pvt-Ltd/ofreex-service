import { REGISTER_USER } from "@/graphql/action/regsiter.action";
import styles from "@/utils/style";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long!"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  phone_number: z.number().min(10, "Enter 10 digit phone number"),
});

type SignupSchema = z.infer<typeof formSchema>;

const Signup = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      const response = await registerUserMutation({
        variables: data,
      });
      //Store the activation token received from the registration response in local storage for future verification processes.
      localStorage.setItem("activation_token", response.data.register.activation_token);
      toast.success("Please Verify Your Account!");
      reset();
      setActiveState("Verification")
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <h1 className={`${styles.title}`}>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full relative mb-2">
          <label className={`${styles.label}`}>Enter your Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Rohan Koul"
            className={`${styles.input} py-1 mt-2`}
          />
        </div>
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
        <div className="w-full relative mt-2">
          <label className={`${styles.label}`}>Enter your Phone Number</label>
          <input
            {...register("phone_number", { valueAsNumber: true })}
            type="number"
            placeholder="+918130350091"
            className={`${styles.input} py-1 mt-2`}
          />
        </div>
        <div className="w-full mt-2 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter Your Password
          </label>
          <input
            {...register("password")}
            type={!visible ? "password" : "text"}
            placeholder="password@345"
            className={`${styles.input} py-1 mt-2`}
          />
          {!visible ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-[8px] right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setVisible(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-[8px] right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setVisible(false)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500">{`${errors.password.message}`}</span>
        )}
        <div className="w-full mt-5">
          <span
            className={`${styles.label} text-[#2190ff] block text-right cursor-pointer`}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="Signup"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3 bg-[#37b668]`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[16px]">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] my-5">
          Already have an account?{" "}
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

export default Signup;
