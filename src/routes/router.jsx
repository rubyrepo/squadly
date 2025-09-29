import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import UserDashboard from "../layouts/UserDashboard";
import AdminDashboard from "../layouts/AdminDashboard";
import Profile from "../pages/Profile";
import Courts from "../pages/Courts";
import Announcements from '../components/Announcements';
import MemberDashboard from '../layouts/MemberDashboard';
import MemberProfile from '../components/MemberProfile';
import MemberPendingBookings from '../components/MemberPendingBookings';
import PendingBookings from '../components/PendingBookings';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "announcements",
            element: <Announcements />
          },
          {
            path: "pending-bookings",
            element: <PendingBookings />
          }
        ]
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "courts",
        element: <Courts />
      },
      {
        path: "member",
        element: <PrivateRoute><MemberDashboard /></PrivateRoute>,
        children: [
          {
            path: "profile",
            element: <MemberProfile />
          },
          {
            path: "pending-bookings",
            element: <MemberPendingBookings />
          }
        ]
      }
    ]
  }
]);