"use client";
import { motion } from "framer-motion";
import MetricCard from "@/components/MetricCard";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { orders } from "@/data/orders";
import { cakes } from "@/data/cakes";

const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
const pendingOrders = orders.filter((o) => o.status === "Pending").length;

const monthlyData = [
  { month: "Aug", sales: 8500 },
  { month: "Sep", sales: 12000 },
  { month: "Oct", sales: 9800 },
  { month: "Nov", sales: 15000 },
  { month: "Dec", sales: 22000 },
  { month: "Jan", sales: 18000 },
];
const maxSales = Math.max(...monthlyData.map((d) => d.sales));

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-dark-brown mb-1">Dashboard</h1>
        <p className="text-gray-400 text-sm mb-8">Welcome back, Admin! Here&apos;s what&apos;s happening today.</p>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Total Orders" value={orders.length} icon="📦" color="blue" subtitle="All time" />
          <MetricCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon="💰" color="green" subtitle="All time" />
          <MetricCard title="Total Cakes" value={cakes.length} icon="🎂" color="primary" subtitle="In catalog" />
          <MetricCard title="Pending Orders" value={pendingOrders} icon="⏳" color="secondary" subtitle="Need action" />
        </div>

        {/* Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-dark-brown mb-4">Monthly Sales (₹)</h2>
            <div className="flex items-end gap-3 h-40">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400 font-medium">₹{(d.sales / 1000).toFixed(0)}k</span>
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all duration-500"
                    style={{ height: `${(d.sales / maxSales) * 120}px` }}
                  />
                  <span className="text-xs text-gray-400">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-dark-brown mb-4">Order Status</h2>
            {["Pending", "Preparing", "Ready", "Delivered"].map((status) => {
              const count = orders.filter((o) => o.status === status).length;
              return (
                <div key={status} className="flex items-center justify-between mb-3">
                  <OrderStatusBadge status={status} />
                  <span className="font-semibold text-dark-brown">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-dark-brown">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Order ID", "Customer", "Items", "Total", "Date", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-dark-brown">{order.id}</td>
                    <td className="px-4 py-3 text-gray-600">{order.customer.name}</td>
                    <td className="px-4 py-3 text-gray-600">{order.items.length} item{order.items.length > 1 ? "s" : ""}</td>
                    <td className="px-4 py-3 font-semibold text-primary">₹{order.total}</td>
                    <td className="px-4 py-3 text-gray-400">{order.date}</td>
                    <td className="px-4 py-3"><OrderStatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
