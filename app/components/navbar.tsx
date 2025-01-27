  
// import Logo from "/src/logo.png";
// import { auth } from "@/auth";
// import { BASE_URL } from "../constants/constants";
import Insurance from "../ui/menus/insurance";
import { Link } from "@remix-run/react";

export  default function Navbar  () {
  // const session = await auth();
  return (
    <div className="navbar sticky top-0 bg-gray-200 text-neutral z-50 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
             className="menu menu-sm text-neutral dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <details>
                <summary>Insurance Products</summary>
                <ul className="p-2 text-neutral">
                  <li>
                    <Link to="/general-insurance">General Insurance</Link>
                  </li>
                  <li>
                    <Link to="/medical-insurance">Medical Insurance</Link>
                  </li>
                  <li>
                    <Link to="/life-insurance">Life Insurance</Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <Link to="/why-us">Why Us</Link>
            </li>

            <li>
              <Link to="/claim-advocacy">Claim Advocacy</Link>
            </li>
            <li>
              <Link to="/business-associates">Business Associates</Link>
            </li>
            <li>
              <Link to="/c-s-r">C.S.R</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link to="/awards" className="text-neutral">
                Awards
              </Link>
            </li>
            <li>
              <Link
                to="/automobile-consultation"
                className="text-red-700 btn btn-sm btn-ghost"
              >
                Automobile Consultation
                <div className="badge badge-primary text-white badge-sm">
                  New
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="absolute left-8 ">
          <img
            src='/logo.png'
            alt="Marki"
            width={400}
            height={400}
            className=" w-16   lg:w-24 md:w-16 sm:w-14"
          />
        </Link>
      </div>
      <div className="navbar-center hidden  text-neutral lg:flex">
        <ul className="menu menu-horizontal gap-3 items-center text-neutral">
          <Insurance />

          <Link to="/why-us" className="text-neutral">
            Why Us
          </Link>

          <Link to="/claim-advocacy" className="text-neutral">
            Claim Advocacy
          </Link>

          <Link to="/business-associates">Business Associates</Link>

          <Link to="/c-s-r" className="text-neutral">
            C.S.R
          </Link>

          <Link to="/contact-us" className="text-neutral">
            Contact Us
          </Link>

          <Link to="/awards" className="text-neutral">
            Awards
          </Link>
          <Link
            to="/automobile-consultation"
            className="text-error btn btn-sm btn-ghost"
          >
            Automobile Consultation
            <div className="badge badge-primary text-white badge-sm">New</div>
          </Link>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          to="/get-a-quote/insurance"
          className="btn btn-sm text-white btn-neutral mr-1"
        >
          Get a Quote
        </Link>

        {/* {session?.user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm  bg-white text-neutral avatar  placeholder"
            >
              <div className="w-6 rounded-full">
                 
                {session?.user.email?.substring(0, 1).toUpperCase()}
              </div>
            </div>
            <ul
               className="menu menu-sm dropdown-content text-neutral bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="">
                  Profile
                </Link>
              </li>

              {(session?.user.role === "admin" ||
                session?.user.role === "moderator") && (
                <li>
                  <Link to={`${BASE_URL}`} className="">
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link to="/auth/signout" className="">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/auth/signin" className="btn  btn-ghost btn-sm">
            Sign in
          </Link>
        )} */}
      </div>
    </div>
  );
};

