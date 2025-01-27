"use client";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateCover, deleteCover } from "@/lib/actions";
import { useSession } from "next-auth/react";

const initialState = {
  message: "",
  insuranceId: "",
};

interface Limit {
  name: number | string;
  description: number | string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div className="flex flex-row items-center gap-1 text-red-900">
          <div className="loading loading-ring  loading-lg "></div>
          Updating...
        </div>
      ) : (
        <button type="submit" className="btn bg-red-900 text-white">
          Update
        </button>
      )}
    </>
  );
}

interface Props {
  insurance: any;
}
export default function InsuranceForm({ insurance }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);

  const [limits, setLimits] = useState(insurance.limits);
  const [excess, setExcess] = useState(insurance.excess);
  const [specialClauses, setSpecialClauses] = useState(
    insurance.specialClauses
  );
  const [exclusions, setExclusions] = useState(insurance.exclusions);

  const updatingInsurance = updateCover.bind(
    null,
    session?.user.id as string,
    insurance._id,
    specialClauses,
    exclusions,
    limits,
    excess
  );

  const [state, formAction] = useFormState(updatingInsurance, initialState);

  const handleLimitChange = (
    index: number,
    field: keyof Limit,
    value: string | number
  ) => {
    const updatedLimits = [...limits];
    updatedLimits[index][field] = value as string;
    setLimits(updatedLimits);
  };

  const handleExcessChange = (
    index: number,
    field: keyof Limit,
    value: string | number
  ) => {
    const updatedExcess = [...excess];
    updatedExcess[index][field] = value as string;
    setExcess(updatedExcess);
  };

  const addSpecialClause = () => {
    setSpecialClauses([...specialClauses, ""]);
  };

  const addExclusion = () => {
    setExclusions([...exclusions, ""]);
  };
  const addLimit = () => {
    setLimits([
      ...limits,
      {
        name: "",
        description: "",
      },
    ]);
  };
  const addExcess = () => {
    setExcess([
      ...excess,
      {
        name: "",
        description: "",
      },
    ]);
  };
  const removeLimit = () => {
    setLimits((prevLimits: object[]) => prevLimits.slice(0, -1));
  };

  const removeExcess = () => {
    setExcess((prevExcess: object[]) => prevExcess.slice(0, -1));
  };

  const removeExclusion = () => {
    setExclusions((prevLimits: string[]) => prevLimits.slice(0, -1));
  };

  const removeSpecialClause = () => {
    setSpecialClauses((prevExcess: string[]) => prevExcess.slice(0, -1));
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
      <div className="flex flex-row flex-wrap gap-2">
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Cover Name</span>
          </div>
          <input
            id="name"
            name="name"
            required
            defaultValue={insurance.name}
            type="text"
            placeholder="Enter Cover Name"
            className=" input  w-full  rounded input-bordered"
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Drivers</span>
          </div>
          <textarea
            id="drivers"
            name="drivers"
            required
            rows={2}
            defaultValue={insurance.drivers}
            placeholder="Enter authorized drivers"
            className="peer textarea w-full rounded-md border border-gray-200 p-3 text-sm placeholder:text-gray-500"
          />
        </label>

        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Use</span>
          </div>
          <textarea
            id="use"
            name="use"
            defaultValue={insurance.use}
            rows={2}
            placeholder="Enter use"
            className="peer textarea h-full w-full rounded-md border border-gray-200 p-3 text-sm placeholder:text-gray-500"
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={insurance.description}
            placeholder="Enter description"
            className="peer textarea w-full rounded-md border border-gray-200 p-3 text-sm placeholder:text-gray-500"
          />
        </label>
      </div>

      <div className="flex flex-col gap-1 border p-3 rounded-lg">
        <div>
          <h3 className="text-xl font-bold">Limits of Liability</h3>
        </div>
        {limits.map((value: any, valueIndex: number) => (
          <div key={valueIndex} className="flex flex-wrap gap-2">
            <label className=" w-full max-w-sm">
              <input
                type="text"
                value={value.name}
                onChange={(e) =>
                  handleLimitChange(valueIndex, "name", e.target.value)
                }
                required
                placeholder="Limit name"
                className="peer input input-sm block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
              />
            </label>
            <label className="form-control w-full max-w-sm">
              <input
                type="text"
                value={value.description}
                onChange={(e) =>
                  handleLimitChange(valueIndex, "description", e.target.value)
                }
                required
                placeholder="Limit Description"
                className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
              />
            </label>
          </div>
        ))}
        <div className="flex flex-row no-wrap gap-2">
          {limits.length > 1 && (
            <button
              type="button"
              onClick={removeLimit}
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
            onClick={addLimit}
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

      {/* Repeat for other limits of liability fields */}
      <div className="flex flex-col gap-2 border p-3 rounded-lg">
        <div>
          <h4 className="text-xl font-bold">Excess Details</h4>
        </div>
        {excess.map((value: any, valueIndex: number) => (
          <div key={valueIndex} className="flex flex-wrap gap-2">
            <label className=" w-full max-w-sm">
              <input
                type="text"
                value={value.name}
                onChange={(e) =>
                  handleExcessChange(valueIndex, "name", e.target.value)
                }
                required
                placeholder="Limit name"
                className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
              />
            </label>
            <label className="form-control w-full max-w-sm">
              <input
                type="text"
                value={value.description}
                onChange={(e) =>
                  handleExcessChange(valueIndex, "description", e.target.value)
                }
                required
                placeholder="Limit Description"
                className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
              />
            </label>
          </div>
        ))}
        <div className="flex flex-row nowrap gap-2">
          {excess.length > 1 && (
            <button
              type="button"
              onClick={removeExcess}
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
            onClick={addExcess}
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
      {/* Repeat for other excess details fields */}
      <div className="flex flex-col gap-2 border p-3 rounded-lg">
        <div>
          <h6 className="font-bold text-xl ">Special Clauses</h6>
        </div>
        {specialClauses.map((clause: string, index: number) => (
          <div key={index} className="form-control w-full max-w-sm">
            <input
              type="text"
              value={clause}
              onChange={(e) =>
                setSpecialClauses((prevClauses: string[]) =>
                  prevClauses.map((c, i) => (i === index ? e.target.value : c))
                )
              }
              placeholder="Enter special clause"
              className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
            />
          </div>
        ))}
        <div className="flex flex-row no-wrap gap-2">
          {specialClauses.length > 1 && (
            <button
              type="button"
              onClick={removeSpecialClause}
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
            onClick={addSpecialClause}
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

      <div className="flex flex-col gap-2 border p-3 rounded-lg">
        <div>
          <h6 className="font-bold text-xl ">Exlusions</h6>
        </div>
        {/* <div className="divider mt-0.5 mb-0.5"></div> */}
        {exclusions.map((exclusion: string, index: number) => (
          <div key={index} className="form-control w-full max-w-sm">
            <input
              type="text"
              value={exclusion}
              onChange={(e) =>
                setExclusions((prevClauses: string[]) =>
                  prevClauses.map((c, i) => (i === index ? e.target.value : c))
                )
              }
              placeholder="Enter exclusion"
              className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
            />
          </div>
        ))}
        <div className="flex flex-row no-wrap gap-2">
          {exclusions.length > 1 && (
            <button
              type="button"
              onClick={removeExclusion}
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
            onClick={addExclusion}
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
          <span className="label-text">Additional Information</span>
        </div>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          required
          defaultValue={insurance.additionalInfo}
          placeholder="Enter additional info"
          className="peer p-2 textarea block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm placeholder:text-gray-500"
        />
      </label>
      <p aria-live="polite" className="text-success ">
        {state?.message}
      </p>

      <div className="flex flex-row gap-2">
        {/* <button
          className="btn btn-sm btn-error text-white "
          onClick={() => deleteCover(insurance._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-white"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
          Delete Policy
        </button> */}

        <SubmitButton />
      </div>
    </form>
  );
}
