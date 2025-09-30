import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { NavLink } from "react-router";
import { Check } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const accent = "#ff0000"; // Accent color

const slides = [
  {
    img: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg",
    alt: "Soccer Court",
    title: "Book Your Court Easily",
    description:
      "Reserve courts online for soccer, tennis, basketball, or other sports quickly and securely.",
    items: [
      "Instant court booking",
      "View available slots in real-time",
      "Manage your reservations effortlessly",
      "Play anytime without waiting",
    ],
    buttonText: "Book Now",
    link: "/courts",
  },
  {
    img: "https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg",
    alt: "Sports Club Activities",
    title: "Join Exciting Sports Activities",
    description:
      "Participate in tournaments, classes, and fun group activities organized by our club.",
    items: [
      "Football & Basketball tournaments",
      "Yoga and fitness classes",
      "Swimming sessions",
      "Team-building sports events",
    ],
    buttonText: "Explore Activities",
    link: "/activities",
  },
  {
    img: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
    alt: "Membership Benefits",
    title: "Become a Club Member",
    description:
      "Gain access to exclusive facilities, priority bookings, and member-only events.",
    items: [
      "Discounted court bookings",
      "Early access to events",
      "Personalized training sessions",
      "Community networking opportunities",
    ],
    buttonText: "Join Now",
    link: "/membership",
  },
];

const Slider = () => {
  return (
    <div className="w-full py-12 bg-gray-50">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full max-w-7xl mx-auto"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[450px] md:h-[500px] rounded-xl overflow-hidden shadow-lg group">
              {/* Background Image */}
              <img
                src={slide.img}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col md:flex-row h-full items-center justify-center px-6 md:px-12">
                <div className="text-center md:text-left max-w-xl text-white">
                  <h2
                    className="text-3xl md:text-5xl font-extrabold mb-4"
                    style={{ color: accent }}
                  >
                    {slide.title}
                  </h2>
                  <p className="mb-4 text-lg md:text-xl">{slide.description}</p>
                  <ul className="mb-6 space-y-3">
                    {slide.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 opacity-0 animate-fade-in"
                        style={{ animationDelay: `${i * 150}ms`, animationFillMode: "forwards" }}
                      >
                        <Check className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <NavLink to={slide.link}>
                    <button className="bg-white text-red-600 font-bold px-6 py-3 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                      {slide.buttonText}
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fade-in Animation Styles */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
