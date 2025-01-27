"use client";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { SmsState, createSms } from "@/lib/actions/sms";
  
interface Props {
  clientPhone: string;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div className="flex flex-row items-center gap-1 text-red-900">
          <div className="loading loading-ring  loading-lg "></div>
          Sending...
        </div>
      ) : (
        <button type="submit" className="btn btn-sm bg-red-900 text-white">
          Send Sms
        </button>
      )}
    </>
  );
};

 

export default function SmsForm({ clientPhone }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: SmsState = {
    message: null,
    errors: {},
    messageId: null,
  };
  const newSms = createSms.bind(
    null,
    session?.user.id as string,
    clientPhone
   
  );

  const [state, formAction] = useFormState(newSms, initialState);

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
      className="flex  flex-col gap-1 rounded-lg w-full"
    >
      <div className="flex flex-row justify-start flex-wrap gap-1 w-full">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Message</span>
          </div>
          <textarea
            id="sms"
            name="sms"
            placeholder="Type a sms message"
            className=" textarea textarea-sm textarea-bordered rounded text-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sms &&
              state.errors.sms.map((error: string) => (
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
      <div className="">
        <SubmitButton />
      </div>
    </form>
  );
}
