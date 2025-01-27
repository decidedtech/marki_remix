import { BASE_URL } from "@/constants/constants";
import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";

interface Props {
  claims: any;
}
const ClaimsTable = ({ claims }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Ref</th>
            <th>Accident Date</th>
            <th>Remarks</th>
            <th>COR</th>
            <th>State</th>
            <th>Garage</th>
            <th>CP</th>
            <th>Contacts</th>
           </tr>
        </thead>
        <tbody>
          {claims.map((claim: any) => {
            return (
              <tr key={claim._id}>
                <td>
                  <Link
                    href={`${BASE_URL}/policy-claim/${claim.slug.toLowerCase()}`}
                    className="btn-link"
                  >
                    {claim.referenceNo}
                  </Link>
                </td>
                {/* <td>{claim.vehicle.regNo}</td>
              <td>{claim.vehicle.carOwner.name}</td> */}
                <td>{formatDate(claim.accidentDate)}</td>
                <td
                  className={`
                              ${
                                claim.status === "paid"
                                  ? "text-success"
                                  : claim.status === "in progress"
                                  ? "text-warning"
                                  : claim.status === "declined"
                                  ? "text-error"
                                  : ""
                              }
                            `}
                >
                  {claim.status}
                </td>
                <td>{formatPrice(claim.costOfRepair)}</td>
                <td>{claim.stateOfVehicle}</td>
                <td>{claim.garageName}</td>
                <td>{claim.garageContactPerson}</td>
                <td className="flex flex-col gap-1">
                    {claim.contactOne}
                    <br/>
                    {claim.contactTwo}
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsTable;
