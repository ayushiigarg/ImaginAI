import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

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
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center my-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <p>Best Text to Image Generator!</p>
        <img src={assets.star_icon} alt="Star Icon" />
      </motion.div>

      <motion.h1
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
      >
        Generate <span className="text-blue-700">Image</span> from Text in
        Seconds!
      </motion.h1>

      <motion.p
        className="text-center max-w-xl mx-auto mt-5 text-neutral-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        Turn your words into stunning images with our AI tool. Just input text
        and watch it transform into a high-quality, unique visual in seconds.
      </motion.p>

      <motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      >
        Generate Images{" "}
        <img className="h-6" src={assets.star_group} alt="Star Group" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        className="flex flex-wrap justify-center gap-3 mt-16"
      >
        {images.map((src, index) => (
          <motion.img
            whileHover={{ scale: 1.05 }}
            className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
            src={src}
            alt=""
            key={index}
            width={70}
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        className="mt-2 text-neutral-600"
      >
        Generated images from ImaginAI
      </motion.p>
    </motion.div>
  );
};

export default Header;
