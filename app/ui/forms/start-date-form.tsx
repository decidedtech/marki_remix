"use client";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { modifyPolicyWithStartDate } from "@/lib/actions";
import { useSession } from "next-auth/react";

const initialState = {
  message: "",
  policyId: "",
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
          save
        </button>
      )}
    </>
  );
}
interface Props {
  vehiclePolicyId: string;
}

export default function StartDateForm({ vehiclePolicyId }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);

  const assignStartDate = modifyPolicyWithStartDate.bind(
    null,
    session?.user.id as string,
    vehiclePolicyId
  );

  const [state, formAction] = useFormState(assignStartDate, initialState);

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
      className=" p-1 lg:p-2 sm:p-1 "
    >
      {/* <h6 className="text-sm font-semibold">Edit start date</h6> */}
      <div className="flex flex-row flex-wrap w-full gap-2">
        <input
          type="date"
          id="startDate"
          name="startDate"
          required
          placeholder="start date"
          className="input input-sm w-40 rounded input-bordered text-sm "
        />
        <SubmitButton />
      </div>
    </form>
  );
}
