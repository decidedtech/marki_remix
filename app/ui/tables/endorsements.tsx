import { formatPrice } from "@/utils/format-price";
import React from "react";

interface Props {
  vehiclePolicy: any;
}
const EndorsementsTable = ({ vehiclePolicy }: Props) => {
  return (
    <div className="over-flow-x-auto">

    <table className="table table-xs">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rate</th>
          <th>Sum Insured</th>
          <th>Premium</th>
        </tr>
      </thead>
      <tbody>
        {vehiclePolicy.endorsements.map((endorsement: any) => {
          return (
            <tr key={endorsement._id}>
              <td>{endorsement.name}</td>
              <td>{endorsement.rate}%</td>
              <td>{formatPrice(endorsement.value)}</td>
              <td>{formatPrice(endorsement.total)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default EndorsementsTable;
