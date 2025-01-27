"use client";

import savePdf from "@/utils/save-pdf";
import React, { useRef } from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/format-price";
import BenefitsTable from "./tables/benefits";
import LimitsTable from "./tables/limits";
import ExcessTable from "./tables/excess";
import EndorsementsTable from "./tables/endorsements";
import BasicPremiumTable from "./tables/basic-premium";
import CompanyAddress from "./company/address";

interface Props {
  vehiclePolicy: any;
}

const Policy = ({ vehiclePolicy }: Props) => {
  const componentRef = useRef(null);

  console.log("policy", vehiclePolicy);
  const handleDownloadPDF = async () => {
    if (componentRef.current) {
      await savePdf(
        componentRef.current,
        vehiclePolicy.regNo,
        "Marki-Quotation"
      );
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
      <div
        ref={componentRef}
        className="flex flex-col w-full p-1 lg:p-4 md:p-3 sm:p-0.5 bg-white"
      >
        <div className="mt-2 rounded-none p-1.5">
          <div className="flex flex-row justify-between items-center">
            <CompanyAddress />

            <div className="flex flex-col justify-end">
              <h1 className="text-end font-semibold">
                {vehiclePolicy.policy.name}
              </h1>
              <p className="font-bold text-end">{vehiclePolicy.regNo}</p>
            </div>
          </div>
          <p className="flex flex-row gap-2 items-center justify-end text-sm font-semibold">
            <span className=" text-sm font-thin text-gray-600">Serial:</span>
            {vehiclePolicy.serialNo}
          </p>
          <p className="flex flex-row gap-2 items-center justify-end text-sm font-bold">
            {vehiclePolicy.insurancePartner}
          </p>
          <p className="flex flex-row gap-2 items-center  justify-end font-semibold">
            <span className=" text-sm font-thin text-gray-600">Duration:</span>
            {vehiclePolicy.validity}
          </p>

          <p className="flex flex-row gap-2  text-sm items-center font-thin">
            Sum Insured:
            <span className=" text-primary font-semibold">
              &nbsp;{formatPrice(vehiclePolicy.sumInsured)}
            </span>
          </p>

          <div className="divider mt-0.5 mb-0.5"></div>
          <h2 className=" font-bold text-sm text-blue-900">Basic Premium</h2>

          {vehiclePolicy.basicPremium && (
            <BasicPremiumTable vehiclePolicy={vehiclePolicy} />
          )}

          {vehiclePolicy.benefits.length > 0 && (
            <>
              <h2 className=" font-bold text-sm text-blue-900 py-1">
                Benefits
              </h2>

              <BenefitsTable vehiclePolicy={vehiclePolicy} />
            </>
          )}

          {vehiclePolicy.endorsements.length > 0 && (
            <>
              <h2 className="font-bold text-sm text-blue-900 py-1">
                Endorsements
              </h2>

              <EndorsementsTable vehiclePolicy={vehiclePolicy} />
            </>
          )}

          <section className="py-1">
            <h2 className="font-bold text-blue-900 ">Notes</h2>
            <p className="text-xs">{vehiclePolicy.additionalNotes}</p>
          </section>
          <div className="flex flex-col w-full justify-end mt-2 font-semibold   text-sm">
            <p className="flex flex-row gap-2 text-sm justify-end">
              <span className="font-normal">ITL:</span>
              {formatPrice(vehiclePolicy.itl)}
            </p>
            <p className="flex flex-row gap-2 text-sm justify-end">
              <span className="font-normal">IPCF:</span>
              {formatPrice(vehiclePolicy.ipcf)}
            </p>
            <p className="flex flex-row gap-2 text-sm justify-end">
              <span className="font-normal">Stamp Duty:</span>
              {formatPrice(vehiclePolicy.stampDuty)}
            </p>

            <div className="flex flex-row gap-2 py-2 justify-end items-center font-semibold">
              Total:
              <span className="text-red-900  text-lg">
                &nbsp;{formatPrice(vehiclePolicy.premiumTotal)}
              </span>
            </div>
          </div>
          <div className="divider divider-red-900 mb-0.5 mt-0.5"></div>

          {vehiclePolicy.policy && (
            <div className="flex flex-row lg:flex-row md:flex-row sm:flex-col w-full gap-4">
              <div className="w-full lg-w-1/2 md:w-1/2 sm:w-full">
                <h2 className="font-semibold text-sm">Limits Of Liability</h2>
                <LimitsTable policy={vehiclePolicy.policy} />
              </div>
              <div className="w-full lg-w-1/2 md:w-1/2 sm:w-full">
                <h2 className="font-semibold text-sm">Excess</h2>
                <ExcessTable policy={vehiclePolicy.policy} />
              </div>
            </div>
          )}

          <h2 className="flex justify-end font-bold text-xs">
            Secure With Trust
          </h2>
          <div className="flex flex-row justify-between bg-red-900 w-full p-2">
            <h1 className=" text-white text-xs">Marki Insurance Agency</h1>
            <Link
              href="https://www.marki.co.ke"
              className="text-center text-white text-sm"
            >
              www.marki.co.ke
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
