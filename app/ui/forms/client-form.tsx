"use client";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";
import {
  State,
  createNewClient,
  updateClientWithDocuments,
} from "@/lib/actions/client";
import SubmitButton from "../buttons/submit-button";
import { useFormState } from "react-dom";

interface Props {
  members: any;
}
export default function ClientForm({ members }: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();

  const initialState: State = {
    message: null,
    errors: {},
    clientId: null,
  };

  const [member, setSelectedMember] = useState<string>("");
  const [type, setSelectedType] = useState<string>("Individual");

  const newClient = createNewClient.bind(null, session?.user.id as string);

  const [state, formAction] = useFormState(newClient, initialState);

  const handleMemberChange = (member: string) => {
    setSelectedMember(member);
  };
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
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
            <span className="label-text">Client Type</span>
          </div>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className=" select w-full select-sm select-bordered rounded"
          >
            <option value="" disabled>
              Select type
            </option>
            {["Individual", "Company"].map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.type &&
              state.errors.type.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Client Full name</span>
          </div>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter client name"
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

        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Identity/Passsport No.</span>
          </div>
          <input
            id="idNumber"
            name="idNumber"
            type="text"
            placeholder="Enter client ID/Passport no"
            className="input input-sm w-full rounded-md input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idNumber &&
              state.errors.idNumber.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">KRA PIN</span>
          </div>
          <input
            id="kraPin"
            name="kraPin"
            type="text"
            placeholder="Enter client KRA PIN"
            className="input input-sm w-full rounded-md input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.kraPin &&
              state.errors.kraPin.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>

        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input
            id="phone"
            name="phone"
            placeholder="Enter client phone"
            className="input input-sm w-full rounded-md input-bordered"
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
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Client email address</span>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter client email"
            className="input input-sm w-full rounded-md input-bordered"
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
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Client City</span>
          </div>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Client residence city"
            className="input input-sm w-full rounded-md input-bordered"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.city &&
              state.errors.city.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control max-w-xs">
          {members && (
            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Select Referrer</span>
              </div>
              <select
                id="team"
                name="team"
                value={member}
                onChange={(e) => handleMemberChange(e.target.value)}
                className=" select w-full select-sm select-bordered rounded"
              >
                <option value="" disabled>
                  Select team
                </option>
                {members.map((member: any) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <div id="customer-error" aria-live="polite" aria-atomic="true">
                {state.errors?.team &&
                  state.errors.team.map((error: string) => (
                    <p className="mt-1 text-xs text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </label>
          )}
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Additional Notes</span>
          </div>
          <textarea
            id="notes"
            name="notes"
            placeholder="Additional notes"
            className=" textarea textarea-bordered textarea-sm rounded    text-sm    "
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.notes &&
              state.errors.notes.map((error: string) => (
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

      {state?.clientId && (
        <div className="flex flex-col gap-4 justify-start mx-4">
          <h1 className="text-xl mt-3 font-semibold">
            Upload Client Documents
          </h1>

          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              if (res) {
                await updateClientWithDocuments(
                  state.clientId as string,
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
      {state?.message && state?.clientId ? null : (
        <div className="">
          <SubmitButton />
        </div>
      )}
    </form>
  );
}
