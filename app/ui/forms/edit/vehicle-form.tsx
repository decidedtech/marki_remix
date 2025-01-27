"use client";
import { useRef } from "react";
import Select from "react-select";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { vehicleMakes } from "@/constants/constants";
import { VehicleState, updateVehicle } from "@/lib/actions/vehicle";
import UpdateButton from "@/ui/buttons/update-button";

interface Props {
  vehicle: any;
}

export default function VehicleForm({ vehicle }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: VehicleState = {
    message: null,
    errors: {},
    vehicleId: null,
  };
  const modifyVehicle = updateVehicle.bind(
    null,
    session?.user.id as string,
    vehicle._id
  );

  const [state, formAction] = useFormState(modifyVehicle, initialState);
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
      className="flex  flex-col   gap-1 w-full"
    >
      <div className="flex flex-row justify-start items-start flex-wrap  gap-2">
        <div className=" w-80 ">
          <Select
            id="make"
            name="make"
            className="basic-single  "
            classNamePrefix="select"
            placeholder="Select make"
            isSearchable={true}
            options={vehicleMakes}
            defaultInputValue={vehicle.make}
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
            defaultValue={vehicle.model}
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
            defaultValue={vehicle.chassisNo}
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
            defaultValue={vehicle.yom}
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
            defaultValue={vehicle.regNo}
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
            defaultValue={vehicle.engineCapacity}
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
            <span className="label-text">Vehicle Color</span>
          </div>
          <input
            id="color"
            name="color"
            defaultValue={vehicle.color}
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
            defaultValue={vehicle.engineNo}
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
            defaultValue={vehicle.passengers}
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
            defaultValue={vehicle.notes}
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

      <p aria-live="polite" className="text-success ">
        {state?.message}
      </p>

      <div className="">
        <UpdateButton />
      </div>
    </form>
  );
}
