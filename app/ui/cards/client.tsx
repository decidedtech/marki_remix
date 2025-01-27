import { BASE_URL } from "@/constants/constants";
import Link from "next/link";
import React from "react";

interface Props {
  client: any;
}
const ClientCard = ({ client }: Props) => {
  return (
    <div className="flex flex-col gap-1 border bg-red-100 p-4">
      {/* <h1 className="font-thin text-xl">Client Summary</h1>
      <div className="divider mt-0.5 mb-1"></div> */}
      <h1 className="font-light text-xs text-gray-500">Name:</h1>
      <h1 className="font-bold text-sm pl-1">{client.name}</h1>
      <h1 className="font-light text-xs text-gray-500">Email:</h1>
      <h1 className="font-bold text-xs pl-1">{client.email}</h1>
      <h1 className="font-light text-xs text-gray-500">
        Phone:
        <span className="font-bold text-sm pl-1">{client.phone}</span>
      </h1>
      <h1 className="font-light text-xs text-gray-500">
        Kra Pin:
        <span className="font-bold text-sm pl-1">{client.kraPin}</span>
      </h1>
      <h1 className="font-light text-xs text-gray-500">
        City:
        <span className="font-bold text-sm pl-1">{client.city}</span>
      </h1>
      <h1 className="font-light text-xs text-gray-500">Referrer:</h1>

      <p className="font-semibold text-xs pl-1">
        {client.referredBy && client.referredBy.name}
      </p>
      {/* <Link
        href={`${BASE_URL}/edit-client/${client._id}`}
        className="btn btn-ghost btn-sm text-red-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg>
        Edit client
      </Link> */}
    </div>
  );
};

export default ClientCard;
