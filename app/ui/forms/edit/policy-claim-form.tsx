"use client";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@/constants/constants";
import Link from "next/link";
import { ClaimState, updateClaim } from "@/lib/actions/claim";
import UpdateButton from "@/ui/buttons/update-button";

interface Props {
  claim: any;
  regNo: string;
}

export default function PolicyClaimForm({ claim, regNo }: Props) {
  const { data: session } = useSession();
  const initialState: ClaimState = {
    message: null,
    errors: {},
    claimId: null,
  };
  const updatedClaim = updateClaim.bind(
    null,
    session?.user.id as string,
    claim._id
  );

  const [state, formAction] = useFormState(updatedClaim, initialState);

  const isAdminOrModerator = session?.user.role === "admin" || session?.user.role === "moderator";

  if (!isAdminOrModerator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        You are not authorized to view this page!
      </main>
    );
  }
  return (
    <form action={formAction} className="flex  flex-col   gap-1 w-full">
      <div className="flex flex-row justify-start flex-wrap gap-2 w-full">
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Cost of Repair</span>
          </div>
          <input
            id="costOfRepair"
            name="costOfRepair"
            type="number"
            defaultValue={claim.costOfRepair}
            placeholder="Cost of repairs"
            className=" input input-sm w-full rounded input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.costOfRepair &&
              state.errors.costOfRepair.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Accident Date</span>
          </div>
          <input
            type="date"
            name="date"
            defaultValue={claim.accidentDate}
            id="default-datepicker"
            className=" input input-sm w-full rounded p-3 input-bordered"
            placeholder="Select date"
            max={new Date().toISOString().split("T")[0]}
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.accidentDate &&
              state.errors.accidentDate.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control w-52 max-w-xs">
          <div className="label">
            <span className="label-text">Vehicle Condition</span>
          </div>
          <select
            id="stateOfVehicle"
            name="stateOfVehicle"
            defaultValue={claim.stateOfVehicle}
            className="select select-bordered rounded select-sm text-sm w-full"
          >
            <option value="" disabled>
              Select a vehicle condition
            </option>
            {["Write Off", "Repairable"].map((method: any) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.stateOfVehicle &&
              state.errors.stateOfVehicle.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control w-52 max-w-xs">
          <div className="label">
            <span className="label-text">Remarks</span>
          </div>
          <select
            id="status"
            name="status"
            defaultValue={claim.status}
            className="select select-bordered rounded select-sm text-sm w-full"
          >
            <option value="" disabled>
              Select a vehicle condition
            </option>
            {["in progress", "declined", "paid"].map((method: any) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Garage Name</span>
          </div>
          <input
            id="garageName"
            name="garageName"
            type="text"
            defaultValue={claim.garageName}

            placeholder="Garage Name"
            className=" input input-sm w-full rounded input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.garageName &&
              state.errors.garageName.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Garage Contact Person</span>
          </div>
          <input
            id="garageContactPerson"
            name="garageContactPerson"
            type="text"
            defaultValue={claim.garageContactPerson}

            placeholder="Garage Contact Person"
            className=" input input-sm w-full rounded input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.garageContactPerson &&
              state.errors.garageContactPerson.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Contact One</span>
          </div>
          <input
            id="contactOne"
            name="contactOne"
            type="text"
            defaultValue={claim.contactOne}

            placeholder="Contact One"
            className=" input input-sm w-full rounded input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contactOne &&
              state.errors.contactOne.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">  Contact Two</span>
          </div>
          <input
            id="contactTwo"
            name="contactTwo"
            type="text"
            defaultValue={claim.contactTwo}

            placeholder="Contact Two"
            className=" input input-sm w-full rounded input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contactTwo &&
              state.errors.contactTwo.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Additional Notes</span>
          </div>
          <textarea
            id="notes"
            name="notes"
            defaultValue={claim.additionalNotes}
            placeholder="Additional notes"
            className="textarea textarea-sm textarea-bordered  rounded text-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.additionalNotes &&
              state.errors.additionalNotes.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
      </div>
      {state?.message && (
        <>
          <div aria-live="polite" aria-atomic="true">
            <p className="my-2 text-sm text-info">{state?.message}</p>
          </div>
        </>
      )}

      <div className="">
        <UpdateButton />
      </div>
    </form>
  );
}
