import { formatPrice } from "@/utils/format-price";
import React from "react";

interface Props {
  vehiclePolicy: any;
}
const BenefitsTable = ({ vehiclePolicy }: Props) => {
  const getLossOfUseLabel = (value: string) => {
    switch (value) {
      case "3000":
        return "10 days";
      case "6000":
        return "20 days";
      case "9000":
        return "30 days";
      default:
        return formatPrice(value);
    }
  };
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
          {vehiclePolicy.benefits.map((benefit: any) => {
            return (
              <tr key={benefit._id}>
                <td>{benefit.name}</td>
                <td>{benefit.rate && `${benefit.rate}%`}</td>
                <td>
                  {benefit.name === "AA Membership"
                    ? "Annual"
                    : benefit.name === "Loss of Use"
                    ? getLossOfUseLabel(benefit.value)
                    : formatPrice(benefit.value)}
                </td>
                <td>{formatPrice(benefit.total)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BenefitsTable;
