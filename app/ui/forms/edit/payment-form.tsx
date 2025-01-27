"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { PaymentState, updatePayment } from "@/lib/actions/payment";
import UpdateButton from "@/ui/buttons/update-button";

interface Props {
  payment: any;
}

export default function PaymentForm({ payment }: Props) {
  const { data: session } = useSession();
  const initialState: PaymentState = {
    message: null,
    errors: {},
    paymentId: null,
  };
  const updaPayment = updatePayment.bind(
    null,
    session?.user.id as string,
    payment._id
  );

  const [state, formAction] = useFormState(updaPayment, initialState);
  const [date, setDate] = useState(payment.date);
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
      action={formAction}
      className="flex flex-col gap-1.5 rounded-lg w-full"
    >
      <div className="flex flex-row justify-start flex-wrap gap-1 w-full">
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Select a Payment method</span>
          </div>
          <select
            id="method"
            name="method"
            defaultValue={payment.method}
            className="select select-sm select-bordered text-sm w-full"
          >
            <option value="" disabled>
              Select a payment method
            </option>
            {["Mpesa", "Cheque"].map((method: any) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.method &&
              state.errors.method.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Transaction Reference</span>
          </div>
          <input
            id="reference"
            name="reference"
            type="text"
            disabled
            defaultValue={payment.reference}
            placeholder="Transaction reference"
            className="input input-sm rounded input-bordered text-sm w-full"
          />
        </label>
        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Amount</span>
          </div>
          <input
            id="amount"
            name="amount"
            type="number"
            defaultValue={payment.amount}
            className="input input-sm rounded input-bordered text-sm w-full"
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
        <div className="flex flex-row items-center gap-2">
          <label className="form-control  max-w-xs">
            <div className="label">
              <span className="label-text">Transaction Date</span>
            </div>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Start Date"
              className="input input-sm w-full rounded input-bordered"
            />
            {state.errors?.date &&
              state.errors.date.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </label>
        </div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Notes</span>
          </div>
          <textarea
            id="notes"
            name="notes"
            defaultValue={payment.additionalNotes}
            placeholder="Notes"
            className=" textarea textarea-sm textarea-bordered rounded text-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.additionalNotes &&
              state.errors.additionalNotes.map((error: string) => (
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
        <UpdateButton />
      </div>
    </form>
  );
}
