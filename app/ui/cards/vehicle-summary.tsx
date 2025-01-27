import { BASE_URL } from "@/constants/constants";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";

interface Props {
  vehicle: any;
  policy: string;
}
const VehicleSummaryCard = ({ vehicle, policy }: Props) => {
  return (
    <div className="flex flex-col gap-1 border shadow  rounded p-4">
      <h1 className="font-bold text-red-600 text-sm">{vehicle.make}</h1>
      <h1 className="font-bold text-info text-sm">{vehicle.model}</h1>
      {/* <h1 className="font-thin text-xl">{vehicle.regNo}</h1> */}
      <h1 className="font-light text-xs text-gray-500">Reg No:</h1>
      <h1 className="font-bold text-xs pl-1">{vehicle.regNo}</h1>
      <div className="flex flex-row flex-wrap items-center text-xs gap-1 text-gray-500">
        Valuation:
        <p className=" font-semibold text-xs text-neutral">
          {formatPrice(vehicle.valuation)}
        </p>
      </div>
      <h1 className="font-light text-xs text-gray-500">Color:</h1>
      <h1 className="font-bold text-xs pl-1">{vehicle.color}</h1>
      <h1 className="font-light text-xs text-gray-500">
        Cover:
        <span className="font-bold text-xs pl-1">{policy}</span>
      </h1>
      <Link
        href={`${BASE_URL}/vehicle/${vehicle.regNo.toLowerCase()}`}
        className="btn btn-sm btn-ghost justify-end text-primary"
      >
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
        View
      </Link>
    </div>
  );
};

export default VehicleSummaryCard;
