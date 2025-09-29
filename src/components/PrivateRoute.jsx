import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const [isMember, setIsMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMember = async () => {
      if (user) {
        try {
          const memberStatus = await userService.checkMemberStatus(user.email);
          setIsMember(memberStatus);
        } catch (error) {
          console.error('Error checking member status:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    checkMember();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />;
  }

  if (isMember && window.location.pathname.includes('/dashboard')) {
    return <Navigate to="/member/profile" />;
  }

  return children;
};

export default PrivateRoute;