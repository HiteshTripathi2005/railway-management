import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

// Add axios interceptors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on 401 Unauthorized
      useAuthStore.getState().resetAuth();
      // Clear all cookies
      clearAllCookies();
      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Utility function to clear all cookies
const clearAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
};

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  resetAuth: () => {
    clearAllCookies();
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const { user } = response.data;

      if (user.role !== "admin") {
        throw new Error(
          "Unauthorized. Only admin users can access this panel."
        );
      }

      set({ user, isAuthenticated: true, isLoading: false });
      toast.success("Login successful!");
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.get("/api/auth/logout");
      clearAllCookies(); // Clear all cookies
      set({ user: null, isAuthenticated: false, isLoading: false });
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      set({ isLoading: false });
      // Still clear auth state, cookies and redirect on logout failure
      clearAllCookies();
      set({ user: null, isAuthenticated: false });
      window.location.href = "/login";
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/auth/me");

      const { data: user } = response.data;
      console.log(user);
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized access");
      }

      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      clearAllCookies(); // Clear cookies on auth check failure
      set({ user: null, isAuthenticated: false, isLoading: false });
      return false;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/api/auth/register", {
        ...userData,
        role: "admin",
      });
      const { user } = response.data;
      set({ user, isAuthenticated: true, isLoading: false });

      toast.success("Admin registration successful!");
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return false;
    }
  },
}));

export default useAuthStore;
