"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎂</span>
            <div>
              <span className="font-bold text-primary text-lg leading-none block">Sweet Moments</span>
              <span className="text-xs text-secondary-light">Asansol Bakery</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-dark-brown hover:text-primary transition-colors font-medium">Home</Link>
            <Link href="/cakes" className="text-dark-brown hover:text-primary transition-colors font-medium">Cakes</Link>
            {user && !isAdmin && (
              <Link href="/orders" className="text-dark-brown hover:text-primary transition-colors font-medium">My Orders</Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="text-dark-brown hover:text-primary transition-colors font-medium">Admin</Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/cart" className="relative p-2 text-dark-brown hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-9H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark-brown">Hi, {user.name}</span>
                <button onClick={handleLogout} className="bg-secondary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary-light transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="relative p-2 text-dark-brown">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-9H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-dark-brown">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          <Link href="/" className="block py-2 text-dark-brown hover:text-primary" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/cakes" className="block py-2 text-dark-brown hover:text-primary" onClick={() => setMenuOpen(false)}>Cakes</Link>
          {user && !isAdmin && (
            <Link href="/orders" className="block py-2 text-dark-brown hover:text-primary" onClick={() => setMenuOpen(false)}>My Orders</Link>
          )}
          {isAdmin && (
            <Link href="/admin" className="block py-2 text-dark-brown hover:text-primary" onClick={() => setMenuOpen(false)}>Admin</Link>
          )}
          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block w-full text-left py-2 text-secondary">Logout</button>
          ) : (
            <Link href="/login" className="block py-2 text-primary font-medium" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
