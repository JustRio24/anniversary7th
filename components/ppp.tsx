"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaMusic,
  FaHeart,
  FaSpotify,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const PlaylistRomantis = () => {
  const ref = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const playlist = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      duration: "4:23",
      audioUrl: "/Perfect.mp3", // Sample audio
      description: "Lagu yang menggambarkan perasaan sempurna bersamamu",
    },
    {
      title: "All of Me",
      artist: "John Legend",
      duration: "4:29",
      audioUrl: "/all.mp3", // Sample audio
      description: "Setiap bagian dari diriku adalah untukmu",
    },
    {
      title: "Just The Way You Are",
      artist: "Bruno Mars",
      duration: "3:40",
      audioUrl: "/bruno.mp3", // Sample audio
      description: "mencintai tanpa syarat, apa adanya.",
    },
    {
      title: "Say You Won't Let Go",
      artist: "James Arthur",
      duration: "3:30",
      audioUrl: "/james.mp3", // Sample audio
      description: "cinta jangka panjang, dari awal hingga akhir hayat.",
    },
    {
      title: "Make You Feel My Love",
      artist: "Adele",
      duration: "3:32",
      audioUrl: "/adele.mp3", // Sample audio
      description: "Membuatmu merasakan cinta yang tulus",
    },
    {
      title: "Until I Found You",
      artist: "Stephen Sanchez",
      duration: "2:58",
      audioUrl: "/step.mp3", // Sample audio
      description: "Tak bisa menahan perasaan ini",
    },
  ];

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  // Load current song
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSong].audioUrl;
      audioRef.current.load();
    }
  }, [currentSong]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const selectSong = async (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentSong(index);
    setCurrentTime(0);
  };

  const nextSong = () => {
    const nextIndex = (currentSong + 1) % playlist.length;
    selectSong(nextIndex);
  };

  const prevSong = () => {
    const prevIndex = currentSong === 0 ? playlist.length - 1 : currentSong - 1;
    selectSong(prevIndex);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={ref}
      className="py-20 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl font-bold text-purple-600 mb-4">
            Playlist Music
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Lagu-lagu yang Menggambarkan dirimu dimataku
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Music Player Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-2xl p-8 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FaMusic className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Our Love Songs</h3>
                  <p className="opacity-90">Soundtrack of Our Hearts</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaSpotify className="text-3xl" />
                <FaHeart className="text-2xl animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Current Playing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm p-6 border-x border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => togglePlay()}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                </motion.button>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {playlist[currentSong].title}
                  </h4>
                  <p className="text-gray-600">
                    {playlist[currentSong].artist}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Now Playing</p>
                <p className="font-semibold text-purple-600">
                  {playlist[currentSong].duration}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div
                className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  seekTo(percent * duration);
                }}
              >
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-100"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Volume Control */}
            <div className="mt-4 flex items-center space-x-3">
              <span className="text-sm text-gray-500">Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-500">
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Previous/Next Controls */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <button
                onClick={prevSong}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
              >
                {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
              </button>

              <button
                onClick={nextSong}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </motion.div>

          {/* Playlist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-xl border border-gray-200"
          >
            {playlist.map((song, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.05)" }}
                className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition-all duration-200 ${
                  currentSong === index ? "bg-purple-50 border-purple-200" : ""
                }`}
                onClick={() => selectSong(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentSong === index) {
                          togglePlay();
                        } else {
                          selectSong(index);
                        }
                      }}
                      className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center hover:from-purple-200 hover:to-pink-200 transition-all"
                    >
                      {currentSong === index && isPlaying ? (
                        <FaPause className="text-purple-600" />
                      ) : (
                        <FaPlay className="text-purple-600 text-sm ml-0.5" />
                      )}
                    </button>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {song.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{song.artist}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {song.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaHeart
                      className={`text-sm ${
                        currentSong === index
                          ? "text-pink-500"
                          : "text-pink-400"
                      }`}
                    />
                    <span className="text-gray-500 text-sm">
                      {song.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Spotify Embed Alternative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 text-center"
          ></motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 max-w-2xl mx-auto border border-purple-200">
            <FaMusic className="text-purple-500 text-3xl mx-auto mb-4" />
            <p className="text-2xl font-dancing text-gray-800 mb-2">
              "Music is the language of love"
            </p>
            <p className="text-lg text-gray-600">
              Setiap lagu menceritakan kisah cinta kita
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlaylistRomantis;
