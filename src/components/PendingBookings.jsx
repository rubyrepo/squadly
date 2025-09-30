import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import Swal from 'sweetalert2';
import { XCircle } from 'lucide-react';

const PendingBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingBookings = async () => {
    try {
      const data = await userService.getUserPendingBookings(user.email);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Swal.fire('Error', 'Failed to fetch bookings', 'error');
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
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Pending Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no pending bookings.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start gap-4"
            >
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{booking.courtType} Court</h3>
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Time Slots:</span> {booking.slots.join(', ')}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Total Price:</span> ${booking.totalPrice}
                </p>
                <p className="text-yellow-600 font-medium">Status: Pending Approval</p>
              </div>

              <button
                onClick={() => handleCancel(booking._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                <XCircle className="w-5 h-5" /> Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBookings;
