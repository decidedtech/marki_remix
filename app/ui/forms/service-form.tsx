"use client";
import { useRef, useState } from "react";

import { ContactState, submitQuery } from "@/lib/actions/contact";
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div className="flex flex-row items-center gap-1 text-red-900">
          <div className="loading loading-ring  loading-lg "></div>
          Submitting...
        </div>
      ) : (
        <button
          type="submit"
          className="btn btn-sm btn-error  text-white"
        >
          Submit Request
        </button>
      )}
    </>
  );
};

export default function ServiceForm() {
  const ref = useRef<HTMLFormElement>(null);

  const initialState: ContactState = {
    message: null,
    errors: {},
  };

  const [subject, setSelectedSubject] = useState<string>("");

  const [state, formAction] = useFormState(submitQuery, initialState);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
  };

  return (
    <form ref={ref} action={formAction}>
      <div className="flex flex-row flex-wrap justify-start items-start gap-1.5 ">
        <label className="input input-sm  input-bordered rounded flex items-center  gap-2">
          Name:
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className="grow "
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>

        <label className="input input-sm input-bordered rounded flex items-center  gap-2">
          Phone:
          <input
            id="phone"
            name="phone"
            type="number"
            placeholder="0712345678"
            className="grow"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phone &&
              state.errors.phone.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>

        <label className="form-control  ">
          <select
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className=" select w-full select-sm select-bordered rounded"
          >
            <option value="" disabled>
              Select a Service
            </option>
            {[
              "Insurance Advice",
              "Risk Asessment",
              "Claims Assistance",
              "Policy Renewal & Adjustments",
              "Policy Placement",
              "Client Advocacy",
            ].map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.subject &&
              state.errors.subject.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>

        <div className="flex justify-start">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
