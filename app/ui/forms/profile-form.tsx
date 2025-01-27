"use client";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateProfile } from "@/lib/actions";
import { useSession } from "next-auth/react";
import React from "react";

const initialState = {
  message: "",
  userId: "",
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
        <button type="submit" className="btn bg-red-900 text-white">
          Update
        </button>
      )}
    </>
  );
}
interface Props {
  user: any;
}

export default function ProfileForm({ user }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);

  const modifyProfile = updateProfile.bind(null, session?.user.id as string);

  const [state, formAction] = useFormState(modifyProfile, initialState);

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
      className="flex  flex-col   gap-2 w-full"
    >
      <div className="flex flex-row justify-start flex-wrap gap-2 w-full">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            id="username"
            name="username"
            required
            defaultValue={user.username}
            type="text"
            placeholder="Enter username"
            className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm  placeholder:text-gray-500"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            id="firstName"
            name="firstName"
            defaultValue={user.firstName}
            required
            type="text"
            placeholder="Enter first name"
            className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm  placeholder:text-gray-500"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <input
            id="lastName"
            name="lastName"
            required
            defaultValue={user.lastName}
            type="text"
            placeholder="Enter last name"
            className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm  placeholder:text-gray-500"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            id="phone"
            name="phone"
            defaultValue={user.phone}
            required
            type="number"
            minLength={10}
            placeholder="Enter phone"
            className="peer input block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm  placeholder:text-gray-500"
          />
        </label>
      </div>

      <div
        role="alert alert-info"
        className="alert border rounded-lg p-3 mt-2 "
      >
        <span>{state?.message}</span>
      </div>

      <div className="">
        <SubmitButton />
      </div>
    </form>
  );
}
