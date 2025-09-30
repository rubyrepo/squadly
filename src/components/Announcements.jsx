import React, { useState, useEffect } from "react";
import { userService } from "../services/userService";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await userService.getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 border-b pb-2 mb-4">
        Announcements
      </h2>

      {/* Announcement List */}
      {announcements.length === 0 ? (
        <p className="text-gray-600 text-center">No announcements available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 mt-2">{announcement.content}</p>
              </div>
              <p className="text-sm text-gray-500 mt-4 self-end">
                {new Date(announcement.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
