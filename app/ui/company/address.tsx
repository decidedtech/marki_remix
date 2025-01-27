import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";

const CompanyAddress = () => {
  return (
    <div>
      <figure className="w-16 h-16">
        <Image
          src={Logo}
          alt="Logo"
          width={100}
          height={100}
          className="object-cover"
        />
      </figure>
      <p className="text-sm">P.O Box 38490-00623, Parklands Kenya</p>
      <p className="text-sm">RingRoad, Westlands</p>
      <p className="text-sm">No 6, Westlands Commercial.</p>
    </div>
  );
};

export default CompanyAddress;
