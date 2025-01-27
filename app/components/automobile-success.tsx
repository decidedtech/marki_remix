 import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const AutomobileSuccess = () => {
  return (
    <Carousel autoPlay showArrows infiniteLoop>
      <div className="hero   bg-white bg-opacity-70">
        <div className="hero-content text-start">
          <div className=" p-4">
            <h1 className="text-xl text-neutral py-2 font-semibold">
              Welcome to Marki Insurance Agency
            </h1>
            Marki Automobile Consultancy – Tailored Automotive Expertise At
            Marki’s Automobile Consultancy Department, we specialise in offering
            custom automotive solutions that perfectly align with our clients’
            lifestyles. Recently, we had the privilege of advising a client with
            a Kes. 26M budget, helping him select two ideal vehicles that
            matched both his personal and professional needs. For his everyday
            use, we recommended the 2018 Mitsubishi Outlander Full Specs, a
            dependable and versatile option. For his high-end events and social
            gatherings, we advised the 2022 Mercedes GLS 400D AMG Kit, a true
            blend of luxury and performance. From sourcing the vehicles through
            trusted dealers in Japan and the UK to facilitating exclusive
            registration and delivery, our department managed the entire process
            with precision. We are committed to providing seamless service and
            expert guidance, ensuring every client enjoys a superior automotive
            experience. At Marki, we elevate your car-buying journey, offering
            more than just vehicles—offering solutions.{" "}
          </div>
        </div>
      </div>
      <div className=" hero  bg-slate-100 bg-opacity-70">
        <div className="hero-content text-start">
          <div className="max-w-5xl p-4">
            <h1 className="text-xl text-zinc-900 py-2 font-semibold">
              Professional Service
            </h1>
            <h1 className="text-5xl py-1 text-error font-bold">
              General Insurance
            </h1>
            <p className="py-4 font-medium">
              Almost everythinds is insurable, However General Insurance in our
              market is Bifurcated as Fire, Engineering, Marine and Professional
              Indemnity, Car Insurance, Domestic Insurance, Livestock Cover,
              Contactors All Risk, WIBA and WIBA Plus, Pesonal Accidents,
              General Office, Travel Insurance amongst other, At Marki we all
              need to uderstand your need and sort the risk.
            </p>
            <button className="btn btn-error text-white">Get Started</button>
          </div>
        </div>
      </div>
      <div className=" hero   bg-zinc-100 bg-opacity-70">
        <div className="hero-content text-start">
          <div className="max-w-5xl p-4">
            <h1 className="text-xl text-zinc-900 py-2 font-semibold">
              Experienced Insurance Agency
            </h1>
            <h1 className="text-5xl py-1 text-error font-bold">
              Medical Insurance
            </h1>
            <p className="py-4 font-medium ">
              Our commitment to service, dictate that the affordable and basic
              Health Insurance should always put you and your needs first. So we
              Marki we vet the best product in the market for both corporate and
              individual cover to keep you happy and healthy.
            </p>
            <button className="btn btn-error text-white">Get Started</button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default AutomobileSuccess;
