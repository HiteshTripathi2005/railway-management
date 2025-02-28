import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {
  MdDashboard,
  MdTrain,
  MdPeople,
  MdConfirmationNumber,
  MdLogout,
} from "react-icons/md";
import useAuthStore from "../store/authStore";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { name: "Trains", href: "/trains", icon: MdTrain },
    { name: "Users", href: "/users", icon: MdPeople },
    { name: "Bookings", href: "/bookings", icon: MdConfirmationNumber },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-indigo-600 text-white">
          <h1 className="text-xl font-bold">Railway Admin</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-full hover:bg-indigo-500 lg:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="mt-5 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-2 mt-2 text-gray-700 rounded-lg hover:bg-indigo-100 ${
                location.pathname === item.href ? "bg-indigo-100" : ""
              }`}
            >
              <item.icon className="w-6 h-6 mr-3" />
              {item.name}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 mt-2 text-gray-700 rounded-lg hover:bg-red-100"
          >
            <MdLogout className="w-6 h-6 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300 ease-in-out`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
