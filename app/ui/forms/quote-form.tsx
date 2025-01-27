"use client";
import { useRef, useState } from "react";
import Select from "react-select";
import { ContactState, submitQuery } from "@/lib/actions/contact";
import { useFormState, useFormStatus } from "react-dom";
import { insuranceTypes } from "@/constants/constants";

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
        <button type="submit" className="btn w-full btn-neutral  text-white">
          Submit
        </button>
      )}
    </>
  );
};

export default function QuoteForm() {
  const ref = useRef<HTMLFormElement>(null);

  const initialState: ContactState = {
    message: null,
    errors: {},
  };

  const [subject, setSelectedSubject] = useState<string>("General Insurance");

  const [state, formAction] = useFormState(submitQuery, initialState);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
  };

  return (
    <form
      ref={ref}
      action={formAction}
      className="flex  flex-col   gap-1 w-full"
    >
      <div className="flex flex-col justify-center items-center gap-1.5  w-full">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">This is about*</span>
          </div>

          <Select
            id="subject"
            name="subject"
            className="basic-single w-full"
            classNamePrefix="select"
            placeholder="Select or Search for a subject"
            isSearchable={true}
            options={insuranceTypes}
            // styles={customStyles}
          />
          {state.errors?.subject &&
            state.errors.subject.map((error: string) => (
              <p className="mt-1 text-xs text-red-500" key={error}>
                {error}
              </p>
            ))}
        </label>
        {/* 
          <select
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className=" select w-full  select-bordered rounded"
          >
            <option value="" disabled>
              Choose A Subject
            </option>
            {["General Insurance", "Medical Insurance", "Life Assurance"].map(
              (type: string) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )
            )}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.subject &&
              state.errors.subject.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label> */}
        <label className="form-control w-full ">
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Message"
            className=" textarea textarea-bordered  rounded    text-sm    "
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.message &&
              state.errors.message.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="input  input-bordered rounded flex items-center w-full gap-2">
          Name:
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
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

        <label className="input  input-bordered rounded flex items-center w-full gap-2">
          Email:
          <input
            id="email"
            name="email"
            type="text"
            placeholder="info@marki.co.ke"
            className="grow"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="input  input-bordered rounded flex items-center w-full gap-2">
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
        {state?.message && (
          <div aria-live="polite" aria-atomic="true">
            <p className="my-2 text-sm text-info">{state?.message}</p>
          </div>
        )}
        <div className="flex justify-center w-full jusify-start">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
