"use client";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import Select from "react-select";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/constants/constants";
import SubmitButton from "../buttons/submit-button";
import {
  VehicleState,
  updateVehicleValuation,
  updateVehicleWithValuationReport,
} from "@/lib/actions/vehicle";
import UpdateButton from "../buttons/update-button";
import { formatDate } from "@/utils/format-date";

interface Extra {
  name: string;
  value: number | string;
}

interface Props {
  vehicleId: string;
  coverName: string;
  covers: any;
}

export default function ValuationForm({ vehicleId, covers,coverName }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: VehicleState = {
    message: null,
    errors: {},
    vehicleId: null,
  };
  const [extras, setExtras] = useState<Extra[]>([]);
  const handleBenefitChange = (
    index: number,
    field: keyof Extra,
    value: string | number
  ) => {
    const updatedExtras = [...extras];
    updatedExtras[index][field] = value as string;
    setExtras(updatedExtras);
  };
  const updateVehicleWithValuation = updateVehicleValuation.bind(
    null,
    session?.user.id as string,
    vehicleId,
    coverName,
    extras
  );
  // console.log(covers);
  const [state, formAction] = useFormState(
    updateVehicleWithValuation,
    initialState
  );

  const addExtra = () => {
    setExtras([
      ...extras,
      {
        name: "",
        value: "",
      },
    ]);
  };
  const removeExtra = () => {
    setExtras((prevBenefits) => prevBenefits.slice(0, -1));
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
    <form
      ref={ref}
      action={formAction}
      className="flex  flex-col  gap-2 w-full"
    >
      <Select
        id="cover"
        name="cover"
        className="basic-single w-80 text-sm"
        classNamePrefix="select"
        placeholder="Select Cover"
        isSearchable={true}
        options={[
          { value: "", label: "Select a cover", isDisabled: true },
          ...covers.map((cover: any) => ({
            value: cover._id,
            label: `${formatDate(cover.validFrom)} - ${formatDate(
              cover.validTill
            )} ${cover.isActive ? "- Current" : ""}`,
          })),
        ]}
        defaultValue={{ value: "", label: "Select a cover" }} // Default to the disabled empty option
      />
      <label className="form-control max-w-xs">
        <div className="label">
          <span className="label-text">New Valuation</span>
        </div>
        <input
          id="valuation"
          name="valuation"
          type="number"
          placeholder="Enter vehicle valuation"
          className=" input  w-full rounded  input-bordered input-sm"
        />
        {state.errors?.valuation &&
          state.errors.valuation.map((error: string) => (
            <p className="mt-1 text-xs text-red-500" key={error}>
              {error}
            </p>
          ))}
      </label>
      <div className="flex flex-col gap-1 ">
        <div>
          <h3 className="text-lg font-semibold">Vehicle Extras</h3>
        </div>
        {extras.map((value, valueIndex) => (
          <div key={valueIndex} className="flex flex-wrap gap-2">
            <label className=" w-full max-w-sm">
              <input
                type="text"
                value={value.name}
                onChange={(e) =>
                  handleBenefitChange(valueIndex, "name", e.target.value)
                }
                placeholder="Extra name"
                className="input input-sm input-bordered w-full rounded"
              />
            </label>

            <label className="form-control w-40">
              <input
                type="number"
                value={value.value}
                onChange={(e) =>
                  handleBenefitChange(valueIndex, "value", e.target.value)
                }
                placeholder="Value"
                className=" input input-sm input-bordered rounded"
              />
            </label>
          </div>
        ))}
        <div className="flex flex-row no-wrap gap-2">
          <button
            type="button"
            onClick={removeExtra}
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
            onClick={addExtra}
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

      {state?.message && (
        <div aria-live="polite" aria-atomic="true">
          <p className="my-2 text-sm text-info">{state?.message}</p>
        </div>
      )}

      {state.message && state.vehicleId && (
        <div className="flex flex-col gap-4 justify-start mx-4">
          <h1 className="text-xl mt-3 font-semibold">
            Upload Vehicle Valuation Report
          </h1>

          <UploadDropzone
            endpoint="logbookUploader"
            onClientUploadComplete={async (res) => {
              await updateVehicleWithValuationReport(
                state.vehicleId as string,
                res as FileData[]
              );
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name) => {}}
          />
        </div>
      )}
      {state.message && state.vehicleId ? null : (
        <div className="">
          <UpdateButton />
        </div>
      )}
    </form>
  );
}
