import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 border-b pb-2 mb-6">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-32 h-32 rounded-full object-cover border-2 border-red-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
              <span className="text-4xl font-bold text-gray-500">
                {user?.displayName?.[0]?.toUpperCase() ||
                  user?.email?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {user?.displayName || "Not provided"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <p className="mt-1 text-lg font-medium text-gray-800">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Member Since
            </label>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
