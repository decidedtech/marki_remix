import React from "react";

interface Props {
  vehicle: any;
}
const RiskNoteVehicleCard = ({ vehicle }: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm font-bold mb-1 text-primary">Vehicle Details</p>

      <h1 className="font-light text-xs text-neutral">
        Reg:
        <span className="font-bold text-sm pl-1">{vehicle.regNo}</span>
      </h1>
      <h1 className="font-light text-xs text-neutral">
        Make:
        <span className="font-bold text-sm pl-1">{vehicle.make}</span>
      </h1>
      <h1 className="font-light text-xs text-neutral">
        Model:
        <span className="font-bold text-sm pl-1">{vehicle.model}</span>
      </h1>
      <h1 className="font-light text-xs text-neutral">
        Chassis No:
        <span className="font-bold text-sm pl-1">{vehicle.chassisNo}</span>
      </h1>

      <h1 className="font-light text-xs text-neutral">
        Rating:
        <span className="font-bold text-sm pl-1">{vehicle.engineCapacity}</span>
      </h1>
      <h1 className="font-light text-xs text-neutral">
        Engine No:
        <span className="font-bold text-sm pl-1">{vehicle.engineNo}</span>
      </h1>
      <h1 className="font-light text-xs text-neutral">
        Y.O.M:
        <span className="font-bold text-sm pl-1">{vehicle.yom}</span>
      </h1>
      <h1 className="font-light text-xs text-neutral">
        Color:
        <span className="font-bold text-sm pl-1">{vehicle.color}</span>
      </h1>
    </div>
  );
};

export default RiskNoteVehicleCard;
