import React, { useState } from 'react';

const CourtCard = ({ court }) => {
  const [selectedSlot, setSelectedSlot] = useState('');

  const timeSlots = [
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM"
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Court Image */}
      <img
        src={court.imageUrl}
        alt={court.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 flex flex-col space-y-4">
        {/* Court Details */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{court.name}</h3>
          <p className="text-gray-600 mt-1">Type: {court.type}</p>
        </div>

        {/* Time Slot Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Time Slot
          </label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Choose a slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Book Button */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-bold text-red-600">৳{court.pricePerHour}/hour</p>
          <button
            className={`px-5 py-2 rounded-lg text-white font-medium transition-colors ${
              selectedSlot ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedSlot}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourtCard;
