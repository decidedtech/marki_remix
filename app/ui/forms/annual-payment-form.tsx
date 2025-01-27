"use client";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import {
  PaymentState,
  createOrUpdateAnnualPayment,
  updatePaymentDocuments,
} from "@/lib/actions/payment";
import SubmitButton from "../buttons/submit-button";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";
import { BASE_URL } from "@/constants/constants";
import Link from "next/link";

interface Props {
  vehiclePolicyId: string;
  clientId: string;
  annualPaymentTicketId: string;
  premiumTotal: string;
}

export default function AnnualPaymentForm({
  vehiclePolicyId,
  clientId,
  annualPaymentTicketId,
  premiumTotal,
}: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: PaymentState = {
    message: null,
    errors: {},
    paymentId: null,
    drawer: null,
  };
  const newPayment = createOrUpdateAnnualPayment.bind(
    null,
    session?.user.id as string,
    vehiclePolicyId,
    clientId,
    annualPaymentTicketId
  );

  const [state, formAction] = useFormState(newPayment, initialState);

  const [date, setDate] = useState("");
  const [method, setMethod] = useState("Mpesa");
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
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Select a Payment method</span>
          </div>
          <select
            id="method"
            name="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="select select-sm select-bordered text-sm w-full"
          >
            <option value="" disabled>
              Select a payment method
            </option>
            {["Mpesa", "Cheque", "Bank Transfer"].map((method: any) => (
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
        {method == "Cheque" && (
          <label className="form-control max-w-xl">
            <div className="label">
              <span className="label-text">Drawer</span>
            </div>
            <input
              id="drawer"
              name="drawer"
              type="text"
              placeholder="Drawer"
              className="input input-sm rounded input-bordered text-sm w-full"
            />
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.drawer &&
                state.errors.drawer.map((error: string) => (
                  <p className="mt-1 text-xs text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </label>
        )}
        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Transaction Reference</span>
          </div>
          <input
            id="reference"
            name="reference"
            type="text"
            placeholder="Transaction reference"
            className="input input-sm rounded input-bordered text-sm w-full"
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

        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Amount</span>
          </div>
          <input
            id="amount"
            name="amount"
            type="number"
            value={premiumTotal}
            disabled
            placeholder={premiumTotal}
            className="input input-sm rounded input-bordered text-sm w-full"
          />
          <input type="hidden" name="amount" value={premiumTotal} />

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
              value={date}
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
        <div className="flex flex-col gap-2">
          <div aria-live="polite" aria-atomic="true">
            <p className="my-2 text-sm text-info">{state?.message}</p>
          </div>
          <Link href={`${BASE_URL}/payments`}>View Payments</Link>
        </div>
      )}

      {state?.paymentId && state?.drawer !== null && (
        <div className="flex flex-col gap-4 justify-start mx-4">
          <h1 className="text-xl mt-3 font-semibold">
            Upload Payment Documents
          </h1>

          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              if (res) {
                await updatePaymentDocuments(
                  state.paymentId as string,
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
      {state?.message && state?.paymentId ? null : (
        <div className="">
          <SubmitButton />
        </div>
      )}
    </form>
  );
}
