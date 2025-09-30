import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { User, Clock, CheckCircle, DollarSign, Megaphone } from 'lucide-react';

const MemberDashboard = () => {
  const location = useLocation();

  const links = [
    { path: "/member/profile", label: "My Profile", icon: <User size={18} /> },
    { path: "/member/pending-bookings", label: "Pending Bookings", icon: <Clock size={18} /> },
    { path: "/member/approved-bookings", label: "Approved Bookings", icon: <CheckCircle size={18} /> },
    { path: "/member/confirmed-bookings", label: "Confirmed Bookings", icon: <CheckCircle size={18} /> },
    { path: "/member/payment-history", label: "Payment History", icon: <DollarSign size={18} /> },
    { path: "/member/announcements", label: "Announcements", icon: <Megaphone size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Member Dashboard</h2>
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
          <div className="bg-white rounded-2xl shadow-md p-8 min-h-[400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;
