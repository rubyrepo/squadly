import React from "react";
import { Star, Users, Trophy, Activity } from "lucide-react";

const AboutClub = () => {
  const timeline = [
    { year: "2010", event: "Club foundation" },
    { year: "2015", event: "Expansion of facilities" },
    { year: "2020", event: "Regional championship hosts" },
  ];

  const values = [
    { title: "Excellence", desc: "Striving for the highest standards in everything we do" },
    { title: "Community", desc: "Building strong relationships through sports" },
    { title: "Inclusivity", desc: "Welcoming athletes of all levels and backgrounds" },
    { title: "Innovation", desc: "Embracing new methods and technologies" },
  ];

  const stats = [
    { label: "Active Members", value: "500+", icon: <Users className="w-6 h-6 mx-auto text-red-600" /> },
    { label: "Expert Coaches", value: "20+", icon: <Star className="w-6 h-6 mx-auto text-red-600" /> },
    { label: "Sports Facilities", value: "15+", icon: <Trophy className="w-6 h-6 mx-auto text-red-600" /> },
    { label: "Annual Events", value: "50+", icon: <Activity className="w-6 h-6 mx-auto text-red-600" /> },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">About Our Club</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* History Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Our History</h3>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2010, Squadly Sports Club started from passionate enthusiasts creating a space 
              for athletes of all levels. Over the years, we’ve grown into a premier sports facility.
            </p>
            <ul className="space-y-3">
              {timeline.map((item) => (
                <li key={item.year} className="flex items-center gap-4 text-gray-700">
                  <div className="font-bold text-red-600 w-16">{item.year}</div>
                  <div>{item.event}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission & Values */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To foster a vibrant sports community promoting excellence, inclusivity, and personal growth. 
                We provide top-tier facilities and programs to help athletes reach their full potential.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Core Values</h3>
              <div className="grid grid-cols-2 gap-4">
                {values.map((val) => (
                  <div 
                    key={val.title} 
                    className="p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300"
                  >
                    <h4 className="font-semibold text-red-600 mb-2">{val.title}</h4>
                    <p className="text-sm text-gray-700">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300"
            >
              {stat.icon}
              <div className="text-3xl font-extrabold text-red-600 mt-2">{stat.value}</div>
              <div className="text-gray-700 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
