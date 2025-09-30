import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Payment = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const [couponCode, setCouponCode] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(booking?.totalPrice);

  // Redirect if no booking data
  if (!booking) {
    navigate('/member/approved-bookings');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        bookingId: booking._id,
        amount: discountedPrice,
        couponCode: couponCode || null,
        userEmail: user.email,  // Add user email
        date: new Date()
      };

      await userService.processPayment(paymentData);
      
      await Swal.fire({
        title: 'Success!',
        text: 'Payment processed successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate('/member/payment-history', { replace: true });
    } catch (error) {
      Swal.fire('Error', 'Payment failed', 'error');
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const result = await userService.validateCoupon(couponCode);
      if (result.valid) {
        const discount = (booking.totalPrice * result.discount) / 100;
        setDiscountedPrice(booking.totalPrice - discount);
        Swal.fire('Success', 'Coupon applied successfully!', 'success');
      } else {
        Swal.fire('Error', 'Invalid coupon code', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to apply coupon', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Payment Details</h2>

      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Apply
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={booking.userEmail}
            readOnly
            className="mt-1 block w-full p-2 border rounded bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Court Type</label>
          <input
            type="text"
            value={booking.courtType}
            readOnly
            className="mt-1 block w-full p-2 border rounded bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time Slots</label>
          <input
            type="text"
            value={booking.slots.join(', ')}
            readOnly
            className="mt-1 block w-full p-2 border rounded bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            value={new Date(booking.date).toLocaleDateString()}
            readOnly
            className="mt-1 block w-full p-2 border rounded bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            value={`$${discountedPrice}`}
            readOnly
            className="mt-1 block w-full p-2 border rounded bg-gray-50"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;