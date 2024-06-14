"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      // className="cursor-pointer w-[150px] sm:w-[180px] md:w-[150px] h-[150px] sm:h-[120px] md:h-[150px]"
      className="cursor-pointer md:w-[120px] w-[60px] h-[40px] mr-2"
      src="/images/logo-version-two.png"
      height="100"
      width="100"
      alt="Logo"
    />
  );
};

export default Logo;
