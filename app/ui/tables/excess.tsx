import React from "react";

interface Props {
  policy: any;
}
const ExcessTable = ({ policy }: Props) => {
  return (
    <table className="table table-xs table-zebra">
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {policy.excess.map((excess: any, i: number) => {
          return (
            <tr key={i}>
              <td>{excess.name}</td>
              <td>{excess.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ExcessTable;
