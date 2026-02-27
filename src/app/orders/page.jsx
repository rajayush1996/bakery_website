"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { orders } from "@/data/orders";
import OrderStatusBadge from "@/components/OrderStatusBadge";

export default function OrdersPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-dark-brown">My Orders</h1>
          <Link href="/cakes" className="text-primary text-sm font-medium hover:underline">+ Order More</Link>
        </div>

        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Order ID</p>
                  <p className="font-bold text-dark-brown">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Date</p>
                  <p className="text-sm text-dark-brown">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Total</p>
                  <p className="font-bold text-primary text-lg">₹{order.total}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-400 mb-2">ITEMS</p>
                <div className="space-y-1">
                  {order.items.map((item, j) => (
                    <div key={j} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} — {item.weight} × {item.quantity}</span>
                      <span className="text-dark-brown font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3 flex items-center gap-2 text-xs text-gray-400">
                <span>💳 {order.paymentMethod}</span>
                <span>·</span>
                <span>🚚 {order.deliveryCharge === 0 ? "Free Delivery" : `₹${order.deliveryCharge} Delivery`}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
