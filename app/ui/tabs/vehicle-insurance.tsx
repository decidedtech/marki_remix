import React from "react";
import PolicySummary from "../policy-summary";
import Link from "next/link";
import { BASE_URL } from "@/constants/constants";

interface Props {
  cover: any;
  vehicleId: string;
}

const VehicleInsurance = ({ cover, vehicleId }: Props) => {
  return (
    <div className="w-full">
      <div className="flex flex-row  justify-between items-center w-full  ">
        {cover && (
          <div className="flex w-full flex-row justify-end items-center gap-2 font-semibold text-sm">
            <Link
              href={`${BASE_URL}/edit-policy/${cover.serialNo.toLowerCase()}`}
              className=" btn btn-primary btn-xs text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
              Edit
            </Link>
            <Link
              href={`${BASE_URL}/vehicle-policy/${cover.serialNo.toLowerCase()}`}
              className=" btn btn-primary btn-xs text-white"
            >
              View
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
      {cover ? (
        <PolicySummary
          vehiclePolicy={cover}
          policyPayments={cover && cover.payment}
        />
      ) : (
        <div className="mt-2">
          <Link
            href={`${BASE_URL}/assign-a-policy/${vehicleId}`}
            className="btn btn-ghost btn-xs text-red-800"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Assign Cover
          </Link>
        </div>
      )}
    </div>
  );
};

export default VehicleInsurance;
