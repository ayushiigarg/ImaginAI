import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <img src={assets.logo_Photoroom} alt="Logo" width={150} />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        © {new Date().getFullYear()}. All rights reserved. <br />
        Created with ❤️ by{" "}
        <a
          href="https://www.linkedin.com/in/ayushigarg07/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Ayushi Garg
        </a>
      </p>
    </div>
  );
};

export default Footer;
