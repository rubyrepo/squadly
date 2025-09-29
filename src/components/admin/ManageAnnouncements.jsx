import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await userService.getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch announcements', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const announcementData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        date: new Date()
      };

      if (!announcementData.title || !announcementData.content) {
        Swal.fire('Error', 'Title and content are required', 'error');
        return;
      }

      if (selectedAnnouncement) {
        // Update existing announcement
        await userService.updateAnnouncement(selectedAnnouncement._id, announcementData);
        Swal.fire('Success', 'Announcement updated successfully', 'success');
      } else {
        // Create new announcement
        await userService.createAnnouncement(announcementData);
        Swal.fire('Success', 'Announcement created successfully', 'success');
      }

      await fetchAnnouncements();
      setShowForm(false);
      setSelectedAnnouncement(null);
      setFormData({ title: '', content: '' });
    } catch (error) {
      console.error('Error saving announcement:', error);
      Swal.fire('Error', 'Failed to save announcement', 'error');
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
        await userService.deleteAnnouncement(id);
        await fetchAnnouncements();
        Swal.fire('Deleted!', 'Announcement has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete announcement', 'error');
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Announcements</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Add New Announcement
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setSelectedAnnouncement(null);
                setFormData({ title: '', content: '' });
              }}
              className="px-4 py-2 text-gray-700 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              {selectedAnnouncement ? 'Update' : 'Create'} Announcement
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{announcement.title}</h3>
                <p className="text-gray-600">{announcement.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setSelectedAnnouncement(announcement);
                    setFormData({
                      title: announcement.title,
                      content: announcement.content
                    });
                    setShowForm(true);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(announcement._id)}
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

export default ManageAnnouncements;