import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';
import { Search } from 'lucide-react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800">All Users</h2>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <img
              src={user.photoURL || '/default-avatar.png'}
              alt={user.displayName}
              className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-red-100 shadow"
            />
            <h3 className="text-lg font-semibold text-gray-800">{user.displayName}</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="col-span-full text-center text-gray-600 italic">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
