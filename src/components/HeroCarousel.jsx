"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/data/heroSlides";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % heroSlides.length), []);
  const prev = () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <div className="relative h-[85vh] min-h-[500px] overflow-hidden bg-dark-brown">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/80 via-dark-brown/50 to-transparent" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-xl"
              >
                <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">
                  Sweet Moments Bakery · Asansol
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
                  {slide.title}
                </h1>
                <h2 className="text-2xl sm:text-3xl font-semibold text-accent mb-4">
                  {slide.subtitle}
                </h2>
                <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/#categories"
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-dark-brown transition-all duration-300"
                  >
                    Explore
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev/Next Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-8 h-3 bg-primary" : "w-3 h-3 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
