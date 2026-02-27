"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const router = useRouter();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = "Valid 10-digit phone required";
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    signup(form.name, form.email, form.phone, form.password);
    router.push("/");
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
    { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "10-digit mobile number" },
    { key: "password", label: "Password", type: "password", placeholder: "At least 6 characters" },
  ];

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
          <h1 className="text-2xl font-bold text-dark-brown mt-3">Create Account</h1>
          <p className="text-gray-400 text-sm mt-1">Join Sweet Moments Bakery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-dark-brown mb-1">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
                placeholder={placeholder}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors[key] ? "border-red-400" : "border-gray-200"}`}
              />
              {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-md mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
