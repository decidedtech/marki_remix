 import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialCarousel = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 bg-white rounded-lg shadow-lg w-full mx-auto">
      {/* Left Section: Title */}
      <div className="w-full lg:w-1/3 text-center mb-6 lg:mb-0">
        <h2 className="text-2xl lg:text-4xl font-bold text-indigo-600">
          From Our Success Stories
        </h2>
      </div>

      {/* Right Section: Testimonial Carousel */}
      <div className="w-full lg:w-2/3 mt-6 lg:mt-0 relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            disableOnInteraction: false,
          }}
          loop={true}
          className="swiper-container"
        >
          <SwiperSlide className="swiper-slide bg-gray-50 p-6 rounded-lg">
            <h2 className="text-gray-700 italic text-2xl font-semibold">
              Tailored Automotive Expertise
            </h2>
            <p>
              At Marki&apos;s Automobile Consultancy Department, we specialize
              in offering custom automotive solutions that perfectly align with
              our clients&apos; lifestyles. Recently, we had the privilege of
              advising a client with a Kes. 26M budget, helping him select two
              ideal vehicles that matched both his personal and professional
              needs. For his everyday use, we recommended the 2018 Mitsubishi
              Outlander Full Specs, a dependable and versatile option. For his
              high-end events and social gatherings, we advised the 2022
              Mercedes GLS 400D AMG Kit, a true blend of luxury and performance.
              From sourcing the vehicles through trusted dealers in Japan and
              the UK to facilitating exclusive registration and delivery, our
              department managed the entire process with precision. We are
              committed to providing seamless service and expert guidance,
              ensuring every client enjoys a superior automotive experience. At
              Marki, we elevate your car-buying journey, offering more than just
              vehicles—offering solutions.
            </p>

            <div className="mt-4 flex items-center space-x-4">
              <div>
                <h4 className="text-indigo-600 font-bold">Mercedes GLS 400</h4>
                <p className="text-gray-500 text-sm">Kenya.</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="swiper-slide bg-gray-50 p-6 rounded-lg">
            <h2 className="text-gray-700 italic text-2xl font-semibold">
              2021 Land Rover Defender Upgrade
            </h2>
            <p>
              We recently had the opportunity to consult on behalf of our client
              for the upgrade of a 2021 Land Rover Defender in a striking gold
              color. Our team provided expert advice on enhancing its sporty and
              unique appearance, helping the client achieve their vision for a
              more dynamic vehicle. We guided the client in selecting a custom
              body kit, 22-inch off-road wheels, and an upgraded exhaust system
              to amplify performance and aesthetics. Additionally, we
              recommended interior enhancements, including luxurious leather
              seats and carbon fiber accents, to elevate the overall experience.
              This consultation ensured that the Defender not only stands out on
              the road but also meets the client&apos;s desire for a
              distinctive, high-performance vehicle.
            </p>

            <div className="mt-4 flex items-center space-x-4">
              <div>
                <h4 className="text-indigo-600 font-bold">
                  2021 Land Rover Defender
                </h4>
                <p className="text-gray-500 text-sm">Kenya.</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="swiper-pagination mt-4"></div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
