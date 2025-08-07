"use client";

import { motion } from "framer-motion";
import { FaHeart, FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    // Set window size after component mounts
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              repeatDelay: 2,
            }}
          >
            <FaHeart size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <div className="container mt-16 mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Couple Photo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-8 border-pink-200 shadow-2xl">
              <Image
                src="/main-hero.png"
                alt="Our Love Story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-dancing text-6xl md:text-8xl font-bold text-pink-600 mb-4"
          >
            Our Love Story
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-2xl md:text-3xl text-gray-700 mb-2 font-light">
              Every moment with you is a memory in bloom
            </p>
            <p className="text-xl md:text-2xl text-gray-600 font-dancing">
              Kamu adalah rumah dari semua rasa rindu yang aku punya
            </p>
          </motion.div>

          {/* Anniversary Date */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-pink-100"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <FaHeart className="text-pink-500 text-2xl" />
              <span className="text-gray-600 text-lg">Since</span>
              <FaHeart className="text-pink-500 text-2xl" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-pink-600 font-dancing">
              08 • 08 • 2018
            </div>
            <p className="text-gray-600 mt-2 text-lg">
              Since 2018, it's been you and only you
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToNext}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Mulai Perjalanan</span>
            <FaArrowDown className="animate-bounce" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-pink-400"
        >
          <FaArrowDown size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
