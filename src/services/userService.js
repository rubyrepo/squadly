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
      const data = await response.json();
      return data;
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
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }
  }
};