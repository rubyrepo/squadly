import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import BookingModal from '../components/BookingModal';
import Swal from 'sweetalert2';

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlots, setSelectedSlots] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const data = await userService.getCourts();
      setCourts(data);
    } catch (error) {
      console.error('Error fetching courts:', error);
      Swal.fire('Error', 'Failed to load courts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSlotChange = (courtId, value) => {
    setSelectedSlots(prev => ({
      ...prev,
      [courtId]: value
    }));
  };

  const handleBookClick = (court) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedCourt(court);
    setShowModal(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      await userService.createBooking(bookingData);
      setShowModal(false);
      Swal.fire({
        icon: 'success',
        title: 'Booking Submitted!',
        text: 'Your booking is pending admin approval.'
      });
    } catch (error) {
      console.error('Booking error:', error);
      Swal.fire('Error', 'Failed to submit booking', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Courts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div key={court._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={court.imageUrl} 
              alt={court.type}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">{court.type}</h2>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Time Slot
                </label>
                <select
                  value={selectedSlots[court._id] || ''}
                  onChange={(e) => handleSlotChange(court._id, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="">Choose a time slot</option>
                  {court.timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">
                  ${court.pricePerSession}/session
                </p>
                <button
                  onClick={() => handleBookClick(court)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No courts available at the moment.</p>
        </div>
      )}

      {showModal && (
        <BookingModal
          court={selectedCourt}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default Courts;