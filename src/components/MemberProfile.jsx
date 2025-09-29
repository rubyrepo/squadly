import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';

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
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{user.displayName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="font-medium">
              {new Date(memberData?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;