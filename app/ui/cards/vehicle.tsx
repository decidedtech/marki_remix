import { BASE_URL } from "@/constants/constants";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";

interface Props {
  vehicle: any;
}
const VehicleCard = ({ vehicle }: Props) => {
  return (
    <div className="flex justify-start flex-col min-w-52 gap-1 border shadow p-4 ">
      <h2 className="font-semibold text-red-600">{vehicle.make}</h2>
      <h2 className="font-semibold text-sm  text-info">{vehicle.model}</h2>
      <Link
        href={`${BASE_URL}/vehicle/${vehicle.regNo.toLowerCase()}`}
        className="font-semibold btn-link text-blue-700 text-sm"
      >
        {vehicle.regNo}
      </Link>
      <h6 className="flex text-xs flex-row items-center text-gray-500 gap-1">
        Color:
        <span className="font-semibold text-xs text-neutral">
          {vehicle.color}
        </span>
      </h6>
      <h6 className="flex flex-row text-xs flex-wrap items-center gap-1 text-gray-500">
        CNo:
        <span className="font-semibold text-xs text-neutral">
          {vehicle.chassisNo}
        </span>
      </h6>
      <h6 className="flex flex-row text-xs flex-wrap items-center gap-1 text-gray-500">
        ENo:
        <span className="font-semibold text-xs text-neutral">
          {vehicle.engineNo}
        </span>
      </h6>

      <h6 className="flex flex-row text-xs items-center gap-1 text-gray-500">
        Rating:
        <span className="font-semibold text-sm text-neutral">
          {vehicle.engineCapacity}
        </span>
      </h6>
      <h6 className="flex flex-row text-xs items-center gap-1 text-gray-500">
        Y.O.M:
        <span className="font-semibold text-xs text-neutral">
          {vehicle.yom}
        </span>
      </h6>
      <h6 className="flex flex-row text-xs items-center gap-1 text-gray-500">
        Passengers:
        <span className="font-semibold text-sm text-neutral">
          {vehicle.passengers}
        </span>
      </h6>
      <div className="flex flex-row flex-wrap items-center text-xs gap-1 text-gray-500">
        Valuation:
        <p className=" font-semibold text-xs text-neutral">
          {formatPrice(vehicle.valuation)}
        </p>
      </div>
      {vehicle.cover ? (
        <Link
          href={`${BASE_URL}/vehicle-policy/${vehicle.cover.serialNo.toLowerCase()}`}
          className="text-xs text-info"
        >
          {vehicle.cover.policy.name}
        </Link>
      ) : (
        <p className="text-xs text-warning">No Insurance Cover</p>
      )}
    </div>
  );
};

export default VehicleCard;
