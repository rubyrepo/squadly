import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import CourtForm from "../CourtForm";
import Swal from "sweetalert2";

const ManageCourts = () => {
  const [courts, setCourts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const data = await userService.getCourts();
      setCourts(data);
    } catch {
      Swal.fire("Error", "Failed to fetch courts", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCourt) {
        await userService.updateCourt(selectedCourt._id, formData);
      } else {
        await userService.createCourt(formData);
      }
      await fetchCourts();
      setShowForm(false);
      setSelectedCourt(null);
      Swal.fire(
        "Success",
        `Court ${selectedCourt ? "updated" : "created"} successfully`,
        "success"
      );
    } catch {
      Swal.fire("Error", "Failed to save court", "error");
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
        await userService.deleteCourt(id);
        await fetchCourts();
        Swal.fire("Deleted!", "Court has been deleted.", "success");
      }
    } catch {
      Swal.fire("Error", "Failed to delete court", "error");
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
        <h2 className="text-2xl font-bold">Manage Courts</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Add New Court
        </button>
      </div>

      {/* Court Form */}
      {showForm && (
        <div className="bg-white border rounded-xl shadow-md p-6">
          <CourtForm
            court={selectedCourt}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedCourt(null);
            }}
          />
        </div>
      )}

      {/* Court Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courts.length === 0 ? (
          <p className="text-gray-600 text-center col-span-2">
            No courts available
          </p>
        ) : (
          courts.map((court) => (
            <div
              key={court._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={court.imageUrl}
                alt={court.type}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{court.type}</h3>
                <p className="text-gray-600">Price: ${court.pricePerSession}</p>
                <p className="text-gray-600 mt-1">
                  Time Slots: {court.timeSlots.join(", ")}
                </p>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedCourt(court);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(court._id)}
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

export default ManageCourts;
