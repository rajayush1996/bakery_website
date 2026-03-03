"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import CakeCard from "@/components/CakeCard";
import { cakes, categories } from "@/data/cakes";
import { testimonials } from "@/data/testimonials";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const featuredCakes = cakes.slice(0, 6);

  return (
    <>
      <HeroCarousel />

      {/* Featured Cakes */}
      <section className="relative py-16 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Our Specialties</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-dark-brown mb-3">Featured Cakes</h2>
            <p className="text-gray-500 max-w-md mx-auto">Handpicked bestsellers loved by our Asansol community</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCakes.map((cake, i) => (
              <motion.div
                key={cake.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                variants={fadeUp}
              >
                <CakeCard cake={cake} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/cakes" className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 inline-block">
              View All Cakes
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="relative py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Browse By</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-dark-brown">Categories</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                variants={fadeUp}
              >
                <Link
                  href={`/cakes?category=${encodeURIComponent(cat.name)}`}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-cream hover:bg-light-pink border border-gray-100 hover:border-primary/30 transition-all duration-200 group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                  <span className="text-sm font-medium text-dark-brown text-center leading-tight">{cat.name}</span>
                  <span className="text-xs text-gray-400">{cat.count} items</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="relative py-16 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-dark-brown">Baked with Passion</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🥚", title: "Fresh Ingredients", desc: "We use only the freshest, finest quality ingredients in every cake." },
              { icon: "👨‍🍳", title: "Expert Bakers", desc: "Our skilled bakers bring years of experience and love to every creation." },
              { icon: "🚀", title: "Fast Delivery", desc: "Same-day delivery available across Asansol and nearby areas." },
              { icon: "✨", title: "Custom Designs", desc: "We craft personalized cakes tailored to your exact vision and taste." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-dark-brown text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">Happy Customers</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-dark-brown">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                variants={fadeUp}
                className="bg-cream rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex text-accent text-lg mb-3">
                  {"★".repeat(t.rating)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-dark-brown text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-4">Ready to Order Your Dream Cake?</h2>
          <p className="text-pink-100 text-base sm:text-lg mb-6 sm:mb-8">
            Place your order today and get freshly baked goodness delivered to your door in Asansol.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/cakes" className="bg-white text-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-cream transition-all duration-300 hover:scale-105 inline-block">
              Order Now
            </Link>
            <a href="tel:+919876543210" className="border-2 border-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-white hover:text-primary transition-all duration-300">
              📞 Call Us
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
