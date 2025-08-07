"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaHeart, FaStar, FaSmile } from "react-icons/fa";
import Image from "next/image";

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={ref}
      className="py-20 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="font-dancing text-5xl md:text-6xl font-bold text-pink-600 mb-4">
              Tentang Kita
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cerita singkat tentang dua jiwa yang menemukan rumah di satu sama
              lain
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
                <div className="flex items-center space-x-3 mb-6">
                  <FaHeart className="text-pink-500 text-2xl" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Siapa Kami
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami adalah dua jiwa yang bertemu di tengah hiruk pikuk
                  kehidupan, dan menemukan ketenangan dalam pelukan satu sama
                  lain. Sejak 8 Agustus 2018, perjalanan cinta kami dimulai
                  dengan senyuman sederhana yang berubah menjadi tawa bahagia
                  setiap hari.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Dari dua orang asing yang saling mengenal, hingga menjadi dua
                  hati yang berdenyut dalam satu irama. Setiap hari bersama
                  adalah hadiah yang tak ternilai.
                </p>
              </div>

              {/* Characteristics */}
              <div className="grid grid-cols-1 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 border border-pink-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <FaStar className="text-yellow-500 text-xl" />
                    <h4 className="font-semibold text-gray-800">
                      Yang Membuatmu Istimewa
                    </h4>
                  </div>
                  <p className="text-gray-700">
                    Senyummu yang bisa menerangi hari tergelapku, tawamu yang
                    menjadi musik terindah di telingaku, dan caramu memahami
                    tanpa perlu banyak kata.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border border-blue-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <FaSmile className="text-blue-500 text-xl" />
                    <h4 className="font-semibold text-gray-800">
                      Yang Aku Cintai Darimu
                    </h4>
                  </div>
                  <p className="text-gray-700">
                    Ketulusanmu dalam mencintai, kesabaranmu dalam menghadapi
                    tingkahku, dan caramu selalu ada saat aku membutuhkan
                    seseorang untuk bersandar.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Images */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/together.png"
                    alt="Our Happy Moments"
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-dancing text-xl">
                      "Together is our favorite place to be"
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src="/couple-laughing.png"
                    alt="Laughing Together"
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src="/couple-sunset-hands.png"
                    alt="Holding Hands"
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
