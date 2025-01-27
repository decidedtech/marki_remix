import { deleteEndorsement } from "@/lib/actions";
import { formatPrice } from "@/utils/format-price";
import React from "react";

interface Props {
  vehiclePolicy: any;
}
const EndorsementsEditTable = ({ vehiclePolicy }: Props) => {
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
                <td>
                  <form
                    action={async () => {
                      "use server";
                      await deleteEndorsement(
                        endorsement.total,
                        vehiclePolicy.premiumTotal,
                        vehiclePolicy.ipcf,
                        vehiclePolicy.itl,
                        vehiclePolicy._id,
                        endorsement._id
                      );
                    }}
                    className="btn btn-circle btn-ghost btn-sm text-white "
                  >
                    <button className="btn btn-circle btn-ghost btn-xs text-white ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 text-error"
                      >
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                        <path
                          fillRule="evenodd"
                          d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EndorsementsEditTable;
