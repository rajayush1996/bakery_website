"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCarousel } from "@/context/CarouselContext";

const SLIDE_TYPES = [
  { value: "product", label: "Product", color: "bg-pink-100 text-pink-700" },
  { value: "festival", label: "Festival Offer", color: "bg-amber-100 text-amber-700" },
  { value: "promo", label: "Promotion", color: "bg-green-100 text-green-700" },
];

const BADGE_COLORS = [
  { value: "bg-primary", label: "Pink (Primary)" },
  { value: "bg-amber-500", label: "Amber / Gold" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-red-600", label: "Red" },
  { value: "bg-blue-600", label: "Blue" },
  { value: "bg-purple-600", label: "Purple" },
  { value: "bg-dark-brown", label: "Dark Brown" },
];

const emptyForm = {
  type: "product",
  image: "",
  title: "",
  subtitle: "",
  description: "",
  cta: "Order Now",
  ctaLink: "/cakes",
  badge: "",
  badgeColor: "bg-primary",
  discount: "",
  active: true,
};

export default function AdminCarouselPage() {
  const { slides, addSlide, updateSlide, deleteSlide, moveSlide, toggleActive } = useCarousel();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (slide) => {
    setEditId(slide.id);
    setForm({
      type: slide.type,
      image: slide.image,
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      cta: slide.cta,
      ctaLink: slide.ctaLink,
      badge: slide.badge || "",
      badgeColor: slide.badgeColor || "bg-primary",
      discount: slide.discount || "",
      active: slide.active,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.image.trim()) return;
    if (editId !== null) {
      updateSlide(editId, form);
    } else {
      addSlide(form);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this slide? This cannot be undone.")) {
      deleteSlide(id);
    }
  };

  const typeConfig = Object.fromEntries(SLIDE_TYPES.map((t) => [t.value, t]));

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-dark-brown">Carousel Slides</h1>
            <p className="text-gray-400 text-sm mt-1">
              {slides.length} slide{slides.length !== 1 ? "s" : ""} total · {slides.filter((s) => s.active).length} active on homepage
            </p>
          </div>
          <button
            onClick={openAdd}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            + Add New Slide
          </button>
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-blue-500 text-xl mt-0.5">ℹ️</span>
          <div className="text-sm text-blue-700">
            <strong>Tip:</strong> Use <strong>Festival Offer</strong> or <strong>Promotion</strong> types to add advertisement banners for Diwali, Christmas, special sales, etc. Toggle slides on/off to show or hide them on the homepage without deleting. Changes are reflected live.
          </div>
        </div>

        {/* Slides Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["#", "Preview", "Title / Subtitle", "Type", "Badge / Offer", "Status", "Order", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {slides.map((slide, idx) => (
                  <motion.tr
                    key={slide.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400 font-medium">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setPreview(slide)}
                        className="group relative block w-20 h-12 rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-colors"
                        title="Click to preview"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${slide.image}')` }}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="text-white text-xs opacity-80">👁</span>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="font-semibold text-dark-brown line-clamp-1">{slide.title}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{slide.subtitle}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeConfig[slide.type]?.color || "bg-gray-100 text-gray-500"}`}>
                        {typeConfig[slide.type]?.label || slide.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {slide.badge ? (
                        <div>
                          <span className={`text-xs text-white font-semibold px-2 py-0.5 rounded-full ${slide.badgeColor}`}>{slide.badge}</span>
                          {slide.discount && <p className="text-xs text-gray-500 mt-1 font-bold">{slide.discount}</p>}
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(slide.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          slide.active ? "bg-green-400" : "bg-gray-300"
                        }`}
                        title={slide.active ? "Active — click to hide" : "Inactive — click to show"}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${slide.active ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveSlide(slide.id, "up")}
                          disabled={idx === 0}
                          className="text-gray-400 hover:text-dark-brown disabled:opacity-20 p-1 rounded transition-colors"
                          title="Move up"
                        >▲</button>
                        <button
                          onClick={() => moveSlide(slide.id, "down")}
                          disabled={idx === slides.length - 1}
                          className="text-gray-400 hover:text-dark-brown disabled:opacity-20 p-1 rounded transition-colors"
                          title="Move down"
                        >▼</button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(slide)}
                          className="text-blue-500 hover:text-blue-700 text-xs font-medium border border-blue-200 px-3 py-1 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(slide.id)}
                          className="text-red-400 hover:text-red-600 text-xs font-medium border border-red-200 px-3 py-1 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {slides.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">🖼️</div>
              <p>No slides yet. Click &quot;+ Add New Slide&quot; to get started.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4" onClick={() => setPreview(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "16/7" }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${preview.image}')` }} />
              <div className={`absolute inset-0 bg-gradient-to-r ${
                preview.type === "festival" ? "from-amber-900/80 via-amber-800/50 to-transparent" :
                preview.type === "promo" ? "from-green-900/80 via-green-800/50 to-transparent" :
                "from-dark-brown/80 via-dark-brown/50 to-transparent"
              }`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="relative h-full flex items-center px-10 py-8">
                <div className="max-w-sm">
                  {preview.badge && (
                    <span className={`inline-block ${preview.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>{preview.badge}</span>
                  )}
                  <h2 className="text-2xl font-extrabold text-white leading-tight mb-1">{preview.title}</h2>
                  <h3 className="text-lg font-semibold text-accent mb-2">{preview.subtitle}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed mb-3">{preview.description}</p>
                  {preview.discount && (
                    <span className="inline-block bg-white/15 border border-white/30 text-white font-bold text-base px-4 py-1.5 rounded-xl mb-4">{preview.discount}</span>
                  )}
                  <div className="flex gap-3">
                    <span className="bg-primary text-white text-sm px-5 py-2 rounded-full font-semibold">{preview.cta}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setPreview(null)} className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full text-white flex items-center justify-center text-lg transition-colors">×</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 z-10">
                <h2 className="font-bold text-dark-brown text-lg">
                  {editId !== null ? "Edit Carousel Slide" : "Add New Carousel Slide"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editId !== null ? "Update slide details below." : "Fill in the details for the new homepage carousel slide."}
                </p>
              </div>

              <div className="px-6 py-5 space-y-5">
                {/* Slide Type */}
                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-2">Slide Type</label>
                  <div className="flex gap-3">
                    {SLIDE_TYPES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setForm({ ...form, type: t.value })}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                          form.type === t.value ? "border-primary bg-light-pink text-primary" : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-dark-brown mb-1">Image URL <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {form.image && (
                    <div className="mt-2 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url('${form.image}')` }} />
                    </div>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-brown mb-1">Title <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. 🎊 Diwali Special"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-brown mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={form.subtitle}
                      onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                      placeholder="e.g. Celebrate with Sweet Moments"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-dark-brown mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    placeholder="Short description shown on the slide..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>

                {/* CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-brown mb-1">Button Text</label>
                    <input
                      type="text"
                      value={form.cta}
                      onChange={(e) => setForm({ ...form, cta: e.target.value })}
                      placeholder="e.g. Shop Now"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-brown mb-1">Button Link</label>
                    <input
                      type="text"
                      value={form.ctaLink}
                      onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                      placeholder="/cakes"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Badge & Offer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-brown mb-1">
                      Badge Text <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                      placeholder="e.g. 🎊 Festival Offer"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-brown mb-1">
                      Discount / Offer Text <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.discount}
                      onChange={(e) => setForm({ ...form, discount: e.target.value })}
                      placeholder="e.g. Up to 25% OFF"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Badge Colour */}
                <div>
                  <label className="block text-sm font-medium text-dark-brown mb-2">Badge Colour</label>
                  <div className="flex flex-wrap gap-2">
                    {BADGE_COLORS.map((bc) => (
                      <button
                        key={bc.value}
                        type="button"
                        onClick={() => setForm({ ...form, badgeColor: bc.value })}
                        className={`px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-all ${bc.value} ${
                          form.badgeColor === bc.value ? "ring-2 ring-offset-1 ring-dark-brown scale-105" : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        {bc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active toggle */}
                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-dark-brown">Show on Homepage</p>
                    <p className="text-xs text-gray-400">Inactive slides are hidden from the homepage carousel</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, active: !form.active })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? "bg-green-400" : "bg-gray-300"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.title.trim() || !form.image.trim()}
                  className="flex-1 py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  {editId !== null ? "Save Changes" : "Add Slide"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
