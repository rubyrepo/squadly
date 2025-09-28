import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../context/AuthContext';

const BookingModal = ({ court, isOpen, onClose, onSubmit }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const totalPrice = selectedSlots.length * court.pricePerSession;

  const handleSlotToggle = (slot) => {
    setSelectedSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      courtId: court._id,
      courtType: court.type,
      date: selectedDate,
      slots: selectedSlots,
      totalPrice,
      userEmail: user.email,
      status: 'pending',
      createdAt: new Date()
    };
    onSubmit(bookingData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Book {court.type} Court</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Court Type</label>
            <input
              type="text"
              value={court.type}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              minDate={new Date()}
              className="mt-1 block w-full rounded-md border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Select Time Slots</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {court.timeSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSlotToggle(slot)}
                  className={`p-2 rounded ${
                    selectedSlots.includes(slot)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="text-lg font-semibold">
            Total Price: ${totalPrice}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;