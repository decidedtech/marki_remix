"use client";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createCover } from "@/lib/actions";
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

export default function InsuranceForm() {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);

  const [limits, setLimits] = useState([
    {
      name: "",
      description: "",
    },
  ]);
  const [excess, setExcess] = useState([
    {
      name: "",
      description: "",
    },
  ]);
  const [specialClauses, setSpecialClauses] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);

  const newInsurance = createCover.bind(
    null,
    session?.user.id as string,
    specialClauses,
    exclusions,
    limits,
    excess
  );

  const [state, formAction] = useFormState(newInsurance, initialState);

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
    setLimits((prevLimits) => prevLimits.slice(0, -1));
  };

  const removeExcess = () => {
    setExcess((prevExcess) => prevExcess.slice(0, -1));
  };

  const removeExclusion = () => {
    setExclusions((prevLimits) => prevLimits.slice(0, -1));
  };

  const removeSpecialClause = () => {
    setSpecialClauses((prevExcess) => prevExcess.slice(0, -1));
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
            type="text"
            placeholder="Enter Cover Name"
            className="input input-sm w-full rounded-md input-bordered"
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
            placeholder="Enter authorized drivers"
            className=" textarea textarea-sm rounded textarea-bordered"
          />
        </label>

        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Use</span>
          </div>
          <textarea
            id="use"
            name="use"
            placeholder="Enter use"
            className=" textarea textarea-sm rounded textarea-bordered"
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            className=" textarea textarea-sm rounded textarea-bordered"
          />
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <div>
          <h3 className="text-lg font-semibold">Limits of Liability</h3>
        </div>
        {limits.map((value, valueIndex) => (
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
                className="input input-sm w-full rounded-md input-bordered"
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
                className="input input-sm w-full rounded-md input-bordered"
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
      <div className="flex flex-col gap-2  ">
        <div>
          <h4 className="text-lg font-semibold">Excess Details</h4>
        </div>
        {excess.map((value, valueIndex) => (
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
                className="input input-sm w-full rounded-md input-bordered"
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
                className="input input-sm w-full rounded-md input-bordered"
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
      <div className="flex flex-col gap-2  ">
        <div>
          <h6 className="font-semibold text-lg ">Special Clauses</h6>
        </div>
        {specialClauses.map((clause, index) => (
          <div key={index} className="form-control w-full max-w-sm">
            <input
              type="text"
              value={clause}
              onChange={(e) =>
                setSpecialClauses((prevClauses) =>
                  prevClauses.map((c, i) => (i === index ? e.target.value : c))
                )
              }
              placeholder="Enter special clause"
              className="input input-sm w-full rounded-md input-bordered"
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

      <div className="flex flex-col gap-2  ">
        <div>
          <h6 className="font-bold text-xl ">Exlusions</h6>
        </div>
        {/* <div className="divider mt-0.5 mb-0.5"></div> */}
        {exclusions.map((exclusion, index) => (
          <div key={index} className="form-control w-full max-w-sm">
            <input
              type="text"
              value={exclusion}
              onChange={(e) =>
                setExclusions((prevClauses) =>
                  prevClauses.map((c, i) => (i === index ? e.target.value : c))
                )
              }
              placeholder="Enter exclusion"
              className="input input-sm w-full rounded-md input-bordered"
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
          placeholder="Enter additional info"
          className="textarea textarea-sm w-full rounded textarea-bordered"
        />
      </label>
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
