import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const AdminProfile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCourts: 0,
    totalUsers: 0,
    totalMembers: 0
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
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      
      <div className="flex items-start space-x-6">
        <img 
          src={user.photoURL || '/default-avatar.png'} 
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover"
        />
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Name</h3>
            <p className="text-gray-600">{user.displayName}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900">Total Courts</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalCourts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900">Total Users</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900">Total Members</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalMembers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;