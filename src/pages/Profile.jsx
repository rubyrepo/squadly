import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
      
      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center space-x-4">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500">
                {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <p className="mt-1 text-lg">{user?.displayName || 'Not provided'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-lg">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Member Since</label>
            <p className="mt-1 text-lg">
              {user?.metadata?.creationTime 
                ? new Date(user.metadata.creationTime).toLocaleDateString() 
                : 'Not available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;