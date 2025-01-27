"use client";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { ExpenseState, updateExpense } from "@/lib/actions/expense";
import { useFormState } from "react-dom";
import { expenseTypes } from "@/constants/constants";
import UpdateButton from "@/ui/buttons/update-button";

interface Props {
  expense: any;
}
export default function ExpenseForm({ expense }: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();

  const initialState: ExpenseState = {
    message: null,
    errors: {},
    expenseId: null,
  };

  const [category, setSelectedCategory] = useState<string>("Individual");
  const [mode, setSelectedMode] = useState<string>("");

  const upExpense = updateExpense.bind(
    null,
    session?.user.id as string,
    expense._id
  );

  const [state, formAction] = useFormState(upExpense, initialState);

  const handlecategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
  };
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
            defaultValue={expense.category}
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
            defaultValue={expense.name}
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
            defaultValue={expense.mode}
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
        {/* <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Reference</span>
          </div>
          <input
            id="reference"
            name="reference"
            defaultValue={expense.reference}
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
        </label> */}
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Amount</span>
          </div>
          <input
            id="amount"
            name="amount"
            type="number"
            defaultValue={expense.amount}
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
            defaultValue={expense.date}
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
            defaultValue={expense.description}
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

      {state?.message && state?.expenseId ? null : (
        <div className="">
          <UpdateButton />
        </div>
      )}
    </form>
  );
}
