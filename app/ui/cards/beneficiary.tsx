import { BASE_URL } from "@/constants/constants";
import Link from "next/link";
import React from "react";

interface Props {
  beneficiary: any;
}
const BeneficiaryCard = ({ beneficiary }: Props) => {
  return (
    <div className="p-3 border shadow rounded-sm">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg text-neutral font-semibold">Owned By</h2>
        <Link
          href={`${BASE_URL}/client/${beneficiary.slug}`}
          className="btn btn-sm btn-ghost text-primary"
        >
          view
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
      <div className="flex flex-row gap-2 flex-wrap font-semibold text-red-900 text-sm">
        <h5>
          <span className="text-xs font-thin text-neutral">Name: &nbsp;</span>
          {beneficiary.name}
        </h5>
        <h5>
          <span className="text-xs font-thin text-neutral">Phone: &nbsp;</span>
          {beneficiary.phone}
        </h5>
        <h5>
          <span className="text-xs font-thin text-neutral">Email: &nbsp;</span>
          {beneficiary.email}
        </h5>
      </div>
    </div>
  );
};

export default BeneficiaryCard;
