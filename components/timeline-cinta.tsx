"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaHeart, FaCalendarAlt, FaStar, FaGift } from "react-icons/fa";

const TimelineCinta = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const timelineData = [
    {
      year: "2018",
      title: "Awal Mula Segalanya",
      description:
        "Tanggal 8 Agustus 2018, hari dimana dua hati mulai berdenyut dalam satu irama. Permulaan yang mengubah segalanya.",
      icon: FaHeart,
      color: "pink",
    },
    {
      year: "2019",
      title: "Tahun Pertama Kebahagiaan",
      description:
        "Satu tahun berlalu dengan penuh tawa, air mata bahagia, dan kenangan indah yang tak terlupakan.",
      icon: FaStar,
      color: "purple",
    },
    {
      year: "2020",
      title: "Melewati Badai",
      description:
        "Tahun yang menantang, tapi kita buktikan bahwa cinta sejati bisa melewati segala rintangan dan menemukan jalan.",
      icon: FaCalendarAlt,
      color: "blue",
    },
    {
      year: "2021",
      title: "Mencari Jalan",
      description:
        "Tahun dimana cinta mencoba kembali menemukan jalannya untuk bersama. Cinta yang tak pernah pudar, meski harus melewati berbagai rintangan.",
      icon: FaGift,
      color: "green",
    },
    {
      year: "2022",
      title: "Mimpi-Mimpi Bersama",
      description:
        "Mulai merencanakan masa depan bersama. Setiap mimpi terasa lebih indah ketika dibayangkan bersama.",
      icon: FaHeart,
      color: "pink",
    },
    {
      year: "2023",
      title: "Cinta yang Semakin Dalam",
      description:
        "Lima tahun berlalu, tapi rasanya seperti baru kemarin. Cinta kita semakin dalam dan bermakna setiap harinya.",
      icon: FaStar,
      color: "purple",
    },
    {
      year: "2024",
      title: "Enam Tahun Kebahagiaan",
      description:
        "Memasuki tahun keenam dengan penuh syukur. Setiap detik bersamamu adalah berkah yang tak ternilai harganya.",
      icon: FaCalendarAlt,
      color: "blue",
    },
    {
      year: "2025",
      title: "Melangkah ke Masa Depan",
      description:
        "Tujuh tahun perjalanan cinta kita. Siap melangkah ke babak baru dengan penuh harapan dan cinta yang tak terbatas.",
      icon: FaGift,
      color: "green",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      pink: "bg-pink-500 border-pink-200 text-pink-600",
      purple: "bg-purple-500 border-purple-200 text-purple-600",
      blue: "bg-blue-500 border-blue-200 text-blue-600",
      green: "bg-green-500 border-green-200 text-green-600",
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

  return (
    <div
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl font-bold text-purple-600 mb-4">
            Timeline Cinta Kita
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Perjalanan indah dari 2018 hingga sekarang, setiap tahun adalah bab
            baru dalam cerita cinta kita
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: isEven ? -100 : 100 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    isEven ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-5/12 ${
                      isEven ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100"
                    >
                      <div
                        className={`flex items-center space-x-3 mb-4 ${
                          isEven ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-full ${getColorClasses(
                            item.color
                          )
                            .replace("text-", "bg-")
                            .replace("-600", "-100")}`}
                        >
                          <Icon
                            className={`text-xl ${
                              getColorClasses(item.color).split(" ")[2]
                            }`}
                          />
                        </div>
                        <span className="text-3xl font-bold font-dancing text-gray-800">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-pink-400 shadow-lg z-10"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 max-w-2xl mx-auto border border-pink-200">
            <FaHeart className="text-pink-500 text-3xl mx-auto mb-4" />
            <p className="text-2xl font-dancing text-gray-800 mb-2">
              "Setiap tahun bersamamu adalah hadiah terindah"
            </p>
            <p className="text-lg text-gray-600">
              Dan masih banyak tahun-tahun indah yang menanti kita...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineCinta;
