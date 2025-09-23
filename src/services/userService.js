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
  }
};