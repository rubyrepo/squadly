import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await userService.getMembers();
      setMembers(data);
    } catch {
      Swal.fire("Error", "Failed to fetch members", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will delete all approved bookings for this member!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete!",
      });

      if (result.isConfirmed) {
        await userService.deleteMember(email);
        await fetchMembers();
        Swal.fire("Deleted!", "Member bookings have been deleted.", "success");
      }
    } catch {
      Swal.fire("Error", "Failed to delete member", "error");
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-2xl font-bold">Manage Members</h2>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMembers.length === 0 ? (
          <p className="text-gray-600 text-center col-span-2">No members found</p>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.photoURL || "/default-avatar.png"}
                  alt={member.displayName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{member.displayName}</h3>
                  <p className="text-gray-600">{member.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(member.email)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageMembers;
