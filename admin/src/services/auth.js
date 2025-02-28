import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add response interceptor to handle errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page on unauthorized access
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  try {
    const response = await axios.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    await axios.get("/api/auth/logout");
    window.location.href = "/login";
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/api/auth/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
