"use client";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { modifyBasicPremium } from "@/lib/actions";
import { useSession } from "next-auth/react";
// import { formatPrice } from "@/utils/format-price";
import React from "react";

const initialState = {
  message: "",
  policyId: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div className="flex flex-row items-center gap-1 text-red-900">
          <div className="loading loading-ring  loading-lg "></div>
          Saving...
        </div>
      ) : (
        <button type="submit" className="btn btn-sm bg-red-900 text-white">
          Update
        </button>
      )}
    </>
  );
}
interface Props {
  coverName: string;
  vehiclePolicyId: string;
  valuation: number;
  basicPremium: any;
  totalBenefits: number;
  totalEndorsements: number;
}

export default function BasicPremiumForm({
  coverName,
  vehiclePolicyId,
  valuation,
  basicPremium,
  totalBenefits,
  totalEndorsements,
}: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const [rate, setRate] = useState(basicPremium.rate);
   const modifyPremium = modifyBasicPremium.bind(
    null,
    session?.user.id as string,
    vehiclePolicyId,
    valuation,
    totalBenefits,
    totalEndorsements,
    coverName
  );

  const [state, formAction] = useFormState(modifyPremium, initialState);
  const isAdminOrModerator = session?.user.role === "admin" || session?.user.role === "moderator";

  if (!isAdminOrModerator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        You are not authorized to view this page!
      </main>
    );
  }

  return (
    <form ref={ref} action={formAction} className="p-1 lg:p-2 sm:p-1 w-full">
      <div className=" flex flex-row justify-between items-center gap-2">
        <h6 className=" font-semibold text-sm text-red-900">
          Edit Basic Premium
        </h6>
        <div className="flex justify-end items-center">
          <SubmitButton />
        </div>
      </div>
      <div className="flex flex-row items-center flex-wrap gap-2">
        <label className=" max-w-xs">
          <input
            type="number"
            defaultValue={valuation}
            disabled
            className="  input input-sm w-60 rounded input-bordered"
          />
        </label>

        {coverName === "Motor Private Third Party (TPO)" ? (
          <label className="form-control w-24">
            <select
              id="premiumRate"
              name="premiumRate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="select select-sm w-full rounded input-bordered"
            >
              <option value="7500">7500</option>
              <option value="10000">10000</option>
              <option value="12000">12000</option>
            </select>
          </label>
        ) : (
          <label className="form-control w-24">
            <input
              type="text"
              id="premiumRate"
              name="premiumRate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="% rate"
              step=".01"
              className="input input-sm w-full rounded input-bordered"
            />
          </label>
        )}
        <div className="flex items-center">
          <h2>
            {isNaN(parseFloat(rate))
              ? "0"
              : coverName === "Motor Private Third Party (TPO)"
              ? `Ksh ${rate}`
              : coverName === "Private Car Comprehensive"
              ? `Ksh ${Math.max(37500, (parseFloat(rate) * valuation) / 100)}`
              : coverName === "PSV Chauffeur Driven(Uber)"
              ? `Ksh ${Math.max(55000, (parseFloat(rate) * valuation) / 100)}`
              : `Ksh ${(parseFloat(rate) * valuation) / 100}`}
          </h2>
        </div>
      </div>
    </form>
  );
}
