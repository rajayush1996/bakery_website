"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (result.success) {
      router.push(result.role === "admin" ? "/admin" : "/cart");
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <span className="text-5xl">🎂</span>
          <h1 className="text-2xl font-bold text-dark-brown mt-3">Welcome Back!</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to Sweet Moments Bakery</p>
        </div>

        <div className="bg-cream rounded-xl p-4 mb-6 text-xs text-gray-500">
          <p className="font-medium text-dark-brown mb-1">Demo Credentials:</p>
          <p>Admin: admin@bakery.com / admin123</p>
          <p>Customer: demo@bakery.com / demo123</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-brown mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(""); }}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-brown mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(""); }}
              placeholder="Your password"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-md mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}
