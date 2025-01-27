"use client";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { modifyPolicyWithEndorsement } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { formatPrice } from "@/utils/format-price";
import React from "react";

const initialState = {
  message: "",
  endorsementId: "",
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
        <button type="submit" className="btn btn-sm bg-red-900 text-white">
          Submit
        </button>
      )}
    </>
  );
}
interface Props {
  sumInsured: number;
  vehiclePolicyId: string;
  premiumTotal: number;
  ipcf: number;
  itl: number;
}

export default function EndorsementForm({
  sumInsured,
  vehiclePolicyId,
  premiumTotal,
  ipcf,
  itl,
}: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);

  const [endorsements, setEndorsements] = useState([
    {
      name: "",
      rate: "",
      value: "",
    },
  ]);

  const assignEndorsement = modifyPolicyWithEndorsement.bind(
    null,
    session?.user.id as string,
    sumInsured,
    vehiclePolicyId,
    premiumTotal,
    ipcf,
    itl,
    endorsements
  );

  const [state, formAction] = useFormState(assignEndorsement, initialState);

  const handleEndorsementChange = (
    index: number,
    field: keyof Benefit,
    value: string | number
  ) => {
    const updatedEndorsements = [...endorsements];
    updatedEndorsements[index][field] = value as string;
    setEndorsements(updatedEndorsements);
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
    <form ref={ref} action={formAction} className=" p-1 lg:p-2 sm:p-1  w-full">
      <div className=" flex flex-row justify-between items-center gap-2">
        <h6 className=" font-semibold">Endorsements</h6>
        <div className="flex justify-end items-center">
          {endorsements.length > 1 && (
            <button
              type="button"
              onClick={removeEndorsement}
              className="btn btn-circle btn-sm btn-ghost text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={addEndorsement}
            className="btn btn-circle btn-ghost btn-sm "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {endorsements.length > 0 && <SubmitButton />}
        </div>
      </div>

      
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
         
     
    </form>
  );
}
