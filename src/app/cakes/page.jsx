"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CakeCard from "@/components/CakeCard";
import { cakes, categories } from "@/data/cakes";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CakesContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = activeCategory === "All"
    ? cakes
    : cakes.filter((c) => c.category === activeCategory);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Our Menu</p>
          <h1 className="text-4xl font-bold text-dark-brown">All Cakes</h1>
          <p className="text-gray-500 mt-2">Handcrafted with love in Asansol</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-dark-brown border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((cake, i) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <CakeCard cake={cake} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">🎂</div>
            <p className="text-lg">No cakes found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CakesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>}>
      <CakesContent />
    </Suspense>
  );
}
