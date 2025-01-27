import { formatPrice } from "@/utils/format-price";
import React from "react";

interface Props {
  vehiclePolicy: any;
}
const BasicPremiumTable = ({ vehiclePolicy }: Props) => {
  return (
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
        <tr>
          <td>Basic Premium</td>
          <td>
            {/* {vehiclePolicy.policy.name.includes(
              "Motor Private Third Party (TPO)"
            ) ? (
              <span>&nbsp;TPO</span>
            ) :
             (
              <span>{vehiclePolicy.basicPremium.rate}%</span>
            )} */}
            {vehiclePolicy.policy.name.includes(
              "Motor Private Third Party (TPO)"
            ) ? (
              <span>&nbsp;TPO</span>
            ) : vehiclePolicy.policy.name.includes("Motor Commercial (TPO)") ? (
              <span>&nbsp;{vehiclePolicy.basicPremium.rate}</span>
            ) : (
              <span>{vehiclePolicy.basicPremium.rate}%</span>
            )}
          </td>
          <td>
            {/* {vehiclePolicy.policy.name.includes(
              "Motor Private Third Party (TPO)"
            ) 
            ? (
              <span>&nbsp;TPO</span>
            ) : (
              <span>&nbsp;{formatPrice(vehiclePolicy.sumInsured)}</span>
            )} */}
             {vehiclePolicy.policy.name.includes(
              "Motor Private Third Party (TPO)"
            ) ? (
              <span>&nbsp;TPO</span>
            ) : vehiclePolicy.policy.name.includes("Motor Commercial (TPO)") ? (
              <span>&nbsp;TPO</span>
            ) : (
              <span>{vehiclePolicy.sumInsured}</span>
            )}
          </td>
          <td>{formatPrice(vehiclePolicy.basicPremium.total)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BasicPremiumTable;
