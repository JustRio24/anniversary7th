"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaHeart,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isClient, setIsClient] = useState(false);
  const [hearts, setHearts] = useState<Array<{ x: number; size: number }>>([]);

  useEffect(() => {
    setIsClient(true);
    // Generate hearts data only on client side
    const heartsData = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100, // percentage
      size: Math.random() * 20 + 10,
    }));
    setHearts(heartsData);
  }, []);

  return (
    <footer
      ref={ref}
      className="bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 text-white py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Final Quote */}
          <div className="mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <FaHeart className="text-6xl text-pink-300 mx-auto mb-6" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-dancing text-4xl md:text-5xl font-bold text-pink-200 mb-4"
            >
              "To be continued... 💕"
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-purple-200 mb-2"
            >
              Our love story is far from over
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-blue-200 font-dancing"
            >
              Cerita cinta kita masih panjang dan indah...
            </motion.p>
          </div>

          {/* Anniversary Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl mx-auto border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <FaStar className="text-yellow-300 text-2xl mx-auto mb-2" />
                <div className="text-2xl font-bold">08.08.2018</div>
                <div className="text-sm opacity-80">Our Beginning</div>
              </div>
              <div>
                <FaHeart className="text-pink-300 text-2xl mx-auto mb-2" />
                <div className="text-2xl font-bold">7+ Years</div>
                <div className="text-sm opacity-80">And Counting</div>
              </div>
              <div>
                <FaStar className="text-blue-300 text-2xl mx-auto mb-2" />
                <div className="text-2xl font-bold">Forever</div>
                <div className="text-sm opacity-80">To Go</div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center space-x-6 mb-8"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
            >
              <FaInstagram className="text-xl" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
            >
              <FaTwitter className="text-xl" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
            >
              <FaEnvelope className="text-xl" />
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="border-t border-white/20 pt-8"
          >
            <p className="text-purple-200 mb-2">
              Made with ♥ for our 7th Anniversary
            </p>
            <p className="text-sm text-blue-200 opacity-80">
              © 2025 Our Love Story • Built with Next.js & TailwindCSS
            </p>
            <p className="text-xs text-purple-300 opacity-60 mt-2">
              Ready to deploy on Vercel ✨
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Hearts Animation - Only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {hearts.map((heart, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/30"
              initial={{
                opacity: 0,
                scale: 0,
                x: `${heart.x}%`,
                y: "100vh",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: "-100px",
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.5,
                repeatDelay: 5,
              }}
            >
              <FaHeart size={heart.size} />
            </motion.div>
          ))}
        </div>
      )}
    </footer>
  );
};

export default Footer;
