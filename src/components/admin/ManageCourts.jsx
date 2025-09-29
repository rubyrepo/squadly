import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import CourtForm from '../CourtForm';
import Swal from 'sweetalert2';

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
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch courts', 'error');
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
      Swal.fire('Success', `Court ${selectedCourt ? 'updated' : 'created'} successfully`, 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to save court', 'error');
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
        await userService.deleteCourt(id);
        await fetchCourts();
        Swal.fire('Deleted!', 'Court has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete court', 'error');
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Courts</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Add New Court
        </button>
      </div>

      {showForm && (
        <CourtForm
          court={selectedCourt}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedCourt(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courts.map((court) => (
          <div key={court._id} className="border p-4 rounded-lg shadow-sm">
            <img
              src={court.imageUrl}
              alt={court.type}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div>
              <h3 className="font-semibold">{court.type}</h3>
              <p>Price: ${court.pricePerSession}</p>
              <p>Time Slots: {court.timeSlots.join(', ')}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => {
                    setSelectedCourt(court);
                    setShowForm(true);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(court._id)}
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

export default ManageCourts;