"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCarousel } from "@/context/CarouselContext";

export default function HeroCarousel() {
  const { activeSlides } = useCarousel();
  const [current, setCurrent] = useState(0);

  // Clamp current index when slides change
  const safeIndex = activeSlides.length > 0 ? current % activeSlides.length : 0;

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % (activeSlides.length || 1)),
    [activeSlides.length]
  );
  const prev = () =>
    setCurrent((c) => (c - 1 + (activeSlides.length || 1)) % (activeSlides.length || 1));

  useEffect(() => {
    if (activeSlides.length < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, activeSlides.length]);

  if (activeSlides.length === 0) {
    return (
      <div className="relative h-[80vh] min-h-[500px] bg-dark-brown flex items-center justify-center">
        <p className="text-white text-lg opacity-60">No active carousel slides. Add slides from Admin &#8250; Carousel.</p>
      </div>
    );
  }

  const slide = activeSlides[safeIndex];

  const typeColors = {
    festival: "from-amber-900/85 via-amber-800/55 to-transparent",
    promo: "from-green-900/85 via-green-800/55 to-transparent",
    product: "from-dark-brown/80 via-dark-brown/50 to-transparent",
  };
  const overlayClass = typeColors[slide.type] || typeColors.product;

  return (
    <div className="relative h-[88vh] min-h-[540px] overflow-hidden bg-dark-brown">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          {/* Gradient Overlay — colour tinted by type */}
          <div className={`absolute inset-0 bg-gradient-to-r ${overlayClass}`} />
          {/* Bottom fade for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.65 }}
                className="max-w-2xl"
              >
                {/* Badge */}
                {slide.badge && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className={`inline-block ${slide.badgeColor || "bg-primary"} text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5 shadow-lg`}
                  >
                    {slide.badge}
                  </motion.span>
                )}

                {/* Store tag (no badge slides) */}
                {!slide.badge && (
                  <p className="text-accent font-medium text-sm uppercase tracking-widest mb-4">
                    Sweet Moments Bakery · Asansol
                  </p>
                )}

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-dancing font-bold text-white leading-tight mb-3 drop-shadow-lg">
                  {slide.title}
                </h1>
                <h2 className="text-2xl sm:text-3xl font-dancing font-semibold text-accent mb-4 drop-shadow">
                  {slide.subtitle}
                </h2>
                <p className="text-gray-200 text-lg mb-6 leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* Offer pill */}
                {slide.discount && (
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-2.5 mb-7">
                    <span className="text-2xl font-extrabold text-white">{slide.discount}</span>
                    <span className="text-white/70 text-sm">· Limited Time</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="bg-primary hover:bg-primary-dark text-white px-9 py-3.5 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/#categories"
                    className="border-2 border-white/80 text-white px-9 py-3.5 rounded-full font-semibold text-base hover:bg-white hover:text-dark-brown transition-all duration-300"
                  >
                    Explore Menu
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators + slide counter */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3 z-10">
        {/* Slide type pill */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
          slide.type === "festival" ? "bg-amber-500 text-white" :
          slide.type === "promo" ? "bg-green-500 text-white" :
          "bg-white/20 text-white backdrop-blur-sm"
        }`}>
          {slide.type === "festival" ? "Festival Offer" : slide.type === "promo" ? "Promotion" : "Sweet Moments"}
        </span>

        <div className="flex gap-2 items-center">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === safeIndex ? "w-10 h-3 bg-primary" : "w-3 h-3 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="text-white/50 text-xs">{safeIndex + 1} / {activeSlides.length}</span>
      </div>
    </div>
  );
}
