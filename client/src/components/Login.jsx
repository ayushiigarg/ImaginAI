import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Login");
  const {
    setShowLogin,
    backendUrl,
    setToken,
    setUser,
    showResetPassword,
    setShowResetPassword,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false); // added loading state

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [state]);

  useEffect(() => {
    setResetEmail("");
  }, [showResetPassword]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        { email: resetEmail }
      );
      toast.success(data.message || "Reset link sent to your email.");
      setShowResetPassword(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.token) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          navigate("/"); // Redirect to home
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.token) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          navigate("/"); // Redirect to home
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={showResetPassword ? handleForgotPassword : onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {showResetPassword ? "Forgot Password" : state}
        </h1>

        <p className="text-sm">
          {showResetPassword
            ? "Enter your email to receive a password reset link."
            : state === "Login"
            ? "Welcome back! Please sign in to continue."
            : "Create an account to get started."}
        </p>

        {showResetPassword ? (
          <>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
              <img className="w-5 h-8" src={assets.email_icon} alt="Email" />
              <input
                type="email"
                className="outline-none text-sm"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 w-full text-white py-2 rounded-full mt-4"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Sending Link...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <p
              className="text-sm text-red-600 cursor-pointer text-center mt-2"
              onClick={() => setShowResetPassword(false)}
            >
              Cancel
            </p>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-4">
                <img
                  className="w-8 h-8 opacity-50"
                  src={assets.profile_icon}
                  alt="Profile"
                />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="outline-none text-sm"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}

            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
              <img className="w-5 h-8" src={assets.email_icon} alt="Email" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="outline-none text-sm"
                placeholder="Email id"
                required
              />
            </div>

            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
              <img className="w-4 h-8" src={assets.lock_icon} alt="Password" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="outline-none text-sm"
                placeholder="Password"
                required
              />
            </div>

            <p
              className="text-sm text-blue-600 my-4 cursor-pointer"
              onClick={() => setShowResetPassword(true)}
            >
              Forgot Password?
            </p>

            <button className="bg-blue-600 w-full text-white py-2 rounded-full">
              {state === "Login" ? "Login" : "Create Account"}
            </button>

            <p className="mt-5 text-center">
              {state === "Login" ? (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setState("Sign Up")}
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setState("Login")}
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </>
        )}

        <img
          onClick={() =>
            location.pathname === "/login" ? navigate("/") : setShowLogin(false)
          }
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
