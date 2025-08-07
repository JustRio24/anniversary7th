"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FaHeart,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";

const MomentGaleri = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: "/eat.png",
      title: "Bakso Date",
      description: "Menikmati Makanan Favorit, dengan orang ter-favorit",
    },
    {
      src: "/afternoon.png",
      title: "Waktu Bersama",
      description:
        "Waktu terasa cepat, saat kita saling menikmati tawa bersama",
    },
    {
      src: "/birthday.png",
      title: "Ulang Tahun Spesial",
      description: "Merayakan hari-hari penting dalam hidup kita",
    },
    {
      src: "/sore.png",
      title: "Sore yang Indah",
      description:
        "Momen hangat yang tak terabadikan dalam sebuah bingkai, namun terukir dalam hati selamanya",
    },
    {
      src: "/5.png",
      title: "Momen-momen Bersama",
      description: "Menciptakan kehangatan di setiap pertemuan",
    },
    {
      src: "/3.png",
      title: "Perjalanan Bersama",
      description: "Setiap Perjalanan jadi lebih bermakna bersamamu",
    },
    {
      src: "/siluet.png",
      title: "Bayangmu Selalu lengkapiku",
      description: "Siluet kita berdua, menandakan kita selalu bersama",
    },
    {
      src: "/merah.png",
      title: "Cinta Selamanya ❤️",
      description: "Merayakan cinta yang semakin dalam setiap waktunya",
    },
    {
      src: "/smile.png",
      title: "Senyuman yang selalu ingin ku lihat",
      description: "Senyummu merubah hariku menjadi lebih indah",
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  return (
    <div ref={ref} className="py-20 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-6xl font-bold text-pink-600 mb-4">
            Galeri Kenangan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Setiap foto menyimpan cerita, setiap momen adalah harta karun yang
            tak ternilai
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">
                      {image.title}
                    </h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                  </div>
                </div>

                {/* Heart Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaHeart className="text-white text-xl drop-shadow-lg" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors z-10"
              >
                <FaTimes size={24} />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-400 transition-colors z-10"
              >
                <FaChevronLeft size={32} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-400 transition-colors z-10"
              >
                <FaChevronRight size={32} />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <Image
                  src={galleryImages[selectedImage].src || "/placeholder.svg"}
                  alt={galleryImages[selectedImage].title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {galleryImages[selectedImage].title}
                  </h3>
                  <p className="text-white/90 text-lg">
                    {galleryImages[selectedImage].description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-xl border border-pink-100">
            <FaHeart className="text-pink-500 text-3xl mx-auto mb-4" />
            <p className="text-2xl font-dancing text-gray-800 mb-2">
              "A picture is worth a thousand words, but our memories are
              priceless"
            </p>
            <p className="text-lg text-gray-600">
              Setiap foto adalah jendela ke masa lalu yang indah
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MomentGaleri;
