"use client";
import { useRef } from "react";
import Select from "react-select";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";

import { vehicleMakes } from "@/constants/constants";
import {
  VehicleState,
  createVehicle,
  updateVehicleWithDocuments,
} from "@/lib/actions/vehicle";
import SubmitButton from "../buttons/submit-button";

interface Props {
  clients: any;
}

export default function VehicleForm({ clients }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: VehicleState = {
    message: null,
    errors: {},
    vehicleId: null,
  };
  const newVehicle = createVehicle.bind(null, session?.user.id as string);

  const [state, formAction] = useFormState(newVehicle, initialState);

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
      className="flex  flex-col justify-start  gap-1 w-full"
    >
      <div className="flex flex-row justify-start items-start flex-wrap  gap-2">
        <div className="w-80">
          <Select
            id="client"
            name="client"
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select client"
            isSearchable={true}
            options={clients.map((client: any) => ({
              value: client._id,
              label: client.name,
            }))}
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.carOwner &&
              state.errors.carOwner.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className=" w-80 ">
          <Select
            id="make"
            name="make"
            className="basic-single  "
            classNamePrefix="select"
            placeholder="Select make"
            isSearchable={true}
            options={vehicleMakes}
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.make &&
              state.errors.make.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start flex-wrap gap-1 w-full">
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Model</span>
          </div>
          <input
            id="model"
            name="model"
            type="text"
            placeholder="Vehicle Model"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.model &&
              state.errors.model.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Chassis No.</span>
          </div>
          <input
            id="chassisNo"
            name="chassisNo"
            type="text"
            placeholder="Chassis no"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.chassisNo &&
              state.errors.chassisNo.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Year of make</span>
          </div>
          <input
            id="yom"
            name="yom"
            type="text"
            placeholder="year of make"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.yom &&
              state.errors.yom.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Vehicle Registration</span>
          </div>
          <input
            id="regNo"
            name="regNo"
            placeholder="Vehicle registration"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.regNo &&
              state.errors.regNo.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Engine Capacity</span>
          </div>
          <input
            id="engineCapacity"
            name="engineCapacity"
            placeholder="Engine capacity"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.engineCapacity &&
              state.errors.engineCapacity.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Vehicle valuation</span>
          </div>
          <input
            id="valuation"
            name="valuation"
            type="number"
            placeholder="Valuation"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.valuation &&
              state.errors.valuation.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Vehicle Color</span>
          </div>
          <input
            id="color"
            name="color"
            type="text"
            placeholder="Color"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.color &&
              state.errors.color.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Engine No</span>
          </div>
          <input
            id="engineNo"
            name="engineNo"
            type="text"
            placeholder="Engine no"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.engineNo &&
              state.errors.engineNo.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Passengers</span>
          </div>
          <input
            id="passengers"
            name="passengers"
            type="number"
            placeholder="Passengers"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.passengers &&
              state.errors.passengers.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Additional Notes</span>
          </div>
          <textarea
            id="notes"
            name="notes"
            placeholder="Additional notes"
            className=" textarea textarea-sm textarea-bordered  rounded    text-sm    "
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.notes &&
              state.errors.notes.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
      </div>
      {state?.message && (
        <div aria-live="polite" aria-atomic="true">
          <p className="my-2 text-sm text-info">{state?.message}</p>
        </div>
      )}

      {state?.message && state?.vehicleId && (
        <div className="flex flex-col gap-4 justify-start mx-4">
          <h1 className="text-xl mt-3 font-semibold">Upload Vehicle Logbook</h1>

          <UploadDropzone
            endpoint="logbookUploader"
            onClientUploadComplete={async (res) => {
              if (res) {
                await updateVehicleWithDocuments(
                  state.vehicleId as string,
                  res as FileData[]
                );
              }
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
          <SubmitButton />
        </div>
      )}
    </form>
  );
}
