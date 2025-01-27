"use client";

import {
  UserGroupIcon,
  HomeIcon,
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  FolderIcon,
  UserPlusIcon,
  HeartIcon,
  CalculatorIcon,
  ArrowTurnRightUpIcon,
  BriefcaseIcon,
  NoSymbolIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { BASE_URL } from "@/constants/constants";

// Map of links to display in the side navigation.
const links = [
  { name: "Home", href: `${BASE_URL}`, icon: HomeIcon },
  {
    name: "Tickets",
    href: `${BASE_URL}/tickets`,
    icon: TicketIcon,
    badge: "New",
  },
  {
    name: "Clients",
    href: `${BASE_URL}/clients`,
    icon: UserGroupIcon,
  },
  {
    name: "Vehicles",
    href: `${BASE_URL}/vehicles`,
    icon: TruckIcon,
  },
  {
    name: "Vehicle Covers",
    href: `${BASE_URL}/covers`,
    icon: ShieldCheckIcon,
  },
  {
    name: "Payments",
    href: `${BASE_URL}/payments`,
    icon: CurrencyDollarIcon,
  },
  {
    name: "Credit Notes",
    href: `${BASE_URL}/credit-notes`,
    icon: NoSymbolIcon,
  },
  {
    name: "Claims",
    href: `${BASE_URL}/claims`,
    icon: FolderIcon,
  },
  {
    name: "(PA) Covers",
    href: `${BASE_URL}/personal-covers`,
    icon: UserGroupIcon,
  },
  {
    name: "Motor Policies",
    href: `${BASE_URL}/policies`,
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Medical Policies",
    href: `${BASE_URL}/medical`,
    icon: HeartIcon,
  },
  {
    name: "Team",
    href: `${BASE_URL}/team`,
    icon: UserPlusIcon,
  },
  {
    name: "Expenses",
    href: `${BASE_URL}/expenses`,
    icon: CalculatorIcon,
  },
  {
    name: "Debits",
    href: `${BASE_URL}/debits`,
    icon: ArrowTurnRightUpIcon,
  },
  {
    name: "Workpay",
    href: `${BASE_URL}/workpay`,
    icon: BriefcaseIcon,
  },
];
type NavLinksProps = {
  ticketsBadge?: string | number; // Optional badge for Tickets link
};

export default function NavLinks({ ticketsBadge  }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="menu menu-sm bg-white shadow border rounded-lg min-h-full p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const badge =
          link.name === "Tickets" && ticketsBadge ? ticketsBadge : null;

          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  "flex flex-row items-center gap-2 text-sm font-medium transition-all rounded-md hover:bg-sky-100 hover:text-red-900",
                  { "bg-sky-100 text-blue-500": pathname === link.href },
                  "md:flex-row lg:justify-start lg:gap-2"
                )}
              >
                <Icon className="size-6 " />
                <div className="">{link.name}</div>
                {badge && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
