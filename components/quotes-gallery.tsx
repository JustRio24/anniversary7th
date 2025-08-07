'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaHeart, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const QuotesGallery = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const loveQuotes = [
    {
      text: "Every moment with you is a memory in bloom",
      translation: "Setiap momen bersamamu adalah kenangan yang mekar",
      author: "Our Love Story",
      language: "English"
    },
    {
      text: "Kamu adalah rumah dari semua rasa rindu yang aku punya",
      translation: "You are the home of all the longing I have",
      author: "Hati yang Mencinta",
      language: "Indonesian"
    },
    {
      text: "Since 2018, it's been you and only you",
      translation: "Sejak 2018, hanya kamu dan akan selalu kamu",
      author: "Our Journey",
      language: "English"
    },
    {
      text: "Cinta sejati tidak pernah berakhir, ia hanya semakin dalam",
      translation: "True love never ends, it only grows deeper",
      author: "Filosofi Cinta",
      language: "Indonesian"
    },
    {
      text: "In your eyes, I found my home. In your heart, I found my love",
      translation: "Di matamu, aku menemukan rumah. Di hatimu, aku menemukan cinta",
      author: "Soul Connection",
      language: "English"
    },
    {
      text: "Bersamamu, aku belajar bahwa cinta bukan hanya perasaan, tapi pilihan setiap hari",
      translation: "With you, I learned that love is not just a feeling, but a daily choice",
      author: "Pelajaran Cinta",
      language: "Indonesian"
    },
    {
      text: "You are my today and all of my tomorrows",
      translation: "Kamu adalah hari ini dan semua hari esokku",
      author: "Forever Promise",
      language: "English"
    },
    {
      text: "Dalam pelukmu, aku menemukan kedamaian yang tak pernah aku rasakan sebelumnya",
      translation: "In your embrace, I found peace I never felt before",
      author: "Ketenangan Hati",
      language: "Indonesian"
    }
  ]

  useEffect(() => {
    if (isAutoPlay && isInView) {
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % loveQuotes.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, isInView, loveQuotes.length])

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % loveQuotes.length)
    setIsAutoPlay(false)
  }

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + loveQuotes.length) % loveQuotes.length)
    setIsAutoPlay(false)
  }

  const goToQuote = (index: number) => {
    setCurrentQuote(index)
    setIsAutoPlay(false)
  }

  return (
    <div ref={ref} className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl font-bold text-purple-600 mb-4">
            Galeri Kutipan Cinta
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kata-kata indah tentang cinta dalam dua bahasa yang menyentuh hati
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main Quote Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-12"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
              {/* Quote Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaQuoteLeft className="text-2xl" />
                    <span className="text-lg font-semibold">
                      Quote #{currentQuote + 1} of {loveQuotes.length}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      {loveQuotes[currentQuote].language}
                    </span>
                    <FaHeart className="text-xl animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Quote Content */}
              <div className="p-8 md:p-12 text-center">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Main Quote */}
                  <blockquote className="text-2xl md:text-3xl font-dancing text-gray-800 mb-6 leading-relaxed">
                    "{loveQuotes[currentQuote].text}"
                  </blockquote>

                  {/* Translation */}
                  <p className="text-lg md:text-xl text-gray-600 mb-6 italic">
                    "{loveQuotes[currentQuote].translation}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-0.5 bg-purple-400"></div>
                    <span className="text-purple-600 font-semibold">
                      {loveQuotes[currentQuote].author}
                    </span>
                    <div className="w-8 h-0.5 bg-purple-400"></div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={prevQuote}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200"
                >
                  <FaChevronLeft />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-2">
                  {loveQuotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToQuote(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentQuote 
                          ? 'bg-purple-500 w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextQuote}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200"
                >
                  <span>Next</span>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quote Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {loveQuotes.map((quote, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToQuote(index)}
                className={`p-4 rounded-xl text-left transition-all duration-200 ${
                  index === currentQuote 
                    ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 shadow-lg' 
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-purple-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <FaQuoteLeft className={`text-sm ${
                    index === currentQuote ? 'text-purple-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    index === currentQuote 
                      ? 'bg-purple-200 text-purple-700' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {quote.language}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3 mb-2">
                  {quote.text}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  - {quote.author}
                </p>
              </motion.button>
            ))}
          </motion.div>

          {/* Auto-play Control */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                isAutoPlay 
                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isAutoPlay ? 'Pause Auto-play' : 'Resume Auto-play'}
            </button>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-xl border border-purple-100">
            <FaHeart className="text-purple-500 text-3xl mx-auto mb-4" />
            <p className="text-2xl font-dancing text-gray-800 mb-2">
              "Words of love in every language"
            </p>
            <p className="text-lg text-gray-600">
              Cinta tidak mengenal batas bahasa, ia berbicara langsung ke hati
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default QuotesGallery
