import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const resetForm = () => {
    setShowForm(false);
    setSelectedAnnouncement(null);
    setFormData({ title: "", content: "" });
  };

  const fetchAnnouncements = async () => {
    try {
      const data = await userService.getAnnouncements();
      setAnnouncements(data);
    } catch {
      Swal.fire("Error", "Failed to fetch announcements", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const announcementData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      date: new Date(),
    };

    if (!announcementData.title || !announcementData.content) {
      Swal.fire("Error", "Title and content are required", "error");
      return;
    }

    try {
      if (selectedAnnouncement) {
        await userService.updateAnnouncement(selectedAnnouncement._id, announcementData);
        Swal.fire("Success", "Announcement updated successfully", "success");
      } else {
        await userService.createAnnouncement(announcementData);
        Swal.fire("Success", "Announcement created successfully", "success");
      }

      await fetchAnnouncements();
      resetForm();
    } catch (error) {
      console.error("Error saving announcement:", error);
      Swal.fire("Error", "Failed to save announcement", "error");
    }
  };

  const handleDelete = async (id) => {
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
      try {
        await userService.deleteAnnouncement(id);
        await fetchAnnouncements();
        Swal.fire("Deleted!", "Announcement has been deleted.", "success");
      } catch {
        Swal.fire("Error", "Failed to delete announcement", "error");
      }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Announcements</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Add New
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 border rounded-lg shadow bg-gray-50"
        >
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              {selectedAnnouncement ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 && (
          <p className="text-gray-600 text-center">No announcements yet.</p>
        )}
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{announcement.title}</h3>
                <p className="text-gray-600">{announcement.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => {
                    setSelectedAnnouncement(announcement);
                    setFormData({
                      title: announcement.title,
                      content: announcement.content,
                    });
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(announcement._id)}
                  className="text-red-600 hover:underline"
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
