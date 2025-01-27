import { BASE_URL } from "@/constants/constants";
import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";

interface Props {
  covers: any;
}
const AllCoversTable = ({ covers }: Props) => {
  return (
    <div className="overflow-x-auto h-[30vh]">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Serial</th>
            <th>RegNo</th>
            <th>Status</th>
            <th>Valid From</th>
            <th>Expiry</th>
            <th>Premium</th>
            {/* <th>Expiring</th> */}
          </tr>
        </thead>
        <tbody>
          {covers.map((policy: any) => {
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
                <td>{policy.status}</td>
                <td>{formatDate(policy.validFrom)}</td>
                <td>{formatDate(policy.validTill)}</td>
                <td>{formatPrice(policy.premiumTotal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCoversTable;
