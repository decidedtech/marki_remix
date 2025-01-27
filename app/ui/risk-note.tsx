import { formatDate } from "@/utils/format-date";

import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/format-price";
import InsuredCard from "./cards/insured";
import RiskNoteVehicleCard from "./cards/risk-note-vehicle";
import BasicPremiumTable from "./tables/basic-premium";
import LimitsTable from "./tables/limits";
import ExcessTable from "./tables/excess";
import BenefitsEditTable from "./tables/benefits-edit";
import EndorsementsEditTable from "./tables/endorsements-edit";
import CompanyAddress from "./company/address";
const BasicPremiumForm = dynamic(
  () => import("@/ui/forms/basic-premium-form"),
  {
    ssr: false,
  }
);
const StartDateForm = dynamic(() => import("@/ui/forms/start-date-form"), {
  ssr: false,
});
const EndorsementForm = dynamic(() => import("@/ui/forms/endorsement-form"), {
  ssr: false,
});
const BenefitForm = dynamic(() => import("@/ui/forms/benefit-form"), {
  ssr: false,
});
interface Props {
  vehiclePolicy: any;
  vehicle: any;
}

const RiskNote = ({ vehiclePolicy, vehicle }: Props) => {
  const totalEndorsements: number = vehiclePolicy.endorsements.reduce(
    (sum: number, endorsement: any) => {
      return sum + parseFloat(endorsement.total);
    },
    0
  );
  const totalBenefits: number = vehiclePolicy.benefits.reduce(
    (sum: number, endorsement: any) => {
      return sum + parseFloat(endorsement.total);
    },
    0
  );
  return (
    <div className="flex flex-col w-full p-1 lg:p-4 md:p-2 sm:p-1 border rounded bg-white">
      <div className="flex flex-col mt-2 ">
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
        <StartDateForm vehiclePolicyId={vehiclePolicy._id} />
        <div className="divider mt-0.5 mb-0.5"></div>
        <h1 className="py-2 text-sm font-semibold">Description</h1>
        <div className="flex flex-row  w-full justify-start items-start gap-2">
          <div className="flex w-full lg:w-1/2 md:w-1/2 sm:w-full flex-col  border  p-4">
            <RiskNoteVehicleCard vehicle={vehicle} />
          </div>
          <div className="flex w-full lg:w-1/2 md:w-1/2 sm:w-full flex-col  border  p-4">
            <InsuredCard client={vehicle.carOwner} />
          </div>
        </div>

        <div className="divider mt-0.5 mb-0.5"></div>
        <h2 className=" font-bold text-xs text-neutral">Basic Premium</h2>
        {vehiclePolicy.basicPremium && (
          <BasicPremiumTable vehiclePolicy={vehiclePolicy} />
        )}

        <h2 className=" font-bold text-xs text-neutral py-1">Benefits</h2>

        <BenefitsEditTable vehiclePolicy={vehiclePolicy} />

        <h2 className="font-bold text-xs text-neutral py-1">Endorsements</h2>

        <EndorsementsEditTable vehiclePolicy={vehiclePolicy} />

        <div className="mt-2">
          {vehiclePolicy.basicPremium && (
            <BasicPremiumForm
              coverName={vehiclePolicy.policy.name}
              vehiclePolicyId={vehiclePolicy._id}
              valuation={vehiclePolicy.sumInsured}
              totalBenefits={totalBenefits}
              totalEndorsements={totalEndorsements}
              basicPremium={vehiclePolicy.basicPremium}
            />
          )}

          <BenefitForm
            coverName={vehiclePolicy.policy.name}
            sumInsured={vehiclePolicy.sumInsured}
            vehiclePolicyId={vehiclePolicy._id}
            totalBasicPremium={vehiclePolicy.basicPremium.total}
            cover={vehiclePolicy.policy.name}
            initialBenefits={vehiclePolicy.benefits}
            totalEndorsements={totalEndorsements}
          />
          <EndorsementForm
            sumInsured={vehiclePolicy.sumInsured}
            vehiclePolicyId={vehiclePolicy._id}
            premiumTotal={vehiclePolicy.premiumTotal}
            ipcf={vehiclePolicy.ipcf}
            itl={vehiclePolicy.itl}
          />
        </div>

        <h2 className="text-sm font-semibold text-neutral ml-2 mt-2">Notes</h2>
        <p className="text-xs ml-2">{vehiclePolicy.additionalNotes}</p>

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
          <div className="flex flex-row gap-2 items-center text-sm justify-end">
            Total:
            <p className="text-red-900  text-lg">
              &nbsp;{formatPrice(vehiclePolicy.premiumTotal)}
            </p>
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
  );
};

export default RiskNote;
