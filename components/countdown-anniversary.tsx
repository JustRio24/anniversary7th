"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaHeart, FaCalendarAlt, FaClock, FaGift } from "react-icons/fa";

const CountdownAnniversary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [nextAnniversary, setNextAnniversary] = useState<Date | null>(null);
  const [anniversaryYear, setAnniversaryYear] = useState(8);

  useEffect(() => {
    // Calculate next anniversary date
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetDate = new Date(currentYear, 7, 8); // August 8th (month is 0-indexed)

    // If this year's anniversary has passed, target next year
    if (now > targetDate) {
      targetDate = new Date(currentYear + 1, 7, 8);
      setAnniversaryYear(targetDate.getFullYear() - 2018);
    } else {
      setAnniversaryYear(currentYear - 2018);
    }

    setNextAnniversary(targetDate);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsCountdownActive(true);
      } else {
        // Anniversary has arrived!
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsCountdownActive(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownItems = [
    { label: "Hari", value: timeLeft.days, color: "pink", icon: FaCalendarAlt },
    { label: "Jam", value: timeLeft.hours, color: "purple", icon: FaClock },
    { label: "Menit", value: timeLeft.minutes, color: "blue", icon: FaClock },
    { label: "Detik", value: timeLeft.seconds, color: "green", icon: FaClock },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      pink: "from-pink-500 to-pink-600 border-pink-200",
      purple: "from-purple-500 to-purple-600 border-purple-200",
      blue: "from-blue-500 to-blue-600 border-blue-200",
      green: "from-green-500 to-green-600 border-green-200",
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

  // Calculate progress from previous anniversary to next anniversary
  const getProgressPercentage = () => {
    if (!nextAnniversary) return 0;

    const now = new Date();
    const currentYear = now.getFullYear();

    // Previous anniversary date
    let prevAnniversary: Date;
    if (now > new Date(currentYear, 7, 8)) {
      // If this year's anniversary has passed, previous is this year
      prevAnniversary = new Date(currentYear, 7, 8);
    } else {
      // If this year's anniversary hasn't passed, previous is last year
      prevAnniversary = new Date(currentYear - 1, 7, 8);
    }

    const totalDuration = nextAnniversary.getTime() - prevAnniversary.getTime();
    const elapsed = now.getTime() - prevAnniversary.getTime();

    const percentage = Math.min(
      Math.max((elapsed / totalDuration) * 100, 0),
      100
    );
    return Math.round(percentage * 10) / 10; // Round to 1 decimal place
  };

  // Calculate days since last anniversary
  const getDaysSinceLastAnniversary = () => {
    const now = new Date();
    const currentYear = now.getFullYear();

    let lastAnniversary: Date;
    if (now > new Date(currentYear, 7, 8)) {
      lastAnniversary = new Date(currentYear, 7, 8);
    } else {
      lastAnniversary = new Date(currentYear - 1, 7, 8);
    }

    const diffTime = now.getTime() - lastAnniversary.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get previous anniversary year
  const getPreviousAnniversaryYear = () => {
    const now = new Date();
    const currentYear = now.getFullYear();

    if (now > new Date(currentYear, 7, 8)) {
      return currentYear;
    } else {
      return currentYear - 1;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl font-bold text-blue-600 mb-4">
            {isCountdownActive
              ? "Countdown ke Anniversary Berikutnya"
              : "🎉 Happy Anniversary! 🎉"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isCountdownActive
              ? `Menghitung hari menuju ${
                  nextAnniversary ? formatDate(nextAnniversary) : ""
                } - Anniversary ke-${anniversaryYear} kita!`
              : "Selamat Anniversary! Hari istimewa kita telah tiba! 💕"}
          </p>
        </motion.div>

        {/* Main Countdown */}
        <div className="max-w-6xl mx-auto">
          {/* Target Date Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div
              className={`backdrop-blur-sm rounded-2xl p-8 shadow-xl border max-w-md mx-auto ${
                isCountdownActive
                  ? "bg-white/80 border-blue-100"
                  : "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200"
              }`}
            >
              {isCountdownActive ? (
                <>
                  <FaCalendarAlt className="text-blue-500 text-4xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Target Date
                  </h3>
                  <div className="text-4xl font-dancing font-bold text-blue-600 mb-2">
                    08 • 08 • {nextAnniversary?.getFullYear()}
                  </div>
                  <p className="text-gray-600">
                    Anniversary ke-{anniversaryYear} kita
                  </p>
                </>
              ) : (
                <>
                  <FaGift className="text-pink-500 text-4xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Anniversary Day!
                  </h3>
                  <div className="text-4xl font-dancing font-bold text-pink-600 mb-2">
                    08 • 08 • {new Date().getFullYear()}
                  </div>
                  <p className="text-gray-600">
                    Anniversary ke-{new Date().getFullYear() - 2018} kita! 🎊
                  </p>
                </>
              )}
            </div>
          </motion.div>

          {/* Countdown Display */}
          {isCountdownActive ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {countdownItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                    }
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`bg-gradient-to-br ${getColorClasses(
                        item.color
                      )} text-white rounded-2xl p-6 shadow-xl border-2 mb-4 relative overflow-hidden`}
                    >
                      {/* Background Icon */}
                      <Icon className="absolute top-2 right-2 text-white/20 text-2xl" />

                      <motion.div
                        key={item.value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl md:text-5xl font-bold mb-2 relative z-10"
                      >
                        {item.value.toString().padStart(2, "0")}
                      </motion.div>
                      <div className="text-lg font-semibold opacity-90 relative z-10">
                        {item.label}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Anniversary Celebration */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center mb-12"
            >
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-12 shadow-2xl border border-pink-200">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="text-8xl mb-6"
                >
                  🎉💕🎊
                </motion.div>
                <h3 className="text-4xl font-dancing font-bold text-pink-600 mb-4">
                  Happy Anniversary!
                </h3>
                <p className="text-xl text-gray-700 mb-4">
                  Hari istimewa kita telah tiba! {anniversaryYear} tahun
                  perjalanan cinta yang indah!
                </p>
                <p className="text-lg text-gray-600 font-dancing">
                  "Every love story is beautiful, but ours is my favorite" ♥
                </p>
              </div>
            </motion.div>
          )}

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FaClock className="text-blue-500 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">
                  Progress Anniversary ke-{anniversaryYear}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {getProgressPercentage()}%
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>

            {/* Progress Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                <div className="text-lg font-bold text-gray-800">
                  {getDaysSinceLastAnniversary()}
                </div>
                <div className="text-sm text-gray-600">Hari Berlalu</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <div className="text-lg font-bold text-gray-800">
                  {timeLeft.days}
                </div>
                <div className="text-sm text-gray-600">Hari Tersisa</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg">
                <div className="text-lg font-bold text-gray-800">365</div>
                <div className="text-sm text-gray-600">Total Hari</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full relative"
                initial={{ width: "0%" }}
                animate={
                  isInView ? { width: `${getProgressPercentage()}%` } : "0%"
                }
                transition={{ duration: 2, delay: 1 }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.div>
            </div>

            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>08 Aug {getPreviousAnniversaryYear()}</span>
              <span className="font-medium text-purple-600">
                {getProgressPercentage()}% Complete
              </span>
              <span>08 Aug {nextAnniversary?.getFullYear()}</span>
            </div>

            {/* Additional Progress Details */}
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-pink-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Dari Anniversary ke-{getPreviousAnniversaryYear() - 2018}
                </span>
                <span className="font-semibold text-purple-600">
                  Menuju Anniversary ke-{anniversaryYear}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Anniversary Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 border border-pink-200">
              <FaHeart className="text-pink-500 text-3xl mb-4" />
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Anniversary Lalu
              </h4>
              <p className="text-gray-600 text-sm">
                08 Agustus {new Date().getFullYear() - 1} -{" "}
                {new Date().getFullYear() - 2018 - 1} tahun perjalanan cinta
                yang indah
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 border border-blue-200">
              <FaHeart className="text-blue-500 text-3xl mb-4" />
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Anniversary Sekarang
              </h4>
              <p className="text-gray-600 text-sm">
                08 Agustus {new Date().getFullYear()} -{" "}
                {new Date().getFullYear() - 2018} tahun kebahagiaan bersama
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 border border-green-200">
              <FaHeart className="text-green-500 text-3xl mb-4" />
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Anniversary Mendatang
              </h4>
              <p className="text-gray-600 text-sm">
                08 Agustus {new Date().getFullYear() + 1} -{" "}
                {new Date().getFullYear() - 2018 + 1} tahun cinta yang tak
                tergoyahkan
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-xl border border-blue-100">
            <FaHeart className="text-blue-500 text-3xl mx-auto mb-4" />
            <p className="text-2xl font-dancing text-gray-800 mb-2">
              {isCountdownActive
                ? '"Time flies when you\'re in love"'
                : '"Today marks another year of our beautiful love story"'}
            </p>
            <p className="text-lg text-gray-600">
              {isCountdownActive
                ? "Setiap detik bersamamu adalah hadiah yang berharga"
                : "Selamat anniversary, my love! Here's to many more years together! 💕"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownAnniversary;
