import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    discount: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const data = await userService.getCoupons();
      setCoupons(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch coupons', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCoupon) {
        await userService.updateCoupon(selectedCoupon._id, formData);
      } else {
        await userService.createCoupon(formData);
      }
      await fetchCoupons();
      setShowForm(false);
      setSelectedCoupon(null);
      setFormData({ code: '', discount: '' });
      Swal.fire('Success', `Coupon ${selectedCoupon ? 'updated' : 'created'} successfully`, 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to save coupon', 'error');
    }
  };

  const handleDelete = async (id) => {
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

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Coupons</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Add New Coupon
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
          <div>
            <label className="block text-sm font-medium">Coupon Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Discount (%)</label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
              min="0"
              max="100"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setSelectedCoupon(null);
                setFormData({ code: '', discount: '' });
              }}
              className="px-4 py-2 text-gray-700 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              {selectedCoupon ? 'Update' : 'Create'} Coupon
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{coupon.code}</h3>
                <p>Discount: {coupon.discount}%</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setSelectedCoupon(coupon);
                    setFormData({
                      code: coupon.code,
                      discount: coupon.discount
                    });
                    setShowForm(true);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCoupons;