"use client";
import { useRef,useState } from "react";
import Select from "react-select";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { UploadDropzone } from "@/utils/uploadthing";
import { FileData } from "@/lib/definitions";
import { insurancePartners,insuranceClasses } from "@/constants/constants";

 import {
  VehicleState,
  createVehicle,
  updateVehicleWithDocuments,
} from "@/lib/actions/vehicle";
import SubmitButton from "../buttons/submit-button";

interface Props {
  clients: any;
}
interface Endorsement {
  name: string | number;
  rate?: number | string;
  value: number;
}


export default function MedicalForm({ clients }: Props) {
  const { data: session } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const initialState: VehicleState = {
    message: null,
    errors: {},
    vehicleId: null,
  };
  const newVehicle = createVehicle.bind(null, session?.user.id as string);

  const [state, formAction] = useFormState(newVehicle, initialState);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);

  const isAdminOrModerator = session?.user.role === "admin" || session?.user.role === "moderator";

  if (!isAdminOrModerator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        You are not authorized to view this page!
      </main>
    );
  }

  const handleEndorsementChange = (
    index: number,
    field: keyof Endorsement,
    value: string | number
  ) => {
    const updatedEndorsements = [...endorsements];

    if (field === "rate") {
      updatedEndorsements[index][field] = value as string;  
    } else if (field === "value") {
      updatedEndorsements[index][field] = value as number;  
    } else {
      updatedEndorsements[index][field] = value;
    }

    setEndorsements(updatedEndorsements);
  };

  const addEndorsement = () => {
    setEndorsements([...endorsements, { name: "", rate: "", value: 0 }]);
  };

  const removeEndorsement = () => {
    setEndorsements((prevEndorsements) => prevEndorsements.slice(0, -1));
  };

  return (
    <form
      ref={ref}
      action={formAction}
      className="flex  flex-col justify-start  gap-1 w-full"
    >
      <div className="flex flex-row justify-start items-start flex-wrap  gap-2">
        <div className="w-80">
          <Select
            id="client"
            name="client"
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select client"
            isSearchable={true}
            options={clients.map((client: any) => ({
              value: client._id,
              label: client.name,
            }))}
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.carOwner &&
              state.errors.carOwner.map((error: string) => (
                <p className="mt-2 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <label className="form-control  max-w-sm">
          {/* <div className="label">
            <span className="label-text">Insurance Partner</span>
          </div> */}

          <Select
            id="insurancePartner"
            name="insurancePartner"
            className="basic-single w-52"
            classNamePrefix="select"
            placeholder="Insurance Partner"
            isSearchable={true}
            options={insurancePartners}
            // styles={customStyles}
          />
          {/* {state.errors?.insurancePartner &&
            state.errors.insurancePartner.map((error: string) => (
              <p className="mt-1 text-xs text-red-500" key={error}>
                {error}
              </p>
            ))} */}
        </label>
      </div>
      <div className="flex flex-row justify-start flex-wrap gap-1 w-full">
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Class</span>
          </div>
          <Select
            id="insuranceClass"
            name="insuranceClass"
            className="basic-single w-52"
            classNamePrefix="select"
            placeholder="Insurance Class"
            isSearchable={true}
            options={insuranceClasses}
            // styles={customStyles}
          />
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.model &&
              state.errors.model.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Annual Premium Payable</span>
          </div>
          <input
            id="premium"
            name="premium"
            type="text"
            placeholder="Annual Premium Payable"
            className=" input  w-full rounded input-bordered input-sm"
          />
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.chassisNo &&
              state.errors.chassisNo.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </label>
      
        <label className="form-control  max-w-xs">
          <div className="label">
          <span className="label-text">Start Date</span>
          </div>
        <input
          type="date"
          id="startDate"
          name="startDate"
          required
          placeholder="Start date"
          className="input input-sm w-40 rounded input-bordered text-sm "
        />
        
       </label>
         
       
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Additional Notes</span>
          </div>
          <textarea
            id="notes"
            name="notes"
            placeholder="Additional notes"
            className=" textarea textarea-sm textarea-bordered  rounded    text-sm    "
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
      <div className="flex flex-col gap-1 border p-3 rounded-lg">
        <h3 className="font-semibold">Benefits</h3>

        {endorsements.map((value, valueIndex) => (
          <div key={valueIndex} className="flex flex-wrap gap-2">
            <label className="  max-w-xs">
              <input
                type="text"
                value={value.name}
                onChange={(e) =>
                  handleEndorsementChange(valueIndex, "name", e.target.value)
                }
                required
                placeholder="Benefit name"
                className="input input-sm w-full rounded input-bordered"
              />
            </label>
            <label className="form-control w-24">
              <input
                type="number"
                value={value.rate}
                onChange={(e) =>
                  handleEndorsementChange(valueIndex, "rate", e.target.value)
                }
                required
                step=".01"
                placeholder="% rate"
                className="input w-full input-sm rounded input-bordered"
              />
            </label>
            <label className="form-control w-24">
              <input
                type="number"
                value={value.value}
                onChange={(e) =>
                  handleEndorsementChange(valueIndex, "value", e.target.value)
                }
                required
                placeholder="Value"
                className="input input-sm w-full rounded input-bordered"
              />
            </label>
            <div className="flex items-center">
              <h2>
                {isNaN(Number(value.value)) || isNaN(Number(value.rate))
                  ? "0"
                  : `Ksh ${(Number(value.value) * Number(value.rate)) / 100}`}
              </h2>
            </div>
          </div>
        ))}
        <div className="flex flex-row gap-1 items-center">
          <button
            type="button"
            onClick={removeEndorsement}
            className="btn btn-circle btn-sm btn-ghost text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={addEndorsement}
            className="btn btn-circle btn-ghost btn-sm text-red-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <h3 className="font-semibold">Contacts Information</h3>

      <div className="flex flex-row gap-2">
      <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <input
            id="yom"
            name="yom"
            type="text"
            placeholder="Full Name"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.yom &&
              state.errors.yom.map((error: string) => (
                <p className="mt-1 text-xs text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </label>
        <label className="form-control  max-w-xs">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            id="yom"
            name="yom"
            type="text"
            placeholder="Phone"
            className=" input  w-full rounded input-bordered input-sm"
          />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.yom &&
              state.errors.yom.map((error: string) => (
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

      {state?.message && state?.vehicleId && (
        <div className="flex flex-col gap-4 justify-start mx-4">
          <h1 className="text-xl mt-3 font-semibold">Upload Vehicle Logbook</h1>

          <UploadDropzone
            endpoint="logbookUploader"
            onClientUploadComplete={async (res) => {
              if (res) {
                await updateVehicleWithDocuments(
                  state.vehicleId as string,
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
      {state.message && state.vehicleId ? null : (
        <div className="">
          <SubmitButton />
        </div>
      )}
    </form>
  );
}
