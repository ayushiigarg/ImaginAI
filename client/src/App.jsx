import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import BuyCredits from "./pages/BuyCredits";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword"; // Import ResetPassword Component
import { AppContext } from "./context/AppContext";

const App = () => {
  const { showLogin, showResetPassword } = useContext(AppContext); // Check if reset password should be shown
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-10 md:px-14 lg:px-28 bg-gradient-to-b from-teal-50 to-blue-50">
      <ToastContainer position="bottom-right" />
      <Navbar />
      <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
        {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-credits" element={<BuyCredits />} />
          <Route path="/result" element={<Result />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
