"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/cakes", label: "Manage Cakes", icon: "🎂" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="w-64 bg-dark-brown min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎂</span>
          <div>
            <span className="font-bold text-accent text-base leading-none block">Sweet Moments</span>
            <span className="text-xs text-gray-400">Admin Panel</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              pathname === item.href
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 mb-1">
          <span>🏠</span> View Store
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
