"use client";

import savePdf from "@/utils/save-pdf";
import React, { ReactNode, useRef } from "react";

interface Props {
  vehiclePolicy: any;
  children: ReactNode;
  type: string;
}

const DownloadWrapper = ({ vehiclePolicy, children, type }: Props) => {
  const componentRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (componentRef.current) {
      await savePdf(componentRef.current, vehiclePolicy.regNo, type);
    }
  };
  return (
    <div className=" w-full  ">
      <div className=" flex justify-end  w-full ">
        <button
          onClick={handleDownloadPDF}
          className="btn btn-sm bg-red-900 text-white"
        >
          Download
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      </div>
      <div ref={componentRef} className="  w-full bg-white">
        {children}
      </div>
    </div>
  );
};

export default DownloadWrapper;
