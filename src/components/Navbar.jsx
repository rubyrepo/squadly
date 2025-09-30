import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User, LogOut, LayoutDashboard, Settings } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const UserProfile = () => (
    <div className="flex items-center">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-1 rounded-full transition duration-150 ease-in-out hover:ring-2 hover:ring-red-500 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {user?.photoURL && !imgError ? (
            <img
              src={user.photoURL}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover shadow-md"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold text-lg shadow-md">
              {user?.username?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
            </div>
          )}
        </button>

        {/* Dropdown Menu with animation */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 z-50 transform transition duration-200 origin-top-right animate-in fade-in zoom-in-95">
            <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
              <p className="font-semibold truncate">{user?.username || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4 text-red-600" />
              Dashboard
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/admin"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings className="w-4 h-4 text-red-600" />
                Admin Panel
              </NavLink>
            )}

            <div className="border-t border-gray-100 my-1"></div>

            <button
              onClick={() => {
                logout();
                setIsDropdownOpen(false);
              }}
              className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courts", label: "Courts" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-2xl tracking-tight"
          >
            <img
              src="/icons8-track-and-field-96.png"
              alt="logo"
              className="h-9 w-9"
            />
            <span className="text-gray-900">Squadly</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-gray-700 text-base font-medium relative group transition-colors duration-200 ${
                    isActive
                      ? "text-red-600"
                      : "hover:text-red-600"
                  }`
                }
              >
                {link.label}
                <span className="absolute left-0 bottom-0 h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <UserProfile />
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-red-600 font-medium transition-colors ${
                      isActive ? "text-red-600" : ""
                    }`
                  }
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-red-600 text-white px-5 py-2.5 rounded-full text-base font-bold shadow-lg shadow-red-300/60 hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300/80"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium transition-colors ${
                  isActive ? "border-l-4 border-red-600 pl-2" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <UserProfile />
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-red-600 font-medium text-center py-2 transition-colors ${
                    isActive ? "text-red-600" : ""
                  }`
                }
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-red-600 text-white px-5 py-2.5 rounded-full text-base font-bold shadow-lg shadow-red-300/60 hover:bg-red-700 transition-all duration-200 focus:outline-none"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
