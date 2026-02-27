import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🎂</span>
              <div>
                <span className="font-bold text-xl text-accent leading-none block">Sweet Moments</span>
                <span className="text-xs text-gray-400">Asansol Bakery</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Freshly baked with love in the heart of Asansol. Every cake tells a story, every bite creates a memory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-accent mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/cakes" className="hover:text-white transition-colors">All Cakes</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-accent mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/cakes?category=Birthday+Cakes" className="hover:text-white transition-colors">Birthday Cakes</Link></li>
              <li><Link href="/cakes?category=Wedding+Cakes" className="hover:text-white transition-colors">Wedding Cakes</Link></li>
              <li><Link href="/cakes?category=Custom+Cakes" className="hover:text-white transition-colors">Custom Cakes</Link></li>
              <li><Link href="/cakes?category=Cupcakes" className="hover:text-white transition-colors">Cupcakes</Link></li>
              <li><Link href="/cakes?category=Chocolate+Cakes" className="hover:text-white transition-colors">Chocolate Cakes</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-accent mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>15, G.T. Road, Asansol<br />West Bengal - 713301</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:hello@sweetmoments.in" className="hover:text-white transition-colors">hello@sweetmoments.in</a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Mon–Sun: 9 AM – 9 PM</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors text-sm">f</a>
              <a href="#" className="w-9 h-9 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors text-sm">in</a>
              <a href="#" className="w-9 h-9 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors text-sm">tw</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© 2024 Sweet Moments Bakery, Asansol. All rights reserved. Made with ❤️ in Asansol.</p>
        </div>
      </div>
    </footer>
  );
}
