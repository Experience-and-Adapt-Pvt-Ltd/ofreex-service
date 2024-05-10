"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="relative mt-4 left-0 cursor-pointer w-[150px] sm:w-[180px] md:w-[240px] h-[150px] sm:h-[120px] md:h-[240px]"
      src="/images/logo.png"
      height="100"
      width="100"
      alt="Logo"
    />
  );
};

export default Logo;
