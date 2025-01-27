import { formatDate } from "@/utils/format-date";
import Logo from "@/public/logo.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { formatPrice } from "@/utils/format-price";
import BasicPremiumTable from "./tables/basic-premium";
import BenefitsTable from "./tables/benefits";
import EndorsementsTable from "./tables/endorsements";
import ExcessTable from "./tables/excess";
import LimitsTable from "./tables/limits";

interface Props {
  vehiclePolicy: any;
  policyPayments: any;
}

const PolicySummary = ({ vehiclePolicy }: Props) => {
  return (
    <div className="border flex flex-col rounded w-full p-4">
      <div className="p-2">
        <div className="badge badge-neutral text-warning text-sm font-semibold ">
          {vehiclePolicy.status}
        </div>
      </div>
      <div className="flex flex-col w-full ">
        <div className="mt-2 rounded-none  p-2">
          <div className="flex flex-row justify-between items-center">
            <figure className="w-16 h-16">
              <Image
                src={Logo}
                alt="Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </figure>
            <div className="flex flex-col justify-end">
              <h1 className="text-end font-semibold text-red-900">
                {vehiclePolicy.policy.name}
              </h1>
              <p className="font-bold text-end">{vehiclePolicy.regNo}</p>
            </div>
          </div>
          <p className="flex flex-row gap-2 items-center justify-end text-sm font-semibold">
            <span className=" text-sm text-gray-600">Serial:</span>
            {vehiclePolicy.serialNo}
          </p>
          <p className="flex flex-row gap-2 items-center justify-end text-sm font-bold">
            {vehiclePolicy.insurancePartner}
          </p>
          <p className="flex flex-row gap-2 items-center  justify-end font-semibold">
            <span className=" text-sm text-gray-600">Validity:</span>
            {vehiclePolicy.validity}
          </p>
          <div className="divider mt-0.5 mb-0.5"></div>
          <section className="flex flex-row justify-start gap-2 items-center">
            <h6 className="flex flex-row gap-2 text-gray-500 text-sm items-center font-semibold">
              Start Date:
              <span className="text-neutral">
                {formatDate(vehiclePolicy.validFrom)}
              </span>
            </h6>
            <h6 className="flex flex-row gap-2 text-gray-500 text-sm items-center font-semibold">
              Expiry:
              <span className=" text-neutral ">
                {formatDate(vehiclePolicy.validTill)}
              </span>
            </h6>
          </section>

          <h5 className="flex flex-row gap-2 py-1 text-sm items-center font-semibold">
            Sum Insured:
            <span className=" text-red-900">
              &nbsp;{formatPrice(vehiclePolicy.sumInsured)}
            </span>
          </h5>
          <h2 className=" font-bold text-blue-900">Basic Premium</h2>

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
            {/* <div className="divider divider-red-900 mb-0.5 mt-0.5"></div> */}
            <div className="flex flex-row gap-2 py-4 justify-end items-center font-semibold">
              Total:
              <span className="text-red-900  text-lg">
                &nbsp;{formatPrice(vehiclePolicy.premiumTotal)}
              </span>
            </div>
          </div>
        </div>
        <div className="divider mt-0.5 mb-0.5"></div>
        {vehiclePolicy.policy && (
          <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col w-full gap-4">
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
        <div className="flex flex-row justify-between mt-2 bg-red-900 w-full  p-2">
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

export default PolicySummary;
