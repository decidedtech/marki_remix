  import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <Carousel autoPlay showArrows infiniteLoop>
      <div className="hero   bg-white bg-opacity-70">
        <div className="hero-content text-start">
          <div className=" p-4">
            <h1 className="text-xl text-neutral py-2 font-semibold">
              Welcome to Marki Insurance Agency
            </h1>
            <h1 className="text-5xl py-1 text-error font-bold">
              Insurance Solutions
            </h1>
            <p className="py-4 font-medium">
               We are both a player with wide knowledge of the Insurance
              Marketplace including products, prices and provides an acute sense
              of the needs of the insurance purchasers, <br />
              this by gathering and evaluting information regarding placement,
              Premium and Claims experience across all
              <br /> giant underwriters in the market.
              <br /> We basically you in the choice of your
              insurance by presenting you with alternatives in terms of insures
              and products.
            </p>
            <button className="btn btn-error text-white">Get Started</button>
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

export default Hero;
