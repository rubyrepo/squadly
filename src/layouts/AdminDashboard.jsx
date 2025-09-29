import React from 'react';
import { Link, Outlet } from 'react-router';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
            <nav className="space-y-2">
              <Link 
                to="/admin/profile" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link 
                to="/admin/bookings" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Bookings
              </Link>
              <Link 
                to="/admin/courts" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Courts
              </Link>
              <Link 
                to="/admin/coupons" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Coupons
              </Link>
              <Link 
                to="/admin/announcements" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Announcements
              </Link>
              <Link 
                to="/admin/members" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                Manage Members
              </Link>
              <Link 
                to="/admin/users" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                All Users
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
