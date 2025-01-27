// "use client";
// import Link from "next/link";
// import React from "react";

// const insurances = [
//   {
//     name: "general-insurance",
//     title: "General Insurance",
//     subchildren: [
//       { name: "car-insurance", title: "Car Insurance" },
//       { name: "home-insurance", title: "Home Insurance" },
//       { name: "travel-insurance", title: "Travel Insurance" },
//     ],
//   },
//   {
//     name: "medical-insurance",
//     title: "Medical Insurance",
//     subchildren: [
//       { name: "individual-health", title: "Individual Health" },
//       { name: "family-health", title: "Family Health" },
//     ],
//   },
//   {
//     name: "life-insurance",
//     title: "Life Assurance",
//     subchildren: [
//       { name: "term-life", title: "Term Life" },
//       { name: "whole-life", title: "Whole Life" },
//     ],
//   },
// ];

// const Insurance = () => {
//   const handleMenuItemClick = () => {
//     const detailsElem = document.querySelector("details[open]");
//     if (detailsElem) {
//       detailsElem.removeAttribute("open");
//     }

//     const elem = document.activeElement;
//     if (elem instanceof HTMLElement) {
//       elem.blur();
//     }
//   };
//   return (
//     <div className="  dropdown ">
//       <Link
//         to="/"
//         tabIndex={0}
//         role="button"
//         className="block m-1  font-bold "
//       >
//         Insurance Products
//       </Link>
//       <div className="w-[40rem] absolute left-0 right-0  mx-auto mt-5 bg-white menu shadow-lg p-6 z-50">
//         <div className="grid grid-cols-3 gap-2 w-full">
//           <div className="menu menu-vertical gap-2">
//             <Link to="/general-insurance" className="font-bold text-gray-900">
//               General Insurance
//             </Link>
//             <Link to="/general-insurance/car" className="hover:text-primary">
//               Car Insurance
//             </Link>

//             <Link to="/general-insurance/home" className="hover:text-primary">
//               Home Insurance
//             </Link>

//             <Link
//               to="/general-insurance/travel"
//               className="hover:text-primary"
//             >
//               Travel Insurance
//             </Link>
//           </div>

//           <div className="menu menu-vertical gap-2">
//             <Link
//               to="/medical-insurance/individual"
//               className="font-bold text-gray-900"
//             >
//               Medical Insurance
//             </Link>

//             <Link
//               to="/medical-insurance/individual"
//               className="hover:text-primary"
//             >
//               Individual Medical
//             </Link>

//             <Link
//               to="/medical-insurance/family"
//               className="hover:text-primary"
//             >
//               Corporate Medical
//             </Link>
//           </div>

//           <div className="menu menu-vertical gap-2">
//             <li className="font-bold text-gray-900">Life Insurance</li>

//             <Link to="/life-insurance/term" className="hover:text-primary">
//               Term Life
//             </Link>

//             <Link to="/life-insurance/whole" className="hover:text-primary">
//               Whole Life
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// {
//   /* <li>
//   <details>
//     <summary>Insurance Products</summary>
//     <ul className="p-2 text-neutral">
//       {insurances.map((item) => {
//         return (
//           <li key={item.name} onClick={handleMenuItemClick}>
//             <Link to={item.name}>{item.title}</Link>
//           </li>
//         );
//       })}
//     </ul>
//   </details>
// </li> */
// }
// export default Insurance;
  import { Link } from "@remix-run/react";
import  { useState, useEffect, useRef } from "react";

 

const Insurance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  // Toggle dropdown on button click
  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Detect clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative dropdown " ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        tabIndex={0}
        // role="button"
        className="block m-1"
      >
        Insurance Products
      </button>

      {/* Dropdown menu visibility */}
      {isOpen && (
        <div className="absolute w-60 left-0 mx-auto mt-5 bg-base-100 bg-opacity-80 rounded-lg shadow-lg p-2 z-50">
          <div className="menu menu-vertical w-full gap-2">
            <Link
              to="/general-insurance"
              className="hover:text-primary text-nowrap"
              onClick={handleMenuItemClick} // Close menu on click
            >
              General Insurance
            </Link>
            <Link
              to="/medical-insurance"
              className="hover:text-primary text-nowrap"
              onClick={handleMenuItemClick} // Close menu on click
            >
              Medical Insurance
            </Link>
            <Link
              to="/life-insurance"
              className="hover:text-primary text-nowrap"
              onClick={handleMenuItemClick} // Close menu on click
            >
              Life Assurance
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insurance;
