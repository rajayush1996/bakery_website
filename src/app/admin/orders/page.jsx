"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { orders as initialOrders } from "@/data/orders";
import OrderStatusBadge from "@/components/OrderStatusBadge";

const statusOptions = ["Pending", "Preparing", "Ready", "Delivered"];

export default function AdminOrdersPage() {
  const [orderList, setOrderList] = useState(initialOrders);
  const [filterStatus, setFilterStatus] = useState("All");

  const updateStatus = (id, status) => {
    setOrderList((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };

  const filtered = filterStatus === "All" ? orderList : orderList.filter((o) => o.status === filterStatus);

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-brown">Manage Orders</h1>
          <p className="text-gray-400 text-sm mt-1">{orderList.length} total orders</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...statusOptions].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filterStatus === s ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Order ID", "Customer", "Items", "Payment", "Total", "Date", "Status", "Update"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-dark-brown">{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-dark-brown">{order.customer.name}</p>
                    <p className="text-xs text-gray-400">{order.customer.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      {order.items.map((item, j) => (
                        <p key={j} className="text-xs text-gray-600">{item.name} ({item.weight}) ×{item.quantity}</p>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{order.paymentMethod}</td>
                  <td className="px-4 py-3 font-semibold text-primary">₹{order.total}</td>
                  <td className="px-4 py-3 text-gray-400">{order.date}</td>
                  <td className="px-4 py-3"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                    >
                      {statusOptions.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No orders found for this status.</p>
          </div>
        )}
      </div>
    </div>
  );
}
