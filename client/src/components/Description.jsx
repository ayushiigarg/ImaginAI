import React from "react";
import { assets } from "../assets/assets";

const Button = ({ children }) => {
  return (
    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
      {children}
    </button>
  );
};

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imaginations into visuals</p>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center justify-center">
        <img
          src={assets.img2}
          alt="AI-generated image preview"
          className="w-80 xl:w-96 rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the Most Advanced AI Image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            With ImaginAI, simply describe your idea and let our AI generate
            stunning images in seconds. Whether you're a designer, marketer, or
            content creator, ImaginAI makes it effortless to bring your vision
            to life.
          </p>
          <p className="text-gray-600 mb-4">
            ImaginAI is the fastest and most advanced image generator available.
            Get high-quality, customized visuals in just moments—perfect for any
            creative project.
          </p>
          <h3 className="text-2xl font-medium text-gray-800 mb-3">
            Key Features:
          </h3>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Generate images instantly from any text prompt.</li>
            <li>High-quality, detailed visuals.</li>
            <li>Customizable to fit your exact needs.</li>
            <li>Choose from a variety of styles.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Description;
