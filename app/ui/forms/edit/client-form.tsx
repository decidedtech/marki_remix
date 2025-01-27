"use client";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { State, updateClient } from "@/lib/actions/client";
import UpdateButton from "@/ui/buttons/update-button";

interface Props {
  client: any;
  members: any;
}
export default function ClientForm({ client, members }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: State = {
    message: null,
    errors: {},
    clientId: null,
  };
  const [member, setSelectedMember] = useState<string>("");
  const [type, setSelectedType] = useState<string>(client.type);

  const modifyClient = updateClient.bind(
    null,
    session?.user.id as string,
    client._id
   );

  const [state, formAction] = useFormState(modifyClient, initialState);

  const isAdminOrModerator = session?.user.role === "admin" || session?.user.role === "moderator";

  if (!isAdminOrModerator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        You are not authorized to view this page!
      </main>
    );
  }
  const handleMemberChange = (member: string) => {
    setSelectedMember(member);
  };
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <form
      ref={ref}
      action={formAction}
      className="flex  flex-col justify-start  gap-1 w-full "
    >
      <div className="flex flex-row justify-start flex-wrap gap-2 w-full">
        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Client Type</span>
          </div>
          <select
            id="type"
            name="type"
            defaultValue={client.type}
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
            defaultValue={client.name}
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
            defaultValue={client.idNumber}
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
            defaultValue={client.kraPin}
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
            defaultValue={client.phone}
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
            defaultValue={client.email}
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
            defaultValue={client.city}
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
                defaultValue={client.team}
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
            defaultValue={client.notes}
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

      <div className="">
        <UpdateButton />
      </div>
    </form>
  );
}
