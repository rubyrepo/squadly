const BASE_URL = 'http://localhost:5000';

export const userService = {
  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('UserService register error:', error);
      throw error;
    }
  },

  // Coupon Services
  getCoupons: async () => {
    try {
      const response = await fetch(`${BASE_URL}/coupons`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw error;
    }
  },

  createCoupon: async (couponData) => {
    try {
      const response = await fetch(`${BASE_URL}/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }
  },

  updateCoupon: async (id, couponData) => {
    try {
      const response = await fetch(`${BASE_URL}/coupons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating coupon:', error);
      throw error;
    }
  },

  deleteCoupon: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/coupons/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting coupon:', error);
      throw error;
    }
  },

  // Court Services
  getCourts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/courts`);
      if (!response.ok) throw new Error('Failed to fetch courts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching courts:', error);
      throw error;
    }
  },

  createCourt: async (courtData) => {
    try {
      const response = await fetch(`${BASE_URL}/courts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courtData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating court:', error);
      throw error;
    }
  },

  updateCourt: async (id, courtData) => {
    try {
      const response = await fetch(`${BASE_URL}/courts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courtData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating court:', error);
      throw error;
    }
  },

  deleteCourt: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/courts/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting court:', error);
      throw error;
    }
  },

  // Announcement Services
  getAnnouncements: async () => {
    try {
      const response = await fetch(`${BASE_URL}/announcements`);
      if (!response.ok) throw new Error('Failed to fetch announcements');
      return await response.json();
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }
  },

  createAnnouncement: async (announcementData) => {
    try {
      const response = await fetch(`${BASE_URL}/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(announcementData)
      });
      if (!response.ok) throw new Error('Failed to create announcement');
      return await response.json();
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    }
  },

  deleteAnnouncement: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/announcements/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete announcement');
      return await response.json();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      throw error;
    }
  },

  updateAnnouncement: async (id, announcementData) => {
    try {
      const response = await fetch(`${BASE_URL}/announcements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(announcementData)
      });
      if (!response.ok) throw new Error('Failed to update announcement');
      return await response.json();
    } catch (error) {
      console.error('Error updating announcement:', error);
      throw error;
    }
  },

  // Booking Services
  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });
      if (!response.ok) throw new Error('Failed to create booking');
      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  getPendingBookings: async () => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/pending`);
      if (!response.ok) {
        throw new Error('Failed to fetch pending bookings');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching pending bookings:', error);
      throw error;
    }
  },

  approveBooking: async (bookingId) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${bookingId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to approve booking');
      }
      return await response.json();
    } catch (error) {
      console.error('Error approving booking:', error);
      throw error;
    }
  },

  rejectBooking: async (bookingId) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${bookingId}/reject`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to reject booking');
      }
      return await response.json();
    } catch (error) {
      console.error('Error rejecting booking:', error);
      throw error;
    }
  },

  // User Services
  getUserData: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${email}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  getUserPendingBookings: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/pending/${email}`);
      if (!response.ok) throw new Error('Failed to fetch pending bookings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching pending bookings:', error);
      throw error;
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to cancel booking');
      return await response.json();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

  checkMemberStatus: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/approved/${email}`);
      if (!response.ok) throw new Error('Failed to check member status');
      const approvedBookings = await response.json();
      return approvedBookings.length > 0;
    } catch (error) {
      console.error('Error checking member status:', error);
      throw error;
    }
  },

  getAdminStats: async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/stats`);
      if (!response.ok) throw new Error('Failed to fetch admin stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  }
};