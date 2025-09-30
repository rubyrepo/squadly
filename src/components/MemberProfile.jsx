import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { User } from 'lucide-react';

const MemberProfile = () => {
  const { user } = useAuth();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const userData = await userService.getUserData(user.email);
        setMemberData(userData);
      } catch (error) {
        console.error('Error fetching member data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
        
        {/* Avatar */}
        <div className="flex-shrink-0">
          {memberData?.photoURL ? (
            <img
              src={memberData.photoURL}
              alt={memberData.name || user.displayName}
              className="w-24 h-24 rounded-full object-cover border-2 border-red-600"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-red-600">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Member Info */}
        <div className="flex-1 grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-gray-800">{memberData?.name || user.displayName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium text-gray-800">
              {memberData?.createdAt ? new Date(memberData.createdAt).toLocaleDateString() : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
