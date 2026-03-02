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
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group border border-gray-100 flex flex-col h-full"
    >
      <Link href={`/cake/${cake.id}`}>
        <div className="relative overflow-hidden h-48 sm:h-52">
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="bg-dark-brown/80 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
              {cake.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-accent text-xs">★</span>
            <span className="text-dark-brown text-xs font-semibold">{cake.rating}</span>
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/cake/${cake.id}`}>
          <h3 className="font-semibold text-dark-brown text-base mb-1 hover:text-primary transition-colors line-clamp-1">
            {cake.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1">{cake.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div>
            <span className="text-xs text-gray-400">Starting from</span>
            <p className="text-primary font-bold text-lg">₹{cake.weights[0].price}</p>
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
