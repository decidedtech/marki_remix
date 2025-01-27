import { BASE_URL } from "@/constants/constants";
import { deletePayment } from "@/lib/actions/payment";
import { formatDate } from "@/utils/format-date";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import React from "react";

interface Props {
  vehiclePolicy: any;
}
const PaymentsTable = ({ vehiclePolicy }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Ref</th>
            <th>Mode</th>
            <th>Drawer</th>
            <th>Amt</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {vehiclePolicy.payment.map((payment: any) => {
            return (
              <tr key={payment._id}>
                <td>
                  <Link
                    href={`${BASE_URL}/payment/${payment.reference.toLowerCase()}`}
                    className="btn-link text-primary"
                  >
                    {payment.reference}
                  </Link>
                </td>
                <td>{payment.method}</td>
                <td>{payment.drawer && payment.drawer}</td>
                <td>{formatPrice(payment.amount)}</td>
                <td>{formatDate(payment.date)}</td>
                <td>
                  <form
                    action={async () => {
                      "use server";
                      await deletePayment(payment._id, payment.vehiclePolicy);
                    }}
                  >
                    <button className="btn b btn-ghost btn-xs  ">
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

export default PaymentsTable;
