import { BASE_URL } from "@/constants/constants";
import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";

interface Props {
  payments: any;
}
const AllPaymentsTable = ({ payments }: Props) => {
  return (
    <div className="overflow-x-auto h-[30vh]">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Ref</th>
            <th>RegNo</th>
            <th>Client</th>
            <th>Mode</th>
            <th>Amt</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment: any) => {
            return (
              <tr key={payment._id}>
                <td>
                  <Link
                    href={`${BASE_URL}/payment/${payment.reference.toLowerCase()}`}
                    className="text-primary  btn-link "
                  >
                    {payment.reference}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`${BASE_URL}/vehicle/${payment.vehicle.regNo.toLowerCase()}`}
                    className="text-red-900  btn-link "
                  >
                    {payment.vehicle.regNo}
                  </Link>
                </td>
                <td>{payment.client.name}</td>
                <td>{payment.method}</td>
                <td>{formatPrice(payment.amount)}</td>
                <td>{formatDate(payment.date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllPaymentsTable;
