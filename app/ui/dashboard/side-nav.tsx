import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";

type NavLinksProps = {
  openTickets?: string | number;
};
export default function SideNav({ openTickets }: NavLinksProps) {
  return (
    <div className="flex flex-col h-full justify-start items-start p-2">
      <Link className=" flex  items-start justify-start rounded  p-2" href="/">
        <div className="w-32 text-red-900 font-semibold md:w-40"></div>
      </Link>
      <div className="flex flex-col justify-start items-start  ">
        <NavLinks ticketsBadge={openTickets} />
        <div className="flex flex-grow"></div>
        <Link
          href="/profile"
          className="flex border mt-2 shadow w-full items-center justify-start gap-2 rounded-md p-3 bg-white text-sm text-red-900 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
          Profile
        </Link>
      </div>
    </div>
  );
}
