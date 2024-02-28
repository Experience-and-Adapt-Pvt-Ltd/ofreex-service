import { LOGIN_USER } from "@/graphql/action/login.action";
import styles from "@/utils/style";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = ({
  setActiveState,
  setOpen,
}: {
  setActiveState: (e: string) => void;
  setOpen: (e: boolean) => void;
}) => {
  const [Login, { loading }] = useMutation(LOGIN_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      const response = await Login({
        variables: loginData,
      });

      if (response.data.Login.user) {
        toast.success("Login Successfully ");
        Cookies.set("refresh_token", response.data.Login.refreshToken);
        Cookies.set("access_token", response.data.Login.accessToken);
        setOpen(false);
        reset();
        window.location.reload();
      } else {
        toast.error(response.data.Login.error.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <h1 className={`${styles.title}`}>Login</h1>
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
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter Your Password
          </label>
          <input
            {...register("password")}
            type={!visible ? "password" : "text"}
            className={`${styles.input} py-1 mt-2`}
            placeholder="password@345"
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
          <span className="text-red-500 block mt-1">
            {`${errors.password.message}`}
          </span>
        )}
        <div className="w-full mt-5">
          <span
            className={`${styles.label} text-[#2190ff] block text-right cursor-pointer`}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="login"
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
          Not have any account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Signup")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
