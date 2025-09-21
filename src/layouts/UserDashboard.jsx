import { Link, Outlet } from 'react-router';

const UserDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <nav className="space-y-2">
              <Link 
                to="/dashboard/profile" 
                className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                My Profile
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

export default UserDashboard;