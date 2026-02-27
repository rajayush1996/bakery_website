"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cakes as initialCakes, categories } from "@/data/cakes";

export default function AdminCakesPage() {
  const [cakeList, setCakeList] = useState(initialCakes);
  const [showModal, setShowModal] = useState(false);
  const [editCake, setEditCake] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "Birthday Cakes",
    image: "", rating: "4.5", reviews: "0",
  });

  const openAdd = () => {
    setEditCake(null);
    setForm({ name: "", description: "", price: "", category: "Birthday Cakes", image: "", rating: "4.5", reviews: "0" });
    setShowModal(true);
  };

  const openEdit = (cake) => {
    setEditCake(cake);
    setForm({ name: cake.name, description: cake.description, price: cake.price, category: cake.category, image: cake.image, rating: cake.rating, reviews: cake.reviews });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price) return;
    if (editCake) {
      setCakeList((prev) => prev.map((c) => c.id === editCake.id ? { ...c, ...form, price: Number(form.price), rating: Number(form.rating), reviews: Number(form.reviews) } : c));
    } else {
      const newCake = { id: Date.now(), ...form, price: Number(form.price), rating: Number(form.rating), reviews: Number(form.reviews), weights: [{ label: "1 kg", price: Number(form.price) }] };
      setCakeList((prev) => [...prev, newCake]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this cake?")) setCakeList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-brown">Manage Cakes</h1>
          <p className="text-gray-400 text-sm mt-1">{cakeList.length} cakes in catalog</p>
        </div>
        <button onClick={openAdd} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
          + Add New Cake
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Image", "Name", "Category", "Base Price", "Rating", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cakeList.map((cake) => (
                <tr key={cake.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <img src={cake.image} alt={cake.name} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-dark-brown">{cake.name}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{cake.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-light-pink text-primary text-xs px-2 py-1 rounded-full">{cake.category}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary">₹{cake.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-accent">★</span>
                      <span className="text-dark-brown font-medium">{cake.rating}</span>
                      <span className="text-gray-400">({cake.reviews})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(cake)} className="text-blue-500 hover:text-blue-700 text-xs font-medium border border-blue-200 px-3 py-1 rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleDelete(cake.id)} className="text-red-400 hover:text-red-600 text-xs font-medium border border-red-200 px-3 py-1 rounded-lg transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
            >
              <h2 className="font-bold text-dark-brown text-lg mb-5">{editCake ? "Edit Cake" : "Add New Cake"}</h2>
              <div className="space-y-4">
                {[
                  { key: "name", label: "Cake Name", type: "text", placeholder: "e.g. Chocolate Truffle" },
                  { key: "image", label: "Image URL", type: "text", placeholder: "https://..." },
                  { key: "price", label: "Base Price (₹)", type: "number", placeholder: "e.g. 700" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-dark-brown mb-1">{label}</label>
                    <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-dark-brown mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                    {categories.map((c) => <option key={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-brown mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-semibold transition-colors">{editCake ? "Save Changes" : "Add Cake"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
