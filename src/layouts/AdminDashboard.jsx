import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../services/announcementService';
import { userService } from '../services/userService';
import AnnouncementForm from '../components/AnnouncementForm';
import CouponForm from '../components/CouponForm';
import CourtForm from '../components/CourtForm';
import PendingBookings from '../components/PendingBookings';
import Swal from 'sweetalert2';
import { Link, Outlet } from 'react-router';

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
      console.error('Error fetching pending bookings:', error);
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
      const result = await Swal.fire({
        title: 'Confirm Approval',
        text: 'Are you sure you want to approve this booking?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it!'
      });

      if (result.isConfirmed) {
        await userService.approveBooking(bookingId);
        await fetchPendingBookings(); // Refresh the list
        Swal.fire('Success', 'Booking has been approved', 'success');
      }
    } catch (error) {
      console.error('Error approving booking:', error);
      Swal.fire('Error', 'Failed to approve booking', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
            <nav className="space-y-2">
              <Link 
                to="/admin/profile" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link 
                to="/admin/bookings" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Bookings
              </Link>
              <Link 
                to="/admin/courts" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Courts
              </Link>
              <Link 
                to="/admin/coupons" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Coupons
              </Link>
              <Link 
                to="/admin/announcements" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Announcements
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;