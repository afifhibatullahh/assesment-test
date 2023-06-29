import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../guards/ProtectedRoutes";
import { DashboardPage, LoginPage, RegisterPage } from "../views";
import AuthProvider from "../context/authContext";
import ProtectedAuth from "../guards/ProtectedAuth";
import Navbar from "../components/Navbar";

const AuthLayout = () => (
  <AuthProvider>
    <Navbar />
    <Outlet />
  </AuthProvider>
);

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: (
          <ProtectedAuth>
            <Outlet />
          </ProtectedAuth>
        ),
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
