"use client";
import { useRef, useState } from "react";
import Select from "react-select";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";

import { insurancePartners } from "@/constants/constants";
import { PACState, createPac, updatePacWithDocuments } from "@/lib/actions/pac";
import SubmitButton from "../buttons/submit-button";

interface Props {
  clients: any;
}

export default function PersonalAccidentForm({ clients }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: PACState = {
    message: null,
    errors: {},
    pacId: null,
  };
  const newVehicle = createPac.bind(null, session?.user.id as string);
  const [duration, setDuration] = useState("Annual");
  const [benefitLimit, setBenefitLimit] = useState("250K");

  const [state, formAction] = useFormState(newVehicle, initialState);

  const isAdminOrModerator =
    session?.user.role === "admin" || session?.user.role === "moderator";

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
            {state.errors?.client &&
              state.errors.client.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className=" w-80 ">
          <Select
            id="insurer"
            name="insurer"
            className="basic-single  "
            classNamePrefix="select"
            placeholder="Select Insurer"
            isSearchable={true}
            options={insurancePartners}
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.insurer &&
              state.errors.insurer.map((error: string) => (
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
            <span className="label-text">Policy Number</span>
          </div>
          <input
            id="policyNumber"
            name="policyNumber"
            type="text"
            placeholder="Policy Number"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.policyNumber &&
              state.errors.policyNumber.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Premium Payable</span>
          </div>
          <input
            id="premiumPayable"
            name="premiumPayable"
            type="number"
            placeholder="Premium Payble"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.premiumPayable &&
              state.errors.premiumPayable.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Select Duration</span>
          </div>
          <select
            id="duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="select select-sm select-bordered text-sm w-full"
          >
            <option value="" disabled>
              Select a duration
            </option>
            {["Annual", "Short-term"].map((method: any) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.duration &&
              state.errors.duration.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Select Benefit Limit</span>
          </div>
          <select
            id="benefitLimit"
            name="benefitLimit"
            value={benefitLimit}
            onChange={(e) => setBenefitLimit(e.target.value)}
            className="select select-sm select-bordered text-sm w-full"
          >
            <option value="" disabled>
              Select Benefit Limit
            </option>
            {[
              "250K",
              "300K",
              "500K",
              "750K",
              "1M",
              "2M",
              "3M",
              "5M",
              "8M",
              "10M",
              "12M",
              "15M",
              "18M",
              "20M",
            ].map((method: any) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.benefitLimit &&
              state.errors.benefitLimit.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Start Date</span>
          </div>
          <input
            id="startDate"
            name="startDate"
            type="date"
            placeholder="Start Date"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.startDate &&
              state.errors.startDate.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Payment Detail</span>
          </div>
          <input
            id="paymentDetails"
            name="paymentDetails"
            type="text"
            placeholder="Payment Detail"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.paymentDetails &&
              state.errors.paymentDetails.map((error: string) => (
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

      {state?.message && state?.pacId && (
        <div className="flex flex-col gap-4 justify-start mx-4">
          <h1 className="text-xl mt-3 font-semibold">Upload Documents</h1>

          <UploadDropzone
            endpoint="logbookUploader"
            onClientUploadComplete={async (res) => {
              if (res) {
                await updatePacWithDocuments(
                  state.pacId as string,
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
      {state.message && state.pacId ? null : (
        <div className="">
          <SubmitButton />
        </div>
      )}
    </form>
  );
}
