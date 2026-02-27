"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (email, password) => {
    if (email === "admin@bakery.com" && password === "admin123") {
      setUser({ name: "Admin", email, role: "admin" });
      setIsAdmin(true);
      return { success: true, role: "admin" };
    }
    if (email && password) {
      setUser({ name: "Customer", email, role: "customer" });
      setIsAdmin(false);
      return { success: true, role: "customer" };
    }
    return { success: false, message: "Invalid credentials" };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signup = (name, email, phone, _password) => {
    // In a real app, password would be hashed and sent to the server
    setUser({ name, email, phone, role: "customer" });
    setIsAdmin(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
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
