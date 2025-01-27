import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";

const Loader = () => {
  return (
    <div className="container h-screen flex flex-col gap-2 w-full justify-center items-center">
      <Image
        src={Logo}
        alt="Marki Insurance Agency"
        width={150}
        height={150}
        className="w-28 lg:w-32 sm:w-24"
      />
      <h1 className="text-xl font-semibold">Marki Insurance Agency</h1>
      <span className="loading loading-ring loading-md text-red-900"> </span>
    </div>
  );
};

export default Loader;
