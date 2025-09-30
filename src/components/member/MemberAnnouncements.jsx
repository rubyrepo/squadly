import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';

const MemberAnnouncements = () => {
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
      Swal.fire('Error', 'Failed to fetch announcements', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Announcements</h2>
      {announcements.length === 0 ? (
        <p className="text-gray-600">No announcements available.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{announcement.title}</h3>
              <p className="mt-2 text-gray-600">{announcement.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(announcement.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberAnnouncements;