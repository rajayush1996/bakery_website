"use client";
import { createContext, useContext, useState } from "react";
import { heroSlides as initialSlides } from "@/data/heroSlides";

const CarouselContext = createContext(null);

export function CarouselProvider({ children }) {
  const [slides, setSlides] = useState(initialSlides);

  const addSlide = (slide) => {
    setSlides((prev) => [
      ...prev,
      { ...slide, id: crypto.randomUUID(), active: true },
    ]);
  };

  const updateSlide = (id, updates) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteSlide = (id) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const moveSlide = (id, direction) => {
    setSlides((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  };

  const toggleActive = (id) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const activeSlides = slides.filter((s) => s.active);

  return (
    <CarouselContext.Provider
      value={{ slides, activeSlides, addSlide, updateSlide, deleteSlide, moveSlide, toggleActive }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within CarouselProvider");
  return ctx;
}
