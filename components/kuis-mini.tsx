"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaHeart, FaQuestion, FaCheck, FaTimes, FaStar } from "react-icons/fa";

const KuisMini = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSubmittingResults, setIsSubmittingResults] = useState(false);
  const [resultsSubmitted, setResultsSubmitted] = useState(false);

  const quizQuestions = [
    {
      question: "Apa warna favorit aku?",
      options: ["Biru", "Pink", "Ungu", "Hijau"],
      correct: 1,
      explanation:
        "Pink! Kamu selalu ingat aku suka warna yang soft dan romantic 💕",
    },
    {
      question: "Makanan kesukaan kita berdua?",
      options: ["Pizza", "Sushi", "Mie", "Tahu Bulat"],
      correct: 2,
      explanation:
        "Mie! Selalu jadi pilihan pertama saat kita bingung mau makan apa 🍜",
    },
    {
      question: "Tempat Makan favorit kita?",
      options: [
        "Warung Kopi",
        "Restoran Italia",
        "Bakso Prigading",
        "Kedai Tahu",
      ],
      correct: 2,
      explanation:
        "Tempat kecil yang nyaman itu! Bakso Prigading, tempat kita sering makan bareng 🍲",
    },
    {
      question: "Genre Film favoritku?",
      options: ["Horror", "Sci-Fi", "Drama", "Comedy"],
      correct: 3,
      explanation: "Comedy! Genre yang selalu bikin kita ketawa bareng 😂",
    },
    {
      question: "Apa yang paling aku suka dari kamu?",
      options: ["Senyummu", "Tawamu", "Caramu peduli", "Semuanya"],
      correct: 3,
      explanation:
        "Semuanya! Karena kamu sempurna dengan segala kelebihan dan kekuranganmu ❤️",
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers, selectedAnswer];
      setUserAnswers(newAnswers);

      if (selectedAnswer === quizQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }

      setShowResult(true);

      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setQuizCompleted(true);
          // Submit quiz results to Formspree
          submitQuizResults(
            newAnswers,
            score +
              (selectedAnswer === quizQuestions[currentQuestion].correct
                ? 1
                : 0)
          );
        }
      }, 2500);
    }
  };

  const submitQuizResults = async (answers: number[], finalScore: number) => {
    setIsSubmittingResults(true);

    try {
      const formData = new FormData();
      formData.append("type", "Quiz Results");
      formData.append("score", `${finalScore}/${quizQuestions.length}`);
      formData.append(
        "percentage",
        `${Math.round((finalScore / quizQuestions.length) * 100)}%`
      );
      formData.append("timestamp", new Date().toISOString());

      // Add detailed answers
      quizQuestions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correct;
        formData.append(`question_${index + 1}`, question.question);
        formData.append(`answer_${index + 1}`, question.options[userAnswer]);
        formData.append(`correct_${index + 1}`, isCorrect ? "Yes" : "No");
        formData.append(
          `correct_answer_${index + 1}`,
          question.options[question.correct]
        );
      });

      const response = await fetch("https://formspree.io/f/xovlpdjy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setResultsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting quiz results:", error);
    } finally {
      setIsSubmittingResults(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setUserAnswers([]);
    setResultsSubmitted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
      return {
        title: "Perfect Score! 💕",
        message:
          "Kamu benar-benar mengenal aku dengan sempurna! You're the best partner ever!",
        emoji: "🥰",
      };
    } else if (percentage >= 80) {
      return {
        title: "Amazing! ⭐",
        message:
          "Kamu mengenal aku dengan sangat baik! Cinta kita memang spesial!",
        emoji: "😍",
      };
    } else if (percentage >= 60) {
      return {
        title: "Good Job! 💖",
        message:
          "Lumayan bagus! Masih ada yang perlu dipelajari tentang aku nih hihi",
        emoji: "😊",
      };
    } else {
      return {
        title: "Need More Time Together! 💝",
        message: "Sepertinya kita perlu lebih banyak quality time bersama ya!",
        emoji: "😅",
      };
    }
  };

  if (quizCompleted) {
    const result = getScoreMessage();
    return (
      <div
        ref={ref}
        className="py-20 bg-gradient-to-br from-green-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200 p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-6xl mb-6"
              >
                {result.emoji}
              </motion.div>

              <h2 className="font-dancing text-4xl font-bold text-green-600 mb-4">
                {result.title}
              </h2>

              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {score} / {quizQuestions.length}
                </div>
                <div className="text-lg text-gray-600">
                  {Math.round((score / quizQuestions.length) * 100)}% Correct
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {result.message}
              </p>

              {/* Submission Status */}
              {isSubmittingResults && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    <span className="text-blue-600">
                      Mengirim hasil kuis...
                    </span>
                  </div>
                </div>
              )}

              {resultsSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <FaCheck className="text-green-500" />
                    <span className="text-green-600">
                      Hasil kuis berhasil dikirim! 💕
                    </span>
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Take Quiz Again ♥
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl font-bold text-green-600 mb-4">
            Kuis Mini: Seberapa Kenal Kamu Sama Aku?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ayo test seberapa baik kamu mengenal aku! Quiz yang fun dan romantic
            💕
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200 overflow-hidden"
          >
            {/* Quiz Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaQuestion className="text-2xl" />
                  <span className="text-lg font-semibold">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-300" />
                  <span>Score: {score}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${
                      ((currentQuestion + 1) / quizQuestions.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question Content */}
            <div className="p-8">
              {!showResult ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Question */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-4 mb-8">
                    {quizQuestions[currentQuestion].options.map(
                      (option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                            selectedAnswer === index
                              ? "bg-gradient-to-r from-green-100 to-blue-100 border-green-400 shadow-lg"
                              : "bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === index
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedAnswer === index && (
                                <FaCheck className="text-white text-sm" />
                              )}
                            </div>
                            <span className="text-lg font-medium text-gray-800">
                              {option}
                            </span>
                          </div>
                        </motion.button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className={`px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 ${
                        selectedAnswer !== null
                          ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-xl"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {currentQuestion === quizQuestions.length - 1
                        ? "Finish Quiz"
                        : "Next Question"}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Result Display */}
                  <div
                    className={`mb-6 ${
                      selectedAnswer === quizQuestions[currentQuestion].correct
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {selectedAnswer ===
                    quizQuestions[currentQuestion].correct ? (
                      <FaCheck className="text-6xl mx-auto mb-4" />
                    ) : (
                      <FaTimes className="text-6xl mx-auto mb-4" />
                    )}
                    <h3 className="text-3xl font-bold mb-2">
                      {selectedAnswer === quizQuestions[currentQuestion].correct
                        ? "Correct!"
                        : "Oops!"}
                    </h3>
                  </div>

                  {/* Explanation */}
                  <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Encouragement */}
        {!showResult && !quizCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-lg border border-green-100">
              <FaHeart className="text-green-500 text-2xl mx-auto mb-3" />
              <p className="text-gray-600">
                Take your time, sayang! No pressure, this is just for fun 💕
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default KuisMini;
