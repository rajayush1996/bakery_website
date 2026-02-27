"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cakes } from "@/data/cakes";
import { useCart } from "@/context/CartContext";
import CakeCard from "@/components/CakeCard";

export default function CakeDetailPage({ params }) {
  const cake = cakes.find((c) => c.id === parseInt(params.id));
  const defaultWeight = cake ? (cake.weights[1] || cake.weights[0]) : null;

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!cake) return notFound();

  const related = cakes.filter((c) => c.category === cake.category && c.id !== cake.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(cake, selectedWeight, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/cakes" className="hover:text-primary">Cakes</Link>
          <span>/</span>
          <span className="text-dark-brown">{cake.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden shadow-lg"
          >
            <img src={cake.image} alt={cake.name} className="w-full h-96 lg:h-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-light-pink text-primary text-xs px-3 py-1 rounded-full font-medium">{cake.category}</span>
            <h1 className="text-3xl font-bold text-dark-brown mt-3 mb-2">{cake.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-accent">{"★".repeat(Math.floor(cake.rating))}</div>
              <span className="text-gray-500 text-sm">{cake.rating} ({cake.reviews} reviews)</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{cake.description}</p>

            {/* Weight Selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-dark-brown mb-3">Select Weight / Size</p>
              <div className="flex flex-wrap gap-2">
                {cake.weights.map((w) => (
                  <button
                    key={w.label}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                      selectedWeight.label === w.label
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 text-dark-brown hover:border-primary"
                    }`}
                  >
                    {w.label}
                    <span className="block text-xs font-normal">₹{w.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-primary">₹{selectedWeight.price * quantity}</span>
              <span className="text-gray-400 text-sm">for {selectedWeight.label}</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-medium text-dark-brown">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-dark-brown font-bold text-lg transition-colors"
                >-</button>
                <span className="px-6 py-2 font-semibold text-dark-brown">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-dark-brown font-bold text-lg transition-colors"
                >+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-primary hover:bg-primary-dark text-white hover:shadow-lg"
              }`}
            >
              {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
            </motion.button>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
              <span>🚚 Free delivery on orders above ₹500</span>
            </div>
          </motion.div>
        </div>

        {/* Related Cakes */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-dark-brown mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((c) => <CakeCard key={c.id} cake={c} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
