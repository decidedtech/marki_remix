"use client";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { assignVehicleRiskNote } from "@/lib/actions";
import { useSession } from "next-auth/react";

const initialState = {
  message: "",
  policyId: "",
};

interface Benefit {
  name: number | string;
  rate: number | string;
  value: number | string;
}

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
        <button type="submit" className="btn bg-red-900 text-white">
          Submit
        </button>
      )}
    </>
  );
}
interface Props {
  vehicleId: string;
  covers: any;
  vehicle: any;
}

export default function RiskNoteForm({ vehicleId, covers, vehicle }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);

  const [cover, setCover] = useState("");

  const [benefits, setBenefits] = useState([
    {
      name: "",
      rate: "",
      value: "",
    },
  ]);
  const [endorsements, setEndorsements] = useState([
    {
      name: "",
      rate: "",
      value: "",
    },
  ]);

  const assignInsurance = assignVehicleRiskNote.bind(
    null,
    session?.user.id as string,
    benefits,
    endorsements,
    vehicleId,
    vehicle
  );

  const [state, formAction] = useFormState(assignInsurance, initialState);

  const handleBenefitChange = (
    index: number,
    field: keyof Benefit,
    value: string | number
  ) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index][field] = value as string;
    setBenefits(updatedBenefits);
  };
  const handleEndorsementChange = (
    index: number,
    field: keyof Benefit,
    value: string | number
  ) => {
    const updatedEndorsements = [...endorsements];
    updatedEndorsements[index][field] = value as string;
    setEndorsements(updatedEndorsements);
  };

  const [rate, setRate] = useState("");
  const addBenefit = () => {
    setBenefits([
      ...benefits,
      {
        name: "",
        rate: "",
        value: "",
      },
    ]);
  };
  const addEndorsement = () => {
    setEndorsements([
      ...endorsements,
      {
        name: "",
        rate: "",
        value: "",
      },
    ]);
  };
  const handleCoverChange = (e: any) => {
    setCover(e.target.value);
  };

  const removeEndorsement = () => {
    setEndorsements((prevEndorsements) => prevEndorsements.slice(0, -1));
  };

  const removeBenefit = () => {
    setBenefits((prevBenefits) => prevBenefits.slice(0, -1));
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
    <form ref={ref} action={formAction} className="flex flex-col gap-4 w-full">
      {covers && (
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Select a Policy</span>
          </div>
          <select
            id="cover"
            name="cover"
            required
            value={cover}
            onChange={handleCoverChange}
            className="peer input w-full rounded-md border border-gray-200 p-3 text-sm placeholder:text-gray-500"
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
        </label>
      )}
      <div className="flex flex-row flex-wrap gap-2">
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
            className="peer input w-full rounded-md border border-gray-200 p-3 text-sm placeholder:text-gray-500"
          />
        </label>
        <label className="form-control w-40 max-w-xs">
          <div className="label">
            <span className="label-text">Sum Insured</span>
          </div>
          <input
            id="sumInsured"
            name="sumInsured"
            required
            min="600000"
            disabled
            defaultValue={vehicle.valuation}
            type="number"
            placeholder="Sum insured"
            className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Insurance Partner</span>
          </div>
          <input
            id="insurancePartner"
            name="insurancePartner"
            placeholder="Insurance Partner"
            className="peer input w-full rounded-md border border-gray-200 p-3 text-sm placeholder:text-gray-500"
          />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-xl font-bold">Basic Premium</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className=" w-full max-w-sm">
            <input
              type="number"
              defaultValue={vehicle.valuation}
              disabled
              placeholder={vehicle.valuation}
              className="peer input input-sm block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
            />
          </label>
          <label className="form-control w-24">
            <input
              type="text"
              id="premiumRate"
              name="premiumRate"
              required
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="% rate"
              step=".01"
              className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
            />
          </label>
          <div className="flex items-center">
            <h2>
              {isNaN(parseFloat(rate))
                ? "0"
                : `Ksh ${(parseFloat(rate) * vehicle.valuation) / 100}`}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 border p-3 rounded-lg">
        <div>
          <h3 className="text-xl font-bold">Benefits</h3>
        </div>
        {benefits.map((value, valueIndex) => (
          <div key={valueIndex} className="flex flex-wrap gap-2">
            <label className=" w-full max-w-sm">
              <input
                type="text"
                value={value.name}
                onChange={(e) =>
                  handleBenefitChange(valueIndex, "name", e.target.value)
                }
                required
                placeholder="Benefit name"
                className="peer input input-sm block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
              />
            </label>
            <label className="form-control w-24">
              <input
                type="text"
                value={value.rate}
                onChange={(e) =>
                  handleBenefitChange(valueIndex, "rate", e.target.value)
                }
                required
                placeholder="% rate"
                step=".01"
                className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
              />
            </label>
            <label className="form-control w-24">
              <input
                type="number"
                value={value.value}
                onChange={(e) =>
                  handleBenefitChange(valueIndex, "value", e.target.value)
                }
                required
                placeholder="Value"
                className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
              />
            </label>
            <div className="flex items-center">
              <h2>
                {isNaN(parseFloat(value.value)) || isNaN(parseFloat(value.rate))
                  ? "0"
                  : `Ksh ${
                      (parseFloat(value.value) * parseFloat(value.rate)) / 100
                    }`}
              </h2>
            </div>
          </div>
        ))}
        <div className="flex flex-row no-wrap gap-2">
          {benefits.length > 1 && (
            <button
              type="button"
              onClick={removeBenefit}
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
          )}
          <button
            type="button"
            onClick={addBenefit}
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
      <div className="flex flex-col gap-1 border p-3 rounded-lg">
        <div>
          <h3 className="text-xl font-bold">Endorsements</h3>
        </div>
        {endorsements.map((value, valueIndex) => (
          <div key={valueIndex} className="flex flex-wrap gap-2">
            <label className=" w-full max-w-sm">
              <input
                type="text"
                value={value.name}
                onChange={(e) =>
                  handleEndorsementChange(valueIndex, "name", e.target.value)
                }
                required
                placeholder="Endorsement name"
                className="peer input input-sm block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
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
                className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
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
                className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
              />
            </label>
            <div className="flex items-center">
              <h2>
                {isNaN(parseFloat(value.value)) || isNaN(parseFloat(value.rate))
                  ? "0"
                  : `Ksh ${
                      (parseFloat(value.value) * parseFloat(value.rate)) / 100
                    }`}
              </h2>
            </div>
          </div>
        ))}
        <div className="flex flex-row no-wrap gap-2">
          {endorsements.length > 1 && (
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
          )}
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

      <label className="form-control w-full max-w-sm">
        <div className="label">
          <span className="label-text">Additional Policy Notes</span>
        </div>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          required
          placeholder="Additional policy notes"
          className="peer p-2 textarea block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
        />
      </label>
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
