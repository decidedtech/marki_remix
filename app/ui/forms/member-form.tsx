"use client";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
 import { useSession } from "next-auth/react";
import { createMember } from "@/lib/actions";

const initialState = {
  message: "",
  memberId: "",
  // errors: {}
};

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

export default function MemberForm() {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);

  const newMember = createMember.bind(null, session?.user.id as string);

  const [state, formAction] = useFormState(newMember, initialState);

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
      className="flex  flex-col gap-1 rounded w-full"
    >
      <div className="flex flex-row justify-start flex-wrap gap-1 w-full">
       
        <label className="form-control w-52 max-w-xs">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Full Name"
            className="input input-sm w-full rounded-md input-bordered"
          />
        </label>
        <label className="form-control w-52 max-w-xs">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            id="phone"
            name="phone"
            type="number"
            placeholder='Phone'
            className="input input-sm w-full rounded-md input-bordered"
          />
        </label>
        <label className="form-control w-52 max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder='Email address'
            className="input input-sm w-full rounded-md input-bordered"
          />
        </label>
        <label className="form-control w-52 max-w-xs">
          <div className="label">
            <span className="label-text">Bank Account No</span>
          </div>
          <input
            id="accountNo"
            name="accountNo"
            type="number"
            placeholder='Bank Acc No'
            className="input input-sm w-full rounded-md input-bordered"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Notes</span>
          </div>
          <textarea
            id="notes"
            name="notes"
            placeholder="Notes"
            className=" textarea textarea-sm textarea-bordered rounded text-sm"
          />
        </label>
      </div>
      {state?.message && (
        <div
          aria-live="polite"
          aria-atomic="true"
          role="alert "
          className="alert alert-info mt-2 "
        >
          <span>{state?.message}</span>
        </div>
      )}
      <div className="">
        <SubmitButton />
      </div>
    </form>
  );
}
