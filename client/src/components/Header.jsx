import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  // Array of 6 different images
  const images = [
    assets.img1,
    assets.img2,
    assets.img3,
    assets.img4,
    assets.img5,
    assets.img6,
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center my-20">
      <div className="text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500">
        <p>Best Text to Image Generator!</p>
        <img src={assets.star_icon} alt="Star Icon" />
      </div>
      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Generate <span className="text-blue-700">Image</span> from Text in
        Seconds!
      </h1>
      <p className="text-center max-w-xl mx-auto mt-5 text-neutral-500">
        Turn your words into stunning images with our AI tool. Just input text
        and watch it transform into a high-quality, unique visual in seconds.
        Perfect for designers, creators, and anyone exploring new ideas.
      </p>
      <button className="sm:text-lg text-white bg-black w-auto mt-8  px-12 py-2.5 flex items-center gap-2 rounded-full">
        Generate Images{" "}
        <img className="h-6" src={assets.star_group} alt="Star Group" />
      </button>
      <div className="flex flex-wrap justify-center gap-3 mt-16">
        {images.map((src, index) => (
          <img
            className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
            src={src} // Use the image from the array
            alt={``}
            key={index}
            width={70}
          />
        ))}
      </div>
      <p className="mt-2 text-neutral-600">Generated images from ImaginAI</p>
    </div>
  );
};

export default Header;
