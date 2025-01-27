import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";
import CompanyAddress from "../company/address";
import BasicPremiumTable from "../tables/basic-premium";
import BenefitsTable from "../tables/benefits";
import EndorsementsTable from "../tables/endorsements";
import ExcessTable from "../tables/excess";
import LimitsTable from "../tables/limits";

interface Props {
  vehiclePolicy: any;
}
const ReceiptDownloadContent = ({ vehiclePolicy }: Props) => {
  return (
    <div className="flex flex-col border rounded lg:p-8 md:p-2 sm:p-1">
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

      <h2 className=" font-bold text-blue-900">Quotation Details</h2>

      <div className="divider mt-0.5 mb-0.5"></div>
      <p className="flex flex-row gap-2 mb-2  text-sm items-center font-thin">
        Sum Insured:
        <span className=" text-primary font-semibold">
          &nbsp;{formatPrice(vehiclePolicy.sumInsured)}
        </span>
      </p>
      <h2 className=" font-bold text-sm text-blue-900">Basic Premium</h2>

      <BasicPremiumTable vehiclePolicy={vehiclePolicy} />

      <h2 className=" font-bold text-sm text-blue-900 py-1">Benefits</h2>
      <BenefitsTable vehiclePolicy={vehiclePolicy} />

      <h2 className="font-bold text-sm text-blue-900 py-1">Endorsements</h2>

      <EndorsementsTable vehiclePolicy={vehiclePolicy} />

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

      <h2 className="flex justify-end font-bold text-xs">Secure With Trust</h2>
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
  );
};

export default ReceiptDownloadContent;
