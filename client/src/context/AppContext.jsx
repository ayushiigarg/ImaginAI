import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false); // Added state
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const loadCreditsData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(backendUrl + "/api/user/credits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API response:", response.data);
      setCredit(response.data.credits);
      setUser({ name: response.data.name });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token"); // Clear token
        window.location.href = "/login"; // Redirect to login
      } else {
        console.error("Error loading data:", error);
      }
    }
  };
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Full API Response:", data);

      if (data?.resultImage) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();

        // Directly navigate if credits are insufficient
        if (data.message === "Insufficient Credits") {
          navigate("/buy-credits");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error response:", error.response?.data);

      // Handle insufficient credits in case of an API error
      if (error.response?.data?.message === "Insufficient Credits") {
        navigate("/buy-credits");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    showResetPassword, // Added to context
    setShowResetPassword,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
