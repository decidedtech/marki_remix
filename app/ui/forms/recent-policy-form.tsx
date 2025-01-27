"use client";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import Select from "react-select";
import { insurancePartners } from "@/constants/constants";
import { formatPrice } from "@/utils/format-price";
import SubmitButton from "../buttons/submit-button";
import {
  createVehicleCover,
  CoverState,
  createBackdatedVehicleCover,
} from "@/lib/actions/vehicle-policy";
import { calculateDateAfter365Days } from "@/utils/calculate-365-days";
import { formatDate } from "@/utils/format-date";

interface Endorsement {
  name: string | number;
  rate?: number | string; // rate can be number or string (like %)
  value: number;
}

interface BenefitOption {
  name: string;
  value: number;
}

// Define the type for benefits
interface Benefit {
  name: string;
  rate?: string | number; // Some don't have rate
  value?: number;
  seats?: number;
  amount?: string | number;
  options?: BenefitOption[]; // Optional options field
}

const benefitsConfig: Record<string, Benefit[]> = {
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
  Commercial: [{ name: "PLL", amount: 500, seats: 0 }],
  "PSV Chauffeur Driven(Uber)": [
    { name: "Excess Protector-OD", rate: "", value: 0 },
    { name: "PVTR", rate: "", value: 0 },
    { name: "PLL", amount: 500, seats: 0 },
  ],
};

interface Props {
  vehicleId: string;
  covers: any;
  vehicle: any;
}

export default function RecentPolicyForm({
  vehicleId,
  covers,
  vehicle,
}: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: CoverState = {
    message: null,
    errors: {},
    vehicleId: null,
  };
  const [startDate, setStartDate] = useState("");
  const [selectedCover, setSelectedCover] = useState<string>("");
  const [coverName, setCoverName] = useState<string>("");
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [rate, setRate] = useState("");
  const [valuation, setValuation] = useState(vehicle.valuation);

  const assignInsurance = createBackdatedVehicleCover.bind(
    null,
    session?.user.id as string,
    benefits,
    endorsements,
    vehicleId,
    vehicle,
    coverName,
    valuation
  );

  const [state, formAction] = useFormState(assignInsurance, initialState);

  // Handle Cover Change
  const handleCoverChange = (coverId: string) => {
    const selectedCoverObj = covers.find((cover: any) => cover._id === coverId);
    const coverName = selectedCoverObj?.name;
    if (coverName && benefitsConfig[coverName]) {
      const defaultBenefits = benefitsConfig[coverName].map((benefit: any) => {
        if (
          ["Excess Protector-OD", "Full Excess Protector", "PVTR"].includes(
            benefit.name
          )
        ) {
          return { ...benefit, value: parseFloat(valuation) };
        }
        return benefit;
      });

      setSelectedCover(coverId);
      setCoverName(coverName);
      setBenefits(defaultBenefits);
    }
  };
  useEffect(() => {
    const updatedBenefits = benefits.map((benefit) => {
      if (
        ["Excess Protector-OD", "Full Excess Protector", "PVTR"].includes(
          benefit.name
        )
      ) {
        return { ...benefit, value: parseFloat(valuation) };
      }
      return benefit;
    });
    setBenefits(updatedBenefits);
  }, [valuation]);

  // Handle Benefit Change
  const handleBenefitChange = (
    index: number,
    key: "rate" | "value" | "seats" | "amount",
    value: number
  ) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index][key] = value;
    setBenefits(updatedBenefits);
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const handleEndorsementChange = (
    index: number,
    field: keyof Endorsement,
    value: string | number
  ) => {
    const updatedEndorsements = [...endorsements];

    if (field === "rate") {
      updatedEndorsements[index][field] = value as string; // Handle 'rate' as string or number
    } else if (field === "value") {
      updatedEndorsements[index][field] = value as number; // Handle 'value' as number
    } else {
      updatedEndorsements[index][field] = value;
    }

    setEndorsements(updatedEndorsements);
  };

  const addEndorsement = () => {
    setEndorsements([...endorsements, { name: "", rate: "", value: 0 }]);
  };

  const removeEndorsement = () => {
    setEndorsements((prevEndorsements) => prevEndorsements.slice(0, -1));
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
    <form ref={ref} action={formAction} className="flex flex-col gap-2 w-full">
      {covers && (
        <label className="form-control  max-w-sm">
          <div className="label">
            <span className="label-text">Select a Policy</span>
          </div>
          <select
            id="cover"
            name="cover"
            value={selectedCover}
            onChange={(e) => handleCoverChange(e.target.value)}
            className=" select select-sm w-full select-bordered rounded"
          >
            <option value="" disabled>
              Select a policy
            </option>
            {covers.map((cover: any) => (
              <option key={cover._id} value={cover._id}>
                {cover.name}
              </option>
            ))}
          </select>
          {state.errors?.policy &&
            state.errors.policy.map((error: string) => (
              <p className="mt-1 text-xs text-red-500" key={error}>
                {error}
              </p>
            ))}
        </label>
      )}
      <div className="flex flex-row flex-wrap gap-2 w-full">
        <label className="form-control w-40 max-w-xs">
          <div className="label">
            <span className="label-text">Vehicle Registration</span>
          </div>
          <input
            id="regNo"
            name="regNo"
            disabled
            defaultValue={vehicle.regNo}
            placeholder="Vehicle Reg No"
            className="input w-full input-sm rounded input-bordered"
          />
        </label>
        <label className="form-control w-40 max-w-xs">
          <div className="label">
            <span className="label-text">Sum Insured</span>
          </div>
          <input
            id="sumInsured"
            name="sumInsured"
            defaultValue={valuation}
            onChange={(e) => setValuation(e.target.value)}
            type="number"
            placeholder="Sum insured"
            className="input input-sm w-full rounded input-bordered"
          />
        </label>
        <label className="form-control  max-w-sm">
          <div className="label">
            <span className="label-text">Insurance Partner</span>
          </div>

          <Select
            id="insurancePartner"
            name="insurancePartner"
            className="basic-single w-52"
            classNamePrefix="select"
            placeholder="Insurance Partner"
            isSearchable={true}
            options={insurancePartners}
            // styles={customStyles}
          />
          {state.errors?.insurancePartner &&
            state.errors.insurancePartner.map((error: string) => (
              <p className="mt-1 text-xs text-red-500" key={error}>
                {error}
              </p>
            ))}
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-semibold">Basic Premium</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className=" w-52">
            <input
              type="number"
              defaultValue={valuation}
              disabled
              placeholder={valuation}
              className="input input-sm w-full rounded input-bordered"
            />
          </label>
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
            {state.errors?.premiumRate &&
              state.errors.premiumRate.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </label>
          <div className="flex items-center">
            <h2>
              {isNaN(parseFloat(rate))
                ? "0"
                : coverName === "PSV Chauffeur Driven(Uber)"
                ? `Ksh ${Math.max(
                    55000,
                    (parseFloat(rate) * vehicle.valuation) / 100
                  )}`
                : `Ksh ${(parseFloat(rate) * vehicle.valuation) / 100}`}
            </h2>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Cover Period</h3>
      </div>
      <div className="flex flex-row items-center gap-2">
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Start Date</span>
          </div>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
            className="input input-sm w-full rounded input-bordered"
          />
          {state.errors?.validFrom &&
            state.errors.validFrom.map((error: string) => (
              <p className="mt-1 text-xs text-red-500" key={error}>
                {error}
              </p>
            ))}
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Valid Till</span>
          </div>

          {startDate && (
            <p className="text-primary">
              {" "}
              {formatDate(calculateDateAfter365Days(startDate))}
            </p>
          )}
        </label>
      </div>
      <div className="flex flex-col  border p-3 rounded">
        <h3 className=" font-semibold">Benefits</h3>

        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-row items-center gap-1">
            <h4 className="text-sm w-40 ">{benefit.name}</h4>
            {benefit.rate !== undefined && (
              <input
                type="number"
                placeholder="Rate"
                required
                value={benefit.rate}
                onChange={(e) =>
                  handleBenefitChange(index, "rate", Number(e.target.value))
                }
                className="input input-sm input-bordered rounded"
              />
            )}

            {/* Value input (if applicable) */}
            {benefit.value !== undefined && !benefit.options && (
              <input
                type="number"
                placeholder="Value"
                value={benefit.value}
                disabled
                onChange={(e) =>
                  handleBenefitChange(index, "value", Number(e.target.value))
                }
                className="input w-32 input-sm input-disbled rounded"
              />
            )}
            {benefit.amount !== undefined && !benefit.options && (
              <input
                type="number"
                placeholder="Value"
                value={benefit.amount}
                disabled
                onChange={(e) =>
                  handleBenefitChange(index, "amount", Number(e.target.value))
                }
                className="input w-32 input-sm input-disbled rounded"
              />
            )}

            {/* Options for "Loss of Use" */}
            {benefit.options && (
              <select
                value={benefit.value || ""}
                onChange={(e) =>
                  handleBenefitChange(index, "value", Number(e.target.value))
                }
                className="select select-bordered select-sm"
              >
                <option value="" disabled>
                  Select an option
                </option>{" "}
                {/* Empty option */}
                {benefit.options.map((option: any, i: number) => (
                  <option key={i} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            )}
            {benefit.seats !== undefined && (
              <input
                type="number"
                placeholder="Seats"
                required
                value={benefit.seats}
                onChange={(e) =>
                  handleBenefitChange(index, "seats", Number(e.target.value))
                }
                className="input w-20 input-sm input-bordered rounded"
              />
            )}

            {benefit.rate && (
              <span className="font-semibold">
                {benefit.name === "PVTR" && coverName.includes("PSV Chauffeur")
                  ? formatPrice(
                      Math.max(
                        3000,
                        (Number(benefit.rate) * (benefit.value || 0)) / 100
                      )
                    )
                  : benefit.value &&
                    formatPrice(
                      (Number(benefit.rate) * Number(benefit.value)) / 100
                    )}
              </span>
            )}

            {benefit.seats && benefit.amount && (
              <span className="font-semibold">
                {formatPrice(Number(benefit.seats) * Number(benefit.amount))}
              </span>
            )}
            <button
              onClick={() => handleRemoveBenefit(index)}
              className="btn btn-ghost btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-error"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
            {/* {state.errors?.benefits && state.errors.benefits[index] && (
              <p className="mt-1 text-xs text-red-500">
                {state.errors.benefits[index]}
              </p>
            )} */}
          </div>
        ))}
        {/* {state.errors?.benefits &&
          state.errors.benefits.map((error: string) => (
            <p className="mt-1 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))} */}
      </div>
      <div className="flex flex-col gap-1 border p-3 rounded-lg">
        <h3 className="font-semibold">Endorsements</h3>

        {endorsements.map((value, valueIndex) => (
          <div key={valueIndex} className="flex flex-wrap gap-2">
            <label className="  max-w-xs">
              <input
                type="text"
                value={value.name}
                onChange={(e) =>
                  handleEndorsementChange(valueIndex, "name", e.target.value)
                }
                required
                placeholder="Endorsement name"
                className="input input-sm w-full rounded input-bordered"
              />
            </label>
            <label className="form-control w-24">
              <input
                type="number"
                value={value.rate}
                onChange={(e) =>
                  handleEndorsementChange(valueIndex, "rate", e.target.value)
                }
                required
                step=".01"
                placeholder="% rate"
                className="input w-full input-sm rounded input-bordered"
              />
            </label>
            <label className="form-control w-24">
              <input
                type="number"
                value={value.value}
                onChange={(e) =>
                  handleEndorsementChange(valueIndex, "value", e.target.value)
                }
                required
                placeholder="Value"
                className="input input-sm w-full rounded input-bordered"
              />
            </label>
            <div className="flex items-center">
              <h2>
                {isNaN(Number(value.value)) || isNaN(Number(value.rate))
                  ? "0"
                  : `Ksh ${(Number(value.value) * Number(value.rate)) / 100}`}
              </h2>
            </div>
          </div>
        ))}
        <div className="flex flex-row gap-1 items-center">
          <button
            type="button"
            onClick={removeEndorsement}
            className="btn btn-circle btn-sm btn-ghost text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={addEndorsement}
            className="btn btn-circle btn-ghost btn-sm text-red-900"
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
        </div>
      </div>

      <label className="form-control  max-w-xs">
        <div className="label">
          <span className="label-text">Additional Policy Notes</span>
        </div>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          placeholder="Additional policy notes"
          className="textarea textarea-sm w-full rounded textarea-bordered"
        />
        {state.errors?.additionalNotes &&
          state.errors.additionalNotes.map((error: string) => (
            <p className="mt-1 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </label>
      {state?.message && (
        <div aria-live="polite" aria-atomic="true">
          <p className="my-2 text-sm text-info">{state?.message}</p>
        </div>
      )}
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
