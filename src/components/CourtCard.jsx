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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={court.imageUrl}
        alt={court.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{court.name}</h3>
        <p className="text-gray-600 mb-4">Type: {court.type}</p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Time Slot
          </label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Choose a slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">৳{court.pricePerHour}/hour</p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
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