import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../services/announcementService';
import AnnouncementForm from '../components/AnnouncementForm';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch announcements', 'error');
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
      </div>
    </div>
  );
};

export default AdminDashboard;