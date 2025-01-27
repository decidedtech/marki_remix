import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import ContactForm from "../ui/forms/contact-form";
// import img from "next/image";
// import Link from "next/link";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="flex flex-col  justify-start items-center w-full">
      <div
        className="hero bg-opacity-95 rounded-br-3xl bg-cover bg-center min-h-screen relative overflow-hidden"
        style={{ backgroundImage: `url(${'/insurance3.jpg'})` }}
      >
        <div className="particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
        <div className="hidden lg:block absolute lg:-left-10 -top-40 bg-sky-950 w-52 h-52 rounded-3xl rotate-[30deg] origin-bottom-left "></div>
        <div className="hidden lg:block absolute left-1/2 bottom-1/4 bg-gradient-to-t from-sky-950 to-transparent w-[50%] h-[90%] rounded-[70px] rotate-[40deg] origin-bottom-left lg:-translate-x-10"></div>
        <div className="hidden lg:block absolute left-1/2 bottom-1/4 bg-gradient-to-t from-sky-950 to-transparent w-[50%] h-[90%] rounded-[70px] rotate-[40deg] origin-bottom-left lg:-translate-x-10"></div>
        <div className="hidden lg:block absolute lg:left-10 bottom-5  bg-sky-950 w-44 h-44 rounded-3xl rotate-[40deg] origin-bottom-left "></div>
        <div className="hidden lg:block absolute lg:left-1/3 top-20 bg-gradient-to-t from-sky-950 to-transparent w-40 h-40 rounded-3xl rotate-[30deg] origin-bottom-left "></div>
        <div className="hero-content flex flex-col  lg:flex-row justify-start items-start max-w-6xl">
          <div className=" p-6">
            <h1 className="text-xl text-center lg:text-start text-slate-400 py-2 font-bold  hover:-translate-x-4 duration-300">
              Marki Insurance Agency
            </h1>
            <h1 className="text-5xl leading-tight py-1 text-white font-bold hover:-translate-x-4 duration-300">
              Secure With Trust
            </h1>
            <p className="py-4 text-white hover:-translate-x-4 duration-300">
              We are a Key Player with extensive knowledge of the Insurance
              Marketplace including products & prices providing an acute sense
              of your insurance needs.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-9 text-primary  animate-pulse"
            >
              <path
                fillRule="evenodd"
                d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>

            <div className="flex flex-row gap-2 py-4 items-center">
              <Link
                to="/general-insurance"
                className=" uppercase text-red-700 text-lg font-semibold  hover:-translate-y-1 duration-300  "
              >
                General
              </Link>
              <span className="text-lg text-white hover:-translate-y-1 duration-300">
                •
              </span>
              <Link
                to="/medical-insurance"
                className=" text-red-700 text-lg uppercase font-semibold hover:-translate-y-1 duration-300"
              >
                Medical
              </Link>
              <span className="text-lg text-white hover:-translate-y-1 duration-300">
                •
              </span>
              <Link
                to="/life-insurance"
                className=" text-red-700 text-lg uppercase font-semibold hover:-translate-y-1 duration-300 "
              >
                Life Assurance
              </Link>
            </div>

            <Link
              to="/get-a-quote/general-insurance"
              className="btn btn-outline btn-ghost text-white hover:text-error"
            >
              Get Started
            </Link>
          </div>
          <div className="grid gap-1.5 grid-cols-1 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 p-6 justify-center w-full  items-center mt-6  ">
            <div className="card group w-full lg:w-40 md:w-40 sm:w-full hover:brightness-90 transition-all  bg-white bg-opacity-10 rounded-s-3xl shadow card-compact hover:-translate-y-2 duration-300 animate-fadeIn">
              <div className="card-body  items-center text-center">
                {/* <div className="bg-red-900 w-10 h-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-lime-900 transition-all"></div> */}

                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-11 text-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </figure>
                <h2 className=" text-base-300 font-bold">SINCE 2016</h2>
                <div className="w-full flex flex-col items-center justify-center">
                  <span className="text-base-300">
                    Trusted for Over Half A Decade
                  </span>
                  <div className="border-b mt-2 border-primary w-16"></div>
                </div>
                <div className="h-4 w-full bg-gradient-to-r from-transparent via-lime-500 to-transparent group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0 duration-300"></div>
                <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-lime-900 group-hover:via-lime-500 w-[70%] m-auto rounded transition-all hover:duration-300"></div>
              </div>
            </div>
            <div className="card group rounded-e-3xl sm:w-full bg-white bg-opacity-20 lg:w-40  w-full  rounded-b-3xl   card-compact hover:-translate-y-1 duration-300">
              <div className="card-body  items-center text-center">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-11 text-base-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </figure>
                <h2 className=" text-green-500  font-bold">LICENCED</h2>
                <div className="w-full flex flex-col items-center justify-center">
                  <span className="text-green-500">
                    To Operate All Over Kenya
                  </span>
                  <div className="border-b mt-2 border-white w-16"></div>
                </div>
                <div className="h-4 w-full bg-gradient-to-r from-transparent via-lime-500 to-transparent group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0 duration-300"></div>
                <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-lime-900 group-hover:via-lime-500 w-[70%] m-auto rounded transition-all hover:duration-300"></div>
              </div>
            </div>
            <div className="card group bg-sky-800 bg-opacity-70 w-full lg:w-40 sm:w-full rounded-bl-3xl  rounded-se-3xl   card-compact hover:-translate-y-1 duration-300 ">
              <div className="card-body   items-center text-center">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-11 text-info"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                    <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
                  </svg>
                </figure>
                <h2 className=" text-white  font-bold">OVER 1000+</h2>
                <div className="w-full flex flex-col items-center justify-center">
                  <span className="text-white">Cumulative Insured Assets</span>
                  <div className="border-b mt-2 border-info w-16"></div>
                </div>
                <div className="h-4 w-full bg-gradient-to-r from-transparent via-lime-500 to-transparent group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0 duration-300"></div>
                <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-lime-900 group-hover:via-lime-500 w-[70%] m-auto rounded transition-all hover:duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-6">
        <h1 className="text-center text-3xl py-6 hover:-translate-x-2 duration-300 font-bold leading-tight text-sky-900">
          Trusted By Leading Companies
        </h1>
        <div className="flex flex-row flex-wrap gap-4  justify-center items-center">
          <nav className="w-60 p-4  bg-base-200 bg-opacity-95 glass rounded-md ml-10  relative h-44 shadow-xl dark:hover:shadow-gray-700 hover:shadow-blue-400  ">
            <div className="h-[85%] w-[95%] bg-white absolute top-4 -left-7 shadow-xl grid place-items-center rounded-l-md overflow-hidden">
              <img
                src='/wook.png'
                width={200}
                height={150}
                alt="workpay"
                className="object-contain "
              />
            </div>
          </nav>
          <nav className="w-60 p-4  bg-error bg-opacity-95 glass rounded-md ml-10  relative h-44 shadow-xl dark:hover:shadow-gray-700 hover:shadow-blue-400  ">
            <div className="h-[85%] w-[95%] bg-white absolute top-4 -left-7 shadow-xl grid place-items-center rounded-l-md overflow-hidden">
              <img
                src='/alpha.png'
                width={200}
                height={200}
                alt="alpha"
                className="object-contain h-full rounded-lg"
              />
            </div>
          </nav>
          <nav className="w-60 p-4  bg-black bg-opacity-95 glass rounded-md ml-10  relative h-44 shadow-xl dark:hover:shadow-gray-700 hover:shadow-blue-400  ">
            <div className="h-[85%] w-[95%] bg-white absolute top-4 -left-7 shadow-xl grid place-items-center rounded-l-md overflow-hidden">
              <img
                src='/pitpro.png'
                width={200}
                height={150}
                alt="Pitpro"
                className="object-contain "
              />
            </div>
          </nav>
          <nav className="w-60 p-4  bg-zinc-900 bg-opacity-95 glass rounded-md ml-10  relative h-44 shadow-xl dark:hover:shadow-gray-700 hover:shadow-blue-400  ">
            <div className="h-[85%] w-[95%] bg-white absolute top-4 -left-7 shadow-xl grid place-items-center rounded-l-md overflow-hidden">
              <img
                src='/slm.jpg'
                width={200}
                height={150}
                alt="workpay"
                className="object-contain h-full rounded-lg"
              />
            </div>
          </nav>
        </div>
      </div>
      <div className="flex items-center justify-center w-full  ">
        <div className="w-full overflow-auto max-w-5xl bg-white">
          <h1 className="text-center text-3xl py-6 font-bold text-error">
            Our Client Reviews
          </h1>
          <div
            className="senja-embed"
            data-id="fc35caca-f181-414f-afc1-f38696cffe32"
            data-mode="shadow"
            data-lazyload="false"
            style={{ display: "block" }}
          ></div>

          {/* <Script
            src="https://widget.senja.io/widget/fc35caca-f181-414f-afc1-f38696cffe32/platform.js"
            type="text/javascript"
            async
          /> */}
        </div>
      </div>
      <div className="flex flex-col relative overflow-hidden justify-center items-center   mt-3 w-full bg-white">
        <div className=" border w-full rounded-bl-3xl rounded-tr-3xl  max-w-6xl bg-white p-12">
          <h1 className="text-3xl hover:-translate-y-1 duration-300   flex flex-row gap-2 justify-center items-center font-bold text-error text-center">
            How this works
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </h1>

          <div className="absolute bottom-0 left-0 h-[30%] w-[20%] bg-gradient-to-bl from-white to-sky-950 blur-[130px]"></div>
          <p className="text-center py-5 hover:-translate-y-1 duration-300">
            With our underwriter&apos;s we&apos;ve been able to connect over
            1000 customers with new insurance options.
          </p>
          <div className="grid justify-center p-6  max-w-5xl  w-full items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
            <div className="absolute top-0 right-0 h-[30%] w-[30%] bg-gradient-to-tr from-white to-sky-950 blur-[130px]"></div>

            <section className="flex flex-col justify-center hover:-translate-y-1 duration-300 items-center text-center gap-2">
              <h1 className="text-2xl font-bold bg-success bg-opacity-25  rounded-full h-14 flex items-center justify-center w-14 border text-base-100">
                01
              </h1>
              <p className="text-xl font-bold text-error">
                Tell Us About Yourself
              </p>
              <p>We&apos;ll gather some information about your assets</p>
            </section>
            <section className="flex flex-col justify-center hover:-translate-y-1 duration-300 items-center text-center gap-2">
              <h1 className="text-2xl font-bold bg-success bg-opacity-50 rounded-full h-14 flex items-center justify-center w-14 border text-base-100">
                02
              </h1>
              <p className="text-xl font-bold text-error">Choose Your Policy</p>
              <p>Compare personalized options & pick the best one for you.</p>
            </section>
            <section className="flex flex-col justify-center hover:-translate-y-1 duration-300 items-center text-center gap-2">
              <h1 className="text-2xl font-bold bg-success text-white  rounded-full h-14 flex items-center justify-center w-14 border ">
                03
              </h1>
              <p className="text-xl font-bold text-error">Lock It In</p>
              <p>Finish the process with assistance from our team</p>
            </section>
          </div>
        </div>

        <div className="flex justify-center   p-3 mt-3 w-full items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-4xl transform hover:-translate-y-2 duration-300 text-neutral font-bold ">
              Key Products
            </h1>

            <div className="grid justify-center mt-3  max-w-6xl mb-3  w-full items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
              <Link
                to="/get-a-quote/motor-commercial-insurance"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Motor Commercial Cover
              </Link>
              <Link
                to="/get-a-quote/motor-private"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Motor Private Cover
              </Link>
              <Link
                to="/get-a-quote/personal-accident"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Personal Accident Cover
              </Link>
              <Link
                to="/get-a-quote/wiba"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                WIBA
              </Link>
              <Link
                to="/get-a-quote/domestic-insurance"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Domestic/Office General Cover
              </Link>
              <Link
                to="/get-a-quote/corporate-medical-cover"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Corporate Medical Cover
              </Link>
              <Link
                to="/get-a-quote/individual-medical-cover"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Individual Medical Cover
              </Link>
              <Link
                to="/get-a-quote/elimu-cover"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Elimu Cover
              </Link>
              <Link
                to="/get-a-quote/pension-cover"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Pension Cover
              </Link>
              <Link
                to="/get-a-quote/group-life-cover"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Group Life Cover
              </Link>
              <Link
                to="/get-a-quote/credit-life-cover"
                className="text-center p-2 transform bg-white rounded hover:bg-neutral/80 hover:text-white cursor-pointer hover:-translate-x-2 duration-300 hover:shadow-xl hover:rounded"
              >
                Credit Life Cover
              </Link>
            </div>
            <div className="relative w-full bg-neutral/90 h-auto overflow-hidden mt-6 max-w-5xl mx-auto shadow-lg rounded-lg">
              {/* Left Gradient Div */}
              <div
                className="absolute w-full sm:w-1/2 h-full bg-cover bg-center z-10"
                style={{ backgroundImage: `url(${'/byui.jpg'})` }}
              ></div>

              <div className="relative flex flex-col sm:flex-row items-center justify-between h-full z-20">
                {/* Left Content */}
                <div className="w-full sm:w-1/2 md:clip-diagonal flex flex-col justify-center items-start text-white font-bold text-xl p-4 md:p-8 z-20 space-y-4">
                  <div className="flex items-center space-x-2 w-full">
                    <div className="bg-white/70 p-1">
                      <h1 className="text-lg md:text-xl uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-700 to-red-600">
                        Automobile Consultation
                      </h1>
                    </div>
                    <span className="badge badge-error text-white">NEW</span>
                  </div>
                  <Link
                    to="/automobile-consultation"
                    className="btn btn-warning text-neutral hover:bg-white transition-all duration-300 ease-in-out font-semibold shadow-lg transform hover:scale-105"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Right Content */}
                <div className="w-full sm:w-1/2 h-full flex flex-col justify-center items-center text-white font-semibold text-lg p-4 z-20">
                  <div className="text-center">
                    Car Purchase
                    <span className="text-lg p-1 text-error hover:-translate-y-1 duration-300">
                      •
                    </span>
                    Modifications & Tuning
                    <span className="text-lg p-1 text-error hover:-translate-y-1 duration-300">
                      •
                    </span>
                    Mechanics & Services Consultation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center  flex-col py-6 mx-4">
        <h1 className="text-xl py-6 text-error text-center font-bold hover:-translate-y-1 duration-300">
          Tailored Insurance Solutions for Your Health, Life, and Everyday Needs
        </h1>
        <div className="grid justify-center mt-3  max-w-6xl mb-3  w-full items-center grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4 ">
          <div className="card shadow-xl transform cursor-pointer hover:-translate-y-2 hover:bg-red-50 duration-300  card-bordered">
            <figure className="h-56">
              <img
                src='/vehicle.jpg'
                width={400}
                height={400}
                alt="General"
                className="object-cover w-full"
              />
            </figure>
            <div className="card-body  items-center text-center">
              <h2 className="card-title text-error">General Insurance</h2>
              <p className="text-secondary">
                Fire, Engineering, Marine and Professional Indemnity, Car
                Insurance, Domestic Insurance, Livestock Cover, Contactors All
                Risk, WIBA and WIBA Plus, Pesonal Accidents, General Office,
                Travel Insurance amongst others.
              </p>
              <div className="card-actions justify-end">
                <Link
                  to="/general-insurance"
                  className="btn hover:bg-error hover:text-white  text-error btn-outline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="card shadow-xl transform cursor-pointer hover:-translate-y-2 hover:bg-red-50 duration-300 card-bordered">
            <figure className="h-56">
              <img
                src='/med.jpg'
                width={400}
                height={400}
                alt="Medical"
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body  items-center text-center">
              <h2 className="card-title text-error">Medical Insurance</h2>
              <p className="text-secondary">
                Health Insurance should always put you and your needs first. So
                we Marki we vet the best product in the market for both
                corporate and individual covers to keep you happy and healthy.
              </p>
              <div className="card-actions justify-end">
                <Link
                  to="/medical-insurance"
                  className="btn hover:bg-error hover:text-white  text-error btn-outline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="card shadow-xl transform cursor-pointer hover:-translate-y-2 hover:bg-red-50 duration-300 card-bordered">
            <figure className="h-56">
              <img
                src='/life.jpg'
                width={400}
                height={400}
                alt="Medical"
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body  items-center text-center">
              <h2 className="card-title text-error">Life Assurance</h2>
              <p className="text-secondary">
                This is a cover that provides a payout to beneficiaries in the
                event of the policyholder&apos;s death. It is designed to offer
                financial protection to dependents or loved ones in case the
                primary earner or contributor passes away.
              </p>
              <div className="card-actions justify-end">
                <Link
                  to="/life-insurance"
                  className="btn hover:bg-error hover:text-white  text-error btn-outline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-5xl text-center justify-center items-center py-4">
        <h1 className="text-3xl text-start font-bold">Our Team </h1>
        <p className="py-4 p-6">
          Our dedicated team is here to guide you through your insurance needs,
          ensuring you have peace of mind and confidence in your coverage. Our
          experts bring years of experience, in-depth knowledge, and a passion
          for helping you secure what matters most
        </p>

        <div className="flex flex-row flex-wrap gap-2 w-full  justify-center mt-6  ">
          <div className="grid gap-6 md:grid-cols-4 md:gap-5 py-6">
            <div className="rounded-xl bg-white p-6 hover:-translate-y-3 duration-300 transform transition-all text-center shadow-lg hover:shadow-2xl">
              <div className="mx-auto flex h-16 w-16 -translate-y-8 transform items-center justify-center rounded-full bg-error shadow-lg shadow-red-400/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-xl font-semibold text-gray-800">
                Expert Team
              </h1>
            </div>

            <div className="rounded-xl bg-white p-6 hover:-translate-y-3 duration-300 transform transition-all text-center shadow-lg hover:shadow-2xl">
              <div className="mx-auto flex h-16 w-16 -translate-y-8 transform items-center justify-center rounded-full bg-error shadow-lg shadow-red-400/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-xl font-semibold text-gray-800">
                Quality Service
              </h1>
            </div>

            <div className="rounded-xl bg-white p-6 hover:-translate-y-3 duration-300 transform transition-all text-center shadow-lg hover:shadow-2xl">
              <div className="mx-auto flex h-16 w-16 -translate-y-8 transform items-center justify-center rounded-full bg-error shadow-lg shadow-red-400/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-xl font-semibold text-gray-800">
                A+ Support
              </h1>
            </div>

            <div className="rounded-xl bg-white p-6 hover:-translate-y-3 duration-300 transform transition-all text-center shadow-lg hover:shadow-2xl">
              <div className="mx-auto flex h-16 w-16 -translate-y-8 transform items-center justify-center rounded-full bg-error shadow-lg shadow-red-400/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-xl font-semibold text-gray-600">
                Management
              </h1>
            </div>
          </div>
        </div>

        <p className="py-2">
          Give us a Call&nbsp;
          <span className="font-semibold text-error">
            0713 385 183 Or 0798 371 353
          </span>
        </p>
        {/* <Link to="/why-us" className="btn bg-red-900 text-white">
          Learn More
        </Link> */}
      </div>

      <div
        className="hero bg-opacity-15 rounded-t-3xl bg-cover bg-center h-full"
        style={{ backgroundImage: `url(${'contact-2.jpg'})` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-error">Get In Touch</h1>
            <p className="py-4 text-xl text-red-900">
              Better yet, see us in person!
            </p>
            <h2 className="text-red-900">
              We love our customers, so feel free to visit during normal
              business hours.
            </h2>
            <div className="flex flex-row gap-2 items-center  text-center lg:text-start justify-center lg:justify-start text-warning py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-neutral"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className=" text-neutral font-semibold ">
                Westlands Commercial Centre
              </h2>
            </div>
            <div className="flex flex-row gap-2 items-center  text-center lg:text-start justify-center lg:justify-start text-warning py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-neutral"
              >
                <path
                  fillRule="evenodd"
                  d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-4.72 4.72a.75.75 0 1 1-1.06-1.06l4.72-4.72h-2.69a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className=" text-neutral font-semibold ">
                0713-385-183 <span className="text-error space-x-2"> | </span>{" "}
                0798-371-353
              </h2>
            </div>
            <h2 className="text-xl flex flex-row items-center  text-center lg:text-start justify-center lg:justify-start gap-2 font-semibold text-neutral py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clipRule="evenodd"
                />
              </svg>
              Hours
            </h2>
            <div className="flex flex-col gap-1 ml-6 text-sm text-neutral text-center lg:text-start">
              <p className="">Mon 08:30 am &ndash; 05:00 pm</p>
              <p className="">Tue 08:30 am &ndash; 05:00 pm</p>
              <p className="">Wed 08:30 am &ndash; 05:00 pm</p>
              <p className="">Thu 08:30 am &ndash; 05:00 pm</p>
              <p className="">Fri 08:30 am &ndash; 05:00 pm</p>
              <p className="">Sat 08:30 am &ndash; 05:00</p>
              <p className="">Sun Closed</p>
            </div>
          </div>
          <div className="card bg-white p-8 glass rounded-tl-3xl rounded-br-3xl w-full max-w-sm shrink-0 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="w-full bg-base-100">
        <div className="flex flex-col justify-center gap-2 py-4 items-center">
          <div>
            <h1 className="text-xl text-neutral">Connect With Us</h1>
          </div>
          <div className="flex flex-row gap-1 justify-end text-neutral items-center">
            <Link
              to="https://www.facebook.com/markiagency/"
               className="btn btn-circle btn-sm btn-ghost  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 320 512"
                className="size-6 text-primary"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </Link>
            <Link
              to="https://www.instagram.com/marki_agency/"
              target=" "
              className="btn btn-circle btn-sm  btn-ghost "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
                className="size-6 text-error"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </Link>
            <Link
              to="https://www.linkedin.com/company/markiagency/"
               className="btn btn-circle btn-sm btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
                className="size-6 text-primary"
              >
                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

 
