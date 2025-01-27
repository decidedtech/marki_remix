"use client";
import { useRef } from "react";
 import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";

 import {
  PolicyScheduleTicketState,
  updatePolicyScheduleTicket,
  updatePolicyScheduleTicketWithDocuments,
} from "@/lib/actions/policy-schedule-ticket";
import SubmitButton from "../buttons/submit-button";

interface Props {
  ticket: any;
}

export default function PolicyScheduleTicketForm({ ticket }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: PolicyScheduleTicketState = {
    message: null,
    errors: {},
    ticketId: null,
   };
  const modPolicyTicket = updatePolicyScheduleTicket.bind(
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
      <div className="flex flex-row justify-start items-center flex-wrap  gap-2">
       
        <label className="form-control  max-w-xs">
         
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
        {state.message && state.ticketId ? null : (
        <div className="">
          <SubmitButton />
        </div>
      )}
      </div>

      {state?.message && (
        <div aria-live="polite" aria-atomic="true">
          <p className="my-2 text-sm text-info"> {state?.message}</p>
        </div>
      )}

      {state?.message && state?.ticketId   && (
        <div className="flex flex-col gap-2 justify-start w-80 mx-4">
          <h1 className="text-md  font-semibold">Upload Policy Document</h1>

          <UploadDropzone
            endpoint="logbookUploader"
            onClientUploadComplete={async (res) => {
              if (res) {
                await updatePolicyScheduleTicketWithDocuments(
                  session?.user.id as string,
                  state.ticketId as string,
                  
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
    
    </form>
  );
}
