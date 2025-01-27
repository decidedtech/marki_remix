"use client";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";
import {
  ExpenseState,
  createExpense,
  updateExpenseWithDocuments,
} from "@/lib/actions/expense";
import SubmitButton from "../buttons/submit-button";
import { useFormState } from "react-dom";
import { expenseTypes } from "@/constants/constants";

export default function ExpenseForm() {
  const ref = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();

  const initialState: ExpenseState = {
    message: null,
    errors: {},
    expenseId: null,
  };

  const [category, setSelectedCategory] = useState<string>("Individual");
  const [mode, setSelectedMode] = useState<string>("");

  const newClient = createExpense.bind(null, session?.user.id as string);

  const [state, formAction] = useFormState(newClient, initialState);

  const handlecategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
  };
  const role = session?.user.role;
  

  const isAdminOrModerator = role === "admin" || role === "moderator";
   
  if (!isAdminOrModerator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        You are not authorized to view this page!
      </main>
    );}

  return (
    <form
      ref={ref}
      action={formAction}
      className="flex  flex-col   gap-1 w-full"
    >
      <div className="flex flex-row justify-start flex-wrap gap-2 w-full">
        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => handlecategoryChange(e.target.value)}
            className=" select w-full select-sm select-bordered rounded"
          >
            <option value="" disabled>
              Select Category
            </option>
            {expenseTypes.map((type: any) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Expense name"
            className="input input-sm w-full rounded-md input-bordered"
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
        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Mode</span>
          </div>
          <select
            id="mode"
            name="mode"
            defaultValue={mode}
            onChange={(e) => handleModeChange(e.target.value)}
            className=" select w-full select-sm select-bordered rounded"
          >
            <option value="" disabled>
              Select Mode
            </option>
            {["Mpesa", "Cash", "Cheque", "Bank Transfer"].map((type: any) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Reference</span>
          </div>
          <input
            id="reference"
            name="reference"
            type="text"
            placeholder="Enter reference"
            className="input input-sm w-full rounded-md input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.reference &&
              state.errors.reference.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Amount</span>
          </div>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter Amount"
            className="input input-sm w-full rounded-md input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Date</span>
          </div>
          <input
            id="date"
            name="date"
            type="date"
            placeholder="Enter Expense Date"
            className="input input-sm w-full rounded-md input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date &&
              state.errors.date.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            className=" textarea textarea-bordered textarea-sm rounded    text-sm    "
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
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

      {state?.expenseId && (
        <div className="flex flex-col gap-4 justify-start mx-4">
          <h1 className="text-xl mt-3 font-semibold">Upload Receipt</h1>

          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              if (res) {
                await updateExpenseWithDocuments(
                  state.expenseId as string,
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
      {state?.message && state?.expenseId ? null : (
        <div className="">
          <SubmitButton />
        </div>
      )}
    </form>
  );
}
