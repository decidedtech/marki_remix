import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div className="flex flex-row items-center gap-1 text-red-900">
          <div className="loading loading-ring  loading-lg "></div>
          Saving...
        </div>
      ) : (
        <button type="submit" className="btn btn-sm bg-red-900 text-white">
          Submit
        </button>
      )}
    </>
  );
};

export default SubmitButton;
