import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import Swal from 'sweetalert2';

const MemberPendingBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingBookings = async () => {
    try {
      const data = await userService.getUserPendingBookings(user.email);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBookings();
  }, [user]);

  const handleCancel = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!'
      });

      if (result.isConfirmed) {
        await userService.cancelBooking(bookingId);
        await fetchPendingBookings();
        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      Swal.fire('Error', 'Failed to cancel booking', 'error');
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pending Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No pending bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{booking.courtType} Court</h3>
                  <p className="text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">Time Slots: {booking.slots.join(', ')}</p>
                  <p className="text-gray-600">Price: ${booking.totalPrice}</p>
                </div>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberPendingBookings;