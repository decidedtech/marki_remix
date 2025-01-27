import React from "react";

interface Props {
  policy: any;
}
const LimitsTable = ({ policy }: Props) => {
  return (
    <table className="table table-xs table-zebra">
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {policy.limits.map((limit: any, i: number) => {
          return (
            <tr key={i}>
              <td>{limit.name}</td>
              <td>{limit.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LimitsTable;
