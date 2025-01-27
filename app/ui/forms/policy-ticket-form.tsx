"use client";
import { useRef } from "react";
import Select from "react-select";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";

import { durations } from "@/constants/constants";
import {
  PolicyTicketState,
  updatePolicyTicket,
  updatePolicyTicketWithDocuments,
} from "@/lib/actions/policy-ticket";
import SubmitButton from "../buttons/submit-button";

interface Props {
  ticket: any;
}

export default function PolicyTicketForm({ ticket }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: PolicyTicketState = {
    message: null,
    errors: {},
    ticketId: null,
    duration: null,
  };
  const modPolicyTicket = updatePolicyTicket.bind(
    null,
    session?.user.id as string,
    ticket._id as string
  );

  const [state, formAction] = useFormState(modPolicyTicket, initialState);

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
        <div className=" w-60 ">
          <div className="label">
            <span className="label-text">Period</span>
          </div>
          <Select
            id="period"
            name="period"
            className="basic-single  "
            classNamePrefix="select"
            placeholder="Select Period"
            isSearchable={true}
            options={durations}
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.period &&
              state.errors.period.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Policy Number</span>
          </div>
          <input
            id="policyNo"
            name="policyNo"
            type="text"
            placeholder="Policy Number"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.policyNo &&
              state.errors.policyNo.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
      </div>

      {state?.message && (
        <div aria-live="polite" aria-atomic="true">
          <p className="my-2 text-sm text-info">{state?.duration}{state?.message}</p>
        </div>
      )}

      {state?.message && state?.ticketId  && state?.duration && (
        <div className="flex flex-col gap-2 justify-start w-80 mx-4">
          <h1 className="text-md  font-semibold">Upload Policy Document</h1>

          <UploadDropzone
            endpoint="logbookUploader"
            onClientUploadComplete={async (res) => {
              if (res) {
                await updatePolicyTicketWithDocuments(
                  session?.user.id as string,
                  state.ticketId as string,
                  state.duration as string,
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
      {state.message && state.ticketId ? null : (
        <div className="">
          <SubmitButton />
        </div>
      )}
    </form>
  );
}
