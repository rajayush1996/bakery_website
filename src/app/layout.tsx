import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CarouselProvider } from "@/context/CarouselContext";

export const metadata: Metadata = {
  title: "Sweet Moments Bakery - Asansol",
  description: "Freshly baked cakes, cupcakes and pastries in Asansol. Order online for birthdays, weddings and all celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <CarouselProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </CarouselProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
