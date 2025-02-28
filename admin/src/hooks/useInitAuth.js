import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export const useInitAuth = () => {
  const navigate = useNavigate();
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const success = await checkAuth();
      if (!success && window.location.pathname !== "/login") {
        navigate("/login");
      }
    };

    initAuth();
  }, [checkAuth, navigate]);

  return { isAuthenticated };
};
