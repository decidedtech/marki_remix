"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { modifyPolicyWithBenefit } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { formatPrice } from "@/utils/format-price";
import React from "react";

interface BenefitOption {
  name: string;
  value: number;
}

interface Benefit {
  name: string;
  rate?: string | number;
  value?: number;
  options?: BenefitOption[];
}

const benefitsConfig: Record<string, Benefit[]> = {
  "": [{ name: "Select a cover" }],
  "Private Car Comprehensive": [
    { name: "Excess Protector-OD", rate: "", value: 0 },
    { name: "Full Excess Protector", rate: "", value: 0 },
    { name: "PVTR", rate: "", value: 0 },
    {
      name: "Loss of Use",
      value: 0,
      options: [
        { name: "10 days", value: 3000 },
        { name: "20 days", value: 6000 },
        { name: "30 days", value: 9000 },
      ],
    },
    { name: "AA Membership", value: 6500 },
  ],
  "Motor Commercial Comprehensive": [
    { name: "Excess Protector-OD", rate: "", value: 0 },
    { name: "Full Excess Protector", rate: "", value: 0 },
    { name: "PVTR", rate: "", value: 0 },
  ],
  Commercial: [{ name: "PPL", rate: 500, value: 0 }],
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
          Submit
        </button>
      )}
    </>
  );
}

interface Props {
  sumInsured: string;
  vehiclePolicyId: string;
  totalBasicPremium: string;
  totalEndorsements: number;
  cover: string;
  coverName: string;
  initialBenefits: Benefit[];
}

export default function BenefitForm({
  sumInsured,
  vehiclePolicyId,
  totalBasicPremium,
  totalEndorsements,
  cover,
  coverName,
  initialBenefits,
}: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);

  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [availableBenefits, setAvailableBenefits] = useState<Benefit[]>([]);
  const [canAddBenefit, setCanAddBenefit] = useState<boolean>(false);
  const [lossOfUseOptions, setLossOfUseOptions] = useState<BenefitOption[]>([]);

  const assignBenefit = modifyPolicyWithBenefit.bind(
    null,
    session?.user.id as string,
    sumInsured,
    vehiclePolicyId,
    totalBasicPremium,
    totalEndorsements,
    benefits,
    coverName
  );

  const [state, formAction] = useFormState(assignBenefit, {
    message: "",
    benefitId: "",
  });

  useEffect(() => {
    if (cover in benefitsConfig) {
      const coverBenefits = benefitsConfig[cover] || [];
      const lossOfUseBenefit = coverBenefits.find(
        (benefit) => benefit.name === "Loss of Use"
      );

      setLossOfUseOptions(lossOfUseBenefit?.options || []);

      if (initialBenefits.length) {
        setBenefits(initialBenefits);
        setAvailableBenefits(
          coverBenefits.filter(
            (benefit) => !initialBenefits.some((b) => b.name === benefit.name)
          )
        );
      } else {
        setBenefits(coverBenefits);
        setAvailableBenefits(coverBenefits);
      }
    }
  }, [cover, initialBenefits]);

  useEffect(() => {
    setCanAddBenefit(
      availableBenefits.some(
        (benefit) => !benefits.some((b) => b.name === benefit.name)
      )
    );
  }, [availableBenefits, benefits]);

  const handleBenefitChange = (
    index: number,
    key: "rate" | "value" | "selectedOption",
    value: string | number | BenefitOption
  ) => {
    setBenefits((prevBenefits) => {
      const updatedBenefits = [...prevBenefits];
      const updatedBenefit = { ...updatedBenefits[index] };

      if (
        key === "selectedOption" &&
        typeof value === "object" &&
        "value" in value
      ) {
        updatedBenefit.value = (value as BenefitOption).value;
      } else if (key === "value") {
        updatedBenefit.value =
          typeof value === "number" ? value : parseFloat(value as string);
      } else if (key === "rate") {
        updatedBenefit.rate =
          typeof value === "number" ? value : value.toString();
      }

      updatedBenefits[index] = updatedBenefit;
      return updatedBenefits;
    });
  };

  const addBenefit = () => {
    const newBenefit = availableBenefits.find(
      (benefit) => !benefits.some((b) => b.name === benefit.name)
    );
    if (newBenefit) {
      setBenefits((prevBenefits) => [...prevBenefits, newBenefit]);
      setAvailableBenefits((prev) => prev.filter((b) => b !== newBenefit));
    }
  };

  const removeBenefit = (index: number) => {
    setBenefits((prevBenefits) => {
      const [removedBenefit] = prevBenefits.splice(index, 1);
      if (removedBenefit) {
        setAvailableBenefits((prev) => [...prev, removedBenefit]);
      }
      return [...prevBenefits];
    });
  };

  const isAdminOrModerator = session?.user.role === "admin" || session?.user.role === "moderator";

  if (!isAdminOrModerator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        You are not authorized to view this page!
      </main>
    );
  }

  return (
    <form ref={ref} action={formAction} className="p-1 w-full">
      <div className="flex justify-between items-center mt-4">
        <h6 className="font-semibold">Benefits for {cover}</h6>
        <div className="flex items-center">
          {canAddBenefit && (
            <button
              type="button"
              onClick={addBenefit}
              className="btn btn-circle btn-sm text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {benefits.length > 0 && <SubmitButton />}
        </div>
      </div>

      {benefits.map((benefit: any, index) => (
        <div key={index} className="flex flex-row flex-wrap w-full gap-2">
          <input
            type="text"
            value={benefit.name}
            readOnly
            className="input input-sm w-60 rounded input-bordered text-sm"
          />
          {benefit.name === "Loss of Use" && lossOfUseOptions.length > 0 && (
            <select
              value={
                benefit.options?.find((opt: any) => opt.value === benefit.value)
                  ?.name || ""
              }
              onChange={(e) =>
                handleBenefitChange(
                  index,
                  "selectedOption",
                  lossOfUseOptions.find(
                    (opt) => opt.name === e.target.value
                  ) || { name: "", value: 0 }
                )
              }
              className="select select-sm w-24 rounded input-bordered text-sm"
            >
              <option value="">Select Option</option>
              {lossOfUseOptions.map((option) => (
                <option key={option.value} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
          {benefit.name === "AA Membership" && (
            <input
              type="number"
              value={benefit.value}
              onChange={(e) =>
                handleBenefitChange(index, "value", parseFloat(e.target.value))
              }
              placeholder="Custom Value"
              className="input input-sm w-24 rounded input-bordered text-sm"
            />
          )}
          {benefit.rate !== undefined &&
            !["AA Membership", "Loss of Use"].includes(benefit.name) && (
              <input
                type="number"
                value={benefit.rate}
                onChange={(e) =>
                  handleBenefitChange(index, "rate", parseFloat(e.target.value))
                }
                placeholder="% rate"
                step=".01"
                className="input input-sm w-24 rounded input-bordered text-sm"
              />
            )}
          <button
            type="button"
            onClick={() => removeBenefit(index)}
            className="btn btn-circle btn-ghost btn-xs text-error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          <input
            type="number"
            value={
              benefit.name === "AA Membership" || benefit.name === "Loss of Use"
                ? benefit.value || 0
                : sumInsured
            }
            disabled
            className="input input-sm rounded w-28 input-bordered text-sm"
          />
          <h2 className="flex items-center font-semibold text-neutral">
            {/* {benefit.name === "AA Membership" || benefit.name === "Loss of Use"
              ? formatPrice(benefit.value || 0)
              : isNaN(parseFloat(sumInsured)) ||
                isNaN(parseFloat((benefit.rate ?? "0").toString()))
              ? "0"
              : formatPrice(
                  (parseFloat(sumInsured) *
                    parseFloat((benefit.rate ?? "0").toString())) /
                    100
                )} */}
            {/* {benefit.rate && (
              <span className="font-semibold">
                {benefit.name === "PVTR" && coverName.includes("PSV Chauffeur")
                  ? formatPrice(
                      Math.max(
                        3000,
                        (Number(benefit.rate) * (benefit.value || 0)) / 100
                      )
                    )
                  : benefit.name === "PVTR" &&
                    coverName === "Private Car Comprehensive"
                  ? formatPrice(
                      Math.max(
                        2500,
                        (Number(benefit.rate) * (benefit.value || 0)) / 100
                      )
                    )
                  : benefit.name === "Excess Protector-OD" &&
                    coverName === "Private Car Comprehensive"
                  ? formatPrice(
                      Math.max(
                        2500,
                        (Number(benefit.rate) * (benefit.value || 0)) / 100
                      )
                    )
                  : benefit.name === "Full Excess Protector" &&
                    coverName === "Private Car Comprehensive"
                  ? formatPrice(
                      Math.max(
                        5000, // Minimum value for Full Excess Protector OD
                        (Number(benefit.rate) * (benefit.value || 0)) / 100
                      )
                    )
                  : benefit.name === "AA Membership" ||
                    benefit.name === "Loss of Use"
                  ? formatPrice(benefit.value || 0)
                  : isNaN(parseFloat(sumInsured)) ||
                    isNaN(parseFloat((benefit.rate ?? "0").toString()))
                  ? "0"
                  : formatPrice(
                      (parseFloat(sumInsured) *
                        parseFloat((benefit.rate ?? "0").toString())) /
                        100
                    )}
              </span>
            )} */}
          {benefit.rate && (
  <span className="font-semibold">
    {benefit.name === "PVTR" && coverName.includes("PSV Chauffeur")
      ? formatPrice(
          Math.max(
            3000,
            (Number(benefit.rate) * (benefit.value || 0)) / 100
          )
        )
      : benefit.name === "PVTR" && coverName === "Private Car Comprehensive"
      ? formatPrice(
          Math.max(
            2500,
            (Number(benefit.rate) * (benefit.value || 0)) / 100
          )
        )
      : benefit.name === "Excess Protector-OD" &&
        coverName === "Private Car Comprehensive"
      ? formatPrice(
          Math.max(
            2500, // Minimum value for Excess Protector-OD
            (parseFloat(sumInsured) * parseFloat(benefit.rate)) / 100
          )
        )
      : benefit.name === "Full Excess Protector" &&
        coverName === "Private Car Comprehensive"
      ? formatPrice(
          Math.max(
            5000,
            (Number(benefit.rate) * (benefit.value || 0)) / 100
          )
        )
      : benefit.name === "AA Membership" || benefit.name === "Loss of Use"
      ? formatPrice(benefit.value || 0)
      : isNaN(parseFloat(sumInsured)) ||
        isNaN(parseFloat((benefit.rate ?? "0").toString()))
      ? "0"
      : formatPrice(
          (parseFloat(sumInsured) * parseFloat((benefit.rate ?? "0").toString())) / 100
        )}
  </span>
)}


          </h2>
        </div>
      ))}
    </form>
  );
}
