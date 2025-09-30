import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [formData, setFormData] = useState({ code: "", discount: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const data = await userService.getCoupons();
      setCoupons(data);
    } catch {
      Swal.fire("Error", "Failed to fetch coupons", "error");
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
      setFormData({ code: "", discount: "" });
      Swal.fire(
        "Success",
        `Coupon ${selectedCoupon ? "updated" : "created"} successfully`,
        "success"
      );
    } catch {
      Swal.fire("Error", "Failed to save coupon", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await userService.deleteCoupon(id);
        await fetchCoupons();
        Swal.fire("Deleted!", "Coupon has been deleted.", "success");
      }
    } catch {
      Swal.fire("Error", "Failed to delete coupon", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Coupons</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Add New Coupon
        </button>
      </div>

      {/* Coupon Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 bg-white border rounded-xl shadow-md"
        >
          <h3 className="text-lg font-semibold mb-2">
            {selectedCoupon ? "Update Coupon" : "Create Coupon"}
          </h3>
          <div>
            <label className="block text-sm font-medium">Coupon Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Discount (%)</label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
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
                setFormData({ code: "", discount: "" });
              }}
              className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              {selectedCoupon ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}

      {/* Coupon List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.length === 0 ? (
          <p className="text-gray-600 text-center col-span-2">
            No coupons available
          </p>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white border p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{coupon.code}</h3>
                  <p className="text-gray-600">Discount: {coupon.discount}%</p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => {
                      setSelectedCoupon(coupon);
                      setFormData({
                        code: coupon.code,
                        discount: coupon.discount,
                      });
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageCoupons;
