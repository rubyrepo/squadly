import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import Swal from 'sweetalert2';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await userService.getMembers();
      setMembers(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch members', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This will delete all approved bookings for this member!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete!'
      });

      if (result.isConfirmed) {
        await userService.deleteMember(email);
        await fetchMembers();
        Swal.fire('Deleted!', 'Member bookings have been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete member', 'error');
    }
  };

  const filteredMembers = members.filter(member => 
    member.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Members</h2>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <div key={member._id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center space-x-4">
                <img
                  src={member.photoURL || '/default-avatar.png'}
                  alt={member.displayName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{member.displayName}</h3>
                  <p className="text-gray-600">{member.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(member.email)}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Delete Member
            </button>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <p className="text-center text-gray-600">No members found</p>
        )}
      </div>
    </div>
  );
};

export default ManageMembers;