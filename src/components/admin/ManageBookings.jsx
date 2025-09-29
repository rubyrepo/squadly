import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';

const ManageBookings = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const data = await userService.getPendingBookings();
      setPendingBookings(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await userService.approveBooking(bookingId);
      await fetchPendingBookings();
      Swal.fire('Success', 'Booking approved', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to approve booking', 'error');
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reject it!'
      });

      if (result.isConfirmed) {
        await userService.rejectBooking(bookingId);
        await fetchPendingBookings();
        Swal.fire('Success', 'Booking rejected successfully', 'success');
      }
    } catch (error) {
      console.error('Error rejecting booking:', error);
      Swal.fire('Error', 'Failed to reject booking', 'error');
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Bookings</h2>
      {pendingBookings.map((booking) => (
        <div key={booking._id} className="border p-4 rounded-lg shadow-sm">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{booking.courtType}</h3>
              <p>User: {booking.userEmail}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Slots: {booking.slots.join(', ')}</p>
              <p>Price: ${booking.totalPrice}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleApprove(booking._id)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(booking._id)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageBookings;