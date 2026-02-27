"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const deliveryCharge = subtotal > 0 ? (subtotal >= 500 ? 0 : 50) : 0;
  const total = subtotal + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-8xl">🛒</div>
        <h2 className="text-2xl font-bold text-dark-brown">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven&apos;t added any cakes yet!</p>
        <Link href="/cakes" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors mt-2">
          Browse Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-dark-brown mb-8">Shopping Cart ({totalItems} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-dark-brown line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{item.weight}</p>
                  <p className="text-primary font-bold">₹{item.price}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-xl"
                    aria-label="Remove"
                  >×</button>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="px-2 py-1 text-dark-brown hover:bg-gray-50 transition-colors text-sm font-bold"
                    >-</button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="px-2 py-1 text-dark-brown hover:bg-gray-50 transition-colors text-sm font-bold"
                    >+</button>
                  </div>
                  <p className="text-sm font-semibold text-dark-brown">₹{item.price * item.quantity}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              <h2 className="font-bold text-dark-brown text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-green-500 font-medium" : ""}>
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                {subtotal > 0 && subtotal < 500 && (
                  <p className="text-xs text-gray-400">Add ₹{500 - subtotal} more for free delivery</p>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-dark-brown text-base">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                Proceed to Checkout
              </Link>
              <Link href="/cakes" className="mt-3 block w-full text-center text-sm text-gray-400 hover:text-primary transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
