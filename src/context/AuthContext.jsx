"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// TODO: Replace with real API authentication when backend is ready.
// WARNING: Passwords must NEVER be stored in plaintext in production code.
// This mock-only list is for frontend demo purposes and must be removed before shipping.
const MOCK_ACCOUNTS = [
  { email: "admin@bakery.com", password: "admin123", name: "Admin", role: "admin" },
  { email: "demo@bakery.com", password: "demo123", name: "Demo User", role: "customer" },
];

const STORAGE_KEY = "bakery_auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAdmin(parsed.role === "admin");
      }
    } catch (err) {
      console.error("Failed to restore auth session from localStorage:", err);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = (email, password) => {
    // TODO: Replace with API call: POST /api/auth/login { email, password }
    const account = MOCK_ACCOUNTS.find(
      (a) => a.email === email && a.password === password
    );
    if (!account) {
      return { success: false, message: "Invalid credentials" };
    }
    const userData = { name: account.name, email: account.email, role: account.role };
    setUser(userData);
    setIsAdmin(account.role === "admin");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true, role: account.role };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signup = (name, email, phone, _password) => {
    // In a real app, password would be hashed and sent to the server.
    // Note: signup creates a temporary session only and is not validated against MOCK_ACCOUNTS.
    const userData = { name, email, phone, role: "customer" };
    setUser(userData);
    setIsAdmin(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
