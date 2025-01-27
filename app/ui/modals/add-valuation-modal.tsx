"use client";
import React from "react";
 
interface Props {
  vehicleId: string;
}

const AddValuationModal = ({ vehicleId }: Props) => {
  return (
    <dialog id="add-valuation-modal" className="modal ">
      <div className="modal-box ">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Add Vehicle Valuation</h3>

        {/* <ValuationForm vehicleId={vehicleId} /> */}
      </div>
    </dialog>
  );
};

export default AddValuationModal;
