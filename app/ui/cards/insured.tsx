 
import React from "react";

interface Props {
  client: any;
}
const InsuredCard = ({ client }: Props) => {
  return (
    <div className="flex flex-col ">
      <h6 className="text-sm font-bold mb-1 text-primary">Insured Details</h6>
      <h6 className="font-light text-xs text-neutral">
        Name:
        <span className="font-bold text-sm pl-1">{client.name}</span>
      </h6>
      <h6 className="font-light text-xs text-neutral">
        KRA PIN:
        <span className="font-bold text-sm pl-1">
          {client.kraPin}
        </span>
      </h6>
      <h6 className="font-light text-xs text-neutral">
        Address:
        <span className="font-semibold text-sm pl-1">
          38490-00623, Parklands Kenya
        </span>
      </h6>

      <h6 className="font-light text-xs text-neutral">
        Contact:
        <span className="font-semibold text-sm pl-1">+254 713 385 183</span>
      </h6>
      <h6 className="font-light text-xs text-neutral">
        Email:
        <span className="font-semibold text-info text-sm pl-1">
          info@marki.co.ke
        </span>
      </h6>
    </div>
  );
};

export default InsuredCard;
