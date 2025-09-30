import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import {
  User,
  ClipboardList,
  LayoutGrid,
  Tag,
  Megaphone,
  Users,
  Users2
} from 'lucide-react';

const AdminDashboard = () => {
  const location = useLocation();

  const links = [
    { path: "/admin/profile", label: "Profile", icon: <User size={18} /> },
    { path: "/admin/bookings", label: "Manage Bookings", icon: <ClipboardList size={18} /> },
    { path: "/admin/courts", label: "Manage Courts", icon: <LayoutGrid size={18} /> },
    { path: "/admin/coupons", label: "Manage Coupons", icon: <Tag size={18} /> },
    { path: "/admin/announcements", label: "Manage Announcements", icon: <Megaphone size={18} /> },
    { path: "/admin/members", label: "Manage Members", icon: <Users size={18} /> },
    { path: "/admin/users", label: "All Users", icon: <Users2 size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
            <nav className="space-y-2">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition
                    ${location.pathname === link.path 
                      ? "bg-red-600 text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">
          <div className="bg-white rounded-2xl shadow-md p-8 min-h-[500px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
