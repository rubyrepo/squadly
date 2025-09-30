import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { userService } from '../services/userService';
import { User, Mail, Lock, Image } from "lucide-react";
import { FcGoogle } from 'react-icons/fc'; // For colored Google icon
// import { FaGoogle } from 'react-icons/fa'; // For single-color Google icon

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordError(validatePassword(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) return;
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photoURL || null
      });

      const userData = {
        uid: userCredential.user.uid,
        email: formData.email,
        name: formData.name,
        photoURL: formData.photoURL || null,
        role: 'user',
        createdAt: new Date().toISOString(),
        provider: 'email'
      };

      await userService.register(userData);

      login({
        username: formData.name,
        email: formData.email,
        uid: userCredential.user.uid,
        photoURL: formData.photoURL
      });

      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/');
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Failed to create account'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        role: 'user',
        createdAt: new Date().toISOString(),
        provider: 'google'
      };

      await userService.register(userData);

      login({
        username: user.displayName || user.email.split("@")[0],
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL
      });

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Failed to register with Google!"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-red-500">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="flex-1 outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-red-500">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="flex-1 outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-red-500">
            <Image className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="url"
              name="photoURL"
              placeholder="Photo URL (optional)"
              value={formData.photoURL}
              onChange={handleChange}
              className="flex-1 outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 border-gray-300">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="flex-1 outline-none"
            />
          </div>
          {passwordError && <span className="text-red-500 text-sm mt-1">{passwordError}</span>}

          <button
            type="submit"
            disabled={loading || !!passwordError}
            className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition flex justify-center items-center"
          >
            {loading ? (
              <div className="animate-spin border-4 border-white border-t-transparent h-5 w-5 rounded-full"></div>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="my-4 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={handleGoogleRegister}
          className="w-full px-4 py-2 border border-gray-300 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition font-medium"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
