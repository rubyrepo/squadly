import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { Users, UserCheck, Building2 } from 'lucide-react';

const AdminProfile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCourts: 0,
    totalUsers: 0,
    totalMembers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await userService.getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
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
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Profile Section */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-lg p-8 flex items-center gap-8">
        <img
          src={user.photoURL || '/default-avatar.png'}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
        />

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">Admin Profile</h2>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold">{user.displayName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Courts */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
          <Building2 className="w-10 h-10 text-red-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">Total Courts</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalCourts}</p>
        </div>

        {/* Users */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
          <Users className="w-10 h-10 text-red-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalUsers}</p>
        </div>

        {/* Members */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
          <UserCheck className="w-10 h-10 text-red-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">Total Members</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalMembers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
