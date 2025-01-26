import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Login");
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }
    return () => {
      // Clean up when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/30">
      {isModalOpen ? (
        <form className="relative bg-white p-10 rounded-xl text-slate-500">
          <h1 className="text-center text-2xl text-neutral-700 font-medium">
            {state}
          </h1>
          <p className="text-sm">Welcome back! Please sign in to continue</p>
          {state !== "Login" && (
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-4 ">
              <img
                className="w-8 h-8 opacity-50"
                src={assets.profile_icon}
                alt=""
              />
              <input
                type="text"
                className="outline-none text-sm"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5 ">
            <img className="w-5 h-8" src={assets.email_icon} alt="" />
            <input
              type="email"
              className="outline-none text-sm"
              placeholder="Email id"
              required
            />
          </div>
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 ">
            <img className="w-4 h-8" src={assets.lock_icon} alt="" />
            <input
              type="password"
              className="outline-none text-sm"
              placeholder="Password"
              required
            />
          </div>
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forgot Password?
          </p>
          <button className="bg-blue-600 w-full text-white py-2 rounded-full">
            {state === "Login" ? "login" : "Create Account"}
          </button>
          {state === "Login" ? (
            <p className="text-center mt-5">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p className="text-center mt-5">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </p>
          )}
          <img
            src={assets.cross_icon}
            alt=""
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => setIsModalOpen(false)} // Close modal on cross icon click
          />
        </form>
      ) : (
        <div className="text-center">
          <img
            src={assets.lock_icon}
            alt="Lock Icon"
            className="w-20 h-12 mx-auto"
          />
          <h2 className="text-white text-2xl mt-4">
            You have to login to access imaginAI
          </h2>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-full mt-6"
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
