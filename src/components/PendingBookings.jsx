import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import Swal from 'sweetalert2';

const PendingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const data = await userService.getPendingBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to fetch pending bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await userService.approveBooking(bookingId);
      await fetchPendingBookings();
      Swal.fire('Success', 'Booking approved successfully', 'success');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to approve booking', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pending Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="border p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p><strong>Court:</strong> {booking.courtType}</p>
              <p><strong>User:</strong> {booking.userEmail}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Slots:</strong> {booking.slots.join(', ')}</p>
              <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
            </div>
            <button
              onClick={() => handleApprove(booking._id)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        </div>
      ))}
      {bookings.length === 0 && (
        <p className="text-gray-600">No pending bookings</p>
      )}
    </div>
  );
};

export default PendingBookings;