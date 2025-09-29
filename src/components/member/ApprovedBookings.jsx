import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';

const ApprovedBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedBookings();
  }, [user]);

  const fetchApprovedBookings = async () => {
    try {
      const data = await userService.getApprovedBookings(user.email);
      setBookings(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

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
        await fetchApprovedBookings();
        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to cancel booking', 'error');
    }
  };

  const handlePayment = (booking) => {
    navigate('/member/payment', { state: { booking } });
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
      <h2 className="text-2xl font-bold">Approved Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No approved bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
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
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handlePayment(booking)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Pay Now
                  </button>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedBookings;