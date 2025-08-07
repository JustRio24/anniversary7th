"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaHeart, FaFeather, FaTimes, FaPaperPlane } from "react-icons/fa";

const LetterToMyLove = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyForm, setReplyForm] = useState({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replySubmitted, setReplySubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const letterText = `Untuk Cinta Hidupku,

Hari ini, saat aku menulis surat ini, hatiku dipenuhi dengan rasa syukur yang tak terhingga. Tujuh tahun sudah kita berjalan bersama, dan setiap hari bersamamu terasa seperti mimpi yang tak ingin aku bangunkan.

Kamu adalah rumah bagiku. Bukan rumah yang terbuat dari batu bata dan semen, tapi rumah yang terbuat dari kehangatan pelukan, tawa yang menggemakan kebahagiaan, dan cinta yang tak pernah pudar.

Ada begitu banyak hal yang telah kita lalui bersama — tawa, air mata, perjuangan, hingga kebahagiaan kecil yang hanya bisa dimengerti oleh kita berdua. Semua itu membuatku sadar: aku tidak butuh kesempurnaan, aku hanya butuh kamu, yang selalu ada dan setia menemani.

Terima kasih telah menjadi pasangan terbaikku dalam setiap petualangan hidup. Terima kasih telah sabar menghadapi segala kekuranganku, dan terima kasih telah mencintaiku apa adanya.

Aku berjanji akan terus mencintaimu, hari ini, besok, dan selamanya.

Dengan cinta yang tak terbatas,
Kekasih Hatimu ♥`;
  useEffect(() => {
    if (isInView && currentIndex < letterText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(letterText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isInView, currentIndex, letterText]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyForm.name.trim() || !replyForm.message.trim()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      formData.append("name", replyForm.name);
      formData.append("message", replyForm.message);
      formData.append("type", "Letter Reply");
      formData.append("timestamp", new Date().toISOString());

      const response = await fetch("https://formspree.io/f/xovlpdjy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setReplySubmitted(true);
        setIsSubmitting(false);

        // Close modal after 3 seconds
        setTimeout(() => {
          setShowReplyModal(false);
          setReplySubmitted(false);
          setReplyForm({ name: "", message: "" });
        }, 3000);
      } else {
        throw new Error("Failed to send reply");
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError("Gagal mengirim balasan. Silakan coba lagi.");
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReplyForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      ref={ref}
      className="py-20 bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl font-bold text-pink-600 mb-4">
            Letter to My Love
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Surat cinta yang ditulis dengan sepenuh hati untukmu
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Letter Paper */}
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-2xl border border-pink-100 overflow-hidden">
              {/* Letter Header */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaFeather className="text-2xl" />
                    <h3 className="text-2xl font-dancing font-bold">
                      Love Letter
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-pink-100">Written with love</p>
                    <p className="text-sm opacity-90">From my heart to yours</p>
                  </div>
                </div>
              </div>

              {/* Letter Content */}
              <div className="p-8 md:p-12">
                <div className="relative">
                  {/* Typewriter Effect */}
                  <div className="font-serif text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                    {displayedText}
                    {currentIndex < letterText.length && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-0.5 h-6 bg-pink-500 ml-1"
                      />
                    )}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-pink-200"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 0.3, 0],
                          scale: [0, 1, 0],
                          x: Math.random() * 100 + "%",
                          y: Math.random() * 100 + "%",
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.5,
                          repeatDelay: 3,
                        }}
                      >
                        <FaHeart size={Math.random() * 15 + 10} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Letter Footer */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 border-t border-pink-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-pink-500" />
                    <span className="text-gray-600 font-medium">
                      Sealed with love
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 font-dancing text-lg">
                      Forever yours ♥
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Stamp */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={
                isInView
                  ? { opacity: 1, rotate: 15 }
                  : { opacity: 0, rotate: -10 }
              }
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg shadow-lg border-4 border-white transform rotate-12"
            >
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <FaHeart className="text-2xl mx-auto mb-1" />
                  <div className="text-xs font-bold">LOVE</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Response Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100">
              <FaHeart className="text-purple-500 text-3xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Your Response
              </h3>
              <p className="text-gray-600 mb-6">
                Setiap kata dalam surat ini ditulis dengan cinta yang tulus.
                Bagaimana perasaanmu setelah membacanya?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReplyModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Write Back ♥
              </motion.button>
            </div>
          </motion.div>

          {/* Reply Modal */}
          {showReplyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowReplyModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {!replySubmitted ? (
                  <>
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white rounded-t-3xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FaFeather className="text-2xl" />
                          <h3 className="text-2xl font-bold">
                            Write Your Reply
                          </h3>
                        </div>
                        <button
                          onClick={() => setShowReplyModal(false)}
                          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <p className="mt-2 opacity-90">
                        Tulis balasan surat cinta untuk pasanganmu
                      </p>
                    </div>

                    {/* Modal Content */}
                    <form onSubmit={handleReplySubmit} className="p-8">
                      <div className="space-y-6">
                        {/* Name Input */}
                        <div>
                          <label
                            htmlFor="reply-name"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Nama Kamu
                          </label>
                          <input
                            type="text"
                            id="reply-name"
                            name="name"
                            value={replyForm.name}
                            onChange={handleInputChange}
                            placeholder="Masukkan nama kamu..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>

                        {/* Message Input */}
                        <div>
                          <label
                            htmlFor="reply-message"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Balasan Surat Cinta
                          </label>
                          <textarea
                            id="reply-message"
                            name="message"
                            value={replyForm.message}
                            onChange={handleInputChange}
                            placeholder="Tulis balasan surat cinta yang manis..."
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                            required
                          />
                        </div>

                        {/* Character Count */}
                        <div className="text-right">
                          <span className="text-sm text-gray-500">
                            {replyForm.message.length} characters
                          </span>
                        </div>

                        {/* Error Message */}
                        {submitError && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-red-600 text-sm">
                              {submitError}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end space-x-4 mt-8">
                        <button
                          type="button"
                          onClick={() => setShowReplyModal(false)}
                          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <motion.button
                          type="submit"
                          disabled={
                            isSubmitting ||
                            !replyForm.name.trim() ||
                            !replyForm.message.trim()
                          }
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center space-x-2 ${
                            isSubmitting ||
                            !replyForm.name.trim() ||
                            !replyForm.message.trim()
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <FaPaperPlane />
                              <span>Send Reply</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </>
                ) : (
                  /* Success Message */
                  <div className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <FaHeart className="text-white text-3xl" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      Reply Sent! 💕
                    </h3>
                    <p className="text-lg text-gray-600 mb-2">
                      Balasan surat cintamu telah terkirim dengan penuh cinta
                    </p>
                    <p className="text-gray-500 font-dancing text-xl">
                      "Love letters never go out of style"
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LetterToMyLove;
