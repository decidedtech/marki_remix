import { BASE_URL } from "@/constants/constants";
import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";

interface Props {
  covers: any;
}
const PendingBalancesCoversTable = ({ covers }: Props) => {
  return (
    <div className="overflow-x-auto h-[40vh]">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Serial</th>
            <th>RegNo</th>
            <th>Client</th>
            <th>Status</th>
            <th>Valid Till</th>
            <th>Pending Bal</th>
            {/* <th>Expiring</th> */}
          </tr>
        </thead>
        <tbody>
          {covers.map((policy: any) => {
            // const today = new Date();
            // const validTillDate = new Date(policy.validTill);
            // const daysUntilExpiry = Math.ceil(
            //   (validTillDate.getTime() - today.getTime()) /
            //     (1000 * 60 * 60 * 24)
            // );

            // const isExpiringSoon = daysUntilExpiry <= 30;

            return (
              <tr key={policy._id}>
                <td>
                  <Link
                    href={`${BASE_URL}/vehicle-policy/${policy.serialNo.toLowerCase()}`}
                    className="hover:text-blue-500"
                  >
                    {policy.serialNo}
                  </Link>
                </td>
                <td>{policy.regNo}</td>
                <td>{policy.vehicle && policy.vehicle.carOwner.name}</td>
                <td>{policy.status}</td>
                <td>{formatDate(policy.validTill)}</td>
                <td className="text-error font-semibold">{formatPrice(policy.pendingBalance)}</td>
                {/* {isExpiringSoon && (
                  <td className="text-red-600">Expiring Soon</td>
                )} */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PendingBalancesCoversTable;
