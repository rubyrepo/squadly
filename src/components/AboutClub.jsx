import React from 'react';

const AboutClub = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">About Our Club</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* History Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">Our History</h3>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2010, Squadly Sports Club emerged from a passionate group of sports 
              enthusiasts who believed in creating a space where athletes of all levels could 
              thrive. Over the years, we've grown from a small local club to one of the 
              region's premier sports facilities.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-16 font-semibold">2010</span>
                <span>Club foundation</span>
              </li>
              <li className="flex items-center">
                <span className="w-16 font-semibold">2015</span>
                <span>Expansion of facilities</span>
              </li>
              <li className="flex items-center">
                <span className="w-16 font-semibold">2020</span>
                <span>Regional championship hosts</span>
              </li>
            </ul>
          </div>

          {/* Mission & Values Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To foster a vibrant sports community that promotes excellence, inclusivity, 
                and personal growth through athletics. We strive to provide top-tier 
                facilities and programs that enable athletes to reach their full potential.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Core Values</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-red-600">Excellence</h4>
                  <p className="text-sm text-gray-600">Striving for the highest standards in everything we do</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-red-600">Community</h4>
                  <p className="text-sm text-gray-600">Building strong relationships through sports</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-red-600">Inclusivity</h4>
                  <p className="text-sm text-gray-600">Welcoming athletes of all levels and backgrounds</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-red-600">Innovation</h4>
                  <p className="text-sm text-gray-600">Embracing new methods and technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600">500+</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600">20+</div>
            <div className="text-gray-600">Expert Coaches</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600">15+</div>
            <div className="text-gray-600">Sports Facilities</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600">50+</div>
            <div className="text-gray-600">Annual Events</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;