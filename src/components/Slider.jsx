import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { NavLink } from 'react-router';

import 'swiper/css';
import 'swiper/css/pagination';

const accent = '#ff0000'; // Red accent for your theme

const slides = [
  {
    img: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    alt: 'Soccer Court',
    title: 'Book Your Court Easily',
    description: 'Reserve courts online for soccer, tennis, basketball, or other sports quickly and securely.',
    listTitle: 'Why choose us:',
    items: [
      'Instant court booking',
      'View available slots in real-time',
      'Manage your reservations effortlessly',
      'Play anytime without waiting',
    ],
    buttonText: 'Book Now',
    link: '/courts',
  },
  {
    img: 'https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg',
    alt: 'Sports Club Activities',
    title: 'Join Exciting Sports Activities',
    description: 'Participate in tournaments, classes, and fun group activities organized by our club.',
    listTitle: 'Activities include:',
    items: [
      'Football & Basketball tournaments',
      'Yoga and fitness classes',
      'Swimming sessions',
      'Team-building sports events',
    ],
    buttonText: 'Explore Activities',
    link: '/activities',
  },
  {
    img: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
    alt: 'Membership Benefits',
    title: 'Become a Club Member',
    description: 'Gain access to exclusive facilities, priority bookings, and member-only events.',
    listTitle: 'Member benefits:',
    items: [
      'Discounted court bookings',
      'Early access to events',
      'Personalized training sessions',
      'Community networking opportunities',
    ],
    buttonText: 'Join Now',
    link: '/membership',
  },
];

const Slider = () => {
  return (
    <div className="w-full flex justify-center px-4 py-10">
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full max-w-6xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row w-full h-[400px] md:h-[450px] bg-white rounded-lg shadow-lg border border-red-600 overflow-hidden mx-auto">
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-[200px] md:h-full flex-shrink-0">
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
                <p className="text-2xl md:text-3xl font-bold mb-2" style={{ color: accent }}>
                  {slide.title}
                </p>
                <p className="mb-2 max-w-md text-gray-800">{slide.description}</p>
                <p className="font-semibold text-gray-900 mt-2">{slide.listTitle}</p>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm md:text-base text-gray-700">
                  {slide.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <NavLink to={slide.link} className="mt-6">
                  <button
                    className="py-3 px-8 md:py-4 md:px-10 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                    style={{ backgroundColor: accent, color: '#fff' }}
                  >
                    {slide.buttonText}
                  </button>
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
