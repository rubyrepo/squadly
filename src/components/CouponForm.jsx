import React, { useState, useEffect } from 'react';

const CouponForm = ({ coupon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    code: '',
    discount: ''
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || '',
        discount: coupon.discount || ''
      });
    }
  }, [coupon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          required
          min="0"
          max="100"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
        >
          {coupon ? 'Update' : 'Create'} Coupon
        </button>
      </div>
    </form>
  );
};

export default CouponForm;