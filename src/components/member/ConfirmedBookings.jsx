import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';

const ConfirmedBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchConfirmedBookings();
    }
  }, [user]);

  const fetchConfirmedBookings = async () => {
    try {
      const data = await userService.getConfirmedBookings(user.email);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching confirmed bookings:', error);
      Swal.fire('Error', 'Failed to fetch bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Confirmed Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No confirmed bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-6 rounded-lg shadow-sm">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{booking.courtType}</h3>
                <p className="text-gray-600">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Time Slots: {booking.slots.join(', ')}
                </p>
                <p className="text-gray-600">
                  Price: ${booking.totalPrice}
                </p>
                <p className="text-green-600">Status: Confirmed</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfirmedBookings;