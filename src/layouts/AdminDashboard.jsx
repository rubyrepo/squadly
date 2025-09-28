import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../services/announcementService';
import { userService } from '../services/userService';
import AnnouncementForm from '../components/AnnouncementForm';
import CouponForm from '../components/CouponForm';
import CourtForm from '../components/CourtForm';
import PendingBookings from '../components/PendingBookings';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [courts, setCourts] = useState([]);
  const [showCourtForm, setShowCourtForm] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
    fetchCoupons();
    fetchCourts();
    fetchPendingBookings();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch announcements', 'error');
    }
  };

  const fetchCoupons = async () => {
    try {
      const data = await userService.getCoupons();
      setCoupons(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch coupons', 'error');
    }
  };

  const fetchCourts = async () => {
    try {
      const data = await userService.getCourts();
      setCourts(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch courts', 'error');
    }
  };

  const fetchPendingBookings = async () => {
    try {
      const data = await userService.getPendingBookings();
      setPendingBookings(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch pending bookings', 'error');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedAnnouncement) {
        await updateAnnouncement(selectedAnnouncement._id, formData);
      } else {
        await createAnnouncement(formData);
      }
      await fetchAnnouncements();
      setShowForm(false);
      setSelectedAnnouncement(null);
      Swal.fire('Success', `Announcement ${selectedAnnouncement ? 'updated' : 'created'} successfully`, 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to save announcement', 'error');
    }
  };

  const handleCouponSubmit = async (formData) => {
    try {
      if (selectedCoupon) {
        await userService.updateCoupon(selectedCoupon._id, formData);
        Swal.fire('Success', 'Coupon updated successfully', 'success');
      } else {
        await userService.createCoupon(formData);
        Swal.fire('Success', 'Coupon created successfully', 'success');
      }
      fetchCoupons();
      setShowCouponForm(false);
      setSelectedCoupon(null);
    } catch (error) {
      Swal.fire('Error', 'Failed to save coupon', 'error');
    }
  };

  const handleCourtSubmit = async (formData) => {
    try {
      if (selectedCourt) {
        await userService.updateCourt(selectedCourt._id, formData);
        Swal.fire('Success', 'Court updated successfully', 'success');
      } else {
        await userService.createCourt(formData);
        Swal.fire('Success', 'Court created successfully', 'success');
      }
      fetchCourts();
      setShowCourtForm(false);
      setSelectedCourt(null);
    } catch (error) {
      Swal.fire('Error', 'Failed to save court', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteAnnouncement(id);
          await fetchAnnouncements();
          Swal.fire('Deleted!', 'Announcement has been deleted.', 'success');
        }
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to delete announcement', 'error');
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await userService.deleteCoupon(id);
        await fetchCoupons();
        Swal.fire('Deleted!', 'Coupon has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete coupon', 'error');
    }
  };

  const handleDeleteCourt = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await userService.deleteCourt(id);
        await fetchCourts();
        Swal.fire('Deleted!', 'Court has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete court', 'error');
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      await userService.approveBooking(bookingId);
      await fetchPendingBookings();
      Swal.fire('Success', 'Booking approved successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to approve booking', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
            
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Courts</h2>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
            <p className="text-3xl font-bold text-purple-600">0</p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Manage Users
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
              Manage Courts
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors">
              View Bookings
            </button>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors">
              Generate Reports
            </button>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              New Announcement
            </button>
          </div>

          {showForm && (
            <div className="mb-6">
              <AnnouncementForm
                announcement={selectedAnnouncement}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedAnnouncement(null);
                }}
              />
            </div>
          )}

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <p className="text-gray-600">{announcement.content}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(announcement.date).toLocaleDateString()}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(announcement._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coupons Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Coupons</h2>
            <button
              onClick={() => setShowCouponForm(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              New Coupon
            </button>
          </div>

          {showCouponForm && (
            <div className="mb-6">
              <CouponForm
                coupon={selectedCoupon}
                onSubmit={handleCouponSubmit}
                onCancel={() => {
                  setShowCouponForm(false);
                  setSelectedCoupon(null);
                }}
              />
            </div>
          )}

          <div className="grid gap-4">
            {coupons.map((coupon) => (
              <div key={coupon._id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{coupon.code}</h3>
                    <p className="text-gray-600">Discount: {coupon.discount}%</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCoupon(coupon);
                        setShowCouponForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courts Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Courts</h2>
            <button
              onClick={() => setShowCourtForm(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              New Court
            </button>
          </div>

          {showCourtForm && (
            <div className="mb-6">
              <CourtForm
                court={selectedCourt}
                onSubmit={handleCourtSubmit}
                onCancel={() => {
                  setShowCourtForm(false);
                  setSelectedCourt(null);
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courts.map((court) => (
              <div key={court._id} className="border p-4 rounded-lg">
                <img
                  src={court.imageUrl}
                  alt={court.type}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{court.type}</h3>
                  <p className="text-gray-600">Time Slots: {court.timeSlots}</p>
                  <p className="text-gray-600">Price: ${court.pricePerSession}</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCourt(court);
                        setShowCourtForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourt(court._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Bookings Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Pending Bookings</h2>
          </div>
          <PendingBookings
            bookings={pendingBookings}
            onApprove={handleApproveBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;