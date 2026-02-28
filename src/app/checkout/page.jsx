"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const deliveryCharge = subtotal > 0 ? (subtotal >= 500 ? 0 : 50) : 0;
  const total = subtotal + deliveryCharge;

  const [form, setForm] = useState({
    name: "", phone: "", address: "", pincode: "", city: "Asansol",
  });
  const [payment, setPayment] = useState("COD");
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isLoggedIn) router.push("/login?redirect=/checkout");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = "Valid 10-digit phone required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = "Valid 6-digit pincode required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4 px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-8xl"
        >🎉</motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-3xl font-bold text-dark-brown mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-500 mb-2">Thank you for ordering from Sweet Moments Bakery, Asansol.</p>
          <p className="text-gray-400 text-sm mb-6">We&apos;ll call you at <strong>{form.phone}</strong> to confirm your order.</p>
          <button onClick={() => router.push("/")} className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-dark-brown mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-dark-brown text-lg mb-5">Delivery Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Your full name" },
                    { key: "phone", label: "Phone Number", placeholder: "10-digit mobile number" },
                    { key: "pincode", label: "Pincode", placeholder: "6-digit pincode" },
                    { key: "city", label: "City", placeholder: "City" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-dark-brown mb-1">{label}</label>
                      <input
                        type="text"
                        value={form[key]}
                        onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
                        placeholder={placeholder}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors[key] ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-dark-brown mb-1">Full Address</label>
                    <textarea
                      value={form.address}
                      onChange={(e) => { setForm({ ...form, address: e.target.value }); setErrors({ ...errors, address: "" }); }}
                      placeholder="House/Flat no., Street, Area"
                      rows={3}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none ${errors.address ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-dark-brown text-lg mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: "COD", label: "Cash on Delivery", icon: "💵", desc: "Pay when your order arrives" },
                    { value: "Online", label: "Online Payment", icon: "💳", desc: "UPI, Net Banking, Cards (UI only)" },
                  ].map((method) => (
                    <label key={method.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === method.value ? "border-primary bg-light-pink" : "border-gray-200 hover:border-gray-300"}`}>
                      <input type="radio" name="payment" value={method.value} checked={payment === method.value} onChange={() => setPayment(method.value)} className="hidden" />
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <p className="font-medium text-dark-brown text-sm">{method.label}</p>
                        <p className="text-gray-400 text-xs">{method.desc}</p>
                      </div>
                      {payment === method.value && <span className="ml-auto text-primary text-lg">✓</span>}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-lg">
                Place Order · ₹{total}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              <h2 className="font-bold text-dark-brown text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.key} className="flex justify-between text-sm">
                    <span className="text-gray-600 line-clamp-1 flex-1 mr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium text-dark-brown">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between text-gray-500"><span>Delivery</span><span className={deliveryCharge === 0 ? "text-green-500" : ""}>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span></div>
                <div className="flex justify-between font-bold text-dark-brown text-base border-t border-gray-100 pt-2"><span>Total</span><span className="text-primary">₹{total}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
