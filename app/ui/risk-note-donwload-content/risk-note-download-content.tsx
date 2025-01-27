import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";

import BasicPremiumTable from "../tables/basic-premium";
import BenefitsTable from "../tables/benefits";
import EndorsementsTable from "../tables/endorsements";
import ExcessTable from "../tables/excess";
import LimitsTable from "../tables/limits";
import CompanyAddress from "../company/address";
import InsuredCard from "../cards/insured";
import RiskNoteVehicleCard from "../cards/risk-note-vehicle";

interface Props {
  vehiclePolicy: any;
  vehicle: any;
}

const RiskNoteDownloadContent = ({ vehiclePolicy, vehicle }: Props) => {
  return (
    <div className="flex flex-col border rounded lg:p-8 md:p-2 sm:p-1">
      <h1 className="flex text-error font-semibold justify-end ">RISK NOTE</h1>
      <div className="flex flex-row justify-between items-start">
        <CompanyAddress />
        <h1 className="py-2 text-sm font-semibold">
          {vehiclePolicy.policy.name}
        </h1>
      </div>
      <h6 className="flex flex-row gap-1.5 items-center justify-end font-bold text-sm">
        <span className=" text-sm font-thin ">Serial:</span>
        {vehiclePolicy.serialNo}
      </h6>

      <h6 className="flex flex-row gap-2 items-center text-neutral text-sm font-semibold  justify-end ">
        <span className=" text-sm font-thin">Duration:</span>
        Annual
      </h6>
      <h6 className="text-primary text-sm font-bold">
        <span className="text-neutral">Start Date: </span>
        {formatDate(vehiclePolicy.validFrom)}
      </h6>

      <div className="divider mt-0.5 mb-0.5"></div>
      <h1 className="py-2 text-sm text-red-900 font-semibold">Description</h1>
      <div className="flex flex-row  w-full justify-start items-start gap-2">
        <div className="flex w-full lg:w-1/2 md:w-1/2 sm:w-full flex-col  border  p-4">
          <RiskNoteVehicleCard vehicle={vehicle} />
        </div>
        <div className="flex w-full lg:w-1/2 md:w-1/2 sm:w-full flex-col  border p-4">
          <InsuredCard client={vehicle.carOwner} />
        </div>
      </div>

      <div className="divider mt-0.5 mb-0.5"></div>
      <h2 className=" font-bold text-xs text-neutral">Basic Premium</h2>

      <BasicPremiumTable vehiclePolicy={vehiclePolicy} />

      {vehiclePolicy.benefits.length > 0 && (
        <>
          <h2 className=" font-bold text-xs text-neutral py-1">Benefits</h2>
          <BenefitsTable vehiclePolicy={vehiclePolicy} />
        </>
      )}

      {vehiclePolicy.endorsements.length > 0 && (
        <>
          <h2 className="font-bold text-xs text-neutral py-1">Endorsements</h2>
          <EndorsementsTable vehiclePolicy={vehiclePolicy} />
        </>
      )}

      <h2 className="text-sm font-semibold text-neutral mt-2">Notes</h2>
      <p className="text-xs">{vehiclePolicy.additionalNotes}</p>

      <div className="flex flex-col w-full justify-end font-semibold mt-2  text-sm">
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
        <p className="flex flex-row gap-2 items-center text-sm justify-end">
          Total:
          <span className="text-red-900  text-lg">
            &nbsp;{formatPrice(vehiclePolicy.premiumTotal)}
          </span>
        </p>
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

export default RiskNoteDownloadContent;
