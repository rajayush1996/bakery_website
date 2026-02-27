"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CakeCard({ cake }) {
  const { addToCart } = useCart();
  const defaultWeight = cake.weights[1] || cake.weights[0];

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(cake, defaultWeight, 1);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
    >
      <Link href={`/cake/${cake.id}`}>
        <div className="relative overflow-hidden h-52">
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
              {cake.category}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/cake/${cake.id}`}>
          <h3 className="font-semibold text-dark-brown text-lg mb-1 hover:text-primary transition-colors line-clamp-1">
            {cake.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{cake.description}</p>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-accent text-sm">
            {"★".repeat(Math.floor(cake.rating))}
            {"☆".repeat(5 - Math.floor(cake.rating))}
          </div>
          <span className="text-gray-500 text-xs">({cake.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">Starting from</span>
            <p className="text-primary font-bold text-xl">₹{cake.weights[0].price}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
